function JarvisIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1.75" fill="currentColor" />
    </svg>
  );
}

function FridayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
      <path
        d="M2.5 12h3.2l1.8-6.5 3.6 13 2.4-10 1.6 3.5h6.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EdithIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
      <path
        d="M2 12c2.4-4.5 5.8-7 10-7s7.6 2.5 10 7c-2.4 4.5-5.8 7-10 7s-7.6-2.5-10-7Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

const assistants = [
  {
    id: "jarvis",
    name: "JARVIS",
    role: "Primary assistant",
    hex: "#3E8EFF",
    color: "text-jarvis",
    border: "border-jarvis/40",
    icon: JarvisIcon,
    description:
      "The default assistant for AI Suite: conversation, task handling, and day-to-day desktop assistance in one place.",
  },
  {
    id: "friday",
    name: "FRIDAY",
    role: "Secondary assistant",
    hex: "#E8546B",
    color: "text-friday",
    border: "border-friday/40",
    icon: FridayIcon,
    description:
      "A distinct assistant persona within the same account — its own voice and focus, running on the same suite.",
  },
  {
    id: "edith",
    name: "EDITH",
    role: "Third assistant",
    hex: "#9D7CFF",
    color: "text-edith",
    border: "border-edith/40",
    icon: EdithIcon,
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
          {assistants.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.id}
                id={a.id}
                className={`group relative overflow-hidden rounded-2xl border ${a.border} bg-core-panel/60 backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl scroll-mt-24`}
              >
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-25 transition-opacity duration-300 group-hover:opacity-45"
                  style={{ background: a.hex }}
                  aria-hidden="true"
                />
                <div
                  className={`relative w-12 h-12 rounded-xl border ${a.border} flex items-center justify-center mb-6 ${a.color} bg-core-bg/40`}
                >
                  <Icon />
                </div>
                <span className={`relative block font-display text-4xl font-bold ${a.color}`}>{a.name}</span>
                <p className="relative text-xs uppercase tracking-widest text-core-muted mt-2 mb-4">{a.role}</p>
                <p className="relative text-sm text-core-muted leading-relaxed">{a.description}</p>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-core-muted mt-8 max-w-2xl">
          Replace this copy with real per-assistant capabilities once connected to the AI Suite
          application repository — don&apos;t ship invented feature claims.
        </p>
      </div>
    </section>
  );
}
