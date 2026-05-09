import Image from "next/image";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Download", href: "#download" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        {/* Main footer */}
        <div className="py-16 md:py-24 grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8">
          {/* Brand col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <Image src="/logo.png" alt="Dietly Logo" width={24} height={24} />
              <span className="text-[16px] font-bold tracking-[2px] text-fg font-body uppercase mt-0.5">
                Dietly
              </span>
            </div>
            <p className="text-[14px] leading-relaxed text-muted max-w-[280px] mb-8">
              AI-native health tracking. Your body&rsquo;s operating system,
              designed to learn and adapt with you.
            </p>
            <div className="flex gap-4">
              {/* App Store badges */}
              <a
                href="#"
                className="px-4 py-2.5 border border-border-strong rounded-lg flex items-center gap-2 hover:bg-surface transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-fg"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[8px] text-muted tracking-wider font-semibold">
                    GET ON
                  </span>
                  <span className="block text-[12px] text-fg font-bold -mt-0.5">
                    App Store
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="px-4 py-2.5 border border-border-strong rounded-lg flex items-center gap-2 hover:bg-surface transition-colors"
              >
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="currentColor"
                  className="text-fg"
                >
                  <path d="M1.22.557a.77.77 0 0 0-.22.56v15.766a.77.77 0 0 0 .22.56l.03.03L9.3 9.42v-.08L1.25.527l-.03.03z" />
                  <path d="m12.02 12.15-2.72-2.73v-.08l2.72-2.73.06.03 3.22 1.83c.92.52.92 1.38 0 1.9l-3.22 1.83-.06.03-.06-.08z" />
                  <path d="M12.08 12.18 9.3 9.42 1.25 17.47c.3.32.8.36 1.36.04l9.47-5.33z" />
                  <path d="m12.08 6.61-9.47-5.33c-.56-.32-1.06-.28-1.36.04L9.3 9.34l2.78-2.73z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[8px] text-muted tracking-wider font-semibold">
                    GET ON
                  </span>
                  <span className="block text-[12px] text-fg font-bold -mt-0.5">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] font-bold tracking-[2.4px] text-muted uppercase mb-6">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-faint hover:text-fg transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-faint">
            © 2026 Dietly. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Twitter", "Instagram", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[12px] text-faint hover:text-fg transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
