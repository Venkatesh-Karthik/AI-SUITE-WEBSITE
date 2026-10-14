function VoiceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 18v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 20c1-3.5 4-5.5 7-5.5s6 2 7 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// NOTE: these are placeholder categories only. Before shipping, replace
// with capabilities verified against the actual AI Suite application —
// do not present unverified claims as product features.
const features = [
  { title: "Voice interaction", desc: "Talk to your assistant instead of typing.", icon: VoiceIcon },
  { title: "Desktop integration", desc: "Runs alongside your other Windows apps.", icon: DesktopIcon },
  { title: "Multiple assistants", desc: "Switch between JARVIS, FRIDAY, and EDITH.", icon: LayersIcon },
  { title: "One account", desc: "Sign in once across every assistant.", icon: AccountIcon },
];

export function Features() {
  return (
    <section id="features" className="relative py-28 px-6 border-t border-core-line">
      <div className="mx-auto max-w-6xl">
        <p className="text-suite text-xs tracking-[0.3em] uppercase mb-3">Capabilities</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold max-w-2xl">
          Built for the desktop, not the browser tab.
        </h2>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-core-line/70 bg-core-panel/50 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-suite/40"
              >
                <div
                  className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-suite/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
                <div className="relative w-10 h-10 rounded-lg border border-suite/30 bg-suite/10 flex items-center justify-center text-suite mb-4">
                  <Icon />
                </div>
                <h3 className="relative font-display font-semibold text-sm mb-2">{f.title}</h3>
                <p className="relative text-sm text-core-muted leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
