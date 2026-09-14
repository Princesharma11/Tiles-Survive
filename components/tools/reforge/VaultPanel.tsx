"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GEAR_SLOTS, statById } from "@/data/gearReforge";
import {
  compareGear,
  evaluateLine,
  fmtLineValue,
  fmtSigned,
  type ForgeContext,
  type GearRoll,
} from "@/lib/tools/reforgeEngine";
import { popIn, springSoft } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";
import { GRADE_PLATE, GradeChip, Panel, PanelLabel, TierChip } from "./parts";
import type { Baseline } from "./SetupStage";

/* ------------------------------------------------------------------ */
/*  VaultPanel — the stash. Save decent rolls, A/B them against the    */
/*  live baseline, and get a decision badge before you dare reroll.    */
/* ------------------------------------------------------------------ */

export interface VaultEntry {
  id: string;
  at: string; // ISO timestamp
  ctx: ForgeContext;
  lines: GearRoll["lines"];
  grade: string;
}

const BADGE_STYLE = {
  UPGRADE: {
    plate: "border-ink bg-gradient-to-b from-leaf to-leaf-deep text-white shadow-[0_4px_0_0_#25511c]",
    icon: "📈",
    note: "Pure positive gain for this hero role — equip it and don't look back.",
  },
  SIDEGRADE: {
    plate: "border-ink bg-gradient-to-b from-gold to-flame text-ink shadow-[0_4px_0_0_#a03f10]",
    icon: "↔️",
    note: "Shifts power, doesn't add it. Only accept if you're changing the hero's purpose (e.g. attacker → pure defender).",
  },
  DOWNGRADE: {
    plate: "border-ink bg-[#d64545] text-white shadow-[0_4px_0_0_#8f2c2c]",
    icon: "📉",
    note: "Net loss for this hero role. Keep what you have — the baseline wins.",
  },
} as const;

