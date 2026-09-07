import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME, TAGLINE } from "./lib/site";

/**
 * The social preview card, generated rather than stored.
 *
 * `layout.tsx` pointed at `/images/og-image.png`, which has never existed in
 * this repo — so every link to the site, in every chat app and every tweet,
 * rendered with a broken image. Generating it here means it cannot go missing,
 * and it restyles itself when the palette moves.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — ${TAGLINE}`;

/**
 * The app icon, inlined. `ImageResponse` renders on the server with no origin
 * to resolve a relative `/dietly-icon.png` against, so the bytes have to travel
 * with the markup.
 */
const icon = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "dietly-icon.png"),
).toString("base64")}`;

export default function OpengraphImage() {
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
          <div style={{ color: "#FFFFFF", fontSize: 38, fontWeight: 800 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Scan your body.
          </div>
          <div
            style={{
              color: "#D2F53C",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Get the plan that moves it.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Weekly body scan", "A plan built from it", "Food by photo or voice"].map(
            (pill) => (
              <div
                key={pill}
                style={{
                  display: "flex",
                  border: "1px solid rgba(255,255,255,0.16)",
                  borderRadius: 999,
                  padding: "12px 26px",
                  color: "#9A9A9A",
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                {pill}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
