import { hubOgImage, size, contentType } from "../components/hubOg";

export { size, contentType };
export const alt = "How Dietly compares — Dietly";

export default function Image() {
  return hubOgImage({
    kicker: "Compare",
    heading: "How Dietly compares",
    footnote: "Five honest comparisons · dietly.life",
  });
}
