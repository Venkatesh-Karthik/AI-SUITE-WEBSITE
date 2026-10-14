const assistants = [
  {
    id: "jarvis",
    name: "JARVIS",
    role: "Primary assistant",
    color: "text-jarvis",
    border: "border-jarvis/40",
    glow: "shadow-[0_0_40px_-12px_rgba(62,142,255,0.5)]",
    description:
      "The default assistant for AI Suite: conversation, task handling, and day-to-day desktop assistance in one place.",
  },
  {
    id: "friday",
    name: "FRIDAY",
    role: "Secondary assistant",
    color: "text-friday",
    border: "border-friday/40",
    glow: "shadow-[0_0_40px_-12px_rgba(232,84,107,0.5)]",
    description:
      "A distinct assistant persona within the same account — its own voice and focus, running on the same suite.",
  },
  {
    id: "edith",
    name: "EDITH",
    role: "Third assistant",
    color: "text-edith",
    border: "border-edith/40",
    glow: "shadow-[0_0_40px_-12px_rgba(157,124,255,0.5)]",
    description:
      "The third assistant in the ecosystem, sharing your account, settings, and download across the suite.",
  },
];

export function Assistants() {
  return (
    <section id="assistants" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-suite text-xs tracking-[0.3em] uppercase mb-3">One suite, multiple intelligences</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold max-w-2xl">
          Three assistants. One account, one download.
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {assistants.map((a) => (
            <div
              key={a.id}
              id={a.id}
              className={`glass-panel rounded-xl p-8 border ${a.border} ${a.glow} scroll-mt-24`}
            >
              <span className={`font-display text-4xl font-bold ${a.color}`}>{a.name}</span>
              <p className="text-xs uppercase tracking-widest text-core-muted mt-2 mb-4">{a.role}</p>
              <p className="text-sm text-core-muted leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-core-muted mt-8 max-w-2xl">
          Replace this copy with real per-assistant capabilities once connected to the AI Suite
          application repository — don&apos;t ship invented feature claims.
        </p>
      </div>
    </section>
  );
}
