import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    // ADMIN_API_KEY is deliberately NOT re-exported here any more. Everything
    // in this block is inlined into the client bundle, and `app/lib/api.ts` —
    // imported by "use client" pages — put the key in every visitor's browser,
    // handing them write and delete on the exercise catalogue. Admin calls now
    // go through `app/api/admin/[...path]/route.ts`, which reads the key from
    // the real server-side environment.
    //
    // ADMIN_USERNAME/ADMIN_PASSWORD are gone from this block too. They were
    // inlined for the same reason and were the whole of the admin login —
    // `app/lib/auth.tsx` compared them in the browser. The check now runs in
    // `app/api/admin/session/route.ts` against the server environment.
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Robots-Tag", value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        ],
      },
      {
        // The app-association file, served the way Apple insists on reading it.
        //
        // Apple fetches this with its own client, does **not** follow
        // redirects, and wants JSON. Two things were wrong: it was being
        // served as application/octet-stream, and `dietly.life` 307s to
        // `www.dietly.life`, so a device asking the apex host got a redirect
        // and gave up. The app declares both hosts for that reason; this makes
        // sure whichever one it asks answers with the file itself.
        source: "/.well-known/apple-app-site-association",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        // Allow AI crawlers to read llms.txt freely
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
