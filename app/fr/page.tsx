import LocalizedLanding, { landingMetadata } from "../components/LocalizedLanding";

export const metadata = landingMetadata("fr");

export default function Page() {
  return <LocalizedLanding lang="fr" />;
}
