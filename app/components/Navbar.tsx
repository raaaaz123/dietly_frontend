"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "../lib/site";

/**
 * Shared by every page, so it stays small.
 *
 * The old one carried a features menu, a tools dropdown with icons and
 * descriptions, a creator-program link and a download button — a navigation
 * problem on a site with one job. Three links and the install button: anything
 * else here is a way to leave without installing.
 */

const links = [
  { label: "How it works", href: "/#how" },
  { label: "Inside the app", href: "/#inside" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-xl">
      <nav
        aria-label="Main"
        className="wrap flex items-center justify-between gap-4 py-3.5"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/dietly-icon.png"
            alt=""
            width={36}
            height={36}
            className="rounded-[10px]"
            priority
          />
          <span className="text-[17px] font-extrabold tracking-tight text-fg">
            {SITE_NAME}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] font-semibold text-fg-muted transition-colors hover:text-accent-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/#get" className="btn btn-primary btn-sm">
            Get the app
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg md:hidden"
          >
            <span aria-hidden className="text-lg leading-none">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="wrap flex flex-col gap-1 border-t border-border pb-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-[15px] font-semibold text-fg-muted"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
