import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { JsonLdScript } from "../components/tools/ToolPage";
import { SITE_NAME, SITE_URL } from "../lib/site";
import { EXERCISES, CATEGORIES, KIT, INDEXABLE } from "../lib/exercises";

const TITLE = "Exercise Library — 500+ Movements With Demos";
const DESCRIPTION =
  "Every movement in Dietly's training catalogue, grouped by the muscle it works and the equipment it needs, each with a demo clip, a target muscle and a starting set and rep scheme.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["exercise library", "exercise database", "gym exercises", "workout moves"],
  alternates: { canonical: "/exercises" },
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
          hasPart: CATEGORIES.map((c) => ({
            "@type": "CollectionPage",
            name: `${c.name} exercises`,
            url: `${SITE_URL}/exercises/muscle/${c.slug}`,
          })),
        }}
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <Reveal>
            <span className="eyebrow mb-6 block">Exercise library</span>
            <h1 className="text-[clamp(32px,6vw,56px)] font-bold leading-[1.05] tracking-[-2px] text-fg font-body mb-6">
              {EXERCISES.length} movements, with a demo for every one
            </h1>
            <p className="text-[17px] text-fg-muted max-w-[640px] leading-relaxed">
              The catalogue Dietly builds its weeks from. Browse by the muscle a
              movement works or by the equipment you actually have — every entry
              carries a demo clip, the muscle it targets and a sensible set,
              rep and rest scheme to start from.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <section className="mt-14">
              <h2 className="text-[24px] font-bold text-fg font-body tracking-tight">
                By muscle
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/exercises/muscle/${c.slug}`}
                    className="card card-hover p-5 block group"
                  >
                    <span className="block text-[16px] font-bold text-fg group-hover:text-accent transition-colors">
                      {c.name}
                    </span>
                    <span className="mt-1 block text-[13px] text-fg-muted">
                      {c.items.length} movements
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="text-[24px] font-bold text-fg font-body tracking-tight">
                By equipment
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {KIT.map((k) => (
                  <Link
                    key={k.slug}
                    href={`/exercises/equipment/${k.slug}`}
                    className="card card-hover p-5 block group"
                  >
                    <span className="block text-[16px] font-bold text-fg group-hover:text-accent transition-colors">
                      {k.name}
                    </span>
                    <span className="mt-1 block text-[13px] text-fg-muted">
                      {k.blurb} · {k.items.length} movements
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Honest about the state of the library rather than quiet about it.
                507 movements have a clip; the written coaching is being filled
                in, and until a movement has it its own page stays out of the
                index — see `isIndexable` in lib/exercises. */}
            <p className="mt-14 text-[13px] leading-relaxed text-fg-faint border border-border rounded-xl p-5">
              Every movement here has a demo clip and a target muscle.{" "}
              {INDEXABLE.length > 0
                ? `${INDEXABLE.length} of them also carry written step-by-step coaching so far; the rest are being written.`
                : "Written step-by-step coaching is being added movement by movement."}{" "}
              Exercise demonstrations courtesy of Gym Visual.
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
