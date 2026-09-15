import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import TdeeCalculator from "./TdeeCalculator";

export const metadata: Metadata = toolMetadata("tdee-calculator");

/**
 * TDEE has its own URL rather than staying a section of the macro calculator.
 *
 * It is the larger head term of the two, and someone searching "tdee
 * calculator" wants one number and an explanation of it — not a macro split
 * they did not ask for. Splitting them gives each query the page it deserves
 * and gives us two entry points instead of one.
 */

const FAQS = [
  {
    q: "What is TDEE?",
    a: "Total Daily Energy Expenditure is every calorie you burn in 24 hours: the energy keeping you alive at rest, the cost of digesting food, deliberate exercise, and everything else you do. Eat that number and your weight holds steady. Eat consistently under it and you lose; over it and you gain.",
  },
  {
    q: "How accurate is a TDEE calculator?",
    a: "For most people it lands within about 10% of the truth, which on a 2,500 kcal maintenance is a 250 kcal margin — enough to matter. The equation cannot see your body composition, your NEAT, or how much you actually move on a rest day. Treat the number as a hypothesis, hold it for two weeks, and adjust based on what the scale trend does.",
  },
  {
    q: "What is the difference between BMR and TDEE?",
    a: "BMR is what you would burn lying in bed all day — typically 60–70% of the total. TDEE is BMR multiplied by an activity factor to account for everything you do on top. You never eat at BMR; it is an input, not a target.",
  },
  {
    q: "Which activity level should I pick?",
    a: "Most people pick one level too high. The multipliers describe your whole week, including rest days and time spent sitting. Three or four gym sessions a week on top of a desk job is 'moderately active' (1.55), not 'very active'. If your weight is not moving the way the number predicts, the activity level is the first thing to lower.",
  },
  {
    q: "Should I eat back the calories I burn exercising?",
    a: "No, not if you used an activity multiplier here — exercise is already counted in your TDEE, so eating back what a watch or a machine reports counts it twice. Fitness trackers also tend to overstate calorie burn substantially.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("tdee-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="tdee-calculator"
        h1={
          <>
            TDEE <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="How many calories you actually burn in a day — at rest and on top of it — and what that means for losing or gaining."
        widget={<TdeeCalculator />}
      >
        <div>
          <H2>What TDEE actually measures</H2>
          <p>
            Total Daily Energy Expenditure is the sum of four things: your basal
            metabolic rate, the energy spent digesting food, deliberate exercise,
            and non-exercise activity — fidgeting, walking to the shop, standing
            up. BMR is the biggest share at roughly 60–70% of the total, which is
            why two people of the same weight can have maintenance calories
            hundreds apart without either of them training differently.
          </p>
          <p className="mt-4">
            This calculator finds BMR with the <strong>Mifflin-St Jeor</strong>{" "}
            equation and multiplies it by an activity factor between 1.2 and 1.9.
            Mifflin-St Jeor is used rather than the older Harris-Benedict because
            it validated better against indirect calorimetry in modern
            populations — typically within about 10% for people who are not
            severely under- or overweight.
          </p>
        </div>

        <div>
          <H2>The activity multiplier is where the error lives</H2>
          <p>
            The BMR equation is the reliable half. The activity multiplier is a
            five-option approximation of an entire life, and it is where almost
            all of a TDEE estimate&rsquo;s inaccuracy comes from. Jumping one
            level — 1.55 to 1.725 — adds roughly 300 kcal to a 1,750 kcal BMR,
            which is the difference between losing half a kilo a week and losing
            nothing.
          </p>
          <div className="glass-card p-7 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 my-8">
            <h3 className="text-[18px] font-bold text-fg mb-3">
              Pick the level down from the one you want
            </h3>
            <p className="text-[15px]">
              The multipliers cover your whole week, rest days included. Four gym
              sessions on top of a desk job is <strong>moderately active</strong>{" "}
              (1.55), not very active — a category that assumes six or seven hard
              sessions, or physical work. If your weight is not moving the way
              the estimate predicts after a fortnight, lower the activity level
              before you lower the calories.
            </p>
          </div>
        </div>

        <div>
          <H2>How to use the number</H2>
          <p>
            Treat it as a starting hypothesis. Eat at the target for two full
            weeks, weigh yourself in the same conditions most mornings, and
            compare the <em>weekly average</em> rather than any single day — day
            to day, water and gut content move the scale far more than fat does.
            If the average has not moved the way you predicted, adjust by 10%
            and repeat. After one cycle of that you have a maintenance figure
            grounded in your own data, which beats any equation.
          </p>
          <p className="mt-4">
            One trap worth naming: if you selected an activity level here, your
            training is <strong>already counted</strong>. Eating back the
            calories a watch reports for a session counts them twice, and
            consumer trackers tend to overstate exercise burn anyway.
          </p>
        </div>

        <div>
          <H2>Where Dietly picks up</H2>
          <p>
            The two-week feedback loop above is the whole job, and it is the part
            people abandon — it needs consistent logging and a trend you can
            actually read. Dietly logs a meal from a photo, a sentence or a voice
            note, holds the weekly trend against your target, and moves the
            target when the trend says the estimate was wrong. The training plan
            is built from a weekly photo scan rather than from your calorie
            total, so the calories are serving the plan rather than being the
            whole of it.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
