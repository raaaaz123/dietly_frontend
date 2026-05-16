import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import MacroCalculator from "./MacroCalculator";

export const metadata: Metadata = {
  title: "Free AI Macro & TDEE Calculator | Dietly",
  description: "Calculate your daily calorie needs and optimal macronutrient split for weight loss, muscle gain, or maintenance. Fast, free, and highly accurate.",
  keywords: ["macro calculator", "tdee calculator", "calorie calculator", "ai macro planner", "diet tracker"],
  openGraph: {
    title: "Free AI Macro & TDEE Calculator | Dietly",
    description: "Calculate your daily calorie needs and optimal macronutrient split for weight loss, muscle gain, or maintenance.",
    type: "website",
  }
};

export default function MacroCalculatorPage() {
  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Dietly Macro Calculator",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free tool to calculate Total Daily Energy Expenditure (TDEE) and macronutrient ratios for fitness goals."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="pt-32 pb-24 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <span className="text-[11px] font-bold tracking-[3px] text-accent uppercase mb-6 block">Free SEO Tool</span>
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

              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">The easiest way to track your macros</h2>
                <p>
                  Knowing your macros is only half the battle. Actually tracking them every day is where 95% of people fail. Reading labels, weighing food, and searching databases is exhausting.
                </p>
                <p className="mt-4">
                  That&apos;s why we built <strong>Dietly</strong>. Instead of manual data entry, you just snap a photo of your meal. Our AI vision instantly recognizes the food, estimates the portion size, and logs the exact calories, protein, carbs, and fats directly to your daily target.
                </p>
              </div>
            </article>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
