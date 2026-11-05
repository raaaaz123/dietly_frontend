import { Metadata } from "next";
import Link from "next/link";
import GuidePage, { Callout, H2, H3, Sources } from "../../components/guides/GuidePage";
import { guideMetadata } from "../../lib/guides";

export const metadata: Metadata = guideMetadata("v-taper");

const L = "underline hover:text-fg";

export default function Page() {
  return (
    <GuidePage
      slug="v-taper"
      lede="A V-taper is an upper body that widens from a narrow waist to broad shoulders, and it is measured as the shoulder-to-waist ratio: shoulder circumference divided by waist circumference. Around 1.4 to 1.6 reads as a clear V-taper on most men, and around 1.3 to 1.45 on most women. You widen it in two directions at once: build the side delts and lats, and bring the waist in by losing fat."
    >
      <H2>What the shoulder-to-waist ratio is</H2>
      <p>
        Wrap a tape around the widest point of your shoulders, over the deltoids with your arms relaxed. Then measure
        your waist at the navel, standing relaxed after breathing out. Divide the first number by the second. A
        shoulder measurement of 120 cm over an 84 cm waist gives 1.43.
      </p>
      <p>
        The ratio matters more to how a physique looks than either number alone. A wide frame with a soft waist and a
        narrow frame with a lean one can share the same ratio and read almost identically in a photo. That is why
        physique scoring, including the symmetry and proportions reading in the{" "}
        <Link href="/ai-body-scan" className={L}>
          Dietly Fit AI body scan
        </Link>
        , looks at proportions rather than size.
      </p>

      <H2>What counts as a good shoulder-to-waist ratio</H2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-[14px] border-collapse">
          <thead>
            <tr className="border-b border-border text-left text-fg">
              <th className="py-2 pr-4">Ratio</th>
              <th className="py-2 pr-4">Men</th>
              <th className="py-2">Women</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-4 tabular-nums">Under 1.25</td>
              <td className="py-2 pr-4">Straight or soft through the middle</td>
              <td className="py-2">Typical untrained</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4 tabular-nums">1.25 to 1.4</td>
              <td className="py-2 pr-4">Typical, some shape</td>
              <td className="py-2">Defined, athletic shape</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4 tabular-nums">1.4 to 1.6</td>
              <td className="py-2 pr-4">Clear V-taper</td>
              <td className="py-2">Strong taper, typical of trained athletes</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 tabular-nums">Over 1.6</td>
              <td className="py-2 pr-4">Pronounced, often lean and trained for years</td>
              <td className="py-2">Rare</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        These bands are a working convention, not a medical standard. The popular &ldquo;golden ratio&rdquo; of 1.618,
        sometimes called the Adonis index, is a nice number with no special evidence behind it. Research on how people
        judge male bodies does find that a lower waist relative to the chest and shoulders is rated more highly, but
        it does not crown one exact figure. Use the ratio to track your own direction, not to chase a target someone
        picked for its decimals.
      </p>

      <H2>What actually sets your V-taper</H2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Frame.</strong> Clavicle length and hip width are set by your skeleton. You cannot change them, and
          they explain most of why two equally trained people look different.
        </li>
        <li>
          <strong>Side deltoids.</strong> The outer head of the shoulder is the muscle that adds width at the top.
        </li>
        <li>
          <strong>Lats.</strong> Well developed lats widen the upper back below the armpits and make the taper visible
          from the front as well as the back.
        </li>
        <li>
          <strong>Waist fat.</strong> For most people this is the biggest lever. Losing a few centimetres from the
          waist moves the ratio more than a year of shoulder work.
        </li>
        <li>
          <strong>Posture.</strong> Rounded shoulders narrow the frame in a photo. Standing tall adds visible width
          for free.
        </li>
      </ul>

      <H2>How to train for a V-taper</H2>
      <H3>Side delts: more volume than you think</H3>
      <p>
        Pressing trains mostly the front of the shoulder. The side delts need direct work, and they recover quickly, so
        they tolerate a lot of it: around 10 to 20 hard sets a week of{" "}
        <Link href="/exercises/dumbbell-lateral-raise" className={L}>
          dumbbell lateral raises
        </Link>{" "}
        or cable lateral raises, in the 12 to 20 rep range, spread over two or three sessions. An{" "}
        <Link href="/exercises/barbell-standing-military-press" className={L}>
          overhead press
        </Link>{" "}
        adds overall shoulder size alongside it.
      </p>
      <H3>Lats: vertical pulling with a full stretch</H3>
      <p>
        <Link href="/exercises/pull-up" className={L}>
          Pull-ups
        </Link>
        ,{" "}
        <Link href="/exercises/cable-wide-grip-lat-pulldown" className={L}>
          wide-grip pulldowns
        </Link>{" "}
        and{" "}
        <Link href="/exercises/cable-straight-arm-pulldown" className={L}>
          straight-arm pulldowns
        </Link>{" "}
        are the core. Let the arms go fully straight at the top of every rep. Rows such as the{" "}
        <Link href="/exercises/dumbbell-one-arm-bent-over-row" className={L}>
          one-arm dumbbell row
        </Link>{" "}
        add thickness and help posture. Aim for 10 to 20 sets a week for the back as a whole.
      </p>
      <H3>Rear delts and upper back: the posture half</H3>
      <p>
        <Link href="/exercises/band-face-pull" className={L}>
          Face pulls
        </Link>{" "}
        and rear delt raises pull the shoulders back, which widens the frame in every photo. Two or three sets in most
        upper-body sessions is enough.
      </p>
      <H3>Waist: do not try to train it smaller</H3>
      <p>
        No exercise shrinks the waist directly. Heavy oblique work with weights can thicken it slightly, so there is
        no need to load side bends. Keep core training to planks, leg raises and anti-rotation work, and let fat loss
        do the narrowing.
      </p>
      <p>
        Browse every option in the{" "}
        <Link href="/exercises/muscle/shoulders" className={L}>
          shoulder exercises
        </Link>{" "}
        and{" "}
        <Link href="/exercises/muscle/back" className={L}>
          back exercises
        </Link>{" "}
        hubs, each with a demo.
      </p>

      <Callout title="The fastest way to change your ratio">
        For anyone above roughly 18% body fat (men) or 28% (women), a fat loss phase moves the shoulder-to-waist ratio
        faster than any amount of shoulder training. Waist circumference falls first and fastest when you lose fat,
        while the shoulders keep their size if you keep training hard and eat enough protein. Work out a sensible
        target with the{" "}
        <Link href="/calorie-deficit-calculator" className={L}>
          calorie deficit calculator
        </Link>
        .
      </Callout>

      <H2>How long it takes</H2>
      <p>
        A fat loss phase of 8 to 12 weeks can move the waist by several centimetres and the ratio by 0.05 to 0.1. Side
        delt and lat growth is slower: a beginner might add 2 to 4 cm to shoulder circumference in the first year, and
        an experienced lifter far less. Our guide on{" "}
        <Link href="/guides/how-long-to-build-muscle" className={L}>
          how long it takes to build muscle
        </Link>{" "}
        gives realistic rates.
      </p>

      <H2>Tracking it</H2>
      <p>
        Measure shoulders and waist every two to four weeks, at the same time of day. Take a front photo in the same
        light at the same time, because the ratio you see in a photo is the one other people see. The{" "}
        <Link href="/physique-analyzer" className={L}>
          free physique analyzer
        </Link>{" "}
        scores a single photo, and the{" "}
        <Link href="/waist-to-height-ratio-calculator" className={L}>
          waist-to-height ratio calculator
        </Link>{" "}
        is the health side of the same waist measurement. If proportions are not your weakest area right now, our
        guide on{" "}
        <Link href="/guides/training-around-a-weak-point" className={L}>
          training around a weak point
        </Link>{" "}
        explains how to prioritise.
      </p>

      <Sources
        items={[
          {
            text: "Fan J, Dai W, Liu F, Wu J. Visual perception of male body attractiveness. Proceedings of the Royal Society B, 2005.",
          },
          {
            text: "Schoenfeld BJ, Ogborn D, Krieger JW. Dose-response relationship between weekly resistance training volume and increases in muscle mass: a systematic review and meta-analysis. Journal of Sports Sciences, 2017.",
          },
          {
            text: "World Health Organization. Waist circumference and waist-hip ratio: report of a WHO expert consultation. 2011.",
          },
        ]}
      />
    </GuidePage>
  );
}
