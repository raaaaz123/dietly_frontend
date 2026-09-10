import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Screens from "./components/Screens";
import Ranks from "./components/Ranks";
import Inside from "./components/Inside";
import FAQ from "./components/FAQ";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import MobileCTA from "./components/MobileCTA";
import JsonLd from "./components/JsonLd";

/**
 * The landing page.
 *
 * Seven sections, in the order someone decides in: what it is, how it works,
 * what it looks like, what it ranks, what's inside, the four objections, and
 * the ask. The two in the middle are new because the two things added since
 * the pivot — real captures of the shipping app, and a rank for every muscle —
 * are the two hardest to believe from prose alone. The page it replaced ran to
 * eight sections and 719 lines, most of it arguing for the calorie app Dietly
 * used to be — a hydration tracker, a streak wall, a macro breakdown and three
 * separate screenshot galleries, none of which describe the product now.
 *
 * Everything on this page points at one action: install. There is no email
 * capture, no secondary "learn more" beside the store buttons, and no pricing
 * table — the price is a decision for inside the app, after the scan has done
 * the arguing.
 */
export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Screens />
        <Ranks />
        <Inside />
        <FAQ />
        <Cta />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
