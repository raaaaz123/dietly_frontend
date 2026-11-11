"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import ExerciseCard, { GRID_CLASS, KIT_LABEL } from "./ExerciseCard";
import type { IndexRow } from "../../lib/exerciseData";

/**
 * Search and filter across the whole catalogue on /exercises.
 *
 * The page server-renders the most popular movements (passed in as
 * `children`), so crawlers and first paint get real links and pictures. The
 * full index (about 30 KB gzipped) is fetched only once the visitor types or
 * taps a filter, and results render 24 at a time.
 */

const PAGE = 24;
const DIFFS = [
  { v: "beginner", l: "Beginner" },
  { v: "intermediate", l: "Intermediate" },
  { v: "advanced", l: "Advanced" },
];

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
        on
          ? "border-[var(--signal)] bg-[var(--signal)] text-[var(--signal-ink)]"
          : "border-border text-fg-muted hover:border-fg/40 hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}

export default function ExerciseSearch({ muscles, total, children }: { muscles: string[]; total: number; children: ReactNode }) {
  const [q, setQ] = useState("");
  const [muscle, setMuscle] = useState<string | null>(null);
  const [kit, setKit] = useState<string | null>(null);
  const [diff, setDiff] = useState<string | null>(null);
  const [rows, setRows] = useState<IndexRow[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const loading = useRef(false);
  const active = q.trim() !== "" || muscle || kit || diff;

  const load = () => {
    if (rows || loading.current) return;
    loading.current = true;
    fetch("/exercises-index.json")
      .then((r) => r.json())
      .then((d: { items: IndexRow[] }) => setRows(d.items))
      .catch(() => setFailed(true))
      .finally(() => (loading.current = false));
  };

  // Deep links: /exercises?q=squat
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const initial = p.get("q");
    const k = p.get("kit");
    const m = p.get("muscle");
    if (initial) setQ(initial);
    if (k && ["none", "basic", "full"].includes(k)) setKit(k);
    if (m && muscles.includes(m)) setMuscle(m);
    if (initial || k || m) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (active) load();
    setLimit(PAGE);
    const url = new URL(window.location.href);
    const sync = (key: string, v: string | null) => {
      if (v) url.searchParams.set(key, v);
      else url.searchParams.delete(key);
    };
    sync("q", q.trim() || null);
    sync("kit", kit);
    sync("muscle", muscle);
    window.history.replaceState(null, "", url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, muscle, kit, diff]);

  const results = useMemo(() => {
    if (!rows || !active) return [];
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return rows.filter(([, name, cat, k, d, target]) => {
      if (muscle && cat !== muscle) return false;
      if (kit && k !== kit) return false;
      if (diff && d !== diff) return false;
      if (!terms.length) return true;
      const hay = `${name} ${target} ${cat}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [rows, q, muscle, kit, diff, active]);

  const clear = () => {
    setQ("");
    setMuscle(null);
    setKit(null);
    setDiff(null);
  };

  return (
    <div>
      <div className="sticky top-[68px] z-30 -mx-4 px-4 py-3 bg-bg/90 backdrop-blur-xl sm:mx-0 sm:px-0">
        <label className="relative block">
          <span className="sr-only">Search exercises</span>
          <svg viewBox="0 0 24 24" aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-faint" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={load}
            placeholder={`Search ${total.toLocaleString("en-US")} exercises`}
            className="w-full rounded-2xl border border-border bg-bg-elevated py-4 pl-12 pr-4 text-[16px] text-fg placeholder:text-fg-faint focus:border-[var(--signal)] focus:outline-none"
          />
        </label>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {(["none", "basic", "full"] as const).map((k) => (
            <Chip key={k} on={kit === k} onClick={() => setKit(kit === k ? null : k)}>
              {KIT_LABEL[k]}
            </Chip>
          ))}
          <span className="mx-1 w-px shrink-0 bg-border" aria-hidden />
          {DIFFS.map((d) => (
            <Chip key={d.v} on={diff === d.v} onClick={() => setDiff(diff === d.v ? null : d.v)}>
              {d.l}
            </Chip>
          ))}
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {muscles.map((m) => (
            <Chip key={m} on={muscle === m} onClick={() => setMuscle(muscle === m ? null : m)}>
              {m}
            </Chip>
          ))}
        </div>
      </div>

      {!active ? (
        children
      ) : (
        <section aria-live="polite" className="mt-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[14px] text-fg-muted">
              {rows ? `${results.length.toLocaleString("en-US")} ${results.length === 1 ? "exercise" : "exercises"}` : failed ? "Search is unavailable right now." : "Loading…"}
            </p>
            <button type="button" onClick={clear} className="text-[13px] font-semibold text-fg-muted underline hover:text-fg">
              Clear
            </button>
          </div>
          {rows && results.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-[15px] text-fg-muted">
              No exercise matches that. Try a muscle name, or fewer words.
            </p>
          ) : (
            <ul className={`mt-4 ${GRID_CLASS}`}>
              {results.slice(0, limit).map(([slug, name, , k, d, target]) => (
                <ExerciseCard key={slug} e={{ slug, name, target, difficulty: d, kit: k }} />
              ))}
            </ul>
          )}
          {results.length > limit ? (
            <button
              type="button"
              onClick={() => setLimit(limit + PAGE * 2)}
              className="mx-auto mt-8 block rounded-xl border border-border px-6 py-3 text-[14px] font-semibold text-fg hover:border-fg/40"
            >
              Show more ({(results.length - limit).toLocaleString("en-US")} left)
            </button>
          ) : null}
        </section>
      )}
    </div>
  );
}
