import { Metadata } from "next";
import Link from "next/link";
import ToolPage, { H2, JsonLdScript, ToolFaq, faqJsonLd, toolJsonLd } from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import PhysiqueScanner from "./PhysiqueScanner";

export const metadata: Metadata = toolMetadata("physique-analyzer");

const L = "underline hover:text-fg";

const FAQS = [
  {
    q: "Is the AI physique analyzer free?",
    a: "Yes. There is no account and no signup. Each visitor gets a few scans an hour, because every scan is a paid model call. The full breakdown (four sub-scores and a body fat estimate) and weekly tracking are in the Dietly Fit app.",
  },
  {
    q: "What happens to my photo?",
    a: "It is sent to the vision model once, scored, and discarded. We do not store it, log it or attach it to anything, and the response is marked so that no cache between you and us keeps a copy. The tool is for adults only: you confirm you are 18 or over, and photos that look like a minor are refused.",
  },
  {
    q: "How is the physique score worked out?",
    a: "The model rates four things from 0 to 100: definition (visible muscle separation), leanness (how low body fat looks), symmetry (left to right balance and proportion) and posture. The physique score is their average, judged against the reference for your sex. The lowest one is named as the thing to fix first. This is the same rubric the Dietly Fit app uses.",
  },
  {
    q: "How accurate is it?",
    a: "Good at large differences and weak at small ones. It will reliably tell a lean, trained physique from an untrained one, but two photos of the same person in different light can differ by several points. Use the same setup each time and treat the trend as the signal, not one number.",
  },
  {
    q: "What is a good physique score?",
    a: "Roughly: under 50 means little visible muscle or higher body fat, 50 to 70 is trained but not lean, 70 to 85 is lean and clearly muscular, and above 85 is rare outside people who have trained for years and dieted down. Scores are only comparable with the same tool.",
  },
  {
    q: "Why was my photo rejected?",
    a: "Usually because the upper body was not clearly visible, the photo was too dark or blurred, more than one person was in it, or the person could be under 18. Stand square to the camera in even light, about two metres away, with the torso in frame.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("physique-analyzer")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="physique-analyzer"
        h1={
          <>
            AI Physique{" "}
            <span className="font-display italic text-accent font-light">Analyzer</span>
          </>
        }
        intro="Upload one upper-body photo and get a physique score out of 100, plus the one area holding it back. Free, no account, and the photo is never stored."
        widget={<PhysiqueScanner />}
      >
        <div>
          <H2>What the analyzer measures</H2>
          <p>
            A physique score is a single number built from four visual estimates. <strong>Definition</strong> is how
            much muscle separation shows. <strong>Leanness</strong> is how low your body fat looks.{" "}
            <strong>Symmetry</strong> is balance between left and right and the proportions between areas, including
            the shoulder to waist ratio people call the{" "}
            <Link href="/guides/v-taper" className={L}>
              V-taper
            </Link>
            . <strong>Posture</strong> is how you stand: shoulder position and alignment. The overall score is the
            average of the four, judged against the reference for your sex, because the same body fat reads very
            differently on men and women.
          </p>
          <p>
            The free version shows the overall score and names the lowest of the four. That one result is usually the
            most useful thing a scan can tell you: two people on 62 can need opposite plans, one to lose fat and the
            other to build muscle. Our guide on{" "}
            <Link href="/guides/rate-my-physique" className={L}>
              how AI physique ratings work
            </Link>{" "}
            explains each part in more depth.
          </p>
        </div>

        <div>
          <H2>How to take a photo that scores honestly</H2>
          <ul>
            <li>
              <strong>Front on, upper body in frame.</strong> Chest, shoulders and midsection visible, arms relaxed at
              your sides.
            </li>
            <li>
              <strong>Soft, even light from the front.</strong> Overhead light carves definition that is not there and
              inflates the score.
            </li>
            <li>
              <strong>Camera at chest height, about two metres away.</strong> Close or angled shots distort proportions.
            </li>
            <li>
              <strong>No flexing, no pump.</strong> Score the body you walk around in, ideally in the morning.
            </li>
            <li>
              <strong>Same setup next time.</strong> Then the change between scans is real, even when the absolute
              number is a little off. The{" "}
              <Link href="/guides/progress-photos-guide" className={L}>
                progress photo guide
              </Link>{" "}
              covers the full routine.
            </li>
          </ul>
        </div>

        <div>
          <H2>What a photo cannot tell you</H2>
          <p>
            A photo says nothing about strength, fitness or health markers, and water, salt and a pump can change how
            lean you look within hours. Body fat read from a picture is an estimate with an error of several points,
            which is why the analyzer gives a score rather than claiming a precise percentage. If you want a number to
            compare against, a{" "}
            <Link href="/body-fat-calculator" className={L}>
              tape-measure body fat estimate
            </Link>{" "}
            is free and repeatable, and our guide to{" "}
            <Link href="/guides/body-fat-from-a-photo" className={L}>
              body fat from a photo
            </Link>{" "}
            shows what each range looks like.
          </p>
        </div>

        <div>
          <H2>Turning the score into progress</H2>
          <p>
            One score changes nothing. Point the next month at the lowest sub-score: a modest{" "}
            <Link href="/calorie-deficit-calculator" className={L}>
              calorie deficit
            </Link>{" "}
            if leanness is lowest, more training volume on lagging areas if definition is, single-side work if
            symmetry is, and upper-back work if posture is. Then rescan with the same setup. That weekly loop is what
            the{" "}
            <Link href="/ai-body-scan" className={L}>
              Dietly Fit AI body scan
            </Link>{" "}
            runs for you, with the full breakdown and a training plan built around the weak point.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
