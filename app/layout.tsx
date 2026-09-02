import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./lib/auth";
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
  alternates: {
    canonical: SITE_URL,
  },
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
  themeColor: "#0A0A0A",
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
