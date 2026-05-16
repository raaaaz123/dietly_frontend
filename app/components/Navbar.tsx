"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const tools = [
  {
    label: "Macro Calculator",
    desc: "TDEE & macros in seconds",
    href: "/macro-calculator",
    icon: "⊕",
  },
  {
    label: "Body Fat Calculator",
    desc: "Navy method body composition",
    href: "/body-fat-calculator",
    icon: "◎",
  },
  {
    label: "AI Coach",
    desc: "Personalized nutrition coaching",
    href: "/#features",
    icon: "✦",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo.png"
            alt="Dietly Logo"
            width={40}
            height={40}
            className="rounded-xl group-hover:opacity-80 transition-opacity drop-shadow-sm"
          />
          <span className="text-[24px] font-bold tracking-[0px] text-fg font-display mt-0.5 italic">
            Dietly
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Features", href: "/#features" },
            { label: "How it Works", href: "/#how-it-works" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold tracking-wide text-muted hover:text-fg transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* Free Tools dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button className="flex items-center gap-1 text-[13px] font-semibold tracking-wide text-muted hover:text-fg transition-colors duration-300">
              Free Tools
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-200 mt-px ${toolsOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64 transition-all duration-200 origin-top ${
                toolsOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
              }`}
            >
              {/* Arrow */}
              <div className="flex justify-center mb-1">
                <div className="w-2.5 h-2.5 bg-surface border-l border-t border-border rotate-45" />
              </div>
              <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl shadow-black/20">
                {tools.map((tool, i) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setToolsOpen(false)}
                    className={`flex items-start gap-3 px-4 py-3.5 hover:bg-bg transition-colors group/item ${
                      i !== tools.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="text-accent text-lg leading-none mt-0.5">{tool.icon}</span>
                    <div>
                      <p className="text-[13px] font-semibold text-fg group-hover/item:text-accent transition-colors">
                        {tool.label}
                      </p>
                      <p className="text-[11px] text-muted mt-0.5">{tool.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {[
            { label: "Creators", href: "/#creators" },
            { label: "FAQ", href: "/#faq" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                link.label === "Creators"
                  ? "text-accent hover:opacity-80"
                  : "text-muted hover:text-fg"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/influencer"
            className="px-5 py-2 border border-accent/40 text-accent text-[11px] font-bold tracking-[1.4px] rounded-full hover:bg-accent/10 transition-all duration-300"
          >
            CREATOR PORTAL
          </Link>
          <a
            href="#download"
            className="px-6 py-2.5 bg-accent text-accent-ink text-[12px] font-bold tracking-[1.6px] rounded-full hover:bg-accent/90 transition-all duration-300 hover:shadow-[0_0_24px_rgba(74,222,128,0.25)]"
          >
            DOWNLOAD FREE
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-[1.5px] bg-fg transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-fg transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-fg transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-[600px] border-b border-border" : "max-h-0"
        } bg-bg/95 backdrop-blur-xl`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {[
            { label: "Features", href: "/#features" },
            { label: "How it Works", href: "/#how-it-works" },
            { label: "Creators", href: "/#creators" },
            { label: "FAQ", href: "/#faq" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[15px] font-semibold transition-colors ${
                link.label === "Creators" ? "text-accent" : "text-muted hover:text-fg"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile tools list */}
          <div>
            <p className="text-[10px] font-bold tracking-[2px] text-muted uppercase mb-3">
              Free Tools
            </p>
            <div className="flex flex-col gap-2">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-border"
                >
                  <span className="text-accent">{tool.icon}</span>
                  <span className="text-[14px] font-semibold text-fg">{tool.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/influencer"
            onClick={() => setMenuOpen(false)}
            className="mt-1 inline-flex items-center justify-center px-6 py-3 border border-accent/40 text-accent text-[12px] font-bold tracking-[1.4px] rounded-full hover:bg-accent/10 transition-colors"
          >
            CREATOR PORTAL →
          </Link>
          <a
            href="#download"
            onClick={() => setMenuOpen(false)}
            className="mt-1 inline-flex justify-center px-6 py-3 bg-accent text-accent-ink text-[12px] font-bold tracking-[1.6px] rounded-full"
          >
            DOWNLOAD FREE
          </a>
        </div>
      </div>
    </nav>
  );
}
