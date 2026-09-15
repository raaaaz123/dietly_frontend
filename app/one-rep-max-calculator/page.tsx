import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import OneRepMaxCalculator from "./OneRepMaxCalculator";

export const metadata: Metadata = toolMetadata("one-rep-max-calculator");

const FAQS = [
  {
    q: "How accurate is a 1RM calculator?",
    a: "Good within a few percent for sets of 1–5 reps, and increasingly unreliable above that. The formulas assume a fixed relationship between reps and percentage of maximum, but that relationship varies by person, by lift and by training history — someone with high work capacity will get more reps at 85% than the equations predict, and their estimate will read high as a result.",
  },
  {
    q: "Which 1RM formula is best?",
    a: "None of them is reliably best, which is why this page shows four. Epley and Brzycki are the most cited and agree closely at low reps — they diverge as reps climb, with Brzycki reading lower. Use the average, treat the spread as the error bar, and re-estimate from a heavy set rather than a light one.",
  },
  {
    q: "Should I actually test my one-rep max?",
    a: "Rarely, and not as a beginner. A true max attempt is technically demanding and costs days of recovery, and the estimate from a heavy set of 3–5 is close enough to program from. Testing has a place for competitive lifters and for peaking blocks; for everyone else it is risk without much return.",
  },
  {
    q: "How do I use percentages of my 1RM?",
    a: "As a starting point, not a prescription. Strength work generally sits at 80–95% for 1–5 reps, hypertrophy work at 65–80% for 6–12. Your max changes week to week with sleep, food and fatigue, so a fixed percentage will sometimes be too heavy and sometimes too light — adjust by how the first working set actually feels.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("one-rep-max-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="one-rep-max-calculator"
        h1={
          <>
            One Rep Max{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="Estimate your max from a set you have actually done — and see how far four standard formulas disagree about it."
        widget={<OneRepMaxCalculator />}
      >
        <div>
          <H2>What a one-rep max estimate is doing</H2>
          <p>
            Your one-rep max is the heaviest weight you could lift once with
            acceptable technique. Rather than finding it by attempting it, these
            formulas infer it from a submaximal set: if you can do 100 kg for
            five hard reps, there is a fairly predictable weight you could do for
            one.
          </p>
          <p className="mt-4">
            Epley — <code className="text-fg">1RM = w × (1 + reps/30)</code> — and
            Brzycki — <code className="text-fg">1RM = w × 36/(37 − reps)</code> —
            are the two most widely used. At five reps they differ by about 4%.
            At twelve they differ by considerably more, which is the honest
            argument for showing you all four rather than picking one and
            implying a precision that is not there.
          </p>
        </div>

        <div>
          <H2>Why the estimate drifts at high reps</H2>
          <p>
            These equations assume everyone has the same rep-to-percentage
            relationship. They do not. Training history, muscle fibre
            distribution and the lift itself all change how many reps a given
            percentage allows — a squat typically permits more reps at 80% than a
            bench press does — and the differences compound as the set gets
            longer.
          </p>
          <div className="glass-card p-7 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 my-8">
            <h3 className="text-[18px] font-bold text-fg mb-3">
              Estimate from a heavy set, not a long one
            </h3>
            <p className="text-[15px]">
              A set of 3–5 reps taken close to failure gives the most reliable
              estimate. A set of 15 is measuring your endurance and will read
              high. If the only set you have is a long one, treat the result as a
              rough ceiling and re-test with something heavier before you program
              from it.
            </p>
          </div>
        </div>

        <div>
          <H2>Turning a max into a week of training</H2>
          <p>
            The percentage table above converts the estimate into working
            weights: roughly 80–95% of max for strength work in the 1–5 rep
            range, 65–80% for hypertrophy work at 6–12. Treat those as opening
            offers. Your effective max moves with sleep, stress and how the
            previous session went, so a fixed percentage will feel wrong on a
            fair number of days — the weight on the bar should answer to how the
            first working set moves, not only to arithmetic.
          </p>
          <p className="mt-4">
            Which is most of the argument for not programming by hand. Dietly
            builds the week from your latest scan, the weak point it named, and
            the equipment you actually have — and when the rack is taken or a
            shoulder is complaining, you say so in a sentence and the session is
            rewritten around it.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
