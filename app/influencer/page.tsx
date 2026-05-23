"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useInfluencerAuth } from "../lib/influencer-auth";

type Conv = {
  id: string;
  referred_uid: string;
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

const STATUS_COLORS: Record<string, string> = {
  signed_up: "text-muted",
  converted: "text-accent",
  paid_out: "text-faint",
  pending: "text-yellow-400",
  approved: "text-accent",
  paid: "text-faint",
  rejected: "text-red-400",
};

export default function InfluencerDashboard() {
  const { firebaseUser, loading, appStatus, influencerData, apiFetch, signOut } = useInfluencerAuth();
  const router = useRouter();

  const [conversions, setConversions] = useState<Conv[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [wForm, setWForm] = useState({ amount: "", method: "paypal", details: "" });
  const [wSaving, setWSaving] = useState(false);
  const [wMsg, setWMsg] = useState("");

  // Calculator State
  const [calcUsers, setCalcUsers] = useState<number | string>(100);
  const [calcPack, setCalcPack] = useState("yearly");
  const [calcCountry, setCalcCountry] = useState("USD");
  const [calcPlatform, setCalcPlatform] = useState("all");

  const CURRENCY_PACKS: Record<string, { symbol: string, monthly: number, yearly: number }> = {
    USD: { symbol: "$", monthly: 9.99, yearly: 79.99 },
    EUR: { symbol: "€", monthly: 9.99, yearly: 79.99 },
    GBP: { symbol: "£", monthly: 8.99, yearly: 69.99 },
    INR: { symbol: "₹", monthly: 899, yearly: 6900 },
    AUD: { symbol: "A$", monthly: 14.99, yearly: 119.99 },
    CAD: { symbol: "C$", monthly: 12.99, yearly: 99.99 },
  };

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let country = "USD";
      if (tz.includes("Europe/London")) country = "GBP";
      else if (tz.includes("Europe/")) country = "EUR";
      else if (tz.includes("Asia/Calcutta") || tz.includes("Asia/Kolkata")) country = "INR";
      else if (tz.includes("Australia/")) country = "AUD";
      else if (tz.includes("America/Toronto") || tz.includes("America/Vancouver")) country = "CAD";
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (country !== "USD") setCalcCountry(country);
    } catch {
      // default USD
    }
  }, []);

  useEffect(() => {
    if (!loading && !firebaseUser) {
      router.replace("/influencer/login");
    }
    if (!loading && appStatus === "none") {
      router.replace("/influencer/login");
    }
    if (!loading && (appStatus === "pending" || appStatus === "rejected" || appStatus === "suspended")) {
      router.replace("/influencer/login");
    }
  }, [loading, firebaseUser, appStatus, router]);

  const load = useCallback(async () => {
    try {
      const [c, w] = await Promise.all([
        apiFetch<{ conversions: Conv[] }>("GET", "/referrals/conversions"),
        apiFetch<{ withdrawals: Withdrawal[] }>("GET", "/referrals/withdrawals"),
      ]);
      setConversions(c.conversions);
      setWithdrawals(w.withdrawals);
    } catch {
      // ignore
    } finally {
      setDataLoading(false);
    }
  }, [apiFetch]);

  useEffect(() => {
    if (appStatus === "active") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      load();
    }
  }, [appStatus, load]);

  const requestWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setWSaving(true);
    setWMsg("");
    try {
      await apiFetch("POST", "/referrals/withdraw", {
        amount: Number(wForm.amount),
        payment_method: wForm.method,
        payment_details: wForm.details,
      });
      setWMsg("Withdrawal request submitted");
      setShowWithdraw(false);
      setWForm({ amount: "", method: "paypal", details: "" });
      load();
    } catch (e: unknown) {
      setWMsg((e as Error).message);
    } finally {
      setWSaving(false);
    }
  };

  const copyLink = () => {
    if (influencerData?.referral_code) {
      navigator.clipboard.writeText(`https://dietly.life/invite?ref=${influencerData.referral_code}`);
    }
  };

  if (loading || appStatus === "loading") {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!influencerData || appStatus !== "active") return null;

  const REFERRAL_URL = `https://dietly.life/invite?ref=${influencerData.referral_code}`;

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="text-accent font-mono text-xs font-bold tracking-widest">VITAL · CREATOR</span>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted">{influencerData.email}</span>
          <button
            onClick={signOut}
            className="text-xs text-muted hover:text-fg border border-border px-3 py-1.5 rounded-lg"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-tight text-fg">Creator Dashboard</h1>
          <p className="text-sm text-muted mt-1">Welcome back, {influencerData.name}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: "TOTAL REFERRALS", val: influencerData.total_referrals },
            { label: "PAID CONVERSIONS", val: influencerData.paid_conversions },
            { label: "TOTAL EARNED", val: `$${influencerData.total_earned.toFixed(2)}`, accent: true },
            { label: "AVAILABLE BALANCE", val: `$${influencerData.available_balance.toFixed(2)}`, accent: true },
          ].map((s) => (
            <div key={s.label} className="bg-elevated border border-border rounded-2xl p-5">
              <p className="text-xs font-bold text-muted tracking-widest">{s.label}</p>
              <p className={`text-2xl font-black mt-2 ${s.accent ? "text-accent" : "text-fg"}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Commission */}
        <div className="bg-elevated border border-border rounded-2xl p-5 mb-5">
          <p className="text-xs font-bold text-muted tracking-widest mb-1">YOUR COMMISSION</p>
          <p className="text-3xl font-black text-fg">{Math.round(influencerData.commission_rate * 100)}%</p>
          <p className="text-xs text-muted mt-1">
            of Net Revenue (after 30% App Store fees) from each subscriber&apos;s first payment.
          </p>
        </div>

        {/* Earnings Estimator */}
        <div className="bg-elevated border border-border rounded-2xl p-5 mb-5">
          <p className="text-xs font-bold text-muted tracking-widest mb-4">EARNINGS ESTIMATOR</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div>
              <label className="block text-xs font-bold text-muted tracking-widest mb-1.5">USERS</label>
              <input
                type="number" min={1} value={calcUsers}
                onChange={(e) => setCalcUsers(e.target.value)}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 text-sm text-fg outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted tracking-widest mb-1.5">CURRENCY</label>
              <select
                value={calcCountry}
                onChange={(e) => setCalcCountry(e.target.value)}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 text-sm text-fg outline-none focus:border-accent"
              >
                {Object.keys(CURRENCY_PACKS).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-muted tracking-widest mb-1.5">PACK</label>
              <select
                value={calcPack}
                onChange={(e) => setCalcPack(e.target.value)}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 text-sm text-fg outline-none focus:border-accent"
              >
                <option value="monthly">Monthly ({CURRENCY_PACKS[calcCountry]?.symbol}{CURRENCY_PACKS[calcCountry]?.monthly})</option>
                <option value="yearly">Yearly ({CURRENCY_PACKS[calcCountry]?.symbol}{CURRENCY_PACKS[calcCountry]?.yearly})</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-muted tracking-widest mb-1.5">PLATFORM</label>
              <select
                value={calcPlatform}
                onChange={(e) => setCalcPlatform(e.target.value)}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 text-sm text-fg outline-none focus:border-accent"
              >
                <option value="all">iOS & Android</option>
                <option value="ios">iOS Only</option>
                <option value="android">Android Only</option>
              </select>
            </div>
          </div>

          <div className="bg-bg border border-border rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted">Gross Revenue ({Number(calcUsers)||0} users × {CURRENCY_PACKS[calcCountry]?.symbol}{calcPack === "yearly" ? CURRENCY_PACKS[calcCountry]?.yearly : CURRENCY_PACKS[calcCountry]?.monthly})</span>
              <span className="text-sm font-bold text-fg">{CURRENCY_PACKS[calcCountry]?.symbol}{((Number(calcUsers)||0) * (calcPack === "yearly" ? CURRENCY_PACKS[calcCountry]?.yearly : CURRENCY_PACKS[calcCountry]?.monthly)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-muted">Net Revenue (After 30% Apple/Google fee)</span>
              <span className="text-sm font-bold text-fg">{CURRENCY_PACKS[calcCountry]?.symbol}{(((Number(calcUsers)||0) * (calcPack === "yearly" ? CURRENCY_PACKS[calcCountry]?.yearly : CURRENCY_PACKS[calcCountry]?.monthly)) * 0.70).toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-border flex justify-between items-center">
              <span className="text-sm font-black text-fg">Your Estimated Earnings ({Math.round(influencerData.commission_rate * 100)}%)</span>
              <span className="text-xl font-black text-accent">{CURRENCY_PACKS[calcCountry]?.symbol}{((((Number(calcUsers)||0) * (calcPack === "yearly" ? CURRENCY_PACKS[calcCountry]?.yearly : CURRENCY_PACKS[calcCountry]?.monthly)) * 0.70) * influencerData.commission_rate).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Referral link */}
        <div className="bg-elevated border border-border rounded-2xl p-5 mb-5">
          <p className="text-xs font-bold text-muted tracking-widest mb-3">YOUR REFERRAL LINK</p>
          <div className="flex items-center gap-3">
            <code className="flex-1 text-xs bg-bg border border-border rounded-lg px-3 py-2.5 text-accent truncate">
              {REFERRAL_URL}
            </code>
            <button
              onClick={copyLink}
              className="text-xs font-bold text-fg border border-border px-4 py-2.5 rounded-lg hover:bg-ghost transition-colors shrink-0"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-muted mt-2">
            Or use code <span className="font-mono text-fg">{influencerData.referral_code}</span> in the app
          </p>
        </div>

        {/* Withdraw */}
        <div className="bg-elevated border border-border rounded-2xl p-5 mb-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-muted tracking-widest">WITHDRAW EARNINGS</p>
            {influencerData.pending_balance > 0 && (
              <span className="text-xs text-yellow-400">${influencerData.pending_balance.toFixed(2)} pending</span>
            )}
          </div>
          <p className="text-sm text-muted mb-4">
            Available: <span className="text-accent font-bold">${influencerData.available_balance.toFixed(2)}</span>
            {" "}· Minimum $10 · Paid after admin approval
          </p>

          {!showWithdraw ? (
            <button
              onClick={() => setShowWithdraw(true)}
              disabled={influencerData.available_balance < 10}
              className="bg-accent text-accent-ink text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 disabled:opacity-40"
            >
              Request withdrawal
            </button>
          ) : (
            <form onSubmit={requestWithdrawal} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-muted tracking-widest mb-1.5">AMOUNT ($)</label>
                  <input
                    type="number" min={10} max={influencerData.available_balance} step={0.01}
                    value={wForm.amount}
                    onChange={(e) => setWForm({ ...wForm, amount: e.target.value })}
                    required
                    className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 text-sm text-fg outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted tracking-widest mb-1.5">METHOD</label>
                  <select
                    value={wForm.method}
                    onChange={(e) => setWForm({ ...wForm, method: e.target.value })}
                    className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 text-sm text-fg outline-none focus:border-accent"
                  >
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="crypto">Crypto (USDC)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted tracking-widest mb-1.5">PAYMENT DETAILS</label>
                <input
                  value={wForm.details}
                  onChange={(e) => setWForm({ ...wForm, details: e.target.value })}
                  placeholder="PayPal email / bank details / wallet address"
                  required
                  className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 text-sm text-fg outline-none focus:border-accent"
                />
              </div>
              {wMsg && <p className="text-xs text-muted">{wMsg}</p>}
              <div className="flex gap-3">
                <button type="submit" disabled={wSaving}
                  className="bg-accent text-accent-ink text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 disabled:opacity-50">
                  {wSaving ? "Submitting…" : "Submit request"}
                </button>
                <button type="button" onClick={() => setShowWithdraw(false)}
                  className="text-sm text-muted hover:text-fg border border-border px-5 py-2.5 rounded-xl">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Conversions table */}
        {dataLoading ? (
          <div className="flex items-center gap-3 py-8">
            <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="bg-elevated border border-border rounded-2xl overflow-hidden mb-5">
              <div className="px-5 py-4 border-b border-border">
                <p className="text-xs font-bold text-muted tracking-widest">REFERRAL HISTORY</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Status", "Date", "Commission"].map((h) => (
                      <th key={h} className="text-left text-xs font-bold text-muted tracking-widest px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {conversions.length === 0 ? (
                    <tr><td colSpan={3} className="px-5 py-8 text-center text-muted text-sm">Share your link to get started!</td></tr>
                  ) : (
                    conversions.map((c) => (
                      <tr key={c.id} className="border-b border-border last:border-0">
                        <td className="px-5 py-3">
                          <span className={`text-xs font-bold capitalize ${STATUS_COLORS[c.status] ?? "text-muted"}`}>
                            {c.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-xs text-muted">{new Date(c.signed_up_at).toLocaleDateString()}</td>
                        <td className="px-5 py-3 text-accent font-bold text-sm">
                          {c.commission_amount > 0 ? `$${c.commission_amount.toFixed(2)}` : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {withdrawals.length > 0 && (
              <div className="bg-elevated border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <p className="text-xs font-bold text-muted tracking-widest">WITHDRAWAL HISTORY</p>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {withdrawals.map((w) => (
                      <tr key={w.id} className="border-b border-border last:border-0">
                        <td className="px-5 py-3 font-bold text-accent">${w.amount.toFixed(2)}</td>
                        <td className="px-5 py-3 text-muted capitalize">{w.payment_method.replace("_", " ")}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-bold capitalize ${STATUS_COLORS[w.status] ?? "text-muted"}`}>{w.status}</span>
                        </td>
                        <td className="px-5 py-3 text-xs text-faint">{new Date(w.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
