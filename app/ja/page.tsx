import LocalizedLanding, { landingMetadata } from "../components/LocalizedLanding";

export const metadata = landingMetadata("ja");

export default function Page() {
  return <LocalizedLanding lang="ja" />;
}
