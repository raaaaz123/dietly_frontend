import Link from "next/link";
import { ReactNode } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Reveal from "../Reveal";
import { JsonLdScript } from "../tools/ToolPage";
import { SITE_NAME, SITE_URL } from "../../lib/site";
import { guide, type Guide } from "../../lib/guides";

/**
 * The shell around an editorial page.
 *
 * Health content is held to a higher standard than most — Google's rater
 * guidelines put "your money or your life" topics in their own tier — and the
 * signals that standard asks for are structural: a named author, a visible
 * review date, sources you can follow, and a disclaimer that does not pretend
 * the page is medical advice. Those live here so no article can ship without
 * them.
 *
 * On authorship: these are written and reviewed by the Dietly team, and say so.
 * They are deliberately **not** bylined to an invented dietitian or doctor.
 * Fabricating credentials is the one shortcut in this space that is both
 * effective in the short run and completely indefensible. If a credentialed
 * reviewer is brought in, their name and registration belong in `reviewer`
 * below and nowhere else.
 */

export function articleJsonLd(slug: string) {
  const g = guide(slug);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    url: `${SITE_URL}/guides/${g.slug}`,
    datePublished: g.published,
    dateModified: g.updated,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Rexatech",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/dietly-icon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guides/${g.slug}` },
  };
}

export function breadcrumbJsonLd(g: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      {
        "@type": "ListItem",
        position: 3,
        name: g.heading,
        item: `${SITE_URL}/guides/${g.slug}`,
      },
    ],
  };
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[28px] font-bold text-fg font-body tracking-tight mt-12 mb-4 scroll-mt-28">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-[19px] font-bold text-fg mt-8 mb-3">{children}</h3>;
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="glass-card p-7 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 my-9">
      <h3 className="text-[18px] font-bold text-fg mb-3">{title}</h3>
      <div className="text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

/** Sources, rendered. An assertion about health with nothing behind it is the
 *  thing raters are explicitly told to mark down. */
export function Sources({ items }: { items: readonly { text: string; href?: string }[] }) {
  return (
    <section className="mt-14 border-t border-border pt-7">
      <h2 className="text-[16px] font-bold text-fg mb-4">References</h2>
      <ol className="space-y-2.5 text-[13px] text-fg-muted list-decimal pl-5">
        {items.map((s) => (
          <li key={s.text}>
            {s.href ? (
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline hover:text-fg transition-colors"
              >
                {s.text}
              </a>
            ) : (
              s.text
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function GuidePage({
  slug,
  lede,
  children,
}: {
  slug: string;
  /** The self-contained opening paragraph. Written so a model quoting two
   *  sentences out of it still says something true and attributable. */
  lede: string;
  children: ReactNode;
}) {
  const g = guide(slug);
  return (
    <>
      <JsonLdScript data={articleJsonLd(slug)} />
      <JsonLdScript data={breadcrumbJsonLd(g)} />
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="max-w-[760px] mx-auto px-6 md:px-12">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-fg-faint">
              <Link href="/" className="hover:text-fg transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/guides" className="hover:text-fg transition-colors">
                Guides
              </Link>
            </nav>

            <h1 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] tracking-[-1.5px] text-fg font-body mb-6">
              {g.heading}
            </h1>

            <p className="text-[18px] md:text-[20px] leading-relaxed text-fg-muted">
              {lede}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-fg-faint border-y border-border py-4">
              <span>
                By the <strong className="text-fg-muted">{SITE_NAME} team</strong>
              </span>
              <span aria-hidden>·</span>
              <span>
                Updated <time dateTime={g.updated}>{fmtDate(g.updated)}</time>
              </span>
              <span aria-hidden>·</span>
              <span>{g.readingMinutes} min read</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="text-fg-muted text-[16px] leading-[1.75] mt-4">{children}</div>
          </Reveal>

          <Reveal>
            <p className="mt-12 text-[12px] leading-relaxed text-fg-faint border border-border rounded-xl p-5">
              <strong className="text-fg-muted">Not medical advice.</strong>{" "}
              This article is general information written by the {SITE_NAME}{" "}
              team. It is not written or reviewed by a physician or a registered
              dietitian, and it knows nothing about your medical history. Speak
              to a qualified professional before making a significant change to
              how you eat or train — particularly if you are pregnant, under 18,
              or managing a health condition or an eating disorder.
            </p>

            <section className="mt-14">
              <h2 className="text-[20px] font-bold text-fg font-body tracking-tight mb-5">
                Read next
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {g.related.map((slug) => {
                  const r = guide(slug);
                  return (
                    <Link
                      key={slug}
                      href={`/guides/${r.slug}`}
                      className="card card-hover p-5 block group"
                    >
                      <span className="block text-[15px] font-bold text-fg group-hover:text-accent transition-colors">
                        {r.heading}
                      </span>
                      <span className="mt-1.5 block text-[13px] leading-relaxed text-fg-muted">
                        {r.blurb}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
