/**
 * Checks every published formula against a worked example.
 *
 * These numbers go on pages that tell people how much to eat and how much to
 * lift, so "the form renders" is not the bar. Each case below is computed from
 * the source equation by hand; if a refactor changes one, the test says which.
 *
 *   npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyDeficit,
  bmi,
  bmiBand,
  bmr,
  boerLeanBodyMass,
  caloriesBurned,
  creatineDose,
  feetInchesToCm,
  ffmi,
  healthyWeightRange,
  idealWeight,
  lbToKg,
  leanBodyMass,
  macroSplit,
  navyBodyFat,
  oneRepMax,
  proteinTarget,
  tdee,
  waistToHeight,
  weeklyChangeKg,
  whtrBand,
} from "../app/lib/formulas.ts";

const close = (actual: number, expected: number, tol = 0.5) =>
  assert.ok(
    Math.abs(actual - expected) <= tol,
    `expected ~${expected}, got ${actual}`,
  );

test("Mifflin-St Jeor BMR", () => {
  // 80 kg, 180 cm, 30 y male: 10(80) + 6.25(180) − 5(30) + 5 = 1780
  close(bmr(80, 180, 30, "male"), 1780);
  // 65 kg, 165 cm, 30 y female: 650 + 1031.25 − 150 − 161 = 1370.25
  close(bmr(65, 165, 30, "female"), 1370.25);
});

test("TDEE scales BMR by activity", () => {
  close(tdee(1780, 1.55), 2759);
});

test("deficit never goes below the safety floor", () => {
  const ok = applyDeficit(2500, -500, "male");
  assert.equal(ok.calories, 2000);
  assert.equal(ok.floored, false);

  // A 500 kcal cut on a small maintenance would land under 1200.
  const floored = applyDeficit(1500, -500, "female");
  assert.equal(floored.calories, 1200);
  assert.equal(floored.floored, true);
});

test("weekly change uses 7700 kcal per kg", () => {
  close(weeklyChangeKg(-500), -0.4545, 0.001);
});

test("protein target is per kg of bodyweight", () => {
  close(proteinTarget(80, "cutting"), 176);
  close(proteinTarget(80, "sedentary"), 64);
});

test("macro split sets protein from bodyweight, not a flat percentage", () => {
  const split = macroSplit(2000, 80, "cutting");
  assert.equal(split.protein, 176); // 2.2 g/kg, independent of the calorie total
  assert.equal(split.fat, Math.round((2000 * 0.25) / 9));
  // Everything left over goes to carbohydrate.
  close(split.protein * 4 + split.carbs * 4 + split.fat * 9, 2000, 6);
});

test("macro split cannot produce negative carbs", () => {
  // A very heavy person on a very low calorie target: protein + fat alone
  // exceed the budget, and the old percentage split would have gone negative.
  const split = macroSplit(1200, 120, "cutting");
  assert.ok(split.carbs >= 0, `carbs went negative: ${split.carbs}`);
});

test("US Navy body fat uses the metric form, not the inch constants", () => {
  // male, 180 cm, neck 38, waist 85
  //   495 / (1.0324 − 0.19077·log10(47) + 0.15456·log10(180)) − 450 ≈ 16.1
  // The inch-constant version of the same method returns 22.6 for these
  // centimetre inputs. Both look plausible on screen; only one is right, which
  // is the entire reason this case exists.
  close(navyBodyFat({ sex: "male", heightCm: 180, neckCm: 38, waistCm: 85 })!, 16.1, 0.2);
  // female, 165 cm, neck 32, waist 72, hip 95
  close(
    navyBodyFat({ sex: "female", heightCm: 165, neckCm: 32, waistCm: 72, hipCm: 95 })!,
    25.9,
    0.2,
  );
  // Matches what BodyFatCalculator.tsx has always shipped.
});

test("US Navy body fat refuses impossible measurements", () => {
  // Waist smaller than neck: log10 of a negative. Return null, never NaN.
  assert.equal(navyBodyFat({ sex: "male", heightCm: 180, neckCm: 40, waistCm: 35 }), null);
  // Female calculation needs a hip measurement.
  assert.equal(navyBodyFat({ sex: "female", heightCm: 165, neckCm: 32, waistCm: 72 }), null);
});

test("lean body mass", () => {
  close(leanBodyMass(80, 20), 64);
  // Boer, 80 kg 180 cm male: 32.56 + 48.06 − 19.2 = 61.42
  close(boerLeanBodyMass(80, 180, "male"), 61.42, 0.01);
});

test("one-rep max: single rep is the weight itself", () => {
  const rm = oneRepMax(100, 1)!;
  assert.equal(rm.average, 100);
});

test("one-rep max formulas agree within a few percent", () => {
  const rm = oneRepMax(100, 5)!;
  close(rm.epley, 116.67, 0.01); // 100(1 + 5/30)
  close(rm.brzycki, 112.5, 0.01); // 100(36/32)
  const spread = Math.max(rm.epley, rm.brzycki, rm.lombardi, rm.oconner) -
    Math.min(rm.epley, rm.brzycki, rm.lombardi, rm.oconner);
  assert.ok(spread < 10, `formulas disagree by ${spread}kg at 5 reps`);
});

test("one-rep max rejects zero reps", () => {
  assert.equal(oneRepMax(100, 0), null);
});

test("ideal weight formulas, 180 cm male", () => {
  // 180 cm is 10.866 inches over 5 ft.
  const iw = idealWeight(180, "male");
  close(iw.devine, 75.0, 0.1); // 50 + 2.3(10.866)
  close(iw.robinson, 72.6, 0.1);
  close(iw.hamwi, 77.3, 0.1);
});

test("ideal weight does not go negative below 5 ft", () => {
  const iw = idealWeight(140, "female");
  assert.ok(iw.devine > 0 && iw.robinson > 0);
});

test("BMI and healthy range", () => {
  close(bmi(80, 180), 24.69, 0.01);
  const range = healthyWeightRange(180);
  close(range.min, 59.9, 0.1);
  close(range.max, 80.7, 0.1);
});

test("unit conversion", () => {
  close(lbToKg(220), 99.79, 0.01);
  close(feetInchesToCm(5, 11), 180.34, 0.01);
});

// ---------------------------------------------------------------------------
// The tools added 2026-09-22.
// ---------------------------------------------------------------------------

test("BMI bands sit on the WHO cut-offs", () => {
  // The boundaries are the whole point of the band function, so they are what
  // gets tested — a band that is right in the middle and wrong at 25.0 would
  // look fine in every casual check.
  assert.equal(bmiBand(18.4), "Underweight");
  assert.equal(bmiBand(18.5), "Healthy weight");
  assert.equal(bmiBand(24.9), "Healthy weight");
  assert.equal(bmiBand(25), "Overweight");
  assert.equal(bmiBand(29.9), "Overweight");
  assert.equal(bmiBand(30), "Obesity class I");
  assert.equal(bmiBand(35), "Obesity class II");
  assert.equal(bmiBand(40), "Obesity class III");
  assert.equal(bmiBand(70), "Obesity class III");
});

test("FFMI: lean mass, index and height normalisation", () => {
  // 80 kg at 15% body fat = 68 kg lean; 1.8 m => 68 / 3.24 = 20.99
  const r = ffmi(80, 180, 15);
  assert.ok(Math.abs(r.leanMassKg - 68) < 1e-9);
  assert.ok(Math.abs(r.ffmi - 20.99) < 0.01);
  // At exactly the 1.8 m reference height, normalisation must be a no-op.
  assert.ok(Math.abs(r.normalised - r.ffmi) < 1e-9);
});

test("FFMI normalisation lifts shorter lifters and lowers taller ones", () => {
  // Same relative build, different heights: raw FFMI flatters the shorter
  // lifter, and the normalised figure is what published numbers use.
  const short = ffmi(65, 165, 15);
  const tall = ffmi(95, 195, 15);
  assert.ok(short.normalised > short.ffmi, "1.65 m should be adjusted upward");
  assert.ok(tall.normalised < tall.ffmi, "1.95 m should be adjusted downward");
});

test("waist-to-height ratio is unit-agnostic", () => {
  // The rule "keep your waist under half your height" only works because the
  // units cancel. If they ever stop cancelling, the whole page is wrong.
  const metric = waistToHeight(85, 180);
  const imperial = waistToHeight(85 / 2.54, 180 / 2.54);
  assert.ok(Math.abs(metric - imperial) < 1e-12);
  assert.ok(Math.abs(metric - 0.4722) < 0.001);
});

test("waist-to-height bands turn at 0.5", () => {
  assert.equal(whtrBand(0.39), "Below the healthy range");
  assert.equal(whtrBand(0.49), "Healthy");
  assert.equal(whtrBand(0.5), "Increased risk");
  assert.equal(whtrBand(0.61), "High risk");
});

test("calories burned: gross exceeds net by exactly one MET", () => {
  const { gross, net } = caloriesBurned(8, 75, 60);
  // 8 METs, 75 kg, 60 min => 8 * 3.5 * 75 / 200 * 60 = 630
  assert.ok(Math.abs(gross - 630) < 0.001);
  // The difference is one MET over the same time and weight: 78.75 kcal.
  assert.ok(Math.abs(gross - net - 78.75) < 0.001);
});

test("calories burned never returns a negative net figure", () => {
  // Desk work is 1.5 METs; anything at or below 1 MET must floor at zero
  // rather than reporting that sitting still burned negative calories.
  assert.equal(caloriesBurned(1, 75, 60).net, 0);
  assert.equal(caloriesBurned(0.9, 75, 60).net, 0);
});

test("creatine dose scales with bodyweight", () => {
  const r = creatineDose(80);
  assert.ok(Math.abs(r.maintenance - 2.4) < 1e-9);
  assert.ok(Math.abs(r.loadingDaily - 24) < 1e-9);
  // Loading is split across four servings a day.
  assert.ok(Math.abs(r.loadingPerServing - 6) < 1e-9);
  // Loading must be an order of magnitude above maintenance, or the phase is
  // pointless — this pins the 10x relationship the page describes.
  assert.ok(r.loadingDaily / r.maintenance === 10);
});
