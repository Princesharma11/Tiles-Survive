import {
  GRADE_RANK,
  POOL_BY_SLOT,
  REFORGE_ECONOMY,
  STAT_DEFS,
  STAT_TIER_META,
  TIER_ORDER,
  TIER_WEIGHTS,
  ADVANCED_TIER_WEIGHTS,
  statById,
  type GearSlotId,
  type Grade,
  type HeroRole,
  type StatDef,
  type StatTier,
} from "@/data/gearReforge";
import type { HeroClass, HeroFaction } from "@/data/heroMeta";

/* ------------------------------------------------------------------ */
/*  Reforge engine — pure simulation, grading & economy math.          */
/*  All randomness flows through injectable rng (Math.random).         */
/* ------------------------------------------------------------------ */

export type ReforgeMethod = "standard" | "advanced";

export interface RolledLine {
  statId: string;
  tier: StatTier;
  value: number;
  locked: boolean;
}

/** Alloy gear carries exactly three Special Stat slots (2★ / 4★ / 6★). */
export interface GearRoll {
  lines: RolledLine[];
}

export interface ForgeContext {
  role: HeroRole;
  troop: HeroClass;
  faction: HeroFaction;
  slot: GearSlotId;
}

export interface LineEval {
  grade: Grade;
  trap: boolean;
  score: number;
  note: string;
}

export interface GearEval {
  perLine: LineEval[];
  score: number;
  grade: Grade;
  verdict: { kind: "LOCK" | "ROLL"; title: string; reason: string };
  traps: number;
  bestIdx: number;
}

export type RollCondition =
  | { kind: "stat"; statId: string; minTier: StatTier }
  | { kind: "godroll" };

export interface AutoResult {
  gear: GearRoll;
  rolls: number;
  hammers: number;
  hit: boolean;
  hitLine: number;
}

const LINES_PER_GEAR = 3;

/* ------------------------------ rolling --------------------------- */

function weightedPick<T>(items: T[], weights: number[], r: number): T {
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = r * total;
  for (let i = 0; i < items.length; i++) {
    roll -= weights[i];
    if (roll < 0) return items[i];
  }
  return items[items.length - 1];
}

/** Tier weights in effect for a method (standard gains an Exquisite floor
 *  once Advanced reforge is unlocked, matching in-game behavior). */
export function activeTierWeights(method: ReforgeMethod, advancedUnlocked: boolean): Record<StatTier, number> {
  if (method === "advanced") return ADVANCED_TIER_WEIGHTS;
  if (advancedUnlocked) return { common: 0, exquisite: 28, epic: 13, legendary: 4 };
  return TIER_WEIGHTS;
}

function rollTier(weights: Record<StatTier, number>, r: number): StatTier {
  return weightedPick(TIER_ORDER, TIER_ORDER.map((t) => weights[t]), r);
}

function rollValue(stat: StatDef, tier: StatTier, r: number): number {
  const [min, max] = stat.ranges[tier];
  const steps = Math.round((max - min) / 0.5) + 1;
  const idx = Math.min(steps - 1, Math.floor(r * steps));
  return min + idx * 0.5;
}

export function rollLine(
  slot: GearSlotId,
  tierWeights: Record<StatTier, number>,
  rng: () => number = Math.random
): RolledLine {
  const pool = POOL_BY_SLOT[slot];
  const stat = weightedPick(pool, pool.map((s) => s.weight), rng());
  const tier = rollTier(tierWeights, rng());
  const value = rollValue(stat, tier, rng());
  return { statId: stat.id, tier, value, locked: false };
}

export function lockedCount(gear: GearRoll | null): number {
  if (!gear) return 0;
  return gear.lines.filter((l) => l.locked).length;
}

export function rollCost(method: ReforgeMethod, locks: number): number {
  const base = method === "advanced" ? REFORGE_ECONOMY.advancedBase : REFORGE_ECONOMY.standardBase;
  const mult = REFORGE_ECONOMY.lockMultipliers[Math.min(locks, REFORGE_ECONOMY.lockMultipliers.length - 1)];
  return base * mult;
}

