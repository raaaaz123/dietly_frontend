/**
 * Training plans, described once — same registry pattern as `lib/tools.ts`,
 * `lib/guides.ts` and `lib/competitors.ts`.
 *
 * ## Why this cluster exists
 *
 * Google Trends, worldwide, for the week to 2026-09-22, on the "workout" seed:
 *
 *     home workout                    100
 *     workout plan                     45
 *     workout equipment                43
 *     home workout equipment           34
 *     home workout routines            32   (+150%)
 *     calisthenics / calisthenics workout  31   (+30%)
 *     best workout apps                30   (+70%)
 *     home workout without equipment   27   (+50%)
 *     calisthenics workout plan        26   (+40%)
 *
 * `home workout` is the largest term in the entire export, and the site had
 * nothing for it. The exercise cluster holds 131 bodyweight movements that
 * answer it directly — they were simply not assembled into anything a person
 * searching for a *plan* would recognise as one.
 *
 * Those Trends numbers are a 0–100 index normalised within their own result
 * set, not absolute volume, and they are one week of data. They establish
 * relative shape and direction. They are not a forecast, and nothing here
 * should be read as one.
 *
 * ## The rule for adding a plan
 *
 * A plan page has to contain an actual plan. The category is saturated with
 * pages that describe training in general terms and never commit to a session,
 * and they are worth nothing to a reader and nothing to a model trying to
 * quote one. So every entry below names its days, its movements, its sets, its
 * reps and its rest, and links each movement to its own catalogue page.
 *
 * Where the catalogue has no entry for a movement, the movement is still named
 * — `slug: null` — rather than swapped for a worse exercise that happens to be
 * in the database. The plan serves the reader; the catalogue serves the plan.
 */

export type Block = {
  /** What the reader does. */
  name: string;
  /** Catalogue slug, or null when we have no page for this movement yet. */
  slug: string | null;
  sets: string;
  reps: string;
  rest: string;
  /** The one thing that makes this movement work in this slot. */
  note?: string;
};

export type Session = {
  day: string;
  focus: string;
  blocks: Block[];
};

export type Workout = {
  slug: string;
  name: string;
  title: string;
  description: string;
  blurb: string;
  keywords: string[];
  updated: string;
  /** Rendered under the H1. One sentence, definition-first. */
  intro: string;
  level: string;
  daysPerWeek: string;
  equipment: string;
  sessionLength: string;
  sessions: Session[];
  related: string[];
};

