import { APP_STORE_URL, PLAY_STORE_URL } from "./site";

/**
 * Which store a visitor should be sent to.
 *
 * Shared by the server redirect at `/get` (which reads the User-Agent header)
 * and the client install buttons (which read `navigator`). iPadOS 13+ reports
 * itself as desktop Safari, so the client also checks for touch on a "Mac".
 */
export type Platform = "ios" | "android" | "desktop";

export function platformFromUA(ua: string, touchMac = false): Platform {
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua) || touchMac) return "ios";
  return "desktop";
}

export function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "desktop";
  const touchMac = /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
  return platformFromUA(navigator.userAgent, touchMac);
}

export function storeUrl(p: Exclude<Platform, "desktop">): string {
  return p === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
}

export const STORE_NAME: Record<Exclude<Platform, "desktop">, string> = {
  ios: "App Store",
  android: "Google Play",
};
