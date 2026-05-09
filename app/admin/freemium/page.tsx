"use client";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Config = {
  free_scans_per_day: number;
  free_voice_minutes_per_day: number;
  free_coach_messages_per_day: number;
  free_text_logs_per_day: number;
  trial_days: number;
  pro_price_monthly_usd: number;
  pro_price_yearly_usd: number;
};

const FIELDS: { key: keyof Config; label: string; desc: string; unit?: string }[] = [
  { key: "free_scans_per_day", label: "Photo Scans / Day", desc: "Max AI photo meal scans for free users per day", unit: "scans" },
  { key: "free_voice_minutes_per_day", label: "Voice Minutes / Day", desc: "Max live voice coach minutes for free users per day", unit: "min" },
  { key: "free_coach_messages_per_day", label: "Coach Messages / Day", desc: "Max text coach messages for free users per day", unit: "msgs" },
  { key: "free_text_logs_per_day", label: "Text Logs / Day", desc: "Max text meal entries for free users per day", unit: "logs" },
  { key: "trial_days", label: "Trial Period", desc: "Pro trial length in days for new signups", unit: "days" },
  { key: "pro_price_monthly_usd", label: "Pro Monthly Price", desc: "USD price for monthly Pro subscription", unit: "USD" },
  { key: "pro_price_yearly_usd", label: "Pro Yearly Price", desc: "USD price for annual Pro subscription", unit: "USD" },
];

export default function FreemiumPage() {
  const [config, setConfig] = useState<Config | null>(null);
  const [draft, setDraft] = useState<Partial<Config>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get<Config>("/admin/freemium-config").then((c) => {
      setConfig(c);
      setDraft(c);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      const res = await api.put<{ config: Config }>("/admin/freemium-config", draft);
      setConfig(res.config);
      setDraft(res.config);
      setMsg("Saved successfully ✓");
    } catch (e: unknown) {
      setMsg((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (!config) return (
    <div className="p-8 flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const isDirty = JSON.stringify(draft) !== JSON.stringify(config);

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-fg">Freemium Config</h1>
        <p className="text-sm text-muted mt-1">
          Control free-tier limits in real time — changes apply within 5 minutes.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {FIELDS.map(({ key, label, desc, unit }) => (
          <div key={key} className="bg-elevated border border-border rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold text-fg text-sm">{label}</p>
                <p className="text-xs text-muted mt-0.5">{desc}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  min={0}
                  step={key.includes("price") ? 0.01 : 1}
                  value={(draft[key] as number) ?? ""}
                  onChange={(e) => setDraft({ ...draft, [key]: Number(e.target.value) })}
                  className="w-24 bg-bg border border-border rounded-xl px-3 py-2 text-sm text-fg outline-none focus:border-accent text-right"
                />
                <span className="text-xs text-muted w-10">{unit}</span>
              </div>
            </div>

            {/* Visual indicator */}
            {!key.includes("price") && !key.includes("trial") && (
              <div className="mt-3">
                <div className="h-1.5 bg-ghost rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent/60 rounded-full"
                    style={{ width: `${Math.min(((draft[key] as number) / 20) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
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
        {msg && (
          <span className={`text-xs font-semibold ${msg.includes("✓") ? "text-accent" : "text-red-400"}`}>
            {msg}
          </span>
        )}
      </div>

      <div className="mt-8 bg-elevated border border-border rounded-2xl p-5">
        <p className="text-xs font-bold text-muted tracking-widest mb-3">HOW LIMITS WORK</p>
        <ul className="space-y-1.5 text-sm text-muted">
          <li>· Limits reset at midnight UTC each day</li>
          <li>· Pro subscribers have unlimited access to all features</li>
          <li>· Changes take effect within 5 minutes (server cache TTL)</li>
          <li>· Set any limit to 0 to fully block free users from that feature</li>
          <li>· Set to 999 or higher to effectively make a feature unlimited for free users</li>
        </ul>
      </div>
    </div>
  );
}
