import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Reveal from "../../../components/Reveal";
import InstallCard from "../../../components/InstallCard";
import MobileCTA from "../../../components/MobileCTA";
import ExerciseGrid from "../../../components/exercises/ExerciseGrid";
import { JsonLdScript, faqJsonLd } from "../../../components/tools/ToolPage";
import { SITE_URL } from "../../../lib/site";
import { CATEGORIES, category, exercise, sortItems, type Exercise } from "../../../lib/exercises";
import { MUSCLE_COPY } from "../../../lib/muscles";

/**
 * "Back workout", "best calf exercises": the queries this cluster exists for.
 *
 * Indexable from day one even though most movement pages are not. What makes
 * a hub worth ranking is the editorial layer from `lib/muscles.ts`: which
 * movements to pick and why, how much to do, and the questions people ask.
 * The full catalogue follows it, most useful first rather than alphabetical.
 *
 * Only the first GRID_CARDS movements render as image cards. With 1,886
 * movements a hub ran to hundreds of poster requests, enough to trip the
 * media proxy's per-IP rate limit, and a DOM no phone wants. The rest are
 * plain links, which keeps every movement one click from the hub for crawlers.
 */
const GRID_CARDS = 24;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

function copyFor(name: string) {
  return MUSCLE_COPY[name];
}

function picksFor(name: string): { e: Exercise; why: string }[] {
  return (copyFor(name)?.picks ?? [])
    .map((p) => ({ e: exercise(p.slug), why: p.why }))
    .filter((p): p is { e: Exercise; why: string } => Boolean(p.e));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const c = category(slug);
  if (!c) return {};
  const lower = c.name.toLowerCase();
  const keyword = copyFor(c.name)?.keyword ?? `${c.name} workout`;
  const picks = picksFor(c.name).length;
  const titleCase = keyword.replace(/\b\w/g, (ch) => ch.toUpperCase());
  const long = `Best ${c.name} Exercises: ${titleCase} With ${c.items.length} Demos`;
  const title = long.length <= 60 ? long : `Best ${c.name} Exercises (${c.items.length} With Demos)`;
  const description = picks
    ? `The ${picks} best ${lower} exercises ranked, plus ${c.items.length} more with demo clips. How many sets to do, which to pick and why.`
    : `${c.items.length} ${lower} exercises, each with a demo clip, the muscle it targets, the equipment it needs and a starting set and rep scheme.`;
  return {
    title: { absolute: title },
    description,
    keywords: [`${lower} exercises`, `best ${lower} exercises`, `${keyword.toLowerCase()}`],
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
  const copy = copyFor(c.name);
  const picks = picksFor(c.name);
  const pickSlugs = new Set(picks.map((p) => p.e.slug));
  const ranked = sortItems(c.items, "popular").filter((e) => !pickSlugs.has(e.slug));
  const cards = ranked.slice(0, GRID_CARDS);
  const rest = sortItems(ranked.slice(GRID_CARDS), "name");
  const others = CATEGORIES.filter((x) => x.slug !== c.slug);
  const lower = c.name.toLowerCase();
  const keyword = copy?.keyword ?? `${c.name} workout`;

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Best ${lower} exercises`,
          numberOfItems: picks.length + ranked.length,
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          itemListElement: [...picks.map((p) => p.e), ...ranked].slice(0, 50).map((e, i) => ({
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
      {copy?.faqs.length ? <JsonLdScript data={faqJsonLd(copy.faqs)} /> : null}
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
              {keyword}: the best {lower} exercises
            </h1>
            <div className="space-y-4 text-[17px] text-fg-muted max-w-[700px] leading-relaxed">
              {copy ? (
                <>
                  {copy.intro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
                  {copy.guide ? (
                    <p className="text-[15px]">
                      Read next:{" "}
                      <Link href={copy.guide.href} className="underline hover:text-fg">
                        {copy.guide.label}
                      </Link>
                    </p>
                  ) : null}
                </>
              ) : (
                <p>
                  {c.items.length} {lower} exercises from Dietly Fit&rsquo;s training catalogue, to
                  build a {lower} workout from. Each one carries a demo clip, the muscle it targets and
                  a set, rep and rest scheme to start from.
                </p>
              )}
            </div>
          </Reveal>

          {picks.length > 0 && (
            <section className="mt-12">
              <h2 className="text-[24px] font-bold text-fg font-body tracking-tight mb-5">
                The {picks.length} best {lower} exercises
              </h2>
              <ol className="space-y-3">
                {picks.map(({ e, why }, i) => (
                  <li key={e.slug}>
                    <Link
                      href={`/exercises/${e.slug}`}
                      className="card card-hover flex items-center gap-4 p-4 group"
                    >
                      <span className="w-8 shrink-0 text-center text-[20px] font-bold text-fg-faint tabular-nums">
                        {i + 1}
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/api/exercise-poster/${e.slug}`}
                        alt={`${e.name} demonstration`}
                        loading={i < 2 ? "eager" : "lazy"}
                        decoding="async"
                        width={120}
                        height={68}
                        className="hidden sm:block w-[120px] aspect-video shrink-0 rounded-lg bg-bg object-contain"
                      />
                      <span className="min-w-0">
                        <span className="block text-[16px] font-bold text-fg group-hover:text-accent transition-colors">
                          {e.name}
                        </span>
                        <span className="mt-1 block text-[14px] leading-relaxed text-fg-muted">{why}</span>
                        <span className="mt-1.5 block text-[12px] text-fg-faint">
                          {e.defaultSets} sets × {e.defaultReps} reps · {e.defaultRestSec}s rest
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="mt-14">
            <h2 className="text-[24px] font-bold text-fg font-body tracking-tight">
              {picks.length ? `More ${lower} exercises` : `${c.name} exercises`}
            </h2>
            <ExerciseGrid items={cards} />
            {rest.length > 0 && (
              <>
                <h3 className="mt-10 text-[17px] font-bold text-fg">
                  All other {lower} exercises, A to Z ({rest.length})
                </h3>
                <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 text-[14px]">
                  {rest.map((e) => (
                    <li key={e.slug}>
                      <Link href={`/exercises/${e.slug}`} className="text-fg-muted hover:text-accent transition-colors">
                        {e.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <div className="mt-14">
            <InstallCard
              placement="muscle_hub"
              title={`A ${lower} plan that adjusts itself`}
              body={`Dietly Fit ranks every muscle against strength standards, flags the ones that are behind, and builds your week around them, with a demo for every movement here.`}
            />
          </div>

          {copy?.faqs.length ? (
            <section className="mt-14">
              <h2 className="text-[24px] font-bold text-fg font-body tracking-tight mb-5">
                Common questions
              </h2>
              <dl className="space-y-5 max-w-[760px]">
                {copy.faqs.map((f) => (
                  <div key={f.q}>
                    <dt className="text-[16px] font-bold text-fg mb-1.5">{f.q}</dt>
                    <dd className="text-[15px] leading-relaxed text-fg-muted">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

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
            Exercise demonstrations courtesy of Gym Visual. Set and rep schemes are a starting point,
            not a prescription. See a qualified professional before starting a new exercise program.
          </p>
        </div>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
