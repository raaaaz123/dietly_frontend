import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import MacroCalculator from "./MacroCalculator";
import { JsonLdScript, ToolFaq, faqJsonLd } from "../components/tools/ToolPage";
import { SITE_URL } from "../lib/site";

/**
 * The five questions this page is actually opened with.
 *
 * It had none — it and /body-fat-calculator were the two pages that predate the
 * tool registry, and the six calculators added after them all shipped an FAQ and
 * the matching `FAQPage` markup while these two were missed. The answers below
 * are rendered by `ToolFaq` and emitted as schema from the same array, which is
 * the only version of this worth having: a `FAQPage` whose answers are not
 * visible on the page is the most common route to a structured-data penalty.
 */
const FAQS = [
  {
    q: "What are macros?",
    a: "Protein, carbohydrate and fat \u2014 the three nutrients that carry calories. Your calorie target decides how much you lose or gain; the split between those three decides how much of the change is muscle rather than fat, and how full you feel getting there.",
  },
  {
    q: "Do I have to hit my macros exactly?",
    a: "No. Protein is the one worth hitting closely, because it is what protects muscle in a deficit. Carbs and fat can move around each other freely as long as the calorie total holds \u2014 within about 5 grams of protein and 100 calories on the day is close enough for the result to be the same.",
  },
  {
    q: "Why did my numbers change when I picked a different activity level?",
    a: "The activity multiplier is applied to your BMR, so one step up adds roughly 150\u2013250 calories a day. Most people pick a level too high: the multipliers describe your whole week including rest days, so three or four gym sessions on top of a desk job is 'moderately active', not 'very active'.",
  },
  {
    q: "Should my macros be different on rest days?",
    a: "They can be, but they do not need to be. Calorie cycling \u2014 more carbs on training days, fewer on rest days \u2014 works if the weekly total is unchanged, and it is one more thing to get wrong. Hold one set of numbers every day until the weekly trend tells you to change them.",
  },
  {
    q: "How long before I change these numbers?",
    a: "Two weeks. Bodyweight swings with water, salt and glycogen by a kilo or more day to day, so a single weigh-in tells you nothing. Take the two-week average against the previous two-week average, and only adjust if the trend disagrees with the goal.",
  },
];

export const metadata: Metadata = {
  // No "| Dietly Fit" suffix here: the root layout's title template already appends
  // it, so writing it again rendered "... | Dietly Fit | Dietly Fit" and spent the
  // characters that get truncated in a result page on the brand twice.
  title: "Macro Calculator — TDEE & Macros for Your Goal",
  description: "Work out your daily calories and your protein, carb and fat split for fat loss, muscle gain or maintenance. Free, no signup, Mifflin-St Jeor.",
  keywords: ["macro calculator", "tdee calculator", "calorie calculator", "ai macro planner", "diet tracker"],
  alternates: { canonical: "/macro-calculator" },
  openGraph: {
    title: "Macro Calculator — TDEE & Macros for Your Goal",
    description: "Work out your daily calories and your protein, carb and fat split for fat loss, muscle gain or maintenance.",
    url: "/macro-calculator",
    type: "website",
  }
};

export default function MacroCalculatorPage() {
  // Structured Data for SEO
  // `WebApplication`, not `SoftwareApplication`. This markup describes the
  // calculator on this page — a thing you use in a browser — and the type it
  // used to claim is the one that describes an installable app, complete with an
  // install-shaped Offer. The app-level SoftwareApplication still lives on the
  // homepage, where it is true.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Dietly Fit Macro & TDEE Calculator",
    "url": `${SITE_URL}/macro-calculator`,
    "applicationCategory": "HealthApplication",
    "browserRequirements": "Requires JavaScript",
    "operatingSystem": "Any",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free tool to calculate Total Daily Energy Expenditure (TDEE) and macronutrient ratios for fitness goals, using the Mifflin-St Jeor equation."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <Navbar />

      <main className="pt-32 pb-24 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <span className="text-[11px] font-bold tracking-[3px] text-accent uppercase mb-6 block">Free Tool — No Signup</span>
            <h1 className="text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-[-2px] text-fg font-body mb-6">
              AI Macro <span className="font-display italic text-accent font-light">&</span> TDEE Calculator
            </h1>
            <p className="text-[16px] md:text-[20px] text-fg-muted max-w-[600px] mx-auto leading-relaxed">
              Discover exactly how many calories and macros you need to reach your goals. Powered by the Mifflin-St Jeor equation.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <MacroCalculator />
        </Reveal>

        {/* SEO Content Section */}
        <section className="max-w-[800px] mx-auto px-6 md:px-12 mt-12 prose prose-invert prose-green">
          <Reveal>
            <article className="text-fg-muted leading-relaxed space-y-8">
              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">What is a Macro Calculator?</h2>
                <p>
                  A macronutrient (macro) calculator determines the optimal ratio of proteins, carbohydrates, and fats you should consume daily to reach a specific health or physique goal. Unlike simple calorie counting, tracking macros ensures that the weight you lose is fat (not muscle) and the weight you gain is muscle (not fat).
                </p>
              </div>

              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">How does the TDEE Calculator work?</h2>
                <p>
                  Total Daily Energy Expenditure (TDEE) represents the total number of calories your body burns in a 24-hour period. Our calculator uses the highly regarded <strong>Mifflin-St Jeor equation</strong> to first calculate your Basal Metabolic Rate (BMR) — the calories you burn simply by existing.
                </p>
                <p className="mt-4">
                  We then multiply your BMR by an activity multiplier to account for your lifestyle and exercise habits. Finally, we adjust the total based on whether you want to lose fat (-500 calories) or build muscle (+500 calories).
                </p>
              </div>

              <div className="glass-card p-8 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 my-10">
                <h3 className="text-[20px] font-bold text-fg mb-4">Why track macros instead of just calories?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-accent">✓</span>
                    <span><strong>Protein</strong> builds and preserves muscle mass, keeping you full and boosting metabolism.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">✓</span>
                    <span><strong>Carbohydrates</strong> provide the primary energy source for high-intensity workouts and brain function.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">✓</span>
                    <span><strong>Fats</strong> are essential for hormone regulation, nutrient absorption, and joint health.</span>
                  </li>
                </ul>
              </div>

              {/* This section used to pitch the calorie-counting app Dietly Fit was before
                  the pivot \u2014 "snap a photo of your meal, our AI vision recognises the
                  food" \u2014 on the site's highest-traffic page. The product is a training
                  app now, and food logging exists to support the plan. */}
              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">Numbers are the easy part</h2>
                <p>
                  A macro target tells you what to eat. It does not tell you what to train, and for most people that is the half that decides whether the physique actually changes.
                </p>
                <p className="mt-4">
                  <strong>Dietly Fit</strong> starts at the other end: one photo a week is scored out of 100, the scan names the weak point holding the number down, and the week of training is built around fixing it. Food logging is in the same app, with targets set from your goal rather than a generic number \u2014 so these macros have somewhere to go.
                </p>
              </div>
              <ToolFaq faqs={FAQS} />
            </article>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
