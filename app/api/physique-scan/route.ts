/**
 * Public physique scoring, for the `/physique-analyzer` tool.
 *
 * Same threat model as `/api/food-scan` (read its header): an anonymous route
 * that spends money per call. Same five brakes, with tighter numbers, because
 * this is the more expensive and the more sensitive of the two:
 *
 * 1. No `BEDROCK_API_KEY` means 503 and no model call.
 * 2. 3 MB cap, before and after reading the body.
 * 3. Per-IP limit: 4 an hour. One person needs one or two scans to see what
 *    the score is; the app is where repeat scans belong.
 * 4. Global ceiling: 400 a day.
 * 5. A request timeout.
 *
 * ## Privacy
 *
 * These are photos of people's bodies. The image is held in memory for the
 * one model call and never written anywhere: not logged, not stored, not
 * cached (`no-store`). Errors are logged without the payload. The form also
 * requires the visitor to confirm they are 18 or over and that the photo is of
 * themselves, and the prompt refuses anyone who looks under 18.
 *
 * The counters are per instance, as in food-scan. A brake, not a guarantee.
 */

import { NextRequest, NextResponse } from "next/server";
import { bedrockConfig, MAX_IMAGE_BYTES } from "../../lib/bedrock";
import { sniffImageMime } from "../../lib/foodVision";
import { analysePhysique, type Sex } from "../../lib/physiqueVision";

export const maxDuration = 45;
export const dynamic = "force-dynamic";

const WINDOW_MS = 60 * 60 * 1000;
const PER_IP_PER_HOUR = 4;
const GLOBAL_PER_DAY = 400;
const TIMEOUT_MS = 40_000;

const hits = new Map<string, { count: number; resetAt: number }>();
let globalDay = { day: "", count: 0 };

function rateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const today = new Date(now).toISOString().slice(0, 10);
  if (globalDay.day !== today) globalDay = { day: today, count: 0 };
  if (globalDay.count >= GLOBAL_PER_DAY) return { ok: false, retryAfter: 3600 };

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
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(req: NextRequest) {
  const cfg = bedrockConfig();
  if (!cfg) return json({ error: "The analyzer is not configured on this deployment." }, 503);

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_IMAGE_BYTES + 4096) {
    return json({ error: "That image is over 3 MB. Try a smaller photo." }, 413);
  }

  let bytes: Uint8Array;
  let sex: Sex = "unspecified";
  try {
    const form = await req.formData();
    if (form.get("adult") !== "yes") {
      return json({ error: "Please confirm you are 18 or over and this is a photo of you." }, 400);
    }
    const s = form.get("sex");
    if (s === "male" || s === "female") sex = s;
    const file = form.get("image");
    if (!(file instanceof File)) return json({ error: "No image was uploaded." }, 400);
    bytes = new Uint8Array(await file.arrayBuffer());
  } catch {
    return json({ error: "Could not read the upload." }, 400);
  }

  if (bytes.length === 0) return json({ error: "That file was empty." }, 400);
  if (bytes.length > MAX_IMAGE_BYTES) {
    return json({ error: "That image is over 3 MB. Try a smaller photo." }, 413);
  }
  const mime = sniffImageMime(bytes);
  if (!mime) return json({ error: "That does not look like a JPEG, PNG, WebP or HEIC image." }, 415);

  // Counted only once the request is a real attempt, so a form mistake does
  // not burn one of four hourly scans.
  const limit = rateLimit(clientIp(req));
  if (!limit.ok) {
    return json(
      {
        error:
          "You have used the free analyzer a few times this hour. Try again later, or get the app for a weekly scan with the full breakdown.",
      },
      429,
      { "Retry-After": String(limit.retryAfter ?? 3600) },
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const result = await analysePhysique(cfg, bytes, mime, sex, controller.signal);
    return json(result);
  } catch (err) {
    if (controller.signal.aborted) {
      return json({ error: "That took too long. Try a smaller or clearer photo." }, 504);
    }
    console.error("physique-scan failed:", err instanceof Error ? err.message : "unknown");
    return json({ error: "The analyzer could not read that photo. Try another one." }, 502);
  } finally {
    clearTimeout(timer);
  }
}
