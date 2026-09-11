import { tickerItems } from "@/data/site";

/* ------------------------------------------------------------------ */
/*  TickerTape — "Expedition Log": infinite marquee on a pine band.    */
/* ------------------------------------------------------------------ */

export default function TickerTape() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="group relative z-10 -rotate-[0.6deg] scale-[1.01] overflow-hidden border-y-[3px] border-ink bg-pine py-3.5 shadow-[0_4px_0_0_#2d2a26]">
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= tickerItems.length}
            className="flex items-center gap-8 whitespace-nowrap pr-8 font-mono text-[11px] font-bold tracking-[0.2em] text-cream/85"
          >
            <span className="text-flame" aria-hidden>
              ▸
            </span>
            {item}
          </span>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-pine to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-pine to-transparent"
      />
    </div>
  );
}
