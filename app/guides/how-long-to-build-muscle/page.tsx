import { Metadata } from "next";
import Link from "next/link";
import GuidePage, { Callout, H2, Sources } from "../../components/guides/GuidePage";
import { guideMetadata } from "../../lib/guides";

export const metadata: Metadata = guideMetadata("how-long-to-build-muscle");

export default function Page() {
  return (
    <GuidePage
      slug="how-long-to-build-muscle"
      lede="A well-trained beginner can expect roughly 0.5–1 kg of muscle per month in the first year, about half that in the second, and less again after. Those numbers sound small, and they are the reason most people quit before the work pays — a year of near-best-case progress is about 8 kg of muscle, which changes a physique completely and is invisible week to week."
    >
      <p>
        There is a well-known set of rate estimates from the coach Alan Aragon,
        widely cited because nothing better has replaced it and because it
        matches what the research broadly shows. Expressed as a share of
        bodyweight per month, for men:
      </p>
      <div className="my-6 rounded-2xl border border-border overflow-hidden">
        {[
          ["Year 1", "1–1.5% of bodyweight per month", "≈ 0.8–1.2 kg/month at 80 kg"],
          ["Year 2", "0.5–1% per month", "≈ 0.4–0.8 kg/month"],
          ["Year 3", "0.25–0.5% per month", "≈ 0.2–0.4 kg/month"],
          ["Year 4+", "Under 0.25% per month", "Measured over a year, not a month"],
        ].map(([a, b, c], i) => (
          <div
            key={a}
            className={`p-4 bg-bg-elevated ${i > 0 ? "border-t border-border" : ""}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-[15px] font-bold text-fg">{a}</span>
              <span className="text-[14px] text-fg-muted">{b}</span>
            </div>
            <p className="mt-1 text-[13px] text-fg-faint">{c}</p>
          </div>
        ))}
      </div>
      <p>
        Women should expect roughly half these rates in absolute kilograms,
        largely because of lower total testosterone and lower starting lean
        mass. As a <em>proportion</em> of existing muscle the difference is much
        smaller, and the training that produces it is identical.
      </p>

      <Callout title="The number that reframes everything">
        Best case, year one, is about 1 kg of muscle a month — which is 33
        grams a day. There is no day on which you can see 33 grams. This is why
        the mirror is useless as a daily instrument and why almost everyone
        concludes nothing is happening somewhere around week three.
      </Callout>

      <H2>Newbie gains are real, and they are a one-off</H2>
      <p>
        The first six to twelve months genuinely are different. An untrained
        body responds to almost any consistent resistance training with rapid
        adaptation, and a beginner can add muscle while losing fat at the same
        time — a{" "}
        <Link href="/guides/body-recomposition" className="underline hover:text-fg">
          recomposition
        </Link>{" "}
        that becomes much harder later.
      </p>
      <p>
        Two things are worth knowing about that window. It does not come back —
        you get one, and a poorly-run first year spends it. And a large part of
        early strength gain is <strong>neural</strong>, not muscular: you are
        learning to recruit what you already have. That is why strength climbs
        much faster than size early on, and why adding 30 kg to a squat in four
        months does not mean 30 kg of new muscle.
      </p>

      <H2>When you will actually see it</H2>
      <p>
        Roughly, and assuming training and food are both right:
      </p>
      <ul className="list-disc pl-6 space-y-2.5 my-5">
        <li>
          <strong>Weeks 1–3:</strong> nothing visible. You will feel pumped
          after sessions and mistake it for growth; it is fluid and it goes.
        </li>
        <li>
          <strong>Weeks 4–8:</strong> strength climbs noticeably. Still nothing
          in the mirror. This is where most people stop, and it is the single
          worst point at which to.
        </li>
        <li>
          <strong>Months 3–4:</strong> the first visible change, usually
          shoulders and upper back — posture reads different in clothes before
          anything reads different out of them.
        </li>
        <li>
          <strong>Months 6–12:</strong> people who have not seen you for a while
          comment. This is the real marker, because they are comparing against a
          memory rather than against yesterday.
        </li>
      </ul>
      <p>
        Note that the first <em>visible</em> change is often fat loss rather
        than muscle gain, which is worth expecting so it is not mistaken for the
        plan working faster than it is.
      </p>

      <H2>The four things that set your rate</H2>
      <ul className="list-disc pl-6 space-y-2.5 my-5">
        <li>
          <strong>Training age.</strong> The dominant factor, and the one you
          cannot change. Closer to your ceiling means slower, always.
        </li>
        <li>
          <strong>Whether the training actually progresses.</strong> Repeating
          the same sessions produces nothing after the first months. See{" "}
          <Link href="/guides/progressive-overload" className="underline hover:text-fg">
            progressive overload
          </Link>
          .
        </li>
        <li>
          <strong>Calories and protein.</strong> Muscle is built from material
          you eat. A slight surplus and 1.6–2.2 g of protein per kg is the
          evidence-backed range —{" "}
          <Link href="/protein-calculator" className="underline hover:text-fg">
            work out your number
          </Link>
          . Gaining faster than roughly 0.25–0.5% of bodyweight per week just
          adds fat.
        </li>
        <li>
          <strong>Sleep.</strong> The least glamorous and most reliably
          underestimated. Restricting sleep to around five hours has been shown
          to shift the composition of weight lost towards lean tissue and away
          from fat — the exact opposite of the goal.
        </li>
        <li>
          <strong>Genetics.</strong> Real, and a poor excuse. Response to
          identical training varies widely between individuals, but almost
          nobody discovers their genetic ceiling, because reaching it takes
          years of consistency that most never accumulate.
        </li>
      </ul>

      <H2>How to measure something this slow</H2>
      <p>
        A process that produces 33 grams a day needs an instrument that can see
        change over months, and daily bodyweight is not it — normal fluctuation
        of 1–2 kg from water, food and salt is many times larger than a week of
        real muscle gain.
      </p>
      <p>
        What works: the same photos in the same light and pose every week, a
        tape measure monthly, and your logbook. Of those, the logbook is the
        most immediately useful, because strength moves long before size and
        gives you evidence the process is working while the mirror is still
        silent.
      </p>
      <p>
        This is the problem Dietly Fit was built around. One photo a week,
        scored out of 100, turns a change too slow to perceive into a number
        that moves — and names the area holding the score back, so the next
        month of training has a target rather than being more of the same.
      </p>

      <Sources
        items={[
          {
            text: "Aragon AA. Rates of muscle gain by training year — as presented in Aragon & Schoenfeld's work on nutrient timing and body composition.",
            href: "https://pubmed.ncbi.nlm.nih.gov/23360586/",
          },
          {
            text: "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength. Br J Sports Med, 2018.",
            href: "https://pubmed.ncbi.nlm.nih.gov/28698222/",
          },
          {
            text: "Nedeltcheva AV, et al. Insufficient sleep undermines dietary efforts to reduce adiposity. Ann Intern Med, 2010.",
            href: "https://pubmed.ncbi.nlm.nih.gov/20921542/",
          },
          {
            text: "Damas F, et al. Early resistance training-induced increases in muscle cross-sectional area are concomitant with edema-induced muscle swelling. Eur J Appl Physiol, 2016.",
            href: "https://pubmed.ncbi.nlm.nih.gov/26700744/",
          },
        ]}
      />
    </GuidePage>
  );
}
