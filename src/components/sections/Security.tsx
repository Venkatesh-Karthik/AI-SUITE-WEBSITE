function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
      <path
        d="M12 3.2 19 6v6c0 4.6-3 7.7-7 9.2-4-1.5-7-4.6-7-9.2V6l7-2.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M9 12.2l2.1 2.1L15.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <rect x="4" y="4" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="7" r="0.9" fill="currentColor" />
      <circle cx="8" cy="17" r="0.9" fill="currentColor" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <path d="M4 15a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 15l3.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" />
    </svg>
  );
}

const points = [
  {
    title: "Hashed credentials",
    desc: "Verification codes are hashed before storage — never kept as plain text.",
    icon: LockIcon,
  },
  {
    title: "Server-side sessions",
    desc: "Authentication is verified on the server for every protected request.",
    icon: ServerIcon,
  },
  {
    title: "Rate-limited by design",
    desc: "Sign-in requests and code attempts are throttled to resist abuse.",
    icon: GaugeIcon,
  },
];

export function Security() {
  return (
    <section id="security" className="relative py-28 px-6 border-t border-core-line overflow-hidden">
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-suite/10 blur-[110px] -z-10"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-suite/25 animate-spin-slow" aria-hidden="true" />
            <span className="absolute inset-2 rounded-full border border-suite/20 animate-spin-slower" aria-hidden="true" />
            <span className="relative w-14 h-14 rounded-full bg-suite/10 border border-suite/40 flex items-center justify-center text-suite shadow-[0_0_30px_-4px_rgba(78,201,192,0.55)]">
              <ShieldIcon />
            </span>
          </div>
          <p className="text-suite text-xs tracking-[0.3em] uppercase mb-3">Privacy &amp; security</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold max-w-2xl">
            Your account is treated like a real account.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {points.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group relative rounded-2xl border border-core-line/70 bg-core-panel/50 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-suite/40"
              >
                <div className="w-10 h-10 rounded-lg border border-suite/30 bg-suite/10 flex items-center justify-center text-suite mb-4">
                  <Icon />
                </div>
                <h3 className="font-display font-semibold text-sm mb-2">{p.title}</h3>
                <p className="text-sm text-core-muted leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-core-muted mt-8 text-center">
          Read the full <a href="/privacy" className="text-suite hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
}
