import LocalizedLanding, { landingMetadata } from "../components/LocalizedLanding";

export const metadata = landingMetadata("it");

export default function Page() {
  return <LocalizedLanding lang="it" />;
}
