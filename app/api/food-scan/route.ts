/**
 * Public meal recognition, for the `/food-scanner` tool.
 *
 * ## This route spends money on behalf of anonymous strangers
 *
 * That is the whole design problem, and everything below is a consequence of
 * it. The app's equivalent endpoint is protected twice over — a Firebase user
 * and a plan quota — and neither is available here, because the point of the
 * page is that you can use it without an account. So the limits have to come
 * from somewhere else:
 *
 * 1. **Feature switch.** No `BEDROCK_API_KEY` means 503 and no model call.
 *    Preview builds and local checkouts spend nothing by default.
 * 2. **Size cap** at Bedrock's own 3 MB image limit, checked before the
 *    upload is read into memory where possible, and again after.
 * 3. **Per-IP rate limit**, below.
 * 4. **A hard daily ceiling** across all callers, so a bad day costs a known
 *    amount rather than an unknown one.
 * 5. **A request timeout**, because a hung vision call holds a serverless
 *    function open until the platform kills it and bills for the wait.
 *
 * ## The honest limitation of the rate limiter
 *
 * The counters live in module memory. On Vercel that means *per instance*: two
 * concurrent lambdas keep two separate counts, and a cold start resets them.
 * So these numbers are a brake on casual abuse, not a guarantee against a
 * determined one.
 *
 * Making it a guarantee needs shared state — Vercel KV, Upstash, or moving the
 * route behind the backend, which already has Redis-backed `slowapi` limits.
 * That is the right fix and it is deliberately not done here, because it adds
 * a dependency this repo does not yet have. **Watch the Bedrock spend for the
 * first weeks.** If the tool gets real traffic, do the durable version before
 * raising any ceiling below.
 */

import { NextRequest, NextResponse } from "next/server";
import { bedrockConfig, MAX_IMAGE_BYTES } from "../../lib/bedrock";
import { recognizeMeal, sniffImageMime } from "../../lib/foodVision";

// A scan is a vision call against a 256K-context model; it is not fast.
export const maxDuration = 45;
export const dynamic = "force-dynamic";

const WINDOW_MS = 60 * 60 * 1000;
/** Per IP, per hour. Enough to try a few photos, not enough to run a service. */
const PER_IP_PER_HOUR = 8;
/** Across everyone, per day. The ceiling that caps a bad day's bill. */
const GLOBAL_PER_DAY = 1500;
const TIMEOUT_MS = 40_000;

const hits = new Map<string, { count: number; resetAt: number }>();
let globalDay = { day: "", count: 0 };

function rateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();

  const today = new Date(now).toISOString().slice(0, 10);
  if (globalDay.day !== today) globalDay = { day: today, count: 0 };
  if (globalDay.count >= GLOBAL_PER_DAY) return { ok: false, retryAfter: 3600 };

  // Opportunistic sweep. Without it the map grows for the life of the
  // instance, which on a long-lived one is a slow leak keyed by IP.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  }

  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    globalDay.count += 1;
    return { ok: true };
  }
  if (entry.count >= PER_IP_PER_HOUR) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  globalDay.count += 1;
  return { ok: true };
}

function clientIp(req: NextRequest): string {
  // `x-forwarded-for` is a client-controlled header everywhere except behind a
  // proxy that overwrites it — which Vercel does. The leftmost entry is the
  // real client there. Treated as a best-effort key, never as identity.
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  const cfg = bedrockConfig();
  if (!cfg) {
    return NextResponse.json(
      { error: "The scanner is not configured on this deployment." },
      { status: 503 },
    );
  }

  // Cheap rejection before reading a body we are not going to use.
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_IMAGE_BYTES + 1024) {
    return NextResponse.json(
      { error: "That image is over 3 MB. Try a smaller photo." },
      { status: 413 },
    );
  }

  const limit = rateLimit(clientIp(req));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error:
          "You have used this tool a few times in the last hour. Try again later, or get the app for unlimited scans.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 3600) } },
    );
  }

  let bytes: Uint8Array;
  try {
    const form = await req.formData();
    const file = form.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image was uploaded." }, { status: 400 });
    }
    bytes = new Uint8Array(await file.arrayBuffer());
  } catch {
    return NextResponse.json({ error: "Could not read the upload." }, { status: 400 });
  }

  if (bytes.length === 0) {
    return NextResponse.json({ error: "That file was empty." }, { status: 400 });
  }
  // Re-checked against the real bytes: content-length is a claim, not a fact.
  if (bytes.length > MAX_IMAGE_BYTES) {
    return NextResponse.json(
      { error: "That image is over 3 MB. Try a smaller photo." },
      { status: 413 },
    );
  }

  const mime = sniffImageMime(bytes);
  if (!mime) {
    return NextResponse.json(
      { error: "That does not look like a JPEG, PNG, WebP or HEIC image." },
      { status: 415 },
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const result = await recognizeMeal(cfg, bytes, mime, controller.signal);
    return NextResponse.json(result, {
      // A scan is specific to one upload; nothing about it is cacheable, and a
      // CDN that cached one person's meal for another would be a privacy bug.
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    if (controller.signal.aborted) {
      return NextResponse.json(
        { error: "That took too long. Try a smaller or clearer photo." },
        { status: 504 },
      );
    }
    // Never surface the provider's message: it can carry account and model
    // details, and none of it helps the person holding the phone.
    console.error("food-scan failed:", err);
    return NextResponse.json(
      { error: "The scanner could not read that photo. Try another one." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
