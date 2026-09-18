import { hubOgImage, size, contentType } from "../components/hubOg";
import { EXERCISES } from "../lib/exercises";

export { size, contentType };
export const alt = "Exercise library — Dietly";

export default function Image() {
  return hubOgImage({
    kicker: "Library",
    heading: `${EXERCISES.length} movements, with a demo for every one`,
    footnote: "By muscle, by equipment · dietly.life",
  });
}
