"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../lib/api";

type Conv = {
  id: string;
  referred_uid: string;
  code: string;
  status: string;
  signed_up_at: string;
  converted_at: string | null;
  commission_amount: number;
};

type Withdrawal = {
  id: string;
  amount: number;
  status: string;
  payment_method: string;
  created_at: string;
};

type InfluencerDetail = {
  uid: string;
  name: string;
  email: string;
  referral_code: string;
  commission_rate: number;
  status: string;
  total_referrals: number;
  paid_conversions: number;
  total_earned: number;
  available_balance: number;
  pending_balance: number;
  social_handle: string | null;
  notes: string | null;
  conversions: Conv[];
  withdrawals: Withdrawal[];
};

const STATUS_COLORS: Record<string, string> = {
  active: "text-accent",
  pending: "text-yellow-400",
  suspended: "text-red-400",
  signed_up: "text-muted",
  converted: "text-accent",
  paid_out: "text-faint",
};

export default function InfluencerDetailPage() {
  const { uid } = useParams<{ uid: string }>();
  const router = useRouter();
  const [inf, setInf] = useState<InfluencerDetail | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [statusVal, setStatusVal] = useState("active");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get<InfluencerDetail>(`/admin/influencers/${uid}`)
      .then((d) => {
        setInf(d);
        setStatusVal(d.status);
      })
      .catch((e: unknown) => setLoadError((e as Error).message ?? "Failed to load"));
  }, [uid]);

  const save = async () => {
    setSaving(true);
    try {
      await api.put(`/admin/influencers/${uid}`, { status: statusVal });
      setMsg("Saved ✓");
    } catch (e: unknown) {
      setMsg((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loadError) return (
    <div className="p-8">
      <button onClick={() => router.back()} className="text-xs text-muted hover:text-fg mb-6 inline-block">← Back</button>
      <div className="bg-elevated border border-red-400/30 rounded-2xl p-6 text-red-400 text-sm">
        <p className="font-bold mb-1">Failed to load influencer</p>
        <p className="text-xs text-muted">{loadError}</p>
        <p className="text-xs text-muted mt-2">Make sure the backend is running on <code className="bg-ghost px-1 rounded">http://localhost:8000</code></p>
      </div>
    </div>
  );

  if (!inf) return (
    <div className="p-8 flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-8 max-w-4xl">
      <button onClick={() => router.back()} className="text-xs text-muted hover:text-fg mb-6 inline-block">
        ← Back
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">{inf.name}</h1>
          <p className="text-sm text-muted mt-1">
            {inf.social_handle ? `${inf.social_handle} · ` : ""}{inf.email}
          </p>
        </div>
        <span className="font-mono text-sm bg-ghost px-3 py-1.5 rounded-lg text-fg">{inf.referral_code}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "TOTAL REFERRALS", val: inf.total_referrals },
          { label: "PAID CONVERSIONS", val: inf.paid_conversions },
          { label: "TOTAL EARNED", val: `$${inf.total_earned.toFixed(2)}` },
          { label: "AVAILABLE BALANCE", val: `$${inf.available_balance.toFixed(2)}` },
        ].map((s) => (
          <div key={s.label} className="bg-elevated border border-border rounded-xl p-4">
            <p className="text-xs font-bold text-muted tracking-widest">{s.label}</p>
            <p className="text-2xl font-black text-accent mt-2">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Status control */}
      <div className="bg-elevated border border-border rounded-2xl p-5 mb-5">
        <p className="text-xs font-bold text-muted tracking-widest mb-4">ACCOUNT STATUS</p>
        <div className="flex items-center gap-3">
          <select
            value={statusVal}
            onChange={(e) => setStatusVal(e.target.value)}
            className="bg-bg border border-border rounded-xl px-4 py-2.5 text-sm text-fg outline-none focus:border-accent"
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <button
            onClick={save}
            disabled={saving}
            className="bg-accent text-accent-ink text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Update"}
          </button>
          {msg && <span className="text-xs text-muted">{msg}</span>}
        </div>
        {inf.notes && <p className="text-xs text-muted mt-3">{inf.notes}</p>}
      </div>

      {/* Conversions */}
      <div className="bg-elevated border border-border rounded-2xl overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-border">
          <p className="text-xs font-bold text-muted tracking-widest">
            CONVERSIONS ({inf.conversions.length})
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["User", "Status", "Signed up", "Converted", "Commission"].map((h) => (
                <th key={h} className="text-left text-xs font-bold text-muted tracking-widest px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inf.conversions.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-muted text-sm">No conversions yet</td></tr>
            ) : (
              inf.conversions.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-mono text-xs text-muted">{c.referred_uid.slice(0, 12)}…</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-bold capitalize ${STATUS_COLORS[c.status] ?? "text-muted"}`}>
                      {c.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-muted">{new Date(c.signed_up_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3 text-xs text-muted">
                    {c.converted_at ? new Date(c.converted_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-5 py-3 text-accent font-bold text-sm">
                    {c.commission_amount > 0 ? `$${c.commission_amount.toFixed(2)}` : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Withdrawals */}
      <div className="bg-elevated border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <p className="text-xs font-bold text-muted tracking-widest">
            WITHDRAWALS ({inf.withdrawals.length})
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Amount", "Method", "Status", "Date"].map((h) => (
                <th key={h} className="text-left text-xs font-bold text-muted tracking-widest px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inf.withdrawals.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-muted text-sm">No withdrawals</td></tr>
            ) : (
              inf.withdrawals.map((w) => (
                <tr key={w.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-bold text-accent">${w.amount.toFixed(2)}</td>
                  <td className="px-5 py-3 text-muted capitalize">{w.payment_method}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-bold capitalize ${STATUS_COLORS[w.status] ?? "text-muted"}`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-faint">{new Date(w.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
