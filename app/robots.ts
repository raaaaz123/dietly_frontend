import { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

/**
 * Host and sitemap are derived from `SITE_URL`, not written out again.
 *
 * They used to be three hardcoded copies of "https://dietly.life" living beside
 * a fourth in `sitemap.ts`, a fifth in `metadataBase` and eleven more in
 * llms.txt. When the deployment started serving www as the primary host, every
 * one of those kept naming the apex, and we were advertising a canonical host
 * that answered with a redirect. One constant now decides it.
 */
/**
 * Private routes, applied to every group below.
 *
 * A crawler obeys only the most specific group that names it, so the old
 * `{ userAgent: "Googlebot", allow: "/" }` groups did not add to `*`; they
 * replaced it. Googlebot, Bingbot and every AI crawler listed were free to
 * crawl /admin, /api, /influencer and the referral links, spending crawl
 * budget on a site where 66 sitemap URLs are still "Discovered, not indexed".
 */
const PRIVATE = ["/admin/", "/api/", "/influencer/", "/invite", "/f/"];

/**
 * Carved out of `/api/`: the exercise demo clip and poster proxies. Every
 * exercise page's VideoObject names them as `contentUrl` and `thumbnailUrl`,
 * and a blocked thumbnail means no video result at all. The longer, more
 * specific Allow wins over `Disallow: /api/` in Google's and Bing's parsers.
 */
const PUBLIC_MEDIA = ["/", "/api/exercise-clip/", "/api/exercise-poster/"];

/** Named so the intent is explicit to anyone reading robots.txt: AI search and assistants are welcome. */
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "cohere-ai",
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: PUBLIC_MEDIA, disallow: PRIVATE },
      { userAgent: AI_CRAWLERS, allow: PUBLIC_MEDIA, disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
