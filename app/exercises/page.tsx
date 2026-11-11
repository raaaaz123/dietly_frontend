import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileCTA from "../components/MobileCTA";
import InstallCard from "../components/InstallCard";
import { JsonLdScript } from "../components/tools/ToolPage";
import { SITE_NAME, SITE_URL } from "../lib/site";
import BodyMap, { BarbellIcon, KitIcon, regionFor } from "../components/exercises/BodyMap";
import ExerciseGrid from "../components/exercises/ExerciseGrid";
import ExerciseSearch from "../components/exercises/ExerciseSearch";
import { EXERCISES, CATEGORIES, KIT, sortItems } from "../lib/exercises";

const N = EXERCISES.length.toLocaleString("en-US");
// Rounded down to the hundred so the title does not change on every refresh.
const COUNT = `${(Math.floor(EXERCISES.length / 100) * 100).toLocaleString("en-US")}+`;
const TITLE = `Exercise Library: ${COUNT} Gym & Home Exercises With Demos`;
const DESCRIPTION = `Search ${COUNT} exercises by muscle, equipment and difficulty. Each has a demo, the target muscle and a starting set and rep scheme. Free, no signup.`;

const POPULAR = sortItems(EXERCISES, "popular").slice(0, 24);

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["exercise library", "exercise database", "gym exercises", "workout exercises", "exercises by muscle"],
  alternates: {
    canonical: "/exercises",
    // Machine-readable copy of the catalogue for agents and tools.
    types: { "application/json": `${SITE_URL}/exercises.json` },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/exercises", type: "website" },
};

export default function ExercisesHub() {
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESCRIPTION,
          url: `${SITE_URL}/exercises`,
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
          hasPart: [
            ...CATEGORIES.map((c) => ({
              "@type": "CollectionPage",
              name: `${c.name} exercises`,
              url: `${SITE_URL}/exercises/muscle/${c.slug}`,
            })),
            ...KIT.map((k) => ({
              "@type": "CollectionPage",
              name: `${k.name} exercises`,
              url: `${SITE_URL}/exercises/equipment/${k.slug}`,
            })),
          ],
          mainEntity: {
            "@type": "ItemList",
            name: "Most useful exercises",
            numberOfItems: POPULAR.length,
            itemListElement: POPULAR.map((e, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: e.name,
              url: `${SITE_URL}/exercises/${e.slug}`,
            })),
          },
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "Dietly Fit exercise library",
          description: `${N} exercises with target muscles, equipment, difficulty and a starting set, rep and rest scheme.`,
          url: `${SITE_URL}/exercises`,
          creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          isAccessibleForFree: true,
          keywords: ["exercises", "strength training", "muscle groups", "gym equipment"],
          distribution: {
            "@type": "DataDownload",
            encodingFormat: "application/json",
            contentUrl: `${SITE_URL}/exercises.json`,
          },
        }}
      />
      <Navbar />
      <main className="relative pt-24 md:pt-32 pb-24 overflow-hidden">
        <div className="hero-glow" />
        <div className="relative max-w-[1120px] mx-auto px-4 sm:px-6 md:px-10">
          <header className="max-w-[720px]">
            <span className="tool-eyebrow">Free · {N} exercises · Demo for each</span>
            <h1 className="mt-5 text-[clamp(32px,6vw,58px)] font-bold leading-[1.04] tracking-[-1.5px] text-fg">
              Exercise library
            </h1>
            <p className="mt-4 text-[16px] md:text-[18px] text-fg-muted leading-relaxed">
              Find any exercise by name, muscle, equipment or difficulty. Every movement has a demo, the muscle it
              targets and a starting set, rep and rest scheme.
            </p>
          </header>

          <div className="mt-6">
            <ExerciseSearch muscles={CATEGORIES.map((c) => c.name)} total={EXERCISES.length}>
              <section className="mt-6">
                <h2 className="text-[22px] md:text-[26px] font-bold text-fg tracking-tight">Browse by muscle</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {CATEGORIES.map((c) => {
                    const region = regionFor(c.name);
                    return (
                      <Link
                        key={c.slug}
                        href={`/exercises/muscle/${c.slug}`}
                        className="group flex items-center gap-3 rounded-2xl border border-border bg-bg-elevated p-3.5 transition-colors hover:border-[rgba(200,245,96,0.45)]"
                      >
                        <span className="shrink-0 text-fg-faint group-hover:text-fg transition-colors">
                          {region === "barbell" ? <BarbellIcon size={30} /> : <BodyMap region={region} size={30} />}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[15px] font-bold text-fg leading-tight">{c.name}</span>
                          <span className="mt-0.5 block text-[12px] text-fg-muted">{c.items.length} exercises</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-[22px] md:text-[26px] font-bold text-fg tracking-tight">Browse by equipment</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {KIT.map((k) => (
                    <Link
                      key={k.slug}
                      href={`/exercises/equipment/${k.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-bg-elevated p-4 transition-colors hover:border-[rgba(200,245,96,0.45)]"
                    >
                      <span className="shrink-0 text-fg-faint group-hover:text-fg transition-colors">
                        <KitIcon kind={k.slug as "bodyweight" | "minimal" | "gym"} size={32} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[16px] font-bold text-fg">{k.name}</span>
                        <span className="mt-0.5 block text-[13px] text-fg-muted">
                          {k.blurb} {k.items.length} exercises
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-[22px] md:text-[26px] font-bold text-fg tracking-tight">Most useful exercises</h2>
                <p className="mt-1 text-[14px] text-fg-muted">The compound lifts and staples most programs are built on.</p>
                <ExerciseGrid items={POPULAR} eagerFirst={4} />
              </section>
            </ExerciseSearch>
          </div>

          <div className="mt-14 max-w-[800px]">
            <InstallCard
              placement="exercise_library"
              title="Get a week built from these exercises"
              body="Dietly Fit picks the movements for your equipment and goal, shows the demo before every set and logs your weights as you go."
              payoff="Get your first workout"
            />
          </div>

          <p className="mt-10 max-w-[800px] text-[13px] leading-relaxed text-fg-faint">
            Exercise demonstrations courtesy of Gym Visual. Developers and AI assistants can read the whole catalogue as{" "}
            <a href="/exercises.json" className="underline hover:text-fg">JSON</a>.
          </p>
        </div>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
