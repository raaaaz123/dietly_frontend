/**
 * The workout-app roundup, under the same verification rule as
 * `lib/competitors.ts`. Read that file's header before adding an entry here —
 * the rule is the whole reason this page is worth publishing.
 *
 * ## Why this list exists
 *
 * Google Trends, worldwide, week to 2026-09-22: `best workout apps` indexes at
 * 30 and rose 70% over the week, with `best free workout apps` up 60% beside
 * it. It is the largest piece of direct app-install intent in the export, and
 * `/best-ai-body-scan-apps` does not serve it — a body-scan roundup is a
 * different question from "what should I track my lifting in".
 *
 * ## The rule, restated because it is easy to skip
 *
 * Every price below was read off a page **the vendor publishes**, on the date
 * in `checked`, and that page is linked in `sources`. Where a vendor publishes
 * no price anywhere public, `price` is `null` and the page says so rather than
 * repeating a figure from a review site. Three of the five apps here are in
 * that position, which is itself worth telling a reader.
 *
 * This category is thick with AI-written "best workout apps" listicles that
 * quote each other's invented subscription costs. Being the one page in the
 * results that says "they do not publish a price, here is where we looked" is
 * the only durable advantage available to us, and it disappears the moment
 * somebody fills a cell in from memory.
 *
 * `theirEdge` is required and must be specific. A roundup in which our own app
 * wins every line is one no reader believes and no model quotes — and it is
 * usually also false. `tests/workoutApps.test.ts` fails the build on both.
 */

import type { Source } from "./competitors";

export type WorkoutApp = {
  slug: string;
  /** Spelled the way its owner spells it. */
  name: string;
  /** What it is, in its own terms, before any comparison. */
  what: string;
  /** Exactly as the vendor publishes it, or `null` when they publish none. */
  price: string | null;
  /** What we could establish about the free tier from the vendor's own pages. */
  freeTier: string;
  /** The reader this app is genuinely the right answer for. */
  bestFor: string;
  /** Specific, and required. */
  theirEdge: string;
  /** Where it stops, stated without sneering. */
  limit: string;
  sources: Source[];
};

export const ROUNDUP_CHECKED = "2026-09-23";
export const WORKOUT_APPS_SLUG = "best-workout-apps";

export const WORKOUT_APPS: WorkoutApp[] = [
  {
    slug: "hevy",
    name: "Hevy",
    what:
      "A workout logger built around the set: routines, rest timers, supersets, drop and failure sets, personal records and exercise charts, with a social feed for following other lifters.",
    price: null,
    freeTier:
      "Hevy's own site calls it \"a free workout tracker for iOS and Android\" and does not state what Hevy Pro costs or where the free tier stops.",
    bestFor: "Logging lifts, and seeing what people you know are training.",
    theirEdge:
      "The logging experience is the best in this list. Entering sets is fast enough to do between working sets without breaking rhythm, which is the thing a gym tracker lives or dies on — and the social feed is the only one here that people actually use rather than ignore.",
    limit:
      "It records what you did; it does not decide what you should do. There is no programming engine and no measurement of your physique, so the question of what to train next is entirely yours.",
    sources: [{ label: "Hevy — product page", href: "https://www.hevyapp.com/" }],
  },
  {
    slug: "strong",
    name: "Strong",
    what:
      "A deliberately minimal lifting tracker: supersets, custom exercises, RPE, plate and warm-up calculators, body measurements, a muscle heat map, CSV export and Apple Health sync.",
    price: null,
    freeTier:
      "Strong's site states \"Strong Accounts are Free Forever\" and names a PRO tier, but publishes no price for it and does not list where the free tier's limits fall.",
    bestFor: "Someone who wants a logbook and nothing else in the way.",
    theirEdge:
      "It is the least cluttered app in this list by a distance, and the one most likely to still be on your phone in three years. CSV export is a genuine and rare virtue — your training history stays yours and can leave whenever you want, which is not true of most of the apps here, ours included.",
    limit:
      "The same minimalism means no coaching, no plan generation and no nutrition. It assumes you already know what you are doing.",
    sources: [{ label: "Strong — product page", href: "https://www.strong.app/" }],
  },
  {
    slug: "jefit",
    name: "JEFIT",
    what:
      "A workout planner and tracker with a large exercise library, pre-built routines, logging and progress analytics, plus a community layer.",
    price: "$12.99/month or $69.99/year for Elite, as published on JEFIT's Elite page",
    freeTier:
      "Free tier includes custom and pre-made routines, the exercise library JEFIT states as \"Over 1,400 Exercises with guided instructions\", logging and history, and community access. Elite adds professionally designed plans, advanced analytics, watch support, video demonstrations and removes ads.",
    bestFor: "A free, structured routine without paying anything to start.",
    theirEdge:
      "The most generous free tier of any app here — a full exercise library and real routines without a subscription, which is exactly what someone searching \"best free workout apps\" is asking for. It has also been running since long before most of this category existed, and the routine library reflects that.",
    limit:
      "The interface carries a decade of accumulated features, and the free tier is ad-supported. Like the others in this list, its plans do not respond to what your body actually looks like.",
    sources: [{ label: "JEFIT — Elite membership plans", href: "https://www.jefit.com/elite" }],
  },
  {
    slug: "fitbod",
    name: "Fitbod",
    what:
      "An AI workout generator: it builds each session from your logged sets, the equipment you have and which muscle groups it estimates are recovered.",
    price: "$15.99/month or $95.99/year, as published on Fitbod's FAQ page",
    freeTier: "No free tier. A 7-day free trial, then a subscription.",
    bestFor: "Turning up at the gym and being told exactly what to do today.",
    theirEdge:
      "The best per-session programming available in this list. Fitbod has done one thing for years — deciding which muscle groups are recovered and what weight to put on the bar next — and that logic is more mature than anything else here, ours included.",
    limit:
      "It optimises the training, not the physique the training is for. Fitbod cannot see you, so a lagging area stays lagging unless you notice it yourself and tell the app. No nutrition tracking either.",
    sources: [{ label: "Fitbod — FAQs (pricing, trial, features)", href: "https://fitbod.me/faqs/" }],
  },
  {
    slug: "nike-training-club",
    name: "Nike Training Club",
    what:
      "Guided, filmed workouts and multi-week programmes across HIIT, yoga, bodyweight and strength, with wellness content on sleep, nutrition and recovery.",
    price: null,
    freeTier:
      "Nike describes the app as offering \"free guidance from your favorite trainers, athletes, and wellness experts\" and publishes no subscription price on the app's own page.",
    bestFor: "Following along with a trainer rather than reading a spreadsheet.",
    theirEdge:
      "Production quality nothing else here approaches, and it is free. For anyone who does not want to design a session — or who trains at home and would rather be led through it than read a table — a filmed class is a genuinely better format than a logged set, and this is the best free library of them.",
    limit:
      "It is a class library, not a progression system. Load and volume are not tracked in a way that tells you whether you are getting stronger, and nothing adapts to your measurements.",
    sources: [{ label: "Nike Training Club — app page", href: "https://www.nike.com/ntc-app" }],
  },
];

export const WORKOUT_APP_BY_SLUG = new Map(WORKOUT_APPS.map((a) => [a.slug, a]));

export function workoutApp(slug: string): WorkoutApp {
  const found = WORKOUT_APP_BY_SLUG.get(slug);
  if (!found) throw new Error(`Unknown workout app slug: ${slug}`);
  return found;
}
