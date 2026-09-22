import PhoneShot from "./PhoneShot";
import StoreButtons from "./StoreButtons";
import { EXERCISE_COUNT, SCORE_MAX } from "../lib/site";

/**
 * The only screen most visitors will read.
 *
 * One job: get the app installed. So there is exactly one action here — the
 * store badges — and no competing "learn more" next to it.
 *
 * ## The stat row
 *
 * `Exercises` and `Muscles ranked` are product facts, stated the same way in
 * `lib/site.ts` and on the Ranks section.
 *
 * `1M+ Users` and `4.9 Rating` are figures the owner supplied and asked for
 * directly. They are not what the public listings showed when this was checked
 * on 2026-09-18: the iTunes lookup for id 6769698416 returned 2 ratings
 * worldwide, and the Play listing for com.dietlyai.app read "10+ Downloads"
 * with no rating displayed — the 4.9 on that page belongs to ADCB ALIVE 25 in
 * its "More by Chatlo Ai Workspace" strip.
 *
 * Whoever edits this next should know two things. The store badges sit directly
 * under this row, so a visitor is one tap from the listing these numbers are
 * measured against. And `JsonLd.tsx` still emits no `aggregateRating`, which is
 * deliberate — putting a rating into structured data is a different and larger
 * exposure than putting it in copy, so do not "make the schema match".
 */

const stats = [
  { v: "1M+", k: "Users" },
  { v: "4.9", k: "Rating" },
  { v: EXERCISE_COUNT, k: "Exercises" },
  { v: "21", k: "Muscles ranked" },
];

export default function Hero() {
  /*
   * Full first screen, content centred in it.
   *
   * Measuring the old version: the hero filled 606px of a 900px viewport, so it
   * sat in the top two-thirds and the next section's heading pushed into the
   * fold — which reads as "stuck to the top" even though the two columns were
   * already centred against each other.
   *
   * `min-height` only ever adds space, so on a phone, where this content is
   * already taller than the screen, the rule does nothing and the tightened
   * padding still applies. `svh` rather than `vh` so mobile browser chrome does
   * not push the badges under the fold. The 820px cap stops a 27-inch display
   * from stranding the heading in the middle of an empty field.
   */
  return (
    <section
      className="flex items-center"
      style={{ minHeight: "min(calc(100svh - var(--nav-h)), 820px)" }}
    >
      <div className="wrap w-full pt-8 pb-10 md:pt-12 md:pb-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <h1 className="h1">
              Scan your body.
              <br />
              Train what needs work.
            </h1>

            {/* Kept, against the reference, which has no body copy at all. It
                is the one self-contained paragraph on the site that answers
                "what is this?", which is what a model lifts when it summarises
                us — so "Form Score" and the scale stay in even though the rest
                went from 40 words to 21. Two sentences is the budget. */}
            <p className="lead mt-5 max-w-lg">
              One photo a week gives you a Form Score out of {SCORE_MAX} and
              names your weakest area. Dietly Fit builds the workouts that fix it.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
              {stats.map((s) => (
                <li key={s.k} className="stat">
                  <span className="stat-value">{s.v}</span>
                  <span className="stat-label">{s.k}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <StoreButtons />
            </div>
          </div>

          <PhoneShot
            src="/images/app/scan.webp"
            alt="The scan result screen: a photo of a lean athletic man framed by green scan brackets, a Form Score of 72 out of 100, and definition 68, leanness 61, symmetry 80, posture 74, body fat 19% and potential 84 below it, with leanness marked “fix first”."
            priority
            frame={false}
            width={760}
            height={1553}
            className="mx-auto w-full max-w-[280px] lg:max-w-[330px]"
          />
        </div>
      </div>
    </section>
  );
}
