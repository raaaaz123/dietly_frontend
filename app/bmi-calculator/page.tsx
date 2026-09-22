import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import BmiCalculator from "./BmiCalculator";

export const metadata: Metadata = toolMetadata("bmi-calculator");

const FAQS = [
  {
    q: "What is a healthy BMI?",
    a: "The World Health Organization puts the healthy adult band at 18.5 to 24.9. Below 18.5 is classified as underweight, 25 to 29.9 as overweight, and 30 and above as obesity, split into three classes at 30, 35 and 40. Those cut-offs come from population mortality data, not from any assessment of an individual body.",
  },
  {
    q: "Why does BMI say I am overweight when I am lean?",
    a: "Because BMI divides your weight by the square of your height and asks no further questions. Muscle is denser than fat, so a trained person carrying 10 kg more lean mass than average reads 3 or so points higher on BMI at the same height with less body fat. This is not an edge case — it is the routine experience of anyone who lifts, and it is the single best-documented failure of the index.",
  },
  {
    q: "Is BMI accurate?",
    a: "It is accurate at what it was built for, which is comparing populations, and unreliable at what people use it for, which is assessing an individual. Adolphe Quetelet devised it in the 1830s as a statistical description of groups and explicitly warned against applying it to a person. For an individual, waist-to-height ratio and a body fat estimate both carry more information for the same effort.",
  },
  {
    q: "What should I use instead?",
    a: "Use two numbers together. Waist-to-height ratio — keep your waist under half your height — catches central body fat, which is the part most associated with metabolic risk, and needs only a tape measure. A body fat percentage estimate tells you what the weight on the scale is made of. Neither is perfect; both know more about you than BMI does.",
  },
  {
    q: "Does BMI work for children or older adults?",
    a: "Not in this form. Children are assessed against age-and-sex percentile charts rather than fixed cut-offs, because body composition changes rapidly through growth. In older adults, height loss and muscle loss both distort the number, and a BMI in the low-healthy band can accompany clinically significant loss of lean mass. This calculator is for adults, and it is a reference point rather than a diagnosis.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("bmi-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="bmi-calculator"
        h1={
          <>
            BMI{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="Your Body Mass Index, the WHO band it falls in, and a straight account of the question it cannot answer."
        widget={<BmiCalculator />}
      >
        <div>
          <H2>What BMI actually measures</H2>
          <p>
            Body Mass Index is your weight in kilograms divided by the square of
            your height in metres. That is the entire calculation:{" "}
            <strong>BMI = kg / m²</strong>. It takes two measurements, needs no
            equipment beyond a scale and a tape, and returns a single number
            that can be compared across millions of people — which is precisely
            why it became the standard, and precisely why it is so often
            misread.
          </p>
          <p>
            The index was devised by the Belgian statistician Adolphe Quetelet
            in the 1830s, as a way of describing the distribution of body sizes
            in a <em>population</em>. It was never designed to assess an
            individual, and Quetelet said so. The name &ldquo;Body Mass
            Index&rdquo; came much later, in 1972, when Ancel Keys evaluated
            several weight-for-height formulas and found Quetelet&rsquo;s the
            best of a limited set for epidemiological work.
          </p>
        </div>

        <div>
          <H2>Why it misreads trained bodies</H2>
          <p>
            BMI has no way to distinguish between a kilogram of muscle and a
            kilogram of fat, because it only ever sees total mass. Muscle is
            roughly 15% denser than fat, so two people of the same height and
            the same BMI can have entirely different bodies, and a person who
            trains seriously will read higher on BMI than an untrained person
            with more body fat.
          </p>
          <p>
            The practical consequence is that a large share of athletic men land
            in the &ldquo;overweight&rdquo; band at body fat percentages in the
            low teens. Running the number the other way is just as instructive:
            someone carrying very little muscle can sit comfortably inside the
            healthy band while holding a body fat percentage that is not healthy
            at all — a pattern common enough to have earned the informal name
            &ldquo;skinny fat&rdquo;.
          </p>
        </div>

        <div>
          <H2>The numbers, and what they are based on</H2>
          <p>
            The cut-offs below are the WHO&rsquo;s adult classifications. They
            are drawn from large-population associations between BMI and
            mortality, which is a real and well-replicated relationship — the
            curve genuinely turns upward at both ends. What that relationship
            cannot do is tell you which side of the average <em>you</em> are on.
          </p>
          <ul>
            <li><strong>Under 18.5</strong> — underweight</li>
            <li><strong>18.5 to 24.9</strong> — healthy weight</li>
            <li><strong>25.0 to 29.9</strong> — overweight</li>
            <li><strong>30.0 to 34.9</strong> — obesity, class I</li>
            <li><strong>35.0 to 39.9</strong> — obesity, class II</li>
            <li><strong>40.0 and above</strong> — obesity, class III</li>
          </ul>
          <p>
            These thresholds were derived largely from European-ancestry
            populations, and several health bodies use lower cut-offs for people
            of South Asian descent — often 23 for overweight — because
            metabolic risk appears at a lower BMI in those populations. If that
            applies to you, read the bands as shifted down by roughly two points.
          </p>
        </div>

        <div>
          <H2>Two better numbers, for the same effort</H2>
          <p>
            If you are going to measure yourself, measure something that
            distinguishes tissue.{" "}
            <strong>Waist-to-height ratio</strong> needs one tape measure and
            one division, and the rule is easy to remember: keep your waist
            under half your height. It tracks central adiposity, which is the
            fat distribution most strongly linked to metabolic risk, and it
            outperforms BMI at that job in most comparisons.
          </p>
          <p>
            A <strong>body fat percentage</strong> estimate answers the question
            BMI cannot: what the weight is made of. Circumference methods like
            the US Navy formula are free and land within a few points of a DEXA
            scan for most people. Between the two, you have a far better picture
            than a single weight-for-height ratio can give you.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
