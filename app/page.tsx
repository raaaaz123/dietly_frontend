import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import FAQ from "./components/FAQ";

const features = [
  {
    icon: "◎",
    label: "AI VISION",
    title: "Snap. Recognize. Log.",
    desc: "Point your camera at any meal. GPT-4o vision identifies every ingredient, estimates portions, and calculates macros in under 2 seconds.",
  },
  {
    icon: "◈",
    label: "AGENTIC COACH",
    title: "A coach that remembers you.",
    desc: "Not a chatbot — an agent. It uses tool-calling, persistent memory, and RAG over nutrition science to give truly personalized advice.",
  },
  {
    icon: "◇",
    label: "VOICE FIRST",
    title: "Speak. We track.",
    desc: "Log meals, workouts, and water by voice. Whisper STT + Gemini Live for hands-free gym sessions with real-time cues.",
  },
  {
    icon: "▣",
    label: "SMART WORKOUTS",
    title: "Every rep, every set, tracked.",
    desc: "AI parses workout descriptions, tracks progressive overload, and adapts your plan based on recovery scores from wearable data.",
  },
  {
    icon: "◆",
    label: "HYDRATION",
    title: "Smart water reminders.",
    desc: "Personalized water targets scaled to your weight, climate, and activity. Push reminders when you fall behind.",
  },
  {
    icon: "✦",
    label: "GAMIFICATION",
    title: "Streaks, XP, and badges.",
    desc: "Daily challenges, level progression, and achievement badges. The engagement loop that keeps you consistent long-term.",
  },
];

