import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    // ADMIN_API_KEY is deliberately NOT re-exported here any more. Everything
    // in this block is inlined into the client bundle, and `app/lib/api.ts` —
    // imported by "use client" pages — put the key in every visitor's browser,
    // handing them write and delete on the exercise catalogue. Admin calls now
    // go through `app/api/admin/[...path]/route.ts`, which reads the key from
    // the real server-side environment.
    //
    // ADMIN_USERNAME/ADMIN_PASSWORD above are still inlined and still wrong for
    // the same reason; `app/lib/auth.tsx` compares them in the browser, so
    // fixing them means moving the login check server-side too.
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
