import { Metadata } from "next";
import Link from "next/link";
import GuidePage, { Callout, H2, H3, Sources } from "../../components/guides/GuidePage";
import { guideMetadata } from "../../lib/guides";

export const metadata: Metadata = guideMetadata("body-recomposition");

export default function Page() {
  return (
    <GuidePage
      slug="body-recomposition"
      lede="Body recomposition is losing fat and building muscle at the same time. It is real, it is well documented, and it is the single most common reason someone doing everything right sees a bathroom scale that has not moved in two months and concludes the plan is broken."
    >
      <p>
        The arithmetic is straightforward once stated. If you lose 2 kg of fat
        and gain 2 kg of muscle over ten weeks, your bodyweight is identical and
        your body is not. Every measure that only knows your total mass — the
        scale, BMI, a goal weight — reports nothing happened. Photos, tape
        measurements, how clothes fit and what you can lift all report
        something substantial did.
      </p>

      <H2>Who can actually recomp</H2>
      <p>
        Simultaneous fat loss and muscle gain happens most readily in four
        groups, and it is worth being honest that the fourth is where most
        people reading this sit:
      </p>
      <ul className="list-disc pl-6 space-y-2.5 my-5">
        <li>
          <strong className="text-fg">Beginners.</strong> The first year of
          resistance training produces muscle gain under conditions that would
          not work later, including a modest calorie deficit.
        </li>
        <li>
          <strong className="text-fg">People returning after a break.</strong>{" "}
          &ldquo;Muscle memory&rdquo; is a real phenomenon — previously trained
          tissue regains faster than it was built.
        </li>
        <li>
          <strong className="text-fg">People with a lot of fat to lose.</strong>{" "}
          Larger fat stores can fund the energy shortfall while training drives
          tissue growth.
        </li>
        <li>
          <strong className="text-fg">Trained lifters, slowly.</strong> Possible,
          but the rate is low enough that over any given month it can be hard to
          distinguish from noise.
        </li>
      </ul>

      <Callout title="Why the scale is the wrong instrument here">
        <p>
          A bathroom scale measures total mass, and total mass is the sum of two
          things moving in opposite directions during a recomp. It also carries
          1–2 kg of day-to-day variation from water, sodium, glycogen and gut
          contents — which is larger than a month of genuine recomposition
          progress. Even a perfectly executed recomp produces a flat line on the
          instrument most people are using to judge it.
        </p>
      </Callout>

      <H2>What it takes</H2>

      <H3>Protein, high and consistent</H3>
      <p>
        1.6–2.2 g per kg of bodyweight per day, and toward the upper end when
        calories are restricted. This is the input that decides whether the
        weight you lose is fat or muscle, and it is non-negotiable for recomp
        specifically — you are asking your body to build tissue while short of
        energy, which requires the raw material to be abundant. Our{" "}
        <Link href="/protein-calculator" className="underline hover:text-fg transition-colors">
          protein calculator
        </Link>{" "}
        gives you the number.
      </p>

      <H3>Resistance training that progresses</H3>
      <p>
        Muscle needs a reason to stay, let alone grow, and in a deficit the
        reason has to be unambiguous. That means load or reps going up over
        time, not just showing up. Cardio in a deficit without lifting reliably
        produces a smaller version of the same shape.
      </p>

      <H3>A small deficit, or maintenance</H3>
      <p>
        This is where most recomp attempts go wrong. A large deficit maximises
        fat loss and makes muscle gain nearly impossible; a surplus does the
        reverse. Recomp lives in the narrow band around maintenance — roughly
        0 to 300 kcal below it. Work out your{" "}
        <Link href="/tdee-calculator" className="underline hover:text-fg transition-colors">
          maintenance calories
        </Link>{" "}
        and sit just under them rather than aggressively below.
      </p>

      <H3>Sleep</H3>
      <p>
        Under-slept dieters lose a substantially greater share of their weight
        as lean mass than well-slept ones on identical intake. It is the cheapest
        intervention available and the one most consistently skipped.
      </p>

      <H2>How long it takes</H2>
      <p>
        Slower than either goal pursued alone — that is the trade. A beginner
        might see a clear change in eight to twelve weeks. A trained lifter
        should be thinking in terms of six months to a year, and should expect
        the evidence to arrive as photos and strength numbers rather than as a
        moving scale.
      </p>
      <p className="mt-4">
        This is why recomp has a reputation for not working. It works; it is
        simply slow, and it is invisible to the measurement people check daily.
        Most abandoned recomps were succeeding.
      </p>

      <H2>What to measure instead</H2>
      <ul className="list-disc pl-6 space-y-2.5 my-5">
        <li>
          <strong className="text-fg">Photos, under fixed conditions.</strong>{" "}
          The most direct read on the thing you are changing — provided the
          conditions are genuinely fixed. See our{" "}
          <Link href="/guides/progress-photos-guide" className="underline hover:text-fg transition-colors">
            guide to progress photos
          </Link>
          .
        </li>
        <li>
          <strong className="text-fg">Waist at the navel, fortnightly.</strong>{" "}
          Falls as fat falls, and is largely unaffected by muscle gain — which
          makes it the cleanest cheap signal you have.
        </li>
        <li>
          <strong className="text-fg">Strength in the gym.</strong> Going up
          while the waist goes down is recomp, more or less by definition.
        </li>
        <li>
          <strong className="text-fg">
            <Link href="/lean-body-mass-calculator" className="underline hover:text-fg transition-colors">
              Lean body mass
            </Link>
            , estimated monthly.
          </strong>{" "}
          Total weight flat with lean mass rising is exactly the outcome you are
          after.
        </li>
        <li>
          <strong className="text-fg">Weekly average bodyweight.</strong> Still
          worth tracking — just as one input, and never as a single morning.
        </li>
      </ul>

      <H2>Where a weekly scan fits</H2>
      <p>
        The measurement problem above is the whole reason Dietly Fit is built around
        a photo rather than a weight. One scan a week, scored out of 100 with
        the weak point named, gives you a number that responds to composition
        rather than to mass — and the training plan for the following week is
        built from that weak point. During a recomp, when the scale is
        deliberately not moving, it is the difference between having evidence and
        guessing.
      </p>

      <Sources
        items={[
          {
            text: "Barakat C, et al. Body Recomposition: Can Trained Individuals Build Muscle and Lose Fat at the Same Time? Strength Cond J, 2020.",
            href: "https://journals.lww.com/nsca-scj/fulltext/2020/10000/body_recomposition__can_trained_individuals_build.3.aspx",
          },
          {
            text: "Longland TM, et al. Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss. Am J Clin Nutr, 2016.",
            href: "https://pubmed.ncbi.nlm.nih.gov/26817506/",
          },
          {
            text: "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength. Br J Sports Med, 2018.",
            href: "https://pubmed.ncbi.nlm.nih.gov/28698222/",
          },
          {
            text: "Nedeltcheva AV, et al. Insufficient sleep undermines dietary efforts to reduce adiposity. Ann Intern Med, 2010.",
            href: "https://pubmed.ncbi.nlm.nih.gov/20921542/",
          },
        ]}
      />
    </GuidePage>
  );
}
