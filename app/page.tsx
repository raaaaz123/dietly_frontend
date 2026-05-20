import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import FAQ from "./components/FAQ";

export const metadata: Metadata = {
  title: "Dietly — AI Nutrition & Health Tracking App",
  description:
    "Snap a photo of any meal for instant calorie and macro tracking. Personalized AI coaching that remembers your goals. Track workouts, hydration, and build streaks. Free on iOS and Android.",
  alternates: { canonical: "https://dietly.life" },
  openGraph: {
    title: "Dietly — AI Nutrition & Health Tracking App",
    description:
      "Snap a photo of any meal for instant calorie and macro tracking. Personalized AI coaching that remembers your goals. Free on iOS and Android.",
    url: "https://dietly.life",
  },
};

const features = [
  {
    icon: "✿",
    label: "AI VISION",
    title: "Snap. Recognize. Log.",
    desc: "Point your camera at any meal. Dietly instantly identifies every ingredient, estimates portions, and breaks down your calories and macros -- no typing needed.",
  },
  {
    icon: "✽",
    label: "AI COACH",
    title: "A coach that remembers you.",
    desc: "Your personal coach learns your habits, goals, and progress over time -- giving advice that actually fits your life, not a one-size-fits-all plan.",
  },
  {
    icon: "❋",
    label: "VOICE FIRST",
    title: "Speak. We track.",
    desc: "Log meals, workouts, and water with just your voice. Hands-free while cooking, at the gym, or any time you don't want to touch your phone.",
  },
  {
    icon: "✧",
    label: "SMART WORKOUTS",
    title: "Every rep, every set, tracked.",
    desc: "Describe your workout naturally and Dietly handles the rest -- tracking sets, reps, and weights, then adjusting your plan as you get stronger.",
  },
  {
    icon: "❖",
    label: "HYDRATION",
    title: "Smart water reminders.",
    desc: "Personalized daily water targets based on your body and activity level. Timely reminders keep you on track without being annoying.",
  },
  {
    icon: "✦",
    label: "GAMIFICATION",
    title: "Streaks, XP, and badges.",
    desc: "Daily challenges, level progression, and achievement badges make staying consistent feel rewarding -- not like a chore.",
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
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "50000",
    },
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
          text: "Dietly's AI achieves ~98% accuracy on common meals. It identifies individual ingredients, estimates portions, and calculates macros in under 2 seconds. You can always adjust the estimates before confirming.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a subscription to use Dietly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The free tier includes food logging (5 meals/day), basic macro tracking, water tracking, and 3 AI coach messages per day. Pro unlocks unlimited everything, voice logging, workout tracking, wearable sync, and priority support for $9.99/month.",
        },
      },
      {
        "@type": "Question",
        name: "What makes the Dietly AI coach different?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unlike generic AI assistants, Dietly's coach has persistent memory — it remembers your preferences, history, and goals across every conversation, giving evidence-backed, personalized advice that improves over time.",
        },
      },
      {
        "@type": "Question",
        name: "Is my health data private and secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Your data is encrypted at rest and in transit. We never sell your data or share it with third parties. You can export or delete all your data at any time.",
        },
      },
      {
        "@type": "Question",
        name: "What devices and wearables does Dietly support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dietly is available on iOS and Android. It integrates with Apple HealthKit, Google Health Connect, and supports data from Whoop, Oura, Garmin, Fitbit, and Apple Watch.",
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

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[100dvh] flex items-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.04] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Side: Massive Typography */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center order-1 text-center lg:text-left">
              <Reveal delay={0}>
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 md:mb-8">
                  <span className="w-8 md:w-12 h-px bg-fg hidden md:block" />
                  <span className="text-[10px] md:text-[11px] font-bold tracking-[3px] text-fg uppercase">AI Nutrition System</span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-[clamp(48px,8vw,120px)] font-bold leading-[0.95] md:leading-[0.9] tracking-[-2px] md:tracking-[-4px] text-fg font-body m-0">
                  Eat <span className="font-display italic text-accent font-light">better.</span><br />
                  Live <span className="font-display italic text-accent font-light">smarter.</span>
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-8 md:mt-12 flex relative justify-center lg:justify-start">
                  <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent to-transparent" />
                  <p className="text-[15px] md:text-[18px] lg:text-[20px] leading-[1.6] text-fg-muted max-w-[500px] font-medium lg:pl-8 mx-auto lg:mx-0">
                    Scan food instantly with your phone camera. An agentic coach that remembers you. Voice-first logging. Your health, engineered for precision.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-10 md:mt-14 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-4 lg:pl-8">
                  <a
                    href="https://apps.apple.com/us/app/dietly-ai-snap-calories/id6769698416"
                    className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3.5 bg-fg text-bg rounded-full hover:scale-105 transition-transform duration-300"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left">
                      <span className="block text-[9px] tracking-wider font-semibold opacity-70">DOWNLOAD ON</span>
                      <span className="block text-[14px] font-bold -mt-0.5">App Store</span>
                    </div>
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.dietlyai.app"
                    className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3.5 bg-fg text-bg rounded-full hover:scale-105 transition-transform duration-300"
                  >
                    <svg width="18" height="20" viewBox="0 0 16 18" fill="currentColor">
                      <path d="M1.22.557a.77.77 0 0 0-.22.56v15.766a.77.77 0 0 0 .22.56l.03.03L9.3 9.42v-.08L1.25.527l-.03.03z" />
                      <path d="m12.02 12.15-2.72-2.73v-.08l2.72-2.73.06.03 3.22 1.83c.92.52.92 1.38 0 1.9l-3.22 1.83-.06.03-.06-.08z" />
                      <path d="M12.08 12.18 9.3 9.42 1.25 17.47c.3.32.8.36 1.36.04l9.47-5.33z" />
                      <path d="m12.08 6.61-9.47-5.33c-.56-.32-1.06-.28-1.36.04L9.3 9.34l2.78-2.73z" />
                    </svg>
                    <div className="text-left">
                      <span className="block text-[9px] tracking-wider font-semibold opacity-70">DOWNLOAD ON</span>
                      <span className="block text-[14px] font-bold -mt-0.5">Google Play</span>
                    </div>
                  </a>
                  <div className="flex sm:flex-col gap-2 sm:gap-1 items-center sm:items-start ml-0 sm:ml-2">
                     <div className="text-[11px] font-bold tracking-[2px] text-accent">1K+ FOOD SCANS</div>
                     <div className="text-[10px] tracking-[1px] text-fg-faint uppercase font-semibold">Join the movement</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Side: Editorial Image Placement */}
            <div className="lg:col-span-6 xl:col-span-5 relative order-2 h-[450px] md:h-[600px] lg:h-[75vh] w-full max-w-[500px] lg:max-w-none mx-auto">
               <Reveal delay={200} className="w-full h-full absolute inset-0">
                 <div className="relative w-full h-full animate-float flex items-center justify-center lg:justify-end">
                    <Image
                      src="/images/hero.png"
                      alt="Dietly Lifestyle"
                      fill
                      className="object-contain object-center lg:object-right drop-shadow-2xl scale-[1.05] md:scale-[1.1] lg:scale-[1.25] origin-center lg:origin-right"
                      priority
                    />
                 </div>
               </Reveal>
               
               {/* Floating precision elements */}
               <Reveal delay={600} className="absolute bottom-4 left-4 md:bottom-12 md:left-0 lg:bottom-20 lg:-left-10 glass-card px-5 py-3 md:px-6 md:py-4 border-l-[3px] !border-l-accent backdrop-blur-3xl bg-bg-elevated/40 z-20 shadow-xl">
                 <p className="text-[9px] md:text-[10px] font-bold tracking-[2px] text-fg-muted mb-1">AI ACCURACY</p>
                 <p className="text-[22px] md:text-[32px] font-body font-bold text-fg leading-none tracking-tight">99.6%</p>
               </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section className="border-y border-border bg-elevated/50">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-12 md:py-16">
          <Reveal>
            <div className="flex flex-row justify-center gap-16 md:gap-32">
              {[
                { value: "99.6%", label: "AI ACCURACY" },
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
              <span className="label">FEATURES</span>
              <h2 className="mt-6 text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-1px] text-fg font-body">
                Everything your health
                <br />
                <span className="font-display italic tracking-tight text-accent">
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

      {/* ═══════════ LIFESTYLE BANNER ═══════════ */}
      <section className="py-12 md:py-24">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Reveal>
            <div className="w-full h-[400px] md:h-[600px] rounded-[32px] overflow-hidden relative shadow-2xl border border-border-strong group">
              <Image 
                src="/images/feature_food.png" 
                alt="Healthy aesthetic food bowl" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 text-white max-w-[600px]">
                <h3 className="text-[clamp(28px,4vw,48px)] font-bold font-display leading-tight tracking-tight mb-4 drop-shadow-md">
                  Nutrition tracking that<br />doesn&apos;t feel like work.
                </h3>
                <p className="text-[16px] md:text-[18px] opacity-90 drop-shadow-md">
                  A premium experience blending AI precision with stunning aesthetics.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how-it-works" className="py-24 md:py-36 border-y border-border bg-elevated/30">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-24">
              <span className="label">HOW IT WORKS</span>
              <h2 className="mt-6 text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-1px] text-fg font-body">
                Three steps to
                <span className="font-display italic tracking-tight text-accent">
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
              <h2 className="mt-6 text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-1px] text-fg font-body">
                Designed for
                <span className="font-display italic tracking-tight text-accent">
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


      {/* ═══════════ AI HEALTH COACH ═══════════ */}
      <section id="ai-coach" className="py-24 md:py-36 border-t border-border bg-elevated/20">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              {/* Left — image */}
              <div className="relative order-2 md:order-1 h-[400px] md:h-[600px] w-full rounded-[32px] overflow-hidden border border-border-strong shadow-2xl group">
                <Image
                  src="/images/coach.png"
                  alt="AI Health Coach Chat"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
                <div className="absolute bottom-8 left-4 right-4 md:left-8 md:right-8">
                  <div className="glass-card p-5 border-l-[3px] !border-l-accent backdrop-blur-3xl bg-bg-elevated/60 shadow-xl">
                    <p className="text-[13px] md:text-[15px] font-medium text-fg leading-relaxed">
                      &quot;Based on your 45-min run and low protein intake today, I recommend adding 30g of protein to your dinner. How about grilled chicken?&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right — copy */}
              <div className="order-1 md:order-2">
                <span className="label">YOUR PERSONAL COACH</span>
                <h2 className="mt-6 text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-1px] text-fg font-body">
                  Personalized advice,
                  <br />
                  <span className="font-display italic tracking-tight text-accent">
                    24/7 in your language.
                  </span>
                </h2>
                <p className="mt-6 text-[15px] md:text-[16px] leading-relaxed text-muted max-w-[440px]">
                  Meet your new health coach. It has full context of your daily food logs, macros, and workouts, providing real-time, actionable advice that adapts to your lifestyle.
                </p>

                <div className="mt-10 space-y-5">
                  {[
                    {
                      icon: "🧠",
                      title: "Context-Aware Intelligence",
                      desc: "It knows what you ate, how you slept, and your workout intensity, giving advice that actually makes sense.",
                    },
                    {
                      icon: "🌍",
                      title: "Speaks Your Native Language",
                      desc: "Available around the clock and fully fluent in your native language, making health advice accessible anytime.",
                    },
                    {
                      icon: "⚡",
                      title: "Proactive Adjustments",
                      desc: "Automatically adjusts your macro targets and workout plans based on your progress and daily feedback.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <span className="text-[20px] shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-[14px] font-bold text-fg">{item.title}</p>
                        <p className="text-[13px] text-muted mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
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
                <h2 className="mt-6 text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-1px] text-fg font-body">
                  Earn by sharing
                  <br />
                  <span className="font-display italic tracking-tight text-accent">
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
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-ink text-[12px] font-bold tracking-[1.6px] rounded-full hover:shadow-[0_0_32px_rgba(15,118,110,0.3)] transition-all duration-300"
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
            <h2 className="mt-8 text-[clamp(36px,6vw,64px)] font-bold leading-[1.1] tracking-[-1.5px] text-fg font-body">
              Your health,
              <br />
              <span className="font-display italic tracking-[-1px] text-accent">
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
                href="https://apps.apple.com/us/app/dietly-ai-snap-calories/id6769698416"
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
                href="https://play.google.com/store/apps/details?id=com.dietlyai.app"
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
