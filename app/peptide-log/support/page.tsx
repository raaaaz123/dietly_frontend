import type { Metadata } from "next";
import LegalShell, { Card, PEPTIDE_LOG } from "../LegalShell";

export const metadata: Metadata = {
  title: { absolute: "Support | Peptide Log" },
  description: "Get help with Peptide Log: reminders, backups, moving to a new iPhone and deleting your data.",
  alternates: { canonical: `${PEPTIDE_LOG.base}/support` },
};

const faqs: [string, string][] = [
  ["I'm not getting reminders.", "Open iPhone Settings, then Notifications, then Peptide Log, and make sure Allow Notifications is on. In the app, open the protocol and check that Remind me is on and the protocol is not paused. Focus modes can also hide reminders."],
  ["How do I log a dose?", "On Today, tap the circle next to the dose. Tap the dose itself to change the time, pick an injection site, or add a note. You can also tap Log dose on the reminder."],
  ["I forgot to log yesterday.", "Open History, tap the day, then tap the dose to log it. Or use the missed doses banner on Today, which saves them at their planned time."],
  ["Where does the units number come from?", "You enter it yourself when you add a protocol: it is the number you draw on your syringe. The app never calculates doses."],
  ["How do I move my data to a new iPhone?", "On the old phone: Settings, then Export full backup, and save the file (for example to iCloud Drive). On the new phone: Settings, then Restore from backup, and pick that file."],
  ["Is there an account? How do I sign out?", "There is no account and nothing to sign out of. Your data lives only on your iPhone."],
  ["How do I delete my data?", "In the app, go to Settings, then Delete all my data. It erases every protocol, log and backup on your iPhone. Deleting the app also removes it."],
  ["Does it cost anything?", "Peptide Log is currently free, with no ads."],
];

export default function PeptideLogSupport() {
  return (
    <LegalShell title="How can we help?" subtitle="Common questions, and a real person if you need one.">
      <Card title="Contact us">
        <p>Email us and we usually reply within 24 hours. Include your iPhone model and iOS version if something isn&apos;t working.</p>
        <a
          href={`mailto:${PEPTIDE_LOG.email}?subject=Peptide%20Log%20support`}
          className="inline-block mt-2 rounded-full bg-[#16161b] text-white px-6 py-3 font-semibold"
        >
          Email support
        </a>
      </Card>
      {faqs.map(([q, a]) => (
        <Card key={q} title={q}>
          <p>{a}</p>
        </Card>
      ))}
    </LegalShell>
  );
}
