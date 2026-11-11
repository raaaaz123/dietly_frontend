import { Metadata } from "next";
import Link from "next/link";
import ToolPage, { H2, JsonLdScript, ToolFaq, faqJsonLd, toolJsonLd } from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import MacroCalculator from "../macro-calculator/MacroCalculator";

export const metadata: Metadata = toolMetadata("cutting-calculator");

const FAQS = [
  {
    q: "How many calories should I eat to cut?",
    a: "About 20% below your maintenance calories. For a moderately active 80 kg man that is often around 2,200 to 2,400 calories a day. Use the calculator for your own number.",
  },
  {
    q: "How much protein do I need when cutting?",
    a: "About 1.8 to 2.7 g per kg of bodyweight. The calculator uses 2.2 g per kg, and more with the high-protein setting, because protein is what protects muscle in a deficit.",
  },
  {
    q: "How long should a cut last?",
    a: "Usually 8 to 16 weeks. After that, a few weeks at maintenance helps hunger, training and mood before you cut again.",
  },
  {
    q: "Should I do cardio on a cut?",
    a: "It helps, but it is optional. Daily steps are the easiest extra burn. Lifting is not optional: it is what tells your body to keep the muscle.",
  },
  {
    q: "Why has my weight stopped dropping?",
    a: "Water and food volume can hide fat loss for one to two weeks. If the weekly average has not moved for three weeks, lower calories by about 100 to 150 or add steps.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("cutting-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="cutting-calculator"
        h1={
          <>
            Cutting{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="Calories and macros for a cut: a 20% deficit, high protein to keep your muscle, and targets for every meal. Pounds or kilos, for women and men."
        widget={<MacroCalculator initialGoal="cut" initialDiet="high-protein" cta="Dietly Fit sets your cutting targets, logs meals from a photo, and scans one photo a week so you can see the cut working." />}
      >
        <div>
          <H2>How the cutting numbers are set</H2>
          <p>
            Maintenance calories come from the Mifflin-St Jeor equation times your activity level. The cut is <strong>20% below</strong> that, which works out to roughly 0.5 to 1% of bodyweight a week for most people. The calculator never goes below 1,500 calories for men or 1,200 for women.
          </p>
          <p>
            Protein is set at about 2.2 g per kg of bodyweight, the top of the range research supports, because a deficit is when muscle is most at risk. The high-protein setting adds another 20%, which many people find makes a cut less hungry. Fat and carbs share what is left.
          </p>
        </div>

        <div>
          <H2>How fast should you cut?</H2>
          <p>
            Faster is not better past a point. Losing more than about 1% of bodyweight a week makes it harder to keep strength and muscle, and harder to stick to. If you are already lean, aim for the slower end. If you have more to lose, the faster end is fine at the start.
          </p>
        </div>

        <div>
          <H2>Keep training heavy</H2>
          <p>
            The signal that keeps muscle on a cut is heavy training, not light, high-rep work. Keep the main lifts in your program, keep the weight on the bar as high as you can, and accept that volume may need to drop a little late in the cut.
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
