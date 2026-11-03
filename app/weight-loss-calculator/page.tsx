import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import WeightLossCalculator from "./WeightLossCalculator";

export const metadata: Metadata = toolMetadata("weight-loss-calculator");

const FAQS = [
  {
    q: "How long will it take to lose 10 kg?",
    a: "At 0.5 kg a week, about 20 weeks, or a little under five months. At 0.75 kg a week it is closer to 14 weeks. Most people lose faster in the first two weeks because of water and stored carbohydrate, then settle into the pace their deficit supports.",
  },
  {
    q: "How many calories should I eat to lose weight?",
    a: "Your maintenance calories minus a daily deficit. A deficit of about 550 kcal a day gives roughly 0.5 kg (1 lb) a week. The calculator works out your maintenance from your size, age and activity, then subtracts the deficit for the pace you choose.",
  },
  {
    q: "Why does the calorie target go down as I get closer to my goal?",
    a: "A lighter body burns less energy, so the same intake becomes a smaller deficit over time. If you never adjust, weight loss slows and eventually stops. The calculator shows the target near your goal so you know roughly where you will end up.",
  },
  {
    q: "What is a safe rate of weight loss?",
    a: "Most guidance puts it at 0.5 to 1 kg (1 to 2 lb) a week, and no more than about 1% of your bodyweight a week. Faster than that tends to cost muscle, which lowers your metabolism and makes the result harder to keep.",
  },
  {
    q: "Why is my real progress slower than the calculator says?",
    a: "Three usual reasons: portions are bigger than they look, activity estimates are optimistic, and daily water swings hide fat loss for a week or two at a time. Judge progress on a weekly average, not on one weigh-in.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("weight-loss-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="weight-loss-calculator"
        h1={
          <>
            Weight Loss{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="Enter your goal weight and a pace. You get the date you will reach it, the calories to eat each day, and how that number changes on the way down."
        widget={<WeightLossCalculator />}
      >
        <div>
          <H2>How the date is worked out</H2>
          <p>
            First the calculator estimates your <strong>maintenance calories</strong>,
            the amount you burn in a normal day. It uses the Mifflin-St Jeor
            equation for your resting burn, then multiplies it by your activity
            level. That is the number you would eat to stay exactly where you are.
          </p>
          <p>
            Then it takes the pace you picked. One kilogram of body fat holds
            roughly 7,700 kcal (about 3,500 kcal per pound), so losing 0.5 kg a
            week needs a deficit of about 550 kcal a day. The weight you want to
            lose divided by your weekly pace gives the number of weeks, and that
            gives the date.
          </p>
        </div>

        <div>
          <H2>Why your calories change on the way down</H2>
          <p>
            Most weight loss calculators give you one number and stop. The
            problem is that a lighter body burns less. Losing 10 kg typically
            lowers maintenance by 100 to 150 kcal a day, so a target that was a
            550 kcal deficit at the start is closer to 400 by the end, and
            progress slows.
          </p>
          <p>
            That is why the result shows two targets: what to eat now, and what
            to eat near your goal. Lower your intake gradually as you lose,
            rather than starting at the lowest number.
          </p>
        </div>

        <div>
          <H2>Choosing a pace</H2>
          <ul>
            <li>
              <strong>Slow (0.25 kg a week).</strong> Best when you are already
              fairly lean or want to keep building strength while you lose.
            </li>
            <li>
              <strong>Steady (0.5 kg a week).</strong> The pace most people can
              hold for months without feeling drained.
            </li>
            <li>
              <strong>Fast (0.75 kg a week).</strong> Works when you have more to
              lose, as long as protein stays high.
            </li>
            <li>
              <strong>Aggressive (1 kg a week).</strong> Only sensible for
              larger bodies, and only for a limited time.
            </li>
          </ul>
          <p>
            The calculator flags a pace above 1% of your bodyweight a week, and
            it will not set a target below 1,500 kcal for men or 1,200 kcal for
            women. If your numbers hit that floor, pick a slower pace.
          </p>
        </div>

        <div>
          <H2>Lose fat, not muscle</H2>
          <p>
            The scale cannot tell fat from muscle. Two habits protect the muscle
            you have while you diet: eat around 1.6 to 2.2 g of protein per kg of
            bodyweight, and keep lifting with the same weights. People who do
            both end up leaner at the same scale weight than people who only cut
            calories.
          </p>
          <p>
            Weigh yourself a few times a week and compare weekly averages. Daily
            weight swings by 1 to 2 kg with water and food, which can hide real
            progress for a week or more.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
