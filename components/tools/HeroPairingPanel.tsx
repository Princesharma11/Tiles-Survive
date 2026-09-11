"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Faction, OptimizerResult } from "@/lib/tools/troopOptimizer";
import {
  counterFaction,
  FACTIONS,
  FACTION_BONUS_PCT,
  HERO_PAIRINGS,
  TROOPS,
} from "@/lib/tools/troopOptimizer";
import { popIn, staggerContainer } from "@/lib/animations/variants";
import { ArrowRightIcon } from "@/components/ui/icons";

/* ------------------------------------------------------------------ */
/*  HeroPairingPanel — Phase 4: heroes matched to the computed march,  */
/*  plus the faction counter alert.                                    */
/* ------------------------------------------------------------------ */

export interface HeroPairingPanelProps {
  result: OptimizerResult;
  faction: Faction | "unknown";
}

export default function HeroPairingPanel({
  result,
  faction,
}: HeroPairingPanelProps) {
  const pairing = HERO_PAIRINGS[result.dominant];
  const dominantMeta = TROOPS[result.dominant];
  const advice = faction !== "unknown" ? counterFaction(faction) : null;
  const adviceMeta = advice ? FACTIONS[advice] : null;
  const enemyMeta = faction !== "unknown" ? FACTIONS[faction] : null;

  return (
    <motion.div
      variants={staggerContainer(0.09)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-5 lg:grid-cols-[1.5fr_1fr]"
    >
      {/* Hero suggestions */}
      <motion.div
        variants={popIn}
        className="rounded-3xl border-[3px] border-ink bg-white p-5 shadow-[0_4px_0_0_#2d2a26]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-ink">
            🦸 Lead with
          </p>
          <span
            className="rounded-full border-2 border-ink px-2.5 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink"
            style={{ background: `${dominantMeta.color}33` }}
          >
            {dominantMeta.icon} {dominantMeta.label}-heavy march
          </span>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[pairing.lead, pairing.support].map((hero, i) => (
            <div
              key={hero.name}
              className="flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-paper/60 p-3"
            >
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border-[3px] border-ink bg-white">
                <Image
                  src={hero.portrait}
                  alt={`${hero.name} — Tiles Survive hero art`}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
                {i === 0 && (
                  <span className="absolute left-1 top-1 rounded-md border-2 border-ink bg-gold px-1 font-display text-[9px] font-extrabold text-ink">
                    LEAD
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-display text-lg font-extrabold leading-tight text-ink">
                  {hero.name}
                </p>
                <p
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: dominantMeta.color }}
                >
                  {hero.role}
                </p>
                <p className="mt-1 text-xs font-semibold leading-snug text-ink-soft">
                  {hero.why}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 rounded-xl border-2 border-dashed border-ink/20 bg-paper/50 px-3 py-2 text-xs font-bold text-ink-soft">
          💡 {pairing.note}
        </p>

        <Link
          href="/tier-list"
          className="mt-3 inline-flex items-center gap-1.5 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-ember-deep hover:text-ink"
        >
          Cross-check the full tier list
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </motion.div>

      {/* Faction counter alert */}
      <motion.div
        variants={popIn}
        className={
          advice
            ? "relative overflow-hidden rounded-3xl border-[3px] border-ink bg-gradient-to-b from-gold to-flame p-5 text-ink shadow-[0_5px_0_0_#2d2a26]"
            : "relative overflow-hidden rounded-3xl border-[3px] border-dashed border-ink/30 bg-white/60 p-5 shadow-none"
        }
      >
        {advice && adviceMeta && enemyMeta ? (
          <>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.24em]">
              🚩 Faction counter alert
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="flex flex-col items-center rounded-2xl border-[3px] border-ink bg-white/85 px-3 py-2">
                <span aria-hidden className="text-2xl">
                  {enemyMeta.icon}
                </span>
                <span className="font-display text-xs font-extrabold">
                  {enemyMeta.label}
                </span>
                <span className="font-mono text-[9px] font-bold text-ink-soft">
                  ENEMY
                </span>
              </span>
              <span aria-hidden className="font-display text-2xl font-extrabold">
                ▸
              </span>
              <motion.span
                initial={{ scale: 0.85, rotate: -3 }}
                animate={{ scale: [0.85, 1.06, 1], rotate: [-3, 2, 0] }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col items-center rounded-2xl border-[3px] border-ink bg-white px-3 py-2 shadow-[0_3px_0_0_#2d2a26]"
              >
                <span aria-hidden className="text-2xl">
                  {adviceMeta.icon}
                </span>
                <span className="font-display text-xs font-extrabold">
                  {adviceMeta.label}
                </span>
                <span className="font-mono text-[9px] font-bold text-ember-deep">
                  YOU
                </span>
              </motion.span>
            </div>
            <p className="mt-4 text-center font-display text-lg font-extrabold leading-snug">
              Field {adviceMeta.label} heroes to claim the +
              {FACTION_BONUS_PCT}% faction damage bonus!
            </p>
            <p className="mt-2 text-center text-xs font-bold text-ink/70">
              Faction-aligned heroes leading matching troops stack stats on top
              of the troop counters.
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.24em] text-ink-faint">
              🚩 Faction counter alert
            </p>
            <div className="mt-6 text-center">
              <span aria-hidden className="text-4xl">
                {FACTIONS.unknown.icon}
              </span>
              <p className="mt-3 font-display text-base font-extrabold text-ink-soft">
                Faction intel offline
              </p>
              <p className="mx-auto mt-1.5 max-w-[240px] text-xs font-bold text-ink-faint">
                Set the enemy&apos;s faction in the scout panel to unlock the
                +{FACTION_BONUS_PCT}% faction damage recommendation.
              </p>
            </div>
            <div className="mt-5 border-t-2 border-dashed border-ink/15 pt-3 text-center font-mono text-[10px] font-bold leading-relaxed text-ink-faint">
              CYCLE: STALWART ▸ AERONAUT ▸ MARINER ▸ ROVER ▸ STALWART
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
