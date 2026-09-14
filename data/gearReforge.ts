import type { HeroClass, HeroFaction } from "./heroMeta";

/* ------------------------------------------------------------------ */
/*  Hero Gear Reforge — data layer                                     */
/*  Grounded in Tiles Survive! systems: Alloy (Legendary) gear gains   */
/*  three Special Stat slots at 2★/4★/6★, rerolled with Reforge        */
/*  Hammers (Standard vs Advanced). Pools are slot-locked: Helmet =   */
/*  Attack & Damage, Armor = Defense/Cooldown/DR, Greaves = HP/Heal.  */
/* ------------------------------------------------------------------ */

export type GearSlotId = "helmet" | "armor" | "greaves";
/** Special-stat quality tiers (in-game: Common / Exquisite / Epic / Legendary). */
export type StatTier = "common" | "exquisite" | "epic" | "legendary";
export type HeroRole = "Tank" | "DPS" | "Support";
export type Grade = "S" | "A" | "B" | "C" | "F";

export interface StatDef {
  id: string;
  name: string;
  slot: GearSlotId;
  /** drop weight within the slot pool */
  weight: number;
  /** roll value range per tier, stepped by 0.5 (percent stats) */
  ranges: Record<StatTier, [number, number]>;
  /** role fit when faction/troop tags match (or when untagged) */
  fits: Record<HeroRole, Grade>;
  /** faction-locked stat — 0% (trap) for every other faction */
  faction?: HeroFaction;
  /** troop-locked stat — 0% (trap) for every other troop type */
  troop?: HeroClass;
  /** the endgame chase stat for this pool */
  jackpot?: boolean;
  /** cooldown-style stat: magnitude stored positive, shown as −X% */
  invert?: boolean;
  note: string;
}

/* ----------------------------- Tiers ------------------------------ */

export const TIER_ORDER: StatTier[] = ["common", "exquisite", "epic", "legendary"];

export const STAT_TIER_META: Record<
  StatTier,
  { label: string; chip: string; dot: string; mult: number }
> = {
  common: {
    label: "Common",
    chip: "border-[#3e8e41]/70 bg-[#3e8e41]/10 text-[#33691e]",
    dot: "#3e8e41",
    mult: 0.55,
  },
  exquisite: {
    label: "Exquisite",
    chip: "border-river/70 bg-river/10 text-river",
    dot: "#3d9bd1",
    mult: 0.7,
  },
  epic: {
    label: "Epic",
    chip: "border-[#8e5ac8]/70 bg-[#8e5ac8]/10 text-[#8e5ac8]",
    dot: "#8e5ac8",
    mult: 0.85,
  },
  legendary: {
    label: "Legendary",
    chip: "border-ink bg-gradient-to-b from-gold to-flame text-ink shadow-[0_2px_0_0_#2d2a26]",
    dot: "#f6c445",
    mult: 1,
  },
};

/** Standard reforge tier weights (%). */
export const TIER_WEIGHTS: Record<StatTier, number> = {
  common: 55,
  exquisite: 28,
  epic: 13,
  legendary: 4,
};

/** Advanced reforge — Epic & Legendary only. */
export const ADVANCED_TIER_WEIGHTS: Record<StatTier, number> = {
  common: 0,
  exquisite: 0,
  epic: 72,
  legendary: 28,
};

/* ----------------------------- Slots ------------------------------ */

export const GEAR_SLOTS: Record<
  GearSlotId,
  { label: string; icon: string; pool: string; note: string }
> = {
  helmet: {
    label: "Helmet",
    icon: "⛑️",
    pool: "Attack & Damage",
    note: "Rolls from the Attack & Damage pool — the DPS priority slot.",
  },
  armor: {
    label: "Armor / Vest",
    icon: "🦺",
    pool: "Defense · Cooldown · DR",
    note: "Rolls from the Defense, Cooldown & Damage Reduction pool.",
  },
  greaves: {
    label: "Greaves / Pants",
    icon: "🥾",
    pool: "Health · Healing · Aura",
    note: "Rolls from the Health, Healing & Global Buff pool.",
  },
};

export const GEAR_SLOT_ORDER: GearSlotId[] = ["helmet", "armor", "greaves"];

/* ---------------------------- Economy ----------------------------- */

export const REFORGE_ECONOMY = {
  /** Standard reforge: 1 hammer, all tiers */
  standardBase: 1,
  /** Advanced reforge: 25 hammers, Epic & Legendary only */
  advancedBase: 25,
  /** cost multiplier per locked line — 0, 1 or 2 locks (3 lines total) */
  lockMultipliers: [1, 4, 16] as const,
  maxLocks: 2,
  /** Advanced reforge unlocks after this many hammers spent collectively */
  advancedUnlockAt: 200,
  /** Arcadian Conquest store clears to roughly this many hammers a week */
  arcadianHammersPerWeek: 150,
  /** safety cap for targeted auto-roll */
  autoRollCap: 400,
  /** cumulative hammers that trigger the sunk-cost warning while 2 lines are locked */
  sunkWarnThreshold: 1000,
} as const;

