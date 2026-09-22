"use client";

/**
 * "Print / Save as PDF" on a plan page.
 *
 * `gym workout plan pdf download free` recurs across both the Trends export
 * and the autocomplete harvest — people want a sheet they can carry. The
 * browser already makes PDFs well, so this opens that dialog rather than us
 * generating, storing and serving a file that would go stale the moment the
 * plan changed.
 *
 * A client component only because `window.print()` needs one. It hides itself
 * on paper, since a button is not a useful thing to print.
 */
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hide text-[12px] font-bold tracking-[1.5px] text-fg-muted border border-border rounded-xl px-4 py-2.5 hover:border-accent hover:text-fg transition-colors"
    >
      PRINT / SAVE AS PDF
    </button>
  );
}
