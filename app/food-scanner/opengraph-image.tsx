import { toolOgImage, size, contentType } from "../components/tools/og";
import { tool } from "../lib/tools";

export { size, contentType };
export const alt = `${tool("food-scanner").name} — Dietly Fit`;

export default function Image() {
  return toolOgImage("food-scanner");
}
