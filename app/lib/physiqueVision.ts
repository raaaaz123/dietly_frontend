/**
 * Physique scoring for the public `/physique-analyzer` tool.
 *
 * The rubric is **mirrored from the backend's `app/services/body_scan.py`**
 * (the active `_SYSTEM` prompt): the same four sub-scores, the same overall
 * (their plain mean), the same sex-specific reference. A web demo that scores
 * differently from the app it advertises would be advertising a product we do
 * not ship. When `body_scan.py` changes, change this too.
 *
 * Two deliberate differences from the app:
 *
 * 1. **Stricter rejection.** The app scores signed-in adults who agreed to the
 *    terms. This page is anonymous, so it refuses anything that looks like a
 *    minor, more than one person, or a photo that is not a person at all.
 * 2. **Less is returned.** The route sends back the overall score and the weak
 *    point only. The breakdown is the app's, and it is not computed into a
 *    response the browser receives, so the gate is real rather than a blur
 *    over numbers sitting in the DOM.
 */

import { chat, type BedrockConfig } from "./bedrock";

export const SUBSCORES = ["definition", "leanness", "symmetry", "posture"] as const;
export type Subscore = (typeof SUBSCORES)[number];

export const PHYSIQUE_SYSTEM = `You are assessing a fitness progress photo of the upper body, torso, chest, back, or midsection.

Return STRICT JSON only:
{"usable": bool, "reject_reason": str|null,
 "body_fat_estimate": number, "confidence": 0..1,
 "definition": 0..100, "leanness": 0..100, "symmetry": 0..100, "posture": 0..100,
 "weakest": "definition"|"leanness"|"symmetry"|"posture",
 "note": str}

Rules:
1) usable MUST be true if one adult human upper body, torso, chest, back, shoulders, or midsection is visible. Clothing, shirtless, front, side or back view are all fine.
2) usable MUST be false, with every score 0, if: the image is not a human body; it is pitch black or unreadable blur; more than one person is the subject; or the person could plausibly be under 18. For a possible minor, set reject_reason to "This tool is for adults only." Otherwise give reject_reason as a short instruction the user can act on.
3) You are given the subject's sex. Judge against the reference range for that sex; the same body-fat percentage reads very differently across sexes. For unspecified, use a mid reference and lower confidence.
4) body_fat_estimate is a percentage (e.g. 12-30%). Be realistic and consistent.
5) definition = visible muscle separation. leanness = how low the body fat looks. symmetry = left/right balance and proportion. posture = alignment, shoulder position.
6) weakest is one of ["definition", "leanness", "symmetry", "posture"].
7) note is one helpful encouraging sentence, under 140 characters, about what to work on. Never comment on attractiveness, never use shaming language, never imply a health diagnosis.
8) Do not express certainty you do not have.`;

export type PhysiqueResult =
  | { usable: false; reason: string }
  | { usable: true; overall: number; weakest: Subscore };

function extractJson(text: string): Record<string, unknown> {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = (fenced ? fenced[1] : text).trim();
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start === -1 || end === -1) throw new SyntaxError("no JSON object found");
  return JSON.parse(body.slice(start, end + 1));
}

const clampScore = (v: unknown): number => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : 0;
};

/** Same reduction as `body_scan.analyse`: four sub-scores, mean, weakest. */
export function scorePhysique(parsed: Record<string, unknown>): PhysiqueResult {
  if (parsed.usable !== true) {
    const reason = String(parsed.reject_reason ?? "").trim().slice(0, 160);
    return { usable: false, reason: reason || "That photo is not clear enough to score." };
  }
  const subs = Object.fromEntries(SUBSCORES.map((k) => [k, clampScore(parsed[k])])) as Record<
    Subscore,
    number
  >;
  // A "usable" photo with four zeros is a model contradicting itself; treat
  // it as unreadable rather than telling someone their physique scored 0.
  if (SUBSCORES.every((k) => subs[k] === 0)) {
    return { usable: false, reason: "That photo is not clear enough to score." };
  }
  let weakest = parsed.weakest as Subscore;
  if (!SUBSCORES.includes(weakest)) {
    weakest = SUBSCORES.reduce((a, b) => (subs[b] < subs[a] ? b : a));
  }
  const overall = Math.round(SUBSCORES.reduce((t, k) => t + subs[k], 0) / SUBSCORES.length);
  return { usable: true, overall, weakest };
}

export type Sex = "male" | "female" | "unspecified";

export async function analysePhysique(
  cfg: BedrockConfig,
  bytes: Uint8Array,
  mime: string,
  sex: Sex,
  signal?: AbortSignal,
): Promise<PhysiqueResult> {
  const b64 = Buffer.from(bytes).toString("base64");
  const { text } = await chat(
    cfg,
    [
      { role: "system", content: PHYSIQUE_SYSTEM },
      {
        role: "user",
        content: [
          { type: "text", text: `Subject's sex: ${sex}. Assess this upper body photo.` },
          { type: "image_url", image_url: { url: `data:${mime};base64,${b64}` } },
        ],
      },
    ],
    { signal, maxTokens: 2000, temperature: 0.15 },
  );
  try {
    return scorePhysique(extractJson(text));
  } catch {
    return { usable: false, reason: "The analyzer could not read that photo. Try another one." };
  }
}
