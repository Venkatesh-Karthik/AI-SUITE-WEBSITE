import Image from "next/image";

const LOGO_SRC = "/logo/ai-suite-logo.png";
const ICON_SRC = "/logo/app_icon.ico";

type LogoMarkProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/**
 * The real AI Suite emblem (public/logo/ai-suite-logo.png), unmodified.
 * Server-safe (no hooks) so it can be used in both server and client
 * components — navbar, footer, login, dashboard, product mockup, etc.
 */
export function LogoMark({ size = 40, className = "", priority = false }: LogoMarkProps) {
  return (
    <span
      className={`relative inline-flex flex-shrink-0 rounded-full ring-1 ring-suite/30 shadow-[0_0_18px_-3px_rgba(78,201,192,0.55)] overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={LOGO_SRC}
        alt="AI Suite"
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority={priority}
      />
    </span>
  );
}

type LogoProps = LogoMarkProps & {
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

/** Full logo lockup: real emblem + "AI SUITE" wordmark. */
export function Logo({
  size = 40,
  showWordmark = true,
  className = "",
  wordmarkClassName = "",
  priority = false,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={size} priority={priority} />
      {showWordmark && (
        <span
          className={`font-display font-bold tracking-[0.2em] text-sm whitespace-nowrap ${wordmarkClassName}`}
        >
          AI SUITE
        </span>
      )}
    </span>
  );
}

type AppIconProps = {
  size?: number;
  className?: string;
  alt?: string;
};

/**
 * Real AI Suite app icon (public/logo/app_icon.ico). Rendered with a plain
 * <img> — next/image's optimizer (sharp) cannot process .ico input, so this
 * bypasses optimization for this one small asset intentionally.
 */
export function AppIcon({ size = 24, className = "", alt = "AI Suite" }: AppIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={ICON_SRC}
      alt={alt}
      width={size}
      height={size}
      className={`inline-block flex-shrink-0 ${className}`}
    />
  );
}
