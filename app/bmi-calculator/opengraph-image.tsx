import { toolOgImage, size, contentType } from "../components/tools/og";
import { tool } from "../lib/tools";

export { size, contentType };
export const alt = `${tool("bmi-calculator").name} — Dietly Fit`;

export default function Image() {
  return toolOgImage("bmi-calculator");
}
