/**
 * The loop, in three steps.
 *
 * Scan → score → train, then back to scan. It is the whole product and the
 * reason anyone comes back, so it is the only explanatory section on the page.
 */

const steps = [
  {
    n: "01",
    title: "Take one photo",
    body: "A few seconds, once a week. Dietly scores it out of 100 and estimates your body fat and the ceiling you can reach.",
  },
  {
    n: "02",
    title: "See what's holding it back",
    body: "The score comes with the weak area named — not just a number to feel something about.",
  },
  {
    n: "03",
    title: "Train the thing it found",
    body: "A full week of sessions built around that weak point, your goal and the kit you actually have. Rescan next week and watch it move.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="h2 mt-5">
            A number that means something, and a plan that moves it.
          </h2>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map((step) => (
            <li key={step.n} className="card card-hover p-7">
              <span className="font-mono text-[13px] font-semibold text-accent-deep">
                {step.n}
              </span>
              <h3 className="h3 mt-4">{step.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-fg-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
