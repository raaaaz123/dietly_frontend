import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME } from "../lib/site";

/**
 * The share card for a hub page — /tools, /guides, /vs.
 *
 * The tool, guide and comparison *pages* each got a per-page card; the three
 * hubs that collect them were missed, so every share of /tools fell back to the
 * homepage card and said nothing about what was behind the link. Same layout as
 * the others, driven by a kicker and a headline instead of a registry entry.
 */
const icon = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "dietly-icon.png"),
).toString("base64")}`;

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function hubOgImage({
  kicker,
  heading,
  footnote,
}: {
  kicker: string;
  heading: string;
  footnote: string;
}) {
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
          <div style={{ color: "#F0EEE9", fontSize: 38, fontWeight: 800 }}>{SITE_NAME}</div>
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
            {kicker}
          </div>
        </div>

        <div
          style={{
            color: "#F0EEE9",
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1.8,
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {heading}
        </div>

        <div style={{ display: "flex", color: "#8C8C8C", fontSize: 24, fontWeight: 600 }}>
          {footnote}
        </div>
      </div>
    ),
    size,
  );
}
