import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { JsonLdScript } from "../components/tools/ToolPage";
import { SITE_NAME, SITE_URL } from "../lib/site";
import { COMPETITORS, ROUNDUP_UPDATED, competitor } from "../lib/competitors";

/**
 * The roundup half of §3.4.
 *
 * A roundup published by one of the products in it is a conflict of interest,
 * and the only honest way to run one is to say so before the reader finds out.
 * The disclosure is the first thing under the H1, not a line in the footer.
 *
 * The second honesty problem is more specific to this category: search results
 * for "best AI body scan app" are dominated by posts published by tiny apps
 * about themselves, quoting each other's numbers. So this page names only
 * products whose own pages we read, says what each one is actually for
 * (including where that is "not this"), and spends as much space on the ways to
 * measure a physique that are not an app at all.
 */

const TITLE = "Best AI Body Scan Apps in 2026, Compared Honestly";
const DESCRIPTION =
  "What a phone camera can and cannot measure about your body, which AI body scan apps are real and what each is for, and when a DEXA scan or a tape measure is the better answer.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "best ai body scan apps",
    "ai body scan app",
    "body composition app",
    "phone body scan",
    "photo body fat app",
  ],
  alternates: { canonical: "/best-ai-body-scan-apps" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/best-ai-body-scan-apps",
    type: "article",
    modifiedTime: ROUNDUP_UPDATED,
  },
};

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const SOURCES = [
  { label: "Bodygram — product site", href: "https://bodygram.com/" },
  {
    label: "LeanScreen — body composition module (PostureAnalysis)",
    href: "https://www.postureanalysis.com/leanscreen-app-body-fat-bmi-bmr-waist-to-hip-ratio/",
  },
  {
    label: "Amazon — “Amazon discontinues Amazon Halo effective July 31”",
    href: "https://www.aboutamazon.com/news/company-news/amazon-halo-discontinued",
  },
  { label: "Cal AI — product site", href: "https://www.calai.app/" },
  { label: "MyFitnessPal — product features", href: "https://www.myfitnesspal.com/" },
  { label: "MacroFactor — product site", href: "https://macrofactor.com/" },
  { label: "Fitbod — FAQs", href: "https://fitbod.me/faqs/" },
];

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-[28px] font-bold text-fg font-body tracking-tight mt-14 mb-4 scroll-mt-28"
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[19px] font-bold text-fg mt-9 mb-3">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[16px] leading-[1.75] text-fg-muted">{children}</p>;
}

