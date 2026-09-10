import { EXERCISE_COUNT } from "../lib/site";

/**
 * What you get, once. No comparison table.
 *
 * Every line here is a thing the shipping app does — the catalogue count, the
 * machine scan, voice logging and the coach are all real screens. A landing
 * page that promises a feature the app doesn't have converts once and churns.
 *
 * Six tiles now rather than four. The two added are the ones the work since
 * the pivot produced and the page never mentioned: a session you can rewrite
 * by asking, and a score you can send to somebody. Both are shipping; neither
 * had a word on this site.
 */

const items = [
  {
    title: "The weekly scan",
    body: "One photo, scored out of 100, with your body-fat estimate and the weak point named. Rescan weekly and watch the trend.",
  },
  {
    title: "Ask for the session you want",
    body: "Type “I want to improve my glutes”, or “legs, but easy on my knees”, and the coach writes that session. It lands with sets, reps and rest, ready to run.",
  },
  {
    title: "Your whole week, openable",
    body: `Every day of the program is there, not just today. Guided sessions with a demo clip for every movement, from a catalogue of ${EXERCISE_COUNT} exercises.`,
  },
  {
    title: "Change any session, in a sentence",
    body: "Rack taken, shoulder sore, only forty minutes? Say so and the session is rewritten around it — and if you don't like the result, one tap puts it back.",
  },
  {
    title: "Point your camera at any machine",
    body: "Standing in front of an unlabelled piece of steel? Scan it and see the movements you can do on it.",
  },
  {
    title: "Food, in seconds",
    body: "Log a meal by photo, by sentence or by voice. Calories and macros set from your goal, not a generic number.",
  },
];


export default function Inside() {
  return (
    <section id="inside" className="section pt-0">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow">Inside the app</p>
          <h2 className="h2 mt-5">Training first. Food alongside it.</h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="card card-hover p-7">
              <h3 className="h3">{item.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-fg-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
