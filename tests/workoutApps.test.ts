/**
 * Guards the rules that make the workout-app roundup defensible.
 *
 * The risk on a page like this is not a rendering bug — it is a price stated
 * with no source, or a roundup in which our own app quietly wins every line.
 * Both look completely fine in review, so they are assertions. Same reasoning
 * as `tests/competitors.test.ts`; read the header of `app/lib/workoutApps.ts`
 * before adding an entry.
 *
 *   npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  WORKOUT_APPS,
  ROUNDUP_CHECKED,
  workoutApp,
} from "../app/lib/workoutApps.ts";

/** How long a price may go unverified before the build says so. Subscription
 *  prices in this category move faster than a year, but a year is the point
 *  past which the page is a liability rather than merely stale. */
const MAX_AGE_DAYS = 365;

const daysSince = (iso: string) =>
  (Date.now() - Date.parse(`${iso}T00:00:00Z`)) / 86_400_000;

test("the roundup is a roundup, and slugs are unique and resolvable", () => {
  assert.ok(WORKOUT_APPS.length >= 4, "a roundup of three is a blog post");
  const slugs = WORKOUT_APPS.map((a) => a.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate slug");
  for (const s of slugs) {
    assert.match(s, /^[a-z0-9-]+$/, `slug "${s}" is not URL-safe`);
    assert.equal(workoutApp(s).slug, s);
  }
});

test("a quoted price names the page it was read from", () => {
  // The failure this prevents: someone fills in a price from memory or from a
  // review site. A price with no source is the thing this whole category gets
  // wrong, and being right about it is the page's only durable advantage.
  for (const a of WORKOUT_APPS) {
    if (a.price === null) continue;
    assert.ok(
      a.sources.length > 0,
      `${a.slug}: quotes a price but links no source`,
    );
    assert.match(
      a.price,
      /as published|according to/i,
      `${a.slug}: price "${a.price}" does not say where it was published`,
    );
  }
});

test("every entry links at least one vendor page", () => {
  for (const a of WORKOUT_APPS) {
    assert.ok(a.sources.length > 0, `${a.slug}: no sources`);
    for (const s of a.sources) {
      assert.match(s.href, /^https:\/\//, `${a.slug}: source is not an https URL`);
      assert.ok(s.label.length > 5, `${a.slug}: source label is not descriptive`);
    }
  }
});

test("every rival is better at something, specifically", () => {
  // A roundup published by one of its entrants, in which that entrant wins
  // every line, is one no reader believes and no model quotes — and is
  // usually also false.
  for (const a of WORKOUT_APPS) {
    assert.ok(
      a.theirEdge.length >= 80,
      `${a.slug}: "where it is better than us" is too thin to be a real concession`,
    );
    assert.ok(a.limit.length >= 60, `${a.slug}: "where it stops" is too thin`);
    assert.ok(a.bestFor.length >= 15, `${a.slug}: needs a real "best for"`);
    assert.ok(a.what.length >= 80, `${a.slug}: needs a real description`);
  }
});

test("entries are written per app, not templated", () => {
  const fields = ["what", "theirEdge", "limit", "bestFor"] as const;
  for (const f of fields) {
    const values = WORKOUT_APPS.map((a) => a[f]);
    assert.equal(
      new Set(values).size,
      values.length,
      `two apps share the same "${f}"`,
    );
  }
});

test("the page does not go stale silently", () => {
  assert.ok(
    daysSince(ROUNDUP_CHECKED) < MAX_AGE_DAYS,
    `ROUNDUP_CHECKED is ${Math.round(daysSince(ROUNDUP_CHECKED))} days old — ` +
      `re-read the vendor pages and bump the date. Do not bump the date alone.`,
  );
  assert.ok(daysSince(ROUNDUP_CHECKED) > -1, "ROUNDUP_CHECKED is in the future");
});

test("an unpriced app says so rather than guessing", () => {
  // Three of the five publish no price. That fact is the page's value, so it
  // has to survive someone later "tidying up" the empty cells.
  const unpriced = WORKOUT_APPS.filter((a) => a.price === null);
  for (const a of unpriced) {
    assert.match(
      a.freeTier,
      /does not (state|publish)|publishes no price|no subscription price/i,
      `${a.slug}: price is null but the free-tier note does not explain that we looked`,
    );
  }
});
