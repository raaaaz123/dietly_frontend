import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import BodyFatCalculator from "./BodyFatCalculator";

export const metadata: Metadata = {
  title: "Free Body Fat Calculator (US Navy Method) | Dietly",
  description: "Calculate your body fat percentage easily using the highly accurate US Navy Method. Free tool to track your fitness and fat loss progress.",
  keywords: ["body fat calculator", "us navy body fat method", "fat percentage calculator", "fitness tools", "fat loss tracker"],
  openGraph: {
    title: "Free Body Fat Calculator | Dietly",
    description: "Calculate your body fat percentage easily using the highly accurate US Navy Method.",
    type: "website",
  }
};

export default function BodyFatCalculatorPage() {
  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Dietly Body Fat Calculator",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free tool to calculate Body Fat Percentage using the US Navy tape measure method."
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

              <div>
                <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mb-4">Lowering Your Body Fat</h2>
                <p>
                  To decrease body fat, you must be in a consistent caloric deficit while consuming enough protein to preserve muscle mass. This is often tedious to track manually.
                </p>
                <p className="mt-4">
                  <strong>Dietly</strong> automates this entire process. Instead of manually weighing food and scanning barcodes, our AI agent recognizes your meals from a photo and logs your macros instantly, ensuring you stay in the perfect fat-loss zone effortlessly.
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
