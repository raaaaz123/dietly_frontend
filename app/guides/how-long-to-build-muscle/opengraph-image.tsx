import { guideOgImage, size, contentType } from "../../components/guides/og";
import { guide } from "../../lib/guides";

export { size, contentType };
export const alt = `${guide("how-long-to-build-muscle").heading} — Dietly Fit`;

export default function Image() {
  return guideOgImage("how-long-to-build-muscle");
}
