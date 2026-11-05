import { ogCard, size, contentType } from "../components/tools/og";

export { size, contentType };
export const alt = "AI body scan: your physique scored out of 100 | Dietly Fit";

export default function Image() {
  return ogCard({
    eyebrow: "AI body scan",
    heading: "Your physique, scored out of 100",
    sub: "Definition, leanness, symmetry, posture and the weak point, from one photo.",
    path: "ai-body-scan",
  });
}
