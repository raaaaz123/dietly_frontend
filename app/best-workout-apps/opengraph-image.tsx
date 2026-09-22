import { ogCard, size, contentType } from "../components/tools/og";

export { size, contentType };
export const alt = "Best workout apps in 2026 — Dietly Fit";

export default function Image() {
  return ogCard({
    eyebrow: "Compared honestly",
    heading: "Best workout apps",
    sub: "Five apps, priced only where the vendor publishes a price.",
    path: "best-workout-apps",
  });
}
