// NOTE: these are placeholder categories only. Before shipping, replace
// with capabilities verified against the actual AI Suite application —
// do not present unverified claims as product features.
const features = [
  { title: "Voice interaction", desc: "Talk to your assistant instead of typing." },
  { title: "Desktop integration", desc: "Runs alongside your other Windows apps." },
  { title: "Multiple assistants", desc: "Switch between JARVIS, FRIDAY, and EDITH." },
  { title: "One account", desc: "Sign in once across every assistant." },
];

export function Features() {
  return (
    <section id="features" className="relative py-28 px-6 border-t border-core-line">
      <div className="mx-auto max-w-6xl">
        <p className="text-suite text-xs tracking-[0.3em] uppercase mb-3">Capabilities</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold max-w-2xl">
          Built for the desktop, not the browser tab.
        </h2>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-core-line rounded-xl overflow-hidden">
          {features.map((f) => (
            <div key={f.title} className="bg-core-bg p-6">
              <h3 className="font-display font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-sm text-core-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
