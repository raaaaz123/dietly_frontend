"use client";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Stats = {
  total_users: number;
  pro_subscribers: number;
  free_users: number;
  active_influencers: number;
  total_influencers: number;
  pending_withdrawals: number;
  total_paid_conversions: number;
  estimated_mrr: number;
};

function StatCard({
  label, value, sub, accent,
}: {
  label: string; value: string | number; sub?: string; accent?: boolean;
}) {
  return (
    <div className="bg-elevated border border-border rounded-2xl p-5">
      <p className="text-xs font-bold text-muted tracking-widest mb-3">{label}</p>
      <p className={`text-3xl font-black tracking-tight ${accent ? "text-accent" : "text-fg"}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-faint mt-1">{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get<Stats>("/admin/stats")
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return (
    <div className="p-8 text-red-400 text-sm">{error}</div>
  );

  if (!stats) return (
    <div className="p-8 flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-muted">Loading…</span>
    </div>
  );

  const convRate = stats.total_users > 0
    ? ((stats.pro_subscribers / stats.total_users) * 100).toFixed(1)
    : "0";

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-fg">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Platform overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="TOTAL USERS" value={stats.total_users.toLocaleString()} />
        <StatCard label="PRO SUBSCRIBERS" value={stats.pro_subscribers.toLocaleString()} accent />
        <StatCard label="FREE USERS" value={stats.free_users.toLocaleString()} sub={`${convRate}% conversion`} />
        <StatCard label="EST. MRR" value={`$${stats.estimated_mrr.toLocaleString()}`} accent />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="ACTIVE INFLUENCERS" value={stats.active_influencers} sub={`${stats.total_influencers} total`} />
        <StatCard label="PAID CONVERSIONS" value={stats.total_paid_conversions} />
        <StatCard
          label="PENDING WITHDRAWALS"
          value={stats.pending_withdrawals}
          accent={stats.pending_withdrawals > 0}
          sub={stats.pending_withdrawals > 0 ? "Action required" : "All clear"}
        />
        <StatCard label="FREE → PRO RATE" value={`${convRate}%`} />
      </div>

      {/* Conversion funnel */}
      <div className="bg-elevated border border-border rounded-2xl p-6">
        <p className="text-xs font-bold text-muted tracking-widest mb-5">CONVERSION FUNNEL</p>
        <div className="space-y-4">
          {[
            { label: "Total Users", val: stats.total_users, pct: 100 },
            { label: "Pro Subscribers", val: stats.pro_subscribers, pct: stats.total_users > 0 ? (stats.pro_subscribers / stats.total_users) * 100 : 0 },
            { label: "Influencer Driven", val: stats.total_paid_conversions, pct: stats.pro_subscribers > 0 ? (stats.total_paid_conversions / stats.pro_subscribers) * 100 : 0 },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-semibold text-fg">{row.label}</span>
                <span className="text-sm font-bold text-accent">{row.val.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-ghost rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(row.pct, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
