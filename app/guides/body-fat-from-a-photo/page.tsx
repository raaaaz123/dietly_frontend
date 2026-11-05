import { Metadata } from "next";
import Link from "next/link";
import GuidePage, { Callout, H2, Sources } from "../../components/guides/GuidePage";
import { guideMetadata } from "../../lib/guides";

export const metadata: Metadata = guideMetadata("body-fat-from-a-photo");

const L = "underline hover:text-fg";

const MEN = [
  ["6 to 9%", "Abs, obliques and veins on the lower stomach clearly visible. Muscle separation in the shoulders, arms and legs. Stage or photo-shoot lean, and hard to hold."],
  ["10 to 12%", "Abs clearly visible in normal light, a visible line down the side of the stomach, some vascularity in the arms. Lean and athletic."],
  ["13 to 15%", "Outline of the upper abs, especially when tensed. Shoulders and arms have shape but less separation. The common look of a fit, trained man."],
  ["16 to 20%", "No visible abs; a flat or slightly soft stomach. Muscle shape is there but smoothed over. Typical of men who train but do not diet."],
  ["21 to 25%", "Soft stomach and love handles, little definition anywhere. The waist starts to be wider than it looks in clothes."],
  ["26 to 30%+", "Rounded stomach that sticks out when relaxed, fat on the chest, back and face. Waist clearly wider than the hips."],
];

const WOMEN = [
  ["14 to 17%", "Visible abs and obliques, defined shoulders and arms, very little fat on the hips. Athlete or competition lean, and below what most women can hold healthily."],
  ["18 to 21%", "Some ab definition, a lean waist, visible muscle in the arms and legs. Fit and athletic."],
  ["22 to 25%", "Flat stomach without visible abs, some curve at the hips and thighs, soft muscle definition. Typical of women who train regularly."],
  ["26 to 30%", "Softer stomach and more fat at the hips, thighs and upper arms. Little visible muscle definition. Average for many adult women."],
  ["31 to 35%", "Rounder stomach and hips, more fat on the arms and back. The waist-to-height ratio usually passes 0.5 around here."],
  ["36%+", "Fat clearly visible across the stomach, hips, thighs and arms."],
];

