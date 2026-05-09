import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./lib/auth";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

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

export const metadata: Metadata = {
  title: "Dietly — AI-Native Nutrition Tracking",
  description:
    "AI-powered food recognition, an agentic coach that remembers you, smart workout tracking, and voice-first logging.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
