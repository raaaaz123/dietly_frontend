import type { Metadata } from "next";
import { Fraunces, Albert_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./lib/auth";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const albert = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://dietly.life";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dietly — AI Nutrition & Health Tracking App",
    template: "%s | Dietly",
  },
  description:
    "Dietly is an AI-powered nutrition and fitness app. Snap a photo of any meal for instant calorie and macro tracking, get personalized coaching, log workouts by voice, and stay consistent with smart hydration and streak features.",
  keywords: [
    "AI nutrition app",
    "calorie tracker",
    "macro tracker",
    "AI food recognition",
    "meal logging app",
    "fitness tracker",
    "weight loss app",
    "diet app",
    "healthy eating app",
    "nutrition coach",
    "workout tracker",
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
    title: "Dietly — AI Nutrition & Health Tracking App",
    description:
      "Snap a photo of any meal for instant macro tracking. Personalized AI coaching that remembers your goals. Available free on iOS and Android.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dietly — AI Nutrition App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dietly — AI Nutrition & Health Tracking App",
    description:
      "Snap a photo of any meal for instant macro tracking. Personalized AI coaching that remembers your goals.",
    images: ["/images/og-image.png"],
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
      url: "https://apps.apple.com/app/dietly-ai/id0000000000",
      app_store_id: "0000000000",
    },
    android: {
      package: "com.dietlyai.app",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${albert.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
