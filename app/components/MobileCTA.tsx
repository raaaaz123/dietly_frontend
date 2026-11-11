"use client";

import { useEffect, useState } from "react";
import { GetAppButton } from "./GetApp";

/**
 * Sticky bottom install bar for phones.
 * Appears after the hero scrolls away, hides near the footer.
 *
 * It used to show both store badges, so every visitor had to work out which
 * one was theirs. It now shows one button to the visitor's own store.
 */
export default function MobileCTA({ label }: { label?: string }) {
  const [visible, setVisible] = useState(false);
  const [cardOnScreen, setCardOnScreen] = useState(false);

  // Hide while an install card is on screen, so the visitor never sees two
  // identical buttons at once.
  useEffect(() => {
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setCardOnScreen(seen.size > 0);
    });
    const watch = () => document.querySelectorAll(".install-card, .install-inline").forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

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
        visible && !cardOnScreen ? "translate-y-0" : "translate-y-[130%]"
      }`}
    >
      <div data-placement="sticky_bar" className="mx-3 mb-3 rounded-[20px] border border-border bg-bg/92 p-2 backdrop-blur-xl shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.8)]">
        <GetAppButton from="sticky_bar" size="md" label={label} className="w-full" />
      </div>
    </div>
  );
}
