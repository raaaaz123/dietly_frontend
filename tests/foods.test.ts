/**
 * Guards the nutrition cluster.
 *
 * Nutrition data is YMYL and the naive build of this is catastrophic: searching
 * USDA by name and taking the first hit returned a banana at 1450 kcal/100g
 * (dehydrated powder) and *pineapple* for "soya chunks", measured against the
 * live API on 2026-09-22. Those are wrong in the way that looks right, so the
 * invariants below are assertions rather than intentions.
 *
 *   npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  FOODS,
  FOODS_FETCHED,
  PUBLISHABLE,
  PUBLISHED_FOODS,
  MIN_CLUSTER,
  food,
  perPortion,
} from "../app/lib/foods.ts";

test("every food carries a traceable USDA source", () => {
  // The whole defence of these pages is that any number on them is one click
  // from the row it came from.
  for (const f of FOODS) {
    assert.ok(Number.isInteger(f.fdcId) && f.fdcId > 0, `${f.slug}: no fdcId`);
    assert.ok(
      f.usdaDescription && f.usdaDescription.length > 5,
      `${f.slug}: no USDA description to show the reader`,
    );
    assert.ok(f.dataType, `${f.slug}: no dataType`);
  }
  assert.match(FOODS_FETCHED, /^\d{4}-\d{2}-\d{2}$/, "FOODS_FETCHED is not a date");
});

test("macros are physically plausible", () => {
  // A sanity net for the class of error that produced "banana = 1450 kcal".
  // Nothing edible exceeds ~900 kcal/100g (pure fat is 900), and protein,
  // carbs and fat cannot sum past 100 g in 100 g of food.
  for (const f of FOODS) {
    const n = f.per100g;
    assert.ok(n.kcal > 0 && n.kcal <= 900, `${f.slug}: ${n.kcal} kcal/100g is not food`);
    assert.ok(n.protein >= 0 && n.protein <= 100, `${f.slug}: protein ${n.protein}`);
    const mass = n.protein + (n.carbs ?? 0) + (n.fat ?? 0);
    assert.ok(mass <= 100.5, `${f.slug}: macros sum to ${mass} g per 100 g`);

    // Atwater check: the stated energy should be near what the macros imply.
    // A wide tolerance, because fibre, alcohol and rounding all move it — this
    // is catching an entry from a different food, not a rounding difference.
    const implied = 4 * n.protein + 4 * (n.carbs ?? 0) + 9 * (n.fat ?? 0);
    if (implied > 0) {
      const ratio = n.kcal / implied;
      assert.ok(
        ratio > 0.6 && ratio < 1.5,
        `${f.slug}: ${n.kcal} kcal but macros imply ${Math.round(implied)} — likely the wrong fdcId`,
      );
    }
    // Subsets cannot exceed their parent.
    if (n.sugar != null && n.carbs != null) {
      assert.ok(n.sugar <= n.carbs + 0.5, `${f.slug}: sugar exceeds carbs`);
    }
    if (n.satFat != null && n.fat != null) {
      assert.ok(n.satFat <= n.fat + 0.5, `${f.slug}: saturated fat exceeds fat`);
    }
  }
});

test("portions are real and resolvable", () => {
  for (const f of FOODS) {
    assert.ok(f.portion.grams > 0 && f.portion.grams < 2000, `${f.slug}: odd portion`);
    assert.ok(f.portion.label.length > 2, `${f.slug}: portion needs a label`);
    const protein = perPortion(f, "protein");
    assert.ok(protein != null, `${f.slug}: portion protein did not compute`);
    // Scaling must actually scale.
    const expected = (f.per100g.protein * f.portion.grams) / 100;
    assert.ok(Math.abs(protein - expected) < 1e-9, `${f.slug}: portion maths wrong`);
  }
});

test("slugs are unique, URL-safe and resolvable", () => {
  const slugs = FOODS.map((f) => f.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate food slug");
  for (const s of slugs) {
    assert.match(s, /^[a-z0-9-]+$/, `slug "${s}" is not URL-safe`);
    assert.equal(food(s)?.slug, s);
  }
});

test("the cluster stays dark until it is worth publishing", () => {
  // A handful of food pages is not a cluster, it is a few orphans competing
  // with established nutrition sites. This asserts the gate is wired, in
  // whichever state it is currently in — so turning it on is deliberate.
  assert.equal(PUBLISHABLE, FOODS.length >= MIN_CLUSTER);
  assert.equal(
    PUBLISHED_FOODS.length,
    PUBLISHABLE ? FOODS.length : 0,
    "PUBLISHED_FOODS does not agree with the gate",
  );
});
