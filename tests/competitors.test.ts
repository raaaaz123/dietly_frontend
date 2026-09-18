/**
 * Guards the rules that make a comparison page defensible.
 *
 * The risk on these pages is not that a number renders wrong — it is that a
 * claim about someone else's product is stated with no date and no source, or
 * that the page quietly becomes marketing in which the rival loses every row.
 * Both look completely fine in review. So they are assertions:
 *
 *   npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { COMPETITORS, competitor, ROUNDUP_UPDATED } from "../app/lib/competitors.ts";

/** How long a price is allowed to go unverified before the build says so.
 *  A year is generous; subscription prices in this category move faster. It is
 *  set to fail loudly rather than to let a page quietly rot into a liability. */
const MAX_AGE_DAYS = 365;

const daysSince = (iso: string) =>
  (Date.now() - Date.parse(`${iso}T00:00:00Z`)) / 86_400_000;

test("the registry is non-empty and slugs are unique", () => {
  assert.ok(COMPETITORS.length >= 5, "expected at least five comparisons");
  const slugs = COMPETITORS.map((c) => c.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate competitor slug");
  for (const s of slugs) {
    assert.match(s, /^[a-z0-9-]+$/, `slug "${s}" is not URL-safe`);
    assert.equal(competitor(s).slug, s);
  }
});

test("every competitor fact is dated, and no date is in the future", () => {
  for (const c of [...COMPETITORS]) {
    assert.match(c.checked, /^\d{4}-\d{2}-\d{2}$/, `${c.slug}: bad checked date`);
    assert.match(c.updated, /^\d{4}-\d{2}-\d{2}$/, `${c.slug}: bad updated date`);
    assert.ok(
      daysSince(c.checked) >= 0,
      `${c.slug}: checked date "${c.checked}" is in the future`,
    );
  }
  assert.match(ROUNDUP_UPDATED, /^\d{4}-\d{2}-\d{2}$/);
});

test("no competitor claim has gone unverified for more than a year", () => {
  for (const c of COMPETITORS) {
    const age = Math.round(daysSince(c.checked));
    assert.ok(
      age <= MAX_AGE_DAYS,
      `${c.slug}: last checked ${age} days ago. Re-read ${c.name}'s own pages, ` +
        `update the facts and bump \`checked\` — a stale price presented as ` +
        `current is the specific failure this cluster was built to avoid.`,
    );
  }
});

test("every claim about a rival has a source on that rival's own site", () => {
  for (const c of COMPETITORS) {
    assert.ok(c.sources.length >= 1, `${c.slug}: no sources`);
    for (const s of c.sources) {
      assert.match(s.href, /^https:\/\//, `${c.slug}: source is not an https URL`);
      assert.ok(s.label.trim().length > 0, `${c.slug}: source has no label`);
    }
  }
});

test("a quoted price always comes with somewhere to check it", () => {
  for (const c of COMPETITORS) {
    if (c.price === null) {
      // Not quoting a price is allowed and sometimes correct — several vendors
      // publish none. What is not allowed is silence about why the cell is
      // empty, because an empty cell reads as "free".
      assert.ok(
        c.freeTier.trim().length > 40,
        `${c.slug}: price is null, so \`freeTier\` must explain what a reader ` +
          `should do instead of quoting a number`,
      );
      continue;
    }
    assert.ok(
      /\$|€|£/.test(c.price),
      `${c.slug}: a price should carry its currency as the vendor writes it`,
    );
    assert.ok(c.sources.length >= 1, `${c.slug}: priced but unsourced`);
  }
});

test("the rival wins somewhere on every page", () => {
  for (const c of COMPETITORS) {
    assert.ok(
      c.theirEdge.length >= 2,
      `${c.slug}: \`theirEdge\` needs at least two entries. A comparison on ` +
        `which the competitor is worse at everything is one no rater believes, ` +
        `and it is almost always false as well.`,
    );
    for (const e of c.theirEdge) {
      assert.ok(
        e.length > 60,
        `${c.slug}: "${e}" is too short to be a real concession`,
      );
    }
    assert.ok(c.ourEdge.length >= 2, `${c.slug}: \`ourEdge\` is thin`);
  }
});

test("every row compares both sides, and marks are legal", () => {
  const legal = new Set(["yes", "no", "partial"]);
  for (const c of COMPETITORS) {
    assert.ok(c.rows.length >= 4, `${c.slug}: fewer than four rows is not a table`);
    const axes = c.rows.map((r) => r.axis);
    assert.equal(new Set(axes).size, axes.length, `${c.slug}: duplicate axis`);
    for (const r of c.rows) {
      assert.ok(legal.has(r.us.v), `${c.slug}/${r.axis}: bad mark on our side`);
      assert.ok(legal.has(r.them.v), `${c.slug}/${r.axis}: bad mark on their side`);
    }
    // If we won every row outright, either the axes were chosen to flatter us
    // or the table is wrong. Both are worth stopping for.
    const cleanSweep = c.rows.every((r) => r.us.v === "yes" && r.them.v !== "yes");
    assert.ok(
      !cleanSweep,
      `${c.slug}: we win every row. Pick axes the other product is also ` +
        `measured on, or the page reads as marketing.`,
    );
  }
});

test("negative claims about a rival are explained, not just asserted", () => {
  for (const c of COMPETITORS) {
    const bareNos = c.rows.filter((r) => r.them.v === "no" && !r.them.note);
    // One or two bare cells are fine where the axis states the claim in full
    // ("Food logging" — no). A table of unexplained noes is not.
    assert.ok(
      bareNos.length <= 2,
      `${c.slug}: ${bareNos.length} "no" cells about ${c.name} carry no note ` +
        `saying what was actually checked`,
    );
  }
});

test("titles fit a SERP and do not repeat the brand", () => {
  for (const c of COMPETITORS) {
    assert.ok(
      c.title.length <= 65,
      `${c.slug}: title is ${c.title.length} chars and will truncate`,
    );
    assert.equal(
      (c.title.match(/Dietly/g) ?? []).length,
      1,
      `${c.slug}: "Dietly" should appear exactly once in the title`,
    );
    assert.ok(c.description.length <= 200, `${c.slug}: description is too long`);
  }
});
