import Image from "next/image";

/**
 * A real capture, in a phone.
 *
 * This replaces `PhoneMock`, which drew an approximation of the score screen
 * in CSS because — as its own header admitted — every screenshot available at
 * the time was either half skeleton, a paywall, or a picture of the calorie
 * app Dietly used to be. The captures under `/images/app` are the shipping
 * build on a 17 Pro Max, taken from a seeded account, so the drawing is no
 * longer the honest option: it is now the *less* accurate one.
 *
 * The frame is drawn rather than a bezel PNG. A device image dates the page
 * the moment Apple changes a corner radius, and it is 300KB to say "phone".
 */
export default function PhoneShot({
  src,
  alt,
  priority = false,
  className = "",
  width = 660,
  height = 1434,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /// The capture's own pixel size. Next uses it for the intrinsic ratio, so a
  /// number that does not match the file letterboxes the frame.
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={`relative rounded-[2.6rem] border border-border-strong bg-elevated p-2.5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="overflow-hidden rounded-[2.05rem] bg-bg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 78vw, 300px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
