import LocalizedLanding, { landingMetadata } from "../components/LocalizedLanding";

export const metadata = landingMetadata("pt-br");

export default function Page() {
  return <LocalizedLanding lang="pt-br" />;
}
