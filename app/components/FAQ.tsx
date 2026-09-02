/**
 * Four questions, all of them objections to installing.
 *
 * The old list ran to eight and answered things nobody asks before downloading
 * ("can I export my data?"). These are the four that stop an install: is the
 * score real, do I need a gym, is it another calorie app, and what does it
 * cost. Rendered as native <details> — no client JS for an accordion.
 *
 * The scan answer is deliberately not a claim. The app says the same thing on
 * every scan surface, and it is what keeps a physique score inside the App
 * Store's health rules.
 */

const faqs = [
  {
    q: "Is the Form Score actually accurate?",
    a: "It is an estimate from your photo and your answers, not a clinical measurement. Its value is consistency — shot the same way each week, it shows you change you cannot see in a mirror or on a scale.",
  },
  {
    q: "Do I need a gym?",
    a: "No. Tell Dietly what you have — bodyweight, a couple of dumbbells, or a full rack — and the plan is built for that. You can swap any movement for one that fits your kit.",
  },
  {
    q: "Is this just another calorie counter?",
    a: "No. The training plan is the product; food logging supports it. You can log a meal by photo, sentence or voice in a few seconds, but Dietly is built around what you do in the gym.",
  },
  {
    q: "What does it cost?",
    a: "Free to start. Dietly Pro unlocks unlimited scans, your full weekly plan, unlimited logging and the AI coach, and you can cancel any time from your Apple ID or Google Play settings.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section pt-0">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow">FAQ</p>
          <h2 className="h2 mt-5">Before you download.</h2>
        </div>

        <div className="mt-10 max-w-3xl divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-bold text-fg md:text-[17px]">
                {faq.q}
                <span
                  aria-hidden
                  className="shrink-0 text-xl leading-none font-normal text-accent-deep transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
