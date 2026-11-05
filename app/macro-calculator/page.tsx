import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InstallCard from "../components/InstallCard";
import MobileCTA from "../components/MobileCTA";
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
    q: "Is a macro calculator different for women?",
    a: "The maths is the same, but the inputs are not. Mifflin-St Jeor subtracts 161 calories for women instead of adding 5, so the same height, weight and age gives a lower maintenance figure, and the safety floor is 1,200 calories rather than 1,500. Protein is set per kilo of bodyweight for everyone, so a 60 kg woman cutting gets about 130 g a day.",
  },
  {
    q: "How do I split my macros per meal?",
    a: "Divide the daily total by the number of meals you actually eat. Protein is the one worth spreading evenly, at roughly 25 to 40 g a sitting, because muscle protein synthesis responds per meal. Carbs and fat can be lopsided, for example more carbs around training, as long as the day adds up.",
  },
  {
    q: "What is the best macro split for fat loss?",
    a: "There is no single ratio. For fat loss the evidence supports high protein (about 2 g per kg of bodyweight), at least 20 to 25% of calories from fat for hormones, and carbs filling the rest. Low carb and keto lose fat at the same rate when calories and protein are matched; pick the style you can keep up.",
  },
  {
    q: "Is this an AI macro calculator?",
    a: "The calculator on this page uses a published equation, not a model, so the same inputs always give the same answer. The Dietly Fit app is where the AI comes in: it logs a meal from a photo, a sentence or your voice, and adjusts your targets as your weekly weight trend comes in.",
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
  title: { absolute: "Macro Calculator: Daily & Per-Meal Macros for Women and Men" },
  description: "Free macro calculator in lb or kg: calories plus protein, carbs and fat for fat loss, maintenance or muscle gain, per day and per meal. Keto and low carb too.",
  keywords: ["macro calculator", "macro calculator for women", "macros per meal", "macro split calculator", "keto macro calculator", "ai macro calculator"],
  alternates: { canonical: "/macro-calculator" },
  openGraph: {
    title: "Macro Calculator: Daily & Per-Meal Macros for Women and Men",
    description: "Calories plus protein, carbs and fat for your goal, per day and per meal. Free, lb or kg.",
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
            <span className="text-[11px] font-bold tracking-[3px] text-accent uppercase mb-6 block">Free tool · No signup</span>
            <h1 className="text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-[-2px] text-fg font-body mb-6">
              Macro Calculator
            </h1>
            <p className="text-[16px] md:text-[20px] text-fg-muted max-w-[620px] mx-auto leading-relaxed">
              Your daily calories, then protein, carbs and fat for fat loss, maintenance or muscle gain, split into meals. Pounds or kilos, for women and men.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <MacroCalculator />
        </Reveal>

        <div className="max-w-[800px] mx-auto px-6 md:px-12 mt-10">
          <InstallCard
            placement="tool_result"
            title="Turn this number into a plan"
            body="Dietly Fit logs every set, scores one photo a week out of 100, and builds the training week around the area holding you back."
          />
        </div>


        {/* SEO Content Section */}
        <section className="max-w-[800px] mx-auto px-6 md:px-12 mt-12 prose prose-invert prose-green">
          <Reveal>
            <article className="text-fg-muted leading-relaxed space-y-8">
              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">How this macro calculator works</h2>
                <p>
                  A macro calculator turns your body and your goal into a daily calorie target, then splits it into protein, carbohydrate and fat. This one works in three steps.
                </p>
                <ol className="mt-4 list-decimal pl-6 space-y-2">
                  <li><strong>Maintenance calories.</strong> Your basal metabolic rate from the Mifflin-St Jeor equation, multiplied by your activity level. That is your TDEE, the calories that hold your weight steady.</li>
                  <li><strong>Goal adjustment.</strong> 20% below maintenance to lose fat (about 0.5 to 1% of bodyweight a week), 10% above it to build muscle with little fat gain, or none to maintain.</li>
                  <li><strong>The split.</strong> Protein is set from bodyweight: 2.2 g per kg (1 g per lb) on a cut, 1.8 g per kg otherwise. Fat takes its share of calories for the diet style you pick, and carbohydrate fills what is left.</li>
                </ol>
              </div>

              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">Macro splits by goal</h2>
                <p>Typical results for a 75 kg (165 lb) lifter training four times a week, on the balanced setting:</p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-[15px]">
                    <thead className="text-fg">
                      <tr className="border-b border-border"><th className="py-2 pr-4">Goal</th><th className="py-2 pr-4">Protein</th><th className="py-2 pr-4">Fat</th><th className="py-2">Carbs</th></tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border"><td className="py-2 pr-4">Lose fat</td><td className="py-2 pr-4">~30%</td><td className="py-2 pr-4">30%</td><td className="py-2">~40%</td></tr>
                      <tr className="border-b border-border"><td className="py-2 pr-4">Maintain</td><td className="py-2 pr-4">~20%</td><td className="py-2 pr-4">30%</td><td className="py-2">~50%</td></tr>
                      <tr><td className="py-2 pr-4">Build muscle</td><td className="py-2 pr-4">~20%</td><td className="py-2 pr-4">30%</td><td className="py-2">~50%</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  Percentages move with bodyweight because protein is fixed in grams, not as a share. That is deliberate: a fixed 40/30/30 split gives a 55 kg woman and a 100 kg man the same proportions, which under-feeds protein for one and over-feeds it for the other.
                </p>
              </div>

              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">Macro calculator for women</h2>
                <p>
                  Women get a lower maintenance figure at the same size, because the equation subtracts 161 calories instead of adding 5, and the calculator never sets a target under 1,200 calories. Protein needs are the same per kilo, which surprises most people: a 60 kg woman cutting should aim for around 130 g a day. If your cycle moves your scale weight, compare the same week of each month rather than week to week.
                </p>
              </div>

              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">Macros per meal</h2>
                <p>
                  Pick 3, 4 or 5 meals and the result divides your day evenly. Even protein matters most: about 0.4 g per kg per meal (25 to 40 g for most adults) gives the best muscle-building response each time you eat. Carbs are worth moving towards the meal before and after training. Fat can sit wherever it is easiest.
                </p>
              </div>

              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">Keto and low-carb macros</h2>
                <p>
                  The <strong>keto</strong> setting caps carbs at 30 g a day and moves the rest of the calories to fat. That stays under the 50 g most people need to stay in ketosis. <strong>Low carb</strong> caps carbs at 100 g. <strong>High protein</strong> adds 20% more protein, for anyone who finds a cut easier when they are fuller. Matched for calories and protein, all four styles lose fat at the same rate.
                </p>
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
      <MobileCTA />
    </>
  );
}
