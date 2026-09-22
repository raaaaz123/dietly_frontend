import { hubOgImage, size, contentType } from "../components/hubOg";

export { size, contentType };
export const alt = "Free calculators, no signup — Dietly Fit";

export default function Image() {
  return hubOgImage({
    kicker: "Tools",
    heading: "Free calculators, no signup",
    footnote: "Eight calculators · dietly.life",
  });
}
