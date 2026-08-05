export const APP_STORE_URL =
  "https://apps.apple.com/us/app/dietly-ai-snap-calories/id6769698416";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.dietlyai.app";

function AppleGlyph({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size + 2} viewBox="0 0 16 18" fill="currentColor" aria-hidden>
      <path d="M1.22.557a.77.77 0 0 0-.22.56v15.766a.77.77 0 0 0 .22.56l.03.03L9.3 9.42v-.08L1.25.527l-.03.03z" />
      <path d="m12.02 12.15-2.72-2.73v-.08l2.72-2.73.06.03 3.22 1.83c.92.52.92 1.38 0 1.9l-3.22 1.83-.06.03-.06-.08z" />
      <path d="M12.08 12.18 9.3 9.42 1.25 17.47c.3.32.8.36 1.36.04l9.47-5.33z" />
      <path d="m12.08 6.61-9.47-5.33c-.56-.32-1.06-.28-1.36.04L9.3 9.34l2.78-2.73z" />
    </svg>
  );
}

type Props = {
  /** "dark" = ink badges, "light" = white badges with border */
  variant?: "dark" | "light";
  /** Stretch to full width on mobile (default true) */
  fullWidthMobile?: boolean;
  className?: string;
};

export default function StoreButtons({
  variant = "dark",
  fullWidthMobile = true,
  className = "",
}: Props) {
  const tone = variant === "light" ? "store-btn store-btn-light" : "store-btn";
  const width = fullWidthMobile ? "w-full sm:w-auto justify-center" : "";

  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 ${
        fullWidthMobile ? "w-full sm:w-auto" : ""
      } ${className}`}
    >
      <a
        href={APP_STORE_URL}
        className={`${tone} ${width}`}
        aria-label="Download Dietly on the App Store"
      >
        <AppleGlyph />
        <span className="text-left">
          <span className="block text-[9px] font-semibold tracking-[0.12em] opacity-65">
            DOWNLOAD ON
          </span>
          <span className="block text-[14px] font-bold -mt-0.5">App Store</span>
        </span>
      </a>
      <a
        href={PLAY_STORE_URL}
        className={`${tone} ${width}`}
        aria-label="Get Dietly on Google Play"
      >
        <PlayGlyph />
        <span className="text-left">
          <span className="block text-[9px] font-semibold tracking-[0.12em] opacity-65">
            GET IT ON
          </span>
          <span className="block text-[14px] font-bold -mt-0.5">Google Play</span>
        </span>
      </a>
    </div>
  );
}

export { AppleGlyph, PlayGlyph };
