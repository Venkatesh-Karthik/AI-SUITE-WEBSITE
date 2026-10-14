"use client";

import { useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { LogoMark } from "@/components/Logo";

// Real AI Suite desktop application screenshots (public/screenshots/) — the
// source of truth for what's shown here. Nothing about the interface is
// fabricated; EDITH's own screenshot shows its real "Coming soon" state,
// which is displayed as-is rather than invented.
const assistants = [
  {
    id: "jarvis",
    label: "JARVIS",
    color: "#3E8EFF",
    src: "/screenshots/jarvis.png",
    alt: "Real AI Suite desktop application screenshot: JARVIS assistant interface",
  },
  {
    id: "friday",
    label: "FRIDAY",
    color: "#E8546B",
    src: "/screenshots/friday.png",
    alt: "Real AI Suite desktop application screenshot: FRIDAY assistant interface",
  },
  {
    id: "edith",
    label: "EDITH",
    color: "#9D7CFF",
    src: "/screenshots/edith.png",
    alt: "Real AI Suite desktop application screenshot: EDITH assistant interface",
  },
] as const;

/**
 * Hero visual: an interactive, pointer-tilted preview of the real AI Suite
 * desktop application, with an assistant switcher (JARVIS/FRIDAY/EDITH)
 * that crossfades between the real screenshots. CSS 3D transforms +
 * Framer Motion springs only — no WebGL. The tilt is skipped entirely
 * under prefers-reduced-motion, on touch input, and while off-screen.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.4 });

  // Pointer position (-0.5..0.5 across the card) mapped to a subtle tilt.
  const rotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function resetTilt() {
    rawX.set(0);
    rawY.set(0);
  }

  const current = assistants[active];

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* Ambient glow behind the window */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-suite/15 blur-[100px]" />
        <div className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-edith/15 blur-[90px]" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-full bg-jarvis/15 blur-[90px]" />
      </div>

      <div className="[perspective:1600px]">
        <motion.div
          className="relative rounded-2xl border border-core-line/80 bg-core-panel/70 backdrop-blur-xl overflow-hidden shadow-[0_50px_120px_-25px_rgba(0,0,0,0.8)] [transform-style:preserve-3d]"
          style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }}
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={reduceMotion ? undefined : { scale: 1.025, z: 30 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          {/* Title bar */}
          <div className="relative flex items-center justify-between px-4 py-2.5 border-b border-core-line/70 bg-core-panel2/80">
            <div className="flex items-center gap-2">
              <LogoMark size={18} />
              <span className="text-xs font-display font-semibold tracking-wide text-core-text/90">
                AI Suite &middot; {current.label}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-core-muted/70">
              <span className="w-3 h-[1.5px] bg-current" />
              <span className="w-2.5 h-2.5 border border-current rounded-[2px]" />
              <span className="text-sm leading-none">&times;</span>
            </div>
          </div>

          {/* Real screenshot, crossfaded between assistants */}
          <div className="relative w-full aspect-[1436/935] bg-core-bg">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: reduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduceMotion ? 0 : -14 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 560px"
                  className="object-contain"
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/25 pointer-events-none" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* Assistant selector */}
      <div className="relative mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Preview assistant">
        {assistants.map((a, i) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className="px-4 py-2 rounded-md text-xs font-display font-semibold tracking-widest uppercase border transition-all duration-300"
            style={{
              borderColor: i === active ? `${a.color}80` : "transparent",
              color: i === active ? a.color : undefined,
              backgroundColor: i === active ? `${a.color}14` : "transparent",
            }}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}
