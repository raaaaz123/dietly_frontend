/**
 * `dietly.life/get`: one link that opens the right store.
 *
 * iPhone goes to the App Store, Android to Google Play (both open the store
 * app, which shows "Open" instead of "Install" when Dietly Fit is already on
 * the phone). Anything else lands on `/download`, which shows a QR code that
 * points back here. Use this link in bios, videos, QR codes and emails.
 *
 * `?from=` names the source and is passed on as the store campaign, so App
 * Store Connect and Play Console both show installs per source.
 */

import { after, NextRequest, NextResponse } from "next/server";
import { platformFromUA, storeUrl } from "../lib/platform";

export const dynamic = "force-dynamic";

const KEY = process.env.POSTHOG_KEY;
const PT = process.env.APP_STORE_PT;

function clean(v: string | null): string {
  return (v ?? "").replace(/[^a-z0-9_-]/gi, "").slice(0, 40) || "direct";
}

export function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  const platform = platformFromUA(ua);
  const from = clean(req.nextUrl.searchParams.get("from"));
  const campaign = `web-get-${from}`.slice(0, 40);

  let target: URL;
  if (platform === "desktop") {
    target = new URL(`/download?from=${from}`, req.nextUrl.origin);
  } else {
    target = new URL(storeUrl(platform));
    if (platform === "android") {
      target.searchParams.set("referrer", `utm_source=dietly.life&utm_medium=web&utm_campaign=${campaign}`);
    } else if (PT) {
      target.searchParams.set("pt", PT);
      target.searchParams.set("ct", campaign);
      target.searchParams.set("mt", "8");
    }
  }

  // Counted server side because a redirect never runs page JavaScript. Bots
  // are skipped, and the event never blocks the redirect.
  if (KEY && !/bot|crawler|spider|preview|PlayStore-Google|HeadlessChrome/i.test(ua)) {
    after(async () => {
      try {
        await fetch("https://us.i.posthog.com/capture/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: KEY,
            event: "get_redirect",
            distinct_id: crypto.randomUUID(),
            properties: { platform, from, $process_person_profile: false },
          }),
          signal: AbortSignal.timeout(3000),
        });
      } catch {
        /* analytics only */
      }
    });
  }

  return NextResponse.redirect(target, 302);
}
