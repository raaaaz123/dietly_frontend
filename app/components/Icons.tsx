type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function ScanIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8" />
      <path d="M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8" />
      <path d="M21 16v2.5A2.5 2.5 0 0 1 18.5 21H16" />
      <path d="M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16" />
      <circle cx="12" cy="12" r="3.4" />
    </svg>
  );
}

export function SparkIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3.2l1.7 4.6 4.6 1.7-4.6 1.7L12 15.8l-1.7-4.6L5.7 9.5l4.6-1.7z" />
      <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </svg>
  );
}

export function MicIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="9" y="2.8" width="6" height="10.4" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
      <path d="M12 18v3.2" />
    </svg>
  );
}

export function DumbbellIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 9.5v5" />
      <rect x="4.8" y="7.5" width="3.4" height="9" rx="1.2" />
      <rect x="15.8" y="7.5" width="3.4" height="9" rx="1.2" />
      <path d="M21 9.5v5" />
      <path d="M8.2 12h7.6" />
    </svg>
  );
}

export function DropIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3.2s5.6 5.4 5.6 9.4a5.6 5.6 0 1 1-11.2 0C6.4 8.6 12 3.2 12 3.2z" />
      <path d="M9.4 13.6a2.7 2.7 0 0 0 2.7 2.7" />
    </svg>
  );
}

export function FlameIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12.5 2.8c2.8 3 4.3 5.2 4.3 8a4.8 4.8 0 0 1-9.6 0c0-1.5.6-2.6 1.5-3.6.2 1.5 1 2.2 1.9 2.2 1.2 0 1.7-1.5 1.1-3.4-.3-1-.6-2-.2-3.2z" />
      <path d="M6.5 16.8a6.6 6.6 0 0 0 11 0" />
    </svg>
  );
}

export function ShieldIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3l7 2.6v5.6c0 4.3-2.9 7.6-7 9.2-4.1-1.6-7-4.9-7-9.2V5.6z" />
      <path d="M9.2 12.2l2 2 3.6-3.8" />
    </svg>
  );
}

export function GlobeIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.4 9.4h17.2M3.4 14.6h17.2" />
      <path d="M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3z" />
    </svg>
  );
}

export function BrainIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M10 4.2a3 3 0 0 0-3 3 2.6 2.6 0 0 0-1.4 4.6A2.8 2.8 0 0 0 7 16.6a2.8 2.8 0 0 0 3 3.2V4.2z" />
      <path d="M14 4.2a3 3 0 0 1 3 3 2.6 2.6 0 0 1 1.4 4.6A2.8 2.8 0 0 1 17 16.6a2.8 2.8 0 0 1-3 3.2V4.2z" />
      <path d="M12 4.2v15.6" />
    </svg>
  );
}

export function BoltIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M13.2 2.8 5.8 13.4h5l-1.2 7.8 7.6-10.8h-5.2z" />
    </svg>
  );
}

export function ChartIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 19.2h16" />
      <path d="M7 19V11" />
      <path d="M12 19V6.5" />
      <path d="M17 19v-5.6" />
    </svg>
  );
}

export function CheckIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={2} className={className}>
      <path d="M4.5 12.5l4.6 4.6L19.5 6.7" />
    </svg>
  );
}

export function ArrowIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 12h13" />
      <path d="M12.5 6l5.8 6-5.8 6" />
    </svg>
  );
}

export function StarIcon({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2.6l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.8l1.2-6.6L2.5 9.6l6.6-.9z" />
    </svg>
  );
}