export default function VaultPanel({
  vault,
  compareId,
  onCompare,
  onDelete,
  baseline,
  ctx,
  hasGear,
  onSave,
}: {
  vault: VaultEntry[];
  compareId: string | null;
  onCompare: (id: string | null) => void;
  onDelete: (id: string) => void;
  baseline: Baseline;
  ctx: ForgeContext;
  hasGear: boolean;
  onSave: () => void;
}) {
  const selected = vault.find((v) => v.id === compareId) ?? null;
  const baseLines = baseline.filter((r): r is NonNullable<typeof r> => !!r);
  const hasBaseline = baseLines.length > 0;

  return (
    <Panel className="p-6 sm:p-8" id="vault">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <PanelLabel>The Vault // Save &amp; Compare</PanelLabel>
          <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">
            Too scared to reroll a <span className="text-sunset">decent stat?</span>
          </h3>
          <p className="mt-1 max-w-xl text-sm font-semibold text-ink-soft">
            Stash any roll and A/B it against your live baseline — net deltas,
            effective power and a verdict, before a single real hammer moves.
          </p>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={!hasGear}
          className={cn(
            "rounded-2xl border-[3px] border-ink bg-gradient-to-b from-gold to-flame px-4 py-2.5 font-display text-sm font-extrabold text-ink shadow-[0_3px_0_0_#2d2a26] transition-transform hover:-translate-y-0.5",
            !hasGear && "cursor-not-allowed opacity-40 hover:translate-y-0"
          )}
        >
          💾 Save current roll to Stash
        </button>
      </div>

      {/* stash list */}
      {vault.length === 0 ? (
        <p className="mt-5 rounded-2xl border-[3px] border-dashed border-ink/20 bg-paper/50 px-4 py-6 text-center font-display text-sm font-extrabold text-ink-faint">
          🗄️ The vault is empty. Roll something decent, then stash it — the forge forgets, the vault doesn&apos;t.
        </p>
      ) : (
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {vault.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springSoft}
              className={cn(
                "rounded-2xl border-[3px] p-3.5 transition-all",
                entry.id === compareId
                  ? "border-ink bg-gold/20 shadow-[0_4px_0_0_#2d2a26]"
                  : "border-ink/15 bg-white hover:border-ink/40"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl border-[3px] font-display text-lg font-extrabold",
                    GRADE_PLATE[(entry.grade as keyof typeof GRADE_PLATE) ?? "C"] ?? GRADE_PLATE.C
                  )}
                >
                  {entry.grade}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-extrabold text-ink">
                    {GEAR_SLOTS[entry.ctx.slot].icon} {GEAR_SLOTS[entry.ctx.slot].label} · {entry.ctx.role}
                  </p>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-wide text-ink-faint">
                    {new Date(entry.at).toLocaleString()}
                  </p>
                </div>
              </div>
              <ul className="mt-2.5 space-y-1">
                {entry.lines.map((l, i) => {
                  const stat = statById(l.statId);
                  if (!stat) return null;
                  return (
                    <li key={i} className="flex items-center justify-between gap-2 font-mono text-[10px] font-bold text-ink-soft">
                      <span className="truncate">{stat.name}</span>
                      <span className="flex shrink-0 items-center gap-1">
                        {fmtLineValue(stat, l)}
                        <TierChip tier={l.tier} />
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => onCompare(entry.id === compareId ? null : entry.id)}
                  className={cn(
                    "flex-1 rounded-xl border-[3px] px-2 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-wide transition-all",
                    entry.id === compareId
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/25 bg-white text-ink hover:border-ink"
                  )}
                >
                  {entry.id === compareId ? "✕ Close" : "⇄ Compare"}
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(entry.id)}
                  aria-label="Delete stash entry"
                  className="rounded-xl border-[3px] border-ink/15 bg-white px-2.5 py-1.5 text-xs text-ink-faint transition-all hover:border-[#d64545] hover:text-[#d64545]"
                >
                  🗑
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* comparison */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            variants={popIn}
            transition={springSoft}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10 }}
            className="mt-6"
          >
            <CompareView baseline={baseLines} entry={selected} ctx={ctx} hasBaseline={hasBaseline} />
          </motion.div>
        )}
      </AnimatePresence>
    </Panel>
  );
}

/* ---------------------------- comparison --------------------------- */

