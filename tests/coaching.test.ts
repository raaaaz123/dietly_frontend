/**
 * Guards the rules that keep the exercise cluster worth indexing.
 *
 * An entry in `coaching.ts` is not just content: it flips that movement's page
 * from `noindex` to indexable and adds it to the sitemap. So a templated or
 * half-finished entry does not merely read poorly — it publishes a thin page
 * under our own instruction to rank it, which is the exact failure the whole
 * cluster was gated to avoid.
 *
 * Every rule in the `coaching.ts` header is asserted here, because a rule in a
 * comment is a rule that holds until somebody is in a hurry:
 *
 *   npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { COACHING, COACHED_SLUGS } from "../app/lib/coaching.ts";

// Read the catalogue snapshot directly rather than importing `exercises.ts`.
// That module is the thing the site renders from, but it is written for the
// bundler — a bare `./coaching` specifier and a JSON import without an
// attribute — and neither resolves under `node --test`. The merge it performs
// is checked against the built HTML by `scripts/check-seo.mjs`, which is the
// better place for it anyway: that asserts what we actually published.
const CATALOGUE: { exercises: { slug: string; name: string }[] } = JSON.parse(
  readFileSync("app/lib/exercises.generated.json", "utf8"),
);
const SLUGS = new Set(CATALOGUE.exercises.map((e) => e.slug));

test("every coached slug exists in the catalogue", () => {
  // A typo here is silent: the overlay merges by slug, so a wrong one simply
  // never applies and the page stays noindex with nothing to show for the work.
  for (const slug of COACHED_SLUGS) {
    assert.ok(
      SLUGS.has(slug),
      `coaching.ts has "${slug}", which is not a published movement`,
    );
  }
});

test("coaching is substantial enough to justify indexing the page", () => {
  for (const [slug, c] of Object.entries(COACHING)) {
    assert.ok(
      c.overview.length >= 180,
      `${slug}: overview is ${c.overview.length} chars — too short to be a real answer`,
    );
    assert.ok(
      c.instructions.length >= 4,
      `${slug}: ${c.instructions.length} steps — four is the bar for a page worth reading`,
    );
    assert.ok(c.cues.length >= 3, `${slug}: needs at least three form cues`);
    assert.ok(
      c.mistakes.length >= 3,
      `${slug}: needs at least three common mistakes — this is the section that earns citations`,
    );
    for (const step of c.instructions) {
      assert.ok(
        step.length >= 40,
        `${slug}: step "${step}" is too terse to follow`,
      );
    }
    for (const m of c.mistakes) {
      // A mistake without a consequence or a fix is a scolding, not coaching.
      assert.ok(
        m.length >= 60,
        `${slug}: mistake "${m}" states the error but not why it matters`,
      );
    }
  }
});

test("coaching is written per movement, not templated", () => {
  // The failure mode this cluster was gated against is one paragraph with the
  // movement's name swapped in. Overviews that share long runs of text are how
  // that looks from the outside, so compare them directly.
  const overviews = Object.entries(COACHING);
  for (let i = 0; i < overviews.length; i++) {
    for (let j = i + 1; j < overviews.length; j++) {
      const [slugA, a] = overviews[i];
      const [slugB, b] = overviews[j];
      assert.notEqual(a.overview, b.overview, `${slugA} and ${slugB} share an overview`);
      // Any shared 12-word run is a template seam.
      const words = a.overview.split(/\s+/);
      for (let k = 0; k + 12 <= words.length; k++) {
        const run = words.slice(k, k + 12).join(" ");
        assert.ok(
          !b.overview.includes(run),
          `${slugA} and ${slugB} share the phrase "${run}"`,
        );
      }
    }
  }
});

test("the catalogue still contains the misspellings the site cleans up", () => {
  // `exercises.ts` rewrites these on the way out, and `check-seo.mjs` asserts
  // the rendered pages are clean. This test guards the other end: if the
  // upstream catalogue is ever fixed at source, the rewrite rules become dead
  // code, and dead rewrite rules are how a later real typo gets "handled" by a
  // rule that no longer runs.
  const names = CATALOGUE.exercises.map((e) => e.name).join(" | ");
  assert.match(names, /Bycicle/i, "catalogue no longer misspells Bicycle — prune SPELLING in exercises.ts");
  assert.match(names, /Squad Stretch/, "catalogue no longer says Squad Stretch — prune SPELLING");
});
