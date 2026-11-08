import LocalizedLanding, { landingMetadata } from "../components/LocalizedLanding";

export const metadata = landingMetadata("es");

export default function Page() {
  return <LocalizedLanding lang="es" />;
}
