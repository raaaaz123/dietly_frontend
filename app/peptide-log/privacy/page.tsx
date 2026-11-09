import type { Metadata } from "next";
import LegalShell, { Card, PEPTIDE_LOG } from "../LegalShell";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | PepTree" },
  description: "PepTree stores your data only on your iPhone. No account, no analytics, no tracking.",
  alternates: { canonical: `${PEPTIDE_LOG.base}/privacy` },
};

const sections: [string, string][] = [
  ["The short version", "PepTree keeps your data on your iPhone. There is no account, no server, no ads and no tracking. We never see what you log."],
  ["What the app stores", "The protocols, doses, vial details, injection sites, notes and side effects you enter. They are saved in a database inside the app on your iPhone, plus up to 14 daily backup files in the app's folder in the Files app."],
  ["What we collect", "Nothing. The app does not send your data to us or to anyone else. It has no analytics, no advertising and no third-party SDKs."],
  ["Reminders", "Reminders are local notifications scheduled on your iPhone. They are not sent through any server."],
  ["Face ID", "If you turn on the app lock, iOS checks your face or passcode. The app never receives your biometric data."],
  ["Backups and exports", "Backups and exports are files you create and control. If you share one or copy it to iCloud Drive, it is handled by the service you choose."],
  ["Deleting your data", "In the app, go to Settings, then Delete all my data. This erases every record and backup file. Deleting the app also removes everything except files you exported yourself."],
  ["Medical disclaimer", "PepTree is for personal record keeping. It does not give medical advice and does not recommend or calculate doses. Follow your clinician's guidance."],
  ["Children", "The app is not directed at children under 17."],
  ["Changes", "If this policy changes, the new version will appear in the app and on this page with a new date."],
];

export default function PeptideLogPrivacy() {
  return (
    <LegalShell title="Privacy policy" subtitle={`Last updated ${PEPTIDE_LOG.updated}`}>
      {sections.map(([t, b]) => (
        <Card key={t} title={t}>
          <p>{b}</p>
        </Card>
      ))}
      <Card title="Contact">
        <p>
          {PEPTIDE_LOG.company}, <a className="text-[#7c5cfa] font-medium" href={`mailto:${PEPTIDE_LOG.email}`}>{PEPTIDE_LOG.email}</a>
        </p>
      </Card>
    </LegalShell>
  );
}
