import {
  SITE_URL,
  SITE_NAME,
  DESCRIPTION,
  APP_STORE_URL,
  PLAY_STORE_URL,
  MIN_OS,
} from "../lib/site";
import { faqs } from "./FAQ";

/**
 * Structured data for the homepage: the app, the company, and the four
 * questions the page already answers.
 *
 * Every field is read from `lib/site` rather than written out again, because
 * Google treats markup that disagrees with the visible copy as spam — and
 * markup duplicated by hand is markup that drifts the first time the copy
 * changes. The FAQ entity is built from the same `faqs` array `FAQ.tsx`
 * renders, for exactly that reason: a FAQPage whose answers are not visible on
 * the page is the most common route to a structured-data manual action.
 *
 * Deliberately no `aggregateRating`: the app has no ratings yet, and inventing
 * one is both a manual-action risk and the exact fabrication we refused to put
 * on the App Store listing. Add it when there are real reviews to point at.
 */
export default function JsonLd() {
  const app = {
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

  /**
   * The publisher, as an entity.
   *
   * This is what lets a search engine — and a model — resolve "Dietly" to a
   * real company with listings it can cross-check, rather than to a string that
   * happens to appear on a page. `sameAs` is the whole point of it; the store
   * listings are the corroboration.
   */
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rexatech",
    url: SITE_URL,
    logo: `${SITE_URL}/dietly-icon.png`,
    brand: { "@type": "Brand", name: SITE_NAME },
    sameAs: [APP_STORE_URL, PLAY_STORE_URL],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {[app, organization, faqPage].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
