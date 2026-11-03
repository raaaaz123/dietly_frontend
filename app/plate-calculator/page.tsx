import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import PlateCalculator from "./PlateCalculator";

export const metadata: Metadata = toolMetadata("plate-calculator");

const FAQS = [
  {
    q: "How much does an Olympic barbell weigh?",
    a: "A men's Olympic bar weighs 20 kg (usually rounded to 45 lb in pound gyms), a women's bar 15 kg (35 lb). Technique and training bars are lighter, often 10 to 15 kg. If you are not sure, the weight is usually stamped on the end cap or sleeve.",
  },
  {
    q: "Do I count the collars?",
    a: "Spring clips weigh almost nothing and are normally left out. Competition collars weigh 2.5 kg each, so in a meet setting a 20 kg bar with collars is effectively 25 kg before you add a plate.",
  },
  {
    q: "What plates do I need for 100 kg?",
    a: "On a 20 kg bar, 40 kg per side: one 25, one 15. If your gym has no 15s, use one 20, one 10 and two 5s, or two 20s.",
  },
  {
    q: "What plates do I need for 225 lb?",
    a: "On a 45 lb bar, 90 lb per side: two 45 lb plates. That is why 225 is the classic 'two plates' bench and squat milestone.",
  },
  {
    q: "Why load the heaviest plates first?",
    a: "Heavy plates on the inside keep the load close to the hands and the bar balanced, and they are easier to strip. It is also how every gym and competition loads, so it is the order your training partners will expect.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("plate-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="plate-calculator"
        h1={
          <>
            Plate{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="Type the weight you want on the bar. See exactly which plates go on each side, in kilograms or pounds."
        widget={<PlateCalculator />}
      >
        <div>
          <H2>How to load a barbell</H2>
          <p>
            Take the total you want, subtract the bar, and halve what is left.
            That is the weight that goes on each side. Then fill it with the
            biggest plates that fit, working down to the small ones. For 100 kg
            on a 20 kg bar, that is 40 kg a side: a 25 and a 15.
          </p>
          <p>
            The calculator does the same thing with a standard plate set:
            25, 20, 15, 10, 5, 2.5 and 1.25 kg, or 45, 35, 25, 10, 5 and 2.5 lb.
            If the exact number cannot be made with those plates, it tells you
            the closest weight you can load.
          </p>
        </div>

        <div>
          <H2>Kilo plates vs pound plates</H2>
          <p>
            Kilo plates follow a colour code from weightlifting: red 25, blue 20,
            yellow 15, green 10, white 5. Pound plates are usually all black, so
            you read the number on the plate. A 20 kg plate is 44.1 lb, a little
            under a 45. That is why &ldquo;two plates&rdquo; a side means 100 kg
            with blue plates in one gym and 225 lb (102 kg) in another.
          </p>
        </div>

        <div>
          <H2>Making small jumps</H2>
          <p>
            The smallest standard jump on a kilo bar is 2.5 kg (two 1.25s), and
            on a pound bar it is 5 lb (two 2.5s). For presses and other small
            lifts that can be a big percentage. Fractional plates of 0.5 kg or
            1 lb let you keep adding weight every week instead of stalling.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
