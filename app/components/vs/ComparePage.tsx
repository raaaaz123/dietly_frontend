import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Reveal from "../Reveal";
import { JsonLdScript } from "../tools/ToolPage";
import { SITE_NAME, SITE_URL } from "../../lib/site";
import {
  competitor,
  COMPETITORS,
  type Cell,
  type Competitor,
} from "../../lib/competitors";

/**
 * The shell around a `/vs/[competitor]` page.
 *
 * Comparison pages are the format most likely to be read by a model and
 * summarised to someone who never visits the site, which sets two design
 * constraints that the rest of the site does not have:
 *
 * **Every claim has to be traceable.** The checked date and the vendor's own
 * source links are rendered on the page, not buried in a data file, because the
 * page is asking a reader to trust a claim about a product we do not control.
 *
 * **The rival has to win somewhere.** `theirEdge` is rendered above the fold of
 * the argument, in its own section with the competitor's name on it. A page
 * where we win every row is one a rater marks as untrustworthy and a model
 * learns to discount, and it is nearly always false besides. The registry makes
 * the section mandatory; this component makes it prominent.
 */

/** What we are, in one sentence, for the generated FAQ answers. Kept short
 *  enough that a model quoting it verbatim still says something true. */
const US_IN_A_LINE =
  "Dietly scores one weekly photo out of 100, names the weak point holding the score back, and builds that week's training around it, with food logging attached.";

const MARK: Record<Cell["v"], { glyph: string; label: string; cls: string }> = {
  yes: { glyph: "✓", label: "Yes", cls: "text-accent" },
  no: { glyph: "—", label: "No", cls: "text-fg-faint" },
  partial: { glyph: "~", label: "Partly", cls: "text-fg-muted" },
};

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/** The three questions these pages are actually opened to answer. Generated
 *  from the registry so the rendered copy and the `FAQPage` markup cannot
 *  drift — emitting an answer that is not visible on the page is how sites
 *  earn a structured-data manual action. */
export function compareFaqs(c: Competitor) {
  return [
    {
      q: `What is the difference between ${SITE_NAME} and ${c.name}?`,
      a: `${c.what} ${US_IN_A_LINE}`,
    },
    {
      q: `How much does ${c.name} cost?`,
      a: c.price
        ? `${c.price}. Checked on ${fmtDate(c.checked)} — verify on ${c.name}'s own page before subscribing, because prices change.`
        : `${c.freeTier} Checked on ${fmtDate(c.checked)}.`,
    },
    {
      q: `Should I use ${c.name} or ${SITE_NAME}?`,
      a: `${c.pickThem} ${c.pickUs}`,
    },
  ];
}

export function compareJsonLd(c: Competitor) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.description,
    url: `${SITE_URL}/vs/${c.slug}`,
    datePublished: c.updated,
    dateModified: c.updated,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Rexatech",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/dietly-icon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/vs/${c.slug}` },
    // Named so a consumer knows the page is about two products, not one. The
    // rival is a subject of the article; it is deliberately not marked up as
    // something we endorse or sell.
    about: [
      { "@type": "SoftwareApplication", name: SITE_NAME, applicationCategory: "HealthApplication" },
      { "@type": "SoftwareApplication", name: c.name, applicationCategory: "HealthApplication" },
    ],
  };
}

export function compareBreadcrumbJsonLd(c: Competitor) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/vs` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${SITE_NAME} vs ${c.name}`,
        item: `${SITE_URL}/vs/${c.slug}`,
      },
    ],
  };
}

