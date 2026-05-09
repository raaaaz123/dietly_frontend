"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInfluencerAuth } from "../../lib/influencer-auth";

const NICHES = ["Health & Wellness", "Fitness", "Nutrition / Diet", "Weight Loss", "Mental Health", "Lifestyle", "Other"];
const AUDIENCE_SIZES = ["< 5K", "5K – 25K", "25K – 100K", "100K – 500K", "500K+"];

type Step = "landing" | "apply" | "submitted";

export default function InfluencerLogin() {
  const { firebaseUser, loading, appStatus, signInWithGoogle, apiFetch, refreshStatus } = useInfluencerAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>("landing");
  const [authLoading, setAuthLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    niche: NICHES[0],
    audience_size: AUDIENCE_SIZES[1],
    message: "",
  });

  // Redirect if already active
  useEffect(() => {
    if (!loading && appStatus === "active") {
      router.replace("/influencer");
    }
  }, [loading, appStatus, router]);

  // Pre-fill name from Google profile
  useEffect(() => {
    if (firebaseUser && firebaseUser.displayName && !form.name) {
      setTimeout(() => {
        setForm((f) => ({ ...f, name: firebaseUser.displayName ?? "" }));
      }, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseUser]);

  // After Google sign-in, decide what to show
  useEffect(() => {
    if (!loading && firebaseUser) {
      if (appStatus === "none") {
        setTimeout(() => setStep("apply"), 0);
      }
      // active is handled by the redirect above
      // pending/rejected/suspended stay on landing with status message
    }
  }, [loading, firebaseUser, appStatus]);

  const handleGoogleSignIn = async () => {
    setError("");
    setAuthLoading(true);
    try {
      await signInWithGoogle();
    } catch (e: unknown) {
      setError((e as Error).message ?? "Sign-in failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.instagram && !form.tiktok && !form.youtube) {
      setError("Please provide at least one social handle.");
      return;
    }
    setError("");
    setSubmitLoading(true);
    try {
      await apiFetch("POST", "/referrals/apply", {
        name: form.name,
        instagram: form.instagram || null,
        tiktok: form.tiktok || null,
        youtube: form.youtube || null,
        niche: form.niche,
        audience_size: form.audience_size,
        message: form.message || null,
      });
      await refreshStatus();
      setStep("submitted");
    } catch (e: unknown) {
      setError((e as Error).message ?? "Submission failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Already has a pending/rejected/suspended application
  if (firebaseUser && appStatus !== "none" && appStatus !== "active") {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <p className="text-accent font-mono text-xs font-bold tracking-widest mb-8">VITAL · CREATOR PORTAL</p>
          {appStatus === "pending" && (
            <>
              <div className="w-14 h-14 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-black text-fg mb-2">Application under review</h1>
              <p className="text-sm text-muted mb-6">
                We received your application and will review it shortly. We&apos;ll reach out to <span className="text-fg">{firebaseUser.email}</span> once a decision is made.
              </p>
            </>
          )}
          {appStatus === "rejected" && (
            <>
              <div className="w-14 h-14 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-black text-fg mb-2">Application not approved</h1>
              <p className="text-sm text-muted mb-6">
                Unfortunately, your application wasn&apos;t approved at this time. Contact us if you have questions.
              </p>
            </>
          )}
          {appStatus === "suspended" && (
            <>
              <h1 className="text-2xl font-black text-fg mb-2">Account suspended</h1>
              <p className="text-sm text-muted mb-6">Please contact support for assistance.</p>
            </>
          )}
          <button
            onClick={async () => {
              const { signOut: fbOut } = await import("firebase/auth");
              const { auth: a } = await import("../../lib/firebase");
              await fbOut(a);
              window.location.href = "/influencer/login";
            }}
            className="text-xs text-muted hover:text-fg underline"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  // Application submitted confirmation
  if (step === "submitted") {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <p className="text-accent font-mono text-xs font-bold tracking-widest mb-8">VITAL · CREATOR PORTAL</p>
          <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-fg mb-2">Application submitted!</h1>
          <p className="text-sm text-muted">
            We&apos;ll review your application and reach out to <span className="text-fg">{firebaseUser?.email}</span> within a few days.
          </p>
        </div>
      </div>
    );
  }

  // Application form (after Google sign-in for new users)
  if (step === "apply" && firebaseUser) {
    return (
      <div className="min-h-screen bg-bg px-4 py-12">
        <div className="w-full max-w-lg mx-auto">
          <p className="text-accent font-mono text-xs font-bold tracking-widest mb-2">VITAL · CREATOR PORTAL</p>
          <h1 className="text-3xl font-black tracking-tight text-fg mb-1">Apply to be a creator</h1>
          <p className="text-sm text-muted mb-8">
            Signed in as <span className="text-fg">{firebaseUser.email}</span>
          </p>

          <form onSubmit={handleApply} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-muted tracking-widest mb-2">YOUR NAME *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Full name"
                className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-fg text-sm outline-none focus:border-accent"
              />
            </div>

            {/* Social handles */}
            <div>
              <label className="block text-xs font-bold text-muted tracking-widest mb-2">SOCIAL HANDLES (at least one)</label>
              <div className="space-y-3">
                {[
                  { key: "instagram", placeholder: "Instagram (@handle)", prefix: "IG" },
                  { key: "tiktok", placeholder: "TikTok (@handle)", prefix: "TT" },
                  { key: "youtube", placeholder: "YouTube (channel name or URL)", prefix: "YT" },
                ].map(({ key, placeholder, prefix }) => (
                  <div key={key} className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted w-6">{prefix}</span>
                    <input
                      value={(form as Record<string, string>)[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full bg-elevated border border-border rounded-xl pl-12 pr-4 py-3 text-fg text-sm outline-none focus:border-accent"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Niche + audience */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-muted tracking-widest mb-2">NICHE</label>
                <select
                  value={form.niche}
                  onChange={(e) => setForm({ ...form, niche: e.target.value })}
                  className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-fg text-sm outline-none focus:border-accent"
                >
                  {NICHES.map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted tracking-widest mb-2">AUDIENCE SIZE</label>
                <select
                  value={form.audience_size}
                  onChange={(e) => setForm({ ...form, audience_size: e.target.value })}
                  className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-fg text-sm outline-none focus:border-accent"
                >
                  {AUDIENCE_SIZES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold text-muted tracking-widest mb-2">WHY DO YOU WANT TO PARTNER? (optional)</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your audience and why you'd be a great fit…"
                rows={3}
                className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-fg text-sm outline-none focus:border-accent resize-none"
              />
            </div>

            {error && (
              <p className="text-xs font-semibold text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitLoading || !form.name.trim()}
              className="w-full bg-accent text-accent-ink font-bold text-sm py-3.5 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {submitLoading ? "Submitting…" : "Submit application →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Default: landing / sign-in page
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-accent font-mono text-xs font-bold tracking-widest mb-8">VITAL · CREATOR PORTAL</p>
        <h1 className="text-3xl font-black tracking-tight text-fg mb-2">Earn with Dietly</h1>
        <p className="text-sm text-muted mb-8">
          Share your referral link. Earn commission on every subscriber you bring. Withdraw once payment is confirmed.
        </p>

        <div className="space-y-4 mb-8">
          {[
            { title: "Share your link", desc: "Get a unique referral code and link for your audience." },
            { title: "Earn commissions", desc: "Get paid a % of every subscriber's first payment." },
            { title: "Withdraw anytime", desc: "Request payouts once your balance hits $10." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-fg">{item.title}</p>
                <p className="text-xs text-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-xs font-semibold text-red-400 bg-red-400/10 px-3 py-2 rounded-lg mb-4">{error}</p>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={authLoading}
          className="w-full flex items-center justify-center gap-3 bg-elevated border border-border text-fg font-semibold text-sm py-3.5 rounded-xl hover:bg-ghost transition-colors disabled:opacity-50"
        >
          {authLoading ? (
            <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          {authLoading ? "Signing in…" : "Continue with Google"}
        </button>

        <p className="text-xs text-center text-muted mt-4">
          Already a creator?{" "}
          <span className="text-fg">Sign in with the same Google account.</span>
        </p>
      </div>
    </div>
  );
}
