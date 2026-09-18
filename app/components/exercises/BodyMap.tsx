/**
 * A body silhouette with one region lit, for the muscle cards on /exercises.
 *
 * One figure with twelve highlight states rather than twelve separate icons:
 * a reader scanning the grid is comparing *where on the body* each card is,
 * and that comparison only works if every card draws the same body. Twelve
 * bespoke glyphs would each be prettier on their own and useless as a set.
 *
 * Front view only. Four of the groups are posterior — back, triceps, hips and
 * hamstrings sit behind the figure — so those light the region at the position
 * it occupies rather than pretending the silhouette has turned around. At
 * 44px that reads as "upper body, rear" and not as an anatomical claim, which
 * is the right level of precision for a directory card. The real muscle map,
 * front and back, is in the app.
 *
 * Regions are plain shapes rather than traced anatomy on purpose: this has to
 * stay legible at 44px, and a faithful deltoid at that size is three grey
 * pixels.
 */

export type Region =
  | "shoulders"
  | "chest"
  | "back"
  | "biceps"
  | "triceps"
  | "forearms"
  | "waist"
  | "hips"
  | "quadriceps"
  | "thighs"
  | "calves"
  | "full";

/**
 * The one place on the site that keeps a hue.
 *
 * The rest of the palette is deliberately monochrome, and emphasis elsewhere is
 * carried by weight and one step of grey. That does not work here: the whole
 * job of these figures is "which part of the body", read at 34px in peripheral
 * vision while scanning a twelve-card grid, and an off-white patch on a grey
 * body is not a strong enough signal to do it.
 *
 * `#A7FF75` is the accent from the app's own screens — sampled from them, not
 * picked — so the lit muscle here matches the lit muscle in the product. It
 * will also match the exercise clips once `build-media` runs, provided
 * `exercise_brand.py` is moved off the old `#D2F53C` lime first.
 */
const ACTIVE = "#A7FF75";
const IDLE = "rgba(255,255,255,0.13)";

export default function BodyMap({
  region,
  size = 44,
  className = "",
}: {
  region: Region;
  size?: number;
  className?: string;
}) {
  const on = (...names: Region[]) =>
    names.includes(region) || region === "full" ? ACTIVE : IDLE;

  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 100 140"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* head and neck — never highlighted, they orient the figure */}
      <circle cx="50" cy="13" r="9" fill={IDLE} />
      <rect x="46" y="21" width="8" height="5" rx="2" fill={IDLE} />

      {/* shoulders */}
      <ellipse cx="31" cy="33" rx="9" ry="7" fill={on("shoulders")} />
      <ellipse cx="69" cy="33" rx="9" ry="7" fill={on("shoulders")} />

      {/* chest, and the upper back that sits behind it */}
      <path d="M38 30 h24 a4 4 0 0 1 4 4 v9 a4 4 0 0 1-4 4 H38 a4 4 0 0 1-4-4 v-9 a4 4 0 0 1 4-4z"
        fill={on("chest", "back")} />

      {/* midsection */}
      <rect x="38" y="49" width="24" height="18" rx="5" fill={on("waist")} />

      {/* hips and glutes */}
      <path d="M37 68 h26 a3 3 0 0 1 3 3 v6 a4 4 0 0 1-4 4 H38 a4 4 0 0 1-4-4 v-6 a3 3 0 0 1 3-3z"
        fill={on("hips")} />

      {/* upper arms — biceps in front, triceps behind the same bone */}
      <rect x="18" y="34" width="9" height="24" rx="4.5" fill={on("biceps", "triceps")} />
      <rect x="73" y="34" width="9" height="24" rx="4.5" fill={on("biceps", "triceps")} />

      {/* forearms */}
      <rect x="16" y="60" width="8" height="22" rx="4" fill={on("forearms")} />
      <rect x="76" y="60" width="8" height="22" rx="4" fill={on("forearms")} />

      {/* thighs — quadriceps in front, the thigh as a whole */}
      <rect x="37" y="83" width="11" height="28" rx="5" fill={on("quadriceps", "thighs")} />
      <rect x="52" y="83" width="11" height="28" rx="5" fill={on("quadriceps", "thighs")} />

      {/* calves */}
      <rect x="38" y="113" width="9" height="22" rx="4" fill={on("calves")} />
      <rect x="53" y="113" width="9" height="22" rx="4" fill={on("calves")} />
    </svg>
  );
}

