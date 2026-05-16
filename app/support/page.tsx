import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Dietly. Browse common questions about subscriptions, account deletion, AI coaching, and billing, or email our support team directly.",
  alternates: { canonical: "https://dietly.life/support" },
  openGraph: {
    title: "Support | Dietly",
    description: "Get help with Dietly. Browse FAQs or email our support team.",
    url: "https://dietly.life/support",
  },
};

const faqs = [
  {
    q: "How do I cancel my subscription?",
    a: "On iOS, open the Settings app, tap your Apple ID at the top, go to Subscriptions, find Dietly, and tap Cancel Subscription. On Android, open the Google Play Store, tap your profile icon, go to Payments & subscriptions > Subscriptions, find Dietly, and tap Cancel.",
  },
  {
    q: "How do I delete my account and all my data?",
    a: "Go to Profile > Settings > Delete Account inside the app, or visit dietly.life/delete-account. All your personal data will be permanently removed within 30 days.",
  },
  {
    q: "My AI coach isn't responding. What should I do?",
    a: "Check your internet connection. If the issue persists, close and reopen the app. If you still have trouble, email us and include your device model and iOS/Android version.",
  },
  {
    q: "Is my health data secure?",
    a: "Yes. All data is encrypted in transit (TLS) and at rest. We do not sell or share your personal health data with any third party. See our Privacy Policy for full details.",
  },
  {
    q: "I was charged but didn't receive Pro access. What do I do?",
    a: "Restore your purchase from the app: Profile > Settings > Restore Purchases. If that doesn't work, email us with your Apple ID or Google account email and we'll sort it out.",
  },
  {
    q: "Can I use Dietly on multiple devices?",
    a: "Yes. Sign in with the same account on any device and your data syncs automatically.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-10 max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-fg mb-4">Support</h1>
        <p className="text-muted leading-relaxed mb-16">
          We&apos;re here to help. Browse common questions below or reach out directly.
        </p>

        {/* Contact card */}
        <section className="mb-16 p-8 rounded-2xl border border-border bg-surface">
          <h2 className="text-xl font-bold text-fg mb-2">Contact Us</h2>
          <p className="text-muted text-sm leading-relaxed mb-6">
            For support, billing questions, privacy requests, or anything else, email us directly. We typically respond within 24 hours.
          </p>
          <a
            href="mailto:rexatechin@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-ink text-[13px] font-bold tracking-wide rounded-full hover:bg-accent/90 transition-colors"
          >
            rexatechin@gmail.com
          </a>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-fg mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((item) => (
              <div key={item.q} className="border-b border-border pb-6 last:border-0 last:pb-0">
                <h3 className="font-semibold text-fg mb-2">{item.q}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Additional links */}
        <section className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted">
            You may also want to review our{" "}
            <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>,{" "}
            <a href="/terms" className="text-accent hover:underline">Terms of Service</a>, or{" "}
            <a href="/delete-account" className="text-accent hover:underline">request account deletion</a>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
