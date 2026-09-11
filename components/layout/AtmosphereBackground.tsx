/* ------------------------------------------------------------------ */
/*  AtmosphereBackground — light sky world behind every page:          */
/*  warm gradient, drifting cloud puffs, faint tile grid. Pure CSS.    */
/* ------------------------------------------------------------------ */

export default function AtmosphereBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-cream via-paper to-sand">
      {/* Sun glow */}
      <div className="absolute -top-32 right-[8%] size-[420px] rounded-full bg-gradient-to-b from-flame/30 to-gold/10 blur-3xl" />

      {/* Drifting clouds */}
      <div className="cloud animate-drift absolute left-[6%] top-[18%] h-24 w-72 opacity-80" />
      <div
        className="cloud animate-drift absolute right-[14%] top-[38%] h-20 w-60 opacity-60"
        style={{ animationDuration: "34s", animationDelay: "-8s" }}
      />
      <div
        className="cloud animate-drift absolute left-[30%] top-[62%] h-24 w-80 opacity-50"
        style={{ animationDuration: "42s", animationDelay: "-20s" }}
      />

      {/* Faint tile grid, fading downward */}
      <div className="bg-tilegrid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
    </div>
  );
}
