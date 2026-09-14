"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TitanButton from "@/components/ui/TitanButton";
import {
  GEAR_SLOTS,
  POOL_BY_SLOT,
  REFORGE_ECONOMY,
  STAT_TIER_META,
  TIER_ORDER,
  statById,
  type StatTier,
} from "@/data/gearReforge";
import {
  activeTierWeights,
  evaluateLine,
  fmtLineValue,
  hammerTranslation,
  isTrap,
  rollLine,
  targetOdds,
  type AutoResult,
  type ForgeContext,
  type GearRoll,
  type ReforgeMethod,
  type RollCondition,
} from "@/lib/tools/reforgeEngine";
import { popIn, springPop } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";
import { GradeChip, Panel, PanelLabel, SegToggle, TierChip } from "./parts";

/* ------------------------------------------------------------------ */
/*  ForgePanel — the Active Forge. Three special-stat lines, locks,    */
/*  standard/advanced reforging and targeted auto-roll.                */
/* ------------------------------------------------------------------ */

const STAR_SLOTS = ["2★", "4★", "6★"];

export interface AutoReadout extends AutoResult {
  cond: RollCondition;
}

interface ForgePanelProps {
  ctx: ForgeContext;
  gear: GearRoll | null;
  onToggleLock: (i: number) => void;
  method: ReforgeMethod;
  onMethod: (m: ReforgeMethod) => void;
  advancedUnlocked: boolean;
  nextCost: number;
  rolling: boolean;
  onReforge: () => void;
  onAutoRoll: (cond: RollCondition) => void;
  autoResult: AutoReadout | null;
  onSaveToVault: () => void;
  vaultCount: number;
}

