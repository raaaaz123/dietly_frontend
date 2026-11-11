"use client";

import { useEffect, useState } from "react";
import { KIT_LABEL } from "./ExerciseCard";

/**
 * Filters a muscle or equipment hub in place.
 *
 * Every movement on the hub is already in the server-rendered HTML (so every
 * link stays crawlable). This only hides the ones that do not match, by the
 * `data-name`, `data-diff` and `data-kit` attributes the cards and the A to Z
 * links carry. No extra data is downloaded.
 */
export default function HubFilter({ target, showKit = true }: { target: string; showKit?: boolean }) {
  const [q, setQ] = useState("");
  const [kit, setKit] = useState<string | null>(null);
  const [diff, setDiff] = useState<string | null>(null);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const root = document.getElementById(target);
    if (!root) return;
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    let n = 0;
    root.querySelectorAll<HTMLElement>("[data-ex]").forEach((el) => {
      const ok =
        (!kit || el.dataset.kit === kit) &&
        (!diff || el.dataset.diff === diff) &&
        terms.every((t) => (el.dataset.name ?? "").includes(t));
      el.style.display = ok ? "" : "none";
      if (ok) n++;
    });
    root.querySelectorAll<HTMLElement>("[data-ex-section]").forEach((sec) => {
      const any = sec.querySelector<HTMLElement>('[data-ex]:not([style*="display: none"])');
      sec.style.display = any ? "" : "none";
    });
    const filtering = terms.length > 0 || kit || diff;
    setShown(filtering ? n : null);
  }, [q, kit, diff, target]);

  const chip = (on: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
      on ? "border-[var(--signal)] bg-[var(--signal)] text-[var(--signal-ink)]" : "border-border text-fg-muted hover:text-fg"
    }`;

  return (
    <div className="sticky top-[68px] z-30 -mx-4 mt-6 px-4 py-3 bg-bg/90 backdrop-blur-xl sm:mx-0 sm:px-0">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter by name or muscle"
        aria-label="Filter exercises on this page"
        className="w-full rounded-2xl border border-border bg-bg-elevated px-4 py-3.5 text-[16px] text-fg placeholder:text-fg-faint focus:border-[var(--signal)] focus:outline-none"
      />
      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {showKit &&
          (["none", "basic", "full"] as const).map((k) => (
            <button key={k} type="button" aria-pressed={kit === k} onClick={() => setKit(kit === k ? null : k)} className={chip(kit === k)}>
              {KIT_LABEL[k]}
            </button>
          ))}
        {(["beginner", "intermediate", "advanced"] as const).map((d) => (
          <button key={d} type="button" aria-pressed={diff === d} onClick={() => setDiff(diff === d ? null : d)} className={chip(diff === d)}>
            {d[0].toUpperCase() + d.slice(1)}
          </button>
        ))}
        {shown !== null ? <span className="ml-1 shrink-0 text-[13px] text-fg-muted">{shown} shown</span> : null}
      </div>
    </div>
  );
}
