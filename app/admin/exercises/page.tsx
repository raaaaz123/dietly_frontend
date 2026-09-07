"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { api } from "../../lib/api";

/**
 * The exercise catalogue — 4,119 rows, so everything here is built around not
 * shipping or drawing all of them at once.
 *
 * The API returns the whole catalogue in one slim response (no prose) because
 * the filters below run client-side: filtering server-side would mean a round
 * trip per keystroke against a table the backend already holds in memory.
 * Drawing is paged, because 4,119 <tr> nodes is what makes a page feel broken.
 */

type Exercise = {
  id: string;
  name: string;
  slug: string;
  muscle_group: string;
  secondary_groups: string[];
  equipment: string;
  place: string;
  difficulty: string;
  default_sets: number;
  default_reps: string;
  instructions: string[];
  thumbnail_url: string;
  demo_video_url: string;
  video_key: string;
  poster_key: string;
  category: string;
  primary_muscles: string[];
  equipment_names: string[];
  is_core: boolean;
  is_published: boolean;
  is_deleted: boolean;
};

type Stats = {
  total: number;
  published: number;
  missing_video: number;
  missing_thumbnail: number;
  publishable: number;
  no_media: number;
};

const PAGE = 50;

const GROUPS = ["core", "upper", "lower", "full", "cardio"];
const TIERS = ["none", "basic", "full"];
const LEVELS = ["beginner", "intermediate", "advanced"];

const CHIP =
  "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border";

