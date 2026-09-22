/**
 * The comparison pages, described once — same pattern as `lib/tools.ts` and
 * `lib/guides.ts`.
 *
 * ## The rule this file exists to enforce
 *
 * Every factual claim about another company's product below was read off a page
 * **that company publishes**, on the date in `checked`, and the page is listed
 * in `sources`. Not a roundup blog, not a review site, not recall. The category
 * this site competes in is thick with AI-written "best X apps" posts that quote
 * each other's invented prices, and a comparison table assembled from those is
 * wrong within a month and indefensible the moment a rival's lawyer reads it.
 *
 * Concretely, when adding or updating an entry:
 *
 * 1. Open the vendor's own pricing/FAQ/product page. Put its URL in `sources`.
 * 2. Copy the price as written, currency and all. If the vendor does not
 *    publish a price — several deliberately do not — `price` is `null` and the
 *    page says so. Inventing a number to fill the cell is the failure mode.
 * 3. Set `checked` to today. It is rendered on the page, next to a line telling
 *    the reader to verify before buying. A stale date visible to the reader is
 *    survivable; a stale price presented as current is not.
 * 4. `theirEdge` must not be empty. A comparison page on which the rival is
 *    worse at everything is one no rater believes and no model quotes, and it
 *    is usually also false. `tests/competitors.test.ts` fails the build if an
 *    entry has nothing in it.
 *
 * ## On negative claims
 *
 * "Fitbod does not log food" is a claim about an absence, and absences are the
 * easiest thing to get wrong — a feature may exist somewhere we did not look.
 * So a `no` cell is only written where the vendor's own feature list is
 * exhaustive about the area, and the cell's `note` says what was checked rather
 * than asserting a flat nothing. Where we are unsure, the cell is `partial`
 * and the note explains the limit of what we know.
 */

export type Verdict = "yes" | "no" | "partial";

/** One side of one row. `note` is rendered under the mark, and usually matters
 *  more than the mark does. */
export type Cell = { v: Verdict; note?: string };

export type Row = { axis: string; us: Cell; them: Cell };

export type Source = { label: string; href: string };

export type Competitor = {
  slug: string;
  /** The product's name, spelled the way its owner spells it. */
  name: string;
  /** Absolute <title> — these pages opt out of the "%s | Dietly Fit" template,
   *  because "Dietly Fit vs Fitbod | Dietly Fit" says the brand twice to no one's
   *  benefit. Keep under 65 characters. */
  title: string;
  description: string;
  /** One line for the hub card. */
  blurb: string;
  keywords: string[];
  /** The date every fact below was last read off the vendor's own pages.
   *  Rendered. */
  checked: string;
  /** Drives the sitemap. Bump when the page's content actually changes. */
  updated: string;
  /** What the product is, in its own terms, before any comparison. */
  what: string;
  /** Price exactly as the vendor publishes it, or `null` when they publish
   *  none anywhere public. */
  price: string | null;
  /** Free trial as the vendor states it, or `null` when unstated. */
  trial: string | null;
  /** Whether there is a usable free tier, as distinct from a trial. */
  freeTier: string;
  rows: Row[];
  /** Where they are genuinely better. Required — see the note above. */
  theirEdge: string[];
  ourEdge: string[];
  /** The recommendation, in both directions, in one sentence each. */
  pickThem: string;
  pickUs: string;
  /** Set where running both is the honest answer, which it often is. */
  together?: string;
  sources: Source[];
};

/** Our own side of the table, written once so five pages cannot disagree about
 *  what this app does. Every line is a thing the shipping app does. */
