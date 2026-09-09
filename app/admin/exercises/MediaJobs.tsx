"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../lib/api";

/**
 * The two catalogue jobs, with somewhere to run them.
 *
 * Both already existed on the backend and neither had a control in this admin
 * app — they were only reachable from `tools/glow_media_dashboard.py`, a
 * separate Python service. So the catalogue sat in a state that looks correct
 * here and is broken in the app, with nothing on this page to say so or to fix
 * it:
 *
 * **Build media.** The importer writes the dataset's own URLs into
 * `source_video_url` / `source_image_url`. Those are private — `_row()`, the
 * path the phone app reads, never emits them, because serving one routes a user
 * past the private bucket to the unbranded clip every competitor ships. Only
 * `poster_key` / `video_key` reach the app, and only this job writes them. Until
 * it runs, the MEDIA column here reads `· src`, every thumbnail you see is the
 * admin-only fallback, and the app shows no artwork at all.
 *
 * **Select core.** Sets `priority`, the core-set rank. `sort=popular` orders by
 * it, so while every row is 0 "popular" degrades to alphabetical and the
 * catalogue opens on "1 to 2 Jump Box" and "A brief introduction" — in Explore,
 * and on the onboarding screen that asks for money.
 *
 * **Migrate images.** Every row that has not been through build-media still
 * serves its thumbnail straight from `apilyfta.com` — somebody else's host, on
 * the critical path of every exercise card, over an unsigned URL that names the
 * dataset we licensed. This mirrors those stills into our own private bucket
 * under the `poster_key` the row already has a column for. It does **not**
 * touch video: no key, no source URL, no re-encode.
 *
 * None of these is written to be run from a request: build is minutes to hours
 * and all three are fire-and-forget, so this starts them and then polls.
 */

type BuildStatus = {
  running: boolean;
  done: number;
  total: number;
  rendered: number;
  skipped: number;
  failed: number;
  error: string;
  current: string;
  started_at: string;
  finished_at: string;
};

/** `GET /exercises/admin/migrate-images/status`. */
type MigrateStatus = {
  running: boolean;
  done: number;
  total: number;
  migrated: number;
  failed: number;
  error: string;
  current: string;
  /** Standing counts, answered whether or not a run is in progress. */
  /** Every non-deleted row in the catalogue. Distinct from `total`, which is
   *  how many rows the *current run* is working through. */
  total_catalogue: number;
  ours: number;
  pending: number;
  foreign_still: number;
  source_only: number;
  no_still: number;
};

