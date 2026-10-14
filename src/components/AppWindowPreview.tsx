import { LogoMark } from "@/components/Logo";

const assistants = [
  { id: "jarvis", initial: "J", color: "#3E8EFF", active: true },
  { id: "friday", initial: "F", color: "#E8546B", active: false },
  { id: "edith", initial: "E", color: "#9D7CFF", active: false },
];

type AppWindowPreviewProps = {
  className?: string;
  compact?: boolean;
};

/**
 * A restrained, realistic preview of the AI Suite Windows desktop app:
 * title bar, assistant switcher sidebar, and a conversation area with a
 * voice-listening indicator. Used as a compact illustrative mockup in the
 * download section; the hero itself uses the real application screenshots
 * from public/screenshots/ (see Hero.tsx) rather than this mockup.
 *
 * Server-safe (no hooks) so it can be used from server components
 * (download section) as well as wrapped in motion from client components.
 */
export function AppWindowPreview({ className = "", compact = false }: AppWindowPreviewProps) {
  return (
    <div
      className={`rounded-2xl border border-core-line/80 bg-core-panel/70 backdrop-blur-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.75)] overflow-hidden ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-core-line/70 bg-core-panel2/80">
        <div className="flex items-center gap-2">
          <LogoMark size={compact ? 16 : 18} />
          <span className="text-xs font-display font-semibold tracking-wide text-core-text/90">
            AI Suite
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-core-muted/70">
          <span className="w-3 h-[1.5px] bg-current" />
          <span className="w-2.5 h-2.5 border border-current rounded-[2px]" />
          <span className="text-sm leading-none">&times;</span>
        </div>
      </div>

      <div className={`flex ${compact ? "h-[200px] sm:h-[220px]" : "h-[320px] sm:h-[360px]"}`}>
        {/* Assistant switcher sidebar */}
        <div className="w-14 sm:w-20 border-r border-core-line/70 bg-core-bg/40 flex flex-col items-center gap-3 py-4">
          {assistants.map((a) => (
            <div
              key={a.id}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-display font-bold text-xs border transition-colors"
              style={{
                borderColor: `${a.color}55`,
                color: a.color,
                backgroundColor: a.active ? `${a.color}1A` : "transparent",
                boxShadow: a.active ? `0 0 20px -2px ${a.color}80` : undefined,
              }}
            >
              {a.initial}
            </div>
          ))}
        </div>

        {/* Conversation area */}
        <div className="flex-1 flex flex-col p-4 sm:p-5 gap-3 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-jarvis animate-pulse-soft" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-core-muted">
              JARVIS &middot; Active
            </span>
          </div>

          <div className="self-end max-w-[75%] rounded-lg rounded-tr-sm bg-suite/15 border border-suite/25 px-3 py-2 text-[11px] sm:text-xs text-core-text/90">
            Summarize today&apos;s schedule.
          </div>
          {!compact && (
            <div className="self-start max-w-[80%] rounded-lg rounded-tl-sm bg-core-panel2/80 border border-core-line/70 px-3 py-2 text-[11px] sm:text-xs text-core-muted leading-relaxed">
              Three meetings today, first one in 40 minutes. Want me to prep notes?
            </div>
          )}

          <div className="mt-auto flex items-center gap-2 rounded-md border border-core-line/70 bg-core-bg/50 px-3 py-2.5">
            <span className="flex items-end gap-0.5">
              {[3, 6, 4, 8, 5].map((h, i) => (
                <span
                  key={i}
                  className="w-[2px] rounded-full bg-suite/70"
                  style={{ height: h }}
                />
              ))}
            </span>
            <span className="text-[10px] sm:text-[11px] text-core-muted">Listening&hellip;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
