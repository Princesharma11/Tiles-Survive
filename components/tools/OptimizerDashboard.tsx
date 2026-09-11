"use client";

import { motion } from "framer-motion";
import type { Comp, OptimizerResult, TroopType } from "@/lib/tools/troopOptimizer";
import { TROOPS } from "@/lib/tools/troopOptimizer";
import { popIn, springSoft, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  OptimizerDashboard — Phase 3: exact counts, visual comparison,     */
/*  and the expected advantage metric.                                 */
/* ------------------------------------------------------------------ */

export interface OptimizerDashboardProps {
  result: OptimizerResult;
  enemy: Comp;
  capacity: number;
}

export default function OptimizerDashboard({
  result,
  enemy,
  capacity,
}: OptimizerDashboardProps) {
  const { percent, counts, mode } = result;

  return (
    <motion.div
      variants={staggerContainer(0.09)}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-5"
    >
      {/* Threat read */}
      <motion.div
        variants={popIn}
        className={cn(
          "flex flex-wrap items-center gap-3 rounded-3xl border-[3px] border-ink p-4 text-white shadow-[0_4px_0_0_#2d2a26]",
          mode === "counter"
            ? "bg-gradient-to-r from-ember to-ember-deep"
            : "bg-gradient-to-r from-teal to-river"
        )}
      >
        <span className="rounded-full border-2 border-white/60 bg-white/15 px-3 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-[0.22em]">
          {mode === "counter" ? "⚔ Counter doctrine" : "🛡 Baseline doctrine"}
        </span>
        <p className="min-w-0 flex-1 font-display text-sm font-extrabold leading-snug sm:text-base">
          {result.threatRead}
        </p>
      </motion.div>

      {/* Exact deployment counts */}
      <motion.div
        variants={popIn}
        className="rounded-3xl border-[3px] border-ink bg-white p-5 shadow-[0_4px_0_0_#2d2a26]"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-ink">
            📋 Deploy exactly
          </p>
          <p className="font-mono text-[11px] font-bold text-ink-soft">
            {capacity > 0
              ? `${capacity.toLocaleString("en-US")} troops`
              : "enter march capacity for exact counts"}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {(Object.keys(TROOPS) as TroopType[]).map((t) => {
            const meta = TROOPS[t];
            return (
              <div
                key={t}
                className="rounded-2xl border-[3px] border-ink p-3 text-center"
                style={{ background: `${meta.color}1f` }}
              >
                <span aria-hidden className="text-2xl">
                  {meta.icon}
                </span>
                <p className="font-display text-3xl font-extrabold tabular-nums leading-tight text-ink">
                  {percent[t]}%
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">
                  {meta.label}
                </p>
                <p className="mt-1.5 border-t-2 border-dashed border-ink/15 pt-1.5 font-display text-base font-extrabold tabular-nums text-ink">
                  {counts
                    ? counts[t].toLocaleString("en-US")
                    : "—"}
                </p>
                <p className="font-mono text-[9px] font-bold text-ink-faint">
                  TROOPS
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Visual comparison: enemy vs your optimized march */}
      <motion.div
        variants={popIn}
        className="rounded-3xl border-[3px] border-ink bg-white p-5 shadow-[0_4px_0_0_#2d2a26]"
      >
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-ink">
          ⚖ Their march vs yours
        </p>

        <div className="mt-4 flex flex-col gap-3.5">
          {(Object.keys(TROOPS) as TroopType[]).map((t) => {
            const meta = TROOPS[t];
            return (
              <div key={t}>
                <div className="mb-1 flex items-center justify-between font-mono text-[10px] font-bold text-ink-soft">
                  <span>{meta.icon} {meta.label}</span>
                  <span>
                    enemy {Math.round(enemy[t])}% → you {percent[t]}%
                  </span>
                </div>
                {/* enemy bar */}
                <div className="h-3 w-full overflow-hidden rounded-full border-2 border-ink/30 bg-paper">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "#a39585" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${enemy[t]}%` }}
                    transition={springSoft}
                  />
                </div>
                {/* your bar */}
                <div
                  className="mt-1 h-5 w-full overflow-hidden rounded-full border-2 border-ink bg-paper"
                  title="Your optimized march"
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: meta.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent[t]}%` }}
                    transition={{ ...springSoft, delay: 0.08 }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-4 border-t-2 border-dashed border-ink/15 pt-3 font-mono text-[10px] font-bold text-ink-soft">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-5 rounded-full bg-[#a39585]" /> enemy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-5 rounded-full border border-ink bg-gradient-to-r from-river via-ember to-berry" />
            your optimized march
          </span>
        </div>
      </motion.div>

      {/* Expected advantage */}
      <motion.div
        variants={popIn}
        className="relative overflow-hidden rounded-3xl border-[3px] border-ink bg-pine p-5 text-cream shadow-[0_5px_0_0_#2d2a26]"
      >
        <div aria-hidden className="bg-tilegrid absolute inset-0 opacity-10" />
        <div className="relative flex flex-wrap items-center gap-5">
          <div className="rounded-2xl border-[3px] border-ink bg-gradient-to-b from-gold to-flame px-4 py-2 text-center text-ink shadow-[0_3px_0_0_#2d2a26]">
            <p className="font-display text-3xl font-extrabold tabular-nums leading-none">
              +{result.expectedBonusPct.toFixed(1)}%
            </p>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]">
              expected damage
            </p>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-extrabold leading-snug">
              {Math.round(result.counterCoverage)}% of your troops hit a
              counter matchup
              <span className="text-flame"> (+20% damage each)</span>.
            </p>
            <p className="mt-1 font-mono text-[11px] font-bold text-cream/60">
              baseline would cover only {Math.round(result.baselineCoverage)}%
              ({result.counterCoverage >= result.baselineCoverage ? "+" : ""}
              {Math.round((result.counterCoverage - result.baselineCoverage) * 10) / 10}{" "}
              pts) · counter bonus scales with live matchup RNG
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
