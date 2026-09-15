import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { JsonLdScript } from "../components/tools/ToolPage";
import { SITE_URL } from "../lib/site";
import { GUIDES } from "../lib/guides";

export const metadata: Metadata = {
  title: "Guides — Physique, Training & Body Composition",
  description:
    "Plain explanations of physique scoring, progress photos, body recomposition and weak-point training — what the evidence supports, and what it does not.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Guides — Physique, Training & Body Composition",
    description:
      "Plain explanations of physique scoring, progress photos, body recomposition and weak-point training.",
    url: "/guides",
    type: "website",
  },
};

export default function GuidesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dietly guides",
    itemListElement: GUIDES.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.heading,
      url: `${SITE_URL}/guides/${g.slug}`,
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
              Guides
            </span>
            <h1 className="text-[clamp(36px,6vw,60px)] font-bold leading-[1.05] tracking-[-2px] text-fg font-body mb-6">
              The reasoning behind the app
            </h1>
            <p className="text-[17px] text-fg-muted max-w-[620px] leading-relaxed">
              Dietly is built on a few specific claims about measuring physiques
              and training around what the measurement says. These explain them —
              including the parts where the evidence is thinner than the
              marketing usually admits.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-14 space-y-4">
              {GUIDES.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="card card-hover p-7 block group"
                >
                  <h2 className="text-[20px] font-bold text-fg group-hover:text-accent transition-colors">
                    {g.heading}
                  </h2>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-fg-muted">
                    {g.blurb}
                  </p>
                  <p className="mt-3 text-[12px] text-fg-faint">
                    {g.readingMinutes} min read
                  </p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