/** Reroll every unlocked line; locked lines are preserved verbatim. */
export function rollGear(
  current: GearRoll | null,
  ctx: ForgeContext,
  method: ReforgeMethod,
  advancedUnlocked: boolean,
  rng: () => number = Math.random
): GearRoll {
  const weights = activeTierWeights(method, advancedUnlocked);
  const prev = current?.lines ?? [];
  const lines: RolledLine[] = [];
  for (let i = 0; i < LINES_PER_GEAR; i++) {
    const old = prev[i];
    if (old?.locked) {
      lines.push(old);
    } else {
      lines.push(rollLine(ctx.slot, weights, rng));
    }
  }
  return { lines };
}

/* ------------------------------ grading --------------------------- */

export function isTrap(stat: StatDef, ctx: ForgeContext): boolean {
  return (stat.faction != null && stat.faction !== ctx.faction) || (stat.troop != null && stat.troop !== ctx.troop);
}

export function evaluateLine(line: RolledLine, ctx: ForgeContext): LineEval {
  const stat = statById(line.statId);
  if (!stat) return { grade: "F", trap: false, score: 0, note: "Unknown stat." };
  if (isTrap(stat, ctx)) {
    return {
      grade: "F",
      trap: true,
      score: 0,
      note: `TRAP ROLL. High rarity, but 0% synergy — ${stat.name} does nothing for a ${ctx.faction} ${ctx.troop} hero. Reroll.`,
    };
  }
  const grade = stat.fits[ctx.role];
  return {
    grade,
    trap: false,
    score: GRADE_RANK[grade] * STAT_TIER_META[line.tier].mult,
    note: `${grade}-fit for a ${ctx.role}. ${stat.note}`,
  };
}

function gearGrade(score: number): Grade {
  if (score >= 0.75) return "S";
  if (score >= 0.58) return "A";
  if (score >= 0.4) return "B";
  if (score >= 0.22) return "C";
  return "F";
}

export function evaluateGear(gear: GearRoll | null, ctx: ForgeContext): GearEval {
  const perLine: LineEval[] = (gear?.lines ?? []).map((l) => evaluateLine(l, ctx));
  const score = perLine.length
    ? perLine.reduce((a, b) => a + b.score, 0) / perLine.length
    : 0;
  const grade = gearGrade(score);
  const traps = perLine.filter((l) => l.trap).length;

  let bestIdx = -1;
  let bestScore = -1;
  perLine.forEach((l, i) => {
    if (l.score > bestScore) {
      bestScore = l.score;
      bestIdx = i;
    }
  });

  let verdict: GearEval["verdict"];
  const best = bestIdx >= 0 ? gear!.lines[bestIdx] : null;
  const bestStat = best ? statById(best.statId) : undefined;
  const bestEval = bestIdx >= 0 ? perLine[bestIdx] : null;

  if (!gear || !best || !bestStat || !bestEval) {
    verdict = {
      kind: "ROLL",
      title: "AWAITING FIRST ROLL",
      reason: "Set your hero context, then hit REFORGE to simulate a roll.",
    };
  } else if (traps > 0) {
    verdict = {
      kind: "ROLL",
      title: "KEEP ROLLING",
      reason: `Trap roll detected — a tagged stat that your ${ctx.faction} ${ctx.troop} ${ctx.role} gets zero value from. Lock it out and reroll it.`,
    };
  } else if (bestEval.score >= 0.7 && grade !== "F" && grade !== "C") {
    verdict = {
      kind: "LOCK",
      title: "LOCK THIS IN",
      reason: `${bestStat.name} ${fmtLineValue(bestStat, best)} is a ${bestEval.grade}-fit for your ${ctx.role} at ${STAT_TIER_META[best.tier].label} value. Stop spending hammers.`,
    };
  } else if (bestEval.grade === "S" || bestEval.grade === "A") {
    verdict = {
      kind: "ROLL",
      title: "KEEP ROLLING",
      reason: `The stat fits (${bestEval.grade}-fit) but the tier is weak — ${STAT_TIER_META[best.tier].label} ${bestStat.name} leaves value on the table. Lock it and keep rolling.`,
    };
  } else {
    verdict = {
      kind: "ROLL",
      title: "KEEP ROLLING",
      reason: `Best line is only ${bestEval.grade}-fit for a ${ctx.role}. You're paying hammer prices for a ${grade}-tier result.`,
    };
  }

  return { perLine, score, grade, verdict, traps, bestIdx };
}

