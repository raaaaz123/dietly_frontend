import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import FAQ from "./components/FAQ";
import MobileCTA from "./components/MobileCTA";
import StoreButtons from "./components/StoreButtons";
import { CoachScreen, ScanScreen, TodayScreen } from "./components/AppMockups";
import {
  ArrowIcon,
  BoltIcon,
  BrainIcon,
  ChartIcon,
  CheckIcon,
  DropIcon,
  DumbbellIcon,
  FlameIcon,
  GlobeIcon,
  MicIcon,
  ScanIcon,
  ShieldIcon,
  SparkIcon,
  StarIcon,
} from "./components/Icons";

export const metadata: Metadata = {
  title: "Dietly — AI Calorie & Macro Tracking From One Photo",
  description:
    "Snap a photo of any meal for instant calorie and macro tracking. Rexa, your AI coach, remembers your goals and tells you what to eat next. Track workouts, water and streaks. Free on iOS and Android.",
  alternates: { canonical: "https://dietly.life" },
  openGraph: {
    title: "Dietly — AI Calorie & Macro Tracking From One Photo",
    description:
      "Snap a photo of any meal for instant calorie and macro tracking. An AI coach that remembers your goals. Free on iOS and Android.",
    url: "https://dietly.life",
  },
};

/* ─────────────── content ─────────────── */

const trustItems = [
  "4.9 on the App Store",
  "~98% food recognition accuracy",
  "14 languages",
  "iOS and Android",
  "Free plan, no card needed",
  "Data encrypted end to end",
];

const steps = [
  {
    num: "1",
    title: "Snap, speak or type",
    desc: "Point your camera at the plate. Or just say what you ate. No searching databases, no weighing.",
    Icon: ScanIcon,
  },
  {
    num: "2",
    title: "Confirm in one tap",
    desc: "You get ingredients, portions, calories and macros in about two seconds. Adjust anything, then log it.",
    Icon: CheckIcon,
  },
  {
    num: "3",
    title: "Let Rexa steer",
    desc: "Your coach reads today's logs and workouts, then tells you exactly what to eat next to hit your target.",
    Icon: SparkIcon,
  },
];

const features = [
  {
    Icon: ScanIcon,
    title: "Photo food logging",
    desc: "Every ingredient identified, every portion estimated, macros calculated. One photo, two seconds.",
  },
  {
    Icon: BrainIcon,
    title: "A coach with memory",
    desc: "Rexa remembers your goals, history and preferences across every conversation, so advice keeps getting sharper.",
  },
  {
    Icon: MicIcon,
    title: "Voice-first logging",
    desc: "Hands full? Say it out loud. Meals, workouts and water logged without touching the screen.",
  },
  {
    Icon: DumbbellIcon,
    title: "Workouts and plans",
    desc: "Describe your session in plain words. Sets, reps and weights tracked, and your plan adapts as you get stronger.",
  },
  {
    Icon: DropIcon,
    title: "Hydration targets",
    desc: "A daily water goal based on your body and activity, with reminders that land at the right time.",
  },
  {
    Icon: FlameIcon,
    title: "Streaks, XP and badges",
    desc: "Daily challenges and levels that make consistency feel like progress instead of a chore.",
  },
  {
    Icon: GlobeIcon,
    title: "Speaks your language",
    desc: "Full app and coach in 14 languages, including right-to-left support for Arabic.",
  },
  {
    Icon: ShieldIcon,
    title: "Private by default",
    desc: "Encrypted at rest and in transit. Never sold, never shared, never used to train models. Delete anytime.",
  },
];

const coachBenefits = [
  {
    Icon: ChartIcon,
    title: "Reads your actual data",
    desc: "Today's meals, macros, workouts, water and weight trend — all in context before it answers.",
  },
  {
    Icon: BoltIcon,
    title: "Adjusts your targets",
    desc: "Progress stalls, calories shift. Rexa updates your macro and workout targets as your body changes.",
  },
  {
    Icon: MicIcon,
    title: "Talk, don't type",
    desc: "Start a live voice call with your coach while you cook, walk or train. It answers in real time.",
  },
];