export const WORKOUTS: Workout[] = [
  {
    slug: "home-workout",
    name: "Home Workout Plan",
    title: "Home Workout Plan — 4 Days, No Gym",
    description:
      "A four-day home workout routine you can run in a living room with no equipment: the full week laid out with sets, reps, rest and a demo clip for every movement.",
    blurb: "Four sessions a week, no equipment, the whole week written out.",
    keywords: [
      "home workout",
      "home workout routine",
      "workout at home",
      "home workout plan",
    ],
    updated: "2026-09-22",
    intro:
      "A home workout is a training session built around bodyweight and whatever furniture you already own. Done properly it builds muscle and strength as well as a gym does for the first year or two of training, because the thing that drives adaptation is effort close to failure — not the equipment that produced it.",
    level: "Beginner to intermediate",
    daysPerWeek: "4",
    equipment: "None. A chair and a wall.",
    sessionLength: "30–40 minutes",
    sessions: [
      {
        day: "Day 1",
        focus: "Push — chest, shoulders, triceps",
        blocks: [
          { name: "Push-up", slug: "chest-tap-push-up", sets: "4", reps: "8–15", rest: "90s", note: "Elevate your hands on a table if you cannot reach 8; lower the surface as you get stronger." },
          { name: "Archer push-up", slug: "archer-push-up", sets: "3", reps: "5–8 each side", rest: "90s", note: "The step between a push-up and a one-arm push-up." },
          { name: "Bench dip, knees bent", slug: "bench-dip-knees-bent", sets: "3", reps: "10–15", rest: "60s", note: "Straighten your legs to make it harder." },
          { name: "Pike push-up", slug: null, sets: "3", reps: "6–12", rest: "60s", note: "Hips high, head towards the floor. This is your overhead press at home." },
          { name: "Cobra push-up", slug: "cobra-push-up", sets: "2", reps: "10–12", rest: "45s" },
        ],
      },
      {
        day: "Day 2",
        focus: "Legs — quads, hamstrings, glutes, calves",
        blocks: [
          { name: "Bodyweight squat", slug: "bodyweight-overhead-squat", sets: "4", reps: "15–25", rest: "90s", note: "Hold the bottom for a second if the reps get easy." },
          { name: "Bulgarian split squat", slug: "bulgarian-split-squat", sets: "3", reps: "8–12 each leg", rest: "90s", note: "Back foot on a chair. The hardest leg movement you can do without weights." },
          { name: "Bodyweight rear lunge", slug: "bodyweight-rear-lunge", sets: "3", reps: "10–12 each leg", rest: "60s" },
          { name: "Glute bridge", slug: "bridge-hip-abduction", sets: "3", reps: "15–20", rest: "45s", note: "Squeeze hard at the top; the range comes from the hips." },
          { name: "Standing calf raise", slug: "bodyweight-standing-calf-raise", sets: "3", reps: "15–25", rest: "45s", note: "Off a step for more range." },
        ],
      },
      {
        day: "Day 3",
        focus: "Pull — back and biceps",
        blocks: [
          { name: "Bent-over row with a towel", slug: "bent-over-row-with-towel", sets: "4", reps: "10–15", rest: "90s", note: "A towel round a door handle. Pull hard and resist on the way back." },
          { name: "Kneeling push-up to row", slug: "bodyweight-kneeling-push-up-row", sets: "3", reps: "8–12", rest: "60s" },
          { name: "Alternating superman", slug: "alternating-superman", sets: "3", reps: "12–15", rest: "45s", note: "For the lower back and rear shoulders, which bodyweight training otherwise misses." },
          { name: "Around-the-world superman hold", slug: "around-the-world-superman-hold", sets: "2", reps: "20–30s", rest: "45s" },
          { name: "Pull-up, if you have a bar", slug: "archer-pull-up", sets: "3", reps: "As many as possible", rest: "120s", note: "Optional. Nothing else at home replaces it — a doorway bar is the one purchase worth making." },
        ],
      },
      {
        day: "Day 4",
        focus: "Core and conditioning",
        blocks: [
          { name: "Burpee", slug: "burpee", sets: "5", reps: "8–12", rest: "60s", note: "The whole conditioning block in one movement." },
          { name: "Body-saw plank", slug: "body-saw-plank", sets: "3", reps: "8–12", rest: "45s" },
          { name: "Bridge to mountain climber", slug: "bridge---mountain-climber", sets: "3", reps: "20 total", rest: "45s" },
          { name: "Alternate leg raise", slug: "alternate-leg-raise", sets: "3", reps: "12–15 each side", rest: "45s" },
          { name: "Bicycle twisting crunch", slug: "bycicle-twisting-crunch", sets: "3", reps: "15–20 each side", rest: "45s" },
        ],
      },
    ],
    related: ["home-workout-without-equipment", "calisthenics-workout-plan"],
  },

  {
    slug: "home-workout-without-equipment",
    name: "No-Equipment Workout",
    title: "Home Workout Without Equipment — Full Body",
    description:
      "A full-body workout with no equipment at all — not even a chair. Three circuits, scaled from beginner to advanced, with a demo clip for every movement.",
    blurb: "Nothing but floor space. Three circuits, scalable in both directions.",
    keywords: [
      "home workout without equipment",
      "no equipment workout",
      "bodyweight workout at home",
      "full body workout at home",
    ],
    updated: "2026-09-22",
    intro:
      "This is a full-body session that needs nothing but floor space — no bar, no bands, no chair. It is built as three circuits so that the limiting factor is your effort rather than your rest timer, which is what makes a no-equipment session hard enough to be worth doing.",
    level: "All levels — each movement scales",
    daysPerWeek: "3",
    equipment: "Nothing at all",
    sessionLength: "25–35 minutes",
    sessions: [
      {
        day: "Circuit A",
        focus: "Three rounds, 60s rest between rounds",
        blocks: [
          { name: "Bodyweight squat", slug: "bodyweight-overhead-squat", sets: "3 rounds", reps: "20", rest: "—", note: "Arms overhead makes it harder without adding load." },
          { name: "Push-up", slug: "chest-tap-push-up", sets: "3 rounds", reps: "10–15", rest: "—", note: "Knees down to scale; feet elevated to progress." },
          { name: "Alternating superman", slug: "alternating-superman", sets: "3 rounds", reps: "15", rest: "60s after the round" },
        ],
      },
      {
        day: "Circuit B",
        focus: "Three rounds, 60s rest between rounds",
        blocks: [
          { name: "Bodyweight rear lunge", slug: "bodyweight-rear-lunge", sets: "3 rounds", reps: "12 each leg", rest: "—" },
          { name: "Pike push-up", slug: null, sets: "3 rounds", reps: "8–12", rest: "—", note: "Your shoulder work. Walk your feet closer to your hands to make it harder." },
          { name: "Glute bridge", slug: "bridge-hip-abduction", sets: "3 rounds", reps: "20", rest: "60s after the round" },
        ],
      },
      {
        day: "Circuit C",
        focus: "Two rounds, straight through",
        blocks: [
          { name: "Burpee", slug: "burpee", sets: "2 rounds", reps: "10", rest: "—" },
          { name: "Body-saw plank", slug: "body-saw-plank", sets: "2 rounds", reps: "10", rest: "—" },
          { name: "Bicycle twisting crunch", slug: "bycicle-twisting-crunch", sets: "2 rounds", reps: "20 each side", rest: "90s after the round" },
        ],
      },
    ],
    related: ["home-workout", "calisthenics-workout-plan"],
  },

  {
    slug: "calisthenics-workout-plan",
    name: "Calisthenics Plan",
    title: "Calisthenics Workout Plan — Beginner to Advanced",
    description:
      "A calisthenics programme built on the six fundamental bodyweight patterns, with the progression ladder that takes each one from a scaled version to the full movement.",
    blurb: "Six patterns, and the ladder that takes each from scaled to full.",
    keywords: [
      "calisthenics workout plan",
      "calisthenics workout",
      "calisthenics for beginners",
      "bodyweight training programme",
    ],
    updated: "2026-09-22",
    intro:
      "Calisthenics is strength training where the resistance is your own bodyweight, and progression comes from changing leverage rather than adding plates. That single difference is what makes it work: a movement gets harder by moving your body further from a mechanical advantage, and there is a long ladder of those between a knee push-up and a one-arm push-up.",
    level: "Beginner through advanced",
    daysPerWeek: "3–4",
    equipment: "A pull-up bar. Everything else is optional.",
    sessionLength: "40–50 minutes",
    sessions: [
      {
        day: "Session A",
        focus: "Upper body push and pull",
        blocks: [
          { name: "Pull-up", slug: "archer-pull-up", sets: "4", reps: "3–8", rest: "150s", note: "Progression: dead hang → negatives → band-assisted → full → archer." },
          { name: "Push-up progression", slug: "archer-push-up", sets: "4", reps: "5–12", rest: "120s", note: "Progression: incline → full → diamond → archer → one-arm." },
          { name: "Chest dip", slug: "chest-dip", sets: "3", reps: "6–12", rest: "120s", note: "The heaviest push most people can load at home." },
          { name: "Commando pull-up", slug: "commando-pull-up", sets: "2", reps: "4–6 each side", rest: "90s" },
        ],
      },
      {
        day: "Session B",
        focus: "Lower body and posterior chain",
        blocks: [
          { name: "Bulgarian split squat", slug: "bulgarian-split-squat", sets: "4", reps: "8–12 each leg", rest: "120s", note: "Progression towards the pistol squat starts here." },
          { name: "Bodyweight pulse squat", slug: "bodyweight-pulse-squat", sets: "3", reps: "15–20", rest: "90s" },
          { name: "Bodyweight wall squat", slug: "bodyweight-wall-squat", sets: "3", reps: "45–60s hold", rest: "60s" },
          { name: "Standing calf raise", slug: "bodyweight-standing-calf-raise", sets: "4", reps: "15–25", rest: "45s" },
        ],
      },
      {
        day: "Session C",
        focus: "Skill, core and conditioning",
        blocks: [
          { name: "Hollow body hold", slug: null, sets: "4", reps: "20–40s", rest: "60s", note: "The base position for almost every calisthenics skill. Learn it before chasing a lever." },
          { name: "Arm slingers, hanging straight leg", slug: "arm-slingers-hanging-straight-legs", sets: "3", reps: "8–12", rest: "90s" },
          { name: "Around-the-world superman hold", slug: "around-the-world-superman-hold", sets: "3", reps: "20–30s", rest: "60s" },
          { name: "Burpee", slug: "burpee", sets: "4", reps: "10–15", rest: "60s" },
        ],
      },
    ],
    related: ["home-workout", "home-workout-without-equipment"],
  },

  {
    slug: "push-pull-legs",
    name: "Push Pull Legs",
    title: "Push Pull Legs Workout Plan — 6 Day Split",
    description:
      "The full PPL split written out: six sessions, every movement with sets, reps and rest, and a demo clip for each. Run it as 6 days or 3 — both are laid out.",
    blurb: "The classic six-day split, with the three-day version underneath it.",
    keywords: [
      "push pull legs",
      "push pull legs workout plan",
      "ppl split",
      "push pull legs 6 day split",
    ],
    updated: "2026-09-23",
    intro:
      "Push Pull Legs divides training by movement pattern rather than by muscle: everything that presses on one day, everything that pulls on the next, legs on the third. Because the muscles used on each day barely overlap with the day either side, the split recovers cleanly at high frequency — which is why it survives as the default once someone trains more than three times a week.",
    level: "Intermediate — one year of consistent lifting",
    daysPerWeek: "6 (or 3, see below)",
    equipment: "Full gym",
    sessionLength: "60–75 minutes",
    sessions: [
      {
        day: "Push A",
        focus: "Chest, shoulders, triceps — heavy",
        blocks: [
          { name: "Barbell bench press", slug: "barbell-bench-press", sets: "4", reps: "5–8", rest: "180s", note: "The session's heaviest set. Everything after it is accessory work." },
          { name: "Barbell seated overhead press", slug: "barbell-seated-overhead-press", sets: "3", reps: "6–10", rest: "150s" },
          { name: "Barbell incline bench press", slug: "barbell-incline-bench-press", sets: "3", reps: "8–12", rest: "120s" },
          { name: "Cable lateral raise", slug: "cable-lateral-raise", sets: "3", reps: "12–15", rest: "60s", note: "Side delts get almost nothing from pressing. This is the whole reason they are here." },
          { name: "Triceps extension", slug: "alternate-triceps-extension", sets: "3", reps: "10–15", rest: "60s" },
        ],
      },
      {
        day: "Pull A",
        focus: "Back, rear delts, biceps — heavy",
        blocks: [
          { name: "Barbell bent over row", slug: "barbell-bent-over-row", sets: "4", reps: "6–10", rest: "180s", note: "The horizontal counterweight to Push A's bench press." },
          { name: "Pull-up", slug: "archer-pull-up", sets: "3", reps: "6–10", rest: "150s", note: "Add weight once you clear 10 clean reps." },
          { name: "Cable front seated row", slug: "cable-front-seated-row", sets: "3", reps: "10–12", rest: "90s" },
          { name: "Barbell shrug", slug: "barbell-shrug", sets: "3", reps: "12–15", rest: "60s" },
          { name: "Barbell curl", slug: "barbell-curl", sets: "3", reps: "8–12", rest: "60s" },
        ],
      },
      {
        day: "Legs A",
        focus: "Quads, hamstrings, glutes, calves — heavy",
        blocks: [
          { name: "Barbell squat", slug: "barbell-squat", sets: "4", reps: "5–8", rest: "180s" },
          { name: "Barbell Romanian deadlift", slug: "barbell-romanian-deadlift", sets: "3", reps: "8–12", rest: "150s", note: "Hamstrings need a hinge, not just a squat. Do not skip this for more quad work." },
          { name: "Bulgarian split squat", slug: "bulgarian-split-squat", sets: "3", reps: "8–12 each leg", rest: "90s" },
          { name: "Leg curl", slug: "cable-assisted-inverse-leg-curl", sets: "3", reps: "12–15", rest: "60s" },
          { name: "Standing calf raise", slug: "barbell-standing-calf-raise", sets: "4", reps: "12–20", rest: "45s" },
        ],
      },
      {
        day: "Push B",
        focus: "Chest, shoulders, triceps — volume",
        blocks: [
          { name: "Barbell incline bench press", slug: "barbell-incline-bench-press", sets: "4", reps: "8–12", rest: "150s", note: "Incline leads today; the flat press led on Push A." },
          { name: "Chest dip", slug: "chest-dip", sets: "3", reps: "8–12", rest: "120s", note: "Lean forward to bias the chest, stay upright for triceps." },
          { name: "Chest fly", slug: "band-chest-fly", sets: "3", reps: "12–15", rest: "60s" },
          { name: "Cable lateral raise", slug: "cable-lateral-raise", sets: "4", reps: "12–20", rest: "45s" },
          { name: "Triceps extension", slug: "alternate-triceps-extension", sets: "3", reps: "12–15", rest: "60s" },
        ],
      },
      {
        day: "Pull B",
        focus: "Back, rear delts, biceps — volume",
        blocks: [
          { name: "Cable pulldown", slug: "cable-pulldown", sets: "4", reps: "10–12", rest: "120s", note: "Vertical pull leads today; the row led on Pull A." },
          { name: "Cable front seated row", slug: "cable-front-seated-row", sets: "3", reps: "12–15", rest: "90s" },
          { name: "Bent over lateral raise", slug: "cable-bent-over-one-arm-lateral-raise", sets: "3", reps: "15–20", rest: "60s", note: "Rear delts. The most commonly skipped muscle in this whole plan." },
          { name: "Barbell curl", slug: "barbell-curl", sets: "3", reps: "10–15", rest: "60s" },
          { name: "Alternate biceps curl", slug: "alternate-biceps-curl", sets: "2", reps: "12–15 each arm", rest: "45s" },
        ],
      },
      {
        day: "Legs B",
        focus: "Posterior chain led",
        blocks: [
          { name: "Barbell deadlift", slug: "barbell-deadlift", sets: "3", reps: "3–6", rest: "240s", note: "Heavy and low-rep. Deadlifts cost more recovery than any other lift here." },
          { name: "Barbell front squat", slug: "barbell-front-squat", sets: "3", reps: "8–12", rest: "150s" },
          { name: "Barbell hip thrust", slug: "barbell-hip-thrust", sets: "3", reps: "10–15", rest: "90s" },
          { name: "Leg extension", slug: "band-seated-leg-extension", sets: "3", reps: "12–15", rest: "60s" },
          { name: "Standing calf raise", slug: "barbell-standing-calf-raise", sets: "4", reps: "12–20", rest: "45s" },
        ],
      },
    ],
    related: ["upper-lower-split", "beginner-gym-workout"],
  },

  {
    slug: "upper-lower-split",
    name: "Upper Lower Split",
    title: "Upper Lower Split — 4 Day Workout Plan",
    description:
      "A four-day upper/lower split with every session written out — sets, reps, rest and a demo clip per movement. Each muscle trained twice a week.",
    blurb: "Four days, each muscle twice a week. The best frequency-to-recovery trade there is.",
    keywords: [
      "upper lower split",
      "upper lower workout plan",
      "4 day workout split",
      "upper body lower body split",
    ],
    updated: "2026-09-23",
    intro:
      "An upper/lower split alternates a session for everything above the waist with a session for everything below it, four times a week. It hits the frequency that matters — each muscle trained roughly every 72 hours, which is about how long the growth signal from a hard session lasts — without the six-day commitment a Push Pull Legs schedule asks for.",
    level: "Beginner to intermediate",
    daysPerWeek: "4",
    equipment: "Full gym",
    sessionLength: "55–70 minutes",
    sessions: [
      {
        day: "Upper A",
        focus: "Horizontal press and pull led",
        blocks: [
          { name: "Barbell bench press", slug: "barbell-bench-press", sets: "4", reps: "5–8", rest: "180s" },
          { name: "Barbell bent over row", slug: "barbell-bent-over-row", sets: "4", reps: "6–10", rest: "150s", note: "Paired with the bench press on purpose — equal pressing and pulling volume is what keeps shoulders healthy." },
          { name: "Barbell seated overhead press", slug: "barbell-seated-overhead-press", sets: "3", reps: "8–12", rest: "120s" },
          { name: "Cable pulldown", slug: "cable-pulldown", sets: "3", reps: "10–12", rest: "90s" },
          { name: "Barbell curl", slug: "barbell-curl", sets: "3", reps: "10–12", rest: "60s" },
          { name: "Triceps extension", slug: "alternate-triceps-extension", sets: "3", reps: "10–15", rest: "60s" },
        ],
      },
      {
        day: "Lower A",
        focus: "Squat led",
        blocks: [
          { name: "Barbell squat", slug: "barbell-squat", sets: "4", reps: "5–8", rest: "180s" },
          { name: "Barbell Romanian deadlift", slug: "barbell-romanian-deadlift", sets: "3", reps: "8–12", rest: "150s" },
          { name: "Bulgarian split squat", slug: "bulgarian-split-squat", sets: "3", reps: "10 each leg", rest: "90s" },
          { name: "Leg curl", slug: "cable-assisted-inverse-leg-curl", sets: "3", reps: "12–15", rest: "60s" },
          { name: "Standing calf raise", slug: "barbell-standing-calf-raise", sets: "4", reps: "12–20", rest: "45s" },
        ],
      },
      {
        day: "Upper B",
        focus: "Vertical press and pull led",
        blocks: [
          { name: "Barbell seated overhead press", slug: "barbell-seated-overhead-press", sets: "4", reps: "5–8", rest: "180s" },
          { name: "Pull-up", slug: "archer-pull-up", sets: "4", reps: "6–10", rest: "150s" },
          { name: "Barbell incline bench press", slug: "barbell-incline-bench-press", sets: "3", reps: "8–12", rest: "120s" },
          { name: "Cable front seated row", slug: "cable-front-seated-row", sets: "3", reps: "10–12", rest: "90s" },
          { name: "Cable lateral raise", slug: "cable-lateral-raise", sets: "3", reps: "12–20", rest: "45s" },
          { name: "Alternate biceps curl", slug: "alternate-biceps-curl", sets: "3", reps: "12 each arm", rest: "45s" },
        ],
      },
      {
        day: "Lower B",
        focus: "Hinge led",
        blocks: [
          { name: "Barbell deadlift", slug: "barbell-deadlift", sets: "3", reps: "3–6", rest: "240s" },
          { name: "Barbell front squat", slug: "barbell-front-squat", sets: "3", reps: "8–12", rest: "150s" },
          { name: "Barbell hip thrust", slug: "barbell-hip-thrust", sets: "3", reps: "10–15", rest: "90s" },
          { name: "Leg extension", slug: "band-seated-leg-extension", sets: "3", reps: "12–15", rest: "60s" },
          { name: "Body-saw plank", slug: "body-saw-plank", sets: "3", reps: "10–12", rest: "45s" },
        ],
      },
    ],
    related: ["push-pull-legs", "beginner-gym-workout"],
  },

  {
    slug: "beginner-gym-workout",
    name: "Beginner Gym Workout",
    title: "Beginner Gym Workout Plan — First 12 Weeks",
    description:
      "A three-day full-body gym plan for a complete beginner: the same six movements every session, how much to add each week, and a demo clip for every lift.",
    blurb: "Three days, six movements, twelve weeks. Built to be repeated, not admired.",
    keywords: [
      "beginner gym workout",
      "gym workout plan for beginners",
      "beginner workout plan",
      "first gym workout",
    ],
    updated: "2026-09-23",
    intro:
      "A beginner gym plan should be boring on purpose. For the first few months almost any hard training works, so the thing that decides your results is not exercise selection — it is showing up and adding weight. This is three full-body sessions a week built from six movements, repeated until they stop getting heavier.",
    level: "Complete beginner",
    daysPerWeek: "3, on non-consecutive days",
    equipment: "Full gym",
    sessionLength: "45–55 minutes",
    sessions: [
      {
        day: "Day A",
        focus: "Full body — squat led",
        blocks: [
          { name: "Barbell squat", slug: "barbell-squat", sets: "3", reps: "5", rest: "180s", note: "Start with the empty bar. Genuinely. Learn the groove before it is heavy." },
          { name: "Barbell bench press", slug: "barbell-bench-press", sets: "3", reps: "5", rest: "180s", note: "Use a rack or a spotter from the first session, not from the first failed rep." },
          { name: "Barbell bent over row", slug: "barbell-bent-over-row", sets: "3", reps: "8", rest: "120s" },
          { name: "Cable lateral raise", slug: "cable-lateral-raise", sets: "2", reps: "12–15", rest: "60s" },
          { name: "Body-saw plank", slug: "body-saw-plank", sets: "2", reps: "8–10", rest: "45s" },
        ],
      },
      {
        day: "Day B",
        focus: "Full body — hinge led",
        blocks: [
          { name: "Barbell Romanian deadlift", slug: "barbell-romanian-deadlift", sets: "3", reps: "8", rest: "180s", note: "Learn the hinge here before attempting a deadlift from the floor." },
          { name: "Barbell seated overhead press", slug: "barbell-seated-overhead-press", sets: "3", reps: "5", rest: "180s" },
          { name: "Cable pulldown", slug: "cable-pulldown", sets: "3", reps: "10", rest: "120s", note: "Builds towards a pull-up. Reduce the weight as you get stronger, not the reps." },
          { name: "Barbell curl", slug: "barbell-curl", sets: "2", reps: "10–12", rest: "60s" },
          { name: "Standing calf raise", slug: "barbell-standing-calf-raise", sets: "2", reps: "15", rest: "45s" },
        ],
      },
      {
        day: "Day C",
        focus: "Full body — repeat of A, heavier",
        blocks: [
          { name: "Barbell squat", slug: "barbell-squat", sets: "3", reps: "5", rest: "180s", note: "2.5 kg heavier than Day A if all three sets were clean." },
          { name: "Barbell incline bench press", slug: "barbell-incline-bench-press", sets: "3", reps: "8", rest: "150s" },
          { name: "Cable front seated row", slug: "cable-front-seated-row", sets: "3", reps: "10", rest: "120s" },
          { name: "Bulgarian split squat", slug: "bulgarian-split-squat", sets: "2", reps: "10 each leg", rest: "90s" },
          { name: "Triceps extension", slug: "alternate-triceps-extension", sets: "2", reps: "12", rest: "60s" },
        ],
      },
    ],
    related: ["upper-lower-split", "push-pull-legs"],
  },
];

export const WORKOUT_BY_SLUG = new Map(WORKOUTS.map((w) => [w.slug, w]));

export function workout(slug: string): Workout {
  const found = WORKOUT_BY_SLUG.get(slug);
  if (!found) throw new Error(`Unknown workout slug: ${slug}`);
  return found;
}

export function workoutMetadata(slug: string) {
  const w = workout(slug);
  return {
    title: w.title,
    description: w.description,
    keywords: w.keywords,
    alternates: { canonical: `/workouts/${w.slug}` },
    openGraph: {
      title: w.title,
      description: w.description,
      url: `/workouts/${w.slug}`,
      type: "article" as const,
      modifiedTime: w.updated,
    },
  };
}

export const WORKOUTS_UPDATED = "2026-09-22";
