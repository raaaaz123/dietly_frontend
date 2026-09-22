import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import BmrCalculator from "./BmrCalculator";

export const metadata: Metadata = toolMetadata("bmr-calculator");

const FAQS = [
  {
    q: "What is BMR?",
    a: "Basal Metabolic Rate is the energy your body spends keeping you alive at complete rest — running your brain, heart, liver, kidneys and the constant turnover of tissue. It is measured after an overnight fast, lying still in a temperature-controlled room, and for most people it accounts for 60 to 75% of everything they burn in a day.",
  },
  {
    q: "What is the difference between BMR and TDEE?",
    a: "BMR is the floor; TDEE is the total. Total Daily Energy Expenditure is your BMR multiplied by an activity factor, and it adds the calories you spend digesting food, moving around without exercising, and training. If BMR is what you burn asleep, TDEE is what you burn living your life — and it is TDEE, not BMR, that you compare your food intake against.",
  },
  {
    q: "Which BMR formula is most accurate?",
    a: "Mifflin-St Jeor, which is what this calculator uses. It was published in 1990 and validated against indirect calorimetry, and it predicts resting energy expenditure within about 10% for most people — better than the older Harris-Benedict equation, which was derived in 1919 from a small, mostly lean sample and tends to overestimate. Katch-McArdle can beat both, but only if you have an accurate body fat percentage, because it works from lean mass instead of total weight.",
  },
  {
    q: "Should I eat my BMR?",
    a: "No. Eating at your BMR means eating as though you will spend the entire day unconscious and motionless, and for most people it lands well below any sensible target. Aggressive under-eating also costs you lean mass, which lowers the very number you are trying to work from. Set intake against maintenance — your TDEE — and take a moderate deficit from there.",
  },
  {
    q: "Can I increase my BMR?",
    a: "Somewhat, and slowly. Lean mass is metabolically active, so adding muscle raises your BMR — though the effect is modest, in the region of 10 to 15 kcal per day per kilogram of muscle, far less than the figures often quoted. The larger and more reliable lever is the other direction: prolonged aggressive dieting reduces BMR, partly through lost tissue and partly through adaptation. Protecting muscle while losing fat is what keeps the floor from dropping.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("bmr-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="bmr-calculator"
        h1={
          <>
            BMR{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="The calories your body spends doing nothing at all — calculated with Mifflin-St Jeor, and put in context against what you actually burn."
        widget={<BmrCalculator />}
      >
        <div>
          <H2>What your BMR is</H2>
          <p>
            Your <strong>Basal Metabolic Rate</strong> is the energy your body
            uses at complete rest to stay alive: pumping blood, breathing,
            maintaining body temperature, replacing cells, and running a brain
            that is expensive to operate even when you are doing nothing with
            it. It is measured in the morning, fasted, lying still — and for
            most people it is between 60 and 75% of their entire daily energy
            expenditure.
          </p>
          <p>
            That proportion is the most useful thing on this page. The great
            majority of what you burn is not exercise, and never will be. An
            hour in the gym might account for 300 to 500 kcal; your basal
            metabolism spends three to five times that while you are not
            thinking about it.
          </p>
        </div>

        <div>
          <H2>The Mifflin-St Jeor equation</H2>
          <p>
            This calculator uses <strong>Mifflin-St Jeor</strong>, published in
            1990 and still the equation most clinical guidance points to:
          </p>
          <ul>
            <li>
              <strong>Men:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) −
              5 × age + 5
            </li>
            <li>
              <strong>Women:</strong> BMR = 10 × weight(kg) + 6.25 ×
              height(cm) − 5 × age − 161
            </li>
          </ul>
          <p>
            It predicts measured resting energy expenditure within roughly 10%
            for most people, which is about as well as any equation working from
            height, weight, age and sex can do. The older{" "}
            <strong>Harris-Benedict</strong> equation, still widely quoted, was
            derived in 1919 from a small and unusually lean sample and reliably
            reads high by 5% or more. <strong>Katch-McArdle</strong> can be more
            accurate still, but only because it works from lean body mass — and
            that means its accuracy is capped by the accuracy of your body fat
            estimate.
          </p>
        </div>

        <div>
          <H2>Why your number is an estimate, and by how much</H2>
          <p>
            Two people matching on height, weight, age and sex can differ in
            true BMR by several hundred calories a day. The equation cannot see
            your body composition, your thyroid function, your genetics, or how
            long you have been dieting. A 10% error band on a 1,700 kcal BMR is
            about 170 kcal in either direction — enough to matter over months.
          </p>
          <p>
            Treat the output as a starting point that reality will correct. Set
            your intake from it, hold that intake steady for two to three weeks,
            and watch what your weight actually does. The trend on the scale is
            measuring your real metabolic rate; the equation was only ever
            guessing at it.
          </p>
        </div>

        <div>
          <H2>BMR, TDEE and maintenance</H2>
          <p>
            Your BMR is not the number to eat at. To get{" "}
            <strong>maintenance calories</strong>, multiply BMR by an activity
            factor — roughly 1.2 if you are sedentary, up to about 1.9 for
            physically demanding work plus hard daily training. That product is
            your <strong>TDEE</strong>, and it is what you compare food against.
          </p>
          <p>
            One component of the gap is worth knowing by name:{" "}
            <strong>NEAT</strong>, or non-exercise activity thermogenesis — the
            fidgeting, walking, standing and general restlessness that happens
            outside of training. It varies between individuals by up to 2,000
            kcal per day, it drops quietly when you diet, and no activity
            multiplier captures that.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
