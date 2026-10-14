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
        d="M9 8l-4.5 4L9 16M15 8l4.5 4-4.5 4"
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
        d="M12 3.2 19 6v6c0 4.6-3 7.7-7 9.2-4-1.5-7-4.6-7-9.2V6l7-2.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M9 12.2l2.1 2.1L15.5 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const assistants = [
  {
    id: "jarvis",
    name: "JARVIS",
    role: "Personal AI assistant",
    hex: "#3E8EFF",
    color: "text-jarvis",
    border: "border-jarvis/40",
    icon: JarvisIcon,
    description:
      "Handles everyday interaction through voice and vision, with memory, automation, file access, and system control on your desktop.",
  },
  {
    id: "friday",
    name: "FRIDAY",
    role: "AI development assistant",
    hex: "#E8546B",
    color: "text-friday",
    border: "border-friday/40",
    icon: FridayIcon,
    description:
      "A development environment for coding, projects, Git, and debugging — built around real developer workflows and toolchains.",
  },
  {
    id: "edith",
    name: "EDITH",
    role: "AI security guardian",
    hex: "#9D7CFF",
    color: "text-edith",
    border: "border-edith/40",
    icon: EdithIcon,
    description:
      "A security and system-intelligence guardian focused on threat monitoring, suspicious activity, and system-level intelligence.",
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

      </div>
    </section>
  );
}
