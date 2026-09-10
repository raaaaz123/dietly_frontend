"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";

/**
 * What users have asked for.
 *
 * Until this existed the only route into the app was a `mailto:` on the
 * Support row in Settings — so the product's own users were the one source of
 * direction nobody was collecting, and whatever did arrive landed in a
 * personal inbox where it was invisible to everyone else.
 *
 * Opens on what is outstanding rather than on everything, because a backlog
 * you have to filter before it means anything is a backlog nobody opens twice.
 * "Handled" is reversible on purpose: a one-way archive only ever gets used
 * carefully, and a list nobody dares tidy is a list nobody reads.
 */

type Request = {
  id: number;
  uid: string | null;
  email: string | null;
  kind: string;
  message: string;
  app_version: string | null;
  platform: string | null;
  created_at: string | null;
  handled_at: string | null;
};

type Feed = {
  items: Request[];
  total: number;
  open: number;
};

/** The picker's four values, and how each should read at a glance. */
const KINDS: Record<string, { label: string; tone: string }> = {
  feature: { label: "New idea", tone: "text-accent border-accent/40 bg-accent/10" },
  improvement: { label: "Improvement", tone: "text-fg border-border bg-surface" },
  bug: { label: "Bug", tone: "text-red-400 border-red-500/40 bg-red-500/10" },
  other: { label: "Other", tone: "text-muted border-border bg-surface" },
};

function when(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FeatureRequestsPage() {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [onlyOpen, setOnlyOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  /** Ids with a write in flight, so one row's spinner is not all of them. */
  const [busy, setBusy] = useState<Set<number>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await api.get<Feed>(
        `/admin/feature-requests?limit=200&only_open=${onlyOpen}`
      );
      setFeed(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load requests");
    } finally {
      setLoading(false);
    }
  }, [onlyOpen]);

  useEffect(() => {
    load();
  }, [load]);

  async function setHandled(id: number, handled: boolean) {
    setBusy((prev) => new Set(prev).add(id));
    try {
      await api.put(`/admin/feature-requests/${id}`, { handled });
      // Re-read rather than patching in place: with `onlyOpen` on, the row
      // just handled should leave the list, and reconciling that by hand is
      // how a list starts disagreeing with the database.
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update");
    } finally {
      setBusy((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">
            Feature requests
          </h1>
          <p className="text-sm text-muted mt-1 max-w-2xl">
            Sent from Settings in the app. The version and platform come with
            each one, because &ldquo;the timer resets&rdquo; means something
            different on the build where that was fixed.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOnlyOpen((v) => !v)}
            className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
              onlyOpen
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:text-fg hover:border-border-strong"
            }`}
          >
            {onlyOpen ? "Outstanding only" : "Showing all"}
          </button>
          <button
            onClick={load}
            disabled={loading}
            className="text-xs px-3 py-2 rounded-lg border border-border hover:border-border-strong text-fg disabled:opacity-40 transition-colors"
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </div>

      {feed && (
        <div className="grid grid-cols-2 gap-3 mt-6 max-w-md">
          <Stat label="Outstanding" value={feed.open} accent />
          <Stat label="All time" value={feed.total} />
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="mt-6 space-y-3">
        {loading && !feed && (
          <p className="text-sm text-muted">Loading…</p>
        )}

        {feed && feed.items.length === 0 && (
          <div className="rounded-xl border border-border bg-surface px-4 py-8 text-center">
            <p className="text-sm text-fg">
              {onlyOpen ? "Nothing outstanding." : "No requests yet."}
            </p>
            <p className="text-xs text-muted mt-1">
              {onlyOpen
                ? "Everything sent so far has been marked handled."
                : "They arrive from Settings → Request a feature."}
            </p>
          </div>
        )}

        {feed?.items.map((r) => {
          const kind = KINDS[r.kind] ?? KINDS.other;
          const working = busy.has(r.id);
          return (
            <div
              key={r.id}
              className={`rounded-xl border p-4 transition-colors ${
                r.handled_at
                  ? "border-border bg-surface/40 opacity-60"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${kind.tone}`}
                >
                  {kind.label}
                </span>
                <span className="text-[11px] text-muted">{when(r.created_at)}</span>
                {r.app_version && (
                  <span className="text-[11px] text-faint">
                    {r.platform ?? "ios"} · v{r.app_version}
                  </span>
                )}
                {r.handled_at && (
                  <span className="text-[11px] text-accent">
                    handled {when(r.handled_at)}
                  </span>
                )}
              </div>

              {/* `whitespace-pre-wrap`: people write these in paragraphs and a
                  wall of run-together text is a request nobody finishes. */}
              <p className="text-sm text-fg mt-3 whitespace-pre-wrap break-words">
                {r.message}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                <div className="text-[11px] text-muted break-all">
                  {r.email ? (
                    <a
                      href={`mailto:${r.email}?subject=Your%20Dietly%20request`}
                      className="hover:text-fg transition-colors"
                    >
                      {r.email}
                    </a>
                  ) : (
                    <span className="text-faint">no email left</span>
                  )}
                  {/* Null uid means the account was deleted — the request is
                      deliberately kept, so say why it has no owner. */}
                  {!r.uid && (
                    <span className="text-faint"> · account deleted</span>
                  )}
                </div>

                <button
                  onClick={() => setHandled(r.id, !r.handled_at)}
                  disabled={working}
                  className="text-xs px-3 py-1.5 rounded-lg border border-border hover:border-border-strong text-fg disabled:opacity-40 transition-colors"
                >
                  {working
                    ? "…"
                    : r.handled_at
                      ? "Mark outstanding"
                      : "Mark handled"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3">
      <div
        className={`text-2xl font-black ${accent ? "text-accent" : "text-fg"}`}
      >
        {value}
      </div>
      <div className="text-[11px] text-muted mt-0.5">{label}</div>
    </div>
  );
}
