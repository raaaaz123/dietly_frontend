import { ogCard, size, contentType } from "../components/tools/og";

export { size, contentType };
export const alt = "About Dietly Fit | Dietly Fit";

export default function Image() {
  return ogCard({
    eyebrow: "About",
    heading: "About Dietly Fit",
    sub: "A workout log and AI body scan app for iPhone and Android, made by Rexatech.",
    path: "about",
  });
}
