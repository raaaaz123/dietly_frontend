import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import ProteinCalculator from "./ProteinCalculator";

export const metadata: Metadata = toolMetadata("protein-calculator");

const FAQS = [
  {
    q: "How much protein do I need per day?",
    a: "If you train, the evidence clusters between 1.6 and 2.2 grams per kilogram of bodyweight per day — roughly 0.7 to 1.0 grams per pound. The lower end is enough when your weight is steady; the upper end is for a calorie deficit, where protein is what decides whether the weight you lose is fat or muscle. The 0.8 g/kg RDA is a deficiency floor for sedentary adults, not a target for anyone lifting.",
  },
  {
    q: "Can you eat too much protein?",
    a: "For healthy kidneys, intakes up to around 3 g/kg have not been shown to cause harm in controlled trials, some running for a year or more. The practical limit is not safety, it is opportunity cost: protein displaces the carbohydrate that fuels training and the fat that supports hormone function. If you have existing kidney disease, this is a question for your doctor rather than a calculator.",
  },
  {
    q: "Does protein timing matter?",
    a: "Far less than the total. The 'anabolic window' turned out to be hours wide, not minutes. What does help slightly is distribution: spreading intake across three or four feedings of roughly 0.4 g/kg each stimulates muscle protein synthesis more effectively than the same total eaten in one or two sittings.",
  },
  {
    q: "Should I use bodyweight or lean body mass?",
    a: "Bodyweight is fine for most people and is what this calculator uses, because it needs one input everybody knows. If you are carrying a lot of fat, bodyweight overstates the requirement — fat tissue does not need feeding — so lean body mass times 2.2–2.5 g/kg is the better basis. Work out your lean mass first if that applies to you.",
  },
  {
    q: "Do I need a protein shake?",
    a: "No. A shake is a convenient way to hit a number, not a superior source of protein. Whole foods come with the micronutrients and the fullness that powder does not. Use one if it makes the total achievable, skip it if it does not.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("protein-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="protein-calculator"
        h1={
          <>
            Protein <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="How much protein you need in a day, in grams — based on your bodyweight and what you are actually training for."
        widget={<ProteinCalculator />}
      >
        <div>
          <H2>How much protein per day, and why</H2>
          <p>
            For people who train, daily protein requirements cluster between{" "}
            <strong>1.6 and 2.2 grams per kilogram of bodyweight</strong> —
            roughly 0.7 to 1.0 grams per pound. That range comes from meta-analyses
            of resistance-training trials, where intakes above about 1.6 g/kg
            stopped producing additional gains in lean mass for most trained
            lifters.
          </p>
          <p className="mt-4">
            The 0.8 g/kg figure you will see quoted as the RDA is a different
            thing entirely: the amount that prevents deficiency in a sedentary
            adult. It was never designed as a performance target, and using it as
            one is the single most common reason a training programme
            underdelivers.
          </p>
        </div>

        <div>
          <H2>Why the target goes up when calories go down</H2>
          <p>
            This is the part most calculators get backwards. In a calorie deficit
            your body needs energy it is not being given, and muscle is a
            perfectly good source of it. High protein intake, combined with
            resistance training, is what tips that decision toward fat instead —
            which is why the cutting figure here is the highest of the four, not
            the lowest.
          </p>
          <div className="glass-card p-7 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 my-8">
            <h3 className="text-[18px] font-bold text-fg mb-3">
              Protein decides the composition of the loss
            </h3>
            <p className="text-[15px]">
              Two people losing the same 6 kg can end up in completely different
              places. Eating enough protein and lifting, most of that is fat and
              the shape underneath improves. Eating too little, a meaningful
              share is muscle — the scale says success while the mirror says
              otherwise, and maintenance calories fall because there is less of
              you to feed.
            </p>
          </div>
        </div>

        <div>
          <H2>Spreading it across the day</H2>
          <p>
            Total intake does the overwhelming majority of the work. After that,
            distribution matters a little: three or four feedings of roughly
            0.4 g/kg each stimulate muscle protein synthesis more effectively
            than the same total eaten in one sitting. In practice that means
            protein at every meal rather than a chicken breast at dinner trying
            to carry the day.
          </p>
          <p className="mt-4">
            Timing around training, by contrast, has been repeatedly shown to
            matter far less than it was once claimed to. The window is hours
            wide. Hitting the daily number consistently beats hitting it at a
            particular moment.
          </p>
        </div>

        <div>
          <H2>The number is easy. The tracking is not.</H2>
          <p>
            Almost nobody fails at protein because they picked the wrong figure.
            They fail because finding out at 11pm that they are 60g short is
            useless. Dietly logs a meal from a photo, a sentence or a voice note
            and shows the gap left in your day while there is still a meal left
            to fix it — and sets the target from your goal and the training plan
            it built, rather than from a generic percentage.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
