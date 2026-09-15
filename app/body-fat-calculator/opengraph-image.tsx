import { toolOgImage, size, contentType } from "../components/tools/og";
import { tool } from "../lib/tools";

export { size, contentType };
export const alt = `${tool("body-fat-calculator").name} — Dietly`;

export default function Image() {
  return toolOgImage("body-fat-calculator");
}
