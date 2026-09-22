import { Metadata } from "next";
import ToolPage, {
  H2,
  JsonLdScript,
  ToolFaq,
  faqJsonLd,
  toolJsonLd,
} from "../components/tools/ToolPage";
import { toolMetadata } from "../lib/tools";
import FoodScanner from "./FoodScanner";

export const metadata: Metadata = toolMetadata("food-scanner");

/**
 * The prose below is not padding.
 *
 * The widget on this page is client-side, and `SEO_PLAN.md` §4.3 is explicit
 * about what that costs: GPTBot, ClaudeBot and PerplexityBot largely do not
 * execute JavaScript, and Google ranks the text it can read. A page that is
 * only a file input is invisible to every channel this site is being built
 * for. The scanner earns installs; these paragraphs earn the traffic that
 * reaches it.
 */
const FAQS = [
  {
    q: "How accurate is calorie counting from a photo?",
    a: "Treat it as a good estimate, not a measurement. A photo carries no information about what is underneath the surface, how much oil a dish was cooked in, or how dense a portion is — and published work on both people and software estimating calories from images finds errors commonly in the 20 to 30% range, sometimes more for mixed dishes. It is reliable enough to tell a 300 kcal breakfast from a 900 kcal one, and not reliable enough to settle a 50 kcal difference.",
  },
  {
    q: "Is this food scanner free?",
    a: "Yes, and it needs no account. There is a limit on how many scans one visitor can run in an hour, because each one costs us a model call — if you hit it, wait an hour or use the app, which is built for logging every meal rather than trying one.",
  },
  {
    q: "What happens to my photo?",
    a: "It is sent to the model that reads it and returned as text. We do not store the image, and it is not attached to any account, because there is no account involved. Nothing about the scan is cached — the response is explicitly marked not to be stored by any CDN between us and you.",
  },
  {
    q: "Why did it get my meal wrong?",
    a: "Usually one of three things. The photo was taken at a shallow angle, so portion size had nothing to scale against — shoot from above with a fork or hand in frame. The dish was mixed, and sauces, oils and fillings are the part a camera genuinely cannot see. Or the food is regional enough that a plain name fits it badly. When the model is unsure it says so next to the item, and that flag is worth believing.",
  },
  {
    q: "Which foods does it handle worst?",
    a: "Anything where the calories are hidden rather than visible: curries and stir-fries where the oil is absorbed, soups and stews with dense bases, composite baked goods, and anything eaten out where the kitchen was more generous than a home cook. Whole foods on a plate — meat, rice, vegetables, fruit, eggs — read far more reliably, because portion and identity are both on the surface.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLdScript data={toolJsonLd("food-scanner")} />
      <JsonLdScript data={faqJsonLd(FAQS)} />
      <ToolPage
        slug="food-scanner"
        h1={
          <>
            AI Food{" "}
            <span className="font-display italic text-accent font-light">Scanner</span>
          </>
        }
        intro="Photograph a meal, or pick one from your gallery, and get its calories, protein, carbs and fat back — with an honest account of how much a photo can actually know."
        widget={<FoodScanner />}
      >
        <div>
          <H2>What a photo can and cannot tell you</H2>
          <p>
            A meal photo carries two kinds of information reliably: what the food
            is, and roughly how much of it is on the plate. Those two are enough
            to estimate calories within a useful margin for most whole foods —
            grilled chicken, rice, fruit, eggs, vegetables — because identity and
            portion are both visible on the surface.
          </p>
          <p>
            What a photo cannot see is everything absorbed into the dish. The
            oil a curry was finished with, the butter in a sauce, the sugar in a
            marinade and the density of a stew&rsquo;s base are all invisible,
            and they are frequently the largest single term in the calorie
            count. This is not a limitation of any particular model. It is a
            limitation of photographs, and any tool that claims otherwise is
            overselling.
          </p>
        </div>

        <div>
          <H2>How to take a photo that scans well</H2>
          <ul>
            <li>
              <strong>Shoot from directly above.</strong> A shallow angle hides
              depth, which is exactly the dimension portion size depends on.
            </li>
            <li>
              <strong>Get something of known size in frame</strong> — a fork, a
              standard plate, your hand. Scale is the single biggest input to
              the estimate and the easiest to supply.
            </li>
            <li>
              <strong>Separate the components</strong> where you can. Food that
              overlaps reads as less food than it is.
            </li>
            <li>
              <strong>Use even light.</strong> A hard shadow across a plate
              removes part of the meal from the picture.
            </li>
            <li>
              <strong>One plate per photo.</strong> A crowded table splits the
              estimate across dishes you may not be eating.
            </li>
          </ul>
        </div>

        <div>
          <H2>Where the estimate is weakest</H2>
          <p>
            Accuracy is not uniform across foods, and it is worth knowing which
            side of the line your meal falls on. In rough order from most to
            least reliable: whole single foods, then plated meals with separated
            components, then sandwiches and wraps, then mixed rice and noodle
            dishes, then curries, stews and soups, and last anything deep-fried
            or eaten in a restaurant where portions and oil are both outside
            your control.
          </p>
          <p>
            When the model is unsure about an item it marks it, rather than
            returning a confident number it cannot support. That flag is the
            most useful thing on the results panel — a hedged estimate you can
            see is hedged is worth considerably more than a precise-looking one
            that is wrong.
          </p>
        </div>

        <div>
          <H2>A better way to use a number like this</H2>
          <p>
            Single-meal precision matters less than most people assume. If your
            estimate is 15% high on Monday and 15% low on Tuesday, the week is
            close to right, and the week is the unit that determines whether you
            gain or lose. What ruins a food log is not imprecision — it is the
            meals that never get logged at all, because logging was too much
            effort at the time.
          </p>
          <p>
            That is the case for photographing a plate rather than weighing it:
            a rough number you actually record beats an exact one you skip. And
            the number that finally settles whether a deficit was real is not
            any of this — it is what your weight and your measurements do over
            three or four weeks.
          </p>
        </div>

        <ToolFaq faqs={FAQS} />
      </ToolPage>
    </>
  );
}
