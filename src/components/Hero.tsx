"use client";

import { motion, useReducedMotion } from "framer-motion";

// Radius expressed as a % of the stage's own width/height (stage is
// aspect-square, so % works identically on both axes). This keeps the
// orbit rings proportional to the container at any viewport width,
// instead of the old fixed-px radii which overflowed on narrow screens.
const nodes = [
  { id: "jarvis", label: "J", color: "#3E8EFF", radiusPct: 25, duration: 18 },
  { id: "friday", label: "F", color: "#E8546B", radiusPct: 33.9, duration: 26 },
  { id: "edith", label: "E", color: "#9D7CFF", radiusPct: 42.9, duration: 34 },
];

/**
 * Signature visual: a central "suite core" with three orbiting nodes,
 * one per assistant — the literal shape of "one suite, multiple
 * intelligences." Pure SVG/CSS + Framer Motion, so it works everywhere
 * (no WebGL requirement) and is a clean seam to later swap for a
 * Three.js/R3F scene without touching layout or auth code.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative w-full aspect-square max-w-[560px] mx-auto"
      role="img"
      aria-label="Orbital diagram: JARVIS, FRIDAY, and EDITH orbiting the central AI Suite core"
    >
      <div className="absolute inset-0 bg-grid rounded-full [mask-image:radial-gradient(circle,black,transparent_70%)]" />

      {/* Static orbit rings */}
      {nodes.map((n) => (
        <div
          key={`ring-${n.id}`}
          className="absolute rounded-full border border-core-line/70"
          style={{
            width: `${n.radiusPct * 2}%`,
            height: `${n.radiusPct * 2}%`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Central core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-suite/10 border border-suite/50 flex items-center justify-center animate-pulse-soft">
          <div className="w-10 h-10 rounded-full bg-suite shadow-[0_0_40px_10px_rgba(78,201,192,0.35)]" />
        </div>
      </div>

      {/* Orbiting assistant nodes */}
      {nodes.map((n) => (
        <motion.div
          key={n.id}
          className="absolute top-1/2 left-1/2"
          style={{
            width: `${n.radiusPct * 2}%`,
            height: `${n.radiusPct * 2}%`,
            marginLeft: `-${n.radiusPct}%`,
            marginTop: `-${n.radiusPct}%`,
          }}
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={reduceMotion ? undefined : { repeat: Infinity, ease: "linear", duration: n.duration }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-display font-bold text-sm glass-panel"
            style={{ boxShadow: `0 0 24px 2px ${n.color}55`, borderColor: `${n.color}88` }}
          >
            <span style={{ color: n.color }}>{n.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
