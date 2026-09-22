import { guideOgImage, size, contentType } from "../../components/guides/og";
import { guide } from "../../lib/guides";

export { size, contentType };
export const alt = `${guide("skinny-fat").heading} — Dietly Fit`;

export default function Image() {
  return guideOgImage("skinny-fat");
}
