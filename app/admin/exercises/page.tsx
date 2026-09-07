"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../lib/api";

/**
 * The exercise catalogue — 4,119 rows, so nothing here loads all of them.
 *
 * Filtering and paging are both server-side. The earlier version pulled the
 * whole catalogue and filtered in the browser, which meant megabytes over the
 * wire on every load so the page could draw fifty rows. The backend already
 * holds the catalogue in memory, so asking it for one page costs it nothing
 * and costs us one small response.
 */

type Exercise = {
  id: string;
  name: string;
  slug: string;
  muscle_group: string;
  equipment: string;
  place: string;
  difficulty: string;
  default_sets: number;
  default_reps: string;
  default_rest_sec: number;
  instructions: string[];
  cues: string[];
  thumbnail_url: string;
  demo_video_url: string;
  media_source: "bucket" | "source" | "none";
  has_media: boolean;
  category: string;
  primary_muscles: string[];
  secondary_muscles: string[];
  equipment_names: string[];
  languages?: string[];
  overview?: string;
  tips?: string[];
  is_core: boolean;
  is_published: boolean;
  is_deleted: boolean;
};

type Stats = {
  total: number;
  published: number;
  publishable: number;
  no_media: number;
  missing_video: number;
};

type ListResponse = {
  items: Exercise[];
  total: number;
  offset: number;
  limit: number;
  stats: Stats;
};

const PAGE = 50;
const GROUPS = ["core", "upper", "lower", "full", "cardio"];
const TIERS = ["none", "basic", "full"];
const LEVELS = ["beginner", "intermediate", "advanced"];
const STATES = ["published", "draft", "publishable", "no_media", "deleted"];

