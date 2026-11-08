import LocalizedLanding, { landingMetadata } from "../components/LocalizedLanding";

export const metadata = landingMetadata("nl");

export default function Page() {
  return <LocalizedLanding lang="nl" />;
}
