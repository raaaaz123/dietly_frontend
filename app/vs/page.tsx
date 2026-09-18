import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { JsonLdScript } from "../components/tools/ToolPage";
import { SITE_NAME, SITE_URL } from "../lib/site";
import { COMPETITORS } from "../lib/competitors";

const TITLE = "Dietly Compared — Honest App Comparisons";
const DESCRIPTION =
  "How Dietly compares with Fitbod, MacroFactor, MyFitnessPal, Cal AI and Bodygram — with every competitor fact taken from that company's own pages and dated.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "dietly vs",
    "dietly alternative",
    "ai body scan app comparison",
    "fitness app comparison",
  ],
  alternates: { canonical: "/vs" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/vs", type: "website" },
};

export default function ComparisonsHub() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dietly comparisons",
    itemListElement: COMPETITORS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${SITE_NAME} vs ${c.name}`,
      url: `${SITE_URL}/vs/${c.slug}`,
    })),
  };

  return (
    <>
      <JsonLdScript data={itemList} />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-[860px] mx-auto px-6 md:px-12">
          <Reveal>
            <span className="text-[11px] font-bold tracking-[3px] text-accent uppercase mb-6 block">
              Compare
            </span>
            <h1 className="text-[clamp(36px,6vw,60px)] font-bold leading-[1.05] tracking-[-2px] text-fg font-body mb-6">
              How {SITE_NAME} compares
            </h1>
            <p className="text-[17px] text-fg-muted max-w-[640px] leading-relaxed">
              Five apps people weigh {SITE_NAME} against, and an honest answer about
              which to pick. Every fact about another company&rsquo;s product was read
              off that company&rsquo;s own pages, on a date printed at the top of each
              comparison, with the source linked at the bottom. Each page also says
              where the other app is better, because on most of these it is — just not
              at the thing {SITE_NAME} is for.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-14 space-y-4">
              {COMPETITORS.map((c) => (
                <Link
                  key={c.slug}
                  href={`/vs/${c.slug}`}
                  className="card card-hover p-7 block group"
                >
                  <h2 className="text-[20px] font-bold text-fg group-hover:text-accent transition-colors">
                    {SITE_NAME} vs {c.name}
                  </h2>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-fg-muted">
                    {c.blurb}
                  </p>
                  <p className="mt-3 text-[12px] text-fg-faint">
                    {c.name} facts checked{" "}
                    <time dateTime={c.checked}>{c.checked}</time>
                  </p>
                </Link>
              ))}

              <Link
                href="/best-ai-body-scan-apps"
                className="card card-hover card-mint p-7 block group"
              >
                <h2 className="text-[20px] font-bold text-fg group-hover:text-accent transition-colors">
                  The best AI body scan apps, honestly
                </h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-fg-muted">
                  What a phone camera can and cannot measure, which scan apps are
                  real, and when a DEXA scan or a tape measure beats all of them.
                </p>
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
