import { Metadata } from "next";
import Link from "next/link";
import GuidePage, { Callout, H2, Sources } from "../../components/guides/GuidePage";
import { guideMetadata } from "../../lib/guides";

export const metadata: Metadata = guideMetadata("progressive-overload");

export default function Page() {
  return (
    <GuidePage
      slug="progressive-overload"
      lede="Progressive overload is the requirement that training gets harder over time. It is not a technique or a programme — it is the reason any programme works, and the absence of it is the reason most training stops producing anything after the first few months."
    >
      <p>
        Muscle adapts to a demand it has not already met. Repeat the same
        session with the same weight for the same reps and you have given your
        body no reason to change, because it handled that demand last week. The
        stimulus has to keep outrunning your current capacity, and that is the
        whole of it.
      </p>
      <p>
        This is why two people can follow completely different splits — one
        doing{" "}
        <Link href="/workouts/push-pull-legs" className="underline hover:text-fg">
          push pull legs
        </Link>
        , one doing{" "}
        <Link href="/workouts/home-workout" className="underline hover:text-fg">
          bodyweight at home
        </Link>{" "}
        — and both grow, while a third person doing a more sophisticated
        programme than either gets nothing. The first two are adding something
        over time. The third is repeating themselves.
      </p>

      <H2>Five ways to overload, not one</H2>
      <p>
        Adding weight is the obvious one and the only one most people use, which
        is why they stall. Load is the most visible variable, not the only one.
      </p>
      <ol className="list-decimal pl-6 space-y-3 my-5">
        <li>
          <strong>More weight.</strong> Same sets and reps, heavier bar. The
          cleanest signal, and the one that runs out first.
        </li>
        <li>
          <strong>More reps.</strong> Same weight, one more rep than last time.
          This is the workhorse — most of the progression in a training year
          happens here, not in added plates.
        </li>
        <li>
          <strong>More sets.</strong> Three sets became four. Adds total volume
          without touching the load, and volume is strongly associated with
          growth up to a point.
        </li>
        <li>
          <strong>Better range or control.</strong> A deeper squat, a two-second
          lowering phase, a real pause at the chest. The same number on the bar
          becomes a harder set, and this is the one that makes a movement
          <em> safer</em> as it gets harder rather than less so.
        </li>
        <li>
          <strong>Less rest.</strong> The same work in less time. Use this
          sparingly — it raises difficulty by degrading performance, which is
          not the same as raising the stimulus.
        </li>
      </ol>
      <p>
        Bodyweight training has a sixth: <strong>leverage</strong>. A push-up
        becomes an{" "}
        <Link href="/exercises/archer-push-up" className="underline hover:text-fg">
          archer push-up
        </Link>{" "}
        becomes a one-arm push-up without a gram of added load. That ladder is
        why{" "}
        <Link href="/workouts/calisthenics-workout-plan" className="underline hover:text-fg">
          calisthenics
        </Link>{" "}
        progresses indefinitely despite having no plates.
      </p>

      <H2>Double progression, the method to actually use</H2>
      <p>
        Most people fail at this not from ignorance but from having no rule —
        they add weight when they feel strong and stay put when they do not,
        which averages out to standing still. Double progression removes the
        judgement call.
      </p>
      <Callout title="The rule">
        Pick a rep range, say 8–12. Add reps every session until you hit{" "}
        <strong>12 on every set</strong>. Then add the smallest available
        increment of weight and drop back to 8. Repeat. You are progressing
        reps, then load, then reps again — two variables, one rule, no decisions
        to make at the rack.
      </Callout>
      <p>
        The smallest increment matters more than people expect. Going up in 2.5
        kg jumps on an overhead press is a 5% increase that will stall inside a
        month; 1 kg microplates keep the same lift progressing for a year.
        Smaller jumps, more often, beats bigger jumps that fail.
      </p>

      <H2>How fast to add load</H2>
      <p>
        Slower than a beginner programme implies, and the rate falls off
        sharply. In the first few months a novice can add weight to the main
        lifts almost every session — that is real, and it is temporary. By the
        second year, adding 2.5 kg to a squat <em>per month</em> is good
        progress, and by the third, progress is measured over quarters.
      </p>
      <p>
        This deceleration is normal and is not a sign anything is wrong. It is
        the same curve as{" "}
        <Link href="/guides/how-long-to-build-muscle" className="underline hover:text-fg">
          muscle gain itself
        </Link>
        , for the same reason: you are closer to your ceiling than you were.
      </p>

      <H2>When the bar stops moving</H2>
      <p>
        A genuine stall is three or four sessions with no progress on any
        variable, not one bad day. When it happens, work through this order
        before changing the programme:
      </p>
      <ul className="list-disc pl-6 space-y-2.5 my-5">
        <li>
          <strong>Sleep and food first.</strong> A stall during a deficit or a
          run of five-hour nights is not a programming problem, and no
          rearrangement of sets will fix it. Check{" "}
          <Link href="/tdee-calculator" className="underline hover:text-fg">
            whether you are actually eating enough
          </Link>
          .
        </li>
        <li>
          <strong>Progress a different variable.</strong> If weight will not
          move, add a rep. If reps will not move, add a set. Stalling on load is
          not stalling on training.
        </li>
        <li>
          <strong>Deload.</strong> Two-thirds of the weight for a week. Fatigue
          masks fitness — you are frequently stronger than your last session
          suggested, and cannot demonstrate it while buried.
        </li>
        <li>
          <strong>Then change the exercise.</strong> A stalled barbell bench can
          become an incline press for six weeks and come back higher. Change the
          movement last, not first.
        </li>
      </ul>

      <H2>Why you have to write it down</H2>
      <p>
        Progressive overload requires knowing what you did last time, and nobody
        remembers accurately. Without a log you are guessing at the weight,
        which in practice means repeating whatever felt comfortable — the exact
        failure this principle exists to prevent.
      </p>
      <p>
        That is the entire argument for a training log, and it is why every app
        in{" "}
        <Link href="/best-workout-apps" className="underline hover:text-fg">
          the workout app category
        </Link>{" "}
        is built around one. Dietly Fit logs the sessions and adds the half that
        a logbook cannot: a weekly photo scored out of 100, so you can see
        whether the overload is producing the change you wanted, not just
        heavier numbers.
      </p>

      <Sources
        items={[
          {
            text: "Schoenfeld BJ, Ogborn D, Krieger JW. Dose-response relationship between weekly resistance training volume and increases in muscle mass: a systematic review and meta-analysis. J Sports Sci, 2017.",
            href: "https://pubmed.ncbi.nlm.nih.gov/27433992/",
          },
          {
            text: "Schoenfeld BJ, Grgic J, Ogborn D, Krieger JW. Strength and hypertrophy adaptations between low- vs. high-load resistance training: a systematic review and meta-analysis. J Strength Cond Res, 2017.",
            href: "https://pubmed.ncbi.nlm.nih.gov/28834797/",
          },
          {
            text: "Plotkin D, et al. Progressive overload without progressing load? The effects of load or repetition progression on muscular adaptations. PeerJ, 2022.",
            href: "https://pubmed.ncbi.nlm.nih.gov/36199287/",
          },
        ]}
      />
    </GuidePage>
  );
}
