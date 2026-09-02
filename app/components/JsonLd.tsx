import {
  SITE_URL,
  SITE_NAME,
  DESCRIPTION,
  APP_STORE_URL,
  MIN_OS,
} from "../lib/site";

/**
 * Structured data for the app listing.
 *
 * Every field is read from `lib/site` rather than written out again, because
 * Google treats markup that disagrees with the visible copy as spam — and
 * markup duplicated by hand is markup that drifts the first time the copy
 * changes.
 *
 * Deliberately no `aggregateRating`: the app has no ratings yet, and inventing
 * one is both a manual-action risk and the exact fabrication we refused to put
 * on the App Store listing. Add it when there are real reviews to point at.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    description: DESCRIPTION,
    url: SITE_URL,
    applicationCategory: "HealthApplication",
    operatingSystem: `${MIN_OS}, Android`,
    installUrl: APP_STORE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