/* ----------------------------- Roles ------------------------------ */

export const ROLE_META: Record<HeroRole, { icon: string; blurb: string }> = {
  Tank: { icon: "🛡️", blurb: "Soak burst — Defense, DR, HP." },
  DPS: { icon: "⚔️", blurb: "Delete marches — Attack, Damage." },
  Support: { icon: "💚", blurb: "Keep the line alive — Heal, Cooldown." },
};

export const ROLE_ORDER: HeroRole[] = ["Tank", "DPS", "Support"];

/** Rank used for scoring: fit × tier multiplier. */
export const GRADE_RANK: Record<Grade, number> = { S: 1, A: 0.82, B: 0.62, C: 0.38, F: 0 };

/* --------------------------- Stat pools --------------------------- */

const FACTIONS: HeroFaction[] = ["Stalwart", "Aeronaut", "Mariner", "Rover"];
const TROOPS: HeroClass[] = ["Guard", "Gunner", "Marksman"];

const ATTACK_FITS: Record<HeroRole, Grade> = { DPS: "S", Tank: "B", Support: "C" };
const DEFENSE_FITS: Record<HeroRole, Grade> = { Tank: "S", DPS: "C", Support: "B" };
const TANKY_FITS: Record<HeroRole, Grade> = { Tank: "S", DPS: "B", Support: "B" };
const HP_FITS: Record<HeroRole, Grade> = { Tank: "S", DPS: "B", Support: "A" };

const ATK_RANGE: Record<StatTier, [number, number]> = {
  common: [3, 5],
  exquisite: [6, 8],
  epic: [9, 11],
  legendary: [12, 15],
};
const FACTION_ATK_RANGE: Record<StatTier, [number, number]> = {
  common: [4, 6],
  exquisite: [7, 9],
  epic: [10, 12],
  legendary: [13, 17],
};

const helmetStats: StatDef[] = [
  {
    id: "atk-pct",
    name: "Attack %",
    slot: "helmet",
    weight: 26,
    ranges: ATK_RANGE,
    fits: ATTACK_FITS,
    note: "Raw ATK for the whole march — the bread-and-butter DPS line.",
  },
  {
    id: "dmg-bonus",
    name: "Damage Bonus",
    slot: "helmet",
    weight: 8,
    ranges: { common: [2, 3], exquisite: [4, 6], epic: [7, 9], legendary: [10, 14] },
    fits: { DPS: "S", Tank: "C", Support: "C" },
    jackpot: true,
    note: "All damage dealt, flat. The helmet jackpot — pure DPS gold.",
  },
  ...FACTIONS.map<StatDef>((f) => ({
    id: `faction-atk-${f.toLowerCase()}`,
    name: `${f} Faction Attack`,
    slot: "helmet" as const,
    weight: 9,
    ranges: FACTION_ATK_RANGE,
    fits: ATTACK_FITS,
    faction: f,
    note: `Only applies to ${f} heroes — 0% synergy for every other faction.`,
  })),
  ...TROOPS.map<StatDef>((t) => ({
    id: `troop-atk-${t.toLowerCase()}`,
    name: `${t} Attack`,
    slot: "helmet" as const,
    weight: 9,
    ranges: FACTION_ATK_RANGE,
    fits: ATTACK_FITS,
    troop: t,
    note: `Only applies to ${t} troops — 0% synergy for every other troop type.`,
  })),
];

const armorStats: StatDef[] = [
  {
    id: "def-pct",
    name: "Defense %",
    slot: "armor",
    weight: 26,
    ranges: ATK_RANGE,
    fits: { Tank: "S", DPS: "B", Support: "B" },
    note: "Raw DEF for the whole march — the frontline staple.",
  },
  {
    id: "dmg-reduction",
    name: "Damage Reduction",
    slot: "armor",
    weight: 8,
    ranges: { common: [1, 2], exquisite: [2.5, 3.5], epic: [4, 5], legendary: [6, 8] },
    fits: TANKY_FITS,
    jackpot: true,
    note: "Damage taken reduced flat — the armor jackpot. Tanks live for it.",
  },
  {
    id: "skill-cd",
    name: "Active Skill Cooldown",
    slot: "armor",
    weight: 8,
    ranges: { common: [2, 3], exquisite: [4, 6], epic: [8, 10], legendary: [12, 15] },
    fits: { Support: "S", DPS: "A", Tank: "A" },
    jackpot: true,
    invert: true,
    note: "−X% skill cooldown — more ults, more uptime. Legendary hits −15%.",
  },
  ...FACTIONS.map<StatDef>((f) => ({
    id: `faction-def-${f.toLowerCase()}`,
    name: `${f} Faction Defense`,
    slot: "armor" as const,
    weight: 7,
    ranges: FACTION_ATK_RANGE,
    fits: DEFENSE_FITS,
    faction: f,
    note: `Only applies to ${f} heroes — 0% synergy for every other faction.`,
  })),
  ...TROOPS.map<StatDef>((t) => ({
    id: `troop-def-${t.toLowerCase()}`,
    name: `${t} Defense`,
    slot: "armor" as const,
    weight: 7,
    ranges: FACTION_ATK_RANGE,
    fits: DEFENSE_FITS,
    troop: t,
    note: `Only applies to ${t} troops — 0% synergy for every other troop type.`,
  })),
];

