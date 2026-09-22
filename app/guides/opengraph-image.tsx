import { hubOgImage, size, contentType } from "../components/hubOg";

export { size, contentType };
export const alt = "The reasoning behind the app — Dietly Fit";

export default function Image() {
  return hubOgImage({
    kicker: "Guides",
    heading: "The reasoning behind the app",
    footnote: "Physique, training and body composition · dietly.life",
  });
}
