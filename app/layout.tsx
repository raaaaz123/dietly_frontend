import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./lib/auth";
import Analytics from "./lib/analytics";
import { SITE_URL as SITE, DESCRIPTION, APP_STORE_ID, APP_STORE_URL } from "./lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = SITE;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dietly — AI Body Scan, Workout & Diet App",
    template: "%s | Dietly",
  },
  description: DESCRIPTION,
  keywords: [
    "AI body scan app",
    "physique score",
    "AI workout planner",
    "workout and diet app",
    "gym plan app",
    "body fat scan",
    "muscle building app",
    "AI fitness coach",
    "macro tracker",
    "calorie tracker",
    "Dietly",
  ],
  authors: [{ name: "Rexatech", url: SITE_URL }],
  creator: "Rexatech",
  publisher: "Rexatech",
  category: "Health & Fitness",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Dietly",
    title: "Dietly — AI Body Scan, Workout & Diet App",
    description: DESCRIPTION,
    // Images come from app/opengraph-image.tsx, which Next wires up itself.
  },
  twitter: {
    card: "summary_large_image",
    title: "Dietly — AI Body Scan, Workout & Diet App",
    description: DESCRIPTION,
    creator: "@dietlyapp",
  },
  // Verification tokens for Search Console and Bing Webmaster Tools. Read from
  // the server environment rather than committed: they are not secret, but they
  // are per-property, and a token checked into the repo is a token nobody
  // remembers to change when the property does. Unset in dev, so nothing is
  // emitted locally.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {},
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // No `alternates` here on purpose. Next merges parent metadata into every
  // child segment, so a canonical set at the root is inherited by any page that
  // does not set its own — which is how /macro-calculator and
  // /body-fat-calculator both ended up declaring the homepage as their
  // canonical and asking Google to drop them. Canonicals belong on the page
  // that owns the URL; `metadataBase` above makes a relative one resolve.
  appLinks: {
    ios: {
      url: APP_STORE_URL,
      app_store_id: APP_STORE_ID,
    },
    android: {
      package: "com.dietlyai.app",
    },
  },
};

export const viewport: Viewport = {
  // Matches --bg. The browser chrome on mobile takes this colour, so a light
  // value here put a white bar above a black page.
  themeColor: "#0D0D0D",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Analytics />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
