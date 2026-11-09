import type { Metadata } from "next";
import LegalShell, { Card, PEPTIDE_LOG } from "../LegalShell";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use | Peptide Log" },
  description: "Terms of use for the Peptide Log app.",
  alternates: { canonical: `${PEPTIDE_LOG.base}/terms` },
};

const sections: [string, string][] = [
  ["1. Agreement", `These terms govern your use of the Peptide Log app (the "App"), provided by ${PEPTIDE_LOG.company} ("we", "us"). By using the App you agree to these terms and to Apple's Standard Licensed Application End User License Agreement. If you do not agree, do not use the App.`],
  ["2. What the App is", "The App is a personal record-keeping tool. You enter your own protocols, amounts, syringe units, schedules and notes, and the App reminds you and keeps a log."],
  ["3. Not medical advice", "The App does not provide medical advice, diagnosis or treatment. It does not recommend, calculate or verify doses, compounds or schedules. Every number in the App is one you entered. Always follow the guidance of a qualified healthcare professional, and check every dose before you take it."],
  ["4. Your responsibility", "You are responsible for the accuracy of what you enter and for any decisions you make. Reminders depend on your device's notification settings and may not arrive, for example if notifications are turned off, the device is off, or iOS limits them. Do not rely on the App as your only reminder for anything critical."],
  ["5. Your data", "Your data is stored on your device. We do not receive or hold a copy, so we cannot recover it for you. Use the App's backup and export features to keep your own copies. See the Privacy Policy for details."],
  ["6. Acceptable use", "Do not use the App for any unlawful purpose, and do not reverse engineer, resell or redistribute it except as allowed by law."],
  ["7. Price", "The App is currently free to use. If paid features are offered in the future, their price and terms will be shown clearly before you buy, and purchases will be handled by Apple."],
  ["8. No warranty", "The App is provided \"as is\" and \"as available\", without warranties of any kind, to the extent permitted by law."],
  ["9. Limitation of liability", "To the extent permitted by law, we are not liable for any indirect, incidental or consequential damages, or for any health outcome, arising from your use of the App or from missed, late or incorrect reminders or records."],
  ["10. Changes", "We may update these terms. The new version will be posted on this page with a new date. Continuing to use the App means you accept the updated terms."],
];

export default function PeptideLogTerms() {
  return (
    <LegalShell title="Terms of use" subtitle={`Last updated ${PEPTIDE_LOG.updated}`}>
      {sections.map(([t, b]) => (
        <Card key={t} title={t}>
          <p>{b}</p>
        </Card>
      ))}
      <Card title="Contact">
        <p>
          Questions about these terms: <a className="text-[#7c5cfa] font-medium" href={`mailto:${PEPTIDE_LOG.email}`}>{PEPTIDE_LOG.email}</a>
        </p>
      </Card>
    </LegalShell>
  );
}
