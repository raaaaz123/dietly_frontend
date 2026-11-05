import { guideOgImage, size, contentType } from "../../components/guides/og";
import { guide } from "../../lib/guides";

export { size, contentType };
export const alt = `${guide("body-fat-from-a-photo").heading} | Dietly Fit`;

export default function Image() {
  return guideOgImage("body-fat-from-a-photo");
}