export default function ForgePanel({
  ctx,
  gear,
  onToggleLock,
  method,
  onMethod,
  advancedUnlocked,
  nextCost,
  rolling,
  onReforge,
  onAutoRoll,
  autoResult,
  onSaveToVault,
  vaultCount,
}: ForgePanelProps) {
  const locks = gear?.lines.filter((l) => l.locked).length ?? 0;
  const slotMeta = GEAR_SLOTS[ctx.slot];

  return (
    <Panel className="p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <PanelLabel>The Active Forge // {slotMeta.label}</PanelLabel>
          <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">
            Roll it. <span className="text-sunset">Grade it.</span> Lock it.
          </h3>
        </div>
        {/* Method toggle */}
        <div className="flex flex-wrap gap-2">
          <SegToggle active={method === "standard"} onClick={() => onMethod("standard")}>
            ⚒ Standard · 1🔨
          </SegToggle>
          <SegToggle
            active={method === "advanced"}
            onClick={() => advancedUnlocked && onMethod("advanced")}
            disabled={!advancedUnlocked}
            title={advancedUnlocked ? "Epic & Legendary lines only" : `Unlocks after ${REFORGE_ECONOMY.advancedUnlockAt} hammers spent`}
          >
            🔥 Advanced · 25🔨
          </SegToggle>
        </div>
      </div>

      {/* Advanced progress / guarantee note */}
      <div className="mt-3">
        {advancedUnlocked ? (
          <p className="rounded-xl border-2 border-leaf/50 bg-leaf/10 px-3 py-1.5 text-xs font-bold text-leaf-deep">
            🔥 Advanced unlocked — Epic &amp; Legendary only. Standard rolls are now guaranteed Exquisite+.
          </p>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-ink/20 bg-paper/60 px-3 py-2">
            <p className="text-xs font-bold text-ink-soft">
              Advanced reforge unlocks after {REFORGE_ECONOMY.advancedUnlockAt} 🔨 spent collectively —
              then: Epic &amp; Legendary lines only, 25 🔨 a roll.
            </p>
          </div>
        )}
      </div>

      {/* Stat lines */}
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {(gear?.lines ?? [null, null, null]).map((line, i) => (
          <StatLineCard
            key={i}
            index={i}
            line={line}
            ctx={ctx}
            method={method}
            advancedUnlocked={advancedUnlocked}
            spinning={rolling}
            hitLine={autoResult?.hit ? autoResult.hitLine : -1}
            onToggleLock={onToggleLock}
            lockDisabled={!gear || locks >= REFORGE_ECONOMY.maxLocks}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <TitanButton variant="sun" size="lg" onClick={onReforge} icon={<span aria-hidden>⚒️</span>}>
          {rolling ? "ROLLING…" : "REFORGE"}
        </TitanButton>
        <TitanButton
          variant="paper"
          size="md"
          onClick={onSaveToVault}
          icon={<span aria-hidden>💾</span>}
        >
          Save to Stash
        </TitanButton>
        <div className="min-w-0">
          <p className="font-mono text-xs font-bold text-ink-soft">
            Next roll: <span className="text-ember-deep">{nextCost.toLocaleString()} 🔨</span>
            {locks > 0 && (
              <span className="text-ink-faint">
                {" "}({locks} locked · ×{REFORGE_ECONOMY.lockMultipliers[locks]})
              </span>
            )}
          </p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-ink-faint">
            Stash: {vaultCount} saved roll{vaultCount === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {/* Targeted auto-roll */}
      <AutoRollControls
        ctx={ctx}
        gear={gear}
        method={method}
        advancedUnlocked={advancedUnlocked}
        locks={locks}
        onAutoRoll={onAutoRoll}
        autoResult={autoResult}
      />
    </Panel>
  );
}

/* --------------------------- stat line card ------------------------ */

function StatLineCard({
  index,
  line,
  ctx,
  method,
  advancedUnlocked,
  spinning,
  hitLine,
  onToggleLock,
  lockDisabled,
}: {
  index: number;
  line: GearRoll["lines"][number] | null;
  ctx: ForgeContext;
  method: ReforgeMethod;
  advancedUnlocked: boolean;
  spinning: boolean;
  hitLine: number;
  onToggleLock: (i: number) => void;
  lockDisabled: boolean;
}) {
  const [ghost, setGhost] = useState<GearRoll["lines"][number] | null>(null);
  const spin = spinning && !!line && !line.locked;

  useEffect(() => {
    if (!spin) {
      setGhost(null);
      return;
    }
    const weights = activeTierWeights(method, advancedUnlocked);
    const id = setInterval(() => setGhost(rollLine(ctx.slot, weights)), 75);
    return () => clearInterval(id);
  }, [spin, method, advancedUnlocked, ctx.slot]);

  if (!line) {
    return (
      <div className="grid min-h-44 place-items-center rounded-3xl border-[3px] border-dashed border-ink/25 bg-paper/50 p-4 text-center">
        <p className="font-display text-sm font-extrabold text-ink-faint">
          {STAR_SLOTS[index]} slot
          <span className="mt-1 block text-[11px] font-bold text-ink-faint/70">
            awaiting first reforge
          </span>
        </p>
      </div>
    );
  }

  const shown = ghost ?? line;
  const stat = statById(shown.statId);
  const realStat = statById(line.statId);
  const ev = evaluateLine(line, ctx);
  if (!stat || !realStat) return null;

  const isGhost = !!ghost;
  const trap = !isGhost && ev.trap;
  const locked = line.locked;

  return (
    <motion.div
      key={`${index}-${line.statId}-${line.tier}-${line.value}-${line.locked}`}
      variants={popIn}
      transition={springPop}
      initial={isGhost ? false : "hidden"}
      animate="show"
      className={cn(
        "relative flex min-h-44 flex-col rounded-3xl border-[3px] p-4",
        locked
          ? "border-ink bg-gradient-to-b from-gold/25 to-paper shadow-[0_4px_0_0_#2d2a26]"
          : "border-ink bg-white shadow-[0_4px_0_0_#2d2a26]",
        trap && "border-[#d64545] bg-[#d64545]/5",
        isGhost && "opacity-80",
        hitLine === index && "ring-4 ring-gold ring-offset-2 ring-offset-paper"
      )}
    >
      {/* top row */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint">
          {STAR_SLOTS[index]} slot
        </span>
        <div className="flex items-center gap-1.5">
          {hitLine === index && (
            <span className="rounded-full border-2 border-ink bg-gradient-to-b from-gold to-flame px-2 py-0.5 font-mono text-[8px] font-extrabold uppercase tracking-wider text-ink shadow-[0_2px_0_0_#2d2a26]">
              ★ Target
            </span>
          )}
          <TierChip tier={shown.tier} />
          <motion.button
            type="button"
            onClick={() => onToggleLock(index)}
            disabled={lockDisabled && !locked}
            whileTap={{ scale: 0.9 }}
            aria-pressed={locked}
            aria-label={locked ? `Unlock ${realStat.name}` : `Lock ${realStat.name}`}
            title={
              locked
                ? "Locked — preserved on the next roll"
                : lockDisabled
                  ? `Lock limit reached (${REFORGE_ECONOMY.maxLocks} lines)`
                  : "Lock — preserves this line, multiplies hammer cost"
            }
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-xl border-[3px] text-sm transition-all",
              locked
                ? "border-ink bg-ink text-gold shadow-[0_2px_0_0_#000]"
                : "border-ink/20 bg-white text-ink-faint hover:border-ink/60 hover:text-ink",
              lockDisabled && !locked && "cursor-not-allowed opacity-40"
            )}
          >
            {locked ? "🔒" : "🔓"}
          </motion.button>
        </div>
      </div>

      {/* stat identity */}
      <p className="mt-2 flex items-center gap-1 font-display text-base font-extrabold leading-tight text-ink">
        {realStat.jackpot && <span aria-hidden className="text-gold">★</span>}
        <span className={cn(trap && "line-through decoration-[#d64545]/70")}>{stat.name}</span>
      </p>

      {/* value */}
      <p
        className={cn(
          "mt-1 font-mono text-3xl font-extrabold tabular-nums",
          shown.tier === "legendary" ? "text-ember-deep" : "text-ink",
          shown.tier === "common" && "text-[#33691e]",
          shown.tier === "exquisite" && "text-river",
          shown.tier === "epic" && "text-[#8e5ac8]"
        )}
      >
        {fmtLineValue(stat, shown)}
      </p>

      {/* grade / trap footer */}
      <div className="mt-auto flex items-center gap-2 pt-3">
        {isGhost ? (
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-faint">
            rolling…
          </span>
        ) : trap ? (
          <>
            <GradeChip grade="F" />
            <span className="font-display text-[11px] font-extrabold uppercase tracking-wide text-[#c23c3c]">
              Trap roll — 0% synergy
            </span>
          </>
        ) : (
          <>
            <GradeChip grade={ev.grade} />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-ink-soft">
              {ev.grade}-fit · {ctx.role}
            </span>
            {locked && (
              <span className="ml-auto rounded-full border-2 border-ink bg-gold px-2 py-0.5 font-mono text-[8px] font-extrabold uppercase text-ink">
                Locked
              </span>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

/* --------------------------- auto-roll block ----------------------- */

function AutoRollControls({
  ctx,
  gear,
  method,
  advancedUnlocked,
  locks,
  onAutoRoll,
  autoResult,
}: {
  ctx: ForgeContext;
  gear: GearRoll | null;
  method: ReforgeMethod;
  advancedUnlocked: boolean;
  locks: number;
  onAutoRoll: (cond: RollCondition) => void;
  autoResult: AutoReadout | null;
}) {
  const pool = POOL_BY_SLOT[ctx.slot];
  const sFitExists = pool.some((s) => !isTrap(s, ctx) && s.fits[ctx.role] === "S");

  const [preset, setPreset] = useState<"custom" | "godroll">("custom");
  const [statId, setStatId] = useState(pool[0]?.id ?? "");
  const [minTier, setMinTier] = useState<StatTier>("legendary");

  // keep the stat pick valid when the slot changes
  useEffect(() => {
    if (!pool.some((s) => s.id === statId)) setStatId(pool[0]?.id ?? "");
  }, [pool, statId]);

  const cond: RollCondition = useMemo(
    () => (preset === "godroll" ? { kind: "godroll" } : { kind: "stat", statId, minTier }),
    [preset, statId, minTier]
  );

  const odds = useMemo(
    () => targetOdds(ctx, cond, method, advancedUnlocked, 3 - locks),
    [ctx, cond, method, advancedUnlocked, locks]
  );

  const godrollBlocked = preset === "godroll" && (!sFitExists || odds.pPerRoll <= 0);

  return (
    <div className="mt-6 rounded-2xl border-[3px] border-ink bg-pine p-4 text-cream shadow-[0_4px_0_0_#0e271f] sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <PanelLabel className="text-gold">⚡ Targeted Auto-Roll</PanelLabel>
        <span className="font-mono text-[10px] font-bold text-cream/50">
          FAST-FORWARD UNTIL THE CONDITION HITS · LOCKS RESPECTED · CAP {REFORGE_ECONOMY.autoRollCap}
        </span>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[auto_1fr_1fr_auto] lg:items-end">
        <label className="block">
          <span className="mb-1 block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-cream/60">
            Goal
          </span>
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value as "custom" | "godroll")}
            className="w-full rounded-xl border-[3px] border-ink bg-paper px-2.5 py-2 font-display text-xs font-extrabold text-ink focus:border-gold focus:outline-none"
          >
            <option value="custom">Custom stat target…</option>
            <option value="godroll" disabled={!sFitExists}>
              God roll for {ctx.role} (S-fit Legendary)
            </option>
          </select>
        </label>

        {preset === "custom" && (
          <>
            <label className="block">
              <span className="mb-1 block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-cream/60">
                Target stat
              </span>
              <select
                value={statId}
                onChange={(e) => setStatId(e.target.value)}
                className="w-full rounded-xl border-[3px] border-ink bg-paper px-2.5 py-2 font-display text-xs font-bold text-ink focus:border-gold focus:outline-none"
              >
                {pool.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                    {s.jackpot ? " ★" : ""}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-cream/60">
                Minimum tier
              </span>
              <select
                value={minTier}
                onChange={(e) => setMinTier(e.target.value as StatTier)}
                className="w-full rounded-xl border-[3px] border-ink bg-paper px-2.5 py-2 font-display text-xs font-bold text-ink focus:border-gold focus:outline-none"
              >
                {[...TIER_ORDER].reverse().map((t) => (
                  <option key={t} value={t}>
                    {STAT_TIER_META[t].label}+
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        <div className="flex flex-col items-stretch gap-1">
          <TitanButton
            variant="sun"
            size="md"
            onClick={() => onAutoRoll(cond)}
            icon={<span aria-hidden>⚡</span>}
          >
            Auto-Roll
          </TitanButton>
        </div>
      </div>

      {/* odds estimate */}
      <div className="mt-3">
        {preset === "godroll" && !sFitExists ? (
          <p className="text-xs font-bold text-gold">
            ⚠ No S-fit stat exists in the {GEAR_SLOTS[ctx.slot].label} pool for a {ctx.role} — chase A-fit lines here, or reforge a different slot.
          </p>
        ) : odds.pPerRoll <= 0 ? (
          <p className="text-xs font-bold text-gold">⚠ This target cannot roll in the current pool.</p>
        ) : (
          <p className="font-mono text-[11px] font-bold leading-relaxed text-cream/75">
            HIT CHANCE/ROLL: {(odds.pPerRoll * 100).toFixed(1)}% → EXPECTED{" "}
            ~{Math.ceil(odds.expectedRolls)} ROLLS ≈{" "}
            {Math.ceil(odds.expectedHammers).toLocaleString()} 🔨{" "}
            <span className="text-cream/45">
              ({hammerTranslation(Math.ceil(odds.expectedHammers))})
            </span>
          </p>
        )}
      </div>

      {/* result readout */}
      <AnimatePresence mode="wait">
        {autoResult && (
          <motion.div
            key={`${autoResult.rolls}-${autoResult.hit}-${autoResult.cond.kind}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={cn(
              "mt-3 rounded-2xl border-[3px] p-3.5",
              autoResult.hit
                ? "border-gold bg-gradient-to-b from-gold/20 to-transparent"
                : "border-[#d64545] bg-[#d64545]/15"
            )}
          >
            {autoResult.rolls === 0 && autoResult.hit ? (
              <p className="font-display text-sm font-extrabold text-gold">
                ✅ Target already live on this gear — zero hammers needed. Go spend them elsewhere.
              </p>
            ) : autoResult.hit ? (
              <p className="font-display text-sm font-extrabold leading-snug text-cream">
                🎯 TARGET HIT after{" "}
                <span className="text-gold">{autoResult.rolls.toLocaleString()} rolls</span> —{" "}
                {autoResult.hammers.toLocaleString()} 🔨 burned{" "}
                <span className="font-mono text-[11px] font-bold text-cream/60">
                  ({hammerTranslation(autoResult.hammers)})
                </span>
                . That&apos;s what the chase actually costs.
              </p>
            ) : (
              <p className="font-display text-sm font-extrabold leading-snug text-cream">
                🛑 {REFORGE_ECONOMY.autoRollCap} rolls, no target — {autoResult.hammers.toLocaleString()} 🔨{" "}
                would be ash. The math is telling you: take the A-tier and keep your hammers.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
