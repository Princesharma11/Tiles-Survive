"use client";

import { motion } from "framer-motion";
import type { Comp, Faction, TroopType } from "@/lib/tools/troopOptimizer";
import { TROOPS, FACTIONS } from "@/lib/tools/troopOptimizer";
import { popIn, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  EnemyIntelPanel — Phase 1: the scout report translation layer.     */
/*  March capacity + interconnected enemy sliders + faction toggle.    */
/* ------------------------------------------------------------------ */

export interface EnemyIntelPanelProps {
  capacity: number;
  onCapacity: (n: number) => void;
  enemy: Comp;
  onEnemyChange: (type: TroopType, value: number) => void;
  onPreset: (comp: Comp) => void;
  faction: Faction | "unknown";
  onFaction: (f: Faction | "unknown") => void;
}

const PRESETS: { label: string; icon: string; comp: Comp }[] = [
  { label: "Unknown", icon: "❓", comp: { guards: 33, gunners: 34, marksmen: 33 } },
  { label: "Gunner wall", icon: "🔫", comp: { guards: 20, gunners: 60, marksmen: 20 } },
  { label: "Guard turtle", icon: "🛡️", comp: { guards: 60, gunners: 20, marksmen: 20 } },
  { label: "Marksman rain", icon: "🎯", comp: { guards: 20, gunners: 20, marksmen: 60 } },
];

const CAPACITY_CHIPS = [100_000, 150_000, 200_000, 300_000];

export function formatCapacity(n: number): string {
  return n.toLocaleString("en-US");
}

export default function EnemyIntelPanel({
  capacity,
  onCapacity,
  enemy,
  onEnemyChange,
  onPreset,
  faction,
  onFaction,
}: EnemyIntelPanelProps) {
  const handleCapacity = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "").slice(0, 12);
    onCapacity(digits ? parseInt(digits, 10) : 0);
  };

  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-5"
    >
      {/* ---------- March capacity ---------- */}
      <motion.div
        variants={popIn}
        className="rounded-3xl border-[3px] border-ink bg-white p-5 shadow-[0_4px_0_0_#2d2a26]"
      >
        <label htmlFor="march-capacity" className="block">
          <span className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-[0.16em] text-ink">
            🎒 Your march capacity
          </span>
          <span className="mt-0.5 block text-xs font-bold text-ink-soft">
            Max troops in a single march
          </span>
        </label>
        <div className="mt-2.5 flex items-center gap-2">
          <input
            id="march-capacity"
            value={capacity ? formatCapacity(capacity) : ""}
            onChange={(e) => handleCapacity(e.target.value)}
            inputMode="numeric"
            placeholder="150,000"
            className="min-w-0 flex-1 rounded-2xl border-[3px] border-ink bg-paper/60 px-4 py-3 font-display text-2xl font-extrabold tabular-nums text-ink placeholder:text-ink-faint/60 focus:border-ember focus:outline-none"
          />
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {CAPACITY_CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onCapacity(c)}
              className={cn(
                "rounded-full border-2 px-2.5 py-0.5 font-mono text-[11px] font-bold transition-colors",
                capacity === c
                  ? "border-ink bg-ember text-white"
                  : "border-ink/20 bg-paper/70 text-ink-soft hover:border-ink"
              )}
            >
              {c / 1000}K
            </button>
          ))}
        </div>
      </motion.div>

      {/* ---------- Enemy composition sliders ---------- */}
      <motion.div
        variants={popIn}
        className="rounded-3xl border-[3px] border-ink bg-white p-5 shadow-[0_4px_0_0_#2d2a26]"
      >
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-ink">
          🔎 Enemy march composition
        </p>
        <p className="mt-0.5 text-xs font-bold text-ink-soft">
          Drag a slider — the others auto-balance to 100%
        </p>

        <div className="mt-4 flex flex-col gap-4">
          {(Object.keys(TROOPS) as TroopType[]).map((t) => {
            const meta = TROOPS[t];
            return (
              <div key={t}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-2 font-display text-sm font-extrabold text-ink">
                    <span
                      aria-hidden
                      className="grid size-7 place-items-center rounded-lg border-2 border-ink text-xs"
                      style={{ background: `${meta.color}33` }}
                    >
                      {meta.icon}
                    </span>
                    Enemy {meta.label}
                  </span>
                  <span
                    className="rounded-lg border-2 border-ink px-2 py-0.5 font-display text-sm font-extrabold tabular-nums text-ink"
                    style={{ background: `${meta.color}33` }}
                  >
                    {Math.round(enemy[t])}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={Math.round(enemy[t])}
                  onChange={(e) => onEnemyChange(t, Number(e.target.value))}
                  aria-label={`Enemy ${meta.label} percentage`}
                  className="h-2.5 w-full cursor-pointer appearance-none rounded-full border-2 border-ink/60 bg-paper accent-ember"
                  style={{
                    background: `linear-gradient(to right, ${meta.color} ${Math.round(
                      enemy[t]
                    )}%, #f6e3bd ${Math.round(enemy[t])}%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Presets */}
        <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink-faint">
          Quick scout presets
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {PRESETS.map((p) => {
            const active =
              Math.round(enemy.guards) === Math.round(p.comp.guards) &&
              Math.round(enemy.gunners) === Math.round(p.comp.gunners) &&
              Math.round(enemy.marksmen) === Math.round(p.comp.marksmen);
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => onPreset(p.comp)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border-2 px-2.5 py-1 font-display text-[11px] font-extrabold transition-colors",
                  active
                    ? "border-ink bg-gradient-to-b from-gold to-flame text-ink shadow-[0_2px_0_0_#2d2a26]"
                    : "border-ink/20 bg-paper/70 text-ink-soft hover:border-ink"
                )}
              >
                {p.icon} {p.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ---------- Enemy faction ---------- */}
      <motion.div
        variants={popIn}
        className="rounded-3xl border-[3px] border-ink bg-white p-5 shadow-[0_4px_0_0_#2d2a26]"
      >
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-ink">
          🚩 Enemy hero faction <span className="text-ink-faint">(optional)</span>
        </p>
        <p className="mt-0.5 text-xs font-bold text-ink-soft">
          Unlocks the +15% faction counter alert
        </p>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {(Object.keys(FACTIONS) as (Faction | "unknown")[]).map((f) => {
            const meta = FACTIONS[f];
            const active = faction === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => onFaction(f)}
                aria-pressed={active}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-xl border-[3px] px-2 py-2 font-display text-xs font-extrabold transition-all",
                  active
                    ? "border-ink text-ink shadow-[0_3px_0_0_#2d2a26]"
                    : "border-ink/20 bg-paper/60 text-ink-soft hover:border-ink"
                )}
                style={active ? { background: meta.color } : undefined}
              >
                <span aria-hidden>{meta.icon}</span>
                {meta.label}
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
