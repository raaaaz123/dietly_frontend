import { SITE_URL } from "./site";
import { EXERCISES, sortItems, type Exercise } from "./exercises";

/**
 * Public, machine-readable shapes of the exercise catalogue.
 *
 * `/exercises.json` is for AI agents and anyone building on the data: every
 * movement with its muscles, equipment, difficulty, starting prescription and
 * any authored coaching, plus the canonical page URL. Demo media is not
 * included (it is licensed from Gym Visual and served only on our pages).
 *
 * `/exercises-index.json` is the small search index the /exercises page loads
 * when a visitor starts searching: positional arrays to keep it light.
 */

export function publicRecord(e: Exercise) {
  return {
    name: e.name,
    url: `${SITE_URL}/exercises/${e.slug}`,
    muscle_group: e.category,
    target: e.target || null,
    primary_muscles: e.primaryMuscles,
    secondary_muscles: e.secondaryMuscles,
    equipment: e.equipmentNames,
    equipment_level: e.equipment === "none" ? "bodyweight" : e.equipment === "basic" ? "minimal" : "gym",
    difficulty: e.difficulty,
    type: e.exerciseType || null,
    starting_prescription: {
      sets: e.defaultSets,
      reps: e.defaultReps,
      rest_seconds: e.defaultRestSec,
    },
    overview: e.overview || null,
    instructions: e.instructions.length ? e.instructions : null,
    cues: e.cues.length ? e.cues : null,
    common_mistakes: e.mistakes.length ? e.mistakes : null,
    variations: e.variations.length ? e.variations : null,
  };
}

export function catalogueJson() {
  const items = sortItems(EXERCISES, "popular");
  return {
    name: "Dietly Fit exercise library",
    description:
      "Every movement in the Dietly Fit training catalogue with target muscles, equipment, difficulty and a starting set, rep and rest scheme. Sorted most useful first.",
    url: `${SITE_URL}/exercises`,
    license: "Free to read and cite with a link to the exercise page. Demo videos are not included.",
    count: items.length,
    exercises: items.map(publicRecord),
  };
}

/** [slug, name, muscle group, kit, difficulty, target] */
export type IndexRow = [string, string, string, string, string, string];

export function searchIndex(): { items: IndexRow[] } {
  return {
    items: sortItems(EXERCISES, "popular").map((e) => [
      e.slug,
      e.name,
      e.category,
      e.equipment,
      e.difficulty,
      e.target || e.primaryMuscles[0] || "",
    ]),
  };
}
