import { guideOgImage, size, contentType } from "../../components/guides/og";
import { guide } from "../../lib/guides";

export { size, contentType };
export const alt = `${guide("progress-photos-guide").heading} — Dietly Fit`;

export default function Image() {
  return guideOgImage("progress-photos-guide");
}
