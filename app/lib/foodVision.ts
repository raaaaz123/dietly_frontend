/**
 * Meal recognition for the public web tools.
 *
 * The prompt and the normalisation below are **mirrored from the backend's
 * `app/services/food_vision.py`**, deliberately and almost line for line. The
 * model underneath differs — the app runs Gemini, this runs Kimi K2.5 on
 * Bedrock — but the contract must not, because this page exists to show people
 * what the app does. A demo that splits a biryani into rice and chicken while
 * the app names the dish is advertising a product we do not ship.
 *
 * When `food_vision.py` changes, change this too. The duplication is the
 * price of not putting the app's paid scan quota behind an anonymous web form;
 * it is a real cost and worth knowing about rather than discovering.
 */

import { chat, type BedrockConfig } from "./bedrock";

export const VISION_SYSTEM = `You are a nutrition vision expert. Given a meal photo, return STRICT JSON only:
{
  "items": [
    {"name": str, "quantity": str, "calories": number, "protein_g": number, "carbs_g": number, "fat_g": number, "fiber_g": number, "sugar_g": number, "saturated_fat_g": number, "confidence": 0..1}
  ],
  "meal_type_guess": "breakfast|lunch|dinner|snack",
  "notes": str
}

ONE ENTRY PER FOOD — this matters more than any other rule:
- Never list the same food twice. If a food appears in several places on the
  plate, combine it into a single entry whose quantity covers all of it.
- Two servings are expressed in the quantity ("2 slices", "300 g"), NEVER by
  repeating the row. A repeated row double-counts the meal.
- Name a composite dish once, as the dish: "chicken biryani", not "rice" +
  "chicken" + "spices". Only split it when the components sit separately on the
  plate and could be eaten alone (e.g. a curry beside plain rice).
- Do not add a separate entry for garnish, sauce or seasoning under ~20 kcal.

Portions and macros:
- Estimate the visible portion, using the plate, cutlery or hand for scale.
- calories, protein_g, carbs_g and fat_g are TOTALS for the stated quantity,
  not per 100 g and not per unit.
- Keep them consistent with each other: calories should be close to
  4*protein_g + 4*carbs_g + 9*fat_g. If they disagree, re-check the portion.
- sugar_g is a subset of carbs_g and saturated_fat_g a subset of fat_g, so
  neither may exceed its parent. Estimate them from what the food obviously is
  — a pastry, a soft drink or a fried dish reads clearly in a photo. Where a
  dish gives you no signal, return 0 rather than a guess.

Honesty:
- Never invent a food you cannot see. If unsure what something is, still return
  it, but lower confidence (0.3-0.5) and use the plainest name that fits.
- If the image is not food, return {"items": [], "notes": "not a food image"}.`;

export type MealItem = {
  name: string;
  quantity: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g: number;
  saturated_fat_g: number;
  confidence: number;
};

export type MealResult = {
  items: MealItem[];
  meal_type_guess?: string;
  notes?: string;
  duplicates_dropped: number;
  totals: {
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    fiber_g: number;
  };
};

/**
 * Collapses the spellings a model uses for one food into a single key.
 *
 * Case, spacing, punctuation and a trailing plural are all noise. This only
 * has to be consistent, not linguistically correct — its one job is deciding
 * whether two entries are the same food.
 */
function mergeKey(name: string): string {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
  return cleaned
    .split(/\s+/)
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w))
    .join(" ");
}

const num = (v: unknown): number => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

/**
 * Drops duplicate foods and repairs obviously-broken macros.
 *
 * The prompt asks for one entry per food, but a prompt is a request and this
 * is a guarantee: a repeated entry silently doubles a meal's calories and the
 * reader has no way to see that it happened.
 */
export function normalise(parsed: Record<string, unknown>): MealResult {
  const raw = Array.isArray(parsed.items) ? parsed.items : [];
  const merged = new Map<string, MealItem>();
  let dropped = 0;

  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const item = entry as Record<string, unknown>;
    const name = String(item.name ?? "").trim();
    if (!name) continue;

    const clean: MealItem = {
      name,
      quantity: String(item.quantity ?? "1 serving").trim() || "1 serving",
      calories: num(item.calories),
      protein_g: num(item.protein_g),
      carbs_g: num(item.carbs_g),
      fat_g: num(item.fat_g),
      fiber_g: num(item.fiber_g),
      sugar_g: num(item.sugar_g),
      saturated_fat_g: num(item.saturated_fat_g),
      confidence: Math.min(1, num(item.confidence) || 0.7),
    };

    // The prompt states the subset rule; this enforces it. 40 g of sugar inside
    // 20 g of carbs is arithmetic that cannot be true.
    clean.sugar_g = Math.min(clean.sugar_g, clean.carbs_g);
    clean.saturated_fat_g = Math.min(clean.saturated_fat_g, clean.fat_g);

    // A missing calorie count is recoverable from the macros; left at zero it
    // would quietly under-count the meal.
    if (clean.calories <= 0) {
      clean.calories =
        Math.round(
          (4 * clean.protein_g + 4 * clean.carbs_g + 9 * clean.fat_g) * 10,
        ) / 10;
    }

    const key = mergeKey(name);
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, clean);
      continue;
    }
    // Same food twice. One plate does not contain two independently-listed
    // servings of the same thing often enough to justify double-counting every
    // time the model stutters — keep the more confident reading.
    dropped += 1;
    if (clean.confidence > existing.confidence) merged.set(key, clean);
  }

  const items = [...merged.values()];
  const sum = (k: keyof MealItem) =>
    Math.round(items.reduce((t, i) => t + (i[k] as number), 0) * 10) / 10;

  return {
    items,
    meal_type_guess:
      typeof parsed.meal_type_guess === "string" ? parsed.meal_type_guess : undefined,
    notes: typeof parsed.notes === "string" ? parsed.notes : undefined,
    duplicates_dropped: dropped,
    totals: {
      calories: sum("calories"),
      protein_g: sum("protein_g"),
      carbs_g: sum("carbs_g"),
      fat_g: sum("fat_g"),
      fiber_g: sum("fiber_g"),
    },
  };
}

