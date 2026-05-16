import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Dietly terms of service. Read about acceptable use, subscription billing, medical disclaimer, and your rights as a user.",
  alternates: { canonical: "https://dietly.life/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-10 max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-fg mb-4">Terms of Service</h1>
        <p className="text-muted text-sm mb-12">Last updated: May 2026</p>

        <div className="space-y-10 text-muted leading-relaxed">

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">1. Agreement to Terms</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Dietly mobile application and website (collectively, the &quot;Service&quot;), operated by Rexatech (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By downloading, installing, or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">2. Eligibility</h2>
            <p>
              You must be at least 13 years old to use the Service (16 in the EU/UK). By using the Service, you represent that you meet this age requirement. If you are under 18, you must have the consent of a parent or legal guardian.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">3. Medical Disclaimer</h2>
            <p>
              Dietly is designed for general informational and wellness purposes only. The AI-generated coaching, nutritional estimates, and workout suggestions are not medical advice and do not constitute a doctor-patient relationship. Always consult a qualified healthcare professional before making significant changes to your diet or exercise routine, especially if you have a medical condition, are pregnant, or are taking medication.
            </p>
            <p>
              Do not disregard professional medical advice or delay seeking it because of something you read or heard in the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">4. Your Account</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:rexatechin@gmail.com" className="text-accent hover:underline">rexatechin@gmail.com</a> if you suspect unauthorized access. We are not liable for any loss resulting from unauthorized use of your account.
            </p>
            <p>
              You agree to provide accurate, complete, and current information when creating your account and to keep it up to date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">5. Subscriptions and Billing</h2>
            <p>
              Dietly offers both free and paid (&quot;Pro&quot;) tiers. Paid subscriptions are billed in advance on a recurring basis (weekly, monthly, or annually, depending on the plan you choose) through the Apple App Store or Google Play Store.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscriptions automatically renew unless you cancel at least 24 hours before the end of the current billing period.</li>
              <li>You can manage and cancel your subscription in your App Store or Google Play account settings.</li>
              <li>We do not issue refunds for partially used subscription periods except where required by law or Apple/Google policy.</li>
              <li>Prices may change with notice. Continued use after a price change constitutes acceptance.</li>
            </ul>
            <p>
              For billing issues, contact us at <a href="mailto:rexatechin@gmail.com" className="text-accent hover:underline">rexatechin@gmail.com</a> or use the restore purchase option in the app (Profile &gt; Settings &gt; Restore Purchases).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">6. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for any unlawful purpose or in violation of these Terms.</li>
              <li>Attempt to reverse engineer, decompile, or extract source code from the app.</li>
              <li>Upload content that is harmful, misleading, defamatory, or infringes any third-party rights.</li>
              <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure.</li>
              <li>Interfere with or disrupt the integrity or performance of the Service.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">7. Intellectual Property</h2>
            <p>
              All content, features, and functionality of the Service -- including the AI models, UI design, text, graphics, and logos -- are owned by Rexatech and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
            <p>
              You retain ownership of the content you submit (meal logs, photos, etc.). By submitting content, you grant us a limited, non-exclusive license to use it solely to operate and improve the Service on your behalf.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">8. Privacy</h2>
            <p>
              Your use of the Service is also governed by our <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference. We do not sell your personal data. See the Privacy Policy for full details on how we collect, use, and protect your information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">9. Disclaimers</h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or completely secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Rexatech shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, revenue, or health outcomes, arising out of or relating to your use of the Service. Our total liability for any claim arising from these Terms or the Service shall not exceed the amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">11. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for violation of these Terms, with or without notice. You may delete your account at any time via Profile &gt; Settings &gt; Delete Account or by visiting <a href="/delete-account" className="text-accent hover:underline">dietly.life/delete-account</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">12. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with applicable laws. Any disputes will be resolved through good-faith negotiation first, followed by binding arbitration if necessary, except where prohibited by law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">13. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be communicated via in-app notice or email at least 14 days before taking effect. Continued use of the Service after changes take effect constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">14. Contact Us</h2>
            <p>
              Questions about these Terms? Contact us at:
            </p>
            <p>
              <strong className="text-fg">Rexatech</strong><br />
              Email: <a href="mailto:rexatechin@gmail.com" className="text-accent hover:underline">rexatechin@gmail.com</a><br />
              Support: <a href="/support" className="text-accent hover:underline">dietly.life/support</a>
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
