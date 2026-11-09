import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { Card, PEPTIDE_LOG } from "./LegalShell";

export const metadata: Metadata = {
  title: { absolute: "Peptide Log: Dose Tracker & Shot Reminder" },
  description: "Peptide Log is a calm, private tracker for your peptide, GLP-1 and injection schedule. No account, no ads, data stays on your iPhone.",
  alternates: { canonical: PEPTIDE_LOG.base },
};

export default function PeptideLogHome() {
  return (
    <LegalShell title="Your doses, made simple." subtitle="A calm, private tracker for peptide, GLP-1 and injection schedules.">
      <Card>
        <ul className="space-y-2">
          <li>See what to take today and how many units you draw.</li>
          <li>Log a dose with one tap, or straight from the reminder.</li>
          <li>Any schedule: every day, specific days, every few days, cycles.</li>
          <li>Vial stock, injection site rotation and a full history.</li>
          <li>No account, no ads, no tracking. Your data stays on your iPhone.</li>
        </ul>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { href: "/peptide-log/support", t: "Support", d: "Questions and contact" },
          { href: "/peptide-log/privacy", t: "Privacy policy", d: "What we store (on your phone only)" },
          { href: "/peptide-log/terms", t: "Terms of use", d: "The rules for using the app" },
        ].map((x) => (
          <Link key={x.href} href={x.href} className="rounded-3xl bg-white/90 p-5 hover:bg-white transition">
            <div className="font-semibold">{x.t}</div>
            <div className="text-sm text-[#6f6d7a] mt-1">{x.d}</div>
          </Link>
        ))}
      </div>
    </LegalShell>
  );
}
