import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import { JsonLdScript } from "../../components/tools/ToolPage";
import { SITE_NAME } from "../../lib/site";
import {
  PUBLISHED_FOODS,
  FOODS_FETCHED,
  food,
  perPortion,
  fdcUrl,
} from "../../lib/foods";

/**
 * One food: protein and calories, per 100 g and per real portion.
 *
 * Titled to answer both of the queries this page exists for — "protein in X"
 * and "calories in X" are the two deepest branches of the autocomplete
 * harvest, and they are the same page. Splitting them into two URLs would be
 * two thin pages competing with each other over identical data.
 */
export function generateStaticParams() {
  return PUBLISHED_FOODS.map((f) => ({ slug: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = food(slug);
  if (!f) return {};
  const title = `Protein & Calories in ${f.name}`;
  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description: `${f.name} has ${f.per100g.protein} g of protein and ${f.per100g.kcal} calories per 100 g. Full macros per 100 g and per ${f.portion.label}, sourced from USDA FoodData Central.`,
    keywords: [
      `protein in ${f.name.toLowerCase()}`,
      `calories in ${f.name.toLowerCase()}`,
      ...f.aka.flatMap((a) => [`protein in ${a}`, `calories in ${a}`]),
    ],
    alternates: { canonical: `/foods/${f.slug}` },
    openGraph: { title, url: `/foods/${f.slug}`, type: "article" },
  };
}

function Row({ label, per100, portion, unit }: { label: string; per100: number | null; portion: number | null; unit: string }) {
  if (per100 == null) return null;
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-border last:border-0 text-[15px]">
      <span className="text-fg-muted">{label}</span>
      <span className="text-fg font-bold tabular-nums text-right">
        {per100.toFixed(1)}{unit}
      </span>
      <span className="text-fg-muted tabular-nums text-right">
        {portion != null ? `${portion.toFixed(1)}${unit}` : "—"}
      </span>
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = food(slug)!;
  const p = (k: Parameters<typeof perPortion>[1]) => perPortion(f, k);

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "NutritionInformation",
          name: f.name,
          description: `Nutrition for ${f.name}, per 100 g.`,
          calories: `${f.per100g.kcal} kcal`,
          proteinContent: `${f.per100g.protein} g`,
          ...(f.per100g.carbs != null && { carbohydrateContent: `${f.per100g.carbs} g` }),
          ...(f.per100g.fat != null && { fatContent: `${f.per100g.fat} g` }),
          ...(f.per100g.fiber != null && { fiberContent: `${f.per100g.fiber} g` }),
        }}
      />
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="max-w-[760px] mx-auto px-6 md:px-12">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-fg-faint">
              <Link href="/" className="hover:text-fg transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/foods" className="hover:text-fg transition-colors">Foods</Link>
            </nav>

            <h1 className="text-[clamp(30px,5vw,46px)] font-bold leading-[1.06] tracking-[-1.5px] text-fg font-body mb-5">
              Protein &amp; calories in {f.name.toLowerCase()}
            </h1>

            {/* The answer, in the first sentence, as a self-contained fact — so
                a model lifting two sentences out of context still gets it
                right and attributable. */}
            <p className="text-[17px] md:text-[19px] leading-relaxed text-fg-muted">
              <strong className="text-fg">{f.name}</strong> contains{" "}
              <strong className="text-fg">{f.per100g.protein} g of protein</strong> and{" "}
              <strong className="text-fg">{f.per100g.kcal} calories</strong> per 100 g.
              One {f.portion.label.replace(/^1 /, "")} ({f.portion.grams} g) is about{" "}
              {p("protein")?.toFixed(1)} g of protein and {Math.round(p("kcal") ?? 0)} calories.
            </p>

            <div className="mt-9 rounded-2xl border border-border bg-bg-elevated/40 p-6">
              <div className="grid grid-cols-3 gap-4 pb-3 border-b border-border text-[11px] font-bold tracking-[1.5px] text-fg-faint uppercase">
                <span>Nutrient</span>
                <span className="text-right">Per 100 g</span>
                <span className="text-right">Per {f.portion.label}</span>
              </div>
              <Row label="Calories" per100={f.per100g.kcal} portion={p("kcal")} unit=" kcal" />
              <Row label="Protein" per100={f.per100g.protein} portion={p("protein")} unit=" g" />
              <Row label="Carbohydrate" per100={f.per100g.carbs} portion={p("carbs")} unit=" g" />
              <Row label="Fat" per100={f.per100g.fat} portion={p("fat")} unit=" g" />
              <Row label="Fibre" per100={f.per100g.fiber} portion={p("fiber")} unit=" g" />
              <Row label="Sugars" per100={f.per100g.sugar} portion={p("sugar")} unit=" g" />
              <Row label="Saturated fat" per100={f.per100g.satFat} portion={p("satFat")} unit=" g" />
            </div>

            <p className="mt-5 text-[13px] leading-relaxed text-fg-faint">
              Source:{" "}
              <a href={fdcUrl(f)} rel="nofollow noopener" target="_blank" className="underline hover:text-fg-muted">
                USDA FoodData Central #{f.fdcId}
              </a>{" "}
              — &ldquo;{f.usdaDescription}&rdquo; ({f.dataType}). Retrieved{" "}
              <time dateTime={FOODS_FETCHED}>{FOODS_FETCHED}</time>. Values vary
              with variety, ripeness and preparation; treat them as a reference
              figure rather than an exact measurement of what is on your plate.
            </p>

            <div className="glass-card mt-12 rounded-2xl border-l-4 !border-l-accent bg-bg-elevated/30 p-7">
              <h2 className="text-[18px] font-bold text-fg mb-3">
                Counting this into your day
              </h2>
              <p className="text-[15px] leading-relaxed text-fg-muted">
                A single food&rsquo;s macros only matter against a target.{" "}
                <Link href="/protein-calculator" className="underline hover:text-fg">
                  Work out your daily protein
                </Link>{" "}
                and{" "}
                <Link href="/macro-calculator" className="underline hover:text-fg">
                  your calorie and macro split
                </Link>
                , or photograph the meal and let {SITE_NAME} do it —{" "}
                <Link href="/food-scanner" className="underline hover:text-fg">
                  try the scanner
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
