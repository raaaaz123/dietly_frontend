import LocalizedLanding, { landingMetadata } from "../components/LocalizedLanding";

export const metadata = landingMetadata("zh-hans");

export default function Page() {
  return <LocalizedLanding lang="zh-hans" />;
}
