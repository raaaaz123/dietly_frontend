"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image src="/logo.svg" alt="Dietly Logo" width={24} height={24} className="group-hover:opacity-80 transition-opacity" />
          <span className="text-[16px] font-bold tracking-[2px] text-fg font-body uppercase mt-0.5">
            Dietly
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Features", href: "#features" },
            { label: "How it Works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "Creators", href: "#creators" },
            { label: "FAQ", href: "#faq" },
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
          menuOpen ? "max-h-[500px] border-b border-border" : "max-h-0"
        } bg-bg/95 backdrop-blur-xl`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {[
            { label: "Features", href: "#features" },
            { label: "How it Works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "Creators", href: "#creators" },
            { label: "FAQ", href: "#faq" },
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
