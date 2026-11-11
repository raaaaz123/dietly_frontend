import { InstallSteps } from "./GetApp";

/**
 * The install ask for content pages (calculators, guides, exercises, workouts).
 *
 * Now a thin wrapper over InstallSteps, which detects the visitor's phone and
 * shows one button to their store (or a QR code on a computer). `placement`
 * lands on the `store_click` event, so we can tell which spot sends installs.
 */
export default function InstallCard({
  title,
  body,
  placement,
  payoff = "Get your training plan",
  className = "",
}: {
  title: string;
  body: string;
  placement: string;
  payoff?: string;
  className?: string;
}) {
  return <InstallSteps title={title} body={body} payoff={payoff} placement={placement} className={className} />;
}
