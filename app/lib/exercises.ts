import data from "./exercises.generated.json";

/**
 * The exercise cluster, read from a build-time snapshot of the catalogue.
 *
 * `exercises.generated.json` is written by `npm run fetch:exercises`, which
 * pulls the published rows through the admin API. Regenerate it when the
 * catalogue changes; it is committed so a deploy never depends on the API
 * being up.
 *
 * ## The indexing gate
 *
 * All 507 published rows have a clip, a target muscle and an equipment tag,
 * and **none of them have prose** — no overview, no instructions, no cues, no
 * tips. Checked across all 507, not a sample.
 *
 * A page with a title, a video and two tags is thin content, and 507 of them
 * on a domain with no ranking history is how a site earns a sitewide quality
 * problem instead of 507 entry points. So the detail pages exist and are
 * crawlable and linkable, and `isIndexable` decides whether they are allowed
 * to compete: a movement becomes indexable the moment somebody authors real
 * steps for it, and not before. Nothing to remember and no second list to keep.
 *
 * The category and equipment hubs are indexable from the start — a page
 * listing 90 back movements is a genuinely useful page whatever the individual
 * entries say, and "chest exercises" is the query this cluster is for.
 */

export type Exercise = {
  slug: string;
  name: string;
  title: string;
  group: string;
  secondaryGroups: string[];
  equipment: string;
  equipmentNames: string[];
  category: string;
  difficulty: string;
  target: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  defaultSets: number;
  defaultReps: string;
  defaultRestSec: number;
  exerciseType: string;
  isCore: boolean;
  priority: number;
  attribution: string;
  overview: string;
  instructions: string[];
  cues: string[];
  tips: string[];
  beginnerAdvice: string;
  variations: string[];
};

export const EXERCISES = (data.exercises as Exercise[]);
export const CATALOGUE_FETCHED = data.fetchedAt as string;

const BY_SLUG = new Map(EXERCISES.map((e) => [e.slug, e]));

export function exercise(slug: string): Exercise | undefined {
  return BY_SLUG.get(slug);
}

/** Real steps, or at least a paragraph. Drives `robots` on the detail page. */
export function isIndexable(e: Exercise): boolean {
  return e.instructions.length >= 2 || e.overview.length > 120;
}

export const INDEXABLE = EXERCISES.filter(isIndexable);

/** `Back`, `Chest`, `Biceps` … — the catalogue's own anatomical grouping, and
 *  the one that matches what people actually search for. */
export const CATEGORIES = [...new Set(EXERCISES.map((e) => e.category))]
  .filter(Boolean)
  .map((name) => ({
    name,
    slug: slugify(name),
    items: EXERCISES.filter((e) => e.category === name),
  }))
  .filter((c) => c.items.length >= 8)
  .sort((a, b) => b.items.length - a.items.length);

/** Three tiers, named for what a reader has rather than for a database enum. */
export const KIT = [
  { slug: "bodyweight", key: "none", name: "Bodyweight", blurb: "No equipment at all." },
  { slug: "minimal", key: "basic", name: "Minimal kit", blurb: "Dumbbells, a band, a bench." },
  { slug: "gym", key: "full", name: "Full gym", blurb: "Racks, machines, cables." },
].map((k) => ({ ...k, items: EXERCISES.filter((e) => e.equipment === k.key) }));

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function category(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
export function kit(slug: string) {
  return KIT.find((k) => k.slug === slug);
}

/** Same four orders the app's browser offers, so the site and the app agree
 *  about what "popular" means. */
export function sortItems(items: Exercise[], sort: string): Exercise[] {
  const by: Record<string, (a: Exercise, b: Exercise) => number> = {
    popular: (a, b) => b.priority - a.priority || a.name.localeCompare(b.name),
    name: (a, b) => a.name.localeCompare(b.name),
    easiest: (a, b) =>
      ({ beginner: 0, intermediate: 1, advanced: 2 }[a.difficulty] ?? 1) -
        ({ beginner: 0, intermediate: 1, advanced: 2 }[b.difficulty] ?? 1) ||
      a.name.localeCompare(b.name),
  };
  return [...items].sort(by[sort] ?? by.popular);
}

export const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};
