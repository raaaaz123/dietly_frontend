import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import WaterIntakeCalculator from "./WaterIntakeCalculator";

export const metadata: Metadata = toolMetadata("water-intake-calculator");

const FAQS = [
  {
    q: "How much water should I drink a day?",
    a: "A common starting point is about 35 ml per kg of bodyweight, which is roughly 2.6 L for a 75 kg adult. Add around 500 ml for each hour of sweaty exercise and another 500 ml in hot weather.",
  },
  {
    q: "Is 8 glasses a day right?",
    a: "Eight 250 ml glasses is 2 L, which is close to the European reference for women and a little under it for men. It is a reasonable floor for a small, inactive adult, and too little for a large person who trains.",
  },
  {
    q: "Do coffee and tea count?",
    a: "Yes. The mild diuretic effect of caffeine is smaller than the water in the drink, so coffee and tea still add to your daily intake for regular drinkers. Food counts too: around a fifth of most people's water comes from what they eat.",
  },
  {
    q: "How do I know if I am drinking enough?",
    a: "Pale yellow urine and rarely feeling thirsty are good everyday signs. Dark urine, headaches and feeling flat in the gym suggest you need more.",
  },
  {
    q: "Can you drink too much water?",
    a: "Yes, though it is rare. Drinking several litres in a short time, especially during long endurance events, can dilute blood sodium. Spread your water across the day and use an electrolyte drink for sessions over about 90 minutes.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("water-intake-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="water-intake-calculator"
        h1={
          <>
            Water Intake{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="How much water to drink each day, worked out from your bodyweight, your training and the heat, with the official reference figures alongside."
        widget={<WaterIntakeCalculator />}
      >
        <div>
          <H2>How the number is worked out</H2>
          <p>
            The calculator starts from <strong>35 ml per kg of bodyweight</strong>,
            a baseline widely used in clinical nutrition. It then adds about
            500 ml for each hour of exercise that makes you sweat, and another
            500 ml if it is hot. The result is what to drink, on top of the water
            already in your food.
          </p>
          <p>
            Next to it you will see the European Food Safety Authority reference:
            2.5 L of total water a day for men and 2.0 L for women, of which
            about 80% normally comes from drinks. If your number is far above
            that, it is because of your size or your training, not a mistake.
          </p>
        </div>

        <div>
          <H2>Water and training</H2>
          <p>
            Losing just 2% of your bodyweight in sweat measurably lowers strength
            and endurance. A simple check is to weigh yourself before and after a
            session: each kilogram lost is about a litre to replace, ideally
            within the next few hours.
          </p>
          <ul>
            <li>Drink a glass or two in the hour before you train.</li>
            <li>Sip through sessions that last longer than an hour.</li>
            <li>Add electrolytes for long or very sweaty sessions.</li>
          </ul>
        </div>

        <div>
          <H2>Easy ways to hit your target</H2>
          <ul>
            <li>Keep a bottle with you and know how many refills you need.</li>
            <li>Drink a glass with every meal.</li>
            <li>Eat water-rich foods: fruit, vegetables, soups and yoghurt.</li>
            <li>Front-load the day so you are not drinking a litre before bed.</li>
          </ul>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
