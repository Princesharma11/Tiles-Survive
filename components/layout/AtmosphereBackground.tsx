/* ------------------------------------------------------------------ */
/*  AtmosphereBackground — fixed, GPU-cheap ambient layers that sit    */
/*  behind every page: tactical grid, drifting glows, film grain.      */
/*  Pure CSS animation — zero JS, zero layout impact.                  */
/* ------------------------------------------------------------------ */

export default function AtmosphereBackground() {
  return (
    <div aria-hidden className="noise pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base grid */}
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(90%_70%_at_50%_0%,black,transparent_75%)]" />

      {/* Command gold bloom — top left */}
      <div className="absolute -left-40 -top-40 size-[560px] animate-breathe rounded-full bg-gold-500/[0.07] blur-[130px]" />

      {/* Ember bloom — bottom right */}
      <div
        className="absolute -bottom-52 -right-40 size-[620px] animate-breathe rounded-full bg-ember-500/[0.06] blur-[140px]"
        style={{ animationDelay: "2.4s" }}
      />

      {/* Horizon line glow */}
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
    </div>
  );
}
