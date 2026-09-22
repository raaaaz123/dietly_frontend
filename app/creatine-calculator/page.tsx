import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import CreatineCalculator from "./CreatineCalculator";

export const metadata: Metadata = toolMetadata("creatine-calculator");

const FAQS = [
  {
    q: "How much creatine should I take per day?",
    a: "Roughly 0.03 grams per kilogram of bodyweight as a maintenance dose, which works out at 3 to 5 grams per day for most people — about 2.4 g for a 80 kg person at the low end of the range, and more for larger or more muscular people. The familiar flat 5 g recommendation is simply the top of that band rounded, and it is a perfectly reasonable default.",
  },
  {
    q: "Do I need a loading phase?",
    a: "No. Loading — about 0.3 g/kg/day, split into four servings, for five to seven days — saturates muscle creatine stores in roughly a week instead of roughly four. The end point is identical either way. Loading gets you there faster; skipping it avoids the stomach discomfort that the larger doses sometimes cause. Neither choice changes where you finish.",
  },
  {
    q: "Which form of creatine is best?",
    a: "Monohydrate. It is the form used in the overwhelming majority of the research, it is the cheapest, and no alternative form — hydrochloride, ethyl ester, buffered, liquid — has shown a reliable advantage over it in head-to-head work. Paying more here buys marketing, not results.",
  },
  {
    q: "When should I take it?",
    a: "Whenever you will remember to. Creatine works by saturating muscle stores over days and weeks, not by acting acutely, so the timing of any single dose is close to irrelevant. Consistency is what matters — a dose taken daily at an inconvenient time beats a perfectly timed dose you skip twice a week.",
  },
  {
    q: "Does creatine cause water retention or kidney problems?",
    a: "It draws water into muscle cells, which typically shows up as one to two kilograms of weight gain in the first weeks. That is intracellular water, not bloating, and it is part of how the supplement works. On kidneys: in people with healthy kidney function, long-term studies have not found harm at normal doses. It does raise serum creatinine slightly, which can look alarming on a blood test — tell your doctor you take it, so the result is read correctly. If you have existing kidney disease, ask first.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("creatine-calculator")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="creatine-calculator"
        h1={
          <>
            Creatine{" "}
            <span className="font-display italic text-accent font-light">Calculator</span>
          </>
        }
        intro="Your dose from your bodyweight, whether loading is worth the trouble, and what the evidence actually supports."
        widget={<CreatineCalculator />}
      >
        <div>
          <H2>What creatine does</H2>
          <p>
            Creatine is stored in muscle as phosphocreatine, where it donates a
            phosphate group to regenerate ATP — the molecule your cells spend to
            do work. That regeneration is the limiting factor in short, hard
            efforts, which is why supplementing it improves performance in
            repeated bouts lasting up to about 30 seconds: another rep or two on
            a set, a little more total work per session.
          </p>
          <p>
            The muscle it builds is downstream of that. Creatine does not
            directly cause growth; it lets you accumulate more training volume,
            and the volume causes the growth. Over months, that compounds into a
            measurable difference — typically an extra kilogram or two of lean
            mass over a training block compared with the same training without it.
          </p>
        </div>

        <div>
          <H2>The dose, and where it comes from</H2>
          <p>
            Maintenance scales loosely with lean mass, and the figure the
            literature converges on is{" "}
            <strong>0.03 g per kg of bodyweight per day</strong>. For most
            people that lands between 3 and 5 grams — which is why the flat
            5 g recommendation you see everywhere is a defensible default rather
            than a precise prescription. Larger and more muscular people sit at
            the top of the range; smaller people genuinely need less.
          </p>
          <p>
            A <strong>loading phase</strong> is 0.3 g/kg/day — around 20 to 25 g
            for most people — split into four servings across the day for five
            to seven days, then dropping to maintenance. It saturates stores in
            about a week rather than about four. That is the only thing it
            changes.
          </p>
        </div>

        <div>
          <H2>What it will not do</H2>
          <p>
            Creatine is not a fat loss aid, it does not substitute for protein
            or total calories, and it does not work for everyone — an estimated
            20 to 30% of people are &ldquo;non-responders&rdquo;, usually
            because their muscle creatine stores were already near saturation
            from a diet high in red meat and fish.
          </p>
          <p>
            The early weight gain is also worth understanding before it
            surprises you. One to two kilograms typically appears in the first
            few weeks, and it is water drawn into the muscle cell rather than
            fat. If you are tracking a fat loss phase on the scale, start
            creatine before the phase or after it, not in the middle of it,
            or the trend line will be unreadable for a fortnight.
          </p>
        </div>

        <div>
          <H2>Safety, briefly and accurately</H2>
          <p>
            Creatine monohydrate is among the most heavily studied supplements
            in sports nutrition, with trials running years in healthy adults and
            no established harm at normal doses. The two persistent myths are
            worth naming: it does not cause dehydration or cramping — the
            evidence points mildly the other way — and it does not damage
            healthy kidneys.
          </p>
          <p>
            One practical caveat: creatine raises serum creatinine, a marker
            used to estimate kidney function, without any change in the kidney
            itself. Tell whoever orders your blood work that you supplement,
            so a raised reading is interpreted correctly rather than
            investigated. If you have existing kidney disease, take medical
            advice before starting.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
