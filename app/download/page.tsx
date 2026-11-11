import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StoreButtons from "../components/StoreButtons";
import { GetAppButton } from "../components/GetApp";

/**
 * Where `/get` sends computers. Phones never see this page unless they open it
 * directly, in which case the button still goes straight to their store.
 */
export const metadata: Metadata = {
  title: "Download Dietly Fit for iPhone and Android",
  description:
    "Scan the QR code with your phone camera to get Dietly Fit from the App Store or Google Play. Log every lift and score your physique out of 100 each week.",
  alternates: { canonical: "/download" },
};

const STEPS = [
  { t: "Scan the code", d: "Open your phone camera and point it at the QR code." },
  { t: "Tap the link", d: "It opens Dietly Fit in the App Store or Google Play." },
  { t: "Install and open", d: "Answer a few questions and your training plan is built." },
];

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24 overflow-hidden">
        <div className="hero-glow" />
        <div className="relative max-w-[920px] mx-auto px-6 md:px-12">
          <div className="text-center">
            <span className="tool-eyebrow">iPhone and Android</span>
            <h1 className="mt-6 text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.05] tracking-[-1.5px] text-fg">
              Get Dietly Fit on your phone
            </h1>
            <p className="mt-4 text-[17px] text-fg-muted max-w-[560px] mx-auto leading-relaxed">
              Log every lift, scan one photo a week for a physique score out of 100, and train the area holding you back.
            </p>
          </div>

          <div className="mt-12 install-card p-6 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
            <div className="mx-auto rounded-3xl bg-white p-4 shadow-[0_20px_60px_-20px_rgba(200,245,96,0.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/qr-get.svg" alt="QR code that opens Dietly Fit in your phone's app store" width={200} height={200} />
            </div>
            <div>
              <ol className="space-y-5">
                {STEPS.map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className={`step-dot ${i === 0 ? "step-dot-on" : ""}`}>{i + 1}</span>
                    <span>
                      <span className="block text-[17px] font-semibold text-fg">{s.t}</span>
                      <span className="block text-[14px] text-fg-muted mt-0.5">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 md:hidden">
                <GetAppButton from="download" className="w-full" />
              </div>
              <div data-placement="download_page" className="mt-8 hidden md:block">
                <p className="text-[13px] text-fg-faint mb-3">Or open the store directly</p>
                <StoreButtons height={42} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