/** Models fence JSON in markdown often enough to be worth handling. */
function extractJson(text: string): Record<string, unknown> {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = (fenced ? fenced[1] : text).trim();
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start === -1 || end === -1) throw new SyntaxError("no JSON object found");
  return JSON.parse(body.slice(start, end + 1));
}

/**
 * Rescues the complete items from a response the model was cut off mid-write.
 *
 * A busy plate can exceed any output ceiling — measured on a twelve-item food
 * spread, which stopped at `finish_reason: "length"` partway through an object
 * and produced JSON that could not parse at all. The whole scan then failed,
 * for a photo the model had actually read correctly.
 *
 * Eleven recognised foods are worth far more than nothing, so this walks the
 * fragment, keeps every `{...}` inside `items` that closed cleanly, and
 * discards the partial one at the end. It is only ever called after
 * `finish_reason` says the text is truncated — never to paper over a genuine
 * parse failure, which should still surface as one.
 */
function salvageTruncated(text: string): Record<string, unknown> | null {
  const arrayStart = text.indexOf('"items"');
  if (arrayStart === -1) return null;
  const open = text.indexOf("[", arrayStart);
  if (open === -1) return null;

  const objects: string[] = [];
  let depth = 0;
  let objStart = -1;
  let inString = false;
  let escaped = false;

  for (let i = open + 1; i < text.length; i++) {
    const ch = text[i];
    // String state first: braces inside a food name must not move the depth.
    if (escaped) { escaped = false; continue; }
    if (ch === "\\") { escaped = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;

    if (ch === "{") {
      if (depth === 0) objStart = i;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && objStart !== -1) {
        objects.push(text.slice(objStart, i + 1));
        objStart = -1;
      }
    } else if (ch === "]" && depth === 0) {
      break;
    }
  }

  if (!objects.length) return null;
  try {
    return { items: JSON.parse(`[${objects.join(",")}]`) };
  } catch {
    return null;
  }
}

/**
 * Recognise a meal from raw image bytes.
 *
 * Takes bytes rather than a data URI for the same reason the backend grew a
 * multipart route: base64 inflates a payload by 4/3, and on a mobile
 * connection that is the difference between a scan that completes and one that
 * times out. The data URI is built once, here, at the last possible moment.
 */
export async function recognizeMeal(
  cfg: BedrockConfig,
  bytes: Uint8Array,
  mime: string,
  signal?: AbortSignal,
): Promise<MealResult> {
  const b64 = Buffer.from(bytes).toString("base64");
  const { text, finishReason } = await chat(
    cfg,
    [
      { role: "system", content: VISION_SYSTEM },
      {
        role: "user",
        content: [
          { type: "text", text: "Identify each food and estimate nutrition." },
          { type: "image_url", image_url: { url: `data:${mime};base64,${b64}` } },
        ],
      },
    ],
    { signal },
  );

  // Cut off at the token ceiling: the JSON is a fragment and will not parse,
  // but the items that finished writing are perfectly good.
  if (finishReason === "length") {
    const salvaged = salvageTruncated(text);
    if (salvaged) {
      const result = normalise(salvaged);
      return { ...result, notes: "truncated" };
    }
  }

  try {
    return normalise(extractJson(text));
  } catch {
    // A parse failure is a real outcome, not an exception to leak. The caller
    // renders "we could not read that photo", which is the truth.
    return {
      items: [],
      notes: "parse_error",
      duplicates_dropped: 0,
      totals: { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0, fiber_g: 0 },
    };
  }
}

/**
 * Trusts the bytes, not the declared Content-Type, which clients get wrong.
 * Mirrors `_sniff_image_mime` in the backend.
 */
export function sniffImageMime(blob: Uint8Array): string | null {
  if (blob[0] === 0xff && blob[1] === 0xd8 && blob[2] === 0xff) return "image/jpeg";
  if (
    blob[0] === 0x89 &&
    blob[1] === 0x50 &&
    blob[2] === 0x4e &&
    blob[3] === 0x47
  )
    return "image/png";
  const ascii = (i: number, s: string) =>
    s.split("").every((c, k) => blob[i + k] === c.charCodeAt(0));
  // RIFF alone is also WAV and AVI — the format tag at offset 8 makes it WebP.
  if (blob.length >= 12 && ascii(0, "RIFF") && ascii(8, "WEBP")) return "image/webp";
  // HEIC/HEIF: 'ftyp' box at offset 4. iPhones send these by default.
  if (blob.length >= 12 && ascii(4, "ftyp")) return "image/heic";
  return null;
}
