import Link from "next/link";

export const PEPTIDE_LOG = {
  name: "Peptide Log",
  company: "Rexatech",
  email: "rexatechin@gmail.com",
  base: "https://dietly.life/peptide-log",
  updated: "November 9, 2026",
};

const links = [
  { href: "/peptide-log/support", label: "Support" },
  { href: "/peptide-log/privacy", label: "Privacy" },
  { href: "/peptide-log/terms", label: "Terms" },
];

/** Calm cream-and-lavender page shell for the Peptide Log app's public pages. */
export default function LegalShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen w-full text-[#16161b]"
      style={{
        background:
          "radial-gradient(900px 520px at 0% 0%, #f8efd6 0%, transparent 60%), radial-gradient(900px 520px at 100% 0%, #e4dbfb 0%, transparent 60%), #f2f1f5",
      }}
    >
      <header className="max-w-[760px] mx-auto px-6 pt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <Link href="/peptide-log" className="flex items-center gap-2 font-semibold">
          <span className="inline-block w-7 h-7 rounded-lg bg-gradient-to-b from-[#c9b8fa] to-[#7c5cfa]" aria-hidden />
          {PEPTIDE_LOG.name}
        </Link>
        <nav className="flex gap-4 text-sm text-[#6f6d7a]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#16161b]">
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="max-w-[760px] mx-auto px-6 pt-14 pb-24">
        <h1 className="text-4xl md:text-5xl leading-tight" style={{ fontFamily: "ui-serif, 'New York', Georgia, serif", fontWeight: 500 }}>
          {title}
        </h1>
        {subtitle && <p className="mt-3 text-[#6f6d7a]">{subtitle}</p>}
        <div className="mt-10 space-y-5">{children}</div>
      </main>

      <footer className="max-w-[760px] mx-auto px-6 pb-12 text-sm text-[#a9a7b4]">
        © 2026 {PEPTIDE_LOG.company}. For personal record keeping. Not medical advice.
      </footer>
    </div>
  );
}

export function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-white/90 p-6 md:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      <div className="text-[#55545e] leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
