import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import BodyFatCalculator from "./BodyFatCalculator";
import { JsonLdScript, ToolFaq, faqJsonLd } from "../components/tools/ToolPage";

/**
 * The five questions this page is actually opened with.
 *
 * Added for the same reason as the ones on /macro-calculator: these two pages
 * predate the tool registry, and the six calculators built after them all
 * shipped an FAQ plus `FAQPage` markup while these were missed. Rendered by
 * `ToolFaq` and emitted as schema from this same array \u2014 markup whose answers
 * are not visible on the page is how sites earn a structured-data penalty.
 */
const FAQS = [
  {
    q: "How accurate is the US Navy method?",
    a: "For most people it lands within a few percentage points of a DEXA scan, which is good enough to track a direction. It is an estimate from circumferences, not a measurement of fat, so treat the trend across several readings as the real output and the single number as approximate.",
  },
  {
    q: "Why is this different from my smart scale?",
    a: "A scale uses bioimpedance \u2014 it sends a small current through you and infers composition from resistance, which moves with how hydrated you are. This uses tape measurements, which do not. Neither is ground truth; pick one and stay with it, because comparing across methods tells you nothing.",
  },
  {
    q: "What is a healthy body fat percentage?",
    a: "Commonly cited ranges put fitness-level men around 14\u201317% and women around 21\u201324%, with essential fat far lower and athletes lower still. The ranges are wide and vary by age and source, so treat them as orientation rather than a target handed to you.",
  },
  {
    q: "How often should I measure?",
    a: "Every two to four weeks, same time of day, same conditions \u2014 first thing in the morning before eating or drinking is easiest to repeat. Measuring more often mostly records tape pressure and hydration, not change.",
  },
  {
    q: "Can I lower body fat without losing weight?",
    a: "Yes \u2014 that is body recomposition, and it is why the scale stops being useful. Losing fat and adding muscle at the same rate holds bodyweight flat while this number falls. It is most achievable if you are new to training, returning after a break, or carrying more fat to start with.",
  },
];
import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  // No "| Dietly Fit" suffix: the root layout's title template appends it already.
  title: "Body Fat Calculator — US Navy Method",
  description: "Estimate your body fat percentage from three tape measurements using the US Navy method. Free, no signup, and honest about its margin of error.",
  keywords: ["body fat calculator", "us navy body fat method", "fat percentage calculator", "fitness tools", "fat loss tracker"],
  alternates: { canonical: "/body-fat-calculator" },
  openGraph: {
    title: "Body Fat Calculator — US Navy Method",
    description: "Estimate your body fat percentage from three tape measurements using the US Navy method.",
    url: "/body-fat-calculator",
    type: "website",
  }
};

export default function BodyFatCalculatorPage() {
  // Structured Data for SEO
  // `WebApplication`, not `SoftwareApplication` — see the note on the macro
  // calculator. This page is a tool you use in a browser, not an install.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Dietly Fit Body Fat Calculator",
    "url": `${SITE_URL}/body-fat-calculator`,
    "applicationCategory": "HealthApplication",
    "browserRequirements": "Requires JavaScript",
    "operatingSystem": "Any",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free tool to estimate Body Fat Percentage using the US Navy tape measure method."
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
              Body Fat <span className="font-display italic text-accent font-light">Percentage</span> Calculator
            </h1>
            <p className="text-[16px] md:text-[20px] text-fg-muted max-w-[600px] mx-auto leading-relaxed">
              Determine your true body composition using the widely trusted US Navy tape measure method. No calipers required.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <BodyFatCalculator />
        </Reveal>

        {/* SEO Content Section */}
        <section className="max-w-[800px] mx-auto px-6 md:px-12 mt-12 prose prose-invert prose-green">
          <Reveal>
            <article className="text-fg-muted leading-relaxed space-y-8">
              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">Why Body Fat Percentage Matters</h2>
                <p>
                  Most people rely on the scale or BMI (Body Mass Index) to track their health, but these metrics are flawed. They don&apos;t distinguish between fat mass and muscle mass. You could be technically &quot;overweight&quot; on a BMI scale but possess an elite, athletic body fat percentage due to high muscle mass.
                </p>
                <p className="mt-4">
                  Tracking your body fat percentage tells you exactly what your body is made of, making it the most reliable metric for true health and fitness progress.
                </p>
              </div>

              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">How does the US Navy Method work?</h2>
                <p>
                  The United States Navy developed a mathematical formula to estimate body fat percentage using simple circumference measurements. It requires only a soft measuring tape and is considered one of the most accurate accessible methods outside of expensive DEXA scans.
                </p>
                <p className="mt-4">
                  <strong>For Men:</strong> It compares the circumference of your waist to your neck, relative to your height.
                  <br />
                  <strong>For Women:</strong> It accounts for the hips as well, as women naturally carry essential fat in different distribution patterns.
                </p>
              </div>

              <div className="glass-card p-8 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 my-10">
                <h3 className="text-[20px] font-bold text-fg mb-4">How to Measure Accurately</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-accent">✓</span>
                    <span><strong>Neck:</strong> Measure just below the larynx (Adam&apos;s apple). Keep the tape flat but not uncomfortably tight.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">✓</span>
                    <span><strong>Waist:</strong> Measure at the navel (belly button) for men, and at the narrowest point of the abdomen for women. Exhale naturally before reading the tape.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent">✓</span>
                    <span><strong>Hips (Women only):</strong> Measure at the widest point of the hips/glutes.</span>
                  </li>
                </ul>
              </div>

              {/* Was a pitch for the calorie app Dietly Fit sold before the pivot \u2014 "our
                  AI agent recognizes your meals from a photo". The product is a training
                  app now, and this page's visitor is measuring a physique, not a plate. */}
              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">Lowering your body fat</h2>
                <p>
                  Fat loss needs a consistent calorie deficit and enough protein to hold on to muscle while you are in it. That part is arithmetic, and the calculators here will get you the numbers.
                </p>
                <p className="mt-4">
                  The harder question is what to train while the weight comes off, because a deficit is exactly when muscle is easiest to lose. <strong>Dietly Fit</strong> scores one photo a week out of 100, names the area holding the score back, and builds that week around it \u2014 so the tape measure has something to show in a month.
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
