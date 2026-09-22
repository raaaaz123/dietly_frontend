import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { JsonLdScript } from "../components/tools/ToolPage";
import { SITE_NAME, SITE_URL } from "../lib/site";
import { WORKOUT_APPS, ROUNDUP_CHECKED } from "../lib/workoutApps";

/**
 * "Best workout apps", the largest piece of install intent in the Google
 * Trends export (30, +70% over the week to 2026-09-22).
 *
 * Same two honesty problems as `/best-ai-body-scan-apps`, and the same
 * answers. We make one of the apps on the list, so the disclosure goes under
 * the H1 rather than in the footer. And the results page for this query is
 * almost entirely listicles quoting each other's invented subscription
 * figures — so this page prices an app only where the vendor publishes a
 * price, and says plainly where they do not. Three of the five do not.
 *
 * That last part is the page's actual value. "We looked here, and they don't
 * say" is more useful to a reader than a confident number that is wrong, and
 * it is the one thing a content farm will not copy.
 */

const TITLE = "Best Workout Apps in 2026, Compared Honestly";
const DESCRIPTION =
  "Five workout apps compared on what they actually do and what they actually cost — with prices quoted only where the vendor publishes one, and a note where they don't.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "best workout apps",
    "best free workout apps",
    "workout tracker app",
    "best gym app",
    "workout app comparison",
  ],
  alternates: { canonical: "/best-workout-apps" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/best-workout-apps",
    type: "article",
    modifiedTime: ROUNDUP_CHECKED,
  },
};

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-[26px] md:text-[30px] font-bold text-fg font-body tracking-tight mt-14 mb-4 scroll-mt-28"
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[16px] leading-[1.8] text-fg-muted mb-5">{children}</p>;
}

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: `${SITE_URL}/best-workout-apps`,
          datePublished: ROUNDUP_CHECKED,
          dateModified: ROUNDUP_CHECKED,
          author: { "@type": "Organization", name: "Rexatech" },
          publisher: {
            "@type": "Organization",
            name: "Rexatech",
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/dietly-icon.png`,
            },
          },
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Best workout apps",
              item: `${SITE_URL}/best-workout-apps`,
            },
          ],
        }}
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="max-w-[820px] mx-auto px-6 md:px-12">
          <Reveal>
            <h1 className="text-[clamp(32px,5.5vw,52px)] font-bold leading-[1.05] tracking-[-2px] text-fg font-body mb-6">
              Best workout apps in 2026
            </h1>

            <div className="glass-card rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 p-6">
              <p className="text-[15px] leading-relaxed text-fg-muted">
                <strong className="text-fg">We make one of these.</strong>{" "}
                {SITE_NAME} is our app and it is on this page. So here is the
                rule we held ourselves to: every price below was read off the
                vendor&rsquo;s own page on the date shown, and{" "}
                <strong className="text-fg">
                  where a vendor does not publish a price, this page says so
                </strong>{" "}
                instead of repeating a number from a review site. Three of the
                five do not publish one.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-fg-faint border-y border-border py-4">
              <span>
                By the <strong className="text-fg-muted">{SITE_NAME} team</strong>
              </span>
              <span aria-hidden>·</span>
              <span>
                Facts checked{" "}
                <time dateTime={ROUNDUP_CHECKED}>{fmtDate(ROUNDUP_CHECKED)}</time>
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <P>
              &ldquo;Workout app&rdquo; covers three products that barely
              overlap. A <strong>logger</strong> records what you lifted. A{" "}
              <strong>generator</strong> decides what you should lift. A{" "}
              <strong>class library</strong> leads you through a session on
              video. Most disappointment with this category comes from buying
              one and expecting another, so work out which you want before
              reading any list — including this one.
            </P>

            <H2 id="the-pricing-problem">
              The pricing problem nobody mentions
            </H2>
            <P>
              Searching this category returns dozens of posts confidently
              listing subscription costs. A large share of those numbers are not
              checkable, because several of the best-known workout apps{" "}
              <strong>publish no price on their own website at all</strong> —
              the cost appears only inside the app, after install, on the
              store&rsquo;s purchase sheet.
            </P>
            <P>
              Of the five apps below, only two publish a price publicly. For the
              other three, this page links the pages we read and tells you what
              they say. That is less satisfying than a table full of figures,
              and it is the honest version. A price you can check beats a price
              that reads well.
            </P>

            <H2 id="the-apps">The five</H2>
            <P>
              Ordered by what they are for, not by rank. There is no
              &ldquo;best&rdquo; here that is independent of what you want.
            </P>

            <div className="mt-8 space-y-5">
              {WORKOUT_APPS.map((a) => (
                <section
                  key={a.slug}
                  className="rounded-2xl border border-border bg-bg-elevated/40 p-6 md:p-7"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-4">
                    <h3 className="text-[22px] font-bold text-fg font-body tracking-tight">
                      {a.name}
                    </h3>
                    <span
                      className={`text-[13px] font-bold tabular-nums ${
                        a.price ? "text-accent" : "text-fg-faint"
                      }`}
                    >
                      {a.price ?? "No price published"}
                    </span>
                  </div>

                  <p className="text-[15px] leading-relaxed text-fg-muted mb-4">
                    {a.what}
                  </p>

                  <dl className="space-y-3 text-[14px] leading-relaxed">
                    <div>
                      <dt className="text-[11px] font-bold tracking-[1.5px] text-fg-faint uppercase mb-1">
                        Best for
                      </dt>
                      <dd className="text-fg-muted">{a.bestFor}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-bold tracking-[1.5px] text-fg-faint uppercase mb-1">
                        Free tier
                      </dt>
                      <dd className="text-fg-muted">{a.freeTier}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-bold tracking-[1.5px] text-accent uppercase mb-1">
                        Where it is better than us
                      </dt>
                      <dd className="text-fg-muted">{a.theirEdge}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-bold tracking-[1.5px] text-fg-faint uppercase mb-1">
                        Where it stops
                      </dt>
                      <dd className="text-fg-muted">{a.limit}</dd>
                    </div>
                  </dl>
                </section>
              ))}
            </div>

            <H2 id="dietly">And ours, on the same terms</H2>
            <P>
              <strong className="text-fg">{SITE_NAME}</strong> is a fourth
              thing, which is why it is written out here rather than slotted
              into the list above as though it competed on the same axis. It
              takes one photo a week, scores your physique out of 100, names the
              single area holding that score back, and builds the training week
              around it. Food logging sits in the same app so the plan and the
              eating do not drift apart.
            </P>
            <P>
              <strong className="text-fg">Where it stops:</strong> the
              per-session programming is not as mature as Fitbod&rsquo;s, the
              logging is not as fast as Hevy&rsquo;s, and the free tier is not
              as generous as JEFIT&rsquo;s. It also requires you to photograph
              yourself every week, which some people will not do — and if you
              will not, most of the value is gone. Free to start; Pro pricing is
              on the store listings, which is the same thing we just criticised
              three other apps for, and it is fair to hold us to it.
            </P>

            <H2 id="how-to-choose">How to choose in one paragraph</H2>
            <P>
              If you already know what to train and want a fast logbook, take{" "}
              <strong>Hevy</strong> or <strong>Strong</strong>. If you want to
              be told what to do each session, take <strong>Fitbod</strong>. If
              you want structure without paying, take <strong>JEFIT</strong>. If
              you would rather follow a trainer on video, take{" "}
              <strong>Nike Training Club</strong>. If your actual question is
              &ldquo;what should I be working on?&rdquo; — which none of the
              other four answer — that is the gap {SITE_NAME} was built for.
            </P>
            <P>
              A note worth more than the list: the app matters far less than
              whether you use it. Every product here works if you turn up three
              times a week for a year, and none of them works if you do not.
              Pick the one whose logging screen you can face between sets.
            </P>

            <H2 id="free-tools">Free, without installing anything</H2>
            <P>
              If you are not ready to commit to an app, the plans and
              calculators on this site need no account:{" "}
              <Link href="/workouts" className="underline hover:text-fg">
                workout plans
              </Link>{" "}
              with the full week written out,{" "}
              <Link href="/exercises" className="underline hover:text-fg">
                an exercise library
              </Link>{" "}
              with demos, and{" "}
              <Link href="/tools" className="underline hover:text-fg">
                calculators
              </Link>{" "}
              for macros, TDEE, one-rep max and body fat.
            </P>

            <section className="mt-14 border-t border-border pt-8">
              <h2 className="text-[18px] font-bold text-fg mb-4">
                Where these facts came from
              </h2>
              <p className="text-[14px] leading-relaxed text-fg-muted mb-4">
                Every claim above about another company&rsquo;s product was read
                off one of these pages on{" "}
                <time dateTime={ROUNDUP_CHECKED}>{fmtDate(ROUNDUP_CHECKED)}</time>
                . Prices and features change — check before you buy, and{" "}
                <a
                  href="mailto:support@dietly.life"
                  className="underline hover:text-fg"
                >
                  tell us
                </a>{" "}
                if something here is out of date.
              </p>
              <ul className="space-y-2 text-[14px]">
                {WORKOUT_APPS.flatMap((a) =>
                  a.sources.map((s) => (
                    <li key={`${a.slug}-${s.href}`}>
                      <a
                        href={s.href}
                        rel="nofollow noopener"
                        target="_blank"
                        className="text-fg-muted underline hover:text-fg"
                      >
                        {s.label}
                      </a>
                    </li>
                  )),
                )}
              </ul>
              <p className="mt-6 text-[12px] leading-relaxed text-fg-faint">
                All product names and trademarks are the property of their
                respective owners. {SITE_NAME} is not affiliated with, endorsed
                by or sponsored by any of the apps listed above.
              </p>
            </section>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