const GROUP_CHIP: Record<string, string> = {
  core: "bg-accent/15 text-accent border-accent/30",
  upper: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  lower: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  full: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  cardio: "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

export default function ExercisesPage() {
  const [rows, setRows] = useState<Exercise[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [group, setGroup] = useState("");
  const [tier, setTier] = useState("");
  const [level, setLevel] = useState("");
  const [state, setState] = useState("");
  const [page, setPage] = useState(0);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await api.get<{ items: Exercise[]; stats: Stats }>(
        "/exercises/admin/all"
      );
      setRows(res.items);
      setStats(res.stats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load the catalogue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((e) => {
      if (group && e.muscle_group !== group) return false;
      if (tier && e.equipment !== tier) return false;
      if (level && e.difficulty !== level) return false;
      if (state === "published" && !e.is_published) return false;
      if (state === "draft" && (e.is_published || e.is_deleted)) return false;
      if (state === "deleted" && !e.is_deleted) return false;
      if (state === "no_media" && hasMedia(e)) return false;
      if (state !== "deleted" && e.is_deleted) return false;
      if (!needle) return true;
      return (
        e.name.toLowerCase().includes(needle) ||
        e.slug.includes(needle) ||
        e.category?.toLowerCase().includes(needle) ||
        e.primary_muscles?.some((m) => m.toLowerCase().includes(needle))
      );
    });
  }, [rows, q, group, tier, level, state]);

  // Any filter change puts you back on page one — staying on page 40 of a
  // result set that now has three pages shows an empty table, which reads as
  // "the filter broke" rather than "you are past the end".
  useEffect(() => {
    setPage(0);
  }, [q, group, tier, level, state]);

  const pageRows = filtered.slice(page * PAGE, page * PAGE + PAGE);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));

  /** Optimistic, then reconciled: a publish toggle that waits for a round trip
   *  feels broken on a list this long. On failure we put the row back. */
  async function patch(id: string, changes: Partial<Exercise>) {
    setBusy(id);
    const before = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...changes } : r)));
    try {
      await api.put(`/exercises/admin/${id}`, changes);
    } catch (e) {
      setRows(before);
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string) {
    setBusy(id);
    const before = rows;
    setRows((rs) =>
      rs.map((r) => (r.id === id ? { ...r, is_deleted: true, is_published: false } : r))
    );
    try {
      await api.del(`/exercises/admin/${id}`);
    } catch (e) {
      setRows(before);
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(null);
    }
  }

  async function restore(id: string) {
    setBusy(id);
    try {
      await api.post(`/exercises/admin/${id}/restore`);
      setRows((rs) =>
        rs.map((r) => (r.id === id ? { ...r, is_deleted: false } : r))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Restore failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">Exercises</h1>
          <p className="text-sm text-muted mt-1">
            {loading
              ? "Loading catalogue…"
              : `${filtered.length.toLocaleString()} of ${rows.length.toLocaleString()} shown`}
          </p>
        </div>
        <button
          onClick={() => { setLoading(true); load(); }}
          className="text-xs text-muted hover:text-fg border border-border hover:border-border-strong px-3 py-2 rounded-lg transition-colors"
        >
          Reload
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Stat label="Total" value={stats.total} />
          <Stat label="Published" value={stats.published} tone="accent" />
          <Stat label="Ready to publish" value={stats.publishable} tone="accent" />
          <Stat label="No media" value={stats.no_media} tone="warn" />
          <Stat label="Missing video" value={stats.missing_video} tone="warn" />
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-3 mb-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, slug, muscle…"
          className="flex-1 bg-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-fg outline-none focus:border-accent transition-colors placeholder:text-faint"
        />
        <Select value={group} onChange={setGroup} label="All groups" options={GROUPS} />
        <Select value={tier} onChange={setTier} label="All equipment" options={TIERS} />
        <Select value={level} onChange={setLevel} label="All levels" options={LEVELS} />
        <Select
          value={state}
          onChange={setState}
          label="All states"
          options={["published", "draft", "no_media", "deleted"]}
        />
      </div>

      <div className="bg-elevated border border-border rounded-2xl overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap min-w-[900px]">
          <thead>
            <tr className="border-b border-border">
              {["Exercise", "Group", "Equipment", "Level", "Media", "State", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold text-faint uppercase tracking-wider"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-muted">
                  Loading 4,000+ movements…
                </td>
              </tr>
            )}
            {!loading && pageRows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-muted">
                  Nothing matches those filters.
                </td>
              </tr>
            )}
            {pageRows.map((e) => (
              <tr
                key={e.id}
                className="border-b border-border/50 last:border-0 hover:bg-ghost/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-fg">{e.name}</div>
                  <div className="text-xs text-faint font-mono">{e.slug}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`${CHIP} ${GROUP_CHIP[e.muscle_group] ?? "bg-ghost text-muted border-border"}`}>
                    {e.muscle_group}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">
                  <div>{e.equipment}</div>
                  <div className="text-xs text-faint">
                    {e.equipment_names?.slice(0, 2).join(", ")}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{e.difficulty}</td>
                <td className="px-4 py-3">
                  <MediaCell e={e} />
                </td>
                <td className="px-4 py-3">
                  {e.is_deleted ? (
                    <span className={`${CHIP} bg-red-500/15 text-red-400 border-red-500/30`}>
                      deleted
                    </span>
                  ) : e.is_published ? (
                    <span className={`${CHIP} bg-emerald-500/15 text-emerald-400 border-emerald-500/30`}>
                      live
                    </span>
                  ) : (
                    <span className={`${CHIP} bg-ghost text-muted border-border`}>draft</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {e.is_deleted ? (
                      <button
                        disabled={busy === e.id}
                        onClick={() => restore(e.id)}
                        className="text-xs text-muted hover:text-fg border border-border hover:border-border-strong px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                      >
                        Restore
                      </button>
                    ) : (
                      <>
                        <button
                          disabled={busy === e.id}
                          onClick={() => patch(e.id, { is_published: !e.is_published })}
                          className="text-xs text-muted hover:text-accent border border-border hover:border-accent/40 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                        >
                          {e.is_published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          disabled={busy === e.id}
                          onClick={() => remove(e.id)}
                          className="text-xs text-muted hover:text-red-400 border border-border hover:border-red-500/40 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="text-xs text-muted hover:text-fg border border-border px-3 py-2 rounded-lg disabled:opacity-30 transition-colors"
          >
            ← Previous
          </button>
          <span className="text-xs text-faint">
            Page {page + 1} of {pages}
          </span>
          <button
            disabled={page >= pages - 1}
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            className="text-xs text-muted hover:text-fg border border-border px-3 py-2 rounded-lg disabled:opacity-30 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

function hasMedia(e: Exercise) {
  return Boolean(e.video_key || e.poster_key || e.demo_video_url || e.thumbnail_url);
}

function MediaCell({ e }: { e: Exercise }) {
  const clip = Boolean(e.video_key || e.demo_video_url);
  const still = Boolean(e.poster_key || e.thumbnail_url);
  if (clip) return <span className={`${CHIP} bg-emerald-500/15 text-emerald-400 border-emerald-500/30`}>video</span>;
  if (still) return <span className={`${CHIP} bg-blue-500/15 text-blue-400 border-blue-500/30`}>still</span>;
  return <span className={`${CHIP} bg-ghost text-faint border-border`}>none</span>;
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "accent" | "warn";
}) {
  const color =
    tone === "accent" ? "text-accent" : tone === "warn" ? "text-orange-400" : "text-fg";
  return (
    <div className="bg-elevated border border-border rounded-2xl px-4 py-3">
      <div className={`text-xl font-black ${color}`}>{value?.toLocaleString() ?? "—"}</div>
      <div className="text-xs text-muted mt-0.5">{label}</div>
    </div>
  );
}

function Select({
  value,
  onChange,
  label,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}
