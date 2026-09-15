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
const HOST = process.env.POSTHOG_HOST ?? "https://eu.i.posthog.com";

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
        const store = storeFor(link.getAttribute("href") ?? "");
        if (!store) return;

        posthog.capture("store_click", {
          store,
          path: window.location.pathname,
          // Which CTA on the page won. The buttons are repeated down the
          // homepage and it is worth knowing whether the hero or the closer
          // does the work.
          label: link.getAttribute("aria-label") ?? undefined,
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
