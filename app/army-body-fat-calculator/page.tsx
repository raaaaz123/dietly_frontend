import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import ArmyBodyFatCalculator from "./ArmyBodyFatCalculator";

export const metadata: Metadata = toolMetadata("army-body-fat-calculator");

const FAQS = [
  {
    q: "What is the Army body fat standard?",
    a: "For men the maximum is 20% at ages 17 to 20, 22% at 21 to 27, 24% at 28 to 39 and 26% at 40 and over. For women it is 30%, 32%, 34% and 36% for the same age groups.",
  },
  {
    q: "How does the new Army tape test work?",
    a: "Since 2023 the Army uses a one-site tape test: a single measurement around the abdomen at the belly button, combined with bodyweight. The old method needed the neck and waist for men, and the neck, waist and hips for women.",
  },
  {
    q: "What is the Army body fat formula?",
    a: "Men: body fat % = -26.97 - (0.12 x weight in lb) + (1.99 x abdomen in inches). Women: body fat % = -9.15 - (0.015 x weight in lb) + (1.27 x abdomen in inches). The abdomen is rounded to the nearest half inch and the result to a whole percent.",
  },
  {
    q: "Can a high fitness test score exempt me from the tape?",
    a: "Under the 2023 directive, soldiers who score at least 540 on the ACFT with at least 80 points in each event have been exempt from body fat assessment. Check the current rules with your unit, because this has been revised more than once.",
  },
  {
    q: "How do I lower my tape result fast?",
    a: "The formula is driven almost entirely by your abdomen measurement, so the way down is losing belly fat: a steady calorie deficit, high protein, and keeping your strength training. Avoid crash dieting before the test; it costs muscle and bodyweight without moving the tape much.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("army-body-fat-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="army-body-fat-calculator"
        h1={
          <>
            Army Body Fat{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="Estimate your body fat with the Army's 2023 one-site tape formula and see how it compares with the maximum for your age and sex."
        widget={<ArmyBodyFatCalculator />}
      >
        <div>
          <H2>The 2023 one-site tape test</H2>
          <p>
            In 2023 the US Army replaced its old multi-site tape test with a
            single abdominal measurement. Army research found that one tape at
            the belly button, combined with bodyweight, predicted body fat
            measured by DEXA scans as well as the old method, and was faster and
            more consistent between measurers.
          </p>
          <p>
            The calculator applies the published formula for your sex, rounds
            the abdomen to the nearest half inch the way the Army does, and
            checks the result against the AR 600-9 maximum for your age group.
          </p>
        </div>

        <div>
          <H2>How to measure your abdomen</H2>
          <ul>
            <li>Stand straight with your arms relaxed at your sides.</li>
            <li>Wrap the tape around your waist at the level of your belly button.</li>
            <li>Keep it level all the way round and snug, without pressing into the skin.</li>
            <li>Read it at the end of a normal breath out. Do not suck in.</li>
            <li>Measure three times and use the average.</li>
          </ul>
        </div>

        <div>
          <H2>Army body fat standards by age</H2>
          <ul>
            <li><strong>17 to 20:</strong> men 20%, women 30%</li>
            <li><strong>21 to 27:</strong> men 22%, women 32%</li>
            <li><strong>28 to 39:</strong> men 24%, women 34%</li>
            <li><strong>40 and over:</strong> men 26%, women 36%</li>
          </ul>
          <p>
            Soldiers over the standard are usually enrolled in the Army Body
            Composition Program, with monthly checks until they meet it.
          </p>
        </div>

        <div>
          <H2>Getting under the line</H2>
          <p>
            Each inch off your abdomen lowers the result by about two points for
            men and just over one point for women. A deficit of around 500 kcal
            a day typically takes an inch off the waist every three to four
            weeks. Keep protein high and keep lifting, so the weight you lose is
            fat and your fitness test scores do not drop.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
