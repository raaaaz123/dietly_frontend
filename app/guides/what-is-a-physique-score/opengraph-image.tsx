import { guideOgImage, size, contentType } from "../../components/guides/og";
import { guide } from "../../lib/guides";

export { size, contentType };
export const alt = `${guide("what-is-a-physique-score").heading} — Dietly Fit`;

export default function Image() {
  return guideOgImage("what-is-a-physique-score");
}
