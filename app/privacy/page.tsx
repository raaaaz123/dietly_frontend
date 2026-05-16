import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Dietly's privacy policy. We do not sell or share your personal health data with any third party. Full details on data collection, use, and your rights.",
  alternates: { canonical: "https://dietly.life/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-10 max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-fg mb-4">Privacy Policy</h1>
        <p className="text-muted text-sm mb-12">Last updated: May 2026</p>

        <div className="space-y-10 text-muted leading-relaxed">

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">Overview</h2>
            <p>
              Dietly (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is operated by Rexatech. This Privacy Policy explains what information we collect when you use the Dietly mobile application and website (collectively, the &quot;Service&quot;), how we use it, and the choices you have regarding your information.
            </p>
            <p className="font-semibold text-fg">
              We do not sell, rent, or share your personal information with any third party for their own marketing or commercial purposes. Ever.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">1. Information We Collect</h2>
            <h3 className="font-semibold text-fg">Information you provide</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information: name, email address, and password when you register.</li>
              <li>Profile data: age, sex, height, weight, and fitness goals you enter during onboarding or later in the app.</li>
              <li>Health and nutrition data: meals you log, workout sessions, water intake, and progress photos if you choose to upload them.</li>
              <li>Coach conversations: messages and voice interactions you have with the AI coach.</li>
            </ul>

            <h3 className="font-semibold text-fg mt-4">Information collected automatically</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device information: device model, operating system version, and a unique device identifier.</li>
              <li>App usage data: features used, session duration, and crash reports -- used solely to improve app stability and performance.</li>
              <li>IP address: collected transiently for security and fraud prevention; not stored long-term.</li>
            </ul>

            <h3 className="font-semibold text-fg mt-4">Information we do NOT collect</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not access your device camera or microphone except when you explicitly initiate a food photo scan or a voice coaching session.</li>
              <li>We do not collect contacts, location data, or any data from other apps on your device.</li>
              <li>We do not track you across other apps or websites.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">2. How We Use Your Information</h2>
            <p>We use the information we collect exclusively to provide and improve the Service:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deliver personalized AI nutrition coaching, meal analysis, and workout recommendations.</li>
              <li>Maintain your account and sync your data across your devices.</li>
              <li>Send transactional notifications (e.g., subscription confirmation, password reset). You can opt out of non-essential notifications in the app settings.</li>
              <li>Diagnose technical problems and improve app performance.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p>We do not use your data to build advertising profiles or sell insights to any third party.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">3. Health Data</h2>
            <p>
              Health and nutritional data you enter is used only to power your personal experience in the app. It is encrypted in transit (TLS 1.2+) and at rest (AES-256). We do not sell, license, or otherwise disclose your health data to insurance companies, employers, pharmaceutical companies, advertisers, or any other third party.
            </p>
            <p>
              If you connect Apple Health or Google Fit, data read from those sources is used only within the app to improve your coaching experience and is never transmitted to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">4. Data Sharing</h2>
            <p>
              We do not share your personal information with third parties except in the following limited circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-semibold text-fg">Service providers:</span> We use a small number of infrastructure providers (cloud hosting, crash analytics) who process data on our behalf under strict confidentiality agreements. They are not permitted to use your data for any purpose other than providing services to us.
              </li>
              <li>
                <span className="font-semibold text-fg">Legal requirements:</span> We may disclose information if required by law, court order, or to protect the rights, property, or safety of Rexatech, our users, or the public.
              </li>
              <li>
                <span className="font-semibold text-fg">Business transfer:</span> If Rexatech is acquired or merges with another company, your information may transfer as part of that transaction. We will notify you before your data is subject to a different privacy policy.
              </li>
            </ul>
            <p className="font-semibold text-fg">
              Outside these three scenarios, we do not share your data with anyone.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">5. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active. If you delete your account, we permanently delete your personal data within 30 days, except where retention is required by law (e.g., billing records required for tax purposes, which are retained for the legally required period and then deleted).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">6. Your Rights and Choices</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-semibold text-fg">Access:</span> Request a copy of the data we hold about you.</li>
              <li><span className="font-semibold text-fg">Correction:</span> Update inaccurate or incomplete data directly in the app or by contacting us.</li>
              <li><span className="font-semibold text-fg">Deletion:</span> Delete your account and all associated data via Profile &gt; Settings &gt; Delete Account, or at dietly.life/delete-account.</li>
              <li><span className="font-semibold text-fg">Portability:</span> Request an export of your data in a machine-readable format.</li>
              <li><span className="font-semibold text-fg">Objection:</span> Object to processing where we rely on legitimate interests.</li>
            </ul>
            <p>To exercise any of these rights, email <a href="mailto:rexatechin@gmail.com" className="text-accent hover:underline">rexatechin@gmail.com</a>. We will respond within 30 days.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">7. Children&apos;s Privacy</h2>
            <p>
              Dietly is not directed to children under the age of 13 (or 16 in the EU/UK). We do not knowingly collect personal information from children. If we learn that we have collected information from a child without parental consent, we will delete it promptly. If you believe a child has provided us personal information, contact us at <a href="mailto:rexatechin@gmail.com" className="text-accent hover:underline">rexatechin@gmail.com</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">8. Security</h2>
            <p>
              We implement industry-standard security measures including TLS encryption for all data in transit, AES-256 encryption for data at rest, access controls limiting who within Rexatech can access user data, and regular security reviews. No system is 100% secure, and we cannot guarantee absolute security, but we take every reasonable precaution.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">9. International Transfers</h2>
            <p>
              Your information may be processed in countries other than your own. Where we transfer data internationally, we ensure appropriate safeguards are in place consistent with applicable data protection laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you via in-app notification or email before the changes take effect. Continued use of the Service after the effective date constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">11. Contact Us</h2>
            <p>
              For any privacy-related questions, requests, or concerns, contact us at:
            </p>
            <p>
              <strong className="text-fg">Rexatech</strong><br />
              Email: <a href="mailto:rexatechin@gmail.com" className="text-accent hover:underline">rexatechin@gmail.com</a>
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
