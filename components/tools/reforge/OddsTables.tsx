"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GEAR_SLOTS,
  GEAR_SLOT_ORDER,
  REFORGE_ECONOMY,
  STAT_TIER_META,
  TIER_ORDER,
  TIER_WEIGHTS,
  ADVANCED_TIER_WEIGHTS,
  referenceRows,
  type GearSlotId,
  type Grade,
  type HeroRole,
} from "@/data/gearReforge";
import { popIn, springSoft } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";
import { GRADE_CHIP, Panel, PanelLabel, TierChip } from "./parts";

/* ------------------------------------------------------------------ */
/*  OddsTables — the toggleable reference tab. Every pool, every       */
/*  tier range, every drop weight, jackpot lines flagged.              */
/* ------------------------------------------------------------------ */

const ROLE_COLS: HeroRole[] = ["Tank", "DPS", "Support"];

const FIT_STYLE: Record<Grade, string> = {
  S: "bg-gradient-to-b from-gold to-flame text-ink border-ink",
  A: "bg-river/15 text-river border-river/50",
  B: "bg-leaf/15 text-leaf-deep border-leaf-deep/50",
  C: "bg-sand/70 text-ink-soft border-ink/20",
  F: "bg-[#d64545]/15 text-[#c23c3c] border-[#d64545]/50",
};

function fmtRange(range: [number, number], invert: boolean): string {
  const [min, max] = range;
  const f = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));
  return invert ? `−${f(min)}…−${f(max)}%` : `+${f(min)}…+${f(max)}%`;
}

