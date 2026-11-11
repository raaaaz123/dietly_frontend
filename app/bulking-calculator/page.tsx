import { Metadata } from "next";
import Link from "next/link";
import ToolPage, { H2, JsonLdScript, ToolFaq, faqJsonLd, toolJsonLd } from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import MacroCalculator from "../macro-calculator/MacroCalculator";

export const metadata: Metadata = toolMetadata("bulking-calculator");

const FAQS = [
  {
    q: "How many calories should I eat to bulk?",
    a: "About 10% above your maintenance calories, which is 200 to 300 extra calories a day for most people. Use the calculator for your own number.",
  },
  {
    q: "How much protein do I need to build muscle?",
    a: "About 1.6 to 2.2 g per kg of bodyweight a day. The calculator uses 1.8 g per kg in a surplus, where extra protein adds little.",
  },
  {
    q: "How much weight should I gain per month?",
    a: "Roughly 1 to 2% of bodyweight a month as a beginner and under 1% for experienced lifters. Faster than that is mostly fat.",
  },
  {
    q: "What is the difference between a lean bulk and a dirty bulk?",
    a: "A lean bulk uses a small surplus so most of the gain is muscle. A dirty bulk eats far above maintenance and gains faster, but much of it is fat you later have to cut.",
  },
  {
    q: "Should I bulk or cut first?",
    a: "If you are lean enough to see some ab outline, bulk. If not, cut or recomp first. Muscle shows best, and a bulk feels best, from a lean starting point.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("bulking-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="bulking-calculator"
        h1={
          <>
            Lean Bulk{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="Calories and macros to build muscle without much fat: a 10% surplus, protein from your bodyweight and a rate of gain that stays lean. Pounds or kilos."
        widget={<MacroCalculator initialGoal="bulk" initialDiet="balanced" cta="Dietly Fit sets your bulking targets, logs every set, and scans one photo a week so you can see muscle, not just weight." />}
      >
        <div>
          <H2>How the bulking numbers are set</H2>
          <p>
            The calculator finds your maintenance calories with the Mifflin-St Jeor equation and your activity level, then adds a <strong>10% surplus</strong>. For most people that is 200 to 300 calories a day, which is enough to build muscle without the fat gain that comes with a dirty bulk.
          </p>
          <p>
            Protein is set at about 1.8 g per kg of bodyweight. Above that, more protein does not build more muscle in a surplus, so the extra calories go to carbs, which fuel training, and fat.
          </p>
        </div>

        <div>
          <H2>How fast should you gain?</H2>
          <p>
            Aim for about <strong>0.25 to 0.5% of bodyweight a week</strong> if you are new to lifting, and the lower end once you have trained for a few years. Faster gain is mostly fat. Weigh yourself most mornings and watch the weekly average, not single days.
          </p>
        </div>

        <div>
          <H2>When a bulk is not the right call</H2>
          <p>
            If you are carrying a fair amount of fat, building muscle at maintenance or in a small deficit (a recomp) often looks better sooner than a bulk. A physique scan is a quick way to tell: if leanness is the score holding you back, cut first.
          </p>
        </div>

        <p>
          Want to see what your current physique looks like as a number? Try the free 
          <Link href="/physique-analyzer" className="underline hover:text-fg">AI physique analyzer</Link>, or use the full 
          <Link href="/macro-calculator" className="underline hover:text-fg">macro calculator</Link> to compare diet styles.
        </p>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
