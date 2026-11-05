"use client";

import { useState } from "react";
import { SITE_URL } from "../../lib/site";

/**
 * "Add this calculator to your site": the copy-paste snippet behind the
 * /embed route. The credit link is plain HTML outside the iframe on purpose;
 * it is the only part of the snippet a search engine counts as a link.
 */
export default function EmbedCode({ slug, name }: { slug: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const code = `<iframe src="${SITE_URL}/embed/${slug}" title="${name}" width="100%" height="1150" style="border:0;max-width:760px;border-radius:16px" loading="lazy"></iframe>
<p style="font-size:13px">${name} by <a href="${SITE_URL}/${slug}">Dietly Fit</a></p>`;
  return (
    <section className="max-w-[800px] mx-auto px-6 md:px-12 mt-16">
      <h2 className="text-[20px] font-bold text-fg font-body tracking-tight mb-2">Add this calculator to your site</h2>
      <p className="text-[14px] text-fg-muted leading-relaxed mb-4">
        Free for blogs, coaches and gyms. Paste this where you want it to appear. It works on WordPress, Squarespace, Wix and plain HTML.
      </p>
      <textarea
        readOnly
        value={code}
        aria-label={`Embed code for the ${name}`}
        rows={4}
        onFocus={(e) => e.currentTarget.select()}
        className="w-full rounded-xl border border-border bg-surface p-4 font-mono text-[12px] text-fg-muted"
      />
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="mt-3 rounded-full border border-border px-4 py-2 text-[13px] font-semibold text-fg-muted hover:text-fg hover:border-border-strong transition-colors"
      >
        {copied ? "Copied" : "Copy embed code"}
      </button>
    </section>
  );
}
