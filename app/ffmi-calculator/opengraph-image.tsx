import { toolOgImage, size, contentType } from "../components/tools/og";
import { tool } from "../lib/tools";

export { size, contentType };
export const alt = `${tool("ffmi-calculator").name} — Dietly Fit`;

export default function Image() {
  return toolOgImage("ffmi-calculator");
}
