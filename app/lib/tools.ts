/**
 * Every free calculator on the site, described once.
 *
 * Four things need this list and used to disagree about it: the sitemap (a
 * hand-written array that went stale the moment anyone added a page), the
 * `/tools` hub, the "related tools" strip at the bottom of each calculator, and
 * each page's own metadata. Adding a tool is now one entry here plus the page
 * itself, and the sitemap picks it up for free.
 *
 * `related` is deliberately hand-picked rather than "the other five". Internal
 * links are worth something when they lead somewhere a reader actually wants to
 * go next, and worth nothing as a footer of every URL on the site.
 */

export type Tool = {
  slug: string;
  /** Short name, for nav and link text. */
  name: string;
  /** <title>, without the brand — the layout template appends it. */
  title: string;
  description: string;
  /** One line for the hub page card. */
  blurb: string;
  keywords: string[];
  /** Last time the page's content actually changed. Drives the sitemap. */
  lastModified: string;
  /** Slugs of the two or three tools worth linking to from this one. */
  related: string[];
};

export const TOOLS: Tool[] = [
  {
    slug: "macro-calculator",
    name: "Macro Calculator",
    title: "Macro Calculator — TDEE & Macros for Your Goal",
    description:
      "Work out your daily calories and your protein, carb and fat split for fat loss, muscle gain or maintenance. Free, no signup, Mifflin-St Jeor.",
    blurb: "Daily calories plus a protein, carb and fat split built from your bodyweight.",
    keywords: ["macro calculator", "tdee calculator", "calorie calculator", "macro split"],
    lastModified: "2026-09-15",
    related: ["tdee-calculator", "protein-calculator", "calorie-deficit-calculator"],
  },
  {
    slug: "tdee-calculator",
    name: "TDEE Calculator",
    title: "TDEE Calculator — Daily Calorie Burn",
    description:
      "Calculate your Total Daily Energy Expenditure from your BMR and activity level, and see the calorie target for losing, holding or gaining weight.",
    blurb: "How many calories you burn in a day, and what that means for your goal.",
    keywords: ["tdee calculator", "maintenance calories", "bmr calculator", "daily calorie burn"],
    lastModified: "2026-09-15",
    related: ["macro-calculator", "calorie-deficit-calculator", "protein-calculator"],
  },
  {
    slug: "protein-calculator",
    name: "Protein Calculator",
    title: "Protein Calculator — How Much Protein Per Day",
    description:
      "Find your daily protein target in grams from your bodyweight and training goal, with the evidence for the 1.6–2.2 g/kg range and how to hit it.",
    blurb: "Your daily protein target in grams, and where the number comes from.",
    keywords: [
      "protein calculator",
      "how much protein per day",
      "protein intake calculator",
      "grams of protein",
    ],
    lastModified: "2026-09-15",
    related: ["macro-calculator", "tdee-calculator", "lean-body-mass-calculator"],
  },
  {
    slug: "calorie-deficit-calculator",
    name: "Calorie Deficit Calculator",
    title: "Calorie Deficit Calculator — Rate of Fat Loss",
    description:
      "See the daily calorie deficit you need to lose weight at a given rate, how long it will take, and the point where a bigger deficit starts costing you muscle.",
    blurb: "The deficit for your target rate — and an honest timeline.",
    keywords: [
      "calorie deficit calculator",
      "weight loss calculator",
      "how long to lose weight",
      "fat loss calculator",
    ],
    lastModified: "2026-09-15",
    related: ["tdee-calculator", "macro-calculator", "protein-calculator"],
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    title: "Body Fat Calculator — US Navy Method",
    description:
      "Estimate your body fat percentage from three tape measurements using the US Navy method. Free, no signup, and honest about its margin of error.",
    blurb: "Body fat percentage from a tape measure, with its real margin of error.",
    keywords: ["body fat calculator", "us navy body fat method", "body fat percentage"],
    lastModified: "2026-09-15",
    related: ["lean-body-mass-calculator", "macro-calculator", "ideal-weight-calculator"],
  },
  {
    slug: "lean-body-mass-calculator",
    name: "Lean Body Mass Calculator",
    title: "Lean Body Mass Calculator",
    description:
      "Calculate lean body mass from your weight and body fat percentage, or estimate it from height with the Boer formula. See what your scale weight is actually made of.",
    blurb: "What your scale weight is actually made of.",
    keywords: ["lean body mass calculator", "lbm calculator", "fat free mass"],
    lastModified: "2026-09-15",
    related: ["body-fat-calculator", "protein-calculator", "ideal-weight-calculator"],
  },
  {
    slug: "one-rep-max-calculator",
    name: "1RM Calculator",
    title: "One Rep Max Calculator — 1RM & Training Percentages",
    description:
      "Estimate your one-rep max from any set, see how four standard formulas disagree, and get the working weights for every percentage of it.",
    blurb: "Your estimated 1RM, the spread between formulas, and your working weights.",
    keywords: ["1rm calculator", "one rep max calculator", "max lift calculator", "training percentages"],
    lastModified: "2026-09-15",
    related: ["macro-calculator", "protein-calculator", "lean-body-mass-calculator"],
  },
  {
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    title: "Ideal Weight Calculator — Four Formulas Compared",
    description:
      "See your 'ideal' weight by the Devine, Robinson, Miller and Hamwi formulas, the healthy BMI range for your height, and why none of them know anything about your build.",
    blurb: "Four classic formulas, compared — and why they disagree with each other.",
    keywords: ["ideal weight calculator", "ideal body weight", "healthy weight for height"],
    lastModified: "2026-09-15",
    related: ["body-fat-calculator", "lean-body-mass-calculator", "tdee-calculator"],
  },
];

export const TOOL_BY_SLUG = new Map(TOOLS.map((t) => [t.slug, t]));

export function tool(slug: string): Tool {
  const found = TOOL_BY_SLUG.get(slug);
  // Thrown at build time, not runtime: every caller passes a literal, so a typo
  // should fail the build rather than render a page with a missing title.
  if (!found) throw new Error(`Unknown tool slug: ${slug}`);
  return found;
}

/** Metadata for a tool page, so no page restates its own title twice. */
export function toolMetadata(slug: string) {
  const t = tool(slug);
  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    alternates: { canonical: `/${t.slug}` },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `/${t.slug}`,
      type: "website" as const,
    },
  };
}
