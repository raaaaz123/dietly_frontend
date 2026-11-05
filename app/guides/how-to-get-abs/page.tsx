import { Metadata } from "next";
import Link from "next/link";
import GuidePage, { Callout, H2, H3, Sources } from "../../components/guides/GuidePage";
import { guideMetadata } from "../../lib/guides";

export const metadata: Metadata = guideMetadata("how-to-get-abs");

const L = "underline hover:text-fg";

export default function Page() {
  return (
    <GuidePage
      slug="how-to-get-abs"
      lede="Visible abs come mostly from low body fat, not from ab exercises. Most men start to see an outline of the upper abs around 15% body fat and a clear six-pack around 10 to 12%; most women see definition around 20 to 22% and clear abs around 16 to 19%. Getting there means a calorie deficit with high protein, plus direct ab training two or three times a week so there is muscle to reveal."
    >
      <H2>Why everyone has abs, and few people can see them</H2>
      <p>
        The rectus abdominis, the six-pack muscle, is present in everyone. Its segmented look comes from bands of
        connective tissue across it, and those are there whether you train or not. What hides it is the layer of fat
        between the muscle and the skin. So the main question is not &ldquo;how do I build abs&rdquo; but &ldquo;how low
        does my body fat need to be for mine to show&rdquo;.
      </p>
      <p>
        A controlled trial put this to the test: six weeks of daily ab exercises with no change in diet produced no
        measurable reduction in belly fat. The muscle got stronger; the waist did not get leaner. Spot reduction does
        not work, so crunches alone will not reveal anything.
      </p>

      <H2>The body fat percentage you need to see abs</H2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-[14px] border-collapse">
          <thead>
            <tr className="border-b border-border text-left text-fg">
              <th className="py-2 pr-4">What you see</th>
              <th className="py-2 pr-4">Men</th>
              <th className="py-2">Women</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Flat stomach, no lines</td>
              <td className="py-2 pr-4 tabular-nums">18 to 20%</td>
              <td className="py-2 tabular-nums">25 to 28%</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Faint upper abs, outline in good light</td>
              <td className="py-2 pr-4 tabular-nums">14 to 16%</td>
              <td className="py-2 tabular-nums">20 to 23%</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-4">Clear four to six-pack</td>
              <td className="py-2 pr-4 tabular-nums">10 to 12%</td>
              <td className="py-2 tabular-nums">16 to 19%</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Sharp, lower abs visible</td>
              <td className="py-2 pr-4 tabular-nums">8 to 10%</td>
              <td className="py-2 tabular-nums">14 to 16%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        These are typical ranges, and individuals vary a lot. Where your body stores fat matters: many men hold the last
        of it on the lower belly, many women on the hips and thighs. Muscle size matters too, because thicker abs show
        through a little more fat. Our guide to{" "}
        <Link href="/guides/body-fat-from-a-photo" className={L}>
          estimating body fat from a photo
        </Link>{" "}
        shows what each range looks like, and the{" "}
        <Link href="/body-fat-calculator" className={L}>
          body fat calculator
        </Link>{" "}
        gives a tape-measure estimate.
      </p>
      <Callout title="Be careful at the low end">
        Below roughly 8% for men and 14% for women, many people feel tired, cold and hungry, train worse and sleep
        worse, and women can lose their periods. Those levels are fine for a photoshoot or a competition, not as a
        year-round target. A clear six-pack at 10 to 12% (men) or 16 to 19% (women) is sustainable for most people.
      </Callout>

      <H2>How long it takes to get abs</H2>
      <p>
        Work it out from where you are now. A sustainable fat loss rate is about 0.5 to 1% of bodyweight a week. Each
        percentage point of body fat is roughly 0.8 to 1 kg of fat for an average-sized adult. So a man at 20% body
        fat aiming for 12% needs to lose around 7 kg of fat, which at 0.5 kg a week is about 14 weeks, and longer if
        progress stalls. Someone at 15% might need 6 to 8 weeks. The{" "}
        <Link href="/weight-loss-calculator" className={L}>
          weight loss calculator
        </Link>{" "}
        will give you a date.
      </p>

      <H2>Diet: the part that reveals them</H2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>A moderate deficit.</strong> Around 300 to 500 calories under maintenance. Bigger deficits cost
          muscle and are hard to hold. The{" "}
          <Link href="/calorie-deficit-calculator" className={L}>
            calorie deficit calculator
          </Link>{" "}
          sets one from your numbers.
        </li>
        <li>
          <strong>High protein.</strong> 1.6 to 2.2 g per kg of bodyweight a day keeps the muscle you are trying to show
          off. Get your number from the{" "}
          <Link href="/protein-calculator" className={L}>
            protein calculator
          </Link>
          .
        </li>
        <li>
          <strong>Consistency over cleverness.</strong> No food burns belly fat and no meal timing beats a steady weekly
          deficit.
        </li>
      </ul>

      <H2>Training: the part that gives them shape</H2>
      <H3>Keep lifting</H3>
      <p>
        Heavy compound training through a diet is what keeps muscle while fat comes off. Dropping weights for cardio
        is how people end up lighter but softer, the pattern behind{" "}
        <Link href="/guides/skinny-fat" className={L}>
          skinny fat
        </Link>
        .
      </p>
      <H3>Train the abs like any other muscle</H3>
      <p>
        Two or three sessions a week, 6 to 10 hard sets in total, with progressive load. Pick one movement that flexes
        the spine against resistance, one that curls the pelvis up, and one that resists movement:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Link href="/exercises/hanging-straight-leg-raise" className={L}>
            Hanging leg raises
          </Link>{" "}
          for the lower part of the rectus abdominis and the hip flexors.
        </li>
        <li>Cable or weighted crunches, 8 to 15 reps, so the muscle thickens and shows through more fat.</li>
        <li>
          <Link href="/exercises/front-plank" className={L}>
            Planks
          </Link>{" "}
          and anti-rotation work for a stable trunk under heavy lifts.
        </li>
      </ul>
      <p>
        The full list, with a demo for each, is in the{" "}
        <Link href="/exercises/muscle/abs" className={L}>
          ab exercises
        </Link>{" "}
        hub.
      </p>
      <H3>Cardio is a tool, not a requirement</H3>
      <p>
        Walking 8,000 to 10,000 steps a day adds a few hundred calories of burn without hurting recovery. Hard cardio
        is optional; the deficit can come from food alone.
      </p>

      <H2>Tracking progress honestly</H2>
      <p>
        The scale moves with water and food in your gut, and abs appear slowly from the top down, so weekly changes are
        hard to see in the mirror. Measure your waist at the navel each week and take a photo in the same light.
        Waist going down while strength holds means it is working. The{" "}
        <Link href="/physique-analyzer" className={L}>
          free physique analyzer
        </Link>{" "}
        scores a photo for leanness and definition, and the{" "}
        <Link href="/ai-body-scan" className={L}>
          Dietly Fit body scan
        </Link>{" "}
        tracks those scores week by week.
      </p>

      <Sources
        items={[
          {
            text: "Vispute SS, Smith JD, LeCheminant JD, Hurley KS. The effect of abdominal exercise on abdominal fat. Journal of Strength and Conditioning Research, 2011.",
          },
          {
            text: "Helms ER, Aragon AA, Fitschen PJ. Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation. Journal of the International Society of Sports Nutrition, 2014.",
          },
          {
            text: "Gallagher D, et al. Healthy percentage body fat ranges: an approach for developing guidelines based on body mass index. American Journal of Clinical Nutrition, 2000.",
          },
          {
            text: "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength. British Journal of Sports Medicine, 2018.",
          },
        ]}
      />
    </GuidePage>
  );
}
