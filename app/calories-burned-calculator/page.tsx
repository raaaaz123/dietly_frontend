import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import { ACTIVITIES, COMPENDIUM_EDITION } from "../lib/activities";
import CaloriesBurnedCalculator from "./CaloriesBurnedCalculator";

export const metadata: Metadata = toolMetadata("calories-burned-calculator");

const FAQS = [
  {
    q: "How many calories does walking burn?",
    a: "At a moderate 4.8 km/h (3 mph) pace, walking is about 3.5 METs, which works out to roughly 220 kcal per hour for a 75 kg person. Pace changes it substantially: a slow stroll is nearer 175 kcal per hour at the same bodyweight, a brisk 5.6 km/h walk about 270, and walking uphill at that speed around 380. Bodyweight scales the whole thing proportionally.",
  },
  {
    q: "How many calories do 10,000 steps burn?",
    a: "Somewhere around 300 to 450 kcal for most people, and the width of that range is the honest answer. Step-to-calorie conversions depend on stride length, which varies by more than 20% between individuals, and on pace, which a step count does not record at all. Use the figure as an order of magnitude, not a number to eat back.",
  },
  {
    q: "Where do MET values come from?",
    a: `From the Compendium of Physical Activities — this calculator uses the ${COMPENDIUM_EDITION} — which is the reference almost every calorie calculator on the internet is ultimately quoting, whether or not it says so. One MET is defined as the energy cost of sitting quietly, about 3.5 ml of oxygen per kilogram per minute, and every activity is expressed as a multiple of that.`,
  },
  {
    q: "Why is the number here lower than my smartwatch says?",
    a: "Usually because the two are measuring different things. Most wearables report gross calories including your resting metabolism, use proprietary heart-rate models, and are generally optimistic — independent validation studies routinely find errors of 20 to 30%, almost always in the direction of overestimation. This page shows both the gross figure and the net one so you can see exactly what is being counted.",
  },
  {
    q: "Should I eat back the calories I burn?",
    a: "Generally not all of them, and often not any. Your activity level is usually already built into the maintenance figure a TDEE calculator gives you, so eating back exercise calories on top double-counts them. Exercise energy expenditure is also the least precisely measured quantity in the whole equation — if you are going to be wrong somewhere, be wrong on the side that still leaves a deficit.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("calories-burned-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="calories-burned-calculator"
        h1={
          <>
            Calories Burned{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro={`${ACTIVITIES.length} activities, each using a published MET value you can trace — with both the flattering number and the honest one.`}
        widget={<CaloriesBurnedCalculator />}
      >
        <div>
          <H2>How the calculation works</H2>
          <p>
            Every figure here comes from one equation:{" "}
            <strong>kcal = MET × 3.5 × weight(kg) / 200 × minutes</strong>.
          </p>
          <p>
            A <strong>MET</strong>, or metabolic equivalent of task, expresses
            an activity&rsquo;s energy cost as a multiple of sitting quietly.
            One MET is defined as about 3.5 millilitres of oxygen per kilogram
            of bodyweight per minute; running at 10 km/h is about 9.8 METs,
            meaning it costs roughly ten times as much energy per minute as
            sitting still. The rest of the equation just converts oxygen
            consumption into calories and scales by your bodyweight and the time
            you spent.
          </p>
        </div>

        <div>
          <H2>Where our MET values come from</H2>
          <p>
            All {ACTIVITIES.length} values are read from the{" "}
            <strong>{COMPENDIUM_EDITION}</strong> (Ainsworth et al.), which is
            the reference that virtually every calorie-burned calculator on the
            internet is ultimately quoting — though very few of them say so, and
            fewer still let you check.
          </p>
          <p>
            We store the Compendium&rsquo;s own activity code alongside each
            value in the source, so any number this page produces can be traced
            back to the published table rather than taken on our word. A MET
            value with no source is a number nobody can check, and this
            category of page is full of them.
          </p>
        </div>

        <div>
          <H2>Gross and net — why we show both</H2>
          <p>
            The large number most calculators display is{" "}
            <strong>gross</strong> energy expenditure: everything your body
            spent during those minutes, including the calories you would have
            burned anyway just by being alive. If you walk for an hour, a
            meaningful slice of that total was never attributable to the walk.
          </p>
          <p>
            The <strong>net</strong> figure subtracts a 1 MET baseline, and it
            is the number that matters if you are thinking about eating any of
            it back. For low-intensity activity the gap is large — at 3.5 METs,
            nearly 30% of the gross figure is just your resting metabolism
            wearing walking shoes. For hard training the gap narrows.
          </p>
        </div>

        <div>
          <H2>How much to trust any of this</H2>
          <p>
            A MET value is a population average, derived from measurements on
            groups of people, and it knows nothing about you specifically. It
            does not account for your fitness, your movement efficiency, terrain,
            temperature, wind, or the load you are carrying. Worse for anyone
            tracking progress: trained people are <em>more efficient</em> at the
            same task, so the fitter you get, the more these figures overstate
            what you actually spent.
          </p>
          <p>
            Wearables are not the fix. Independent validation work consistently
            finds consumer devices off by 20 to 30% on energy expenditure, and
            nearly always in the optimistic direction. Treat every number in
            this category — ours included — as an order of magnitude that is
            useful for comparing activities against each other, and unreliable
            as a budget.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