/** A barbell, for the one catalogue category that is a lift rather than a
 *  body part. Drawing "weightlifting" on a silhouette would light the whole
 *  figure and say nothing. */
export function BarbellIcon({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 100 140"
      fill="none"
      aria-hidden
      className={className}
    >
      <g transform="translate(0,34)">
        <rect x="8" y="30" width="7" height="24" rx="2.5" fill="currentColor" />
        <rect x="17" y="22" width="9" height="40" rx="3" fill="currentColor" />
        <rect x="26" y="38" width="48" height="8" rx="4" fill="currentColor" />
        <rect x="74" y="22" width="9" height="40" rx="3" fill="currentColor" />
        <rect x="85" y="30" width="7" height="24" rx="2.5" fill="currentColor" />
      </g>
    </svg>
  );
}

/** The catalogue's category names map onto the regions above. Anything
 *  unmatched falls back to the whole figure, which is honest rather than
 *  wrong: it says "this trains you" and leaves it there. */
export function regionFor(category: string): Region | "barbell" {
  const key = category.toLowerCase();
  if (key.includes("weightlift")) return "barbell";
  const map: Record<string, Region> = {
    back: "back",
    chest: "chest",
    shoulders: "shoulders",
    waist: "waist",
    hips: "hips",
    quadriceps: "quadriceps",
    thighs: "thighs",
    calves: "calves",
    biceps: "biceps",
    triceps: "triceps",
    forearms: "forearms",
    neck: "shoulders",
    cardio: "full",
  };
  return map[key] ?? "full";
}

/**
 * The three equipment tiers, as objects rather than bodies.
 *
 * Deliberately not the silhouette: the muscle cards answer "where on you",
 * these answer "what do you need", and drawing both questions on the same
 * figure would make the two sections look like one list with a formatting
 * inconsistency. Same accent on the active part, so the sections still read as
 * a pair.
 */
export function KitIcon({
  kind,
  size = 34,
  className = "",
}: {
  kind: "bodyweight" | "minimal" | "gym";
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size * 1.4,
    viewBox: "0 0 100 140",
    fill: "none",
    "aria-hidden": true,
    className,
  } as const;

  if (kind === "bodyweight") {
    // A figure mid-press-up: nothing in the frame but the person.
    return (
      <svg {...common}>
        <g transform="translate(0,40)">
          <circle cx="24" cy="28" r="8" fill={ACTIVE} />
          <rect x="30" y="30" width="46" height="9" rx="4.5" fill={ACTIVE} />
          <rect x="70" y="36" width="9" height="22" rx="4.5" fill="currentColor" />
          <rect x="32" y="36" width="8" height="22" rx="4" fill="currentColor" />
          <rect x="16" y="56" width="70" height="6" rx="3" fill="currentColor" opacity="0.5" />
        </g>
      </svg>
    );
  }

  if (kind === "minimal") {
    // One dumbbell.
    return (
      <svg {...common}>
        <g transform="translate(0,44)">
          <rect x="14" y="20" width="10" height="30" rx="4" fill="currentColor" />
          <rect x="26" y="12" width="12" height="46" rx="5" fill={ACTIVE} />
          <rect x="38" y="30" width="24" height="10" rx="5" fill={ACTIVE} />
          <rect x="62" y="12" width="12" height="46" rx="5" fill={ACTIVE} />
          <rect x="76" y="20" width="10" height="30" rx="4" fill="currentColor" />
        </g>
      </svg>
    );
  }

  // A rack: two uprights, a loaded bar across them.
  return (
    <svg {...common}>
      <g transform="translate(0,28)">
        <rect x="12" y="8" width="8" height="74" rx="3" fill="currentColor" />
        <rect x="80" y="8" width="8" height="74" rx="3" fill="currentColor" />
        <rect x="8" y="78" width="84" height="7" rx="3.5" fill="currentColor" />
        <rect x="24" y="24" width="10" height="30" rx="4" fill={ACTIVE} />
        <rect x="34" y="34" width="32" height="9" rx="4.5" fill={ACTIVE} />
        <rect x="66" y="24" width="10" height="30" rx="4" fill={ACTIVE} />
      </g>
    </svg>
  );
}
