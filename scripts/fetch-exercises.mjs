/**
 * Pulls the published exercise catalogue into `app/lib/exercises.generated.json`.
 *
 *   ADMIN_API_KEY=... API_URL=... node scripts/fetch-exercises.mjs
 *
 * Why a build-time snapshot rather than fetching at request time:
 *
 * * The catalogue changes when somebody clicks save in the dashboard, not on a
 *   schedule. A snapshot regenerated on demand is the honest cache.
 * * `/exercises` needs a user bearer token and `/exercises/admin/all` needs the
 *   admin key. Neither belongs in a browser, and neither should be on the
 *   critical path of a page a crawler is rendering.
 * * The media URLs the API returns are **presigned and expire within the
 *   hour**, so they cannot be baked into a static page at all. This script
 *   deliberately drops them and the pages link to `/api/exercise-clip/[slug]`,
 *   which signs one on demand. A stable URL is better for schema anyway.
 *
 * Only published rows are taken. The backend unpublishes anything without a
 * clip (`unpublish_without_video`), so "published" already means "has media".
 */
import { writeFileSync } from "node:fs";

const BASE = (process.env.API_URL || "").replace(/\/$/, "");
const KEY = process.env.ADMIN_API_KEY;
if (!BASE || !KEY) {
  console.error("Set API_URL and ADMIN_API_KEY (both are in .env.local).");
  process.exit(1);
}

const PAGE = 200;
const rows = [];
for (let offset = 0; ; offset += PAGE) {
  const url = `${BASE}/exercises/admin/all?state=published&full=true&limit=${PAGE}&offset=${offset}`;
  const res = await fetch(url, { headers: { "X-Admin-Key": KEY } });
  if (!res.ok) {
    console.error(`${url} -> HTTP ${res.status}`);
    process.exit(1);
  }
  const body = await res.json();
  rows.push(...body.items);
  process.stderr.write(`  fetched ${rows.length}/${body.total}\n`);
  if (rows.length >= body.total || body.items.length === 0) break;
}

const text = (v) => (typeof v === "string" ? v.trim() : "");
const list = (v) => (Array.isArray(v) ? v.filter(Boolean) : []);

const exercises = rows
  .map((e) => ({
    slug: e.slug,
    name: e.name,
    title: text(e.title) || e.name,
    group: e.muscle_group,
    secondaryGroups: list(e.secondary_groups),
    equipment: e.equipment,
    equipmentNames: list(e.equipment_names),
    category: text(e.category),
    difficulty: e.difficulty,
    target: text(e.target),
    primaryMuscles: list(e.primary_muscles),
    secondaryMuscles: list(e.secondary_muscles),
    defaultSets: e.default_sets ?? 3,
    defaultReps: String(e.default_reps ?? "12"),
    defaultRestSec: e.default_rest_sec ?? 60,
    exerciseType: e.exercise_type || "weight_reps",
    isCore: Boolean(e.is_core),
    priority: e.priority ?? 0,
    attribution: text(e.attribution),
    // The prose fields. Empty on every published row today, which is exactly
    // why `hasProse` exists rather than being assumed.
    overview: text(e.overview),
    instructions: list(e.instructions),
    cues: list(e.cues),
    tips: list(e.tips),
    beginnerAdvice: text(e.beginner_advice),
    variations: list(e.variations),
  }))
  .sort((a, b) => b.priority - a.priority || a.name.localeCompare(b.name));

const withProse = exercises.filter((e) => e.instructions.length >= 2 || e.overview);
writeFileSync(
  "app/lib/exercises.generated.json",
  JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), exercises }, null, 0) + "\n",
);
console.log(`Wrote ${exercises.length} published exercises.`);
console.log(`  indexable (have prose): ${withProse.length}`);
console.log(`  noindex until authored: ${exercises.length - withProse.length}`);
