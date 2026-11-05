/**
 * The editorial pages, described once — same pattern as `lib/tools.ts`.
 *
 * These exist because the homepage sells a Form Score and nothing on the site
 * explains what one is. A term you coined and never defined is a term nobody
 * can search for and no model can describe, so the cluster below is the
 * definitional work the product positioning has been missing.
 *
 * `updated` is a real date and it is rendered on the page. Health content
 * without a visible review date is content Google's raters are told to
 * distrust, and the date being honest is the only version of that worth having.
 */

export type Guide = {
  slug: string;
  title: string;
  /** The <h1>. Allowed to differ from the SERP title. */
  heading: string;
  description: string;
  blurb: string;
  keywords: string[];
  published: string;
  updated: string;
  /** Minutes, rounded. Rendered, so it should be roughly true. */
  readingMinutes: number;
  related: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "what-is-a-physique-score",
    title: "What Is a Physique Score? How Photo Scoring Works",
    heading: "What is a physique score?",
    description:
      "What a physique score measures, how photo scoring works, what it cannot tell you, and how it compares with BMI, body fat percentage and a DEXA scan.",
    blurb:
      "What the number means, how it is produced, and the four things it cannot see.",
    keywords: [
      "physique score",
      "body scan app",
      "ai physique analysis",
      "photo body fat estimate",
    ],
    published: "2026-09-15",
    updated: "2026-09-15",
    readingMinutes: 7,
    related: ["progress-photos-guide", "body-recomposition"],
  },
  {
    slug: "progress-photos-guide",
    title: "How to Take Comparable Progress Photos",
    heading: "How to take progress photos worth comparing",
    description:
      "Lighting, distance, pose and time of day: a repeatable progress photo setup, so the difference you see is real change, not a change in conditions.",
    blurb: "A repeatable setup, so week-to-week differences mean something.",
    keywords: [
      "progress photos",
      "how to take progress pictures",
      "body transformation photos",
      "fitness progress tracking",
    ],
    published: "2026-09-15",
    updated: "2026-09-15",
    readingMinutes: 6,
    related: ["what-is-a-physique-score", "body-recomposition"],
  },
  {
    slug: "body-recomposition",
    title: "Body Recomposition: Why the Scale Stops Being Useful",
    heading: "Body recomposition, and why the scale stops being useful",
    description:
      "How to lose fat and build muscle at the same time, who it works for, why the scale hides it, and how to eat and train for body recomposition.",
    blurb: "Losing fat and gaining muscle at once — and why weight barely moves.",
    keywords: [
      "body recomposition",
      "lose fat gain muscle",
      "scale not moving",
      "recomp",
    ],
    published: "2026-09-15",
    updated: "2026-09-15",
    readingMinutes: 8,
    related: ["what-is-a-physique-score", "training-around-a-weak-point"],
  },
  {
    slug: "training-around-a-weak-point",
    title: "How to Train Around a Weak Point",
    heading: "How to train around a weak point",
    description:
      "How to find the lagging muscle group holding your physique back, and how to train around it without wrecking the rest of your program.",
    blurb: "Finding the lagging area, and prioritising it without losing the rest.",
    keywords: [
      "lagging muscle group",
      "weak point training",
      "specialization phase",
      "bring up weak body part",
    ],
    published: "2026-09-15",
    updated: "2026-09-15",
    readingMinutes: 7,
    related: ["what-is-a-physique-score", "body-recomposition"],
  },

  {
    slug: "skinny-fat",
    title: "Skinny Fat: What It Is and How to Fix It",
    heading: "Skinny fat, and the only way out of it",
    description:
      "Why you can be a normal weight with high body fat, why dieting makes skinny fat worse, and the training and eating plan that actually fixes it.",
    blurb:
      "Normal weight, soft shape. Why cutting harder is the wrong answer, and what works.",
    keywords: [
      "skinny fat",
      "skinny fat meaning",
      "skinny fat to muscular",
      "normal weight obesity",
    ],
    published: "2026-09-23",
    updated: "2026-09-23",
    readingMinutes: 8,
    related: ["body-recomposition", "what-is-a-physique-score"],
  },
  {
    slug: "progressive-overload",
    title: "Progressive Overload: The Only Rule That Matters",
    heading: "Progressive overload, in practice",
    description:
      "What progressive overload actually means, the five ways to apply it beyond adding weight, how fast to add load, and what to do when the bar stops moving.",
    blurb:
      "The one principle behind every programme that works — and five ways to apply it.",
    keywords: [
      "progressive overload",
      "progressive overload meaning",
      "how to progress in the gym",
      "double progression",
    ],
    published: "2026-09-23",
    updated: "2026-09-23",
    readingMinutes: 7,
    related: ["how-long-to-build-muscle", "training-around-a-weak-point"],
  },
  {
    slug: "how-long-to-build-muscle",
    title: "How Long Does It Take to Build Muscle?",
    heading: "How long it actually takes to build muscle",
    description:
      "How long it takes to build muscle: realistic monthly rates of muscle gain by training age, sex and age, and why the first year is so different.",
    blurb:
      "Realistic rates by training year, and when the mirror catches up with the work.",
    keywords: [
      "how long to build muscle",
      "how long does it take to build muscle",
      "muscle growth rate",
      "newbie gains",
    ],
    published: "2026-09-23",
    updated: "2026-09-23",
    readingMinutes: 8,
    related: ["progressive-overload", "body-recomposition"],
  },
  {
    // The segment's own query. Search results for "rate my physique" and "AI
    // physique rating" are app-store listings and competitor blogs; nothing
    // explains how the rating works and where it fails, which is the page
    // worth being.
    slug: "rate-my-physique",
    title: "Rate My Physique: How AI Physique Ratings Work",
    heading: "Rate my physique: how AI physique ratings work",
    description:
      "How AI apps rate a physique from a photo, what the score is made of, how accurate it is, and how to take a photo that gets an honest, repeatable rating.",
    blurb: "What a physique rating measures, how accurate it is, and how to get an honest one.",
    keywords: [
      "rate my physique",
      "ai physique rating",
      "physique rating app",
      "rate my body ai",
      "physique analyzer",
    ],
    published: "2026-11-05",
    updated: "2026-11-05",
    readingMinutes: 7,
    related: ["what-is-a-physique-score", "body-fat-from-a-photo"],
  },
  {
    slug: "body-fat-from-a-photo",
    title: "Body Fat From a Photo: What Each % Looks Like",
    heading: "How to estimate body fat percentage from a photo",
    description:
      "What 10%, 15%, 20%, 25% and 30% body fat look like for men and women, how accurate a photo estimate is, and the methods that beat it.",
    blurb: "What each body fat range looks like, and how far a photo estimate can be trusted.",
    keywords: [
      "body fat percentage pictures",
      "body fat from photo",
      "estimate body fat percentage",
      "body fat percentage chart",
      "what does 15 body fat look like",
    ],
    published: "2026-11-05",
    updated: "2026-11-05",
    readingMinutes: 7,
    related: ["rate-my-physique", "skinny-fat"],
  },
  {
    // Ties straight to the scan's proportions reading, and "v taper" is a
    // searched term the physique-app SERPs do not answer with numbers.
    slug: "v-taper",
    title: "V-Taper: Shoulder-to-Waist Ratio and How to Build It",
    heading: "The V-taper: what a good shoulder-to-waist ratio is, and how to build one",
    description:
      "What a V-taper is, the shoulder-to-waist ratio that counts as good for men and women, how to measure yours, and the training and diet that widen it.",
    blurb: "The shoulder-to-waist ratio, how to measure it, and how to train it.",
    keywords: [
      "v taper",
      "shoulder to waist ratio",
      "how to get a v taper",
      "adonis index",
      "v shape body",
    ],
    published: "2026-11-05",
    updated: "2026-11-05",
    readingMinutes: 7,
    related: ["rate-my-physique", "training-around-a-weak-point"],
  },
  {
    slug: "how-to-get-abs",
    title: "How to Get Abs: Body Fat Thresholds and Training",
    heading: "How to get abs: the body fat they need, and the training that helps",
    description:
      "The body fat percentage where abs show for men and women, why crunches alone will not reveal them, how long it takes, and a plan that works.",
    blurb: "The body fat where abs appear, how long it takes, and what to train.",
    keywords: [
      "how to get abs",
      "body fat percentage to see abs",
      "how long to get abs",
      "visible abs",
      "how to get a six pack",
    ],
    published: "2026-11-05",
    updated: "2026-11-05",
    readingMinutes: 8,
    related: ["body-fat-from-a-photo", "body-recomposition"],
  },
];

export const GUIDE_BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));

export function guide(slug: string): Guide {
  const found = GUIDE_BY_SLUG.get(slug);
  if (!found) throw new Error(`Unknown guide slug: ${slug}`);
  return found;
}

export function guideMetadata(slug: string) {
  const g = guide(slug);
  return {
    title: g.title,
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      title: g.title,
      description: g.description,
      url: `/guides/${g.slug}`,
      type: "article" as const,
      publishedTime: g.published,
      modifiedTime: g.updated,
    },
  };
}
