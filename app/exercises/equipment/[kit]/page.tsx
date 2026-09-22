import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";
import ExerciseGrid from "../../../components/exercises/ExerciseGrid";
import { JsonLdScript } from "../../../components/tools/ToolPage";
import { SITE_URL } from "../../../lib/site";
import { KIT, kit, sortItems } from "../../../lib/exercises";

/**
 * "Bodyweight exercises", "home workout with dumbbells" — the other axis people
 * search on, and the one that matches how the app asks the question during
 * onboarding. Same indexing logic as the muscle pages: the list is the content.
 */
export function generateStaticParams() {
  return KIT.map((k) => ({ kit: k.slug }));
}

export const dynamicParams = false;

/** What people type for each equipment tier, from the Trends and autocomplete
 *  data in KEYWORD_PLAN.md — not what the database calls it. */
const SEARCH_ALIAS: Record<string, string[]> = {
  bodyweight: ["calisthenics workout", "home workout without equipment", "no equipment workout"],
  minimal: ["dumbbell workout", "home workout with dumbbells", "resistance band workout"],
  gym: ["gym workout", "gym workout plan", "weight training exercises"],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kit: string }>;
}): Promise<Metadata> {
  const { kit: slug } = await params;
  const c = kit(slug);
  if (!c) return {};
  // Titled "<Kit> Workout", for the same reason the muscle hubs are: the
  // Google Trends export for the week to 2026-09-22 puts `home workout` at 100
  // — the largest term in the whole dataset — with `calisthenics` at 31 and
  // rising 30%, while the "<kit> exercises" phrasing does not appear at all.
  //
  // `SEARCH_ALIAS` is the term people actually type for each tier. Nobody
  // searches "bodyweight exercises" anywhere near as often as they search
  // "calisthenics" or "home workout", and the page serves all three intents
  // identically.
  const title = `${c.name} Workout — ${c.items.length} Exercises`;
  const description = `${c.items.length} ${c.name.toLowerCase()} exercises you can train with — ${c.blurb.toLowerCase()} Each one carries a demo clip, the muscle it targets and a starting set and rep scheme.`;
  return {
    title: { absolute: title },
    description,
    keywords: [
      `${c.name.toLowerCase()} workout`,
      `${c.name.toLowerCase()} exercises`,
      ...(SEARCH_ALIAS[c.slug] ?? []),
    ],
    alternates: { canonical: `/exercises/equipment/${c.slug}` },
    openGraph: { title, description, url: `/exercises/equipment/${c.slug}`, type: "website" },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ kit: string }>;
}) {
  const { kit: slug } = await params;
  const c = kit(slug)!;
  const items = sortItems(c.items, "name");
  const others = KIT.filter((x) => x.slug !== c.slug);

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${c.name} exercises`,
          numberOfItems: items.length,
          itemListElement: items.slice(0, 100).map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: e.name,
            url: `${SITE_URL}/exercises/${e.slug}`,
          })),
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Exercises", item: `${SITE_URL}/exercises` },
            {
              "@type": "ListItem",
              position: 3,
              name: `${c.name} exercises`,
              item: `${SITE_URL}/exercises/equipment/${c.slug}`,
            },
          ],
        }}
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-fg-faint">
              <Link href="/" className="hover:text-fg transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/exercises" className="hover:text-fg transition-colors">Exercises</Link>
            </nav>
            <h1 className="text-[clamp(30px,5vw,48px)] font-bold leading-[1.06] tracking-[-1.5px] text-fg font-body mb-5">
              {c.name} workout
            </h1>
            <p className="text-[17px] text-fg-muted max-w-[640px] leading-relaxed">
              {items.length} {c.name.toLowerCase()} exercises from Dietly
              Fit&rsquo;s training catalogue, needing nothing more than this.{" "}
              {c.blurb} Each one carries a demo clip, the muscle it targets and
              a set, rep and rest scheme to start from.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ExerciseGrid items={items} />

            <section className="mt-14">
              <h2 className="text-[20px] font-bold text-fg font-body tracking-tight mb-5">
                Other equipment
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/exercises/equipment/${o.slug}`}
                    className="rounded-full border border-border px-4 py-2 text-[14px] font-semibold text-fg-muted hover:text-fg hover:border-border-strong transition-colors"
                  >
                    {o.name} ({o.items.length})
                  </Link>
                ))}
              </div>
            </section>

            <p className="mt-12 text-[12px] leading-relaxed text-fg-faint border border-border rounded-xl p-5">
              Exercise demonstrations courtesy of Gym Visual. Set and rep
              schemes are a starting point, not a prescription — see a
              qualified professional before starting a new exercise program.
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
