import { toolOgImage, size, contentType } from "../components/tools/og";
import { tool } from "../lib/tools";

export { size, contentType };
export const alt = `${tool("physique-analyzer").name} | Dietly Fit`;

export default function Image() {
  return toolOgImage("physique-analyzer");
}
