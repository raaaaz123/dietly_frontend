"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../lib/api";

/**
 * The video bench: look at a few renders before spending a night on four thousand.
 *
 * Branding a clip is a full re-encode — H.264 carries no alpha, so every frame
 * is segmented, recoloured and encoded again at roughly twenty seconds of CPU.
 * The catalogue is ~1,900 clips. That is not a job to start on a hunch, and
 * until this page existed the only way to see a render at all was to run it
 * over the live catalogue and inspect the result in the app.
 *
 * So: pick a handful, render them three ways in memory, and look.
 *
 *     SOURCE     the dataset frame, untouched
 *     CURRENT    what ships today
 *     PROPOSED   the engine being evaluated
 *
 * Three panels rather than two, because a render only looks wrong next to the
 * one it replaces. On its own, every version looks plausible.
 *
 * Previews are **clips, not frames**. The artefact that actually matters on
 * video is a region flipping between backdrop and figure on content that did
 * not move — a patch of a squat rack blinking — and that is invisible in a
 * screenshot and obvious in two seconds of playback.
 */

type Candidate = {
  id: string;
  slug: string;
  name: string;
  muscle_group: string;
  has_video: boolean;
  migrated_video: boolean;
};

type Preview = {
  slug: string;
  name: string;
  kind: string;
  engine_asked: string;
  engine_used: string | null;
  error: string | null;
  source: string | null;
  current: string | null;
  proposed: string | null;
  ms_current: number | null;
  ms_proposed: number | null;
};

type VideoStatus = {
  running: boolean;
  total: number;
  done: number;
  migrated: number;
  failed: number;
  error: string;
  current: string;
  engine: string;
  total_with_video: number;
  ours: number;
  pending: number;
};

/** A preview run, as the backend reports it while it works. */
type PreviewJob = {
  running: boolean;
  total: number;
  done: number;
  current: string;
  error: string;
  items: Preview[];
};

/** The engines, and what each is actually doing. */
const ENGINES = [
  {
    id: "matte",
    label: "Closed-form matting",
    note: "Solves real fractional coverage over a trimap (pymatting). Slower, much better edges.",
  },
  {
    id: "source",
    label: "Source alpha → matting",
    note: "Reads the file's own alpha where it has one; falls back to matting. Best for stills.",
  },
  {
    id: "guided",
    label: "Guided filter (current)",
    note: "What ships today: edge-aware smoothing of a binary mask.",
  },
];