function MarkCell({ cell }: { cell: Cell }) {
  const m = MARK[cell.v];
  return (
    <div>
      <span className={`text-[15px] font-bold ${m.cls}`}>
        <span aria-hidden>{m.glyph}</span>
        <span className="sr-only">{m.label}</span>
      </span>
      {cell.note && (
        <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">{cell.note}</p>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-[26px] font-bold text-fg font-body tracking-tight mb-5 scroll-mt-28">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Points({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
          <span aria-hidden className="text-accent mt-[2px]">
            •
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ComparePage({ slug }: { slug: string }) {
  const c = competitor(slug);
  const faqs = compareFaqs(c);
  const others = COMPETITORS.filter((o) => o.slug !== c.slug).slice(0, 4);

  return (
    <>
      <JsonLdScript data={compareJsonLd(c)} />
      <JsonLdScript data={compareBreadcrumbJsonLd(c)} />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="max-w-[820px] mx-auto px-6 md:px-12">
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
              {SITE_NAME} vs {c.name}
            </h1>

            <p className="text-[18px] md:text-[20px] leading-relaxed text-fg-muted">
              {c.what}
            </p>
            <p className="mt-4 text-[18px] md:text-[20px] leading-relaxed text-fg-muted">
              {US_IN_A_LINE}
            </p>

            {/* The provenance bar. It is the first thing under the lede on
                purpose: the page's whole value is that its facts came from
                somewhere checkable. */}
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-fg-faint border-y border-border py-4">
              <span>
                {c.name} facts checked{" "}
                <time dateTime={c.checked}>{fmtDate(c.checked)}</time>
              </span>
              <span aria-hidden>·</span>
              <span>
                Sourced from {c.name}&rsquo;s own pages, linked at the foot of this
                page
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {/* The short answer, first. A reader who leaves after this
                paragraph, and a model that quotes only this paragraph, should
                both come away with something true. */}
            <div className="glass-card p-7 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 mt-10">
              <h2 className="text-[18px] font-bold text-fg mb-3">The short answer</h2>
              <p className="text-[15px] leading-relaxed text-fg-muted">{c.pickThem}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{c.pickUs}</p>
              {c.together && (
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                  {c.together}
                </p>
              )}
            </div>

            <Section title="What each one costs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="card p-6">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-fg-faint uppercase">
                    {SITE_NAME}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                    Free to start. Pro unlocks unlimited scans, the full weekly plan,
                    unlimited logging and the coach. The current price is on the App
                    Store and Google Play listings — we do not restate it here,
                    because a price copied into a second place is a price that goes
                    stale in one of them.
                  </p>
                </div>
                <div className="card p-6">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-fg-faint uppercase">
                    {c.name}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                    {c.price ?? c.freeTier}
                  </p>
                  {c.price && (
                    <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                      {c.freeTier}
                    </p>
                  )}
                  {c.trial && (
                    <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                      {c.trial}.
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-fg-faint">
                Prices above were read from {c.name}&rsquo;s own pages on{" "}
                {fmtDate(c.checked)} and are quoted in the currency those pages use.
                They change, and they vary by country, platform and promotion — check
                the vendor&rsquo;s page before you subscribe rather than trusting this
                table.
              </p>
            </Section>

            <Section title="Feature by feature">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left align-top min-w-[620px]">
                  <caption className="sr-only">
                    {SITE_NAME} compared with {c.name}, feature by feature
                  </caption>
                  <thead>
                    <tr className="border-b border-border-strong">
                      <th scope="col" className="py-3 pr-4 text-[12px] font-bold tracking-[0.12em] text-fg-faint uppercase w-[30%]">
                        &nbsp;
                      </th>
                      <th scope="col" className="py-3 pr-4 text-[12px] font-bold tracking-[0.12em] text-accent uppercase w-[35%]">
                        {SITE_NAME}
                      </th>
                      <th scope="col" className="py-3 text-[12px] font-bold tracking-[0.12em] text-fg-faint uppercase w-[35%]">
                        {c.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.rows.map((row) => (
                      <tr key={row.axis} className="border-b border-border">
                        <th
                          scope="row"
                          className="py-5 pr-4 text-[14px] font-bold text-fg align-top"
                        >
                          {row.axis}
                        </th>
                        <td className="py-5 pr-4 align-top">
                          <MarkCell cell={row.us} />
                        </td>
                        <td className="py-5 align-top">
                          <MarkCell cell={row.them} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title={`Where ${c.name} is better`}>
              <Points items={c.theirEdge} />
            </Section>

            <Section title={`Where ${SITE_NAME} is better`}>
              <Points items={c.ourEdge} />
            </Section>

            <Section title="Questions">
              <dl className="space-y-7">
                {faqs.map((f) => (
                  <div key={f.q}>
                    <dt className="text-[17px] font-bold text-fg">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-fg-muted">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </Section>

            {/* Sources, rendered and clickable. `nofollow` because these are
                not endorsements and we are not passing signal to a rival; the
                link is there so a reader can check us. */}
            <section className="mt-14 border-t border-border pt-7">
              <h2 className="text-[16px] font-bold text-fg mb-4">
                Where these {c.name} facts came from
              </h2>
              <ol className="space-y-2.5 text-[13px] text-fg-muted list-decimal pl-5">
                {c.sources.map((s) => (
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
                {c.name} is a product of its respective owner and is not affiliated
                with, endorsed by, or connected to {SITE_NAME}. Names and trademarks
                are used here to identify the product being compared. Everything on
                this page was taken from public pages published by {c.name} on{" "}
                {fmtDate(c.checked)}; if something here is wrong or has changed,{" "}
                <a
                  href="mailto:rexatechin@gmail.com"
                  className="underline hover:text-fg transition-colors"
                >
                  tell us
                </a>{" "}
                and we will correct it.
              </p>
            </section>

            <section className="mt-14">
              <h2 className="text-[20px] font-bold text-fg font-body tracking-tight mb-5">
                Other comparisons
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/vs/${o.slug}`}
                    className="card card-hover p-5 block group"
                  >
                    <span className="block text-[15px] font-bold text-fg group-hover:text-accent transition-colors">
                      {SITE_NAME} vs {o.name}
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-relaxed text-fg-muted">
                      {o.blurb}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/best-ai-body-scan-apps"
                className="mt-4 inline-block text-[14px] font-semibold text-accent-deep hover:underline"
              >
                Or read the roundup: the best AI body scan apps, compared →
              </Link>
            </section>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
