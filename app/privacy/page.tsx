import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-10 max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-fg mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-muted leading-relaxed">
          <p>
            Last updated: May 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">1. Information We Collect</h2>
            <p>
              When you use Dietly, we collect information you provide directly to us, such as when you create or modify your account, log meals, sync wearable data, request on-demand services, contact customer support, or otherwise communicate with us.
            </p>
            <p>
              This information may include: name, email, phone number, postal address, profile picture, payment method, health data (including dietary preferences and goals), and other information you choose to provide.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, including to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide our AI nutritional analysis and coaching services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize and improve the Services</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">3. Health Data</h2>
            <p>
              We treat your health and nutritional data with the utmost sensitivity. Your dietary logs, wearable data, and coaching conversations are encrypted in transit and at rest. We do not sell your personal health data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@dietly.app.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
