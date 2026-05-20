"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../lib/api";

type UserDetail = {
  uid: string;
  profile: Record<string, unknown>;
  subscription: Record<string, unknown>;
  auth: Record<string, unknown>;
  stats: {
    meals_logged: number;
    workouts_logged: number;
    streak: number;
    xp: number;
    level: number;
  };
};

const TIER_BADGE: Record<string, string> = {
  pro: "bg-accent/15 text-accent",
  free: "bg-ghost text-muted",
};

export default function UserDetail() {
  const { uid } = useParams<{ uid: string }>();
  const router = useRouter();
  const [detail, setDetail] = useState<UserDetail | null>(null);
  const [tierValue, setTierValue] = useState("free");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get<UserDetail>(`/admin/users/${uid}`).then((d) => {
      setDetail(d);
      setTierValue((d.subscription?.tier as string) ?? "free");
    });
  }, [uid]);

  const setTier = async () => {
    setSaving(true);
    setMsg("");
    try {
      await api.put(`/admin/users/${uid}/subscription`, { tier: tierValue });
      setMsg("Saved ✓");
      setDetail((prev) => prev ? { ...prev, subscription: { ...prev.subscription, tier: tierValue } } : prev);
    } catch (e: unknown) {
      setMsg((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (!detail) return (
    <div className="p-8 flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const p = detail.profile as Record<string, string | number | null>;
  const sub = detail.subscription as Record<string, string>;

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <button
        onClick={() => router.back()}
        className="text-xs text-muted hover:text-fg mb-6 inline-block"
      >
        ← Back to users
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">
            {(p.display_name as string) ?? "Unknown User"}
          </h1>
          <p className="text-sm text-muted mt-1">{(detail.auth.email as string) ?? uid}</p>
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${TIER_BADGE[sub.tier] ?? TIER_BADGE.free}`}>
          {(sub.tier ?? "free").toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "MEALS LOGGED", val: detail.stats.meals_logged },
          { label: "WORKOUTS", val: detail.stats.workouts_logged },
          { label: "STREAK", val: `${detail.stats.streak} days` },
          { label: "XP", val: detail.stats.xp },
          { label: "LEVEL", val: detail.stats.level },
        ].map((s) => (
          <div key={s.label} className="bg-elevated border border-border rounded-xl p-4">
            <p className="text-xs font-bold text-muted tracking-widest">{s.label}</p>
            <p className="text-2xl font-black text-fg mt-2">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Profile */}
      <div className="bg-elevated border border-border rounded-2xl p-5 mb-4">
        <p className="text-xs font-bold text-muted tracking-widest mb-4">PROFILE</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {(["goal", "activity", "sex", "language", "platform", "country", "device_model"] as const).map((key) => (
            <div key={key} className="flex justify-between">
              <span className="text-muted capitalize">{key.replace("_", " ")}</span>
              <span className="text-fg font-medium">{(p[key] as string) ?? "—"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Auth info */}
      <div className="bg-elevated border border-border rounded-2xl p-5 mb-4">
        <p className="text-xs font-bold text-muted tracking-widest mb-4">AUTH INFO</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">UID</span>
            <span className="text-fg font-mono text-xs">{uid}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Providers</span>
            <span className="text-fg">{(detail.auth.providers as string[])?.join(", ") ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Created</span>
            <span className="text-fg">
              {detail.auth.creation_time
                ? new Date(detail.auth.creation_time as number).toLocaleDateString()
                : "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Last sign-in</span>
            <span className="text-fg">
              {detail.auth.last_sign_in
                ? new Date(detail.auth.last_sign_in as number).toLocaleDateString()
                : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Subscription override */}
      <div className="bg-elevated border border-border rounded-2xl p-5">
        <p className="text-xs font-bold text-muted tracking-widest mb-4">SUBSCRIPTION OVERRIDE</p>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <select
            value={tierValue}
            onChange={(e) => setTierValue(e.target.value)}
            className="w-full sm:w-auto bg-bg border border-border rounded-xl px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
          >
            <option value="free">Free</option>
            <option value="pro">Pro</option>
          </select>
          <button
            onClick={setTier}
            disabled={saving}
            className="w-full sm:w-auto bg-accent text-accent-ink text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {msg && <span className="text-xs text-muted">{msg}</span>}
        </div>
      </div>
    </div>
  );
}
