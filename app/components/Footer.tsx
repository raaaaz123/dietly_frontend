import Image from "next/image";
import StoreButtons from "./StoreButtons";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "AI coach", href: "/#ai-coach" },
    { label: "Download", href: "/#download" },
  ],
  "Free tools": [
    { label: "Macro Calculator", href: "/macro-calculator" },
    { label: "Body Fat Calculator", href: "/body-fat-calculator" },
    { label: "Creator program", href: "/influencer" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Support", href: "/support" },
    { label: "Delete account", href: "/delete-account" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="wrap">
        <div className="py-14 md:py-20 grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/images/logo.png"
                alt=""
                width={34}
                height={34}
                className="rounded-[10px]"
              />
              <span className="text-[19px] font-extrabold tracking-[-0.03em] text-fg">
                Dietly
              </span>
            </div>
            <p className="text-[14.5px] leading-relaxed text-fg-muted max-w-[320px] mb-7">
              AI nutrition tracking that fits real life. Snap a meal, ask your
              coach, stay consistent.
            </p>
            <StoreButtons variant="light" fullWidthMobile={false} />
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-6">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[11px] font-bold tracking-[0.14em] text-fg-faint uppercase mb-4">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-fg-muted hover:text-accent-deep transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border py-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <p className="text-[12.5px] text-fg-faint">
            © 2026 Dietly by Rexatech. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:rexatechin@gmail.com"
              className="text-[12.5px] text-fg-faint hover:text-fg transition-colors"
            >
              Contact
            </a>
            <a
              href="/support"
              className="text-[12.5px] text-fg-faint hover:text-fg transition-colors"
            >
              Support
            </a>
            <a
              href="/privacy"
              className="text-[12.5px] text-fg-faint hover:text-fg transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