const steps = [
  {
    num: "01",
    title: "Snap or speak",
    desc: "Take a photo of your meal, speak naturally, or type. The AI handles the rest.",
  },
  {
    num: "02",
    title: "Review & confirm",
    desc: "AI generates a detailed nutritional breakdown. Edit if needed, then confirm with one tap.",
  },
  {
    num: "03",
    title: "Get smarter daily",
    desc: "Your coach learns your patterns, adjusts targets, and proactively nudges you toward your goals.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/[0.04] rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-6 md:px-10 w-full py-20 md:py-0">
          <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
            {/* Left — Copy */}
            <div className="max-w-[600px]">
              <div className="animate-fade-up">
                <span className="label">AI NUTRITION TRACKING</span>
              </div>

              <h1 className="mt-6 mb-0 animate-fade-up delay-100">
                <span className="block text-[clamp(40px,7vw,72px)] font-bold leading-tight tracking-[-1px] text-fg font-body">
                  Your health,
                </span>
                <span className="flex items-center gap-4 mt-1">
                  <span className="text-[clamp(40px,7vw,72px)] leading-tight tracking-tight text-fg font-display">
                    simplified.
                  </span>
                  <span className="w-3 h-3 rounded-full bg-accent animate-pulse-dot shrink-0" />
                </span>
              </h1>

              <p className="mt-8 text-[16px] md:text-[18px] leading-relaxed text-muted max-w-[480px] animate-fade-up delay-300">
                AI-powered food recognition. An agentic coach that actually
                remembers you. Smart workout tracking. Voice-first logging.
                <span className="text-fg font-semibold">
                  {" "}
                  Your health, upgraded.
                </span>
              </p>

              <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-400">
                <a
                  href="#download"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-ink text-[12px] font-bold tracking-[1.6px] rounded-full hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] transition-all duration-300"
                >
                  GET DIETLY FREE
                  <span className="text-[18px]">→</span>
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border border-border-strong text-fg text-[12px] font-bold tracking-[1.6px] rounded-full hover:bg-surface transition-all duration-300"
                >
                  SEE HOW IT WORKS
                </a>
              </div>

              {/* Trust micro-stats */}
              <div className="mt-12 flex items-center gap-6 animate-fade-up delay-600">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-accent font-mono">
                    50K+
                  </span>
                  <span className="text-[10px] tracking-[1.6px] text-faint font-bold">
                    USERS
                  </span>
                </div>
                <span className="w-px h-3 bg-border-strong" />
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-accent font-mono">
                    4.9★
                  </span>
                  <span className="text-[10px] tracking-[1.6px] text-faint font-bold">
                    RATING
                  </span>
                </div>
                <span className="w-px h-3 bg-border-strong" />
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-accent font-mono">
                    98%
                  </span>
                  <span className="text-[10px] tracking-[1.6px] text-faint font-bold">
                    ACCURACY
                  </span>
                </div>
              </div>
            </div>

            {/* Right — App Mockup */}
            <div className="relative flex justify-center md:justify-end animate-fade-up delay-300">
              <div className="relative w-[280px] md:w-[320px] animate-float">
                <div className="absolute -inset-8 bg-accent/[0.06] rounded-[40px] blur-[60px]" />
                <div className="relative rounded-[32px] overflow-hidden border border-border-strong shadow-2xl">
                  <Image
                    src="/images/dashboard.png"
                    alt="Dietly Dashboard — calorie tracking, macros, and hydration"
                    width={640}
                    height={1280}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section className="border-y border-border bg-elevated/50">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: "50,000+", label: "ACTIVE USERS" },
                { value: "2M+", label: "MEALS LOGGED" },
                { value: "98%", label: "AI ACCURACY" },
                { value: "4.9★", label: "APP STORE" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight text-fg font-body">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] font-bold tracking-[2.4px] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" className="py-24 md:py-36">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Reveal>
            <div className="max-w-[600px] mb-16 md:mb-24">
              <span className="label">CAPABILITIES</span>
              <h2 className="mt-5 text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-1px] text-fg font-body">
                Everything your health
                <br />
                <span className="font-display font-medium tracking-tight">
                  app should be.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Reveal key={f.label} delay={i * 80}>
                <div className="group glass-card rounded-2xl p-8 md:p-10 hover:border-accent/30 transition-all duration-500 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[24px] text-accent">{f.icon}</span>
                    <span className="text-[10px] font-bold tracking-[2.4px] text-muted">
                      {f.label}
                    </span>
                  </div>
                  <h3 className="text-[20px] md:text-[22px] font-bold tracking-[-0.5px] text-fg mb-3 group-hover:text-accent transition-colors duration-300">
                    {f.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-muted">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how-it-works" className="py-24 md:py-36 border-y border-border bg-elevated/30">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-24">
              <span className="label">HOW IT WORKS</span>
              <h2 className="mt-5 text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-1px] text-fg font-body">
                Three steps to
                <span className="font-display font-medium tracking-tight">
                  {" "}
                  smarter health.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 120}>
                <div className="relative">
                  <span className="block text-[clamp(56px,8vw,80px)] font-bold tracking-tight text-ghost font-body leading-none mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-[22px] md:text-[26px] font-bold tracking-[-0.5px] text-fg mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted">
                    {step.desc}
                  </p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-6 w-12 border-t border-dashed border-border-strong" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ APP SHOWCASE ═══════════ */}
      <section className="py-24 md:py-36">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-24">
              <span className="label">SEE IT IN ACTION</span>
              <h2 className="mt-5 text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-1px] text-fg font-body">
                Designed for
                <span className="font-display font-medium tracking-tight">
                  {" "}
                  real life.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                src: "/images/dashboard.png",
                alt: "Dashboard with calories, macros, and hydration tracking",
                label: "DASHBOARD",
                desc: "Your daily command center",
              },
              {
                src: "/images/foodlog.png",
                alt: "AI-powered food recognition and nutritional breakdown",
                label: "AI FOOD LOG",
                desc: "Snap → instant nutrition",
              },
              {
                src: "/images/coach.png",
                alt: "AI coach chat with personalized nutrition advice",
                label: "AI COACH",
                desc: "Your personal nutritionist",
              },
            ].map((screen, i) => (
              <Reveal key={screen.label} delay={i * 120}>
                <div className="group text-center">
                  <div className="relative mx-auto w-[240px] md:w-[260px] mb-8">
                    <div className="absolute -inset-4 bg-accent/[0.04] rounded-[32px] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative rounded-[24px] overflow-hidden border border-border group-hover:border-accent/20 transition-colors duration-500 shadow-xl">
                      <Image
                        src={screen.src}
                        alt={screen.alt}
                        width={520}
                        height={1040}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-[2.4px] text-accent">
                    {screen.label}
                  </span>
                  <p className="mt-2 text-[15px] font-semibold text-muted">
                    {screen.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PRICING ═══════════ */}
      <section id="pricing" className="py-24 md:py-36 border-y border-border bg-elevated/30">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-24">
              <span className="label">PRICING</span>
              <h2 className="mt-5 text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-1px] text-fg font-body">
                Start free.
                <span className="font-display font-medium tracking-tight">
                  {" "}
                  Upgrade when ready.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Free tier */}
            <Reveal>
              <div className="glass-card rounded-2xl p-8 md:p-10 h-full flex flex-col">
                <span className="text-[10px] font-bold tracking-[2.4px] text-muted">
                  FREE
                </span>
                <div className="mt-4 mb-6">
                  <span className="text-[48px] font-bold tracking-[-1px] text-fg font-body">
                    $0
                  </span>
                  <span className="text-[15px] text-faint ml-1">/forever</span>
                </div>
                <div className="divider mb-6" />
                <ul className="space-y-4 flex-1">
                  {[
                    "Food logging (5 meals/day)",
                    "Basic macro tracking",
                    "Water tracking",
                    "3 coach messages/day",
                    "Streak & XP system",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14px] text-muted"
                    >
                      <span className="text-accent mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#download"
                  className="mt-8 block text-center py-3.5 border border-border-strong text-fg text-[12px] font-bold tracking-[1.6px] rounded-full hover:bg-surface transition-all duration-300"
                >
                  START FREE
                </a>
              </div>
            </Reveal>

            {/* Pro tier */}
            <Reveal delay={120}>
              <div className="relative glass-card rounded-2xl p-8 md:p-10 h-full flex flex-col border-accent/30">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold tracking-[2.4px] text-accent">
                    PRO
                  </span>
                  <span className="px-2.5 py-0.5 bg-accent-soft text-accent text-[9px] font-bold tracking-[1px] rounded-full">
                    POPULAR
                  </span>
                </div>
                <div className="mt-4 mb-6">
                  <span className="text-[48px] font-bold tracking-[-1px] text-fg font-body">
                    $9.99
                  </span>
                  <span className="text-[15px] text-faint ml-1">/month</span>
                </div>
                <div className="divider mb-6" />
                <ul className="space-y-4 flex-1">
                  {[
                    "Unlimited food logging",
                    "Advanced macros + micronutrients",
                    "Unlimited AI coach",
                    "Voice commands & live coach",
                    "Workout tracking & plans",
                    "Wearable sync & recovery score",
                    "Priority support",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14px] text-muted"
                    >
                      <span className="text-accent mt-0.5 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#download"
                  className="mt-8 block text-center py-3.5 bg-accent text-accent-ink text-[12px] font-bold tracking-[1.6px] rounded-full hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] transition-all duration-300"
                >
                  START PRO TRIAL →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ CREATOR PROGRAM ═══════════ */}
      <section id="creators" className="py-24 md:py-36 border-y border-border">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              {/* Left — copy */}
              <div>
                <span className="label">CREATOR PROGRAM</span>
                <h2 className="mt-5 text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-1px] text-fg font-body">
                  Earn by sharing
                  <br />
                  <span className="font-display font-medium tracking-tight">
                    what you love.
                  </span>
                </h2>
                <p className="mt-6 text-[15px] md:text-[16px] leading-relaxed text-muted max-w-[440px]">
                  Join our creator network. Share your unique referral link with your audience — earn a commission on every subscriber you bring.
                </p>

                <div className="mt-10 space-y-5">
                  {[
                    {
                      icon: "◎",
                      title: "Get your referral link",
                      desc: "Apply in minutes. Once approved, you'll get a unique link and code to share anywhere.",
                    },
                    {
                      icon: "◈",
                      title: "Earn real commissions",
                      desc: "Get paid a percentage of every subscriber's first payment. Commission credited automatically.",
                    },
                    {
                      icon: "◇",
                      title: "Withdraw after confirmation",
                      desc: "Request payouts once your balance reaches $10. Paid via PayPal, bank transfer, or crypto.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <span className="text-[20px] text-accent shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-[14px] font-bold text-fg">{item.title}</p>
                        <p className="text-[13px] text-muted mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="/influencer/login"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-ink text-[12px] font-bold tracking-[1.6px] rounded-full hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] transition-all duration-300"
                  >
                    BECOME A CREATOR →
                  </a>
                  <a
                    href="/influencer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 border border-border-strong text-fg text-[12px] font-bold tracking-[1.6px] rounded-full hover:bg-surface transition-all duration-300"
                  >
                    CREATOR PORTAL
                  </a>
                </div>
              </div>

              {/* Right — stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "Up to 30%", label: "COMMISSION RATE", accent: true },
                  { value: "$10", label: "MIN WITHDRAWAL", accent: false },
                  { value: "Instant", label: "LINK GENERATION", accent: false },
                  { value: "Real-time", label: "EARNINGS TRACKING", accent: true },
                ].map((s) => (
                  <div key={s.label} className="glass-card rounded-2xl p-6 md:p-8">
                    <p className={`text-[clamp(22px,3vw,32px)] font-bold tracking-tight ${s.accent ? "text-accent" : "text-fg"}`}>
                      {s.value}
                    </p>
                    <p className="text-[10px] font-bold tracking-[2px] text-muted mt-2">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section id="faq" className="py-24 md:py-36">
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <Reveal>
            <div className="mb-12 md:mb-16">
              <span className="label">FREQUENTLY ASKED</span>
              <h2 className="mt-5 text-[clamp(28px,4vw,42px)] font-bold leading-[1.1] tracking-[-1px] text-fg font-body">
                Got questions?
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <FAQ />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section id="download" className="relative py-24 md:py-36 border-t border-border overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center relative">
          <Reveal>
            <span className="label">DOWNLOAD NOW</span>
            <h2 className="mt-6 text-[clamp(36px,6vw,64px)] font-bold leading-[1.1] tracking-[-1.5px] text-fg font-body">
              Your health,
              <br />
              <span className="font-display font-medium tracking-[-1px]">
                upgraded.
              </span>
            </h2>
            <p className="mt-6 text-[16px] md:text-[18px] leading-relaxed text-muted max-w-[460px] mx-auto">
              Download Dietly and start your journey today. Free forever. No
              credit card required.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {/* App Store */}
              <a
                href="#"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-fg text-bg rounded-full hover:opacity-90 transition-opacity"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[9px] tracking-wider font-semibold opacity-70">
                    DOWNLOAD ON
                  </span>
                  <span className="block text-[14px] font-bold -mt-0.5">
                    App Store
                  </span>
                </div>
              </a>
              {/* Google Play */}
              <a
                href="#"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-fg text-bg rounded-full hover:opacity-90 transition-opacity"
              >
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 16 18"
                  fill="currentColor"
                >
                  <path d="M1.22.557a.77.77 0 0 0-.22.56v15.766a.77.77 0 0 0 .22.56l.03.03L9.3 9.42v-.08L1.25.527l-.03.03z" />
                  <path d="m12.02 12.15-2.72-2.73v-.08l2.72-2.73.06.03 3.22 1.83c.92.52.92 1.38 0 1.9l-3.22 1.83-.06.03-.06-.08z" />
                  <path d="M12.08 12.18 9.3 9.42 1.25 17.47c.3.32.8.36 1.36.04l9.47-5.33z" />
                  <path d="m12.08 6.61-9.47-5.33c-.56-.32-1.06-.28-1.36.04L9.3 9.34l2.78-2.73z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[9px] tracking-wider font-semibold opacity-70">
                    DOWNLOAD ON
                  </span>
                  <span className="block text-[14px] font-bold -mt-0.5">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
