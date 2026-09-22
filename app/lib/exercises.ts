import data from "./exercises.generated.json";
import { COACHING } from "./coaching";

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
 * and **none of them arrive with prose** — no overview, no instructions, no
 * cues, no tips. Checked across all 507, not a sample.
 *
 * A page with a title, a video and two tags is thin content, and 507 of them
 * on a domain with no ranking history is how a site earns a sitewide quality
 * problem instead of 507 entry points. So the detail pages exist and are
 * crawlable and linkable, and `isIndexable` decides whether they are allowed
 * to compete: a movement becomes indexable the moment somebody authors real
 * steps for it, and not before. Nothing to remember and no second list to keep.
 *
 * Authored steps come from `coaching.ts`, merged over the snapshot below.
 * They live in their own file because `npm run fetch:exercises` rewrites the
 * generated JSON wholesale, and prose written into it would vanish on the next
 * catalogue refresh — taking those pages back out of the index with nothing in
 * the diff to say why.
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
  /** Authored in `coaching.ts`. The catalogue has no field for this. */
  mistakes: string[];
};

/**
 * The catalogue writes movement names by machine, and it shows: `3 4 Sit up`
 * for what everyone calls a 3/4 sit-up, `Bycicle` for bicycle, `Push up` for
 * push-up. The name is the `<h1>`, the `<title>` and the anchor text on every
 * link into the page, so a misspelling is not cosmetic — it is the string we
 * are asking to rank for, and nobody searches for `Bycicle`.
 *
 * Fixed here rather than in the snapshot because the snapshot is regenerated.
 */
const SPELLING: [RegExp, string][] = [
  [/\bBycicle\b/gi, "Bicycle"],
  [/\bSquad Stretch\b/g, "Quad Stretch"],
  [/\bPunche\b/g, "Punch"],
  [/\bStraight Legs\b/g, "Straight Leg"],
  [/^3 4 /, "3/4 "],
  [/\b45 degrees\b/g, "45 Degree"],
  [/\b45 degree\b/g, "45 Degree"],
  [/\bSit up\b/g, "Sit-up"],
  [/\bPush up\b/g, "Push-up"],
  [/\bPull up\b/g, "Pull-up"],
  [/\bChin up\b/g, "Chin-up"],
  [/\bStep up\b/g, "Step-up"],
  [/\bPull ups\b/g, "Pull-ups"],
  [/\bclose grip\b/gi, "Close-grip"],
  [/\bhyperextension\b/g, "Hyperextension"],
  [/\bsquat\b/g, "Squat"],
  [/\bdeadlift\b/g, "Deadlift"],
];

function tidyName(name: string): string {
  return SPELLING.reduce((s, [re, to]) => s.replace(re, to), name).trim();
}

/**
 * The catalogue ships every row at `priority: 0`, so the app's "popular" sort
 * degrades to alphabetical — which put `3/4 Sit-up` and `45 Degree Bicycle
 * Twisting Crunch` at the top of every hub, and buried the barbell squat 300
 * rows down. Those hubs are the cluster's main internal links, so alphabetical
 * order was spending our crawl budget and our link equity on the least useful
 * pages in the catalogue.
 *
 * This is a fallback, not an override: a real priority from the API always
 * wins. It only decides the order among the 507 rows that currently tie at 0.
 */
const COMPOUND =
  /\b(Squat|Deadlift|Bench Press|Overhead Press|Shoulder Press|Row|Pulldown|Pull-up|Chin-up|Push-up|Dip|Lunge|Hip Thrust|Clean|Snatch|Curl|Press)\b/;

function rankOf(e: { slug: string; name: string; equipment: string }): number {
  if (COACHING[e.slug]) return 100; // authored coaching — our best pages
  let n = 0;
  if (COMPOUND.test(e.name)) n += 30;
  // Barbell and dumbbell work is what people search; stretches and
  // articulation drills are catalogue filler for our purposes.
  if (/^(barbell|dumbbell|cable)-/.test(e.slug)) n += 15;
  if (e.equipment !== "none") n += 5;
  if (/stretch|articulation|circles|warm/i.test(e.name)) n -= 20;
  // Fewer words means the plainer, more-searched name: "Barbell Squat" over
  // "Barbell Jefferson Squat".
  n -= Math.max(0, e.slug.split("-").length - 2);
  return n;
}

export const EXERCISES: Exercise[] = (data.exercises as Omit<Exercise, "mistakes">[]).map((e) => {
  const c = COACHING[e.slug];
  const name = tidyName(e.name);
  return {
    ...e,
    name,
    title: tidyName(e.title || e.name),
    overview: c?.overview || e.overview,
    instructions: c?.instructions ?? e.instructions,
    cues: c?.cues ?? e.cues,
    mistakes: c?.mistakes ?? [],
    priority: e.priority || rankOf({ ...e, name }),
  };
});

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
  { slug: "gym", key: "full", name: "Full Gym", blurb: "Racks, machines, cables." },
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
