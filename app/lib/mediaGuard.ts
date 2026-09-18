import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "./site";

/**
 * The gate in front of `/api/exercise-clip` and `/api/exercise-poster`.
 *
 * ## What this can and cannot do
 *
 * Worth stating plainly, because the backend's own media module already does:
 * anything a browser can play, a determined person can capture. Nothing here
 * changes that. What it stops is the cheap attack — pasting a URL, hotlinking
 * from another site, and walking all 507 slugs with a script — which is the
 * realistic threat and the one the licence cares about.
 *
 * Three checks, cheapest first:
 *
 * 1. **`Sec-Fetch-Site`.** Every current browser sends it and it cannot be set
 *    by page JavaScript, which makes it stronger than `Referer`. A `<video>` on
 *    our own page sends `same-origin`; a URL pasted into the address bar sends
 *    `none`; another site's page sends `cross-site`. Only the first is served.
 * 2. **`Referer`,** for clients too old to send the above.
 * 3. **A per-IP rate limit,** so enumerating the catalogue is slow enough not
 *    to be worth it even from a real page.
 *
 * ## The one deliberate hole
 *
 * Search crawlers send neither header, so a strict gate makes the clips
 * invisible to them — and a `VideoObject` whose `contentUrl` a crawler cannot
 * fetch produces no video result at all. That is the entire point of this
 * cluster, so known crawler user-agents are let through by default.
 *
 * A user-agent is spoofable, so this is a real trade rather than a loophole
 * being papered over: video search visibility in exchange for a gap a scraper
 * can walk through by setting one header. Set `MEDIA_ALLOW_CRAWLERS=false` to
 * close it and give up the video results. The watermark burned into the clips
 * by the render pipeline is what covers the remainder.
 */

const ALLOW_CRAWLERS = process.env.MEDIA_ALLOW_CRAWLERS !== "false";

/** The crawlers worth being indexed by, including the AI ones this site is
 *  explicitly courting in `robots.ts`. */
const CRAWLERS =
  /(googlebot|bingbot|google-inspectiontool|duckduckbot|applebot|slurp|yandex|baiduspider|gptbot|oai-searchbot|chatgpt-user|claudebot|claude-web|perplexitybot|bytespider)/i;

/** Requests per IP per window. A visitor reading a category page pulls ~90
 *  posters, so the ceiling has to clear that comfortably while still making a
 *  507-slug sweep take long enough to be pointless. */
const LIMIT = 240;
const WINDOW_MS = 60_000;

const hits = new Map<string, { n: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { n: 1, reset: now + WINDOW_MS });
    // Bounded so a burst of unique IPs cannot grow this without limit. Process
    // memory, so it resets on deploy and is per-instance — a floor, not a wall.
    if (hits.size > 5_000) {
      for (const [k, v] of hits) if (now > v.reset) hits.delete(k);
    }
    return false;
  }
  rec.n += 1;
  return rec.n > LIMIT;
}

function sameOrigin(req: NextRequest): boolean {
  const referer = req.headers.get("referer");
  if (!referer) return false;
  try {
    const host = new URL(referer).host;
    return (
      host === new URL(SITE_URL).host ||
      host === `www.${new URL(SITE_URL).host}` ||
      host === req.headers.get("host")
    );
  } catch {
    return false;
  }
}

/** `null` when the request may proceed, otherwise the response to return. */
export function guardMedia(req: NextRequest): NextResponse | null {
  const ua = req.headers.get("user-agent") ?? "";
  if (ALLOW_CRAWLERS && CRAWLERS.test(ua)) return null;

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return new NextResponse("Too many requests", {
      status: 429,
      headers: { "Retry-After": "60", "Cache-Control": "no-store" },
    });
  }

  const site = req.headers.get("sec-fetch-site");
  if (site) {
    // `same-site` covers www vs apex. Everything else — `none` from a pasted
    // URL, `cross-site` from somebody else's page — is refused.
    if (site === "same-origin" || site === "same-site") return null;
    return refuse();
  }
  return sameOrigin(req) ? null : refuse();
}

function refuse(): NextResponse {
  return new NextResponse(
    "This clip is only available inside dietly.life. Exercise demonstrations are licensed and cannot be hotlinked or redistributed.",
    { status: 403, headers: { "Cache-Control": "no-store" } },
  );
}

/** Headers for a response that must not be cached by anything in between. The
 *  URL it redirects to is signed and short-lived; a shared cache holding onto
 *  it is a copy of the handle. */
export const NO_STORE = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex",
} as const;
