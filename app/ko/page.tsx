import LocalizedLanding, { landingMetadata } from "../components/LocalizedLanding";

export const metadata = landingMetadata("ko");

export default function Page() {
  return <LocalizedLanding lang="ko" />;
}