const greavesStats: StatDef[] = [
  {
    id: "hp-pct",
    name: "HP %",
    slot: "greaves",
    weight: 26,
    ranges: ATK_RANGE,
    fits: HP_FITS,
    note: "Raw HP for the whole march — nobody says no to HP.",
  },
  {
    id: "healing-bonus",
    name: "Healing Bonus",
    slot: "greaves",
    weight: 10,
    ranges: { common: [3, 5], exquisite: [6, 8], epic: [9, 12], legendary: [13, 16] },
    fits: { Support: "S", Tank: "B", DPS: "C" },
    jackpot: true,
    note: "Amplifies every heal — the sustain jackpot for healers.",
  },
  ...FACTIONS.map<StatDef>((f) => ({
    id: `faction-hp-${f.toLowerCase()}`,
    name: `${f} Faction HP`,
    slot: "greaves" as const,
    weight: 8,
    ranges: FACTION_ATK_RANGE,
    fits: HP_FITS,
    faction: f,
    note: `Only applies to ${f} heroes — 0% synergy for every other faction.`,
  })),
  {
    id: "squad-atk-aura",
    name: "Squad Attack Aura",
    slot: "greaves",
    weight: 4,
    ranges: { common: [1, 1.5], exquisite: [2, 3], epic: [3.5, 4.5], legendary: [5, 7] },
    fits: { DPS: "S", Tank: "B", Support: "A" },
    jackpot: true,
    note: "Global buff — boosts the whole squad's attack. Rarest greaves line.",
  },
  {
    id: "squad-hp-aura",
    name: "Squad HP Aura",
    slot: "greaves",
    weight: 4,
    ranges: { common: [1, 1.5], exquisite: [2, 3], epic: [3.5, 4.5], legendary: [5, 7] },
    fits: HP_FITS,
    note: "Global buff — boosts the whole squad's HP.",
  },
];

export const STAT_DEFS: StatDef[] = [...helmetStats, ...armorStats, ...greavesStats];

export const POOL_BY_SLOT: Record<GearSlotId, StatDef[]> = {
  helmet: helmetStats,
  armor: armorStats,
  greaves: greavesStats,
};

const statIndex = new Map(STAT_DEFS.map((s) => [s.id, s]));

export function statById(id: string): StatDef | undefined {
  return statIndex.get(id);
}

/** Total weight of a slot pool (for drop-% display). */
export function poolWeight(slot: GearSlotId): number {
  return POOL_BY_SLOT[slot].reduce((sum, s) => sum + s.weight, 0);
}

/** Reference-table rows: faction/troop variants collapsed into one row. */
export interface ReferenceRow {
  key: string;
  name: string;
  note: string;
  /** chance per roll (single variant) */
  chance: number;
  ranges: Record<StatTier, [number, number]>;
  fits: Record<HeroRole, Grade>;
  tagged: boolean;
  jackpot: boolean;
  invert: boolean;
}

const FACTION_PREFIX = /^(Stalwart|Aeronaut|Mariner|Rover)\s+/;
const TROOP_PREFIX = /^(Guard|Gunner|Marksman)\s+/;

export function referenceRows(slot: GearSlotId): ReferenceRow[] {
  const total = poolWeight(slot);
  const rows: ReferenceRow[] = [];
  const seenGroups = new Set<string>();

  for (const stat of POOL_BY_SLOT[slot]) {
    if (stat.faction || stat.troop) {
      const kind = stat.faction ? "Faction" : "Troop";
      const group = stat.id.split("-").slice(0, 2).join("-"); // e.g. faction-atk, troop-def
      if (seenGroups.has(group)) continue;
      seenGroups.add(group);
      const base = stat.name
        .replace(FACTION_PREFIX, "")
        .replace(TROOP_PREFIX, "")
        .replace(/^Faction\s+/, "");
      const suffix = stat.faction ? FACTIONS.join(" / ") : TROOPS.join(" / ");
      rows.push({
        key: group,
        name: `${base} (${suffix})`,
        note: stat.note,
        chance: stat.weight / total,
        ranges: stat.ranges,
        fits: stat.fits,
        tagged: true,
        jackpot: false,
        invert: false,
      });
    } else {
      rows.push({
        key: stat.id,
        name: stat.name,
        note: stat.note,
        chance: stat.weight / total,
        ranges: stat.ranges,
        fits: stat.fits,
        tagged: false,
        jackpot: !!stat.jackpot,
        invert: !!stat.invert,
      });
    }
  }
  return rows;
}
