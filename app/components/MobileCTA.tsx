"use client";

import { useEffect, useState } from "react";
import { APP_STORE_URL, PLAY_STORE_URL, AppleGlyph, PlayGlyph } from "./StoreButtons";

/**
 * Sticky bottom download bar for phones.
 * Appears after the hero scrolls away, hides when the footer CTA is in view.
 */
export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const nearBottom =
        y + window.innerHeight > doc.scrollHeight - window.innerHeight * 0.9;
      setVisible(y > 620 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-[130%]"
      }`}
    >
      <div className="mx-3 mb-3 rounded-[22px] border border-border bg-bg/92 backdrop-blur-xl p-2.5 shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2">
          <div className="pl-1.5 pr-0.5 min-w-0">
            <p className="text-[13px] font-extrabold leading-tight text-fg truncate">
              Get your Form Score
            </p>
            <p className="text-[11px] leading-tight text-fg-faint">
              Free to start
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <a
              href={APP_STORE_URL}
              className="flex h-11 items-center gap-2 rounded-2xl border border-border-strong bg-elevated px-4 text-fg"
              aria-label="Download on the App Store"
            >
              <AppleGlyph size={17} />
              <span className="text-[13px] font-bold">iOS</span>
            </a>
            <a
              href={PLAY_STORE_URL}
              className="flex h-11 items-center gap-2 rounded-2xl bg-accent px-4 text-accent-ink shadow-[0_8px_20px_-8px_rgba(210,245,60,0.5)]"
              aria-label="Get it on Google Play"
            >
              <PlayGlyph size={16} />
              <span className="text-[13px] font-bold">Android</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
