import { Metadata } from "next";
import Link from "next/link";
import GuidePage, { Callout, H2, Sources } from "../../components/guides/GuidePage";
import { guideMetadata } from "../../lib/guides";

export const metadata: Metadata = guideMetadata("rate-my-physique");

const L = "underline hover:text-fg";

export default function Page() {
  return (
    <GuidePage
      slug="rate-my-physique"
      lede="An AI physique rating is a score, usually out of 100 or 10, that an app gives your body from one or more photos. It is built from a handful of visual estimates: leanness, muscle development, proportions, symmetry and posture. It is useful as a trend you track every week, and much less useful as a single verdict."
    >
      <H2>What a physique rating is made of</H2>
      <p>
        Every rating app combines roughly the same parts, weighted differently. Knowing them tells you what
        a score can and cannot say.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Leanness.</strong> An estimate of body fat from visible definition: abs, the line of the
          obliques, separation in the shoulders and arms. This is the part photos read best.
        </li>
        <li>
          <strong>Muscle development.</strong> How much muscle you carry for your frame, judged from the
          size and shape of the chest, shoulders, arms, back and legs.
        </li>
        <li>
          <strong>Proportions.</strong> Ratios such as shoulder width to waist (the V-taper) and upper to
          lower body. These are fairly stable from photo to photo, so they are among the more reliable
          parts.
        </li>
        <li>
          <strong>Symmetry and posture.</strong> Left against right, and how you stand. Both are easily
          thrown off by the pose, which is why the photo setup matters so much.
        </li>
      </ul>
      <p>
        In Dietly Fit the overall Form Score is built from four of these (definition, leanness, symmetry and
        posture), and the lowest one is named as the thing to fix first. We explain the scoring in detail in{" "}
        <Link href="/guides/what-is-a-physique-score" className={L}>
          what a physique score is
        </Link>
        .
      </p>

      <H2>How accurate is an AI physique rating?</H2>
      <p>
        Honestly: good at large differences, weak at small ones. A vision model can tell a lean, muscular
        body from an untrained one almost every time. It struggles to tell 14% body fat from 16%, and it can
        move a few points between two photos of the same person taken in different light.
      </p>
      <p>
        The research on photo-based body composition backs this up. Smartphone image methods can track
        group averages close to lab methods like DEXA, but the error for any one person is several
        percentage points of body fat. None of the consumer rating apps publish independent validation, so
        treat any claim of 95% or 98% accuracy as marketing.
      </p>
      <Callout title="What this means in practice">
        A single score is a rough position. The same photo setup, repeated every week, is where the rating
        earns its keep: errors that come from the method stay roughly constant, so the change from week to
        week is real far more often than the absolute number is exact.
      </Callout>

      <H2>How to take a photo that gets an honest rating</H2>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <strong>Same light every time.</strong> Soft light from the front. Overhead light carves fake
          definition and side light exaggerates it; both inflate leanness.
        </li>
        <li>
          <strong>Same time of day.</strong> Morning, before eating. A big meal or a pump changes how you
          look more than a week of training does.
        </li>
        <li>
          <strong>Camera at chest height, about two metres away.</strong> Close, low or high angles distort
          proportions.
        </li>
        <li>
          <strong>Relaxed, natural stance.</strong> Do not flex or suck in unless the app asks you to. You
          want the photo to show the body you walk around in.
        </li>
        <li>
          <strong>Fitted clothing or shorts, and the same outfit each time.</strong>
        </li>
      </ol>
      <p>
        Our{" "}
        <Link href="/guides/progress-photos-guide" className={L}>
          progress photo guide
        </Link>{" "}
        covers the full setup, including how to make photos taken months apart comparable.
      </p>

      <H2>What a good physique score looks like</H2>
      <p>
        Scales differ between apps, so a number only means something against the same app. As a rough guide
        on a 100-point scale: under 50 usually means little visible muscle or a high body fat, 50 to 70 is a
        trained but not lean physique, 70 to 85 is lean and clearly muscular, and above 85 is rare outside
        people who have trained seriously for years and are dieted down.
      </p>
      <p>
        The more useful question is not &ldquo;is my score good?&rdquo; but &ldquo;which part is holding it
        down?&rdquo; Two people with the same 62 can need opposite things: one needs to lose fat, the other
        needs to build muscle and should not be dieting at all. If that second description sounds familiar,
        read about{" "}
        <Link href="/guides/skinny-fat" className={L}>
          being skinny fat
        </Link>
        .
      </p>

      <H2>What no physique rating can see</H2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Strength and fitness.</strong> A photo says nothing about what you can lift or how far you
          can run. That is why Dietly Fit ranks each muscle from your logged lifts as well as the scan.
        </li>
        <li>
          <strong>Health.</strong> Blood pressure, blood markers and visceral fat do not show in a photo. A
          high score is not a clean bill of health.
        </li>
        <li>
          <strong>Water and pump.</strong> Salt, carbs and training can change how lean you look by the hour.
        </li>
        <li>
          <strong>Your goal.</strong> A powerlifter and a physique competitor want different bodies. A rating
          has one idea of good; you may have another.
        </li>
      </ul>

      <H2>Using a rating to actually change your physique</H2>
      <p>
        A rating on its own changes nothing. It becomes useful when it decides what you do next. Take one
        photo a week with the same setup, look at the lowest part of the score, and point your training and
        diet at it for the next month. If leanness is lowest, use the{" "}
        <Link href="/calorie-deficit-calculator" className={L}>
          calorie deficit calculator
        </Link>{" "}
        and keep protein high. If muscle development or a specific area is lowest, train that area two or
        three times a week with{" "}
        <Link href="/guides/progressive-overload" className={L}>
          progressive overload
        </Link>
        .
      </p>
      <p>
        That loop is what Dietly Fit automates: one photo a week, scored out of 100, the weak point named,
        and the training week built around it. Rescan the next week and see whether it moved. If you are
        comparing apps that do this, our{" "}
        <Link href="/best-ai-body-scan-apps" className={L}>
          roundup of AI body scan apps
        </Link>{" "}
        lists what each one measures and charges.
      </p>
      <p>
        To see a rating before installing anything, the{" "}
        <Link href="/physique-analyzer" className={L}>
          free AI physique analyzer
        </Link>{" "}
        scores one photo out of 100 and names the weak point, with no account. What the full{" "}
        <Link href="/ai-body-scan" className={L}>
          Dietly Fit AI body scan
        </Link>{" "}
        measures, and how it handles your photos, is on its own page. The proportions part of the score is
        covered in depth in our guide to the{" "}
        <Link href="/guides/v-taper" className={L}>
          V-taper and shoulder-to-waist ratio
        </Link>
        .
      </p>

      <Sources
        items={[
          {
            text: "Majmudar MD, et al. Smartphone camera based assessment of adiposity: a validation study. npj Digital Medicine, 2022.",
          },
          {
            text: "Shepherd JA, Ng BK, Sommer MJ, Heymsfield SB. Body composition by DXA. Bone, 2017.",
          },
        ]}
      />
    </GuidePage>
  );
}
