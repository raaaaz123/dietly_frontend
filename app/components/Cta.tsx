import StoreButtons from "./StoreButtons";

/**
 * The second and last ask. Same buttons as the hero, nothing new to decide.
 */
export default function Cta() {
  return (
    <section id="get" className="section pt-0">
      <div className="wrap">
        <div className="rounded-[24px] border border-border bg-elevated px-6 py-10 text-center md:px-14 md:py-14">
          <div>
            <h2 className="h2 mx-auto max-w-2xl">
              Your first scan takes about ten seconds.
            </h2>
            <p className="lead mx-auto mt-4 max-w-xl">
              Get your score, see what&apos;s holding it back, and start the week
              built to fix it.
            </p>

            <div className="mt-7 flex justify-center">
              <StoreButtons fullWidthMobile={false} />
            </div>

            <p className="mt-4 text-[13px] font-semibold text-fg-faint">
              Free to start · Cancel any time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