export default function RoundupPage() {
  const bodygram = competitor("bodygram");

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: `${SITE_URL}/best-ai-body-scan-apps`,
          datePublished: ROUNDUP_UPDATED,
          dateModified: ROUNDUP_UPDATED,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: {
            "@type": "Organization",
            name: "Rexatech",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/dietly-icon.png` },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/best-ai-body-scan-apps`,
          },
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/vs` },
            {
              "@type": "ListItem",
              position: 3,
              name: "Best AI body scan apps",
              item: `${SITE_URL}/best-ai-body-scan-apps`,
            },
          ],
        }}
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="max-w-[780px] mx-auto px-6 md:px-12">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-fg-faint">
              <Link href="/" className="hover:text-fg transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/vs" className="hover:text-fg transition-colors">
                Compare
              </Link>
            </nav>

            <h1 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] tracking-[-1.5px] text-fg font-body mb-6">
              The best AI body scan apps, honestly
            </h1>

            {/* Disclosure first. A roundup that buries its own conflict of
                interest is the format's original sin. */}
            <div className="glass-card p-6 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30">
              <p className="text-[15px] leading-relaxed text-fg-muted">
                <strong className="text-fg">We make one of these.</strong> {SITE_NAME}{" "}
                is our app, and it is on this page. We have tried to write the page we
                would want to read anyway: every claim about another product came from
                that company&rsquo;s own pages, linked at the bottom, and the section
                below on what a phone camera genuinely cannot measure applies to us
                exactly as much as to anyone else.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-fg-faint border-y border-border py-4">
              <span>
                By the <strong className="text-fg-muted">{SITE_NAME} team</strong>
              </span>
              <span aria-hidden>·</span>
              <span>
                Facts checked{" "}
                <time dateTime={ROUNDUP_UPDATED}>{fmtDate(ROUNDUP_UPDATED)}</time>
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <P>
              &ldquo;AI body scan&rdquo; covers two unrelated things. One is
              measurement: turning a photo or a phone-sensor scan into
              circumferences and a body-fat estimate. The other is assessment:
              turning that into a judgement about what to do next. Most of the
              category does the first and stops, which is why people end up with a
              folder of numbers and no plan.
            </P>

            <H2 id="what-a-phone-can-measure">
              What a phone camera can and cannot measure
            </H2>
            <P>
              Start here, because it decides which product category you actually
              need. A photo carries silhouette, proportion and surface detail. From
              those, software can estimate circumferences and, from circumferences,
              body fat — the same chain of reasoning a tape measure and a Navy-method
              equation use, which you can run yourself on our{" "}
              <Link href="/body-fat-calculator" className="underline hover:text-fg">
                body fat calculator
              </Link>
              .
            </P>
            <P>
              What a photo cannot do is see inside you. It cannot distinguish
              visceral from subcutaneous fat, it cannot measure bone density, and it
              has no access to hydration status. Any app claiming clinical-grade
              composition from a single image is overselling, ours included. The
              honest pitch for photo scanning is <em>consistency</em>: shot the same
              way each week, the same estimator surfaces change that a mirror and a
              scale both hide, even if its absolute number is off by a few points.
              We wrote that argument out in full in{" "}
              <Link
                href="/guides/what-is-a-physique-score"
                className="underline hover:text-fg"
              >
                what is a physique score
              </Link>
              , and the setup that makes week-to-week photos actually comparable is
              in the{" "}
              <Link href="/guides/progress-photos-guide" className="underline hover:text-fg">
                progress photos guide
              </Link>
              .
            </P>

            <H2 id="apps">Consumer apps that scan your body from a photo</H2>

            <H3>{SITE_NAME} — a score and the week that follows from it</H3>
            <P>
              Ours. One weekly photo becomes a Form Score out of 100 with a body-fat
              estimate, and — the part that distinguishes it — one named weak point.
              The week of training is then built around that weak point, your goal and
              the equipment you have, and next week&rsquo;s scan is how you find out
              whether it worked. Food logging is included and exists to keep the plan
              fed. Free to start; Pro pricing is on the store listings. iOS 17 or
              later, and Android.
            </P>
            <P>
              <strong className="text-fg-muted">What it is not:</strong> a
              measurement tool. If you want your chest in centimetres, this is the
              wrong product and the next one is better.
            </P>

            <H3>Bodygram — measurements, in volume</H3>
            <P>{bodygram.what}</P>
            <P>
              It is the more serious instrument of the two. It publishes no consumer
              subscription price on its site, and its commercial centre of gravity is
              enterprise licensing to retailers, insurers and fitness brands, which is
              also why its accuracy has been held to standards a consumer app never
              faces. What it does not do is tell you what to train on Tuesday.{" "}
              <Link href="/vs/bodygram" className="underline hover:text-fg">
                Full comparison →
              </Link>
            </P>

            <H3>LeanScreen — the professional&rsquo;s version</H3>
            <P>
              Worth knowing about because it is the oldest serious entry in
              photo-based composition, and because it is explicitly{" "}
              <em>not</em> a consumer app. LeanScreen, part of PostureScreen,
              estimates body fat, waist-to-hip ratio, BMI, BMR and lean mass from
              &ldquo;advanced 2D photographic anthropometry&rdquo; — it measures
              anatomical regions in a photo and mathematically estimates the
              circumferences, with no calipers or tape. Its own site aims it at
              &ldquo;fitness professionals, gym operators, nutritionists, dietitians,
              chiropractors, and physical therapists,&rdquo; it is iOS only, and it
              publishes no price. If you are assessing clients rather than yourself,
              start there rather than with anything in the consumer tier.
            </P>

            <H2 id="churn">The one that shut down, and why it should affect your choice</H2>
            <P>
              Amazon Halo was the best-funded photo body-scan product ever shipped: a
              phone-camera body-fat measurement backed by Amazon&rsquo;s own published
              research. Amazon discontinued it effective 31 July 2023, refunded the
              previous twelve months of hardware and unused subscription fees, and
              from 1 August 2023 the devices and the app stopped functioning.
            </P>
            <P>
              The lesson is not that the technology was bad. It is that this category
              has real churn, and a body-composition history is only valuable if it is
              long. Before you commit years of weekly scans to anything here — ours
              included — check that you can export your own data and that the photos
              stay yours.
            </P>

            <H2 id="not-body-scanners">
              Often listed as body scan apps. They are not.
            </H2>
            <P>
              Roundups in this category routinely pad themselves with nutrition and
              training apps, because those have the search volume. They are good
              products solving a different problem, and it is worth being clear which
              is which:
            </P>
            <ul className="mt-5 space-y-4">
              {COMPETITORS.filter((c) => c.slug !== "bodygram").map((c) => (
                <li key={c.slug} className="text-[16px] leading-[1.75] text-fg-muted">
                  <Link
                    href={`/vs/${c.slug}`}
                    className="font-bold text-fg hover:text-accent transition-colors"
                  >
                    {c.name}
                  </Link>{" "}
                  — {c.blurb}{" "}
                  <Link href={`/vs/${c.slug}`} className="underline hover:text-fg">
                    Compared with {SITE_NAME} →
                  </Link>
                </li>
              ))}
            </ul>

            <H2 id="not-apps">When the answer is not an app</H2>
            <P>
              <strong className="text-fg-muted">A DEXA scan</strong> is the reference
              most consumer tools are validated against. It separates fat, lean mass
              and bone, and reports them regionally. It costs money per scan and
              requires a booking, which makes it the wrong instrument for weekly
              tracking and the right one for establishing a baseline once or twice a
              year. If you want to know how far off your app is, this is how you find
              out.
            </P>
            <P>
              <strong className="text-fg-muted">In-gym 3D scanners</strong> — the
              booths in the corner of some commercial gyms — rotate you and build a
              mesh, producing circumferences and a composition estimate. More
              consistent than a tape measure and tied to a place you have to visit.
            </P>
            <P>
              <strong className="text-fg-muted">Bioimpedance scales</strong> pass a
              small current through you and infer composition from resistance. They
              are cheap and they are on your bathroom floor, which makes them the most
              frequently sampled option — but the reading moves with hydration, so the
              daily number is noise and only the multi-week trend means anything.
            </P>
            <P>
              <strong className="text-fg-muted">A tape measure</strong> remains
              underrated. Waist circumference alone tracks most of what matters for
              health, costs nothing, and is the input to the Navy method that several
              of the apps above are, underneath, also using.
            </P>

            <H2 id="choosing">How to choose</H2>
            <P>
              Ask what you will do differently on the strength of the number. If the
              answer is &ldquo;adjust my training,&rdquo; you want something that
              produces an instruction, not a report — that is the gap {SITE_NAME} was
              built for. If the answer is &ldquo;track my measurements
              precisely,&rdquo; a dedicated measurement product like Bodygram, or a
              tape measure and a spreadsheet, will serve you better and possibly for
              free. If the answer is &ldquo;get my calories right,&rdquo; you do not
              need a body scanner at all; you need a{" "}
              <Link href="/vs/macrofactor" className="underline hover:text-fg">
                nutrition app
              </Link>
              . And if the answer is &ldquo;find out my real body fat
              percentage,&rdquo; book a DEXA scan once and stop shopping for apps.
            </P>

            <p className="mt-12 text-[12px] leading-relaxed text-fg-faint border border-border rounded-xl p-5">
              <strong className="text-fg-muted">Not medical advice.</strong> This
              article is general information written by the {SITE_NAME} team. It is
              not written or reviewed by a physician or a registered dietitian. Body
              composition estimates from any consumer tool, ours included, are
              estimates and not clinical measurements. All product names and
              trademarks belong to their respective owners and their use here is for
              identification only; none of the companies named are affiliated with or
              endorse {SITE_NAME}.
            </p>

            <section className="mt-14 border-t border-border pt-7">
              <h2 className="text-[16px] font-bold text-fg mb-4">Sources</h2>
              <ol className="space-y-2.5 text-[13px] text-fg-muted list-decimal pl-5">
                {SOURCES.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="underline hover:text-fg transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-[12px] leading-relaxed text-fg-faint">
                Every figure quoted above was read from these pages on{" "}
                {fmtDate(ROUNDUP_UPDATED)}. Prices and features change — check the
                vendor&rsquo;s own page before buying. If we have something wrong,{" "}
                <a
                  href="mailto:rexatechin@gmail.com"
                  className="underline hover:text-fg transition-colors"
                >
                  tell us
                </a>{" "}
                and we will fix it.
              </p>
            </section>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
