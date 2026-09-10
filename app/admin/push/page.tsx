"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";

/**
 * Push: the registry, whether the hourly pass is actually running, what the
 * schedule says, and the three things you can only do by hand.
 *
 * Rewritten alongside the pivot. Two things were wrong with the old page and
 * both were about it reporting a world that no longer existed:
 *
 *   • It drew a `channels` row with `expo` beside `fcm`. Nothing has been able
 *     to mint an Expo token since the app became Swift, so that column read
 *     zero forever — and a zero on a dashboard is a measurement, not an
 *     absence. Expo rows are now counted as *debt*, with the purge that clears
 *     them next to the number.
 *   • It listed nudge kinds as bare identifiers. Fourteen of them, and no way
 *     to know what `afternoon_fuel` actually says to a customer without
 *     opening `proactive.py`. The schedule now explains itself, from the same
 *     source the sender reads.
 *
 * Broadcast defaults to a rehearsal and stays that way until someone types
 * the word — a real broadcast reaches every registered device at once and
 * there is no recall, so the confirm step is deliberately not a single click.
 */

type Overview = {
  devices: {
    total: number;
    users: number;
    platforms: Record<string, number>;
    channel?: string;
    expo_rows?: number;
    reachable?: number;
    freshness?: Record<string, number>;
  };
  history: {
    days: number;
    since: string;
    series: { day: string; total: number; by_kind?: Record<string, number> }[];
    by_kind: Record<string, number>;
    total: number;
    last_send_day: string | null;
    silent_days: number | null;
    sent_today: number;
  };
  schedule: {
    kinds: string[];
    kind_notes?: Record<string, string>;
    max_per_day?: number;
    lapsed_after_days?: number;
    last_run: Record<string, unknown> | null;
    recent_runs: Record<string, unknown>[];
  };
  health: { ok: boolean; problems: string[] };
};

type BroadcastResult = {
  dry_run?: boolean;
  targeted_users?: number;
  targeted_devices?: number;
  sent?: number;
  failed?: number;
  [k: string]: unknown;
};

