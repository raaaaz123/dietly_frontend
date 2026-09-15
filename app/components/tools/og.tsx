import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "../../lib/site";
import { tool } from "../../lib/tools";

/**
 * The social card for a calculator page.
 *
 * Without one, every tool page inherited the homepage card, so a link to the
 * protein calculator previewed as "Scan your body" in every chat app it was
 * shared into. Link previews are the first impression in the places these pages
 * actually get passed around — and increasingly in AI chat surfaces that render
 * a card for a cited source.
 *
 * Styled to match `app/opengraph-image.tsx` deliberately: two cards from the
 * same site that look unrelated are worse than one generic card.
 */

const icon = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "dietly-icon.png"),
).toString("base64")}`;

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function toolOgImage(slug: string) {
  const t = tool(slug);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} alt="" width={60} height={60} style={{ borderRadius: 17 }} />
          <div style={{ color: "#FFFFFF", fontSize: 38, fontWeight: 800 }}>{SITE_NAME}</div>
          <div
            style={{
              marginLeft: 14,
              color: "#D2F53C",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Free tool
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              marginTop: 24,
              color: "#9A9A9A",
              fontSize: 30,
              fontWeight: 500,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            {t.blurb}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "#6A6A6A",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          dietly.life/{t.slug}
        </div>
      </div>
    ),
    size,
  );
}
