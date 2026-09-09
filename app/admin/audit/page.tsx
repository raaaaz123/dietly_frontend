"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";

/**
 * The admin audit trail — who changed what.
 *
 * B4 in the production readiness audit: admin is one shared static key, with no
 * identity, no per-user revocation and no audit trail, and behind it sit every
 * exercise, every user's detail and every subscription tier. Real per-admin
 * accounts are the eventual fix. The record is the part that has to exist
 * first, because unlike an account system it cannot be added retroactively —
 * a month with no log is a month with no answer, permanently.
 *
 * The `session` column is a hash of the dashboard cookie, attached by the proxy
 * at `/api/admin/[...path]`. It is attribution among people who are already
 * trusted, not authentication: anyone holding the admin key can send any header
 * they like. What it does buy is that two sign-ins are two ids, so "which of us
 * set this account to pro" has an answer — and a row reading `unknown` means
 * something *other* than this dashboard is using the key, which is the single
 * most interesting thing this page can tell you.
 */

type Entry = {
  id: string;
  at: string | null;
  session: string | null;
  action: string | null;
  target: string | null;
  method: string | null;
  path: string | null;
  detail: Record<string, unknown>;
};

type Log = {
  entries: Entry[];
  total: number;
  days?: number;
  actions?: string[];
  error?: string;
};

const METHOD_TONE: Record<string, string> = {
  GET: "text-muted border-border",
  POST: "text-emerald-400 border-emerald-500/30",
  PUT: "text-sky-400 border-sky-500/30",
  PATCH: "text-sky-400 border-sky-500/30",
  DELETE: "text-red-400 border-red-500/30",
};

export default function AuditPage() {
  const [data, setData] = useState<Log | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);
  const [target, setTarget] = useState("");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setError(null);
    try {
      const params = new URLSearchParams({ days: String(days), limit: "300" });
      if (target.trim()) params.set("target", target.trim());
      setData(await api.get<Log>(`/admin/audit?${params}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load the audit log");
    } finally {
      setLoading(false);
    }
  }, [days, target]);

  useEffect(() => {
    load();
  }, [load]);

  // Filtered in the browser rather than on the server: the response is already
  // capped, and a free-text box that round-trips on every keystroke is slower
  // and no more correct.
  const entries = (data?.entries ?? []).filter((e) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      (e.action ?? "").toLowerCase().includes(q) ||
      (e.target ?? "").toLowerCase().includes(q) ||
      (e.session ?? "").toLowerCase().includes(q) ||
      (e.path ?? "").toLowerCase().includes(q)
    );
  });

  const sessions = new Set(entries.map((e) => e.session ?? "unknown"));
  const unattributed = entries.filter((e) => (e.session ?? "unknown") === "unknown").length;

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">Audit</h1>
          <p className="text-sm text-muted mt-1">
            {loading
              ? "Loading…"
              : `${entries.length} entr${entries.length === 1 ? "y" : "ies"} · ${sessions.size} session${sessions.size === 1 ? "" : "s"}`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="bg-elevated border border-border rounded-xl px-3 py-2 text-sm text-fg outline-none focus:border-accent"
          >
            {[7, 30, 90, 365].map((d) => (
              <option key={d} value={d}>
                Last {d} days
              </option>
            ))}
          </select>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Exact target (uid, id)"
            className="w-48 bg-elevated border border-border rounded-xl px-3 py-2 text-sm text-fg outline-none focus:border-accent placeholder:text-faint"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter…"
            className="w-40 bg-elevated border border-border rounded-xl px-3 py-2 text-sm text-fg outline-none focus:border-accent placeholder:text-faint"
          />
          <button
            onClick={load}
            className="text-xs text-muted hover:text-fg border border-border hover:border-border-strong px-3 py-2 rounded-lg transition-colors"
          >
            Reload
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
      {data?.error && (
        <div className="mb-5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-400">
          {data.error}
        </div>
      )}

      {/* The row that earns this page. An unattributed mutation is one made by
          something that is not the dashboard — a script, a stale integration,
          or somebody holding the key directly — and it is the only thing here
          that ever needs acting on. */}
      {unattributed > 0 && (
        <div className="mb-5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-300/90">
          <span className="font-semibold text-orange-400">
            {unattributed} unattributed change{unattributed === 1 ? "" : "s"}.
          </span>{" "}
          These reached the API with the admin key but no dashboard session —
          something other than this panel is holding the key.
        </div>
      )}

      {!loading && entries.length === 0 && (
        <div className="rounded-2xl border border-border bg-elevated px-5 py-8 text-center">
          <p className="text-sm text-muted">Nothing recorded in this window.</p>
          <p className="text-xs text-faint mt-1">
            Mutations are written as they happen — an empty log means no admin
            change was made, not that logging is off.
          </p>
        </div>
      )}

      <div className="space-y-2">
        {entries.map((entry) => (
          <Row key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function Row({ entry }: { entry: Entry }) {
  const [open, setOpen] = useState(false);
  const status = Number((entry.detail as { status?: number })?.status ?? 0);
  const failed = status >= 400;

  return (
    <div className="bg-elevated border border-border rounded-xl px-4 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex flex-wrap items-center gap-3 text-left"
      >
        <span
          className={`shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
            METHOD_TONE[entry.method ?? ""] ?? "text-muted border-border"
          }`}
        >
          {entry.method ?? "—"}
        </span>
        <span className="min-w-0 flex-1 text-sm text-fg font-medium truncate">
          {entry.path ?? entry.action ?? "—"}
        </span>
        {entry.target && (
          <span className="shrink-0 text-xs font-mono text-accent truncate max-w-[14rem]">
            {entry.target}
          </span>
        )}
        {/* Failures kept and marked rather than filtered out: a run of 403s on
            an admin route is the shape of somebody trying keys. */}
        {status > 0 && (
          <span
            className={`shrink-0 text-xs tabular-nums ${
              failed ? "text-red-400" : "text-muted"
            }`}
          >
            {status}
          </span>
        )}
        <span
          className={`shrink-0 text-[11px] font-mono ${
            (entry.session ?? "unknown") === "unknown" ? "text-orange-400" : "text-faint"
          }`}
        >
          {entry.session ?? "unknown"}
        </span>
        <span className="shrink-0 text-xs text-faint tabular-nums">{when(entry.at)}</span>
      </button>

      {open && (
        <pre className="mt-3 text-[11px] text-muted bg-bg border border-border rounded-lg p-3 overflow-x-auto max-h-72">
          {JSON.stringify(entry.detail, null, 2)}
        </pre>
      )}
    </div>
  );
}

/** Local time, to the minute. Seconds are noise on a page read after the fact. */
function when(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
