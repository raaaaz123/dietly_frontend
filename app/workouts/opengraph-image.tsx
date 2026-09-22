import { ogCard, size, contentType } from "../components/tools/og";

export { size, contentType };
export const alt = "Workout plans — Dietly Fit";

export default function Image() {
  return ogCard({
    eyebrow: "Free plans",
    heading: "Workout plans",
    sub: "The full week written out — sets, reps, rest and a demo for every movement.",
    path: "workouts",
  });
}
