import { guideOgImage, size, contentType } from "../../components/guides/og";
import { guide } from "../../lib/guides";

export { size, contentType };
export const alt = `${guide("training-around-a-weak-point").heading} — Dietly`;

export default function Image() {
  return guideOgImage("training-around-a-weak-point");
}
