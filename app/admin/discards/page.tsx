"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";

/**
 * Why people binned a workout.
 *
 * A discarded session saves nothing — no sets, no volume, no streak, no ranks —
 * which is the point of discarding and also why this page has to exist: the
 * completion rate can say how many sessions were dropped and nothing else in
 * the product can say why. "Too hard", "the machine was taken" and "wrong day,
 * opened it by mistake" are three different problems that look identical in
 * every other chart.
 *
 * The share column is what the page is for; the recent rows are what make it
 * believable. Accounts are shown as an eight-character prefix — enough to tell
 * two rows apart and to match a support ticket, not a list of user ids on a
 * screen somebody leaves open.
 */

type ByReason = {
  reason: string;
  count: number;
  avg_sets: number;
  avg_minutes: number;
  share: number;
};

type Row = {
  id: number;
  uid: string;
  reason: string;
  detail: string | null;
  day_no: number | null;
  title: string | null;
  sets_logged: number;
  sets_planned: number;
  elapsed_min: number | null;
  created_at: string | null;
};

type Feed = {
  days: number;
  total: number;
  by_reason: ByReason[];
  recent: Row[];
};

/**
 * The same vocabulary the app offers, spelled the way the app spells it.
 *
 * Kept in step by hand rather than served from the API: the values are a closed
 * set defined in `training.py`, and a label the dashboard invents for one it
 * has not heard of is worse than showing the raw value — so an unknown reason
 * falls through to its own id rather than to "Other".
 */
const REASONS: Record<string, { label: string; tone: string }> = {
  mistake: { label: "Opened it by mistake", tone: "text-muted" },
  wrong_session: { label: "Wrong session for today", tone: "text-muted" },
  no_time: { label: "Ran out of time", tone: "text-fg" },
  too_hard: { label: "Too hard today", tone: "text-red-400" },
  too_easy: { label: "Too easy", tone: "text-amber-400" },
  equipment: { label: "Kit was taken", tone: "text-fg" },
  injury: { label: "Something hurt", tone: "text-red-400" },
  app_issue: { label: "The app got in the way", tone: "text-red-400" },
  declined: { label: "Rather not say", tone: "text-faint" },
  other: { label: "Other", tone: "text-faint" },
};

const WINDOWS = [7, 30, 90];

function label(reason: string): string {
  return REASONS[reason]?.label ?? reason;
}

function tone(reason: string): string {
  return REASONS[reason]?.tone ?? "text-fg";
}

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

export default function DiscardsPage() {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setFeed(await api.get<Feed>(`/admin/workout-discards?days=${days}&limit=200`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load discards");
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">Discarded workouts</h1>
          <p className="text-sm text-muted mt-1">
            Why sessions were binned. Asked in the app the moment somebody throws one away —
            it is the only thing a discarded workout leaves behind.
          </p>
        </div>
        <div className="flex gap-1 shrink-0">
          {WINDOWS.map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                days === d
                  ? "bg-accent/10 text-accent border-accent/40"
                  : "text-muted border-border hover:text-fg"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 border border-red-500/40 bg-red-500/10 text-red-400 text-sm rounded-2xl p-4">
          {error}
        </div>
      )}

      {loading && !feed ? (
        <div className="p-8 flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !feed || feed.total === 0 ? (
        <div className="bg-elevated border border-border rounded-2xl p-8 text-center">
          <p className="text-sm font-semibold text-fg">Nothing binned in this window</p>
          <p className="text-xs text-muted mt-1">
            Either nobody dropped a session, or the app build people are running predates the
            question.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-elevated border border-border rounded-2xl p-5 mb-6">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-black text-fg">{feed.total}</span>
              <span className="text-sm text-muted">
                discarded in the last {feed.days} days
              </span>
            </div>

            <div className="space-y-3">
              {feed.by_reason.map((r) => (
                <div key={r.reason}>
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className={`text-sm font-semibold ${tone(r.reason)}`}>
                      {label(r.reason)}
                    </span>
                    <span className="text-xs text-muted shrink-0">
                      {r.count} · {r.share}%
                      {r.avg_sets > 0 && (
                        <span className="text-faint"> · {r.avg_sets} sets in</span>
                      )}
                    </span>
                  </div>
                  {/* Against the commonest reason, not against the total: at a
                      long tail every bar is a sliver and the shape says nothing. */}
                  <div className="h-2 bg-ghost rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent/60 rounded-full"
                      style={{
                        width: `${Math.max(
                          2,
                          (r.count / Math.max(...feed.by_reason.map((x) => x.count))) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs font-bold text-muted tracking-widest mb-3">RECENT</p>
          <div className="bg-elevated border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-faint border-b border-border">
                    <th className="px-4 py-3 font-semibold">When</th>
                    <th className="px-4 py-3 font-semibold">Reason</th>
                    <th className="px-4 py-3 font-semibold">Session</th>
                    <th className="px-4 py-3 font-semibold text-right">Sets</th>
                    <th className="px-4 py-3 font-semibold text-right">Mins</th>
                    <th className="px-4 py-3 font-semibold">User</th>
                  </tr>
                </thead>
                <tbody>
                  {feed.recent.map((row) => (
                    <tr key={row.id} className="border-b border-border/60 last:border-0">
                      <td className="px-4 py-3 text-muted whitespace-nowrap">
                        {when(row.created_at)}
                      </td>
                      <td className={`px-4 py-3 font-semibold ${tone(row.reason)}`}>
                        {label(row.reason)}
                        {row.detail && (
                          <span className="block text-xs text-muted font-normal mt-0.5">
                            {row.detail}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-fg">
                        {row.title || "—"}
                        {row.day_no ? (
                          <span className="text-faint text-xs"> · day {row.day_no}</span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-right text-muted whitespace-nowrap">
                        {row.sets_logged}
                        <span className="text-faint">/{row.sets_planned || "—"}</span>
                      </td>
                      <td className="px-4 py-3 text-right text-muted">
                        {row.elapsed_min ?? "—"}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-faint">{row.uid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-elevated border border-border rounded-2xl p-5">
            <p className="text-xs font-bold text-muted tracking-widest mb-3">READING THIS</p>
            <ul className="space-y-1.5 text-sm text-muted">
              <li>· Nothing from a discarded session is saved — these rows are all that survive it</li>
              <li>· &ldquo;Sets&rdquo; is how far in they were: logged out of planned</li>
              <li>· &ldquo;Rather not say&rdquo; is the denominator — the other shares mean little without it</li>
              <li>· &ldquo;Too hard&rdquo; climbing is a plan problem; &ldquo;kit was taken&rdquo; climbing is not</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