export default function MediaJobs({ onChanged }: { onChanged: () => void }) {
  const [migrate, setMigrate] = useState<MigrateStatus | null>(null);
  const [status, setStatus] = useState<BuildStatus | null>(null);
  const [limit, setLimit] = useState(25);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /// Set while a run is in progress so the catalogue is reloaded once — and
  /// only once — when it stops.
  const wasRunning = useRef(false);
  const migrateWasRunning = useRef(false);

  const poll = useCallback(async () => {
    try {
      const s = await api.get<BuildStatus>("/exercises/admin/build-media/status");
      setStatus(s);
      // Polled alongside, not instead: the two jobs are independent and the
      // image counts are worth showing even when neither is running.
      try {
        const m = await api.get<MigrateStatus>(
          "/exercises/admin/migrate-images/status"
        );
        setMigrate(m);
        // Read from the response, not from `migrate` — that is the previous
        // render's state, so testing it here would decide a run had finished
        // one poll late, or never.
        if (migrateWasRunning.current && !m.running) {
          migrateWasRunning.current = false;
          onChanged();
        }
      } catch {
        // A backend that predates this route. The panel hides itself rather
        // than reporting an error for a job that does not exist there.
      }
      if (wasRunning.current && !s.running) {
        wasRunning.current = false;
        onChanged();
      }
      if (s.running) wasRunning.current = true;
    } catch {
      // A failed poll is not worth a banner — the next one is two seconds away.
    }
  }, [onChanged]);

  useEffect(() => {
    poll();
    // Only while something is running. A permanent two-second timer against a
    // job that finished an hour ago is a request every two seconds forever.
    const id = setInterval(poll, status?.running ? 2000 : 15000);
    return () => clearInterval(id);
  }, [poll, status?.running]);

  async function build() {
    setBusy(true);
    setError(null);
    setNote(null);
    try {
      const s = await api.post<BuildStatus>(
        `/exercises/admin/build-media?limit=${limit}&publish=true`
      );
      setStatus(s);
      wasRunning.current = true;
      setNote(`Rendering ${limit} rows. This keeps running if you leave the page.`);
    } catch (e) {
      // The 503 here is the useful one: it names the missing bucket setting
      // rather than failing silently, so it is shown verbatim.
      setError(e instanceof Error ? e.message : "Could not start the build");
    } finally {
      setBusy(false);
    }
  }

  async function selectCore() {
    setBusy(true);
    setError(null);
    setNote(null);
    try {
      // Synchronous, unlike the build — it reads the whole catalogue and
      // answers with what it marked.
      const r = await api.post<{
        marked?: number;
        of?: number;
        with_clip?: number;
        must_have_present?: number;
        must_have_total?: number;
      }>("/exercises/admin/select-core?target=300");
      const marked = r?.marked ?? 0;
      const must =
        r?.must_have_total != null
          ? ` · ${r.must_have_present}/${r.must_have_total} staples present`
          : "";
      setNote(
        `Ranked ${marked.toLocaleString()} of ${(r?.of ?? 0).toLocaleString()}${must}. ` +
          `"Most trained" ordering now means something.`
      );
      onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not rank the core set");
    } finally {
      setBusy(false);
    }
  }

  async function migrateImages() {
    setBusy(true);
    setError(null);
    setNote(null);
    try {
      const r = await api.post<MigrateStatus>(
        `/exercises/admin/migrate-images?limit=${limit}`
      );
      setMigrate(r);
      migrateWasRunning.current = true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start the image migration");
    } finally {
      setBusy(false);
    }
  }

  const running = status?.running ?? false;
  const migrating = migrate?.running ?? false;
  const migratePct =
    migrate && migrate.total > 0
      ? Math.round((migrate.done / migrate.total) * 100)
      : 0;
  const pct =
    status && status.total > 0
      ? Math.round((status.done / status.total) * 100)
      : 0;

  return (
    <div className="border border-border rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-sm font-semibold text-fg">Catalogue jobs</h2>
          <p className="text-xs text-muted mt-1 max-w-xl">
            Rows showing <span className="text-fg">· src</span> have media in the
            database but nothing rendered into your bucket — the app cannot show
            those. Build media is what makes them visible in the app.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-muted">
            Rows
            <input
              type="number"
              min={1}
              max={500}
              value={limit}
              onChange={(e) => setLimit(Math.max(1, Number(e.target.value) || 1))}
              className="ml-2 w-20 bg-transparent border border-border rounded-lg px-2 py-1 text-fg"
              disabled={running}
            />
          </label>
          <button
            onClick={build}
            disabled={busy || running}
            className="text-xs px-3 py-2 rounded-lg border border-border hover:border-border-strong text-fg disabled:opacity-40 transition-colors"
          >
            {running ? "Building…" : "Build media"}
          </button>
          <button
            onClick={selectCore}
            disabled={busy || running}
            className="text-xs px-3 py-2 rounded-lg border border-border hover:border-border-strong text-muted hover:text-fg disabled:opacity-40 transition-colors"
          >
            Rank core set
          </button>
        </div>
      </div>

      {status && (running || status.done > 0) && (
        <div className="mt-4">
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-muted mt-2">
            {status.done}/{status.total} · {status.rendered} rendered ·{" "}
            {status.skipped} skipped
            {status.failed > 0 && (
              <span className="text-warn"> · {status.failed} failed</span>
            )}
            {status.current && running && (
              <span className="text-faint"> · {status.current}</span>
            )}
          </p>
          {status.error && (
            <p className="text-xs text-warn mt-1">{status.error}</p>
          )}
        </div>
      )}

      {migrate && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-fg">Exercise images</h3>
              <p className="text-xs text-muted mt-1 max-w-xl">
                Unmigrated rows serve their thumbnail from{" "}
                <code className="text-fg">apilyfta.com</code> — a host we
                don&apos;t own, on the critical path of every exercise card, over
                an unsigned URL that names the dataset. This copies those stills
                into our private bucket. Videos are not touched.
              </p>
            </div>
            <button
              onClick={migrateImages}
              disabled={busy || migrating || running || migrate.pending === 0}
              className="shrink-0 text-xs px-3 py-2 rounded-lg border border-border hover:border-border-strong text-fg disabled:opacity-40 transition-colors"
            >
              {migrating
                ? "Migrating…"
                : migrate.pending === 0
                  ? "All migrated"
                  : `Migrate ${Math.min(limit, migrate.pending)} images`}
            </button>
          </div>

          {/* The two numbers asked for, plus what is left. Percentage as well
              as counts: "3,180 of 4,119" is a fraction somebody has to do in
              their head, and the whole point of this panel is knowing at a
              glance whether the catalogue is ours yet. */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <Stat label="Total exercises" value={migrate.total_catalogue} />
            <Stat
              label="Served from our bucket"
              value={migrate.ours}
              accent
              suffix={
                migrate.total_catalogue > 0
                  ? ` · ${Math.round((migrate.ours / migrate.total_catalogue) * 100)}%`
                  : undefined
              }
            />
            <Stat label="Still external" value={migrate.pending} warn={migrate.pending > 0} />
          </div>

          {(migrating || migrate.done > 0) && (
            <div className="mt-4">
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${migratePct}%` }}
                />
              </div>
              <p className="text-xs text-muted mt-2">
                {migrate.done}/{migrate.total} · {migrate.migrated} migrated
                {migrate.failed > 0 && (
                  <span className="text-warn"> · {migrate.failed} failed</span>
                )}
                {migrate.current && migrating && (
                  <span className="text-faint"> · {migrate.current}</span>
                )}
              </p>
              {migrate.error && (
                <p className="text-xs text-warn mt-1">{migrate.error}</p>
              )}
            </div>
          )}
        </div>
      )}

      {note && <p className="text-xs text-accent mt-3">{note}</p>}
      {error && <p className="text-xs text-warn mt-3">{error}</p>}
    </div>
  );
}

/// One number, named. Three of these is the whole answer to "is the catalogue
/// ours yet", which is the question this panel exists for.
function Stat({
  label,
  value,
  accent,
  warn,
  suffix,
}: {
  label: string;
  value: number;
  accent?: boolean;
  warn?: boolean;
  suffix?: string;
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
