import LocalizedLanding, { landingMetadata } from "../components/LocalizedLanding";

export const metadata = landingMetadata("tr");

export default function Page() {
  return <LocalizedLanding lang="tr" />;
}
