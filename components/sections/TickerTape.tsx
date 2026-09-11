import { tickerItems } from "@/data/site";

/* ------------------------------------------------------------------ */
/*  TickerTape — infinite command-feed marquee (pure CSS animation).   */
/* ------------------------------------------------------------------ */

export default function TickerTape() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="group relative overflow-hidden border-y border-white/5 bg-abyss/70 py-3.5">
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap pr-8 font-mono text-[11px] tracking-[0.24em] text-steel-400"
            aria-hidden={i >= tickerItems.length}
          >
            <span className="text-gold-500" aria-hidden>
              ◆
            </span>
            {item}
          </span>
        ))}
      </div>

      {/* Edge fades */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