/* --------------------------- auto-roll ---------------------------- */

const TIER_RANK: Record<StatTier, number> = { common: 0, exquisite: 1, epic: 2, legendary: 3 };

export function conditionMet(gear: GearRoll, ctx: ForgeContext, cond: RollCondition): number {
  for (let i = 0; i < gear.lines.length; i++) {
    const line = gear.lines[i];
    const stat = statById(line.statId);
    if (!stat) continue;
    if (cond.kind === "stat") {
      if (line.statId === cond.statId && TIER_RANK[line.tier] >= TIER_RANK[cond.minTier]) return i;
    } else {
      const ev = evaluateLine(line, ctx);
      if (!ev.trap && ev.grade === "S" && line.tier === "legendary") return i;
    }
  }
  return -1;
}

/** Per-roll hit chance for a condition (any unlocked line). */
export function targetOdds(
  ctx: ForgeContext,
  cond: RollCondition,
  method: ReforgeMethod,
  advancedUnlocked: boolean,
  unlockedCount: number
): { pPerRoll: number; expectedRolls: number; expectedHammers: number } {
  const pool = POOL_BY_SLOT[ctx.slot];
  const total = pool.reduce((a, s) => a + s.weight, 0);
  const weights = activeTierWeights(method, advancedUnlocked);
  const tierTotal = TIER_ORDER.reduce((a, t) => a + weights[t], 0);

  const pTierAbove = (minTier: StatTier) =>
    TIER_ORDER.filter((t) => TIER_RANK[t] >= TIER_RANK[minTier]).reduce((a, t) => a + weights[t], 0) / tierTotal;

  let pLine: number;
  if (cond.kind === "stat") {
    const stat = statById(cond.statId);
    if (!stat || stat.slot !== ctx.slot) return { pPerRoll: 0, expectedRolls: Infinity, expectedHammers: Infinity };
    pLine = (stat.weight / total) * pTierAbove(cond.minTier);
  } else {
    const sFitWeight = pool
      .filter((s) => !isTrap(s, ctx) && s.fits[ctx.role] === "S")
      .reduce((a, s) => a + s.weight, 0);
    pLine = (sFitWeight / total) * pTierAbove("legendary");
  }

  const n = Math.max(1, unlockedCount);
  const pPerRoll = 1 - Math.pow(1 - pLine, n);
  if (pPerRoll <= 0) return { pPerRoll: 0, expectedRolls: Infinity, expectedHammers: Infinity };
  const expectedRolls = 1 / pPerRoll;
  const expectedHammers = expectedRolls * rollCost(method, LINES_PER_GEAR - n);
  return { pPerRoll, expectedRolls, expectedHammers };
}

export function autoRoll(
  startGear: GearRoll | null,
  ctx: ForgeContext,
  method: ReforgeMethod,
  advancedUnlocked: boolean,
  cond: RollCondition,
  rng: () => number = Math.random
): AutoResult {
  let gear = startGear ?? { lines: [] };
  // If the target is already live (even on a locked line), no hammers needed.
  const already = gear.lines.length === LINES_PER_GEAR ? conditionMet(gear, ctx, cond) : -1;
  if (already >= 0) return { gear, rolls: 0, hammers: 0, hit: true, hitLine: already };

  let hammers = 0;
  for (let r = 1; r <= REFORGE_ECONOMY.autoRollCap; r++) {
    const locks = lockedCount(gear);
    hammers += rollCost(method, locks);
    gear = rollGear(gear, ctx, method, advancedUnlocked, rng);
    const hitLine = conditionMet(gear, ctx, cond);
    if (hitLine >= 0) return { gear, rolls: r, hammers, hit: true, hitLine };
  }
  return { gear, rolls: REFORGE_ECONOMY.autoRollCap, hammers, hit: false, hitLine: -1 };
}

/* --------------------------- comparison --------------------------- */

