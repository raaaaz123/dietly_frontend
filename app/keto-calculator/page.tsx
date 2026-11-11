import { Metadata } from "next";
import Link from "next/link";
import ToolPage, { H2, JsonLdScript, ToolFaq, faqJsonLd, toolJsonLd } from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import MacroCalculator from "../macro-calculator/MacroCalculator";

export const metadata: Metadata = toolMetadata("keto-calculator");

const FAQS = [
  {
    q: "How many carbs can I eat on keto?",
    a: "This calculator caps carbs at 30 g a day. Most people stay in ketosis under about 50 g of net carbs, and 20 to 30 g gives a margin for error.",
  },
  {
    q: "How much protein should I eat on keto?",
    a: "About 1.6 to 2.2 g per kg of bodyweight, the same as on any diet that aims to keep muscle. The calculator uses 2.2 g per kg when you are losing fat and 1.8 g per kg otherwise.",
  },
  {
    q: "Do I have to eat all the fat?",
    a: "No. Fat is the lever. If you eat less fat than the target you will simply lose fat a little faster. Protein and the carb cap are the two numbers to hit.",
  },
  {
    q: "Is keto better for fat loss than other diets?",
    a: "When calories and protein are matched, keto and higher-carb diets lose fat at about the same rate. Keto suits people who find it easier to eat less without carbs. The best diet is the one you can keep.",
  },
  {
    q: "Why did I lose so much weight in the first week?",
    a: "Cutting carbs empties glycogen stores, and each gram of glycogen holds about three grams of water. A drop of 1 to 2 kg in the first week is mostly water.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("keto-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="keto-calculator"
        h1={
          <>
            Keto Macro{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="Your daily calories on keto, with carbs capped at 30 g, protein set from your bodyweight and fat filling the rest. Pounds or kilos, per day and per meal."
        widget={<MacroCalculator initialGoal="cut" initialDiet="keto" cta="Dietly Fit sets your keto targets, logs a meal from a photo, and builds the training week around them." />}
      >
        <div>
          <H2>How keto macros are worked out</H2>
          <p>
            The calculator starts with your maintenance calories from the Mifflin-St Jeor equation and your activity level, then adjusts for your goal: 20% below maintenance to lose fat, none to maintain, 10% above to gain.
          </p>
          <p>
            Protein comes next and is set from your bodyweight, not as a percentage: about 2.2 g per kg on a cut and 1.8 g per kg otherwise. Carbs are capped at <strong>30 g a day</strong>, which keeps most people under the roughly 50 g that ketosis needs. Every remaining calorie goes to fat.
          </p>
        </div>

        <div>
          <H2>Why protein is not kept low</H2>
          <p>
            Older keto advice kept protein low for fear it would knock you out of ketosis. In practice the body makes only small amounts of glucose from protein, and the bigger risk on a keto cut is losing muscle. Hitting the protein number matters more than squeezing fat higher.
          </p>
        </div>

        <div>
          <H2>Net carbs, fibre and the first week</H2>
          <p>
            Most people count <strong>net carbs</strong>: total carbs minus fibre. Leafy vegetables, avocado and nuts carry a lot of fibre, so they fit easily. Expect the scale to drop quickly in the first week as stored glycogen and the water bound to it go. That is real weight but not fat, so judge progress from week two.
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
