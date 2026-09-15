import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import LbmCalculator from "./LbmCalculator";

export const metadata: Metadata = toolMetadata("lean-body-mass-calculator");

const FAQS = [
  {
    q: "What is lean body mass?",
    a: "Everything you are made of except fat: muscle, bone, organs, connective tissue and the water in all of them. It is your total weight minus your fat mass. Because it includes far more than muscle, lean body mass is not the same as muscle mass, and it moves with hydration as well as with training.",
  },
  {
    q: "What is a good lean body mass?",
    a: "There is no single target, because lean mass scales with height and frame. It is more useful as a number you track than one you compare: lean mass holding steady while total weight falls means the loss is fat, which is the outcome a diet is supposed to produce. A one-off figure tells you much less than the direction it moves over three months.",
  },
  {
    q: "How do I increase lean body mass?",
    a: "Resistance training that gets progressively harder, enough protein (1.6–2.2 g/kg of bodyweight), and enough total calories — building lean tissue in a deficit is possible for beginners and people returning after a break, but it is slow and unreliable for anyone else. Sleep matters more than most supplements.",
  },
  {
    q: "Is the Boer formula accurate?",
    a: "Only roughly. It predicts lean mass from height, weight and sex, which means it cannot tell a trained person from an untrained one of identical dimensions — and that difference is exactly what you are trying to measure. Use it when you have nothing better; prefer a body fat percentage or tape measurements if you have them.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("lean-body-mass-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="lean-body-mass-calculator"
        h1={
          <>
            Lean Body Mass{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="What your scale weight is actually made of — and which half of it you are trying to keep."
        widget={<LbmCalculator />}
      >
        <div>
          <H2>What lean body mass is</H2>
          <p>
            Lean body mass is your total weight minus your fat mass: muscle,
            bone, organs, connective tissue, and the water held in all of them.
            An 80 kg man at 20% body fat carries 64 kg of lean mass and 16 kg of
            fat. Someone the same weight at 30% carries 56 kg and 24 kg — same
            number on the scale, visibly different person.
          </p>
          <p className="mt-4">
            Worth being precise about one thing: lean mass is <em>not</em> muscle
            mass. Skeletal muscle is typically a little under half of it. That
            matters because lean mass moves with hydration too, which is why a
            single reading is far less informative than the trend across months.
          </p>
        </div>

        <div>
          <H2>Three ways to get the number, in order of trust</H2>
          <p>
            If you have a recent <strong>body fat percentage</strong> — from a
            DEXA, a BodPod or calipers — the arithmetic is exact and the only
            uncertainty is in that input. Failing that, the{" "}
            <strong>US Navy tape method</strong> gets within about 3–4 percentage
            points from three measurements, which is enough to track direction.
            The <strong>Boer formula</strong> predicts lean mass from height and
            weight alone, and cannot tell a lifter from a sedentary person of the
            same dimensions — it is a fallback, not an answer.
          </p>
        </div>

        <div>
          <H2>Why it is the number worth tracking</H2>
          <div className="glass-card p-7 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 my-8">
            <h3 className="text-[18px] font-bold text-fg mb-3">
              Two people lose 6 kg. Only one of them succeeded.
            </h3>
            <p className="text-[15px]">
              If lean mass held and the whole 6 kg came off fat mass, the shape
              changed and maintenance calories barely moved. If 2 kg of it was
              lean tissue, the scale reports the same victory while the mirror
              disagrees and the calorie budget for the next cut is smaller.
              Total weight cannot distinguish these. Lean mass can.
            </p>
          </div>
          <p>
            It is also the better basis for a protein target if you carry a lot
            of fat. Fat tissue does not need feeding, so 2.2 g/kg of{" "}
            <em>bodyweight</em> overshoots for someone at 35% body fat — the
            results panel above gives you the lean-mass version instead.
          </p>
        </div>

        <div>
          <H2>Seeing the change without a lab</H2>
          <p>
            The honest problem with all of this is measurement. A DEXA every
            month is impractical, calipers are operator-dependent, and tape
            measurements change more slowly than motivation does. That gap is
            what Dietly&rsquo;s weekly scan is for: one photo, scored out of 100
            across definition, leanness, symmetry, posture, body fat and
            potential, shot the same way each week so the comparison is
            meaningful. It is an estimate rather than a measurement — but it is
            an estimate you will actually take every week.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