export interface CompareRow {
  statId: string;
  name: string;
  from: number;
  to: number;
  delta: number;
  invert: boolean;
  trap: boolean;
}

export interface CompareResult {
  rows: CompareRow[];
  baseEffective: number;
  candEffective: number;
  effectiveDelta: number;
  badge: "UPGRADE" | "SIDEGRADE" | "DOWNGRADE";
}

const ROLE_WEIGHT: Record<Grade, number> = { S: 1, A: 0.8, B: 0.6, C: 0.35, F: 0 };

export function effectiveValue(line: RolledLine, ctx: ForgeContext): number {
  const stat = statById(line.statId);
  if (!stat) return 0;
  if (isTrap(stat, ctx)) return 0;
  return line.value * ROLE_WEIGHT[stat.fits[ctx.role]];
}

function aggregate(lines: RolledLine[], ctx: ForgeContext): Map<string, { sum: number; trap: boolean }> {
  const map = new Map<string, { sum: number; trap: boolean }>();
  for (const line of lines) {
    const stat = statById(line.statId);
    if (!stat) continue;
    const trap = isTrap(stat, ctx);
    const cur = map.get(stat.id) ?? { sum: 0, trap: false };
    if (!trap) cur.sum += line.value;
    cur.trap = cur.trap || trap;
    map.set(stat.id, cur);
  }
  return map;
}

export function compareGear(
  baseline: RolledLine[],
  candidate: RolledLine[],
  ctx: ForgeContext
): CompareResult {
  const baseAgg = aggregate(baseline, ctx);
  const candAgg = aggregate(candidate, ctx);
  const ids = new Set([...baseAgg.keys(), ...candAgg.keys()]);

  const rows: CompareRow[] = [];
  let allNonNegative = true;
  for (const id of ids) {
    const stat = statById(id);
    if (!stat) continue;
    const from = baseAgg.get(id)?.sum ?? 0;
    const to = candAgg.get(id)?.sum ?? 0;
    const delta = to - from;
    if (delta < 0) allNonNegative = false;
    rows.push({ statId: id, name: stat.name, from, to, delta, invert: !!stat.invert, trap: candAgg.get(id)?.trap || baseAgg.get(id)?.trap || false });
  }
  rows.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  const baseEffective = baseline.reduce((a, l) => a + effectiveValue(l, ctx), 0);
  const candEffective = candidate.reduce((a, l) => a + effectiveValue(l, ctx), 0);
  const effectiveDelta = candEffective - baseEffective;

  const badge = effectiveDelta > 0 && allNonNegative ? "UPGRADE" : effectiveDelta > 0 ? "SIDEGRADE" : "DOWNGRADE";
  return { rows, baseEffective, candEffective, effectiveDelta, badge };
}

/* ---------------------------- formatting -------------------------- */

export function fmtNum(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function fmtLineValue(stat: StatDef, line: RolledLine): string {
  const sign = stat.invert ? "−" : "+";
  return `${sign}${fmtNum(line.value)}%`;
}

export function fmtSigned(value: number): string {
  if (value === 0) return "±0%";
  return `${value > 0 ? "+" : "−"}${fmtNum(Math.abs(value))}%`;
}

/** Real-world effort translation for the hammer ledger. */
export function hammerTranslation(hammers: number): string {
  const perWeek = REFORGE_ECONOMY.arcadianHammersPerWeek;
  if (hammers <= 0) return "no hammers burned yet — the forge is patient";
  const weeks = Math.floor(hammers / perWeek);
  const days = Math.round(((hammers % perWeek) / perWeek) * 7);
  if (weeks === 0 && days === 0) return "under a day of Arcadian Conquest store income";
  if (weeks === 0) return `about ${days} day${days === 1 ? "" : "s"} of Arcadian Conquest store income`;
  const weeksPart = `${weeks} consecutive week${weeks === 1 ? "" : "s"}`;
  const daysPart = days > 0 ? ` and ${days} day${days === 1 ? "" : "s"}` : "";
  return `clearing the Arcadian Conquest store for ${weeksPart}${daysPart}`;
}

export const ALL_STAT_COUNT = STAT_DEFS.length;
