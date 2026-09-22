import data from "./foods.generated.json" with { type: "json" };

/**
 * The nutrition-lookup cluster, read from a curated USDA snapshot.
 *
 * ## Why this is the biggest unbuilt opportunity on the site
 *
 * Google Autocomplete, harvested 2026-09-22, returns a deeper tree for this
 * than for anything else in the category:
 *
 *     protein in 1 egg · protein in 100 gm paneer · protein in 100 gm chicken
 *     calories in one egg · calories in 1 roti · calories in one chapati
 *     protein in soya chunks · protein in dal · calories in rice
 *
 * It also maps directly onto what the app does — log a meal and get its macros
 * — so the call to action on these pages is the honest one rather than a
 * bolted-on pitch.
 *
 * ## Why it is gated
 *
 * This is nutrition data, which is YMYL, and the naive way to build it is
 * catastrophic. Searching USDA for a food name and taking the first hit
 * returned, on 2026-09-22: a banana at **1450 kcal/100g** (dehydrated banana
 * powder), *pineapple* for "soya chunks", and egg whites for "egg". Those are
 * wrong in the way that looks right — the same shape of defect as the US Navy
 * body-fat bug in `SEO_PLAN.md`.
 *
 * So every entry is curated by **fdcId**, not by search term, and
 * `scripts/fetch-foods.mjs` is a refresh tool rather than a discovery tool.
 * Its header explains how to add one.
 *
 * `PUBLISHABLE` then decides whether the cluster exists at all. A handful of
 * food pages is not a cluster — it is a few orphans competing against
 * established nutrition sites — so nothing routes, nothing enters the sitemap
 * and no hub renders until there are enough of them to be worth a reader's
 * time. Today there is one seed entry, so the cluster is dark by design.
 *
 * To turn it on: get a free key at https://fdc.nal.usda.gov/api-key-signup.html,
 * curate ids into `FOODS` in the fetch script, and run
 * `FDC_KEY=xxx node scripts/fetch-foods.mjs`.
 */

export type FoodNutrients = {
  kcal: number;
  protein: number;
  carbs: number | null;
  fat: number | null;
  fiber: number | null;
  sugar: number | null;
  satFat: number | null;
  sodium: number | null;
};

export type Food = {
  slug: string;
  name: string;
  /** Other spellings people search. Rendered, and used for internal search. */
  aka: string[];
  /** The unit a person eats, because "per 100 g" rarely answers the question. */
  portion: { label: string; grams: number };
  fdcId: number;
  /** USDA's own wording for the entry. Rendered, so the reader can check that
   *  the row we picked is the food they meant. */
  usdaDescription: string;
  dataType: string;
  per100g: FoodNutrients;
};

export const FOODS = data.foods as Food[];
export const FOODS_FETCHED = data.fetchedAt as string;

/**
 * How many curated foods before the cluster is worth publishing.
 *
 * Below this the pages do not route and are not in the sitemap. The number is
 * a judgement, not a science: twelve is roughly where a hub stops looking like
 * an abandoned experiment, and it is low enough to be reachable in one
 * curation session.
 */
export const MIN_CLUSTER = 12;

export const PUBLISHABLE = FOODS.length >= MIN_CLUSTER;

/** Only these route and enter the sitemap. Empty while the cluster is gated. */
export const PUBLISHED_FOODS: Food[] = PUBLISHABLE ? FOODS : [];

const BY_SLUG = new Map(FOODS.map((f) => [f.slug, f]));

export function food(slug: string): Food | undefined {
  return BY_SLUG.get(slug);
}

/** Scales a per-100g figure to the portion people actually eat. */
export function perPortion(f: Food, key: keyof FoodNutrients): number | null {
  const v = f.per100g[key];
  if (v == null) return null;
  return (v * f.portion.grams) / 100;
}

/** USDA's public page for an entry, so every number on our page is one click
 *  from the row it came from. */
export function fdcUrl(f: Food): string {
  return `https://fdc.nal.usda.gov/food-details/${f.fdcId}/nutrients`;
}
