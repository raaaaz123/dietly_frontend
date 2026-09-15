import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import DeficitCalculator from "./DeficitCalculator";

export const metadata: Metadata = toolMetadata("calorie-deficit-calculator");

const FAQS = [
  {
    q: "What is a calorie deficit?",
    a: "Eating fewer calories than you burn, so your body makes up the difference from stored energy. It is the one requirement common to every diet that has ever worked — low carb, high carb, fasting or otherwise. The approaches differ in how they make the deficit easy to sustain, not in whether one is needed.",
  },
  {
    q: "How big should my calorie deficit be?",
    a: "Between 0.5% and 0.75% of bodyweight per week suits most people — around 300–600 kcal a day depending on your size. Larger deficits do lose weight faster, but a growing share of it is muscle rather than fat, and adherence falls off sharply. Below roughly 1500 kcal for men or 1200 for women, getting adequate protein and micronutrients becomes genuinely difficult.",
  },
  {
    q: "Why have I stopped losing weight in a deficit?",
    a: "Usually one of three things. Your maintenance fell as you got lighter, so the old target is now maintenance — recalculate every 4–5 kg. Intake has drifted upward without being noticed, which is extremely common and is what logging solves. Or the loss is happening but hidden by water retention; judge by a weekly average, never by one morning.",
  },
  {
    q: "Is 1200 calories a day safe?",
    a: "It is the conventional floor for women, not a target, and it is genuinely difficult to hit protein and micronutrient needs there. If the arithmetic says you need to eat below the floor to reach a rate, the answer is a slower rate or more activity — not a smaller plate. Anyone considering a very low calorie diet should do it with medical supervision.",
  },
  {
    q: "How long will it take to lose the weight?",
    a: "This calculator gives you the arithmetic, but the arithmetic runs fast. The 7700 kcal per kilogram rule assumes your expenditure stays constant, and it does not — it falls as you get lighter and as your body adapts. Expect real progress to lag the estimate somewhat over a long cut, and expect it to be lumpy rather than linear.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("calorie-deficit-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="calorie-deficit-calculator"
        h1={
          <>
            Calorie Deficit{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="The daily deficit for the rate you want, how long it will take, and the point where going faster starts costing you muscle."
        widget={<DeficitCalculator />}
      >
        <div>
          <H2>What a calorie deficit is</H2>
          <p>
            A calorie deficit means taking in less energy than you expend, so the
            shortfall comes out of storage. It is the one thing every diet that
            has ever worked has in common. Low carb, high carb, keto, fasting,
            meal timing — the useful ones all produce a deficit, and they differ
            only in how easy they make it to keep one going.
          </p>
          <p className="mt-4">
            This calculator finds your maintenance with Mifflin-St Jeor and an
            activity multiplier, then subtracts the energy needed for the weekly
            rate you choose, using the convention that a kilogram of body mass is
            worth roughly <strong>7,700 kcal</strong> (3,500 kcal per pound).
          </p>
        </div>

        <div>
          <H2>Why the rate is a percentage, not a fixed number</H2>
          <p>
            &ldquo;Lose a kilo a week&rdquo; is a trivial ask for someone at
            120 kg and a punishing one for someone at 55 kg, because the deficit
            it requires is the same while the body it comes out of is not.
            Setting the rate as a share of bodyweight — 0.5% to 0.75% a week for
            most people — scales the demand to the person.
          </p>
          <div className="glass-card p-7 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 my-8">
            <h3 className="text-[18px] font-bold text-fg mb-3">
              Faster is not better past a point
            </h3>
            <p className="text-[15px]">
              Above roughly 1% of bodyweight per week, an increasing share of
              what you lose is lean tissue rather than fat. That has a cost
              beyond the mirror: less muscle means a lower maintenance, so each
              round of dieting leaves you with a smaller calorie budget than the
              last. The aggressive option exists in this calculator because
              people look for it — it is not the one to pick by default.
            </p>
          </div>
        </div>

        <div>
          <H2>Why the timeline will be wrong (and in which direction)</H2>
          <p>
            The 7,700 kcal-per-kilogram rule treats your expenditure as fixed. It
            is not. As you get lighter there is less of you to carry and to heat,
            so maintenance falls; as you diet, spontaneous movement tends to fall
            too. Both push actual progress behind the straight line the
            arithmetic draws, and the gap widens the longer the cut runs.
          </p>
          <p className="mt-4">
            Practically: recalculate every 4–5 kg rather than setting a target
            once, judge progress on a <strong>weekly average</strong> rather than
            any single weigh-in, and expect the scale to move in steps rather
            than smoothly. Day to day, water and gut contents swamp fat change
            entirely.
          </p>
        </div>

        <div>
          <H2>Protecting muscle while the weight comes off</H2>
          <p>
            A deficit tells your body to find energy somewhere; it does not care
            whether that is fat or muscle. Two things decide which: eating enough
            protein — 1.6 to 2.2 g/kg, toward the top of that band while cutting —
            and continuing to train with resistance so the muscle has a reason to
            stay. Cardio alone in a deficit reliably produces a smaller version
            of the same shape.
          </p>
          <p className="mt-4">
            That is the whole argument behind how Dietly works: the weekly scan
            scores your physique and names the weak point, the training plan is
            built around fixing it, and the calorie target serves the plan rather
            than replacing it. The number this page gives you is the starting
            point — the app is for the six months of adjusting it.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