export default function PushPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(14);

  const load = useCallback(async () => {
    setError(null);
    try {
      setData(await api.get<Overview>(`/admin/push/overview?days=${days}`));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load push overview");
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    load();
  }, [load]);

  const expoRows = data?.devices.expo_rows ?? 0;

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">Push</h1>
          <p className="text-sm text-muted mt-1">
            {loading
              ? "Loading…"
              : `${data?.devices.total ?? 0} devices · ${data?.devices.users ?? 0} accounts · native APNs via FCM`}
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="bg-elevated border border-border rounded-xl px-3 py-2 text-sm text-fg outline-none focus:border-accent"
          >
            {[7, 14, 30, 90].map((d) => (
              <option key={d} value={d}>
                Last {d} days
              </option>
            ))}
          </select>
          <button
            onClick={load}
            className="text-xs text-muted hover:text-fg border border-border hover:border-border-strong px-3 py-2 rounded-lg transition-colors"
          >
            Reload
          </button>
        </div>
      </div>

      {error && <Banner tone="error">{error}</Banner>}

      {data && !data.health.ok && (
        <div className="mb-6 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3">
          <p className="text-sm font-semibold text-orange-400 mb-1.5">Needs attention</p>
          <ul className="text-sm text-orange-300/90 space-y-1 list-disc pl-4">
            {data.health.problems.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}
      {data && data.health.ok && (
        <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          Delivery looks healthy — the hourly pass is running and devices are registered.
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <Stat label="Devices" value={data.devices.total} />
            {/* Reachable, not registered. The registry keeps a row until a send
                fails, so a 90-day-old row is an uninstall being counted as an
                install — and every delivery rate computed against the total is
                wrong by however many of those there are. */}
            <Stat
              label="Reachable (30d)"
              value={data.devices.reachable ?? 0}
              tone="accent"
            />
            <Stat label="Sent today" value={data.history.sent_today} tone="accent" />
            <Stat label={`Sent (${data.history.days}d)`} value={data.history.total} />
            <Stat
              label="Silent days"
              value={data.history.silent_days ?? 0}
              tone={(data.history.silent_days ?? 0) > 2 ? "warn" : undefined}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mb-6">
            <Card title="Registry">
              <KV label="Channel" value={(data.devices.channel ?? "fcm").toUpperCase()} />
              <KV label="Platforms" value={fmtCounts(data.devices.platforms)} />
              {data.devices.freshness && (
                <KV label="Freshness" value={fmtCounts(data.devices.freshness)} />
              )}
              <PurgeExpo rows={expoRows} onDone={load} />
            </Card>

            <Card title="Schedule">
              <KV
                label="Last run"
                value={
                  data.schedule.last_run
                    ? String(data.schedule.last_run.at ?? "—")
                    : "never since this deployment"
                }
              />
              <KV label="Nudge kinds" value={String(data.schedule.kinds.length)} />
              <KV
                label="Cap per user / day"
                value={
                  data.schedule.max_per_day
                    ? `${data.schedule.max_per_day} (streak saver exempt)`
                    : "—"
                }
              />
              <KV
                label="Lapsed after"
                value={
                  data.schedule.lapsed_after_days
                    ? `${data.schedule.lapsed_after_days} days — comeback only`
                    : "—"
                }
              />
              <RunNow onDone={load} />
            </Card>
          </div>

          <Schedule
            kinds={data.schedule.kinds}
            notes={data.schedule.kind_notes ?? {}}
            counts={data.history.by_kind}
            days={data.history.days}
          />

          <Sparkline series={data.history.series} />
        </>
      )}

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <TestSend />
        <Broadcast onSent={load} />
      </div>
    </div>
  );
}

/**
 * The schedule, explained. One row per kind: what it is for, and how many went
 * out in the window.
 *
 * A kind at zero is the row worth looking at — either its condition genuinely
 * never held, or the rule is broken and nobody would know, because a nudge that
 * never fires produces exactly the same silence as one whose condition is
 * simply never true.
 */
function Schedule({
  kinds,
  notes,
  counts,
  days,
}: {
  kinds: string[];
  notes: Record<string, string>;
  counts: Record<string, number>;
  days: number;
}) {
  return (
    <Card title={`Schedule — sends in the last ${days} days`} className="mb-6">
      <div className="mt-1 divide-y divide-border">
        {kinds.map((kind) => {
          const n = counts[kind] ?? 0;
          return (
            <div key={kind} className="flex items-start gap-4 py-2.5">
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${n ? "text-fg" : "text-muted"}`}>
                  {kind}
                </p>
                {notes[kind] && (
                  <p className="text-xs text-faint mt-0.5">{notes[kind]}</p>
                )}
              </div>
              <span
                className={`shrink-0 text-sm tabular-nums ${
                  n ? "text-accent font-semibold" : "text-faint"
                }`}
              >
                {n.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/**
 * The Expo cleanup, offered only when there is something to clean.
 *
 * Rehearsal first, like the broadcast, and for the same reason: it deletes
 * rows across every account and the count is the thing to look at before
 * pressing anything.
 */
function PurgeExpo({ rows, onDone }: { rows: number; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  if (!rows) {
    return (
      <p className="text-xs text-faint mt-3 pt-3 border-t border-border">
        No legacy Expo rows. The sender is FCM-only — Expo was the React-Native
        build&apos;s channel and nothing can register one now.
      </p>
    );
  }

  async function run(dryRun: boolean) {
    setBusy(true);
    setMsg(null);
    try {
      const r = await api.post<{ found?: number; deleted?: number }>(
        "/admin/push/purge-expo",
        { dry_run: dryRun }
      );
      setMsg(
        dryRun
          ? `${r.found ?? 0} legacy rows found. Nothing deleted.`
          : `Deleted ${r.deleted ?? 0} of ${r.found ?? 0}.`
      );
      if (!dryRun) onDone();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Purge failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-border">
      <p className="text-xs text-orange-400 mb-2">
        {rows} legacy Expo row{rows === 1 ? "" : "s"} — unreachable, and counted
        in every device total until removed.
      </p>
      <div className="flex gap-2">
        <button
          disabled={busy}
          onClick={() => run(true)}
          className="text-xs text-muted hover:text-fg border border-border hover:border-border-strong px-3 py-2 rounded-lg transition-colors disabled:opacity-40"
        >
          {busy ? "Working…" : "Count them"}
        </button>
        <button
          disabled={busy}
          onClick={() => run(false)}
          className="text-xs text-red-400 hover:text-red-300 border border-red-500/40 hover:border-red-500/70 px-3 py-2 rounded-lg transition-colors disabled:opacity-30"
        >
          Purge
        </button>
      </div>
      {msg && <p className="text-xs text-muted mt-2">{msg}</p>}
    </div>
  );
}

function RunNow({ onDone }: { onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setMsg(null);
    try {
      const r = await api.post<Record<string, unknown>>("/admin/push/run-now");
      setMsg(
        `Checked ${r.users_checked ?? "?"} users · nudged ${r.users_nudged ?? 0} · sent ${r.nudges_sent ?? 0}`
      );
      onDone();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Run failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-border">
      <button
        disabled={busy}
        onClick={run}
        className="text-xs text-muted hover:text-accent border border-border hover:border-accent/40 px-3 py-2 rounded-lg transition-colors disabled:opacity-40"
      >
        {busy ? "Running…" : "Run hourly pass now"}
      </button>
      <p className="text-xs text-faint mt-2">
        Same function the scheduler calls, same per-day dedup — safe to press.
      </p>
      {msg && <p className="text-xs text-muted mt-2">{msg}</p>}
    </div>
  );
}

function TestSend() {
  const [uid, setUid] = useState("");
  const [title, setTitle] = useState("Dietly test push");
  const [body, setBody] = useState("If this appeared, push works on this device.");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  /** Which real nudge to fire. Empty means the fixed title/body above. */
  const [kind, setKind] = useState("");
  const [kinds, setKinds] = useState<string[]>([]);

  useEffect(() => {
    api
      .get<{ kinds?: string[] }>("/admin/push/catalogue")
      .then((c) => setKinds(c.kinds ?? []))
      .catch(() => {});
  }, []);

  async function send() {
    if (!uid.trim()) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      // A named kind sends that nudge with its real generated copy, which the
      // fixed-title test cannot do — proving a token is alive says nothing
      // about whether the message for a given nudge reads well on a lock
      // screen, and that is the thing worth checking before turning one on.
      setResult(
        kind
          ? await api.post("/admin/push/test-kind", { uid: uid.trim(), kind })
          : await api.post("/admin/push/test", { uid: uid.trim(), title, body })
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Send failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card title="Test send">
      <div className="mb-3">
        <label className="text-[11px] text-muted block mb-1">
          Send as a real nudge
        </label>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className="w-full text-xs bg-transparent border border-border rounded-lg px-2 py-2 text-fg"
        >
          <option value="">Custom message (title and body below)</option>
          {kinds.map((k) => (
            <option key={k} value={k}>
              {k} — with its generated copy
            </option>
          ))}
        </select>
        {kind && (
          <p className="text-[11px] text-faint mt-1">
            Ignores the daily cap and the send window. Still respects the
            user&rsquo;s category switches &mdash; a test that ignored those
            would be the one way to push a promotion at somebody who opted out.
          </p>
        )}
      </div>
      <p className="text-xs text-faint mb-3">
        One account, per-token verdict. The first thing to check when someone
        reports getting nothing — <code>third-party-auth-error</code> means
        Firebase has no APNs key for this bundle id,{" "}
        <code>registration-token-not-registered</code> means the install is gone,
        and no rows at all means the app never registered.
      </p>
      <Input value={uid} onChange={setUid} placeholder="User UID" />
      <Input value={title} onChange={setTitle} placeholder="Title" />
      <Input value={body} onChange={setBody} placeholder="Body" />
      <button
        disabled={busy || !uid.trim()}
        onClick={send}
        className="mt-1 text-xs text-muted hover:text-accent border border-border hover:border-accent/40 px-3 py-2 rounded-lg transition-colors disabled:opacity-40"
      >
        {busy ? "Sending…" : "Send test"}
      </button>
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      {result != null && <Pre value={result} />}
    </Card>
  );
}

function Broadcast({ onSent }: { onSent: () => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [offer, setOffer] = useState(false);
  const [onlyFree, setOnlyFree] = useState(false);
  const [activeDays, setActiveDays] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<BroadcastResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState("");

  const payload = () => ({
    title: title.trim(),
    body: body.trim(),
    offer,
    only_free: onlyFree,
    active_within_days: activeDays ? Number(activeDays) : null,
  });

  async function run(dryRun: boolean) {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const r = await api.post<BroadcastResult>("/admin/push/broadcast", {
        ...payload(),
        dry_run: dryRun,
      });
      setResult(r);
      if (!dryRun) {
        setConfirm("");
        onSent();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Broadcast failed");
    } finally {
      setBusy(false);
    }
  }

  const ready = title.trim().length > 0 && body.trim().length > 0;
  // Typed, not clicked. A broadcast reaches every device at once and cannot be
  // recalled, so the irreversible path asks for more than a stray tap.
  const armed = confirm.trim().toUpperCase() === "SEND";

  return (
    <Card title="Broadcast">
      <p className="text-xs text-faint mb-3">
        Every registered device. Rehearse first — the dry run reports who it
        would reach without sending.
      </p>
      <Input value={title} onChange={setTitle} placeholder="Title" />
      <Input value={body} onChange={setBody} placeholder="Body" />
      {/* The lock screen truncates, and it truncates the body first. Shown as a
          count rather than enforced: a long message is a judgement call, and
          this page should inform it, not overrule it. */}
      <Preview title={title} body={body} />
      <div className="flex flex-wrap gap-4 my-2">
        <Check label="Opens paywall" checked={offer} onChange={setOffer} />
        <Check label="Free tier only" checked={onlyFree} onChange={setOnlyFree} />
      </div>
      <Input
        value={activeDays}
        onChange={setActiveDays}
        placeholder="Active within N days (blank = all)"
      />

      <div className="flex flex-wrap gap-2 mt-2">
        <button
          disabled={busy || !ready}
          onClick={() => run(true)}
          className="text-xs text-muted hover:text-fg border border-border hover:border-border-strong px-3 py-2 rounded-lg transition-colors disabled:opacity-40"
        >
          {busy ? "Working…" : "Dry run"}
        </button>
        <input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Type SEND to arm"
          className="w-36 bg-elevated border border-border rounded-lg px-3 py-2 text-xs text-fg outline-none focus:border-red-500/50 placeholder:text-faint"
        />
        <button
          disabled={busy || !ready || !armed}
          onClick={() => run(false)}
          className="text-xs text-red-400 hover:text-red-300 border border-red-500/40 hover:border-red-500/70 px-3 py-2 rounded-lg transition-colors disabled:opacity-30"
        >
          Send for real
        </button>
      </div>

      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      {result && (
        <>
          <p className={`text-xs mt-3 ${result.dry_run ? "text-muted" : "text-emerald-400"}`}>
            {result.dry_run
              ? `Rehearsal — would reach ${result.targeted_devices ?? 0} device(s) across ${result.targeted_users ?? 0} account(s). Nothing was sent.`
              : `Sent to ${result.sent ?? 0} device(s)${result.failed ? `, ${result.failed} failed` : ""}.`}
          </p>
          <Pre value={result} />
        </>
      )}
    </Card>
  );
}

/** What the banner looks like, and where the phone will cut it off. */
function Preview({ title, body }: { title: string; body: string }) {
  if (!title && !body) return null;
  const long = title.length > 40 || body.length > 110;
  return (
    <div className="mb-2 rounded-xl border border-border bg-bg px-3 py-2.5">
      <p className="text-sm font-semibold text-fg truncate">{title || "Title"}</p>
      <p className="text-xs text-muted line-clamp-2">{body || "Body"}</p>
      <p className={`text-[10px] mt-1.5 ${long ? "text-orange-400" : "text-faint"}`}>
        {title.length} / {body.length} chars
        {long ? " — a lock screen shows roughly 40 and 110." : ""}
      </p>
    </div>
  );
}

function Sparkline({ series }: { series: { day: string; total: number }[] }) {
  if (!series?.length) return null;
  const max = Math.max(1, ...series.map((s) => s.total));
  return (
    <Card title="Daily sends">
      <div className="flex items-end gap-1 h-24 mt-2">
        {series.map((s) => (
          <div key={s.day} className="flex-1 group relative flex flex-col justify-end h-full">
            <div
              className={`w-full rounded-t ${s.total ? "bg-accent/70" : "bg-ghost"}`}
              style={{ height: `${Math.max(2, (s.total / max) * 100)}%` }}
            />
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-muted opacity-0 group-hover:opacity-100 whitespace-nowrap">
              {s.day.slice(5)}: {s.total}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------------- bits */

const fmtCounts = (o: Record<string, number> | undefined) =>
  o && Object.keys(o).length
    ? Object.entries(o)
        .map(([k, v]) => `${k} ${v}`)
        .join(" · ")
    : "—";

function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-elevated border border-border rounded-2xl px-5 py-4 ${className}`}>
      <p className="text-xs font-semibold text-faint uppercase tracking-wider mb-2">{title}</p>
      {children}
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm py-1">
      <span className="text-muted">{label}</span>
      <span className="text-fg text-right">{value}</span>
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

function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full mb-2 bg-bg border border-border rounded-lg px-3 py-2 text-sm text-fg outline-none focus:border-accent transition-colors placeholder:text-faint"
    />
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-current"
      />
      {label}
    </label>
  );
}

function Pre({ value }: { value: unknown }) {
  return (
    <pre className="mt-2 text-[11px] text-muted bg-bg border border-border rounded-lg p-3 overflow-x-auto max-h-56">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

function Banner({ tone, children }: { tone: "error"; children: React.ReactNode }) {
  return (
    <div
      className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
        tone === "error" ? "border-red-500/30 bg-red-500/10 text-red-400" : ""
      }`}
    >
      {children}
    </div>
  );
}
