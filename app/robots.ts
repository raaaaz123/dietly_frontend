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
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/influencer/", "/invite", "/f/"],
      },
      // Explicitly allow all major AI crawlers
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
