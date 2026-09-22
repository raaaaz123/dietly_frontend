/**
 * Pulls verified nutrition into `app/lib/foods.generated.json`.
 *
 *   FDC_KEY=xxxx node scripts/fetch-foods.mjs
 *
 * ## Why this is a curation script and not a search script
 *
 * The obvious version of this — search USDA for a food name, take the first
 * result — produces confident nonsense. Measured on 2026-09-22 against the
 * live API:
 *
 *   "banana"      -> Bananas, dehydrated, or banana powder   1450 kcal/100g
 *   "soya chunks" -> Pineapple, frozen, chunks, sweetened
 *   "egg"         -> Eggs, Grade A, Large, egg white          (whites only)
 *
 * A page telling a reader a banana is 1450 kcal is worse than no page, and it
 * is the kind of wrong that looks fine in review — the same failure mode as
 * the US Navy body-fat bug recorded in SEO_PLAN.md.
 *
 * So the food list below is keyed by **fdcId**, not by search term. Each id
 * was looked at by a person and is the specific entry we mean. This script
 * only fetches the nutrients for ids somebody already chose, which makes it a
 * refresh tool rather than a discovery tool.
 *
 * ## Finding an id to add
 *
 *   node scripts/fetch-foods.mjs --search "chicken breast"
 *
 * prints the candidates with their macros. Read them, pick the one that
 * matches what a person means by the phrase — raw over dehydrated, cooked
 * where people eat it cooked, plain over sweetened — and add it to FOODS with
 * the name people actually search for.
 *
 * ## The key
 *
 * `DEMO_KEY` works for a handful of calls an hour and will rate-limit in the
 * middle of a real run, leaving a half-written file. Get a free key at
 * https://fdc.nal.usda.gov/api-key-signup.html and pass it as FDC_KEY.
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";

const KEY = process.env.FDC_KEY || "DEMO_KEY";
const OUT = "app/lib/foods.generated.json";

/**
 * The curated list. `id` is a USDA FoodData Central fdcId; `name` is the term
 * people search, which is frequently not what USDA calls the entry.
 *
 * `portion` is the unit a person actually eats, used to render a second column
 * beside the per-100g figures — "1 large egg" is more useful than "100 g of
 * egg", and per-100g alone is why most nutrition pages fail to answer the
 * question that was asked.
 */
const FOODS = [
  // Verified 2026-09-22 against the live API; see the note above on why each
  // of these is an id rather than a search term.
  { slug: "roti", name: "Roti (chapati)", id: 171844, portion: { label: "1 roti", grams: 40 },
    aka: ["chapati", "phulka"] },

  // ─── Add below. Run with --search to find an id, then read it before
  // pasting it in. An id nobody looked at is a search result, not a curation.
];

async function fdc(path) {
  const res = await fetch(`https://api.nal.usda.gov/fdc/v1${path}`);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`FDC HTTP ${res.status} — ${body.slice(0, 200)}`);
  }
  return res.json();
}

const nutrient = (food, name) =>
  (food.foodNutrients ?? []).find(
    (n) => (n.nutrientName ?? n.nutrient?.name) === name,
  )?.value ?? (food.foodNutrients ?? []).find(
    (n) => (n.nutrientName ?? n.nutrient?.name) === name,
  )?.amount ?? null;

if (process.argv.includes("--search")) {
  const q = process.argv[process.argv.indexOf("--search") + 1];
  if (!q) {
    console.error("usage: --search \"chicken breast\"");
    process.exit(1);
  }
  const d = await fdc(
    `/foods/search?api_key=${KEY}&query=${encodeURIComponent(q)}&dataType=Foundation,SR%20Legacy&pageSize=10`,
  );
  console.log(`\n${d.totalHits} hits for "${q}" — pick the one people mean:\n`);
  for (const f of d.foods ?? []) {
    const n = (k) => nutrient(f, k) ?? "-";
    console.log(
      `  ${String(f.fdcId).padEnd(9)} ${String(f.description).slice(0, 62)}\n` +
        `            ${n("Energy")} kcal · P ${n("Protein")} · C ${n("Carbohydrate, by difference")} · F ${n("Total lipid (fat)")}  [${f.dataType}]`,
    );
  }
  process.exit(0);
}

if (FOODS.length === 0) {
  console.error("FOODS is empty — nothing to fetch. Add curated ids first.");
  process.exit(1);
}

const out = [];
for (const entry of FOODS) {
  const f = await fdc(`/food/${entry.id}?api_key=${KEY}&nutrients=203,204,205,208,291,269,606,307`);
  const kcal = nutrient(f, "Energy");
  const protein = nutrient(f, "Protein");
  if (kcal == null || protein == null) {
    // A row with no energy or no protein cannot render the page it exists for.
    // Failing loudly beats writing a food whose headline figure is blank.
    throw new Error(
      `fdcId ${entry.id} (${entry.name}) returned no energy or protein — check the id`,
    );
  }
  out.push({
    slug: entry.slug,
    name: entry.name,
    aka: entry.aka ?? [],
    portion: entry.portion,
    fdcId: entry.id,
    usdaDescription: f.description,
    dataType: f.dataType,
    per100g: {
      kcal,
      protein,
      carbs: nutrient(f, "Carbohydrate, by difference"),
      fat: nutrient(f, "Total lipid (fat)"),
      fiber: nutrient(f, "Fiber, total dietary"),
      sugar: nutrient(f, "Sugars, total including NLEA"),
      satFat: nutrient(f, "Fatty acids, total saturated"),
      sodium: nutrient(f, "Sodium, Na"),
    },
  });
  process.stderr.write(".");
}

writeFileSync(
  OUT,
  JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), foods: out }, null, 1),
);
console.error(`\nwrote ${out.length} foods to ${OUT}`);

// Keep the previous file's date visible if this run wrote fewer foods than
// last time — a silent shrink is how a cluster loses pages without anyone
// noticing.
if (existsSync(OUT)) {
  const prev = JSON.parse(readFileSync(OUT, "utf8"));
  if (prev.foods && prev.foods.length > out.length) {
    console.error(
      `WARNING: previous file had ${prev.foods.length} foods, this run wrote ${out.length}.`,
    );
  }
}