const CHIP = "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border";
const GROUP_CHIP: Record<string, string> = {
  core: "bg-accent/15 text-accent border-accent/30",
  upper: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  lower: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  full: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  cardio: "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

const isVideo = (u: string) => /\.(mp4|mov|m4v|webm)(\?|$)/i.test(u);

export default function ExercisesPage() {
  const [rows, setRows] = useState<Exercise[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState<Exercise | null>(null);

  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [group, setGroup] = useState("");
  const [tier, setTier] = useState("");
  const [level, setLevel] = useState("");
  const [state, setState] = useState("");
  const [page, setPage] = useState(0);

  // One request per pause in typing, not one per keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 300);
    return () => clearTimeout(t);
  }, [q]);

  // Any filter change puts you back on page one — staying on page 40 of a
  // three-page result shows an empty table, which reads as a broken filter.
  useEffect(() => {
    setPage(0);
  }, [debouncedQ, group, tier, level, state]);

  const reqId = useRef(0);

  const load = useCallback(
    async (refresh = false) => {
      const mine = ++reqId.current;
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          offset: String(page * PAGE),
          limit: String(PAGE),
        });
        if (debouncedQ) params.set("q", debouncedQ);
        if (group) params.set("group", group);
        if (tier) params.set("equipment", tier);
        if (level) params.set("difficulty", level);
        if (state) params.set("state", state);
        if (refresh) params.set("refresh", "true");

        const res = await api.get<ListResponse>(`/exercises/admin/all?${params}`);
        // A slower earlier request must not overwrite a newer one's results.
        if (mine !== reqId.current) return;
        setRows(res.items);
        setTotal(res.total);
        setStats(res.stats);
      } catch (e) {
        if (mine !== reqId.current) return;
        setError(e instanceof Error ? e.message : "Could not load the catalogue");
      } finally {
        if (mine === reqId.current) setLoading(false);
      }
    },
    [page, debouncedQ, group, tier, level, state]
  );

  useEffect(() => {
    load();
  }, [load]);

  const pages = Math.max(1, Math.ceil(total / PAGE));

  async function act(id: string, fn: () => Promise<unknown>, patch: Partial<Exercise>) {
    setBusy(id);
    const before = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setOpen((o) => (o && o.id === id ? { ...o, ...patch } : o));
    try {
      await fn();
    } catch (e) {
      setRows(before);
      setError(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusy(null);
    }
  }

  const publish = (e: Exercise) =>
    act(e.id, () => api.put(`/exercises/admin/${e.id}`, { is_published: !e.is_published }), {
      is_published: !e.is_published,
    });
  const remove = (e: Exercise) =>
    act(e.id, () => api.del(`/exercises/admin/${e.id}`), {
      is_deleted: true,
      is_published: false,
    });
  const restore = (e: Exercise) =>
    act(e.id, () => api.post(`/exercises/admin/${e.id}/restore`), { is_deleted: false });

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">Exercises</h1>
          <p className="text-sm text-muted mt-1">
            {loading ? "Loading…" : `${total.toLocaleString()} matching`}
            {total > 0 && !loading && (
              <span className="text-faint">
                {" "}· showing {page * PAGE + 1}–{Math.min((page + 1) * PAGE, total)}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => load(true)}
          className="text-xs text-muted hover:text-fg border border-border hover:border-border-strong px-3 py-2 rounded-lg transition-colors"
        >
          Reload catalogue
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
        <Select value={state} onChange={setState} label="All states" options={STATES} />
      </div>

      <div className="bg-elevated border border-border rounded-2xl overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap min-w-[900px]">
          <thead>
            <tr className="border-b border-border">
              {["", "Exercise", "Group", "Equipment", "Level", "Media", "State", ""].map((h, i) => (
                <th
                  key={i}
                  className="text-left px-4 py-3 text-xs font-semibold text-faint uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-muted">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-muted">
                  Nothing matches those filters.
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((e) => (
                <tr
                  key={e.id}
                  onClick={() => setOpen(e)}
                  className="border-b border-border/50 last:border-0 hover:bg-ghost/50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-2">
                    <Thumb e={e} />
                  </td>
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
                    <MediaChip e={e} />
                  </td>
                  <td className="px-4 py-3">
                    <StateChip e={e} />
                  </td>
                  <td className="px-4 py-3 text-right" onClick={(ev) => ev.stopPropagation()}>
                    <RowActions
                      e={e}
                      busy={busy === e.id}
                      onPublish={() => publish(e)}
                      onDelete={() => remove(e)}
                      onRestore={() => restore(e)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            disabled={page === 0 || loading}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="text-xs text-muted hover:text-fg border border-border px-3 py-2 rounded-lg disabled:opacity-30 transition-colors"
          >
            ← Previous
          </button>
          <span className="text-xs text-faint">
            Page {page + 1} of {pages}
          </span>
          <button
            disabled={page >= pages - 1 || loading}
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            className="text-xs text-muted hover:text-fg border border-border px-3 py-2 rounded-lg disabled:opacity-30 transition-colors"
          >
            Next →
          </button>
        </div>
      )}

      {open && (
        <Detail
          exercise={open}
          busy={busy === open.id}
          onClose={() => setOpen(null)}
          onPublish={() => publish(open)}
          onDelete={() => remove(open)}
          onRestore={() => restore(open)}
        />
      )}
    </div>
  );
}

function Thumb({ e }: { e: Exercise }) {
  const src = e.thumbnail_url;
  if (!src)
    return (
      <div className="w-12 h-12 rounded-lg bg-ghost border border-border flex items-center justify-center text-faint text-lg">
        ◌
      </div>
    );
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading="lazy"
      className="w-12 h-12 rounded-lg object-cover bg-ghost border border-border"
    />
  );
}

function MediaChip({ e }: { e: Exercise }) {
  const clip = Boolean(e.demo_video_url);
  const still = Boolean(e.thumbnail_url);
  const suffix = e.media_source === "source" ? " · src" : "";
  if (clip)
    return <span className={`${CHIP} bg-emerald-500/15 text-emerald-400 border-emerald-500/30`}>video{suffix}</span>;
  if (still)
    return <span className={`${CHIP} bg-blue-500/15 text-blue-400 border-blue-500/30`}>still{suffix}</span>;
  return <span className={`${CHIP} bg-ghost text-faint border-border`}>none</span>;
}

function StateChip({ e }: { e: Exercise }) {
  if (e.is_deleted)
    return <span className={`${CHIP} bg-red-500/15 text-red-400 border-red-500/30`}>deleted</span>;
  if (e.is_published)
    return <span className={`${CHIP} bg-emerald-500/15 text-emerald-400 border-emerald-500/30`}>live</span>;
  return <span className={`${CHIP} bg-ghost text-muted border-border`}>draft</span>;
}

function RowActions({
  e,
  busy,
  onPublish,
  onDelete,
  onRestore,
}: {
  e: Exercise;
  busy: boolean;
  onPublish: () => void;
  onDelete: () => void;
  onRestore: () => void;
}) {
  const btn =
    "text-xs border px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-40";
  if (e.is_deleted)
    return (
      <button disabled={busy} onClick={onRestore} className={`${btn} text-muted hover:text-fg border-border hover:border-border-strong`}>
        Restore
      </button>
    );
  return (
    <div className="flex items-center justify-end gap-2">
      <button disabled={busy} onClick={onPublish} className={`${btn} text-muted hover:text-accent border-border hover:border-accent/40`}>
        {e.is_published ? "Unpublish" : "Publish"}
      </button>
      <button disabled={busy} onClick={onDelete} className={`${btn} text-muted hover:text-red-400 border-border hover:border-red-500/40`}>
        Delete
      </button>
    </div>
  );
}

function Detail({
  exercise,
  busy,
  onClose,
  onPublish,
  onDelete,
  onRestore,
}: {
  exercise: Exercise;
  busy: boolean;
  onClose: () => void;
  onPublish: () => void;
  onDelete: () => void;
  onRestore: () => void;
}) {
  const [full, setFull] = useState<Exercise>(exercise);

  // The list ships slim rows; the prose and cues come from the item endpoint.
  useEffect(() => {
    let live = true;
    api
      .get<Exercise>(`/exercises/admin/item/${exercise.id}`)
      .then((d) => live && setFull(d))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [exercise.id]);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => ev.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const e = { ...full, ...exercise };
  const clip = e.demo_video_url;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <aside className="relative w-full max-w-xl bg-bg border-l border-border overflow-y-auto">
        <div className="sticky top-0 bg-bg border-b border-border px-5 py-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-black text-fg truncate">{e.name}</h2>
            <p className="text-xs text-faint font-mono truncate">{e.slug}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-fg text-xl leading-none px-2">
            ×
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="rounded-xl overflow-hidden border border-border bg-ghost">
            {clip && isVideo(clip) ? (
              <video src={clip} controls loop muted playsInline poster={e.thumbnail_url || undefined} className="w-full max-h-80 object-contain bg-black" />
            ) : clip || e.thumbnail_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={clip || e.thumbnail_url} alt={e.name} className="w-full max-h-80 object-contain" />
            ) : (
              <div className="h-40 flex items-center justify-center text-faint text-sm">No media</div>
            )}
          </div>
          {e.media_source === "source" && (
            <p className="text-xs text-faint -mt-3">
              Showing the unrendered source file — the branded media pass has not run for this movement.
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <StateChip e={e} />
            <span className={`${CHIP} ${GROUP_CHIP[e.muscle_group] ?? "bg-ghost text-muted border-border"}`}>{e.muscle_group}</span>
            <span className={`${CHIP} bg-ghost text-muted border-border`}>{e.equipment}</span>
            <span className={`${CHIP} bg-ghost text-muted border-border`}>{e.place}</span>
            <span className={`${CHIP} bg-ghost text-muted border-border`}>{e.difficulty}</span>
            {e.is_core && <span className={`${CHIP} bg-accent/15 text-accent border-accent/30`}>core</span>}
          </div>

          <Field label="Prescription">
            {e.default_sets} × {e.default_reps} · {e.default_rest_sec}s rest
          </Field>
          {e.category && <Field label="Source category">{e.category}</Field>}
          {e.equipment_names?.length > 0 && <Field label="Kit">{e.equipment_names.join(", ")}</Field>}
          {e.primary_muscles?.length > 0 && <Field label="Primary muscles">{e.primary_muscles.join(", ")}</Field>}
          {e.secondary_muscles?.length > 0 && <Field label="Secondary muscles">{e.secondary_muscles.join(", ")}</Field>}
          {e.languages && e.languages.length > 0 && (
            <Field label={`Languages (${e.languages.length})`}>{e.languages.join(" · ")}</Field>
          )}

          {e.overview && (
            <div>
              <p className="text-xs font-semibold text-faint uppercase tracking-wider mb-1.5">Overview</p>
              <p className="text-sm text-muted leading-relaxed">{e.overview}</p>
            </div>
          )}

          {e.instructions?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-faint uppercase tracking-wider mb-1.5">
                Instructions ({e.instructions.length})
              </p>
              <ol className="text-sm text-muted space-y-1.5 list-decimal pl-4">
                {e.instructions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          )}

          {e.tips && e.tips.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-faint uppercase tracking-wider mb-1.5">Tips</p>
              <ul className="text-sm text-muted space-y-1.5 list-disc pl-4">
                {e.tips.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-bg border-t border-border px-5 py-4 flex gap-2">
          <RowActions e={e} busy={busy} onPublish={onPublish} onDelete={onDelete} onRestore={onRestore} />
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-faint uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-muted">{children}</p>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: "accent" | "warn" }) {
  const color = tone === "accent" ? "text-accent" : tone === "warn" ? "text-orange-400" : "text-fg";
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
