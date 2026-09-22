import { Metadata } from "next";
import Link from "next/link";
import GuidePage, { Callout, H2, H3, Sources } from "../../components/guides/GuidePage";
import { guideMetadata } from "../../lib/guides";

export const metadata: Metadata = guideMetadata("training-around-a-weak-point");

export default function Page() {
  return (
    <GuidePage
      slug="training-around-a-weak-point"
      lede="A weak point is the muscle group that is visibly behind the rest of you, and bringing one up means deliberately giving it more work than everything else for a stretch of months. The hard part is not the training. It is choosing the right one, and then leaving the rest of the plan alone long enough for it to matter."
    >
      <p>
        Almost nobody develops evenly. Limb lengths, insertions, which muscles
        you recruit well, which exercises you happen to enjoy, and old injuries
        all push development in one direction. After a couple of years of
        general training, most people have something that is clearly lagging —
        and continuing to train everything equally will preserve that gap
        indefinitely, because equal effort maintains the existing ratio.
      </p>

      <H2>Finding the actual weak point</H2>
      <p>
        This is where most specialisation blocks fail, before a single set is
        performed. People pick the muscle they most want to be bigger rather
        than the one most holding the overall picture back, and those are
        frequently different. Three ways to decide honestly:
      </p>

      <H3>Relaxed photos from three angles</H3>
      <p>
        Front, side and back, relaxed, under consistent conditions — see our{" "}
        <Link href="/guides/progress-photos-guide" className="underline hover:text-fg transition-colors">
          guide to taking them properly
        </Link>
        . The back view is the one that decides it for most people, because it
        is the view you never see in a mirror and it is where lagging
        development is most obvious.
      </p>

      <H3>Ask someone who will tell you</H3>
      <p>
        A coach, or a training partner who has no incentive to be kind. Your own
        read on your physique is the least reliable one available; the thing you
        obsess over is often not the thing an outside eye notices first.
      </p>

      <H3>Use a scoring tool</H3>
      <p>
        A{" "}
        <Link href="/guides/what-is-a-physique-score" className="underline hover:text-fg transition-colors">
          physique score
        </Link>{" "}
        that breaks the result into components — and names one as the limiting
        factor — is doing precisely this job, and doing it the same way every
        week rather than according to mood. It is an estimate, and it is an
        estimate that does not flatter you, which is the useful property.
      </p>

      <Callout title="Symmetry beats size, visually">
        <p>
          A physique reads as impressive when it is proportional, not when one
          part is enormous. Adding to what is already your strongest area
          produces less visible change per unit of effort than the same work
          spent on the lagging one — and it widens the imbalance that was
          costing you in the first place. The boring answer is usually correct:
          train the part you like training least.
        </p>
      </Callout>

      <H2>How to prioritise without wrecking everything else</H2>

      <H3>Put it first</H3>
      <p>
        Train the weak point at the start of the session, when you are fresh,
        and ideally at the start of the week. Quality of effort on the first
        exercise is meaningfully higher than on the fifth, and over a block that
        difference compounds.
      </p>

      <H3>Raise its volume, and lower something else</H3>
      <p>
        Roughly 10–20 hard sets per muscle per week is the range where most of
        the evidence sits for growth. A specialisation block takes the weak
        point toward the top of that and pulls your strongest areas down toward
        the bottom — to maintenance, around a third to half of their usual
        volume. Muscle is maintained on far less work than it takes to build,
        so this costs less than it sounds.
      </p>
      <p className="mt-4">
        The part people get wrong is only doing the first half. Adding volume
        without subtracting any produces a week you cannot recover from, and
        recovery is where the adaptation actually happens.
      </p>

      <H3>Increase frequency before increasing sets</H3>
      <p>
        Twelve sets spread over two or three sessions generally beats twelve
        sets in one. More total quality work, less fatigue per session, and more
        frequent stimulus.
      </p>

      <H3>Change the exercises, not just the count</H3>
      <p>
        If a muscle is lagging, the exercises you have been using for it may be
        part of why. Try variations that load it in a different position,
        particularly at long muscle lengths, and pay attention to whether you
        can actually feel the target working — a lagging muscle is quite often
        one you recruit poorly rather than one you train too little.
      </p>

      <H2>How long to give it</H2>
      <p>
        Eight to twelve weeks minimum, and expect to run more than one block.
        Visible change in a single muscle group is measured in months, not
        weeks, and switching focus every three weeks because nothing has
        happened yet guarantees nothing ever will. Judge at the end of the block,
        from photos taken under the same conditions as the ones you started
        with.
      </p>
      <p className="mt-4">
        Nutrition sets the ceiling on what the block can return. In a meaningful
        deficit you are realistically maintaining rather than building, so a
        specialisation block is best spent at maintenance or in a slight surplus,
        with{" "}
        <Link href="/protein-calculator" className="underline hover:text-fg transition-colors">
          protein
        </Link>{" "}
        high.
      </p>

      <H2>Then re-check, and expect the answer to change</H2>
      <p>
        When the block ends, reassess from scratch. Bringing one area up
        frequently promotes something else into being the new limiting factor —
        which is not failure, it is the process working. The physique that
        results from four consecutive honest weak-point blocks is a different
        one from the physique that results from four years of training
        everything equally.
      </p>
      <p className="mt-4">
        This loop is what Dietly Fit automates: the weekly scan names the weak point,
        the following week is built around it with the equipment you have, and
        the next scan tells you whether it moved. The judgement above still
        applies — the app just removes the part where you have to make it about
        yourself.
      </p>

      <Sources
        items={[
          {
            text: "Schoenfeld BJ, et al. Dose-response relationship between weekly resistance training volume and increases in muscle mass. J Sports Sci, 2017.",
            href: "https://pubmed.ncbi.nlm.nih.gov/27433992/",
          },
          {
            text: "Schoenfeld BJ, et al. Effects of Resistance Training Frequency on Measures of Muscle Hypertrophy: A Systematic Review and Meta-Analysis. Sports Med, 2016.",
            href: "https://pubmed.ncbi.nlm.nih.gov/27102172/",
          },
          {
            text: "Bickel CS, et al. Exercise dosing to retain resistance training adaptations in young and older adults. Med Sci Sports Exerc, 2011.",
            href: "https://pubmed.ncbi.nlm.nih.gov/21131862/",
          },
        ]}
      />
    </GuidePage>
  );
}
