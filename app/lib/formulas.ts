/**
 * The maths behind every calculator on the site, in one place and with no UI
 * around it.
 *
 * Separated from the widgets for two reasons. These are health numbers people
 * act on, so they are worth testing directly (`npm test`) rather than by poking
 * a form. And the same BMR feeds the macro page, the TDEE page and the calorie
 * deficit page — three copies of Mifflin-St Jeor would be three chances to fix
 * a bug twice and miss the third.
 *
 * Every exported function documents the equation it implements and the units it
 * expects. Units are metric throughout; conversion happens at the edge, in the
 * form, because a formula that sometimes takes pounds is a formula that will
 * eventually be handed pounds when it wanted kilos.
 */

export type Sex = "male" | "female";

/** Activity multipliers applied to BMR to get TDEE. */
export const ACTIVITY_LEVELS = [
  { value: 1.2, label: "Sedentary (desk job, little exercise)" },
  { value: 1.375, label: "Lightly active (1–3 sessions/week)" },
  { value: 1.55, label: "Moderately active (3–5 sessions/week)" },
  { value: 1.725, label: "Very active (6–7 sessions/week)" },
  { value: 1.9, label: "Extra active (physical job + training)" },
] as const;

/**
 * Basal metabolic rate, Mifflin-St Jeor (1990).
 *
 *   men:   10w + 6.25h − 5a + 5
 *   women: 10w + 6.25h − 5a − 161
 *
 * Chosen over Harris-Benedict because it is the one that validated better in
 * the modern population studies, and over Katch-McArdle because that needs a
 * body-fat figure most people arriving from a search do not have.
 *
 * @param weightKg body mass in kilograms
 * @param heightCm standing height in centimetres
 * @param age years
 */
export function bmr(weightKg: number, heightCm: number, age: number, sex: Sex): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return base + (sex === "male" ? 5 : -161);
}

/** Total daily energy expenditure: BMR scaled by an activity multiplier. */
export function tdee(basal: number, activity: number): number {
  return basal * activity;
}

/**
 * The floor below which we refuse to recommend, regardless of what the
 * arithmetic says.
 *
 * A large deficit applied to a small person produces a number that is both
 * unsafe and unsustainable, and a calculator that prints it anyway is worse
 * than one that refuses. 1500/1200 kcal are the conventional lower bounds for
 * unsupervised dieting.
 */
export function calorieFloor(sex: Sex): number {
  return sex === "male" ? 1500 : 1200;
}

/** Applies a daily calorie delta, never dropping below the floor for that sex. */
export function applyDeficit(maintenance: number, delta: number, sex: Sex) {
  const raw = maintenance + delta;
  const floor = calorieFloor(sex);
  return { calories: Math.max(raw, floor), floored: raw < floor };
}

/**
 * Weekly weight change implied by a daily calorie delta.
 *
 * Uses the 7700 kcal ≈ 1 kg rule (3500 kcal ≈ 1 lb). It is an approximation
 * and it overstates loss over long horizons, because expenditure falls as mass
 * does — which is exactly why the pages that use it say so.
 */
export const KCAL_PER_KG = 7700;

export function weeklyChangeKg(dailyDelta: number): number {
  return (dailyDelta * 7) / KCAL_PER_KG;
}

/**
 * Protein target in grams per day.
 *
 * Expressed against *lean* goals rather than a flat percentage of calories: the
 * evidence for muscle retention clusters around 1.6–2.2 g/kg of bodyweight, and
 * the upper half of that band is where a calorie deficit belongs, because
 * protein is what decides whether the weight lost is fat or muscle.
 */
export const PROTEIN_G_PER_KG = {
  sedentary: 0.8,
  active: 1.4,
  building: 1.8,
  cutting: 2.2,
} as const;

export type ProteinGoal = keyof typeof PROTEIN_G_PER_KG;

export function proteinTarget(weightKg: number, goal: ProteinGoal): number {
  return weightKg * PROTEIN_G_PER_KG[goal];
}

/**
 * Macro split for a calorie target.
 *
 * Protein is set first, from bodyweight, and the rest of the budget is divided
 * between fat and carbohydrate — which is the order a coach would do it in.
 * Splitting all three by percentage (the way this site's first calculator did)
 * gives a 60 kg woman and a 100 kg man the same protein share of very different
 * calorie totals, and only one of them ends up with enough.
 */
export function macroSplit(
  calories: number,
  weightKg: number,
  goal: ProteinGoal,
): { protein: number; carbs: number; fat: number } {
  const protein = proteinTarget(weightKg, goal);
  const proteinKcal = protein * 4;

  // Fat at 25% of total calories: low enough to leave carbohydrate for
  // training, high enough for hormone function.
  const fatKcal = calories * 0.25;
  const carbKcal = Math.max(calories - proteinKcal - fatKcal, 0);

  return {
    protein: Math.round(protein),
    carbs: Math.round(carbKcal / 4),
    fat: Math.round(fatKcal / 9),
  };
}

