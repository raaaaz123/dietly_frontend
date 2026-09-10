"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../lib/api";

/**
 * The generated notification copy, and the controls for it.
 *
 * The engine's copy used to be fourteen hardcoded strings — everyone got the
 * same sentence for the same reason forever. It is generated per (kind,
 * segment) now, nightly, and this is where you see what the model actually
 * wrote before a user does.
 *
 * That review step is not decoration. The first real run filled every offer
 * bucket with invented deadlines and prices — "Account expires soon", "40%
 * off, 30-day refund window" — none of which are true. A blocklist rejects
 * that shape now, but a blocklist only catches what somebody thought of, so
 * the pool needs eyes on it. Retire is per-variant for exactly that: one bad
 * line should not cost the twenty around it.
 *
 * Generation is started, not awaited. It is a few dozen model calls over
 * minutes and this dashboard reaches the API through a proxy capped at 60
 * seconds, so a request that waits comes back as a gateway timeout with the
 * run still going. Hence the poll.
 */

type Variant = {
  id: number;
  kind: string;
  segment: string;
  locale: string;
  title: string;
  body: string;
  uses: number;
  retired: boolean;
  created_at: string | null;
};

type Bucket = { kind: string; segment: string; locale: string; n: number; uses: number };

type Pool = {
  buckets: Bucket[];
  target_per_bucket: number;
  segments: string[];
  items: Variant[];
};

type RunStatus = {
  running: boolean;
  done: number;
  total: number;
  current: string;
  generated: number;
  failed: number;
  error: string;
};

const SEGMENT_TONE: Record<string, string> = {
  new: "text-accent border-accent/40 bg-accent/10",
  active: "text-fg border-border bg-surface",
  at_risk: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  lapsed: "text-red-400 border-red-500/40 bg-red-500/10",
  all: "text-muted border-border bg-surface",
};

