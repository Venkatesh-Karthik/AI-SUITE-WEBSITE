export function Intro() {
  return (
    <section id="intro" className="relative py-28 px-6 border-t border-core-line overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-suite/60 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-suite text-xs tracking-[0.3em] uppercase mb-4">AI Suite</p>
        <h2 className="font-display text-2xl md:text-4xl font-bold leading-snug">
          A Windows AI ecosystem built around one account, one download,
          and three assistants that share it.
        </h2>
        <p className="text-core-muted mt-6 leading-relaxed">
          JARVIS, FRIDAY, and EDITH run inside a single desktop application. Sign in once,
          and every assistant in the suite recognizes you.
        </p>
      </div>
    </section>
  );
}
