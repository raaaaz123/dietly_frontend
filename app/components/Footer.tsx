import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, TAGLINE } from "../lib/site";

/**
 * Shared by every page. Kept to what a footer is legally and practically for:
 * the legal routes, support, and the two calculator pages that pull organic
 * search. The creator programme and the marketing links are gone — the page
 * has already made its ask by the time anyone reaches here.
 */

const columns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Inside the app", href: "/#inside" },
      { label: "Get the app", href: "/#get" },
    ],
  },
  {
    title: "Free tools",
    links: [
      { label: "Macro calculator", href: "/macro-calculator" },
      { label: "Body fat calculator", href: "/body-fat-calculator" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Support", href: "/support" },
      { label: "Delete account", href: "/delete-account" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="wrap py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/dietly-icon.png"
                alt=""
                width={36}
                height={36}
                className="rounded-[10px]"
              />
              <span className="text-[17px] font-extrabold tracking-tight text-fg">
                {SITE_NAME}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-fg-muted">
              {TAGLINE}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-bold tracking-[0.14em] text-fg-faint uppercase">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] font-medium text-fg-muted transition-colors hover:text-accent-deep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mt-12" />

        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-fg-faint">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <a
            href="mailto:rexatechin@gmail.com"
            className="text-[13px] font-medium text-fg-muted transition-colors hover:text-accent-deep"
          >
            rexatechin@gmail.com
          </a>
        </div>

        {/* Not a disclaimer for its own sake: the app scores a body and
            prescribes training, and this is the same line the app carries. */}
        <p className="mt-6 max-w-3xl text-[12px] leading-relaxed text-fg-faint">
          Dietly provides general fitness and nutrition information and is not
          intended as medical advice, diagnosis, or treatment. The Form Score is
          an estimate from your photo and your answers, not a clinical
          measurement. Consult a qualified healthcare professional before
          changing your diet or starting a new exercise program.
        </p>
      </div>
    </footer>
  );
}
