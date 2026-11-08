import LocalizedLanding, { landingMetadata } from "../components/LocalizedLanding";

export const metadata = landingMetadata("ru");

export default function Page() {
  return <LocalizedLanding lang="ru" />;
}
