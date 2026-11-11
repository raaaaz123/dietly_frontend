import EmbedCode from "./EmbedCode";
import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Reveal from "../Reveal";
import InstallCard from "../InstallCard";
import MobileCTA from "../MobileCTA";
import { SITE_URL } from "../../lib/site";
import { tool, type Tool } from "../../lib/tools";
import { ReactNode } from "react";

/**
 * The page around a calculator: hero, widget, prose, related tools, footer.
 *
 * The prose is passed in, never generated. Templated explanation across eight
 * near-identical pages is how a tool cluster turns into a thin-content problem,
 * so each page writes its own — this only owns the parts that genuinely are the
 * same everywhere.
 */

export function toolJsonLd(slug: string, extra?: Record<string, unknown>) {
  const t = tool(slug);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `Dietly Fit ${t.name}`,
    url: `${SITE_URL}/${t.slug}`,
    description: t.description,
    applicationCategory: "HealthApplication",
    browserRequirements: "Requires JavaScript",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    ...extra,
  };
}

/**
 * FAQ markup for a tool page.
 *
 * Only ever called with the questions the page actually renders below. Emitting
 * a `FAQPage` whose answers are not visible on the page is the single most
 * common way sites earn a structured-data manual action.
 */
export function faqJsonLd(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function RelatedTools({ current }: { current: Tool }) {
  return (
    <section className="max-w-[800px] mx-auto px-6 md:px-12 mt-16">
      <h2 className="text-[20px] font-bold text-fg font-body tracking-tight mb-5">
        Related calculators
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {current.related.map((slug) => {
          const t = tool(slug);
          return (
            <Link
              key={slug}
              href={`/${t.slug}`}
              className="card card-hover p-5 block group"
            >
              <span className="block text-[15px] font-bold text-fg group-hover:text-accent transition-colors">
                {t.name}
              </span>
              <span className="mt-1.5 block text-[13px] leading-relaxed text-fg-muted">
                {t.blurb}
              </span>
            </Link>
          );
        })}
      </div>
      <p className="mt-5 text-[13px] text-fg-faint">
        <Link href="/tools" className="underline hover:text-fg transition-colors">
          All free calculators
        </Link>
      </p>
    </section>
  );
}

/**
 * The medical disclaimer.
 *
 * Every page here outputs a number someone might act on, and all of them are
 * population estimates that know nothing about the individual reading them.
 * Google holds health content to a higher bar than it holds most things, and
 * more to the point this is the honest thing to put on the page.
 */
function Disclaimer() {
  return (
    <p className="mt-10 text-[12px] leading-relaxed text-fg-faint border-t border-border pt-5">
      These calculators return population estimates, not medical advice. They
      know nothing about your medical history, medication or training age. Talk
      to a doctor or a registered dietitian before making a significant change to
      how you eat or train, particularly if you are pregnant, under 18, or
      managing a health condition.
    </p>
  );
}

export default function ToolPage({
  slug,
  h1,
  intro,
  widget,
  children,
}: {
  slug: string;
  /** Allowed to differ from the <title>: one is a headline, the other a SERP entry. */
  h1: ReactNode;
  intro: string;
  widget: ReactNode;
  /** The page's own explanation. Bespoke, always. */
  children: ReactNode;
}) {
  const t = tool(slug);
  return (
    <>
      <Navbar />
      <main className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div className="hero-glow" />
        <div className="relative max-w-[1000px] mx-auto px-5 md:px-12 text-center">
          <Reveal>
            <span className="tool-eyebrow mb-5">Free tool · No signup · Instant result</span>
            <h1 className="mt-5 text-[clamp(32px,6vw,60px)] font-bold leading-[1.05] tracking-[-1.5px] text-fg font-body mb-4">
              {h1}
            </h1>
            <p className="text-[16px] md:text-[18px] text-fg-muted max-w-[600px] mx-auto leading-relaxed">
              {intro}
            </p>
          </Reveal>
        </div>

        {/* No Reveal wrapper: the widget is the reason the visitor came, so it
            is never hidden, not even for an entrance animation. */}
        {widget}

        <section className="max-w-[800px] mx-auto px-6 md:px-12 mt-12">
          <Reveal>
            <article className="tool-prose text-fg-muted leading-relaxed space-y-8">
              {children}
            </article>
          </Reveal>
        </section>

        {/* After the explanation, for readers who scrolled past the result. */}
        <div className="max-w-[800px] mx-auto px-6 md:px-12 mt-12">
          <InstallCard
            placement="tool_article_end"
            title="Turn this number into a plan"
            body="Dietly Fit logs every set, scores one photo a week out of 100, and builds the training week around the area holding you back."
          />
          <Disclaimer />
        </div>

        <RelatedTools current={t} />
        {t.slug !== "food-scanner" && t.slug !== "physique-analyzer" && (
          <EmbedCode slug={t.slug} name={t.name} />
        )}
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}

/** Section heading inside tool prose — an <h2> per question, phrased as one. */
export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[26px] font-bold text-fg font-body tracking-tight mb-4">
      {children}
    </h2>
  );
}

/** The FAQ block at the foot of a tool page, rendering the same array the
 *  `FAQPage` markup is built from so the two can never disagree. */
export function ToolFaq({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
  return (
    <div>
      <H2>Common questions</H2>
      <dl className="space-y-5">
        {faqs.map((f) => (
          <div key={f.q}>
            <dt className="text-[16px] font-bold text-fg mb-1.5">{f.q}</dt>
            <dd className="text-[15px] leading-relaxed">{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