export default function PushCopyPage() {
  const [pool, setPool] = useState<Pool | null>(null);
  const [run, setRun] = useState<RunStatus | null>(null);
  const [kind, setKind] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<Set<number>>(new Set());
  const polling = useRef(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = kind ? `?kind=${encodeURIComponent(kind)}&limit=300` : "?limit=300";
      setPool(await api.get<Pool>(`/admin/push/copy${q}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load the pool");
    } finally {
      setLoading(false);
    }
  }, [kind]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Poll while a run is going.
   *
   * The pool count is the honest progress signal, not just the status object:
   * the run state is per-process, so with more than one instance the status
   * may be answered by a process that is not the one working. The table is in
   * Postgres and is always right, so it is reloaded either way.
   */
  const pollRun = useCallback(async () => {
    if (polling.current) return;
    polling.current = true;
    try {
      for (let i = 0; i < 60; i++) {
        await new Promise((r) => setTimeout(r, 4000));
        let s: RunStatus;
        try {
          s = await api.get<RunStatus>("/admin/push/copy/status");
        } catch {
          continue;
        }
        setRun(s);
        await load();
        if (!s.running) break;
      }
    } finally {
      polling.current = false;
    }
  }, [load]);

  async function generate(force: boolean) {
    setError(null);
    try {
      const body = kind ? { kinds: [kind], force } : { kinds: [], force };
      setRun(await api.post<RunStatus>("/admin/push/copy/generate", body));
      pollRun();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start generation");
    }
  }

  async function setRetired(id: number, retired: boolean) {
    setBusy((p) => new Set(p).add(id));
    try {
      await api.put(`/admin/push/copy/${id}`, { retired });
      setPool((p) =>
        p
          ? { ...p, items: p.items.map((v) => (v.id === id ? { ...v, retired } : v)) }
          : p
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update");
    } finally {
      setBusy((p) => {
        const n = new Set(p);
        n.delete(id);
        return n;
      });
    }
  }

  const kinds = Array.from(new Set((pool?.buckets ?? []).map((b) => b.kind))).sort();
  const target = pool?.target_per_bucket ?? 20;

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">Push copy</h1>
          <p className="text-sm text-muted mt-1 max-w-2xl">
            Written by the model nightly, one pool per notification type per
            audience, and picked per user at send time so nobody sees the same
            line twice. Read it before your users do &mdash; a generated line
            that reads badly is one tap from Settings.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className="text-xs bg-transparent border border-border rounded-lg px-2 py-2 text-fg"
          >
            <option value="">All types</option>
            {kinds.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          <button
            onClick={() => generate(false)}
            disabled={run?.running}
            className="text-xs px-3 py-2 rounded-lg border border-accent bg-accent/10 text-accent disabled:opacity-40 transition-colors"
          >
            {run?.running ? "Generating…" : "Top up thin buckets"}
          </button>
          <button
            onClick={() => generate(true)}
            disabled={run?.running}
            className="text-xs px-3 py-2 rounded-lg border border-border hover:border-border-strong text-fg disabled:opacity-40 transition-colors"
            title="Generate a fresh batch even where the bucket is already full"
          >
            Force
          </button>
        </div>
      </div>

      {run && (run.running || run.generated > 0 || run.error) && (
        <div className="mt-4 rounded-xl border border-border bg-surface px-4 py-3 text-sm">
          {run.running ? (
            <span className="text-fg">
              Generating {run.done}/{run.total}
              {run.current ? ` · ${run.current}` : ""} · {run.generated} written
              so far. This takes a few minutes.
            </span>
          ) : run.error ? (
            <span className="text-red-400">{run.error}</span>
          ) : (
            <span className="text-muted">
              Done · {run.generated} written
              {run.failed ? ` · ${run.failed} buckets failed` : ""}
            </span>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* How full each bucket is. A thin bucket is not a cosmetic problem:
          below the pool size the same user starts seeing repeats. */}
      {pool && pool.buckets.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
          {pool.buckets.map((b) => (
            <div
              key={`${b.kind}-${b.segment}-${b.locale}`}
              className="rounded-lg border border-border bg-surface px-3 py-2"
            >
              <div className="text-[11px] text-muted truncate" title={b.kind}>
                {b.kind}
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-lg font-bold ${
                    b.n < target / 2 ? "text-amber-400" : "text-fg"
                  }`}
                >
                  {b.n}
                </span>
                <span className="text-[11px] text-faint">/ {target}</span>
                <span className="text-[11px] text-muted ml-auto">{b.segment}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 space-y-2">
        {loading && !pool && <p className="text-sm text-muted">Loading…</p>}

        {pool && pool.items.length === 0 && (
          <div className="rounded-xl border border-border bg-surface px-4 py-8 text-center">
            <p className="text-sm text-fg">The pool is empty.</p>
            <p className="text-xs text-muted mt-1">
              Nudges fall back to their built-in copy until this is filled.
              Press &ldquo;Top up thin buckets&rdquo;.
            </p>
          </div>
        )}

        {pool?.items.map((v) => (
          <div
            key={v.id}
            className={`rounded-xl border p-3 ${
              v.retired
                ? "border-border bg-surface/40 opacity-50"
                : "border-border bg-surface"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-muted">{v.kind}</span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                  SEGMENT_TONE[v.segment] ?? SEGMENT_TONE.all
                }`}
              >
                {v.segment}
              </span>
              <span className="text-[11px] text-faint">sent {v.uses}×</span>
              <button
                onClick={() => setRetired(v.id, !v.retired)}
                disabled={busy.has(v.id)}
                className="ml-auto text-[11px] px-2 py-1 rounded-lg border border-border hover:border-border-strong text-muted hover:text-fg disabled:opacity-40 transition-colors"
              >
                {busy.has(v.id) ? "…" : v.retired ? "Restore" : "Retire"}
              </button>
            </div>
            <p className="text-sm font-semibold text-fg mt-2">{v.title}</p>
            <p className="text-sm text-muted">{v.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
