import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-10 max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-fg mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-muted leading-relaxed">
          <p>
            Last updated: May 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">1. Agreement to Terms</h2>
            <p>
              By accessing or using Dietly, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">2. Medical Disclaimer</h2>
            <p>
              Dietly is designed for educational and informational purposes only and does not constitute medical advice. You should always consult with a physician or other healthcare professional before starting any diet or exercise program.
            </p>
            <p>
              The AI-generated insights, nutritional estimations, and coaching advice are based on algorithms and should not replace professional medical judgment.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">4. Subscriptions and Billing</h2>
            <p>
              Some parts of the Service are billed on a subscription basis (&quot;Pro&quot;). You will be billed in advance on a recurring and periodic basis. Your subscription will automatically renew under the exact same conditions unless you cancel it or Dietly cancels it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-fg">5. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at legal@dietly.app.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