function Table({ rows, label }: { rows: string[][]; label: string }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left text-[15px]">
        <caption className="sr-only">{label}</caption>
        <thead className="text-fg">
          <tr className="border-b border-border">
            <th className="py-2 pr-4 whitespace-nowrap">Body fat</th>
            <th className="py-2">What it looks like</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([pct, look]) => (
            <tr key={pct} className="border-b border-border align-top">
              <td className="py-2.5 pr-4 font-semibold text-fg whitespace-nowrap">{pct}</td>
              <td className="py-2.5">{look}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <GuidePage
      slug="body-fat-from-a-photo"
      lede="You can estimate body fat from a photo to within a few percentage points by comparing what you see with known ranges: whether abs are visible, how defined the shoulders and arms are, and where fat sits on the waist and hips. Below is what each range looks like for men and women, how far a photo estimate can be trusted, and the quick measurements that beat it."
    >
      <H2>Body fat percentage for men: what each range looks like</H2>
      <Table rows={MEN} label="Male body fat ranges and what they look like" />

      <H2>Body fat percentage for women: what each range looks like</H2>
      <p>
        Women carry about 6 to 10 percentage points more essential fat than men, so the same look sits at a
        higher number. Fat also gathers more at the hips and thighs, which makes the stomach a less reliable
        guide than it is for men.
      </p>
      <Table rows={WOMEN} label="Female body fat ranges and what they look like" />

      <H2>How accurate is a body fat estimate from a photo?</H2>
      <p>
        For most people a careful visual estimate lands within about 3 to 5 percentage points of a DEXA
        scan. That is close enough to tell 12% from 20%, and not close enough to tell 14% from 16%. Three
        things push a photo estimate off:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Lighting.</strong> Light from above makes anyone look several points leaner. Compare photos
          only in the same light.
        </li>
        <li>
          <strong>Muscle.</strong> More muscle makes the same fat look like less, so trained people are often
          guessed too lean, and people with little muscle too fat.
        </li>
        <li>
          <strong>Where you store fat.</strong> Someone who stores fat on the legs can have visible abs at a
          higher body fat than someone who stores it on the stomach.
        </li>
      </ul>
      <Callout title="The trick that makes photos useful">
        Do not chase the exact number. Take the same photo, in the same light, at the same time of day, every
        week. Whatever the error is, it stays roughly the same, so the change between photos is real even
        when the absolute number is a few points out.
      </Callout>

      <H2>Better ways to measure body fat at home</H2>
      <p>Each of these takes a minute and gives you a number to set against the photo.</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Tape measure (US Navy method).</strong> Neck and waist, plus hips for women, give an
          estimate within about 3 to 4 points of lab methods for most people. Our{" "}
          <Link href="/body-fat-calculator" className={L}>
            body fat calculator
          </Link>{" "}
          and{" "}
          <Link href="/army-body-fat-calculator" className={L}>
            army body fat calculator
          </Link>{" "}
          both use it.
        </li>
        <li>
          <strong>Waist-to-height ratio.</strong> Not a body fat number, but a waist above half your height
          means central fat worth losing, whatever the scale says. Check it with the{" "}
          <Link href="/waist-to-height-ratio-calculator" className={L}>
            waist-to-height calculator
          </Link>
          .
        </li>
        <li>
          <strong>Skinfold calipers.</strong> Accurate in practised hands, much less so on yourself.
        </li>
        <li>
          <strong>Smart scales (bioimpedance).</strong> Convenient, but the reading moves with hydration by
          several points. Use the weekly average, not a single morning.
        </li>
      </ul>
      <p>
        DEXA is the usual reference method and costs roughly $50 to $150 a scan in most cities. It is worth
        doing once if you want a firm starting point.
      </p>

      <H2>From a number to a plan</H2>
      <p>
        Once you know your range, the next step depends on muscle as much as fat. Above about 20% (men) or 30%
        (women), a steady calorie deficit with high protein and lifting is the priority. In the middle ranges
        with little muscle, building muscle while eating near maintenance usually changes the photo faster
        than dieting, which is the{" "}
        <Link href="/guides/body-recomposition" className={L}>
          body recomposition
        </Link>{" "}
        approach.
      </p>
      <p>
        Dietly Fit does the photo part for you: one scan a week gives a body fat estimate and a physique score
        out of 100, names the weak point, and builds the training week around it. How that rating works and
        where it falls short is covered in{" "}
        <Link href="/guides/rate-my-physique" className={L}>
          rate my physique
        </Link>
        , and what the{" "}
        <Link href="/ai-body-scan" className={L}>
          Dietly Fit AI body scan
        </Link>{" "}
        measures is on its own page. You can also get a{" "}
        <Link href="/physique-analyzer" className={L}>
          free physique score from a photo
        </Link>{" "}
        on the web. If your goal is visible abs, our guide on{" "}
        <Link href="/guides/how-to-get-abs" className={L}>
          how to get abs
        </Link>{" "}
        gives the body fat each stage needs and how long it takes.
      </p>

      <Sources
        items={[
          {
            text: "Hodgdon JA, Beckett MB. Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center, 1984.",
          },
          {
            text: "Jackson AS, Pollock ML. Generalized equations for predicting body density of men. British Journal of Nutrition, 1978.",
          },
          {
            text: "Majmudar MD, et al. Smartphone camera based assessment of adiposity: a validation study. npj Digital Medicine, 2022.",
          },
          {
            text: "Ashwell M, Gunn P, Gibson S. Waist-to-height ratio is a better screening tool than waist circumference and BMI for adult cardiometabolic risk factors. Obes Rev, 2012.",
            href: "https://pubmed.ncbi.nlm.nih.gov/22106927/",
          },
        ]}
      />
    </GuidePage>
  );
}