const US = {
  scan: {
    v: "yes",
    note: "One photo a week, scored out of 100 with a body-fat estimate.",
  },
  weakPoint: {
    v: "yes",
    note: "The scan names one area holding the score back, and the week is built around it.",
  },
  plan: {
    v: "yes",
    note: "A full week of sessions from the scan, your goal and the equipment you have.",
  },
  food: {
    v: "yes",
    note: "Photo, sentence or voice. Targets are set from your goal.",
  },
  foodDepth: {
    v: "partial",
    note: "Enough to keep the plan honest. It is not a research-grade food database.",
  },
  freeStart: { v: "yes", note: "Free to start; Pro is priced on the store listings." },
} as const satisfies Record<string, Cell>;

export const COMPETITORS: Competitor[] = [
  {
    slug: "fitbod",
    name: "Fitbod",
    title: "Dietly Fit vs Fitbod: Body Scan vs Workout Generator",
    description:
      "Fitbod builds each workout from your lifting history; Dietly Fit builds the week from a photo of your physique. What each one measures, what they cost, and which to pick.",
    blurb: "The best-known AI workout generator. It plans from your logs; we plan from your body.",
    keywords: ["dietly vs fitbod", "fitbod alternative", "ai workout app comparison"],
    checked: "2026-09-18",
    updated: "2026-09-18",
    what:
      "Fitbod generates resistance-training workouts from your goals, experience and available equipment, then tracks personal records, estimated strength, volume trends and streaks as you log sets.",
    price: "$15.99/month or $95.99/year, as published on Fitbod's FAQ page",
    trial: "7-day free trial",
    freeTier: "No free tier — the app is a subscription after the trial.",
    rows: [
      {
        axis: "What the plan is built from",
        us: { v: "yes", note: "A weekly photo: the score, the body-fat estimate and the weak point it names." },
        them: { v: "yes", note: "Your logged sets — recovery per muscle group, strength estimates and equipment." },
      },
      {
        axis: "Photo physique score",
        us: US.scan,
        them: { v: "no", note: "Fitbod's own feature list is entirely workout generation and lifting analytics." },
      },
      {
        axis: "Names a weak point to train around",
        us: US.weakPoint,
        them: { v: "partial", note: "It balances muscle groups by recovery, which is a different question from what is visibly lagging." },
      },
      {
        axis: "Food logging",
        us: US.food,
        them: { v: "no", note: "No nutrition tracking appears in Fitbod's published feature list." },
      },
      {
        axis: "Strength and volume analytics",
        us: { v: "partial", note: "Sessions are logged; the trend the app foregrounds is the score, not the tonnage." },
        them: { v: "yes", note: "PRs, estimated strength and volume trends are the product's core reporting." },
      },
      {
        axis: "Free tier",
        us: US.freeStart,
        them: { v: "no", note: "7-day trial, then paid." },
      },
    ],
    theirEdge: [
      "Fitbod has done one thing for years and does it well. Its per-session logic — which muscle groups are recovered, what weight to put on the bar next — is more mature than ours, and its strength analytics are the better set if progressive overload is the number you care about.",
      "If you already train seriously and know your own weak points, a plan built from your lifting history is more informative than one built from a photo. Fitbod's inputs are objective; ours are an estimate from an image.",
      "No photos of yourself are involved at any point, which for some people is the whole decision.",
    ],
    ourEdge: [
      "Fitbod cannot see you. It optimises the training, not the physique the training is for — so a lagging area stays lagging unless you notice it yourself and tell the app.",
      "Dietly Fit closes that loop: the scan names the weak point, the week is built around it, and next week's scan tells you whether it moved.",
      "Food is in the same app, with targets set from the goal rather than a generic number.",
    ],
    pickThem:
      "Pick Fitbod if you want the best per-session programming available and you would rather judge your own physique than have an app score it.",
    pickUs:
      "Pick Dietly Fit if the question you actually have is \"what should I be working on?\" — and you want a weekly measurement that answers it.",
    together:
      "They are not mutually exclusive. A reasonable setup is Fitbod for the sessions and Dietly Fit's weekly scan as the measurement, though you will pay for both.",
    sources: [
      { label: "Fitbod — FAQs (pricing, trial, features)", href: "https://fitbod.me/faqs/" },
    ],
  },

  {
    slug: "macrofactor",
    name: "MacroFactor",
    title: "Dietly Fit vs MacroFactor: Scan-Led Plan vs Adaptive Macros",
    description:
      "MacroFactor's algorithm adapts your calorie targets from your own logging; Dietly Fit scores a weekly photo and builds training around it. Prices, features and which fits.",
    blurb: "The serious tracker's tracker. Its maths is better than ours; it cannot see you.",
    keywords: [
      "dietly vs macrofactor",
      "macrofactor alternative",
      "adaptive macro tracking app",
    ],
    checked: "2026-09-18",
    updated: "2026-09-18",
    what:
      "MacroFactor is a nutrition app whose algorithm learns your actual energy expenditure from your logged intake and weight trend, then adjusts your macro targets weekly. It now ships a separate Workouts app with resistance-training programs, sold on its own or bundled.",
    price:
      "Either app on its own: $11.99/month, $47.99/half-year or $71.99/year. The Nutrition + Workouts bundle is $89.99/year, per MacroFactor's own help centre",
    trial: null,
    freeTier: "No free tier. MacroFactor's help centre says there is a free trial but does not state its length, so we do not quote one.",
    rows: [
      {
        axis: "Photo physique score",
        us: US.scan,
        them: { v: "no", note: "Body data comes from the scale and your logs, not from an image." },
      },
      {
        axis: "How calorie targets are set",
        us: { v: "partial", note: "From your goal and your stats, adjusted as the scan and the scale move." },
        them: { v: "yes", note: "An expenditure model fitted to your own intake and weight trend, updated weekly. This is the best version of this that ships." },
      },
      {
        axis: "Food database and logging depth",
        us: US.foodDepth,
        them: { v: "yes", note: "A curated database and a logging experience built for people who log every day for years." },
      },
      {
        axis: "Training plan",
        us: US.plan,
        them: { v: "partial", note: "A separate Workouts app with resistance-training programs — a second purchase unless you take the bundle." },
      },
      {
        axis: "Training that responds to your physique",
        us: US.weakPoint,
        them: { v: "no", note: "Programs are chosen, not generated from an assessment of how you currently look." },
      },
      {
        axis: "Free tier",
        us: US.freeStart,
        them: { v: "no", note: "Trial only; no free tier." },
      },
    ],
    theirEdge: [
      "MacroFactor's adaptive expenditure algorithm is the best-argued piece of maths in consumer nutrition software, and it is better than what we do with calories. It stops you guessing at a maintenance number and quietly corrects for the fact that almost everyone under-reports.",
      "Its food database and logging ergonomics are built for people who log every day for years. Ours are built to keep a training plan honest.",
      "It is run by people who publish their reasoning. If you want to read why a number moved, they will tell you.",
    ],
    ourEdge: [
      "MacroFactor answers \"how much should I eat?\" precisely. It does not answer \"what does my physique need?\" — nothing in it looks at you.",
      "Dietly Fit's week is built from the weak point a scan named, and re-scanning is how you find out whether the last four weeks worked.",
      "One subscription covers the scan, the training and the food logging.",
    ],
    pickThem:
      "Pick MacroFactor if your bottleneck is nutrition accuracy — you are dieting, the scale has stalled, and you want targets that correct themselves.",
    pickUs:
      "Pick Dietly Fit if your bottleneck is the training: you are eating roughly right and want the week decided by what your physique currently needs.",
    together:
      "If you are deep in a cut and can afford both, MacroFactor for the calories and Dietly Fit for the scan and the sessions is a genuinely strong pairing.",
    sources: [
      {
        label: "MacroFactor help centre — how subscriptions and bundles work",
        href: "https://help.macrofactorapp.com/en/articles/393-how-macrofactor-subscriptions-and-bundles-work",
      },
      { label: "MacroFactor — product site", href: "https://macrofactor.com/" },
    ],
  },

  {
    slug: "myfitnesspal",
    name: "MyFitnessPal",
    title: "Dietly Fit vs MyFitnessPal: Training Plan vs Food Diary",
    description:
      "MyFitnessPal is the biggest food database in the category; Dietly Fit is a training app that scores a weekly photo. What each does, current pricing, and which one you need.",
    blurb: "The default food diary. Enormous database, no opinion about your training.",
    keywords: [
      "dietly vs myfitnesspal",
      "myfitnesspal alternative",
      "best calorie tracking app",
    ],
    checked: "2026-09-18",
    updated: "2026-09-18",
    what:
      "MyFitnessPal is a calorie and macro diary built on a very large food database. It advertises Meal Scan (camera recognition of a plate), Voice Log, Barcode Scan, micronutrient tracking, weight and exercise logging, intermittent fasting, and an AI Nutrition Coach.",
    price:
      "Premium is $79.99/year. Premium+ is $99.99/year or $24.99/month, as published on MyFitnessPal's own Premium page",
    trial: "7-day free trial, stated for new or first-time users",
    freeTier: "Yes — a free tier exists. Barcode Scan and Meal Scan are listed as features of the paid tiers.",
    rows: [
      {
        axis: "Food database size",
        us: US.foodDepth,
        them: { v: "yes", note: "The largest in the category, and the reason most people are already using it." },
      },
      {
        axis: "Photo meal logging",
        us: { v: "yes", note: "Photo, sentence or voice." },
        them: { v: "yes", note: "\"Meal Scan uses your camera to recognize everything on your plate.\"" },
      },
      {
        axis: "Photo physique score",
        us: US.scan,
        them: { v: "no", note: "No body scanning or physique assessment appears on MyFitnessPal's feature pages." },
      },
      {
        axis: "Training plan built for you",
        us: US.plan,
        them: { v: "no", note: "Exercise logging is offered; workout programming is not advertised on its product pages." },
      },
      {
        axis: "Names a weak point to train around",
        us: US.weakPoint,
        them: { v: "no" },
      },
      {
        axis: "Free tier",
        us: US.freeStart,
        them: { v: "yes", note: "Free logging, with scanning and the coach in the paid tiers." },
      },
    ],
    theirEdge: [
      "The database. Fifteen years of user-submitted and verified entries means the obscure supermarket item you are holding is probably already in it, and no newer app has closed that gap.",
      "It is free to log, and free is the right price for a food diary if logging accurately is all you need.",
      "Micronutrients, fasting windows, recipe import, and integrations with nearly every wearable — the surface area is far wider than ours.",
    ],
    ourEdge: [
      "MyFitnessPal is a diary. It records what you did; it does not decide what you should do next, and it has no view on your training at all.",
      "Dietly Fit is a training app first: the scan produces a score and a weak point, the week follows from it, and food logging exists to keep that plan fed rather than as the product itself.",
      "If you want a number told to you rather than a spreadsheet of your own history, this is the difference.",
    ],
    pickThem:
      "Pick MyFitnessPal if you want to count calories accurately and nothing else — it is the best free tool for that and it is not close.",
    pickUs:
      "Pick Dietly Fit if you want the training decided for you from a measurement of your physique, with food logging attached.",
    together:
      "Plenty of people log in MyFitnessPal out of habit and use Dietly Fit for the scan and the plan. That works.",
    sources: [
      { label: "MyFitnessPal — Premium pricing", href: "https://www.myfitnesspal.com/premium" },
      { label: "MyFitnessPal — product features", href: "https://www.myfitnesspal.com/" },
    ],
  },

  {
    slug: "cal-ai",
    name: "Cal AI",
    title: "Dietly Fit vs Cal AI: Physique Scan vs Photo Calorie Count",
    description:
      "Both point a camera at something and return a number — but Cal AI photographs your dinner and Dietly Fit photographs you. What each measures, what is free, and which you want.",
    blurb: "Photograph your dinner, or photograph yourself. Two different products.",
    keywords: ["dietly vs cal ai", "cal ai alternative", "ai calorie counter app"],
    checked: "2026-09-18",
    updated: "2026-09-18",
    what:
      "Cal AI is a calorie tracker built around photographing meals. Its site describes photo-based calorie and macro estimation, barcode scanning, manual and custom-food logging, portion estimation using the phone's depth sensors, step tracking via Apple Health and Google Fit, and integrations with other fitness platforms.",
    price: null,
    trial: "3-day free trial, as advertised on Cal AI's site",
    freeTier:
      "Free to download, but Cal AI publishes no subscription price on its website — the number is shown in the app, and reported prices vary by region and by user. We are not going to quote one we cannot verify.",
    rows: [
      {
        axis: "What the camera is pointed at",
        us: { v: "yes", note: "You. One weekly photo, scored out of 100." },
        them: { v: "yes", note: "Your food. A plate, recognised and costed in calories and macros." },
      },
      {
        axis: "Photo physique score",
        us: US.scan,
        them: { v: "no", note: "Cal AI's site describes nutrition tracking only — no body or physique scanning." },
      },
      {
        axis: "Portion estimation from depth data",
        us: { v: "no", note: "Our food logging estimates from the image and your description; it does not use depth sensing." },
        them: { v: "yes", note: "Uses the phone's depth sensors to estimate volume." },
      },
      {
        axis: "Training plan built for you",
        us: US.plan,
        them: { v: "no", note: "No workout programming appears in Cal AI's feature list." },
      },
      {
        axis: "Published price",
        us: { v: "partial", note: "Free to start; Pro pricing lives on the store listings, which stay current." },
        them: { v: "no", note: "No price published on the website; shown in-app." },
      },
      {
        axis: "Free tier",
        us: US.freeStart,
        them: { v: "partial", note: "Free download and a 3-day trial; the photo logging that people install it for is paid." },
      },
    ],
    theirEdge: [
      "Cal AI's meal photography is its whole product and it is fast. Depth-based portion estimation is a real technical advantage over apps that guess volume from a flat image, ours included.",
      "If all you want is to stop typing food into a search box, it is a smaller, simpler thing to adopt than a training app.",
      "It integrates step and activity data from Apple Health and Google Fit out of the box.",
    ],
    ourEdge: [
      "Cal AI counts the input. It has no view on training, and nothing in it looks at the body the calories are for.",
      "Dietly Fit's camera is pointed the other way: the weekly scan produces the score and the weak point, and the training week follows from them.",
      "Our pricing is on the App Store and Google Play listings, where a price can actually be kept current, rather than set per user behind a paywall.",
    ],
    pickThem:
      "Pick Cal AI if you want the fastest way to log a meal from a photo and you already have your training handled.",
    pickUs:
      "Pick Dietly Fit if you want the training itself decided from a weekly measurement of your physique, with good-enough food logging included.",
    sources: [{ label: "Cal AI — product site", href: "https://www.calai.app/" }],
  },

  {
    slug: "bodygram",
    name: "Bodygram",
    title: "Dietly Fit vs Bodygram: Physique Score vs Body Measurements",
    description:
      "Bodygram turns a phone scan into 35 body measurements and a composition estimate. Dietly Fit turns a photo into a score and a training week. What each is actually for.",
    blurb: "Measurements and composition from a phone scan — but no plan attached to them.",
    keywords: [
      "dietly vs bodygram",
      "bodygram alternative",
      "ai body measurement app",
      "phone body scan app",
    ],
    checked: "2026-09-18",
    updated: "2026-09-18",
    what:
      "Bodygram is an AI body-measurement platform. From a smartphone scan it produces 35 body measurements, a body-composition estimate covering body fat and muscle mass, and posture analysis. It sells both to businesses — retailers, insurers, fitness brands — and through consumer apps including Wellness by Bodygram and Body2Fit.",
    price: null,
    trial: "Free account, per Bodygram's site",
    freeTier:
      "Bodygram publishes no consumer subscription price on its site; the commercial terms are largely enterprise. Treat the free account as the entry point and check in-app for anything paid.",
    rows: [
      {
        axis: "Measurements from a phone scan",
        us: { v: "partial", note: "A score out of 100 and a body-fat estimate — not a tape-measure replacement." },
        them: { v: "yes", note: "35 body measurements. This is the thing it is built to do." },
      },
      {
        axis: "Body-composition estimate",
        us: { v: "yes", note: "Body fat, estimated from the weekly photo." },
        them: { v: "yes", note: "Body fat and muscle mass, plus posture analysis." },
      },
      {
        axis: "A single number to track week to week",
        us: US.scan,
        them: { v: "partial", note: "Progress tracking exists in the Wellness app; the output is measurements rather than one score." },
      },
      {
        axis: "Names a weak point to train around",
        us: US.weakPoint,
        them: { v: "no", note: "It reports measurements; interpreting them is left to you." },
      },
      {
        axis: "Training plan built for you",
        us: US.plan,
        them: { v: "no", note: "No workout programming — Bodygram is a measurement platform." },
      },
      {
        axis: "Food logging",
        us: US.food,
        them: { v: "no" },
      },
    ],
    theirEdge: [
      "For measurements, Bodygram is the more serious product. Thirty-five circumferences from a phone scan is a category we are not in, and if you want to know your chest in centimetres rather than a score out of 100, it is the right tool.",
      "Its technology is licensed by retailers and insurers, which means it has been held to accuracy standards a consumer app never faces.",
      "Posture analysis is a real output that we do not produce at all, and for anyone whose limiting factor is how they stand rather than how much fat they are carrying, that alone is the better reason to scan.",
    ],
    ourEdge: [
      "Bodygram gives you numbers and stops. Nothing in it tells you what to do on Tuesday.",
      "Dietly Fit exists to close that gap: the score names a weak point, the weak point builds the week, and the next scan checks the work.",
      "The output is deliberately one number and one instruction, because thirty-five measurements is more data than most people convert into a decision.",
    ],
    pickThem:
      "Pick Bodygram if you want accurate body measurements — for clothing, for a client, or because you track circumferences seriously.",
    pickUs:
      "Pick Dietly Fit if you want the measurement to produce a training week rather than a report.",
    sources: [{ label: "Bodygram — product site", href: "https://bodygram.com/" }],
  },
];

export const COMPETITOR_BY_SLUG = new Map(COMPETITORS.map((c) => [c.slug, c]));

export function competitor(slug: string): Competitor {
  const found = COMPETITOR_BY_SLUG.get(slug);
  if (!found) throw new Error(`Unknown competitor slug: ${slug}`);
  return found;
}

/** The roundup's own last-changed date. It is hand-written prose over the same
 *  registry, so it does not inherit a date from any single entry. */
export const ROUNDUP_UPDATED = "2026-09-18";
export const ROUNDUP_SLUG = "best-ai-body-scan-apps";

export function competitorMetadata(slug: string) {
  const c = competitor(slug);
  return {
    // Absolute: the layout template appends " | Dietly Fit", and "Dietly Fit vs Fitbod
    // | Dietly Fit" spends eight characters of a 65-character budget saying the
    // brand a second time.
    title: { absolute: c.title },
    description: c.description,
    keywords: c.keywords,
    alternates: { canonical: `/vs/${c.slug}` },
    openGraph: {
      title: c.title,
      description: c.description,
      url: `/vs/${c.slug}`,
      type: "article" as const,
      modifiedTime: c.updated,
    },
  };
}