export default function ExerciseVideosPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [engine, setEngine] = useState("matte");
  const [crf, setCrf] = useState(23);
  const [kind, setKind] = useState<"video" | "still">("video");
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [rendering, setRendering] = useState(false);
  const [progress, setProgress] = useState<
    { done: number; total: number; current: string } | null
  >(null);
  const [status, setStatus] = useState<VideoStatus | null>(null);
  const [limit, setLimit] = useState(25);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wasRunning = useRef(false);

  const poll = useCallback(async () => {
    try {
      const s = await api.get<VideoStatus>("/exercises/admin/migrate-videos/status");
      setStatus(s);
      if (wasRunning.current && !s.running) wasRunning.current = false;
    } catch {
      // Leave the last known state rather than blanking the panel on one
      // dropped poll.
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.get<{ items: Candidate[] }>(
          `/exercises/admin/render/candidates?limit=60&kind=${kind}`
        );
        setCandidates(r.items ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load exercises");
      }
    })();
  }, [kind]);

  useEffect(() => {
    poll();
    const t = setInterval(poll, 3000);
    return () => clearInterval(t);
  }, [poll]);

  function toggle(slug: string) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      // Eight is the cap the backend enforces; past that nobody compares,
      // they scroll.
      else if (next.size < 8) next.add(slug);
      return next;
    });
  }

  /**
   * Start a preview run, then poll it.
   *
   * This used to be a single POST that waited for every render. It could not
   * be: one exercise is two full re-encodes (14-19s on a fast laptop, several
   * times that on the server), the picker allows eight, and `/api/admin/*` is
   * capped at `maxDuration = 60`. So the request was killed mid-render and
   * came back as a gateway-timeout HTML page — which is why the failure showed
   * up as an empty error box rather than anything actionable.
   *
   * Polling also means results appear one at a time instead of all at the end,
   * so the first comparison is on screen while the rest are still encoding.
   */
  async function runPreview() {
    if (picked.size === 0) return;
    setRendering(true);
    setError(null);
    setPreviews([]);
    setProgress(null);
    try {
      const started = await api.post<PreviewJob>(
        "/exercises/admin/render/preview",
        { slugs: [...picked], engine, kind, crf }
      );
      if (started.error) {
        setError(started.error);
        setRendering(false);
        return;
      }
      setProgress({ done: started.done, total: started.total, current: started.current });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start the render");
      setRendering(false);
      return;
    }

    // Every 1.5s, asking only for what we do not already have: each item
    // carries two base64 clips, so re-fetching the finished ones on every poll
    // would be megabytes a second of content already on screen.
    const got: Preview[] = [];
    while (true) {
      await new Promise((r) => setTimeout(r, 1500));
      let job: PreviewJob;
      try {
        job = await api.get<PreviewJob>(
          `/exercises/admin/render/preview/status?since=${got.length}`
        );
      } catch {
        // One dropped poll is not a failed render. Keep waiting; a genuinely
        // dead server will surface when the next one fails too.
        continue;
      }
      if (job.items?.length) {
        got.push(...job.items);
        setPreviews([...got]);
      }
      setProgress({ done: job.done, total: job.total, current: job.current });
      if (!job.running) {
        if (job.error) setError(job.error);
        setRendering(false);
        setProgress(null);
        return;
      }
    }
  }

  async function migrate() {
    setBusy(true);
    setError(null);
    try {
      const s = await api.post<VideoStatus>(
        `/exercises/admin/migrate-videos?limit=${limit}&engine=${engine}&crf=${crf}`
      );
      setStatus(s);
      wasRunning.current = true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start the migration");
    } finally {
      setBusy(false);
    }
  }

  const running = status?.running ?? false;
  const pct = status && status.total > 0
    ? Math.round((status.done / status.total) * 100) : 0;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-black tracking-tight text-fg">Exercise videos</h1>
      <p className="text-sm text-muted mt-1 max-w-2xl">
        Branding a clip is a full re-encode — H.264 carries no alpha, so every
        frame is segmented, recoloured and encoded again. Render a few here and
        look at them before running the catalogue.
      </p>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {status && (
        <div className="grid grid-cols-3 gap-3 mt-6">
          <Stat label="Exercises with a clip" value={status.total_with_video} />
          <Stat label="Served from our bucket" value={status.ours} accent
            suffix={status.total_with_video > 0
              ? ` · ${Math.round((status.ours / status.total_with_video) * 100)}%` : undefined} />
          <Stat label="Still external" value={status.pending} warn={status.pending > 0} />
        </div>
      )}

      {/* ---- 1. Settings ---- */}
      <Section title="1 · How to render">
        <div className="flex flex-wrap gap-3">
          {ENGINES.map((e) => (
            <button
              key={e.id}
              onClick={() => setEngine(e.id)}
              className={`text-left px-3 py-2 rounded-lg border transition-colors max-w-xs ${
                engine === e.id
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-border-strong"
              }`}
            >
              <div className={`text-xs font-semibold ${engine === e.id ? "text-accent" : "text-fg"}`}>
                {e.label}
              </div>
              <div className="text-[11px] text-muted mt-0.5">{e.note}</div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <label className="text-xs text-muted">
            Quality (CRF)
            <input
              type="number" min={16} max={32} value={crf}
              onChange={(e) => setCrf(Math.max(16, Math.min(32, Number(e.target.value) || 23)))}
              className="ml-2 w-16 bg-transparent border border-border rounded-lg px-2 py-1 text-fg"
            />
            {/* Lower is better and bigger. Said here because "CRF" means
                nothing to anybody who has not encoded video, and the default
                that ships today is 25. */}
            <span className="ml-2 text-[11px] text-faint">
              lower = better &amp; larger · ships at 25
            </span>
          </label>

          <label className="text-xs text-muted">
            Preview
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as "video" | "still")}
              className="ml-2 bg-elevated border border-border rounded-lg px-2 py-1 text-fg"
            >
              <option value="video">Clips</option>
              <option value="still">Stills</option>
            </select>
          </label>
        </div>
      </Section>

      {/* ---- 2. Pick ---- */}
      <Section title={`2 · Pick a few (${picked.size}/8)`}>
        <div className="flex flex-wrap gap-2">
          {candidates.map((c) => {
            const on = picked.has(c.slug);
            return (
              <button
                key={c.slug}
                onClick={() => toggle(c.slug)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                  on
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:text-fg hover:border-border-strong"
                }`}
                title={c.migrated_video ? "Already in our bucket" : "Still external"}
              >
                {c.name}
                {c.migrated_video && <span className="ml-1 text-accent">✓</span>}
              </button>
            );
          })}
          {candidates.length === 0 && (
            <p className="text-xs text-muted">No exercises with a source clip.</p>
          )}
        </div>

        <button
          onClick={runPreview}
          disabled={rendering || picked.size === 0}
          className="mt-4 text-xs px-3 py-2 rounded-lg border border-border hover:border-border-strong text-fg disabled:opacity-40 transition-colors"
        >
          {rendering ? "Rendering…" : `Render ${picked.size || ""} preview${picked.size === 1 ? "" : "s"}`}
        </button>
        {rendering && (
          <p className="text-xs text-muted mt-2">
            {progress && progress.total > 0 ? (
              <>
                {progress.done} of {progress.total} done
                {progress.current ? ` · rendering ${progress.current}` : ""} · two
                renders each, so allow {kind === "video" ? "20–40s" : "2s"} per
                exercise. Results appear as they finish.
              </>
            ) : (
              <>Starting…</>
            )}
          </p>
        )}
      </Section>

      {/* ---- 3. Judge ---- */}
      {previews.length > 0 && (
        <Section title="3 · Is it better?">
          <div className="space-y-6">
            {previews.map((p) => (
              <div key={p.slug} className="border border-border rounded-xl p-4">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="text-sm font-semibold text-fg">{p.name}</h3>
                  <p className="text-[11px] text-faint">
                    {p.engine_used && p.engine_used !== p.engine_asked && (
                      // Said plainly. Every engine degrades — matting falls
                      // back when pymatting is missing or the solve is
                      // degenerate — and showing a fallback labelled as the
                      // thing that was asked for is the one way this page can
                      // actively mislead.
                      <span className="text-warn">
                        fell back to {p.engine_used} ·{" "}
                      </span>
                    )}
                    {p.ms_current}ms → {p.ms_proposed}ms
                  </p>
                </div>

                {p.error ? (
                  <p className="text-xs text-warn mt-2">{p.error}</p>
                ) : (
                  <div className="grid md:grid-cols-3 gap-3 mt-3">
                    <Panel label="Source" tone="muted">
                      {p.source && (
                        // Plain <img>, not next/image: these are `data:` URIs
                        // by design — a preview that leaves objects in the
                        // bucket needs a cleanup job, and a cleanup job that
                        // fails leaves rejected renders beside the live ones.
                        // next/image cannot optimise a data URI anyway.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.source} alt="" className="w-full rounded-lg" />
                      )}
                    </Panel>
                    <Panel label="Current" tone="muted">
                      <Media src={p.current} kind={p.kind} />
                    </Panel>
                    <Panel label="Proposed" tone="accent">
                      <Media src={p.proposed} kind={p.kind} />
                    </Panel>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ---- 4. Commit ---- */}
      <Section title="4 · Run it on the catalogue">
        <p className="text-xs text-muted max-w-2xl">
          Writes <code className="text-fg">video_key</code> and, where the render
          produced one, <code className="text-fg">poster_key</code> — the poster
          is cut from the clip at 45% through, four times the resolution of the
          shipped thumbnail for no extra download. Rows already in our bucket are
          skipped, so an interrupted run resumes rather than repeating.
        </p>

        <div className="flex items-center gap-2 mt-4">
          <label className="text-xs text-muted">
            Clips
            <input
              type="number" min={1} max={4000} value={limit}
              onChange={(e) => setLimit(Math.max(1, Number(e.target.value) || 1))}
              className="ml-2 w-24 bg-transparent border border-border rounded-lg px-2 py-1 text-fg"
              disabled={running}
            />
          </label>
          <button
            onClick={migrate}
            disabled={busy || running || (status?.pending ?? 0) === 0}
            className="text-xs px-3 py-2 rounded-lg border border-border hover:border-border-strong text-fg disabled:opacity-40 transition-colors"
          >
            {running
              ? "Migrating…"
              : (status?.pending ?? 0) === 0
                ? "All migrated"
                : `Migrate ${Math.min(limit, status?.pending ?? 0)} clips with ${engine}`}
          </button>
        </div>

        {status && (running || status.done > 0) && (
          <div className="mt-4">
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all duration-500"
                style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs text-muted mt-2">
              {status.done}/{status.total} · {status.migrated} migrated
              {status.engine && <span className="text-faint"> · {status.engine}</span>}
              {status.failed > 0 && <span className="text-warn"> · {status.failed} failed</span>}
              {status.current && running && (
                <span className="text-faint"> · {status.current}</span>
              )}
            </p>
            {status.error && <p className="text-xs text-warn mt-1">{status.error}</p>}
          </div>
        )}
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ bits */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="text-xs font-semibold text-faint uppercase tracking-wider mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Panel({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "muted" | "accent";
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className={`text-[11px] font-semibold mb-1.5 ${
        tone === "accent" ? "text-accent" : "text-muted"
      }`}>
        {label}
      </p>
      <div className="bg-black rounded-lg overflow-hidden">{children}</div>
    </div>
  );
}

/** A clip or a still, whichever the preview produced. */
function Media({ src, kind }: { src: string | null; kind: string }) {
  if (!src) return <div className="aspect-video bg-elevated" />;
  if (kind === "video") {
    return (
      // Muted and looping, because the comparison is a loop played next to
      // another loop — a control bar somebody has to press twice makes two
      // clips impossible to watch together.
      <video src={src} autoPlay loop muted playsInline className="w-full rounded-lg" />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className="w-full rounded-lg" />;
}

function Stat({
  label, value, accent, warn, suffix,
}: {
  label: string; value: number; accent?: boolean; warn?: boolean; suffix?: string;
}) {
  const tone = accent ? "text-accent" : warn ? "text-warn" : "text-fg";
  return (
    <div className="border border-border rounded-lg px-3 py-2">
      <div className={`text-lg font-bold ${tone}`}>
        {value.toLocaleString()}
        {suffix && <span className="text-xs font-medium text-muted">{suffix}</span>}
      </div>
      <div className="text-[11px] text-muted mt-0.5">{label}</div>
    </div>
  );
}