function CompareView({
  baseline,
  entry,
  ctx,
  hasBaseline,
}: {
  baseline: GearRoll["lines"];
  entry: VaultEntry;
  ctx: ForgeContext;
  hasBaseline: boolean;
}) {
  // Grade the stash against the CURRENT hero context (that's the point).
  const result = compareGear(baseline, entry.lines, ctx);
  const badge = BADGE_STYLE[result.badge];
  const crossSlot = entry.ctx.slot !== ctx.slot;

  return (
    <div className="rounded-2xl border-[3px] border-ink bg-pine p-4 text-cream shadow-[0_5px_0_0_#0e271f] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <PanelLabel className="text-gold">A/B Delta // Baseline vs Stashed Roll</PanelLabel>
        {crossSlot && (
          <span className="rounded-full border-2 border-gold/60 bg-gold/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-gold">
            ⚠ stashed on {GEAR_SLOTS[entry.ctx.slot].label} — different slot than current setup
          </span>
        )}
      </div>

      {/* split columns */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border-2 border-cream/25 bg-cream/5 p-3.5">
          <p className="font-display text-sm font-extrabold uppercase tracking-wide text-cream/70">
            📌 Current Baseline {hasBaseline ? "" : "— empty"}
          </p>
          <LineList lines={baseline} ctx={ctx} emptyNote="No live stats input — every stat below counts as a gain." />
        </div>
        <div className="rounded-xl border-2 border-gold/50 bg-gold/10 p-3.5">
          <p className="font-display text-sm font-extrabold uppercase tracking-wide text-gold">
            🗄️ Stashed Roll · {GEAR_SLOTS[entry.ctx.slot].label}
          </p>
          <LineList lines={entry.lines} ctx={ctx} emptyNote="" />
        </div>
      </div>

      {/* deltas */}
      <div className="mt-4 overflow-hidden rounded-xl border-2 border-cream/25">
        <table className="w-full border-collapse text-left font-mono text-[11px] font-bold">
          <thead>
            <tr className="bg-cream/10 text-cream/60">
              <th className="px-3 py-2 uppercase tracking-wider">Net stat</th>
              <th className="px-3 py-2 text-right uppercase tracking-wider">Baseline</th>
              <th className="px-3 py-2 text-right uppercase tracking-wider">Stashed</th>
              <th className="px-3 py-2 text-right uppercase tracking-wider">Δ</th>
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row) => (
              <tr key={row.statId} className="border-t border-cream/10">
                <td className="px-3 py-1.5 text-cream/85">
                  {row.name}
                  {row.trap && (
                    <span className="ml-2 rounded-full bg-[#d64545]/25 px-1.5 py-0.5 text-[8px] uppercase text-[#ff9c9c]">
                      0% synergy — ignored
                    </span>
                  )}
                </td>
                <td className="px-3 py-1.5 text-right text-cream/60">
                  {fmtSigned(row.invert ? -row.from : row.from)}
                </td>
                <td className="px-3 py-1.5 text-right text-cream/60">
                  {fmtSigned(row.invert ? -row.to : row.to)}
                </td>
                <td
                  className={cn(
                    "px-3 py-1.5 text-right font-extrabold",
                    row.delta > 0 ? "text-[#7ee081]" : row.delta < 0 ? "text-[#ff9c9c]" : "text-cream/50"
                  )}
                >
                  {fmtSigned(row.invert ? -row.delta : row.delta)}
                </td>
              </tr>
            ))}
            {result.rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-3 text-center text-cream/50">
                  Nothing to compare yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* decision badge */}
      <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border-[3px] border-ink bg-cream p-4">
        <span
          className={cn(
            "grid h-14 min-w-32 place-items-center rounded-2xl border-[3px] px-4 font-display text-xl font-extrabold uppercase tracking-wide",
            badge.plate
          )}
        >
          {badge.icon} {result.badge}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-extrabold text-ink">{badge.note}</p>
          <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-wide text-ink-soft">
            Effective power for a {ctx.role} ({ctx.faction} {ctx.troop}):{" "}
            <span className={result.effectiveDelta > 0 ? "text-leaf-deep" : result.effectiveDelta < 0 ? "text-[#c23c3c]" : "text-ink-soft"}>
              {fmtSigned(result.effectiveDelta)}
            </span>{" "}
            · traps count 0 · role weights S×1.0 A×0.8 B×0.6 C×0.35
          </p>
        </div>
      </div>
    </div>
  );
}

function LineList({
  lines,
  ctx,
  emptyNote,
}: {
  lines: GearRoll["lines"];
  ctx: ForgeContext;
  emptyNote: string;
}) {
  if (lines.length === 0) {
    return <p className="mt-2 text-xs font-bold text-cream/50">{emptyNote}</p>;
  }
  return (
    <ul className="mt-2 space-y-1.5">
      {lines.map((l, i) => {
        const stat = statById(l.statId);
        if (!stat) return null;
        const ev = evaluateLine(l, ctx);
        return (
          <li key={i} className="flex items-center gap-2">
            <GradeChip grade={ev.grade} />
            <span className={cn("min-w-0 flex-1 truncate text-xs font-bold", ev.trap ? "text-[#ff9c9c] line-through" : "text-cream/85")}>
              {stat.name}
            </span>
            <span className="shrink-0 font-mono text-xs font-extrabold text-cream">{fmtLineValue(stat, l)}</span>
            <TierChip tier={l.tier} />
          </li>
        );
      })}
    </ul>
  );
}
