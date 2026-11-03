"use client";

import { useEffect } from "react";
import { APP_STORE_URL, PLAY_STORE_URL } from "./site";

/**
 * Web analytics, for one question: which pages send people to a store.
 *
 * The site had no analytics of any kind — no PostHog, no GA, and Firebase is
 * wired for auth only — so there was no way to tell whether a page was indexed,
 * visited, or doing anything. Organic sessions on their own are a vanity
 * metric; the number the SEO work is actually judged on is organic visit →
 * store click, which is why `store_click` below carries the path it fired from.
 *
 * Nothing loads unless POSTHOG_KEY is set, so a missing key is a
 * site with no third-party script rather than a broken one. That also keeps
 * local development out of the data.
 */

// Exposed to the browser through the `env` block in next.config.ts, the same
// way FIREBASE_API_KEY is, rather than through a NEXT_PUBLIC_ prefix. A PostHog
// project key is a write-only ingest key and is meant to be public — unlike the
// admin credentials that block used to carry, which is why it now names each
// variable it inlines instead of taking whatever it is given.
const KEY = process.env.POSTHOG_KEY;
const HOST = process.env.POSTHOG_HOST ?? "https://us.i.posthog.com";

/** App Store Connect provider token (`pt`). With it, the `ct` campaign we add
 *  below shows up in App Store Connect > App Analytics > Sources as installs
 *  per page. Without it Apple ignores `ct`, so we only add it when set. */
const APP_STORE_PT = process.env.APP_STORE_PT;

/**
 * Crawlers that run JavaScript and so fire pageviews. Measured 2026-11-03: of
 * 184 `/privacy` views in 60 days, 172 were Google Play's policy checker
 * (`PlayStore-Google`), which re-fetches the privacy and delete-account URLs
 * from the Play listing. They made the privacy page look like the second most
 * visited page on the site. Google's renderer and Lighthouse do the same.
 */
const BOT_UA =
  /PlayStore-Google|Googlebot|Google-InspectionTool|AdsBot|Mediapartners|Chrome-Lighthouse|HeadlessChrome|bot\b|crawler|spider|^Google$/i;

/** A short, stable campaign name for the page a click came from. */
function campaignFor(path: string): string {
  const first = path.split("/").filter(Boolean)[0] ?? "home";
  const tail = path.split("/").filter(Boolean).slice(1).join("-");
  return `web-${first}${tail ? "-" + tail : ""}`.slice(0, 40);
}

/** Adds install attribution to a store link, once, just before it opens. */
function withAttribution(href: string, store: "app_store" | "play_store", path: string) {
  try {
    const url = new URL(href);
    const campaign = campaignFor(path);
    if (store === "play_store" && !url.searchParams.has("referrer")) {
      url.searchParams.set(
        "referrer",
        `utm_source=dietly.life&utm_medium=web&utm_campaign=${campaign}`,
      );
    }
    if (store === "app_store" && APP_STORE_PT && !url.searchParams.has("ct")) {
      url.searchParams.set("pt", APP_STORE_PT);
      url.searchParams.set("ct", campaign);
      url.searchParams.set("mt", "8");
    }
    return url.toString();
  } catch {
    return href;
  }
}

/** Store links are tracked by delegation rather than by wiring a handler into
 *  each button. The store URLs appear in StoreButtons, MobileCTA, Cta and the
 *  hero, all of which are server components today — converting four of them to
 *  client components to attach an onClick would cost more than one listener,
 *  and would silently miss the fifth place somebody adds a link tomorrow. */
function storeFor(href: string): "app_store" | "play_store" | null {
  if (href.startsWith(APP_STORE_URL) || href.includes("apps.apple.com")) {
    return "app_store";
  }
  if (href.startsWith(PLAY_STORE_URL) || href.includes("play.google.com")) {
    return "play_store";
  }
  return null;
}

export default function Analytics() {
  useEffect(() => {
    if (!KEY) return;
    if (BOT_UA.test(navigator.userAgent)) return;

    // Imported here rather than at module scope so the SDK stays out of the
    // initial bundle. It is only ever needed after hydration, and this page's
    // Core Web Vitals are part of what the SEO work is trying to protect.
    let cleanup: (() => void) | undefined;

    import("posthog-js").then(({ default: posthog }) => {
      posthog.init(KEY, {
      api_host: HOST,
      // SPA navigations are captured from history changes, so no
      // `useSearchParams` hook is needed here. That matters: reading search
      // params in a component this high in the tree would opt every page out
      // of static rendering, which is the opposite of what the SEO work wants.
        capture_pageview: "history_change",
        capture_pageleave: true,
        // Anonymous by default. A marketing site has no accounts, so creating
        // a person profile per visitor buys nothing and stores more than we
        // need.
        person_profiles: "identified_only",
        respect_dnt: true,
      });

      const onClick = (event: MouseEvent) => {
        const link = (event.target as HTMLElement | null)?.closest?.("a");
        if (!link) return;
        const href = link.getAttribute("href") ?? "";
        const store = storeFor(href);
        if (!store) return;

        // Capture phase runs before the browser follows the link, so the
        // attributed URL is the one that opens.
        link.setAttribute("href", withAttribution(href, store, window.location.pathname));

        posthog.capture("store_click", {
          store,
          path: window.location.pathname,
          // Which CTA on the page won. The buttons are repeated down the
          // homepage and it is worth knowing whether the hero or the closer
          // does the work.
          label: link.getAttribute("aria-label") ?? undefined,
          // Hero, footer CTA, sticky bar, calculator result, guide end...
          placement:
            link.closest("[data-placement]")?.getAttribute("data-placement") ??
            undefined,
        });
      };

      document.addEventListener("click", onClick, { capture: true });
      cleanup = () =>
        document.removeEventListener("click", onClick, { capture: true });
    });

    return () => cleanup?.();
  }, []);

  return null;
}
