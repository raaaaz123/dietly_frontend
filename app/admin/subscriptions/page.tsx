"use client";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Stats = {
  total_users: number;
  pro_subscribers: number;
  free_users: number;
  estimated_mrr: number;
  total_paid_conversions: number;
};

export default function SubscriptionsPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get<Stats>("/admin/stats").then(setStats);
  }, []);

  if (!stats) return (
    <div className="p-8 flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const convRate = stats.total_users > 0
    ? ((stats.pro_subscribers / stats.total_users) * 100).toFixed(1)
    : "0";
  const arr = stats.estimated_mrr * 12;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-fg">Subscriptions</h1>
        <p className="text-sm text-muted mt-1">Revenue & subscriber analytics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "MONTHLY RECURRING REVENUE", val: `$${stats.estimated_mrr.toFixed(2)}`, accent: true },
          { label: "ANNUAL RUN RATE", val: `$${arr.toFixed(0)}`, accent: true },
          { label: "PRO SUBSCRIBERS", val: stats.pro_subscribers },
          { label: "CONVERSION RATE", val: `${convRate}%` },
        ].map((s) => (
          <div key={s.label} className="bg-elevated border border-border rounded-2xl p-5">
            <p className="text-xs font-bold text-muted tracking-widest mb-3">{s.label}</p>
            <p className={`text-3xl font-black tracking-tight ${s.accent ? "text-accent" : "text-fg"}`}>
              {s.val}
            </p>
          </div>
        ))}
      </div>

      {/* Tier breakdown */}
      <div className="bg-elevated border border-border rounded-2xl p-6 mb-6">
        <p className="text-xs font-bold text-muted tracking-widest mb-5">TIER BREAKDOWN</p>
        <div className="space-y-5">
          {[
            { label: "Free", count: stats.free_users, pct: (stats.free_users / stats.total_users) * 100, color: "bg-ghost" },
            { label: "Pro ($9.99/mo)", count: stats.pro_subscribers, pct: (stats.pro_subscribers / stats.total_users) * 100, color: "bg-accent" },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-fg">{row.label}</span>
                <span className="text-sm text-muted">{row.count.toLocaleString()} ({row.pct.toFixed(1)}%)</span>
              </div>
              <div className="h-3 bg-ghost rounded-full overflow-hidden">
                <div className={`h-full ${row.color} rounded-full transition-all duration-700`}
                  style={{ width: `${row.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RevenueCat setup guide */}
      <div className="bg-elevated border border-accent/20 rounded-2xl p-6">
        <p className="text-xs font-bold text-accent tracking-widest mb-3">REVENUECAT WEBHOOK SETUP</p>
        <p className="text-sm text-muted mb-4">
          Configure RevenueCat to post subscription events to your backend webhook:
        </p>
        <div className="bg-bg rounded-xl p-4 font-mono text-xs text-fg space-y-1">
          <p className="text-faint"># Webhook URL (add in RevenueCat Dashboard → Webhooks)</p>
          <p className="text-accent">POST https://your-api.com/subscriptions/webhook</p>
        </div>
        <p className="text-xs text-muted mt-3">
          Set <span className="font-mono text-fg">REVENUECAT_WEBHOOK_SECRET</span> in your backend .env to match the signing secret shown in RevenueCat.
        </p>
      </div>
    </div>
  );
}
