import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";
import ExerciseGrid from "../../../components/exercises/ExerciseGrid";
import { JsonLdScript } from "../../../components/tools/ToolPage";
import { SITE_URL } from "../../../lib/site";
import { CATEGORIES, category, sortItems } from "../../../lib/exercises";

/**
 * "Chest exercises", "back exercises" — the queries this cluster exists for.
 *
 * These are indexable from day one even though the individual movement pages
 * are not. A page listing ninety back movements, each with its target muscle
 * and equipment, is a useful page whatever any single entry says; a page with
 * one movement, a video and two tags is not. That asymmetry is the whole
 * indexing strategy for the cluster.
 */
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const c = category(slug);
  if (!c) return {};
  // Titled "<Muscle> Workout" rather than "<Muscle> Exercises", and carrying
  // both words.
  //
  // Google Trends, worldwide, week to 2026-09-22: "back workout" indexes at 19
  // against "chest workout" 16, "abs workout" 14 and "leg workout" 14 — each
  // of them ahead of the "<muscle> exercises" phrasing these pages were
  // originally written for. The page serves both intents identically, so the
  // title should lead with the one more people type and keep the other.
  const title = `${c.name} Workout — ${c.items.length} Exercises With Demos`;
  const description = `Every ${c.name.toLowerCase()} exercise in Dietly Fit's catalogue — ${c.items.length} movements for your ${c.name.toLowerCase()} workout, each with a demo clip, the muscle it targets, the equipment it needs and a starting set and rep scheme.`;
  return {
    title: { absolute: title.length > 65 ? `${c.name} Workout — ${c.items.length} Exercises` : title },
    description,
    keywords: [`${c.name.toLowerCase()} exercises`, `${c.name.toLowerCase()} workout`, "exercise library"],
    alternates: { canonical: `/exercises/muscle/${c.slug}` },
    openGraph: { title, description, url: `/exercises/muscle/${c.slug}`, type: "website" },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const c = category(slug)!;
  const items = sortItems(c.items, "name");
  const others = CATEGORIES.filter((x) => x.slug !== c.slug).slice(0, 6);

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
              item: `${SITE_URL}/exercises/muscle/${c.slug}`,
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
              Fit&rsquo;s training catalogue, to build a {c.name.toLowerCase()}{" "}
              workout from. Each one carries a demo clip, the muscle it targets
              and a set, rep and rest scheme to start from.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ExerciseGrid items={items} />

            <section className="mt-14">
              <h2 className="text-[20px] font-bold text-fg font-body tracking-tight mb-5">
                Other muscles
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/exercises/muscle/${o.slug}`}
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
