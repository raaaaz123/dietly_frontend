import { Metadata } from "next";
import Link from "next/link";
import GuidePage, { Callout, H2, H3, Sources } from "../../components/guides/GuidePage";
import { JsonLdScript } from "../../components/tools/ToolPage";
import { guideMetadata } from "../../lib/guides";
import { SITE_URL } from "../../lib/site";

export const metadata: Metadata = guideMetadata("progress-photos-guide");

/**
 * `HowTo` markup, because this page genuinely is a procedure with ordered
 * steps — and the steps below are the ones rendered on the page, not a second
 * set written for the crawler.
 */
const howTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to take comparable progress photos",
  description:
    "A repeatable setup for progress photos so week-to-week differences reflect real change rather than changes in lighting, angle or timing.",
  url: `${SITE_URL}/guides/progress-photos-guide`,
  totalTime: "PT5M",
  step: [
    {
      "@type": "HowToStep",
      name: "Pick one place and keep it",
      text: "Choose a spot with even, indirect light and a plain background. Mark where your feet go. Use the same room every week.",
    },
    {
      "@type": "HowToStep",
      name: "Fix the camera position",
      text: "Put the phone on a stable surface at roughly navel height, about two metres away, with the lens level rather than tilted. Mark the spot.",
    },
    {
      "@type": "HowToStep",
      name: "Shoot at the same time",
      text: "First thing in the morning, after using the bathroom and before eating or drinking. This removes most of the day-to-day variation in how you look.",
    },
    {
      "@type": "HowToStep",
      name: "Use the same three angles",
      text: "Front, side and back, relaxed, arms at your sides. Take a relaxed set every time; a flexed set is optional but must also be consistent.",
    },
    {
      "@type": "HowToStep",
      name: "Wear the same thing",
      text: "Minimal, fitted clothing that shows your waistline. Loose clothing hides exactly the change you are trying to see.",
    },
    {
      "@type": "HowToStep",
      name: "Review monthly, not daily",
      text: "Compare against a photo from four to six weeks ago rather than last week's. Weekly change is usually smaller than the noise.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLdScript data={howTo} />
      <GuidePage
        slug="progress-photos-guide"
        lede="Most progress photos are useless, and not because the person taking them is not making progress. Two photos taken in different light, at different distances, at different times of day are not comparable — the difference between them is mostly the conditions. Fixing that takes about five minutes of setup, once."
      >
        <p>
          The reason to bother is that photos catch what other measurements
          miss. The scale cannot tell fat from muscle and is drowned in water
          weight day to day. A tape measure moves slowly. A photograph captures
          the thing you actually care about — but only if the photograph is the
          only variable that changed.
        </p>

        <H2>The six things to hold constant</H2>

        <H3>1. One place, every time</H3>
        <p>
          Pick a spot with even, indirect light and a plain background. Overhead
          light is the worst case: it casts shadows down the abdomen that read
          as definition on a good day and vanish on a cloudy one. A window to
          the side, or a well-lit bathroom, beats a spotlight. Then mark where
          your feet go — tape on the floor is not excessive.
        </p>

        <H3>2. One camera position</H3>
        <p>
          Phone on a stable surface, lens at roughly navel height, about two
          metres back, held level rather than tilted. Camera height changes
          apparent proportions dramatically: shooting from above shortens the
          legs and slims the waist, shooting from below does the reverse. A
          timer or a voice shutter is better than handing the phone to someone
          who will stand somewhere different next month.
        </p>

        <H3>3. One time of day</H3>
        <p>
          First thing in the morning, after the bathroom, before eating or
          drinking. You look meaningfully different at 9pm than at 7am — food
          volume, water, sodium and glycogen all change how you appear, and none
          of it is fat.
        </p>

        <H3>4. The same three angles, relaxed</H3>
        <p>
          Front, side, back. Arms at your sides, standing normally. The
          temptation is to flex, and flexed photos are fine as an{" "}
          <em>additional</em> set — but a flex is a skill that improves with
          practice, so a flexed-only series will show progress that is partly
          just you getting better at flexing. The relaxed set is the honest one.
        </p>

        <H3>5. The same clothing</H3>
        <p>
          Minimal and fitted, showing the waistline. Loose clothing conceals the
          exact region where change shows up first.
        </p>

        <H3>6. The same interval</H3>
        <p>
          Weekly is a good cadence for capture. It is a bad cadence for
          judgement.
        </p>

        <Callout title="Shoot weekly, compare monthly">
          <p>
            Real change over seven days is smaller than the variation from
            sleep, salt, carbohydrate intake and training soreness. Comparing
            this week to last week mostly measures noise, and the noise is
            demoralising in a way that has ended more diets than hunger has.
            Capture every week so you have the series, then compare against four
            to six weeks ago. That is where change becomes visible.
          </p>
        </Callout>

        <H2>Why this matters more for photo-scored apps</H2>
        <p>
          If you are using an app that assigns a{" "}
          <Link href="/guides/what-is-a-physique-score" className="underline hover:text-fg transition-colors">
            physique score
          </Link>{" "}
          to the photo, consistency stops being good practice and becomes the
          whole basis of the number. The model sees an image, not a body. Better
          light genuinely produces a better score without any change in you, and
          a different angle can cost several points. A scored series is only
          meaningful to the extent the conditions were identical.
        </p>

        <H2>Storing them so you actually keep them</H2>
        <p>
          Put them in one album, named by date. The most common failure is not
          bad photos, it is a series that stops after three weeks and a set of
          images scattered across a camera roll in no order. If you are six
          months in and want to see the change, you need the first one to still
          be findable.
        </p>
        <p className="mt-4">
          Dietly does this part automatically — the weekly scan keeps the series,
          scores it out of 100 across leanness, definition, symmetry, posture,
          body fat and potential, and names the weak point that the next week of
          training is then built around. The setup above still matters; the app
          cannot fix a photo taken under a different lamp.
        </p>

        <H2>What to pair them with</H2>
        <p>
          Photos are one input. Two others cost nothing and fail differently, so
          together they tell you more than any one alone: a morning bodyweight
          averaged across the week, and a waist measurement at the navel taken
          fortnightly. If all three point the same way, that is signal. If they
          disagree, the disagreement is usually water, and the answer is to wait
          another fortnight rather than to change the plan.
        </p>

        <Sources
          items={[
            {
              text: "Heymsfield SB, et al. Digital anthropometry: a critical review. Eur J Clin Nutr, 2018.",
              href: "https://pubmed.ncbi.nlm.nih.gov/30297758/",
            },
            {
              text: "Bhutani S, et al. Composition of two-week change in body weight under unrestricted free-living conditions. Physiol Rep, 2017.",
              href: "https://pubmed.ncbi.nlm.nih.gov/28904079/",
            },
          ]}
        />
      </GuidePage>
    </>
  );
}
