"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";

/**
 * The remote switches the app reads at launch.
 *
 * Separate from Freemium Config, which is about allowances. These change the
 * shape of the funnel, and the paywall one is the only setting in the product
 * that can decide whether an install ever reaches the app at all — so it is
 * spelled out here as the two modes it actually produces rather than as a
 * boolean called `onboarding_paywall_closable`.
 *
 * Hard is a real business decision with real consequences: it converts better
 * per install, and it makes Dietly a paid app in Apple's eyes, so the terms,
 * restore-purchases and privacy links on the paywall have to be correct or it
 * is a 3.1.2 rejection. The app keeps one safety valve regardless — if the
 * store returns no plans, the paywall stays closable, because a store outage
 * must not brick every new install behind a screen that cannot sell anything.
 */

type Config = {
  onboarding_paywall_closable: boolean;
  plan_generation_open: boolean;
  coach_open: boolean;
  subscription_enforced: boolean;
  updated_at?: string | null;
  updated_by?: string | null;
};

type Toggle = {
  key: keyof Config;
  label: string;
  on: string;
  off: string;
  /** True when the risky state is `true` — flips which side is painted warm. */
  dangerWhenOn?: boolean;
};

const TOGGLES: Toggle[] = [
  {
    key: "subscription_enforced",
    label: "Subscription gate",
    on: "On — gated routes refuse anyone without a live subscription.",
    off: "Off — every gated route is open to anyone with an account. This is a rollback, not a mode.",
  },
  {
    key: "plan_generation_open",
    label: "Plan generation, ungated",
    on: "On — anyone can generate a week. For testing the plan end to end without a live subscription on the device.",
    off: "Off — building a week needs a subscription. This is the production setting.",
    dangerWhenOn: true,
  },
  {
    key: "coach_open",
    label: "Coach, ungated",
    on: "On — anyone can talk to the coach. For testing the agent without a live subscription on the device.",
    off: "Off — the coach needs a subscription. This is the production setting.",
    dangerWhenOn: true,
  },
];

export default function AppConfigPage() {
  const [config, setConfig] = useState<Config | null>(null);
  const [draft, setDraft] = useState<Partial<Config>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const c = await api.get<Config>("/app-config/admin");
      setConfig(c);
      setDraft(c);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load app config");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    setSaving(true);
    setMsg("");
    setError(null);
    try {
      // Only what changed. The route merges, and sending the whole document
      // back would make two people editing different switches overwrite each
      // other with whatever each of them happened to have loaded.
      const changed: Partial<Config> = {};
      for (const k of Object.keys(draft) as (keyof Config)[]) {
        if (typeof draft[k] === "boolean" && draft[k] !== config?.[k]) {
          (changed as Record<string, boolean>)[k] = draft[k] as boolean;
        }
      }
      const res = await api.put<Config>("/app-config/admin", changed);
      setConfig(res);
      setDraft(res);
      setMsg("Saved ✓");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!config) {
    return (
      <div className="p-8">
        {error ? (
          <div className="border border-red-500/40 bg-red-500/10 text-red-400 text-sm rounded-2xl p-4 max-w-xl">
            {error}
          </div>
        ) : (
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    );
  }

  const isDirty = JSON.stringify(draft) !== JSON.stringify(config);
  const hard = draft.onboarding_paywall_closable === false;

  return (
    <div className="p-4 md:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-fg">App config</h1>
        <p className="text-sm text-muted mt-1">
          Remote switches, read by the app at launch. Changes reach devices within a minute.
        </p>
      </div>

      {/* The paywall, as the two modes it produces rather than as a boolean. */}
      <div className="bg-elevated border border-border rounded-2xl p-5 mb-6">
        <p className="font-semibold text-fg text-sm">Onboarding paywall</p>
        <p className="text-xs text-muted mt-0.5 mb-4">
          What happens when somebody tries to close the paywall at the end of onboarding.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <button
            onClick={() => setDraft({ ...draft, onboarding_paywall_closable: true })}
            className={`text-left rounded-2xl border p-4 transition-colors ${
              !hard
                ? "border-accent/50 bg-accent/10"
                : "border-border bg-bg hover:border-border-strong"
            }`}
          >
            <p className={`text-sm font-bold ${!hard ? "text-accent" : "text-fg"}`}>
              Soft — skippable
            </p>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Closing raises the one-time discount. Turn that down and they land on Home, with
              every major action — new plans, sessions, logging food, the coach — behind a
              &ldquo;subscription needed&rdquo; prompt that opens the paywall.
            </p>
          </button>

          <button
            onClick={() => setDraft({ ...draft, onboarding_paywall_closable: false })}
            className={`text-left rounded-2xl border p-4 transition-colors ${
              hard
                ? "border-amber-500/50 bg-amber-500/10"
                : "border-border bg-bg hover:border-border-strong"
            }`}
          >
            <p className={`text-sm font-bold ${hard ? "text-amber-400" : "text-fg"}`}>
              Hard — no way past
            </p>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Closing raises the same discount, and turning it down removes the exit: the
              paywall stays and onboarding ends on a purchase. Nobody reaches the app without
              subscribing.
            </p>
          </button>
        </div>

        {hard && (
          <div className="mt-4 border border-amber-500/30 bg-amber-500/5 rounded-xl p-4">
            <p className="text-xs text-amber-400 font-bold mb-2">BEFORE YOU SHIP THIS</p>
            <ul className="space-y-1 text-xs text-muted">
              <li>· Dietly becomes a paid app in Apple&apos;s eyes — terms, privacy and restore
                links on the paywall must be correct, or it is a 3.1.2 rejection</li>
              <li>· Existing installs that already got past onboarding are unaffected</li>
              <li>· The app keeps one safety valve: if the store returns no plans, the paywall
                stays closable rather than stranding an install</li>
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {TOGGLES.map((t) => {
          const value = draft[t.key] as boolean;
          const risky = t.dangerWhenOn ? value : !value;
          return (
            <div key={t.key} className="bg-elevated border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-fg text-sm">{t.label}</p>
                  <p className={`text-xs mt-1 ${risky ? "text-amber-400" : "text-muted"}`}>
                    {value ? t.on : t.off}
                  </p>
                </div>
                <button
                  onClick={() => setDraft({ ...draft, [t.key]: !value })}
                  aria-pressed={value}
                  className={`shrink-0 w-12 h-7 rounded-full transition-colors relative ${
                    value ? "bg-accent" : "bg-ghost"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                      value ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={save}
          disabled={saving || !isDirty}
          className="bg-accent text-accent-ink text-sm font-bold px-6 py-3 rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {isDirty && (
          <button
            onClick={() => setDraft(config)}
            className="text-sm text-muted hover:text-fg border border-border px-5 py-3 rounded-xl"
          >
            Reset
          </button>
        )}
        {msg && <span className="text-xs font-semibold text-accent">{msg}</span>}
        {error && <span className="text-xs font-semibold text-red-400">{error}</span>}
      </div>

      {config.updated_at && (
        <p className="text-xs text-faint mt-6">
          Last changed {new Date(config.updated_at).toLocaleString()}
          {config.updated_by ? ` by ${config.updated_by.slice(0, 8)}` : ""}
        </p>
      )}
    </div>
  );
}
