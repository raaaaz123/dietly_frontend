import PhoneMock from "./PhoneMock";
import StoreButtons from "./StoreButtons";

/**
 * The only screen most visitors will read.
 *
 * One job: get the app installed. So there is exactly one action here — the
 * store buttons — and no competing "learn more" next to it. The old hero
 * offered a secondary button, an email capture and a scroll cue, which is three
 * ways to not install.
 */
export default function Hero() {
  return (
    <section>
      <div className="wrap pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">Train · Eat · Rescan</p>

            <h1 className="h1 mt-6">
              Scan your body.
              <br />
              Get the plan that moves it.
            </h1>

            <p className="lead mt-6 max-w-xl">
              One photo a week gives you a Form Score out of 100 — and names the
              one weak point holding it back. Dietly then builds the week of
              training that fixes it, and tracks what you eat alongside it.
            </p>

            <div className="mt-9">
              <StoreButtons />
            </div>

            <p className="mt-5 text-sm font-semibold text-fg-faint">
              Free to start · iPhone &amp; Android
            </p>

          </div>

          <PhoneMock />
        </div>
      </div>
    </section>
  );
}
