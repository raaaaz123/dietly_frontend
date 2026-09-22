"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Fades a section in as it scrolls into view.
 *
 * ## Why this no longer uses framer-motion
 *
 * It used `motion.div` with `initial={{ opacity: 0 }}` and `whileInView`. That
 * renders `style="opacity:0"` into the server HTML and relies on the library
 * to remove it after hydration — and on 2026-09-22 it stopped doing so, in
 * production. Every page on the live site rendered its nav, its footer and
 * nothing in between: `dietly.life/tools` served a complete 115 KB document in
 * which every section sat at `opacity: 0` forever. React had hydrated, there
 * were no console errors, and the elements were inside the viewport. The
 * animation simply never ran.
 *
 * Nothing caught it. `check-seo.mjs` reads the HTML, where the content is
 * present and correct; the tests never open a browser. The failure was only
 * visible to a person looking at the page.
 *
 * ## The rule this file now follows
 *
 * **Content is visible unless JavaScript has proven it can hide and restore
 * it.** The server renders no opacity at all, so the default state of every
 * section — no JS, broken JS, an old browser, a crawler that runs a little
 * JS and gives up — is readable. Hiding happens only in an effect, after mount,
 * and only for sections that are still below the fold. An animation is an
 * enhancement, and an enhancement that can hide the page is not one.
 *
 * Three further guards, each for a way this class of bug reappears:
 *
 * - Anything already in view on mount is never hidden, so the first screen
 *   cannot flash.
 * - `prefers-reduced-motion` skips the whole mechanism.
 * - A timer force-reveals after 1.2s even if the observer never fires, so the
 *   worst case is an ungraceful appearance rather than an invisible page.
 */

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
  yOffset = 18,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // `null` means "not yet decided" — the server and the first client render
  // both produce a plain, visible div, which is what makes this fail open.
  const [hidden, setHidden] = useState<boolean | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    // Already on screen: leave it alone rather than hiding it to animate it
    // back. Hiding what the reader is looking at is the flash this avoids.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setHidden(true);

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setHidden(false);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { rootMargin: "-60px" },
    );
    io.observe(el);

    // The failsafe. If the observer never fires — the bug this component was
    // rewritten for — the section appears anyway.
    const failsafe = window.setTimeout(reveal, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        hidden === null
          ? undefined
          : {
              opacity: hidden ? 0 : 1,
              transform: hidden ? `translateY(${yOffset}px)` : "none",
              transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
              willChange: hidden ? "opacity, transform" : undefined,
            }
      }
    >
      {children}
    </div>
  );
}
