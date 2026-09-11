import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TroopOptimizer from "@/components/tools/TroopOptimizer";

export const metadata: Metadata = {
  title: "Hero Meta Calc",
  alternates: { canonical: "/hero-meta-calc" },
  description:
    "The Troop Ratio Optimizer for Tiles Survive! — input the enemy scout report and get the counter-proof march: exact Guards/Gunners/Marksmen counts, expected counter damage, hero pairings and faction alerts.",
};

/* ------------------------------------------------------------------ */
/*  /hero-meta-calc — the LIVE Troop Ratio Optimizer.                  */
/*  Engine: lib/tools/troopOptimizer.ts (pure, tested).                */
/* ------------------------------------------------------------------ */

export default function HeroMetaCalcPage() {
  return (
    <div className="relative overflow-hidden pb-28 pt-32 md:pt-40">
      {/* Scene backdrop */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/world/scene-village.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/85 to-cream" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ink shadow-[0_3px_0_0_#2d2a26] transition-transform hover:-translate-y-0.5"
        >
          ← Back to HQ
        </Link>

        <header className="mb-8 mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-full border-[3px] border-ink px-3.5 py-1 font-display text-[11px] font-extrabold tracking-[0.2em] text-white shadow-[0_3px_0_0_#2d2a26]"
              style={{ background: "#3d9bd1" }}
            >
              MODULE MC-02
            </span>
            <span className="flex items-center gap-2 rounded-full border-[3px] border-ink bg-leaf px-3.5 py-1 font-display text-[11px] font-extrabold tracking-[0.2em] text-white shadow-[0_3px_0_0_#2d2a26]">
              <span aria-hidden className="size-2 animate-pulse rounded-full bg-white" />
              LIVE
            </span>
          </div>
          <h1 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-7xl">
            Troop Ratio <span className="text-sunset">Optimizer</span>
          </h1>
          <p className="mt-3 max-w-2xl font-display text-base font-bold uppercase tracking-[0.1em] text-ember-deep">
            Counter math beats raw power — solve the triangle before you march.
          </p>
          <p className="mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-ink-soft">
            Feed in the enemy scout report. The engine mirrors their threat
            across the Guards ▸ Marksmen ▸ Gunners ▸ Guards counter cycle,
            protects your frontline, and outputs exact troop counts, hero
            pairings and faction alerts.
          </p>
        </header>

        <TroopOptimizer />
      </div>
    </div>
  );
}