/**
 * Body fat percentage, US Navy circumference method — metric form.
 *
 *   men:   495 / (1.0324 − 0.19077·log10(waist − neck) + 0.15456·log10(height)) − 450
 *   women: 495 / (1.29579 − 0.35004·log10(waist + hip − neck) + 0.22100·log10(height)) − 450
 *
 * All measurements in centimetres.
 *
 * Note the form. The version quoted more often —
 * `86.010·log10(waist − neck) − 70.041·log10(height) + 36.76` — is the same
 * method expressed for **inches**, and feeding it centimetres returns a number
 * that looks reasonable and is wrong by six percentage points. That is exactly
 * how this function was first written here, and the unit test below is the only
 * reason it did not ship; `BodyFatCalculator.tsx` has always used the metric
 * form, which is what this now matches.
 *
 * Typically lands within 3–4 percentage points of a DEXA reading, and is far
 * more sensitive to sloppy tape work than to the equation itself.
 */
export function navyBodyFat(args: {
  sex: Sex;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number;
}): number | null {
  const { sex, heightCm, neckCm, waistCm, hipCm } = args;
  if (sex === "male") {
    const inner = waistCm - neckCm;
    if (inner <= 0) return null;
    return (
      495 /
        (1.0324 - 0.19077 * Math.log10(inner) + 0.15456 * Math.log10(heightCm)) -
      450
    );
  }
  if (!hipCm) return null;
  const inner = waistCm + hipCm - neckCm;
  if (inner <= 0) return null;
  return (
    495 /
      (1.29579 - 0.35004 * Math.log10(inner) + 0.221 * Math.log10(heightCm)) -
    450
  );
}

/** Lean body mass from total mass and body fat percentage. */
export function leanBodyMass(weightKg: number, bodyFatPct: number): number {
  return weightKg * (1 - bodyFatPct / 100);
}

/**
 * Lean body mass, Boer (1984) — for people who do not know their body fat.
 *
 *   men:   0.407w + 0.267h − 19.2
 *   women: 0.252w + 0.473h − 48.3
 */
export function boerLeanBodyMass(weightKg: number, heightCm: number, sex: Sex): number {
  return sex === "male"
    ? 0.407 * weightKg + 0.267 * heightCm - 19.2
    : 0.252 * weightKg + 0.473 * heightCm - 48.3;
}

/**
 * One-rep max estimates.
 *
 * Four formulas rather than one, because they disagree — by up to ~5% at ten
 * reps — and presenting a single number implies a precision that does not
 * exist. Epley and Brzycki are the two most cited; showing the spread is more
 * honest than picking a favourite silently.
 *
 * All of them degrade above about 10 reps, where the estimate becomes a measure
 * of endurance rather than strength.
 */
export function oneRepMax(weight: number, reps: number) {
  if (reps < 1) return null;
  if (reps === 1) {
    return { epley: weight, brzycki: weight, lombardi: weight, oconner: weight, average: weight };
  }
  const epley = weight * (1 + reps / 30);
  const brzycki = weight * (36 / (37 - reps));
  const lombardi = weight * Math.pow(reps, 0.1);
  const oconner = weight * (1 + reps / 40);
  const average = (epley + brzycki + lombardi + oconner) / 4;
  return { epley, brzycki, lombardi, oconner, average };
}

/** Percentage-of-1RM table, for turning an estimate into working weights. */
export const RM_PERCENTAGES = [
  { reps: 1, pct: 1.0 },
  { reps: 2, pct: 0.95 },
  { reps: 3, pct: 0.93 },
  { reps: 4, pct: 0.9 },
  { reps: 5, pct: 0.87 },
  { reps: 6, pct: 0.85 },
  { reps: 8, pct: 0.8 },
  { reps: 10, pct: 0.75 },
  { reps: 12, pct: 0.7 },
] as const;

/**
 * "Ideal" body weight, four classic formulas.
 *
 * Every one of them is a 20th-century actuarial or dosing heuristic built from
 * height alone, which is why the page carrying them says plainly that they know
 * nothing about your frame, your muscle or your training. They are here because
 * people search for them, and a page that returns the number *and* the caveat
 * is better than the dozens that return only the number.
 *
 * Each is defined over height above 152.4 cm (5 ft), in kg.
 */
export function idealWeight(heightCm: number, sex: Sex) {
  const inchesOver5ft = Math.max((heightCm - 152.4) / 2.54, 0);
  const male = sex === "male";
  return {
    devine: (male ? 50.0 : 45.5) + 2.3 * inchesOver5ft,
    robinson: (male ? 52.0 : 49.0) + (male ? 1.9 : 1.7) * inchesOver5ft,
    miller: (male ? 56.2 : 53.1) + (male ? 1.41 : 1.36) * inchesOver5ft,
    hamwi: (male ? 48.0 : 45.5) + (male ? 2.7 : 2.2) * inchesOver5ft,
  };
}

/** BMI, and the healthy-weight range for a height, for context only. */
export function bmi(weightKg: number, heightCm: number): number {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function healthyWeightRange(heightCm: number): { min: number; max: number } {
  const m = heightCm / 100;
  return { min: 18.5 * m * m, max: 24.9 * m * m };
}

// ---------------------------------------------------------------------------
// Unit conversion — applied at the form edge, never inside a formula.
// ---------------------------------------------------------------------------

export const LB_PER_KG = 2.2046226218;
export const CM_PER_INCH = 2.54;

export const lbToKg = (lb: number) => lb / LB_PER_KG;
export const kgToLb = (kg: number) => kg * LB_PER_KG;
export const inToCm = (inches: number) => inches * CM_PER_INCH;
export const cmToIn = (cm: number) => cm / CM_PER_INCH;
export const feetInchesToCm = (feet: number, inches: number) =>
  inToCm(feet * 12 + inches);
