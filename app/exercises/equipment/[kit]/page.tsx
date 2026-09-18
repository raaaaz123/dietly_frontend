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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kit: string }>;
}): Promise<Metadata> {
  const { kit: slug } = await params;
  const c = kit(slug);
  if (!c) return {};
  const title = `${c.name} Exercises — ${c.items.length} Moves You Can Do`;
  const description = `${c.items.length} movements you can train with ${c.name.toLowerCase()} — ${c.blurb.toLowerCase()} Each one carries a demo clip, the muscle it targets and a starting set and rep scheme.`;
  return {
    title: { absolute: title.length > 65 ? `${c.name} Exercises — ${c.items.length} Moves` : title },
    description,
    keywords: [`${c.name.toLowerCase()} exercises`, `${c.name.toLowerCase()} workout`, "home workout", "gym exercises"],
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
              {c.name} exercises
            </h1>
            <p className="text-[17px] text-fg-muted max-w-[640px] leading-relaxed">
              {items.length} movements from Dietly&rsquo;s training catalogue
              that need nothing more than this. {c.blurb} Each one carries a
              demo clip, the muscle it targets and a set, rep and rest scheme
              to start from.
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
