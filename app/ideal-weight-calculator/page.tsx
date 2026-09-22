import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import IdealWeightCalculator from "./IdealWeightCalculator";

export const metadata: Metadata = toolMetadata("ideal-weight-calculator");

const FAQS = [
  {
    q: "What is my ideal body weight?",
    a: "There is no single correct answer, and the four formulas on this page will give you four different ones from the same height — often 8 kg apart. They were built as clinical heuristics, largely for drug dosing and actuarial tables, from height alone. A healthy weight range from BMI is a more defensible reference point, and body composition is more informative than either.",
  },
  {
    q: "Why do the formulas disagree?",
    a: "Because they were derived at different times from different populations for different purposes. Hamwi (1964) came out of diabetes dosing, Devine (1974) out of drug clearance calculations, and Robinson and Miller (both 1983) were revisions fitted to newer data. None was designed to tell an individual what to weigh.",
  },
  {
    q: "Is BMI a better measure?",
    a: "Slightly, and only because it gives a range rather than a point. BMI still cannot distinguish muscle from fat, which is why trained people routinely read as overweight on it. Use the range for context, not as a target, and pay more attention to waist measurement and body fat percentage.",
  },
  {
    q: "Should I aim for a goal weight at all?",
    a: "A goal weight is a useful proxy early on, when there is a lot to lose and almost all of it will be fat. It becomes misleading as you get closer, because the last stretch is about what the remaining weight is made of. At that point progress photos, tape measurements and strength in the gym all tell you more than the scale does.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("ideal-weight-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="ideal-weight-calculator"
        h1={
          <>
            Ideal Weight{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="Four classic formulas, side by side — and an honest account of how much they actually know about you."
        widget={<IdealWeightCalculator />}
      >
        <div>
          <H2>Where these formulas came from</H2>
          <p>
            All four take a single input — your height — and were built for
            clinical convenience rather than for personal goal-setting.{" "}
            <strong>Hamwi</strong> (1964) came out of diabetes work.{" "}
            <strong>Devine</strong> (1974) was written to standardise drug
            dosing, and is still used that way. <strong>Robinson</strong> and{" "}
            <strong>Miller</strong> (both 1983) refitted the same shape of
            equation to newer population data.
          </p>
          <p className="mt-4">
            Not one of them was designed to answer the question people bring to
            them. That is the reason this page shows all four and the gap between
            them, rather than picking the friendliest number and presenting it as
            a target.
          </p>
        </div>

        <div>
          <H2>What they cannot see</H2>
          <div className="glass-card p-7 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 my-8">
            <h3 className="text-[18px] font-bold text-fg mb-3">
              Two people, same height, same &ldquo;ideal&rdquo; weight
            </h3>
            <p className="text-[15px]">
              One trains four times a week and carries 12% body fat. The other
              has not trained in a decade and carries 30%. Every formula on this
              page returns the same number for both, and a BMI calculator puts
              them in the same category. The thing that differs between them —
              what the weight is made of — is invisible to all of it.
            </p>
          </div>
          <p>
            Frame size, limb proportions and training history all move the
            sensible answer by several kilos, and none of them is an input. This
            is also why muscular people are so routinely classified as overweight
            by BMI: the measure has no way to ask why the weight is there.
          </p>
        </div>

        <div>
          <H2>What to use instead</H2>
          <p>
            A goal weight is genuinely useful early, when there is a lot to lose
            and nearly all of it is fat. It gets less useful the closer you get,
            because the last stretch is a composition question rather than a mass
            question. At that stage a tape measure around the waist, a body fat
            estimate, and whether the weight on the bar is still going up will
            each tell you more than the scale.
          </p>
          <p className="mt-4">
            Dietly Fit is built on that premise: a weekly photo scored out of 100
            across definition, leanness, symmetry, posture, body fat and
            potential, with the weak point named and a week of training built to
            fix it. The target is a shape, and the scale is one input among
            several rather than the verdict.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
