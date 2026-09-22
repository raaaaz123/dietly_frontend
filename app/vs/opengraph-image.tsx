import { hubOgImage, size, contentType } from "../components/hubOg";

export { size, contentType };
export const alt = "How Dietly Fit compares — Dietly Fit";

export default function Image() {
  return hubOgImage({
    kicker: "Compare",
    heading: "How Dietly Fit compares",
    footnote: "Five honest comparisons · dietly.life",
  });
}