const creatorStats = [
  { value: "Up to 30%", label: "Commission" },
  { value: "$10", label: "Min withdrawal" },
  { value: "Instant", label: "Link generation" },
  { value: "Real time", label: "Earnings tracking" },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rexatech",
    url: "https://dietly.life",
    logo: "https://dietly.life/images/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "rexatechin@gmail.com",
      contactType: "customer support",
    },
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Dietly",
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS, Android",
    url: "https://dietly.life",
    description:
      "AI-powered nutrition and fitness tracking app. Snap meals for instant macro analysis, get personalized coaching, log workouts by voice, and build healthy habits.",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
      { "@type": "Offer", price: "9.99", priceCurrency: "USD", name: "Pro monthly" },
    ],
    screenshot: "https://dietly.life/images/dashboard.png",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dietly",
    url: "https://dietly.life",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://dietly.life/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How accurate is the AI food recognition?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dietly's AI achieves ~98% accuracy on common meals. It identifies individual ingredients, estimates portions, and calculates calories and macros in under 2 seconds. You can always adjust the estimates before confirming.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a subscription to use Dietly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The free tier includes food logging (5 meals/day), basic macro tracking, water tracking, and 3 AI coach messages per day. Pro unlocks unlimited everything, voice logging, workout tracking, wearable sync, and priority support for $9.99/month.",
        },
      },
      {
        "@type": "Question",
        name: "What makes the Dietly AI coach different?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unlike generic AI assistants, Rexa — Dietly's built-in coach — has persistent memory. It remembers your preferences, history, and goals across every conversation to give personalized, evidence-backed advice that improves over time.",
        },
      },
      {
        "@type": "Question",
        name: "Is my health data private and secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Your data is encrypted at rest and in transit. We never sell your data, share it with third parties, or use it to train AI models. You can export or delete all your data at any time.",
        },
      },
      {
        "@type": "Question",
        name: "What devices and wearables are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dietly is available on iOS and Android. It integrates with Apple HealthKit and Google Health Connect, and supports data from Whoop, Oura, Garmin, Fitbit, and Apple Watch.",
        },
      },
      {
        "@type": "Question",
        name: "Can I log meals and workouts by voice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. On Pro, you can speak naturally to log meals and workouts hands-free. The AI parses and logs everything automatically.",
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative overflow-hidden pt-[86px] pb-10 md:pt-[132px] md:pb-20">
          <div className="mesh-hero" aria-hidden />
          <div className="grid-lines" aria-hidden />

          <div className="wrap relative">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
              {/* copy */}
              <div className="lg:col-span-6 text-center lg:text-left">
                <Reveal>
                  <span className="eyebrow">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    AI nutrition tracking
                  </span>
                </Reveal>

                <Reveal delay={60}>
                  <h1 className="h1 mt-5 text-fg">
                    Calorie tracking in{" "}
                    <span className="marker relative z-0">one photo</span>.
                  </h1>
                </Reveal>

                <Reveal delay={140}>
                  <p className="lead mx-auto mt-5 max-w-[520px] lg:mx-0">
                    Point your camera at any meal and Dietly logs the
                    ingredients, calories and macros in about two seconds. Then
                    Rexa, your AI coach, tells you what to eat next.
                  </p>
                </Reveal>

                <Reveal delay={200}>
                  <div className="mt-8 flex flex-col items-center gap-4 lg:items-start">
                    <StoreButtons />
                    <p className="flex items-center gap-2 text-[13px] font-semibold text-fg-faint">
                      <CheckIcon size={15} className="text-accent" />
                      Free plan forever. No credit card.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={260}>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
                    <div className="flex items-center gap-2">
                      <span className="flex gap-0.5 text-accent">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <StarIcon key={i} size={13} />
                        ))}
                      </span>
                      <span className="text-[13px] font-bold text-fg">4.9</span>
                      <span className="text-[13px] text-fg-faint">
                        on the App Store
                      </span>
                    </div>
                    <span className="hidden h-4 w-px bg-border-strong sm:block" />
                    <p className="text-[13px] text-fg-faint">
                      <span className="font-bold text-fg">1K+</span> meals
                      scanned
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* hero image */}
              <div className="lg:col-span-6">
                <Reveal delay={120}>
                  <div className="relative mx-auto max-w-[560px] lg:max-w-none">
                    <div
                      className="absolute inset-x-6 top-8 bottom-8 rounded-[48px] bg-green-100/70 blur-3xl"
                      aria-hidden
                    />
                    <Image
                      src="/images/hero.png"
                      alt="Dietly scanning a meal and showing its full nutrition breakdown"
                      width={1920}
                      height={1080}
                      priority
                      sizes="(max-width: 1024px) 92vw, 620px"
                      className="relative w-full h-auto animate-float drop-shadow-[0_30px_60px_rgba(14,26,18,0.18)]"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ TRUST STRIP ═══════════ */}
        <section className="border-y border-border bg-surface py-3.5 overflow-hidden">
          <div className="flex w-max animate-marquee items-center">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                className="flex items-center gap-8 pr-8 md:gap-12 md:pr-12"
                aria-hidden={dup === 1}
              >
                {trustItems.map((item) => (
                  <span
                    key={item}
                    className="flex shrink-0 items-center gap-2.5 text-[12.5px] font-semibold text-fg-muted"
                  >
                    <CheckIcon size={14} className="text-accent" />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ HOW IT WORKS ═══════════ */}
        <section id="how-it-works" className="section">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[640px]">
                <span className="eyebrow">How it works</span>
                <h2 className="h2 mt-4 text-fg">
                  Three taps between you and a{" "}
                  <span className="text-accent">tracked day</span>.
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * 80}>
                  <div className="card card-hover h-full p-6 md:p-7">
                    <div className="flex items-center justify-between">
                      <span className="icon-tile">
                        <step.Icon size={20} />
                      </span>
                      <span className="font-mono text-[13px] font-medium text-accent-light">
                        0{step.num}
                      </span>
                    </div>
                    <h3 className="h3 mt-5 text-fg">{step.title}</h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-fg-muted">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SHOWCASE ═══════════ */}
        <section className="section bg-surface border-y border-border">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[640px]">
                <span className="eyebrow">Inside the app</span>
                <h2 className="h2 mt-4 text-fg">
                  Clean screens. Zero busywork.
                </h2>
                <p className="lead mt-4 max-w-[520px]">
                  Scan a meal, see your whole day at a glance, and ask your coach
                  what to do next. That is the entire loop.
                </p>
              </div>
            </Reveal>

            {/* mobile: snap rail — desktop: grid */}
            <div className="no-bar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:mt-14 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
              {[
                {
                  Screen: ScanScreen,
                  label: "Scan",
                  desc: "Photo in, macros out",
                },
                {
                  Screen: TodayScreen,
                  label: "Today",
                  desc: "Calories, water, streak",
                },
                {
                  Screen: CoachScreen,
                  label: "Coach",
                  desc: "Rexa, with full context",
                },
              ].map(({ Screen, label, desc }, i) => (
                <Reveal
                  key={label}
                  delay={i * 90}
                  className="w-[262px] shrink-0 snap-center md:w-auto"
                >
                  <div className="mx-auto max-w-[280px]">
                    <Screen />
                    <div className="mt-5 text-center">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-deep">
                        {label}
                      </p>
                      <p className="mt-1 text-[14px] font-semibold text-fg-muted">
                        {desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FEATURES ═══════════ */}
        <section id="features" className="section">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[640px]">
                <span className="eyebrow">Features</span>
                <h2 className="h2 mt-4 text-fg">
                  Everything a health app should be, nothing it should not.
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={(i % 4) * 70}>
                  <div className="card card-hover h-full p-6">
                    <span className="icon-tile">
                      <f.Icon size={20} />
                    </span>
                    <h3 className="mt-5 text-[16.5px] font-bold tracking-[-0.02em] text-fg">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
                      {f.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ AI COACH ═══════════ */}
        <section id="ai-coach" className="section bg-surface border-y border-border">
          <div className="wrap">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <Reveal>
                  <span className="eyebrow">Meet Rexa</span>
                  <h2 className="h2 mt-4 text-fg">
                    An AI coach that has{" "}
                    <span className="text-accent">read your day</span>.
                  </h2>
                  <p className="lead mt-4 max-w-[500px]">
                    Rexa is not a chatbot bolted onto a food diary. It pulls your
                    real logs, macros and workouts before it answers, in text or
                    on a live voice call.
                  </p>
                </Reveal>

                <div className="mt-8 space-y-3">
                  {coachBenefits.map((b, i) => (
                    <Reveal key={b.title} delay={i * 80}>
                      <div className="flex items-start gap-4 rounded-2xl border border-border bg-elevated p-4">
                        <span className="icon-tile shrink-0">
                          <b.Icon size={19} />
                        </span>
                        <div>
                          <p className="text-[15px] font-bold text-fg">
                            {b.title}
                          </p>
                          <p className="mt-1 text-[13.5px] leading-relaxed text-fg-muted">
                            {b.desc}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <Reveal delay={100}>
                  <div className="relative mx-auto max-w-[300px]">
                    <div
                      className="absolute -inset-6 rounded-[56px] bg-green-200/40 blur-3xl"
                      aria-hidden
                    />
                    <div className="relative">
                      <CoachScreen />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ FREE TOOLS ═══════════ */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div className="max-w-[640px]">
                <span className="eyebrow">Free tools</span>
                <h2 className="h2 mt-4 text-fg">
                  Run the numbers before you download.
                </h2>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
              {[
                {
                  href: "/macro-calculator",
                  Icon: ChartIcon,
                  title: "Macro & TDEE Calculator",
                  desc: "Your daily calories and the protein, carb and fat split to reach your goal. Mifflin-St Jeor based.",
                },
                {
                  href: "/body-fat-calculator",
                  Icon: ScanIcon,
                  title: "Body Fat Calculator",
                  desc: "Estimate body composition with the US Navy method using a tape measure and 30 seconds.",
                },
              ].map((tool, i) => (
                <Reveal key={tool.href} delay={i * 90}>
                  <Link
                    href={tool.href}
                    className="card card-hover group flex h-full items-start gap-4 p-6 md:p-7"
                  >
                    <span className="icon-tile shrink-0">
                      <tool.Icon size={20} />
                    </span>
                    <span className="block">
                      <span className="flex items-center gap-2 text-[16.5px] font-bold tracking-[-0.02em] text-fg">
                        {tool.title}
                        <ArrowIcon
                          size={16}
                          className="text-accent transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                      <span className="mt-2 block text-[14px] leading-relaxed text-fg-muted">
                        {tool.desc}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CREATORS ═══════════ */}
        <section id="creators" className="section">
          <div className="wrap">
            <Reveal>
              <div className="card-mint overflow-hidden p-6 md:p-12">
                <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-7">
                    <span className="eyebrow bg-white">Creator program</span>
                    <h2 className="h2 mt-4 text-fg">
                      Earn by sharing what you already use.
                    </h2>
                    <p className="lead mt-4 max-w-[480px]">
                      Get a referral link in minutes and earn a commission on
                      every subscriber you bring. Track earnings in real time and
                      withdraw from $10 via PayPal, bank transfer or crypto.
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/influencer/login"
                        className="btn btn-primary w-full sm:w-auto"
                      >
                        Become a creator
                        <ArrowIcon size={17} />
                      </Link>
                      <Link
                        href="/influencer"
                        className="btn btn-ghost w-full sm:w-auto"
                      >
                        Creator portal
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="grid grid-cols-2 gap-3">
                      {creatorStats.map((s) => (
                        <div
                          key={s.label}
                          className="rounded-2xl border border-border bg-elevated p-4 md:p-5"
                        >
                          <p className="text-[19px] font-extrabold tracking-[-0.03em] text-fg md:text-[22px]">
                            {s.value}
                          </p>
                          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.1em] text-fg-faint">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section id="faq" className="section border-t border-border bg-surface">
          <div className="wrap max-w-[860px]">
            <Reveal>
              <div className="max-w-[600px]">
                <span className="eyebrow">FAQ</span>
                <h2 className="h2 mt-4 text-fg">Questions, answered.</h2>
              </div>
            </Reveal>
            <div className="mt-8 md:mt-12">
              <Reveal delay={80}>
                <FAQ />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════ FINAL CTA ═══════════ */}
        <section id="download" className="section">
          <div className="wrap">
            <Reveal>
              <div className="relative overflow-hidden rounded-[32px] bg-fg px-6 py-12 text-center md:px-12 md:py-20">
                <div
                  className="absolute inset-0 opacity-90"
                  style={{
                    background:
                      "radial-gradient(70% 80% at 50% 0%, rgba(24,169,87,0.45) 0%, transparent 70%)",
                  }}
                  aria-hidden
                />
                <div className="relative mx-auto max-w-[620px]">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
                    Free download
                  </span>
                  <h2 className="h2 mt-5 text-white">
                    Your next meal can log itself.
                  </h2>
                  <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-relaxed text-white/70 md:text-[17px]">
                    Install Dietly, snap your first plate, and let Rexa handle the
                    rest. Free forever, no credit card.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <StoreButtons variant="light" />
                  </div>
                  <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-white/60">
                    <span className="flex items-center gap-1.5">
                      <span className="flex gap-0.5 text-accent-light">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <StarIcon key={i} size={12} />
                        ))}
                      </span>
                      4.9 App Store
                    </span>
                    <span>iOS and Android</span>
                    <span>14 languages</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <MobileCTA />
    </>
  );
}
