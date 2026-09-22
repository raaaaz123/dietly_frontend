import { Metadata } from "next";
import Link from "next/link";
import GuidePage, { Callout, H2, Sources } from "../../components/guides/GuidePage";
import { guideMetadata } from "../../lib/guides";

export const metadata: Metadata = guideMetadata("skinny-fat");

export default function Page() {
  return (
    <GuidePage
      slug="skinny-fat"
      lede="&ldquo;Skinny fat&rdquo; is a normal bodyweight carried with a high body fat percentage and very little muscle underneath it. It is the one body composition that every scale-based measure reports as fine, which is exactly why people in it spend years doing the wrong thing about it."
    >
      <p>
        The clinical name is <strong>normal weight obesity</strong> — a BMI
        inside the healthy band with a body fat percentage above it. It is
        common enough to have been studied in large cohorts, and it carries
        metabolic risk closer to that of someone classified as overweight than
        to someone lean, despite the scale saying otherwise.
      </p>
      <p>
        What that means in practice: the person reading this has been told by
        every number available to them that nothing is wrong, while what they
        see in the mirror says something is. Both are correct. They are
        measuring different things.
      </p>

      <H2>Why the usual measures miss it</H2>
      <p>
        BMI is weight divided by height squared, and it has no way to know what
        the weight is made of. Someone 1.78 m and 70 kg reads 22.1 — squarely
        healthy — whether that 70 kg is 12% fat or 28% fat. Those are two very
        different bodies with the same index.
      </p>
      <p>
        This is the mirror image of the failure BMI is better known for.
        Everyone accepts that a muscular person can read
        &ldquo;overweight&rdquo; on BMI without being so. The same logic runs
        the other way and is discussed far less, because reading
        &ldquo;healthy&rdquo; feels like good news.
      </p>
      <p>
        Two numbers catch it where BMI cannot. Your{" "}
        <Link href="/waist-to-height-ratio-calculator" className="underline hover:text-fg">
          waist-to-height ratio
        </Link>{" "}
        should sit under 0.5 — a normal-weight person above that is carrying
        central fat the scale cannot see. And your{" "}
        <Link href="/ffmi-calculator" className="underline hover:text-fg">
          fat-free mass index
        </Link>{" "}
        says how much muscle you carry for your frame, which is the half of the
        problem nobody measures.
      </p>

      <Callout title="The two-number test">
        Measure your waist at the midpoint between your lowest rib and hip bone.
        If it is more than half your height while your BMI sits between 18.5 and
        25, that is the pattern this page is about — and the answer is almost
        never &ldquo;eat less&rdquo;.
      </Callout>

      <H2>Why eating less makes it worse</H2>
      <p>
        The instinct is to diet, because every message about body composition is
        framed as fat loss. For this particular starting point that instinct is
        close to exactly wrong.
      </p>
      <p>
        The defining feature here is not excess fat. It is{" "}
        <strong>insufficient muscle</strong>. A deficit without resistance
        training costs lean mass as well as fat — in untrained dieters, a
        substantial fraction of the weight lost is lean tissue. So you arrive
        lighter, with a similar or higher body fat percentage and less muscle
        than you started with. The scale rewards you and the mirror does not
        change, which is the loop this body type gets stuck in.
      </p>
      <p>
        Repeat that two or three times and you have someone who has dieted for
        years, weighs less than ever, and looks softer than when they began.
        That is not a failure of discipline. It is the predictable result of
        applying a fat-loss solution to a muscle-deficit problem.
      </p>

      <H2>What actually works</H2>
      <p>
        The goal is to change the ratio, not the total. That means{" "}
        <Link href="/guides/body-recomposition" className="underline hover:text-fg">
          body recomposition
        </Link>
        , and this is the single best starting point for it — untrained, with
        fat to use as fuel, is precisely the state in which simultaneous muscle
        gain and fat loss happens most readily.
      </p>
      <ul className="list-disc pl-6 space-y-2.5 my-5">
        <li>
          <strong>Lift, three times a week, and progress the load.</strong> This
          is not the supporting act. It is the treatment. Full-body sessions
          built on compound movements —{" "}
          <Link href="/workouts/beginner-gym-workout" className="underline hover:text-fg">
            a beginner gym plan
          </Link>{" "}
          is exactly this — or{" "}
          <Link href="/workouts/home-workout" className="underline hover:text-fg">
            bodyweight at home
          </Link>{" "}
          if a gym is not realistic yet.
        </li>
        <li>
          <strong>Eat at or near maintenance, not in a deficit.</strong> Work
          out{" "}
          <Link href="/tdee-calculator" className="underline hover:text-fg">
            your TDEE
          </Link>{" "}
          and hold there. You are not trying to lose weight; you are trying to
          change what the weight is.
        </li>
        <li>
          <strong>Get enough protein.</strong> 1.6–2.2 g per kg of bodyweight is
          the range the evidence supports;{" "}
          <Link href="/protein-calculator" className="underline hover:text-fg">
            the calculator
          </Link>{" "}
          does the arithmetic. Under-eating protein is the most common reason a
          recomp attempt produces nothing.
        </li>
        <li>
          <strong>Stop weighing yourself daily.</strong> The scale is the one
          instrument guaranteed to report no progress on a successful recomp.
          Use photos, a tape measure and what you can lift.
        </li>
      </ul>

      <H2>How long it takes, honestly</H2>
      <p>
        Longer than a diet and shorter than it feels. Visible change in the
        mirror typically takes three to six months, and the first thing to shift
        is usually posture and shoulder width rather than the waist. Strength
        moves much sooner — most people add meaningful load within four to six
        weeks, well before anything is visible, and that early strength progress
        is the evidence to hold onto while the mirror catches up.
      </p>
      <p>
        The realistic rate of muscle gain in a first year is roughly 0.5–1 kg
        per month for men and about half that for women, and it decelerates from
        there.{" "}
        <Link href="/guides/how-long-to-build-muscle" className="underline hover:text-fg">
          The full timeline is here.
        </Link>{" "}
        Two kilograms of new muscle sounds like very little and looks like a
        great deal.
      </p>

      <H2>The measurement problem, and the reason this app exists</H2>
      <p>
        Every practical difficulty above is a measurement difficulty. The scale
        does not move. BMI says you are fine. Photos taken in different light on
        different days are not comparable, so the change you are making is real
        and invisible to you for months — which is when most people quit.
      </p>
      <p>
        That is the specific gap Dietly Fit was built for: one photo a week,
        scored out of 100, with the area holding the score back named and the
        training week built around it. For this body type the weak point is
        usually the same — not enough muscle anywhere in particular — and
        watching a single number move weekly is a far better motivator than a
        scale that is designed not to.
      </p>

      <Sources
        items={[
          {
            text: "Romero-Corral A, et al. Normal weight obesity: a risk factor for cardiometabolic dysregulation and cardiovascular mortality. Eur Heart J, 2010.",
            href: "https://pubmed.ncbi.nlm.nih.gov/19880881/",
          },
          {
            text: "Barakat C, et al. Body Recomposition: Can Trained Individuals Build Muscle and Lose Fat at the Same Time? Strength Cond J, 2020.",
            href: "https://journals.lww.com/nsca-scj/fulltext/2020/10000/body_recomposition__can_trained_individuals_build.3.aspx",
          },
          {
            text: "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength. Br J Sports Med, 2018.",
            href: "https://pubmed.ncbi.nlm.nih.gov/28698222/",
          },
          {
            text: "Ashwell M, Gunn P, Gibson S. Waist-to-height ratio is a better screening tool than waist circumference and BMI for adult cardiometabolic risk factors: systematic review and meta-analysis. Obes Rev, 2012.",
            href: "https://pubmed.ncbi.nlm.nih.gov/22106927/",
          },
        ]}
      />
    </GuidePage>
  );
}