export default function OddsTables() {
  const [open, setOpen] = useState(true);
  const [slot, setSlot] = useState<GearSlotId>("helmet");
  const rows = referenceRows(slot);
  const slotMeta = GEAR_SLOTS[slot];

  return (
    <Panel className="mt-12" id="odds">
      {/* toggle bar */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full flex-wrap items-center justify-between gap-3 p-6 text-left sm:p-8"
      >
        <div>
          <PanelLabel>Reference Tab // Odds &amp; Stat Pools</PanelLabel>
          <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">
            What can <span className="text-sunset">actually roll?</span>
          </h3>
          <p className="mt-1 text-sm font-semibold text-ink-soft">
            Drop weights and tier ranges for every pool — the ultimate endgame goal is flagged ★.
          </p>
        </div>
        <span
          className={cn(
            "rounded-2xl border-[3px] border-ink bg-gradient-to-b from-gold to-flame px-4 py-2 font-display text-sm font-extrabold text-ink shadow-[0_3px_0_0_#2d2a26]",
            open && "rotate-2"
          )}
        >
          {open ? "📗 Hide the odds" : "📖 Reveal the odds"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="tables"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springSoft}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 sm:px-8 sm:pb-8">
              {/* slot tabs */}
              <div className="mb-4 flex flex-wrap gap-2">
                {GEAR_SLOT_ORDER.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    aria-pressed={slot === s}
                    className={cn(
                      "rounded-xl border-[3px] px-3.5 py-2 font-display text-xs font-extrabold uppercase tracking-wide transition-all",
                      slot === s
                        ? "border-ink bg-ink text-cream shadow-[0_3px_0_0_#000]"
                        : "border-ink/20 bg-white text-ink-soft hover:border-ink/60"
                    )}
                  >
                    {GEAR_SLOTS[s].icon} {GEAR_SLOTS[s].label}
                  </button>
                ))}
              </div>

              <p className="mb-3 text-xs font-bold text-ink-soft">
                {slotMeta.icon} {slotMeta.label} — <span className="text-ember-deep">{slotMeta.pool}</span> pool. {slotMeta.note}
              </p>

              {/* the table */}
              <div className="overflow-x-auto rounded-2xl border-[3px] border-ink">
                <table className="w-full min-w-3xl border-collapse text-left font-mono text-[11px] font-bold">
                  <thead>
                    <tr className="bg-ink text-cream">
                      <th className="px-3 py-2.5 uppercase tracking-wider">Stat</th>
                      <th className="px-3 py-2.5 uppercase tracking-wider">Drop %</th>
                      {TIER_ORDER.map((t) => (
                        <th key={t} className="px-3 py-2.5 uppercase tracking-wider">
                          <span className="inline-flex items-center gap-1.5">
                            <span aria-hidden className="inline-block size-2 rounded-full" style={{ background: STAT_TIER_META[t].dot }} />
                            {STAT_TIER_META[t].label}
                          </span>
                        </th>
                      ))}
                      {ROLE_COLS.map((r) => (
                        <th key={r} className="px-3 py-2.5 text-center uppercase tracking-wider">
                          {r}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <motion.tr
                        key={row.key}
                        variants={popIn}
                        initial="hidden"
                        animate="show"
                        className={cn(
                          "border-t-2 border-ink/10",
                          row.jackpot ? "bg-gold/20" : row.tagged ? "bg-paper/70" : "bg-white"
                        )}
                      >
                        <td className="max-w-64 px-3 py-2.5">
                          <span className="flex items-center gap-1.5 font-display text-[13px] font-extrabold text-ink">
                            {row.jackpot && <span aria-hidden className="text-ember">★</span>}
                            {row.name}
                          </span>
                          <span className="mt-0.5 block text-[9px] font-bold leading-snug text-ink-faint">
                            {row.tagged ? "⚠ tagged — matches only, otherwise TRAP · " : ""}
                            {row.note}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-ink-soft">
                          {(row.chance * 100).toFixed(1)}%
                        </td>
                        {TIER_ORDER.map((t) => (
                          <td key={t} className="whitespace-nowrap px-3 py-2.5 text-ink-soft">
                            {fmtRange(row.ranges[t], row.invert)}
                          </td>
                        ))}
                        {ROLE_COLS.map((r) => (
                          <td key={r} className="px-3 py-2.5 text-center">
                            <span
                              className={cn(
                                "inline-grid size-6 place-items-center rounded-md border-2 font-display text-[11px] font-extrabold",
                                FIT_STYLE[row.fits[r]]
                              )}
                              title={`${row.fits[r]}-fit for ${r}s`}
                            >
                              {row.fits[r]}
                            </span>
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* tier odds + advanced + trap notes */}
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border-[3px] border-ink/15 bg-paper/60 p-4">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                    Standard roll — tier odds
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {TIER_ORDER.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <TierChip tier={t} />
                        <span className="font-mono text-xs font-extrabold text-ink">{TIER_WEIGHTS[t]}%</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[10px] font-bold leading-snug text-ink-faint">
                    Once Advanced unlocks, Standard rolls are guaranteed Exquisite+.
                  </p>
                </div>
                <div className="rounded-2xl border-[3px] border-ink/15 bg-paper/60 p-4">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                    Advanced roll — 25 🔨
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <TierChip tier="epic" />
                      <span className="font-mono text-xs font-extrabold text-ink">{ADVANCED_TIER_WEIGHTS.epic}%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TierChip tier="legendary" />
                      <span className="font-mono text-xs font-extrabold text-ink">{ADVANCED_TIER_WEIGHTS.legendary}%</span>
                    </li>
                  </ul>
                  <p className="mt-2 text-[10px] font-bold leading-snug text-ink-faint">
                    Unlocks after {REFORGE_ECONOMY.advancedUnlockAt} 🔨 spent collectively. Epic &amp; Legendary lines only.
                  </p>
                </div>
                <div className="rounded-2xl border-[3px] border-ember-deep/40 bg-flame/10 p-4">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ember-deep">
                    ⚠ The trap-roll rule
                  </p>
                  <p className="mt-2 text-[11px] font-bold leading-relaxed text-ink-soft">
                    Faction &amp; troop-tagged stats (e.g. <em>Rover Faction HP</em>, <em>Gunner Attack</em>) only
                    apply when they match the hero. Otherwise: <span className="text-[#c23c3c]">0% synergy — TRAP</span>.
                    Rarity never beats synergy.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-center font-mono text-[9px] font-bold uppercase leading-relaxed tracking-wide text-ink-faint">
                Odds model: community-measured drop weights, patch 2.6.0 —
                FunPlus doesn&apos;t publish official numbers. Values step in 0.5% increments.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Panel>
  );
}
