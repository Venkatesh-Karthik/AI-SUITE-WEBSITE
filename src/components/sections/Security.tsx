const points = [
  { title: "Hashed credentials", desc: "Verification codes are hashed before storage — never kept as plain text." },
  { title: "Server-side sessions", desc: "Authentication is verified on the server for every protected request." },
  { title: "Rate-limited by design", desc: "Sign-in requests and code attempts are throttled to resist abuse." },
];

export function Security() {
  return (
    <section id="security" className="relative py-28 px-6 border-t border-core-line">
      <div className="mx-auto max-w-6xl">
        <p className="text-suite text-xs tracking-[0.3em] uppercase mb-3">Privacy &amp; security</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold max-w-2xl">
          Your account is treated like a real account.
        </h2>

        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {points.map((p) => (
            <div key={p.title} className="glass-panel rounded-xl p-6">
              <h3 className="font-display font-semibold text-sm mb-2">{p.title}</h3>
              <p className="text-sm text-core-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-core-muted mt-8">
          Read the full <a href="/privacy" className="text-suite hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
}
