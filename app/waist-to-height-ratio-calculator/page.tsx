import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import WaistToHeightCalculator from "./WaistToHeightCalculator";

export const metadata: Metadata = toolMetadata("waist-to-height-ratio-calculator");

const FAQS = [
  {
    q: "What is a healthy waist-to-height ratio?",
    a: "Under 0.5. The rule is to keep your waist measurement below half your height, in whatever unit you like — the ratio cancels units out. Between 0.5 and 0.6 is generally treated as increased risk, and above 0.6 as high risk. The UK's NICE guidance recommends this 0.5 threshold explicitly for adults up to a BMI of 35.",
  },
  {
    q: "Is waist-to-height ratio better than BMI?",
    a: "For predicting cardiometabolic risk in an individual, most evidence says yes. BMI knows your total weight but not where it sits, and fat stored around the abdomen and organs behaves very differently from fat stored on the hips and thighs. Waist-to-height ratio captures that distribution, and it also avoids BMI's worst failure — classifying muscular people as overweight.",
  },
  {
    q: "Where exactly do I measure my waist?",
    a: "At the midpoint between the bottom of your lowest rib and the top of your hip bone, which for most people is slightly above the navel. Measure directly against skin, standing relaxed, at the end of a normal breath out, with the tape snug but not compressing. Do not measure at your trouser waistband — that is a clothing size, not an anatomical landmark, and it is usually several centimetres off.",
  },
  {
    q: "Does the threshold differ by sex or ethnicity?",
    a: "The 0.5 threshold is deliberately the same for everyone, which is one of its practical advantages over absolute waist cut-offs — those do vary by sex and by population, with lower thresholds typically applied to people of South Asian, Chinese and Japanese descent. Because waist-to-height ratio already scales to body size, it holds up across groups better than a single absolute waist number does.",
  },
  {
    q: "Can my ratio be too low?",
    a: "Below about 0.4 may indicate insufficient weight for your height, and it is worth looking at alongside other measures rather than treating lower as automatically better. The ratio is a screening signal, not a target to minimise — and like every measure on this site, a single reading matters far less than the direction it moves over months.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("waist-to-height-ratio-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="waist-to-height-ratio-calculator"
        h1={
          <>
            Waist-to-Height{" "}
            <span className="font-display italic text-accent font-light">Ratio</span>
          </>
        }
        intro="One tape measure and one division — and a better signal of metabolic risk than BMI, for less effort."
        widget={<WaistToHeightCalculator />}
      >
        <div>
          <H2>The whole rule, in one sentence</H2>
          <p>
            <strong>Keep your waist under half your height.</strong> That is the
            entire method. Divide your waist measurement by your height, in any
            unit as long as both use the same one, and aim for a result below{" "}
            <strong>0.5</strong>. No equation to remember, no sex-specific
            constant, no chart.
          </p>
          <p>
            The simplicity is not a compromise. Waist-to-height ratio
            consistently matches or beats BMI at predicting cardiometabolic
            outcomes in individuals, and the UK&rsquo;s National Institute for
            Health and Care Excellence now recommends the 0.5 threshold directly
            in its guidance on assessing overweight in adults.
          </p>
        </div>

        <div>
          <H2>Why where fat sits matters more than how much</H2>
          <p>
            Body fat is not one tissue behaving one way. Fat stored under the
            skin on the hips and thighs is comparatively inert. Fat stored in
            the abdomen — particularly <strong>visceral fat</strong>, packed
            around the liver, pancreas and intestines — is metabolically active,
            releasing inflammatory signals and free fatty acids straight into
            the portal circulation.
          </p>
          <p>
            That difference is why two people at identical BMI can sit at very
            different risk, and why a measure that notices distribution
            outperforms one that only counts mass. Your waist is a proxy for the
            deposit that matters most, and it takes ten seconds to measure.
          </p>
        </div>

        <div>
          <H2>How to measure so the number means something</H2>
          <p>
            Measurement error is the main way this goes wrong, and it is easy to
            avoid:
          </p>
          <ul>
            <li>
              Find the <strong>midpoint between your lowest rib and the top of
              your hip bone</strong>. For most people that is a little above the
              navel — and it is usually not where your trousers sit.
            </li>
            <li>Measure against skin, not over clothing.</li>
            <li>
              Stand relaxed and measure at the <strong>end of a normal breath
              out</strong>. Do not hold your breath and do not pull your stomach
              in.
            </li>
            <li>Keep the tape horizontal and snug — touching, not compressing.</li>
            <li>
              Measure at the same time of day, ideally in the morning before
              eating. Abdominal girth varies by a couple of centimetres across a
              day.
            </li>
          </ul>
        </div>

        <div>
          <H2>What it still cannot tell you</H2>
          <p>
            Waist-to-height ratio does not distinguish subcutaneous fat from
            visceral fat, and it does not know about muscle — a very lean lifter
            with a thick, well-developed midsection reads slightly higher than
            their body fat would suggest. It is also less informative during
            pregnancy, and it has its own paediatric thresholds rather than
            using the adult one.
          </p>
          <p>
            Use it as the cheapest reliable screening number you have, next to a
            body fat estimate rather than instead of one. Two imperfect measures
            that fail in different directions tell you considerably more than
            either alone.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
