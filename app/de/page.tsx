import LocalizedLanding, { landingMetadata } from "../components/LocalizedLanding";

export const metadata = landingMetadata("de");

export default function Page() {
  return <LocalizedLanding lang="de" />;
}
