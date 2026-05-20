"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { api } from "../../lib/api";

type Influencer = {
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
  social_handle: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  youtube?: string | null;
  niche?: string | null;
  audience_size?: string | null;
  application_message?: string | null;
};

const STATUS_BADGE: Record<string, string> = {
  active: "bg-accent/15 text-accent border-accent/30",
  pending: "bg-yellow-400/15 text-yellow-400 border-yellow-400/30",
  suspended: "bg-red-400/15 text-red-400 border-red-400/30",
  rejected: "bg-red-400/10 text-red-400 border-red-400/20",
};

type Tab = "pending" | "active";

export default function InfluencersPage() {
  const [list, setList] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("pending");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [approveModal, setApproveModal] = useState<{ uid: string; name: string } | null>(null);
  const [commissionRate, setCommissionRate] = useState(0.20);

  const load = useCallback(() => {
    api.get<{ influencers: Influencer[] }>("/admin/influencers")
      .then((r) => setList(r.influencers))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const pending = list.filter((i) => i.status === "pending");
  const active = list.filter((i) => i.status !== "pending");

  const approve = async (uid: string, rate: number) => {
    setActionLoading(uid);
    try {
      await api.put(`/admin/influencers/${uid}`, { status: "active", commission_rate: rate });
      setApproveModal(null);
      load();
    } finally {
      setActionLoading(null);
    }
  };

  const reject = async (uid: string) => {
    if (!confirm("Reject this application?")) return;
    setActionLoading(uid);
    try {
      await api.put(`/admin/influencers/${uid}`, { status: "rejected" });
      load();
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-fg">Creators</h1>
          <p className="text-sm text-muted mt-1">
            {pending.length} pending · {active.length} active
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-elevated border border-border rounded-xl mb-6 w-fit">
        {(["pending", "active"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors capitalize ${
              tab === t ? "bg-accent text-accent-ink" : "text-muted hover:text-fg"
            }`}
          >
            {t}
            {t === "pending" && pending.length > 0 && (
              <span className="ml-2 text-xs bg-yellow-400/20 text-yellow-400 px-1.5 py-0.5 rounded-full">
                {pending.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Pending Applications */}
      {tab === "pending" && (
        loading ? (
          <p className="text-muted text-sm">Loading…</p>
        ) : pending.length === 0 ? (
          <div className="bg-elevated border border-border rounded-2xl p-10 text-center text-muted text-sm">
            No pending applications
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((inf) => (
              <div key={inf.uid} className="bg-elevated border border-border rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-fg text-lg">{inf.name}</p>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full border bg-yellow-400/15 text-yellow-400 border-yellow-400/30">
                        PENDING
                      </span>
                    </div>
                    <p className="text-sm text-muted mb-3">{inf.email}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      {inf.instagram && (
                        <div className="bg-bg border border-border rounded-lg px-3 py-2">
                          <p className="text-xs text-muted font-bold">INSTAGRAM</p>
                          <p className="text-sm text-fg mt-0.5">{inf.instagram}</p>
                        </div>
                      )}
                      {inf.tiktok && (
                        <div className="bg-bg border border-border rounded-lg px-3 py-2">
                          <p className="text-xs text-muted font-bold">TIKTOK</p>
                          <p className="text-sm text-fg mt-0.5">{inf.tiktok}</p>
                        </div>
                      )}
                      {inf.youtube && (
                        <div className="bg-bg border border-border rounded-lg px-3 py-2">
                          <p className="text-xs text-muted font-bold">YOUTUBE</p>
                          <p className="text-sm text-fg mt-0.5 truncate">{inf.youtube}</p>
                        </div>
                      )}
                      {inf.niche && (
                        <div className="bg-bg border border-border rounded-lg px-3 py-2">
                          <p className="text-xs text-muted font-bold">NICHE</p>
                          <p className="text-sm text-fg mt-0.5">{inf.niche}</p>
                        </div>
                      )}
                      {inf.audience_size && (
                        <div className="bg-bg border border-border rounded-lg px-3 py-2">
                          <p className="text-xs text-muted font-bold">AUDIENCE</p>
                          <p className="text-sm text-fg mt-0.5">{inf.audience_size}</p>
                        </div>
                      )}
                    </div>

                    {inf.application_message && (
                      <div className="bg-bg border border-border rounded-xl px-4 py-3 mb-3">
                        <p className="text-xs font-bold text-muted mb-1">MESSAGE</p>
                        <p className="text-sm text-fg">{inf.application_message}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => { setApproveModal({ uid: inf.uid, name: inf.name }); setCommissionRate(0.20); }}
                      disabled={actionLoading === inf.uid}
                      className="bg-accent text-accent-ink text-sm font-bold px-5 py-2 rounded-xl hover:opacity-90 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reject(inf.uid)}
                      disabled={actionLoading === inf.uid}
                      className="text-red-400 border border-red-400/30 text-sm font-bold px-5 py-2 rounded-xl hover:bg-red-400/10 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Active list */}
      {tab === "active" && (
        <div className="bg-elevated border border-border rounded-2xl overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className="border-b border-border">
                {["Creator", "Code", "Status", "Commission", "Referrals", "Conversions", "Balance", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-bold text-muted tracking-widest px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center text-muted text-sm">Loading…</td></tr>
              ) : active.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center text-muted text-sm">No active creators yet</td></tr>
              ) : (
                active.map((inf) => (
                  <tr key={inf.uid} className="border-b border-border last:border-0 hover:bg-ghost/50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-fg">{inf.name}</p>
                      <p className="text-xs text-muted mt-0.5">{inf.social_handle ?? inf.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs bg-ghost px-2 py-1 rounded-lg text-fg">{inf.referral_code}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full border ${STATUS_BADGE[inf.status] ?? STATUS_BADGE.pending}`}>
                        {inf.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-fg">{Math.round(inf.commission_rate * 100)}%</td>
                    <td className="px-5 py-4 text-muted">{inf.total_referrals}</td>
                    <td className="px-5 py-4 text-muted">{inf.paid_conversions}</td>
                    <td className="px-5 py-4 text-accent font-bold">${inf.available_balance.toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <Link href={`/admin/influencers/${inf.uid}`} className="text-xs font-bold text-accent hover:underline">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Approve modal */}
      {approveModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-bg border border-border rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-black text-fg mb-1">Approve {approveModal.name}</h2>
            <p className="text-sm text-muted mb-5">Set their commission rate before approving.</p>
            <div className="mb-5">
              <label className="block text-xs font-bold text-muted tracking-widest mb-2">COMMISSION RATE</label>
              <select
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-fg text-sm outline-none focus:border-accent"
              >
                {[0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.50].map((r) => (
                  <option key={r} value={r}>{Math.round(r * 100)}%</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => approve(approveModal.uid, commissionRate)}
                disabled={actionLoading === approveModal.uid}
                className="flex-1 bg-accent text-accent-ink text-sm font-bold py-2.5 rounded-xl hover:opacity-90 disabled:opacity-50"
              >
                {actionLoading === approveModal.uid ? "Approving…" : "Approve →"}
              </button>
              <button
                onClick={() => setApproveModal(null)}
                className="flex-1 text-sm text-muted hover:text-fg border border-border py-2.5 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
