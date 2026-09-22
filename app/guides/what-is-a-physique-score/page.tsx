import { Metadata } from "next";
import Link from "next/link";
import GuidePage, { Callout, H2, H3, Sources } from "../../components/guides/GuidePage";
import { guideMetadata } from "../../lib/guides";

export const metadata: Metadata = guideMetadata("what-is-a-physique-score");

export default function Page() {
  return (
    <GuidePage
      slug="what-is-a-physique-score"
      lede="A physique score is a single number, usually out of 100, that rates how developed and how lean a body looks in a photograph. It is not a health measurement and it is not a body fat test — it is a way of turning something you normally judge by squinting in a mirror into a figure you can compare against last week's."
    >
      <p>
        The idea is older than the apps. Bodybuilding judging has always been a
        panel converting a visual impression into a placing, and physique
        categories in fitness competitions are scored on criteria — muscularity,
        conditioning, symmetry, presentation — that no tape measure captures.
        What has changed is that a phone camera and a model can now do a crude
        version of the same job weekly, for free, in a bathroom.
      </p>

      <H2>What a physique score is actually measuring</H2>
      <p>
        Most scoring systems, Dietly Fit&rsquo;s included, decompose the number into
        components rather than producing one opaque figure. The ones that matter
        visually are:
      </p>
      <ul className="list-disc pl-6 space-y-2.5 my-5">
        <li>
          <strong className="text-fg">Leanness</strong> — how much fat is
          covering the muscle. This dominates the score for most people, and it
          is the component that moves fastest.
        </li>
        <li>
          <strong className="text-fg">Definition</strong> — how visible the
          separation between muscle groups is, which is leanness and muscle
          development interacting.
        </li>
        <li>
          <strong className="text-fg">Symmetry</strong> — whether the two sides
          and the upper and lower body are developed proportionally.
        </li>
        <li>
          <strong className="text-fg">Posture</strong> — how you carry the
          structure, which changes the apparent result more than people expect.
        </li>
        <li>
          <strong className="text-fg">Body fat estimate</strong> — a percentage
          inferred from the image, with all the caveats below.
        </li>
        <li>
          <strong className="text-fg">Potential</strong> — an estimate of the
          ceiling your frame supports, which is context for the rest rather than
          a target.
        </li>
      </ul>
      <p>
        Breaking it up is the useful part. A single number tells you whether you
        went up or down. Components tell you <em>why</em>, and which one to
        spend the next eight weeks on.
      </p>

      <H2>How photo-based scoring works</H2>
      <p>
        A vision model is trained on images with known or expert-labelled
        characteristics, and learns the visual correlates of leanness and muscle
        development — the edges where a muscle belly meets fat, the shadows
        that appear at low body fat, the proportions between shoulder, waist and
        limb. Given a new photo it estimates where that image sits on the
        distribution it learned.
      </p>
      <p className="mt-4">
        Which tells you immediately where the errors come from. The model sees an
        image, not a body. Anything that changes the image without changing the
        body — light, angle, distance, lens, how recently you trained, how much
        water you are holding — moves the score.
      </p>

      <Callout title="The score is a measure of consistency, not precision">
        <p>
          The absolute number matters much less than whether it is produced the
          same way each time. A score of 71 does not mean anything in isolation
          and cannot be compared against a friend&rsquo;s 78 from a different app,
          a different room and a different camera. What it can do is tell you
          that your own 71 became a 74 over six weeks, under conditions you kept
          the same. That is the entire value proposition, and any tool claiming
          more than that is overselling.
        </p>
      </Callout>

      <H2>How it differs from the measurements you already know</H2>

      <H3>Versus BMI</H3>
      <p>
        BMI is weight over height squared. It has no way to ask what the weight
        is made of, which is why trained people routinely register as
        overweight on it. A physique score is looking at exactly the thing BMI
        is blind to — but it is an estimate from an image rather than an
        arithmetic fact about two measurements.
      </p>

      <H3>Versus body fat percentage</H3>
      <p>
        A body fat percentage from a{" "}
        <Link href="/body-fat-calculator" className="underline hover:text-fg transition-colors">
          tape measure
        </Link>{" "}
        or calipers is trying to quantify one specific tissue. A physique score
        is trying to describe an overall visual impression, of which leanness is
        the largest input but not the only one. Two people at an identical 15%
        can score quite differently, because one has more muscle underneath.
      </p>

      <H3>Versus a DEXA scan</H3>
      <p>
        DEXA is the reference standard here and nothing in this article competes
        with it. It resolves fat, lean tissue and bone mineral by region, with a
        precision error of roughly 1–2% between scans on the same machine. It
        also costs money, requires an appointment, and almost nobody does it
        monthly — which is the gap a weekly photo fills. Different jobs.
      </p>

      <H2>What a physique score cannot tell you</H2>
      <ul className="list-disc pl-6 space-y-2.5 my-5">
        <li>
          <strong className="text-fg">Anything about your health.</strong>{" "}
          Visceral fat, blood pressure, lipids, insulin sensitivity — none of it
          is visible in a photograph, and a high score is not a clean bill of
          health.
        </li>
        <li>
          <strong className="text-fg">How strong you are.</strong> The
          correlation is real but loose, and plenty of very strong people score
          moderately.
        </li>
        <li>
          <strong className="text-fg">Comparisons against other people.</strong>{" "}
          Different conditions produce different numbers for the same body.
        </li>
        <li>
          <strong className="text-fg">Short-term change.</strong> Day-to-day
          variation from water, sodium, carbohydrate intake and training
          soreness swamps any real change. Weekly is roughly the shortest
          interval where the signal beats the noise.
        </li>
      </ul>

      <H2>How to use one without it using you</H2>
      <p>
        Take the photo under conditions you can actually repeat — same room,
        same light, same time of day, same posture, ideally the morning before
        eating. Our{" "}
        <Link href="/guides/progress-photos-guide" className="underline hover:text-fg transition-colors">
          guide to progress photos
        </Link>{" "}
        is the mechanical version of that. Then judge the trend across four to
        six weeks rather than reacting to any single reading, and treat the
        named weak component as the instruction — it is the part of the output
        that actually changes what you do on Monday.
      </p>
      <p className="mt-4">
        One genuine caution. A number attached to your appearance, delivered
        weekly, is not a neutral thing for everyone. If tracking it starts
        driving how you feel about yourself rather than what you train, the
        right response is to stop scoring and talk to someone — this is a tool
        for programming, not a verdict on you.
      </p>

      <H2>How Dietly Fit does it</H2>
      <p>
        Dietly Fit scores one photo a week out of 100 across the six components
        above, names the single weak point holding the score back, and builds
        the following week of training around fixing it — with the equipment you
        actually have. The score exists to decide the plan. That is the only
        reason to compute it.
      </p>

      <Sources
        items={[
          {
            text: "Mifflin MD, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr, 1990.",
            href: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
          },
          {
            text: "Hangartner TN, et al. The Official Positions of the ISCD: acquisition of dual-energy X-ray absorptiometry body composition. J Clin Densitom, 2013.",
            href: "https://pubmed.ncbi.nlm.nih.gov/24183640/",
          },
          {
            text: "Hodgdon JA, Beckett MB. Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center, 1984.",
          },
        ]}
      />
    </GuidePage>
  );
}
