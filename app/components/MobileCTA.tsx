"use client";

import { useEffect, useState } from "react";
import StoreButtons from "./StoreButtons";

/**
 * Sticky bottom download bar for phones.
 * Appears after the hero scrolls away, hides when the footer CTA is in view.
 *
 * It used to carry a label, a subtitle and two bespoke buttons — one of them a
 * lime pill with a coloured glow, which was the single loudest object on the
 * site and sat on screen for the entire scroll. Now it is the two official
 * badges and nothing else: the bar interrupts a page the visitor is reading,
 * so the least it can do is be small and say only the thing it is for.
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
      <div className="mx-3 mb-3 rounded-[20px] border border-border bg-bg/92 p-2.5 backdrop-blur-xl shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.8)]">
        <StoreButtons height={38} fullWidthMobile={false} className="justify-center" />
      </div>
    </div>
  );
}
