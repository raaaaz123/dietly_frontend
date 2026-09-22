import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { JsonLdScript } from "../components/tools/ToolPage";
import { SITE_URL } from "../lib/site";
import { TOOLS } from "../lib/tools";

/**
 * The hub the calculators link back to.
 *
 * Its job is internal linking rather than ranking. Eight tool pages that only
 * link to `/` are eight pages a crawler reaches by one path and a reader leaves
 * from; a hub plus the hand-picked "related" strip on each page gives both a
 * route onward.
 */
export const metadata: Metadata = {
  title: "Free Fitness & Nutrition Calculators",
  description:
    "Eight free calculators for calories, macros, protein, body fat, lean mass, 1RM and goal weight. No signup, no email, and each one explains where its number comes from.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Fitness & Nutrition Calculators",
    description:
      "Eight free calculators for calories, macros, protein, body fat, lean mass, 1RM and goal weight.",
    url: "/tools",
    type: "website",
  },
};

export default function ToolsPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free fitness and nutrition calculators",
    itemListElement: TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE_URL}/${t.slug}`,
    })),
  };

  return (
    <>
      <JsonLdScript data={itemList} />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <Reveal>
            <span className="text-[11px] font-bold tracking-[3px] text-accent uppercase mb-6 block">
              Free Tools — No Signup
            </span>
            <h1 className="text-[clamp(36px,6vw,64px)] font-bold leading-[1.05] tracking-[-2px] text-fg font-body mb-6">
              Calculators
            </h1>
            <p className="text-[17px] text-fg-muted max-w-[620px] leading-relaxed">
              Every one of these returns a number and then explains where it came
              from, how far it can be trusted, and what it cannot see. No email,
              no account.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.map((t) => (
                <Link key={t.slug} href={`/${t.slug}`} className="card card-hover p-7 block group">
                  <h2 className="text-[18px] font-bold text-fg group-hover:text-accent transition-colors">
                    {t.name}
                  </h2>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">{t.blurb}</p>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={250}>
            <p className="mt-14 text-[14px] text-fg-faint max-w-[620px] leading-relaxed">
              These give you a starting number. Holding to it for six months is
              the part that actually decides anything —{" "}
              <Link href="/" className="underline hover:text-fg transition-colors">
                that is what Dietly Fit is for
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
