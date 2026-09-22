import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import FfmiCalculator from "./FfmiCalculator";

export const metadata: Metadata = toolMetadata("ffmi-calculator");

const FAQS = [
  {
    q: "What is FFMI?",
    a: "Fat-Free Mass Index is your lean body mass in kilograms divided by the square of your height in metres. It is BMI with the fat removed, and it answers a question BMI cannot: how much muscle you carry relative to your frame. A tall person and a short person with the same amount of muscle will have very different absolute lean mass but similar FFMI.",
  },
  {
    q: "What is a good FFMI?",
    a: "For men, around 18 to 19 is typical for someone untrained, 20 to 21 reads as visibly muscular, and 22 to 23 usually represents several focused years of training. Women generally run about 3 points lower for the same relative development. These are descriptions of where people tend to fall, not targets — and they depend entirely on the accuracy of the body fat number you fed in.",
  },
  {
    q: "Is 25 really the natural limit?",
    a: "No, and the claim is more confident than its source. It comes from Kouri et al. (1995), which measured 157 men — some drug-free, some not — and observed that the drug-free group rarely exceeded a normalised FFMI of about 25. That is a description of one sample's distribution, not a test of a physiological ceiling. Drug-free lifters above 25 exist, particularly those who are tall, unusually well-built, or have trained for decades. Treat 25 as the edge of what is common, not the edge of what is possible.",
  },
  {
    q: "What does the normalised figure mean?",
    a: "Raw FFMI slightly favours shorter people, because lean mass does not scale perfectly with the square of height. The normalisation adds 6.1 × (1.8 − your height in metres), which adjusts the number to a 1.8 m reference so that people of different heights can be compared. Most published FFMI figures, including the Kouri numbers, are normalised — so use the normalised value when comparing yourself to any quoted figure.",
  },
  {
    q: "How accurate is my FFMI?",
    a: "Exactly as accurate as your body fat estimate, and no more. Everything else in the calculation is height and weight, which you can measure precisely. If your body fat percentage is off by four points, your FFMI moves by roughly a full point — enough to shift you a whole descriptive band. A single calliper or circumference estimate is fine for tracking change over time, but do not treat one reading as a precise placement.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("ffmi-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="ffmi-calculator"
        h1={
          <>
            FFMI{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="How much muscle you carry for your frame — and an honest reading of the number everyone quotes as a natural limit."
        widget={<FfmiCalculator />}
      >
        <div>
          <H2>What FFMI measures that BMI cannot</H2>
          <p>
            <strong>Fat-Free Mass Index</strong> is your lean body mass divided
            by the square of your height:{" "}
            <strong>FFMI = lean kg / m²</strong>. It is the same arithmetic as
            BMI with one decisive change — the fat is taken out first. That one
            change fixes the failure BMI is best known for, because a lifter and
            an untrained person of the same height and weight no longer produce
            the same number.
          </p>
          <p>
            The result is a measure of muscular development that is fair across
            heights. Absolute lean mass is not: 70 kg of lean tissue on someone
            1.65 m tall is a strikingly built person, while the same 70 kg on
            someone 1.95 m tall is unremarkable. Dividing by height squared is
            what makes those two comparable.
          </p>
        </div>

        <div>
          <H2>Reading your number</H2>
          <p>
            The bands below describe where men tend to fall. Women generally
            read about three points lower for equivalent development, because
            typical essential body fat and hormonal profiles differ.
          </p>
          <ul>
            <li><strong>Under 18</strong> — less muscle than average for the frame</li>
            <li><strong>18–20</strong> — average, untrained or lightly trained</li>
            <li><strong>20–22</strong> — visibly muscular, consistently trained</li>
            <li><strong>22–24</strong> — well-developed; typically several focused years</li>
            <li><strong>24–26</strong> — near the top of the drug-free range reported in the literature</li>
            <li><strong>Above 26</strong> — rare drug-free, and reported mostly in enhanced samples</li>
          </ul>
        </div>

        <div>
          <H2>Where &ldquo;25 is the natural limit&rdquo; came from</H2>
          <p>
            The claim traces to a single 1995 paper —{" "}
            <strong>Kouri, Pope, Katz and Oliva</strong>, published in the{" "}
            <em>Clinical Journal of Sport Medicine</em> — which measured 157 men
            across drug-free and steroid-using groups and found that the
            drug-free lifters clustered below a normalised FFMI of about 25.
          </p>
          <p>
            That is a real finding, and it is routinely over-read. The study
            described the distribution of one sample of 157 people; it did not
            establish a physiological ceiling, and it had no way to. Drug-free
            lifters above 25 exist — they are simply uncommon, and they tend to
            be tall, exceptionally well-built, or very far into a long training
            career. The honest version of the claim is that <em>most</em>{" "}
            drug-free lifters do not exceed 25, which is a much weaker statement
            than the one usually made with this number.
          </p>
        </div>

        <div>
          <H2>The measurement problem underneath it all</H2>
          <p>
            Every FFMI figure inherits the error of the body fat estimate it was
            built from, and that error is larger than most people assume.
            Circumference formulas carry a few points of uncertainty, callipers
            depend heavily on who is holding them, and consumer bioimpedance
            scales shift with hydration alone. A four-point body fat error moves
            FFMI by around a full point — enough to move you a whole band.
          </p>
          <p>
            This makes FFMI far more useful as a <em>tracking</em> number than
            as a placement. Measure the same way, at the same time of day,
            every few weeks. The direction of travel is trustworthy in a way
            that any single reading is not — and direction is what actually
            tells you whether your training is working.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
