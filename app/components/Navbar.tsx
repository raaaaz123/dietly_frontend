"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowIcon, ChartIcon, ScanIcon, SparkIcon } from "./Icons";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Coach", href: "/#ai-coach" },
  { label: "FAQ", href: "/#faq" },
];

const tools = [
  {
    label: "Macro Calculator",
    desc: "TDEE and macros in seconds",
    href: "/macro-calculator",
    Icon: ChartIcon,
  },
  {
    label: "Body Fat Calculator",
    desc: "Navy method body composition",
    href: "/body-fat-calculator",
    Icon: ScanIcon,
  },
  {
    label: "AI Coach",
    desc: "Personalized nutrition coaching",
    href: "/#ai-coach",
    Icon: SparkIcon,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-bg/85 backdrop-blur-xl border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="wrap flex items-center justify-between h-[62px] md:h-[76px]">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={34}
              height={34}
              className="rounded-[10px]"
              priority
            />
            <span className="text-[19px] font-extrabold tracking-[-0.03em] text-fg">
              Dietly
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-full text-[14px] font-semibold text-fg-muted hover:text-fg hover:bg-surface transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            {/* Free tools dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[14px] font-semibold text-fg-muted hover:text-fg hover:bg-surface transition-colors duration-200"
                aria-expanded={toolsOpen}
              >
                Free tools
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`transition-transform duration-200 ${
                    toolsOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                >
                  <path
                    d="M2 4.2l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[288px] transition-all duration-200 ${
                  toolsOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-elevated border border-border rounded-2xl p-1.5 shadow-[0_24px_56px_-20px_rgba(14,26,18,0.18)]">
                  {tools.map(({ label, desc, href, Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setToolsOpen(false)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors group/item"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                        <Icon size={16} />
                      </span>
                      <span className="block">
                        <span className="block text-[13.5px] font-bold text-fg group-hover/item:text-accent-deep transition-colors">
                          {label}
                        </span>
                        <span className="block text-[12px] text-fg-faint mt-0.5">
                          {desc}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/influencer"
              className="px-3.5 py-2 rounded-full text-[14px] font-semibold text-fg-muted hover:text-accent-deep hover:bg-green-50 transition-colors duration-200"
            >
              Creators
            </Link>
            <a href="#download" className="btn btn-primary btn-sm">
              Get the app
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden -mr-2 flex h-11 w-11 items-center justify-center rounded-full active:bg-surface transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="relative block h-3.5 w-[22px]">
              <span
                className={`absolute left-0 h-[2px] w-full rounded-full bg-fg transition-all duration-300 ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-full rounded-full bg-fg transition-all duration-300 ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`lg:hidden overflow-hidden bg-bg/97 backdrop-blur-xl transition-[max-height,opacity] duration-500 ${
          menuOpen
            ? "max-h-[calc(100dvh-62px)] opacity-100 border-b border-border overflow-y-auto"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="wrap py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3.5 border-b border-border text-[17px] font-bold text-fg"
            >
              {link.label}
              <ArrowIcon size={17} className="text-fg-faint" />
            </a>
          ))}
          <Link
            href="/influencer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between py-3.5 border-b border-border text-[17px] font-bold text-accent-deep"
          >
            Creator program
            <ArrowIcon size={17} />
          </Link>

          <p className="mt-6 mb-3 text-[11px] font-bold tracking-[0.14em] uppercase text-fg-faint">
            Free tools
          </p>
          <div className="flex flex-col gap-2">
            {tools.map(({ label, desc, href, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl border border-border bg-elevated p-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
                  <Icon size={17} />
                </span>
                <span className="block">
                  <span className="block text-[14px] font-bold text-fg">{label}</span>
                  <span className="block text-[12px] text-fg-faint">{desc}</span>
                </span>
              </Link>
            ))}
          </div>

          <a
            href="#download"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary mt-7 mb-2 w-full"
          >
            Download free
          </a>
        </div>
      </div>
    </header>
  );
}
