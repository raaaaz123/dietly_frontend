import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "../../lib/site";
import { guide } from "../../lib/guides";

/** Matches the tool card deliberately — one visual system across the site. */
const icon = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "dietly-icon.png"),
).toString("base64")}`;

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function guideOgImage(slug: string) {
  const g = guide(slug);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0D0D0D",
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
              color: "#F0EEE9",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Guide
          </div>
        </div>

        <div
          style={{
            color: "#FFFFFF",
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {g.heading}
        </div>

        <div style={{ display: "flex", color: "#6A6A6A", fontSize: 24, fontWeight: 600 }}>
          {g.readingMinutes} min read · dietly.life
        </div>
      </div>
    ),
    size,
  );
}
