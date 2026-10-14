type AtmosphereProps = {
  className?: string;
  variant?: "hero" | "section";
};

const particles = [
  { top: "18%", left: "12%", size: 3, duration: 7, delay: 0, opacity: 0.55 },
  { top: "30%", left: "82%", size: 2, duration: 9, delay: 1.2, opacity: 0.4 },
  { top: "62%", left: "22%", size: 2, duration: 8, delay: 0.6, opacity: 0.4 },
  { top: "74%", left: "68%", size: 3, duration: 10, delay: 2, opacity: 0.45 },
  { top: "46%", left: "48%", size: 2, duration: 11, delay: 1.6, opacity: 0.3 },
  { top: "10%", left: "55%", size: 2, duration: 8.5, delay: 0.8, opacity: 0.35 },
];

/**
 * Lightweight atmospheric backdrop: a faint grid, layered radial glows in
 * the brand palette, and (on the hero) a handful of slow-drifting
 * particles. Pure CSS/SVG — no WebGL — for performance. All motion is
 * neutralized globally under prefers-reduced-motion (see globals.css).
 *
 * Server-safe (no hooks): usable from server components (dashboard,
 * download section) as well as client components (login, hero).
 */
export function Atmosphere({ className = "", variant = "hero" }: AtmosphereProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden -z-10 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent_75%)]" />

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-suite/20 blur-[140px]" />
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full bg-jarvis/15 blur-[120px]" />
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-edith/15 blur-[120px]" />

      {variant === "hero" &&
        particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-suite/70 animate-float"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity,
            }}
          />
        ))}
    </div>
  );
}
