/* ------------------------------------------------------------------ */
/*  Troop Ratio Optimizer — algorithmic engine (pure functions)        */
/*                                                                     */
/*  Core mechanics (Tiles Survive! rock-paper-scissors):               */
/*    Guards   ▸ counter Marksmen                                      */
/*    Marksmen ▸ counter Gunners                                       */
/*    Gunners  ▸ counter Guards                                        */
/*                                                                     */
/*  Blueprint rules implemented:                                       */
/*   • Baseline rule  → balanced/unknown enemy ⇒ 40G / 30U / 30M       */
/*   • Counter-weight → our comp mirrors the enemy threat              */
/*       (e.g. enemy 60% Gunners ⇒ 20G / 20U / 60M)                    */
/*   • Frontline cap  → NEVER below 20% Guards (15–20% safety band)    */
/*   • Any single type is capped at 60% (no all-in coin flips)         */
/* ------------------------------------------------------------------ */

export type TroopType = "guards" | "gunners" | "marksmen";
export type Comp = Record<TroopType, number>; // percentages 0–100

export type Faction = "stalwart" | "aeronaut" | "mariner" | "rover";

export const TROOPS: Record<
  TroopType,
  { label: string; icon: string; color: string; counters: TroopType }
> = {
  guards: { label: "Guards", icon: "🛡️", color: "#3d9bd1", counters: "marksmen" },
  gunners: { label: "Gunners", icon: "🔫", color: "#f07d2e", counters: "guards" },
  marksmen: { label: "Marksmen", icon: "🎯", color: "#ed5ca8", counters: "gunners" },
};

export const FACTIONS: Record<
  Faction | "unknown",
  { label: string; icon: string; color: string }
> = {
  unknown: { label: "Unknown", icon: "❓", color: "#a39585" },
  stalwart: { label: "Stalwart", icon: "⛰️", color: "#f6c445" },
  aeronaut: { label: "Aeronaut", icon: "✈️", color: "#f07d2e" },
  mariner: { label: "Mariner", icon: "⚓", color: "#3d9bd1" },
  rover: { label: "Rover", icon: "🛻", color: "#6fae3e" },
};

/** key counters value — Stalwart ▸ Aeronaut ▸ Mariner ▸ Rover ▸ Stalwart */
const FACTION_COUNTERS: Record<Faction, Faction> = {
  stalwart: "aeronaut",
  aeronaut: "mariner",
  mariner: "rover",
  rover: "stalwart",
};

export function counterFaction(enemy: Faction): Faction {
  return (
    (Object.keys(FACTION_COUNTERS) as Faction[]).find(
      (k) => FACTION_COUNTERS[k] === enemy
    ) ?? "stalwart"
  );
}

/* --------------------------- constants ---------------------------- */

export const BASELINE: Comp = { guards: 40, gunners: 30, marksmen: 30 };
export const GUARD_FLOOR = 20; // frontline protection limit
export const TYPE_CAP = 60; // no all-in marches
const COUNTER_BONUS = 0.2; // +20% damage on counter matchups
const FACTION_BONUS = 0.15; // +15% faction damage

/* --------------------------- helpers ------------------------------ */

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

function normalizePct(comp: Comp): Comp {
  const sum = comp.guards + comp.gunners + comp.marksmen;
  if (sum <= 0) return { guards: 100 / 3, gunners: 100 / 3, marksmen: 100 / 3 };
  return {
    guards: (comp.guards / sum) * 100,
    gunners: (comp.gunners / sum) * 100,
    marksmen: (comp.marksmen / sum) * 100,
  };
}

/** Round percentages to integers that sum to exactly 100 (largest remainder). */
function roundComp(comp: Comp): Comp {
  const entries = (Object.keys(comp) as TroopType[]).map((t) => ({
    t,
    exact: comp[t],
    floor: Math.floor(comp[t]),
  }));
  let left = 100 - entries.reduce((s, e) => s + e.floor, 0);
  const order = [...entries].sort((a, b) => b.exact - a.exact);
  const out = {} as Comp;
  for (const e of entries) out[e.t] = e.floor;
  for (let i = 0; left > 0; i = (i + 1) % order.length) {
    out[order[i].t] += 1;
    left -= 1;
  }
  return out;
}

/** Apply the frontline floor + per-type cap, redistributing the overflow. */
function enforceConstraints(comp: Comp): Comp {
  const pct = normalizePct(comp);
  let next = { ...pct };

  // 1) frontline floor
  if (next.guards < GUARD_FLOOR) {
    const deficit = GUARD_FLOOR - next.guards;
    next.guards = GUARD_FLOOR;
    const rest = next.gunners + next.marksmen;
    if (rest > 0) {
      next.gunners -= deficit * (next.gunners / rest);
      next.marksmen -= deficit * (next.marksmen / rest);
    } else {
      next.gunners = (100 - GUARD_FLOOR) / 2;
      next.marksmen = (100 - GUARD_FLOOR) / 2;
    }
  }

  // 2) per-type cap → push overflow to the other types (proportional)
  for (let pass = 0; pass < 4; pass++) {
    const over = (Object.keys(next) as TroopType[]).filter(
      (t) => next[t] > TYPE_CAP + 0.01
    );
    if (over.length === 0) break;
    for (const t of over) {
      const excess = next[t] - TYPE_CAP;
      next[t] = TYPE_CAP;
      const others = (Object.keys(next) as TroopType[]).filter((o) => o !== t);
      const rest = others.reduce((s, o) => s + next[o], 0);
      for (const o of others) {
        next[o] += rest > 0 ? excess * (next[o] / rest) : excess / others.length;
      }
    }
  }

  // 3) floors may have been squeezed — final guard pass
  if (next.guards < GUARD_FLOOR) {
    const deficit = GUARD_FLOOR - next.guards;
    next.guards = GUARD_FLOOR;
    const others = ["gunners", "marksmen"] as TroopType[];
    const rest = others.reduce((s, o) => s + Math.max(0, next[o] - 5), 0);
    for (const o of others) {
      const take = rest > 0 ? deficit * ((next[o] - 5) / rest) : deficit / 2;
      next[o] = Math.max(5, next[o] - take);
    }
  }

  return normalizePct(next);
}

/* ------------------------- main engine ---------------------------- */

export interface OptimizerResult {
  mode: "baseline" | "counter";
  /** enemy deviation from perfect balance (0–66.7) */
  threatDeviation: number;
  /** recommended % split (integers, sum = 100) */
  percent: Comp;
  /** exact troop counts for the given march capacity (null if capacity 0) */
  counts: Comp | null;
  /** % of our march fighting a counter matchup */
  counterCoverage: number;
  /** counter coverage if the player just ran the baseline instead */
  baselineCoverage: number;
  /** expected damage multiplier bonus, e.g. 0.088 → "+8.8%" */
  expectedBonusPct: number;
  /** dominant troop type of the recommendation */
  dominant: TroopType;
  /** human-readable threat read */
  threatRead: string;
}

export function computeRecommendation(
  enemy: Comp,
  capacity: number
): OptimizerResult {
  const e = normalizePct(enemy);
  const deviation = Math.max(
    Math.abs(e.guards - 100 / 3),
    Math.abs(e.gunners - 100 / 3),
    Math.abs(e.marksmen - 100 / 3)
  );

  // our X counters enemy Y: G→their M, U→their G, M→their U
  const mirror: Comp = {
    guards: e.marksmen,
    gunners: e.guards,
    marksmen: e.gunners,
  };

  const balanced = deviation <= 5;
  const alpha = clamp((deviation - 5) / 20, 0, 1); // 0 = baseline, 1 = full mirror

  const raw: Comp = balanced
    ? { ...BASELINE }
    : {
        guards: BASELINE.guards * (1 - alpha) + mirror.guards * alpha,
        gunners: BASELINE.gunners * (1 - alpha) + mirror.gunners * alpha,
        marksmen: BASELINE.marksmen * (1 - alpha) + mirror.marksmen * alpha,
      };

  const constrained = enforceConstraints(raw);
  const percent = roundComp(constrained);

  const coverage = (c: Comp) =>
    (c.guards * e.marksmen + c.gunners * e.guards + c.marksmen * e.gunners) /
    100;

  const counterCoverage = coverage(percent);
  const baselineCoverage = coverage(BASELINE);

  let counts: Comp | null = null;
  if (capacity > 0) {
    const exact = {
      guards: (percent.guards / 100) * capacity,
      gunners: (percent.gunners / 100) * capacity,
      marksmen: (percent.marksmen / 100) * capacity,
    };
    const floored = {
      guards: Math.floor(exact.guards),
      gunners: Math.floor(exact.gunners),
      marksmen: Math.floor(exact.marksmen),
    };
    let left = capacity - (floored.guards + floored.gunners + floored.marksmen);
    const order = (Object.keys(exact) as TroopType[]).sort(
      (a, b) => exact[b] - exact[a]
    );
    for (let i = 0; left > 0; i = (i + 1) % order.length) {
      floored[order[i]] += 1;
      left -= 1;
    }
    counts = floored;
  }

  const dominant = (Object.keys(percent) as TroopType[]).reduce((a, b) =>
    percent[b] > percent[a] ? b : a
  );

  const top = (Object.keys(e) as TroopType[]).reduce((a, b) =>
    e[b] > e[a] ? b : a
  );
  const threatRead = balanced
    ? "Enemy spread is even (or unknown) — running the universally safe baseline with a reinforced frontline."
    : `Enemy is ${Math.round(e[top])}% ${TROOPS[top].label}-heavy — we answer with ${
        TROOPS[TROOPS[top].counters].label
      }${alpha < 1 ? " (softened toward baseline)" : ""}.`;

  return {
    mode: balanced ? "baseline" : "counter",
    threatDeviation: deviation,
    percent,
    counts,
    counterCoverage,
    baselineCoverage,
    expectedBonusPct: counterCoverage * COUNTER_BONUS * 100,
    dominant,
    threatRead,
  };
}

/* ----------------------- hero pairing data ------------------------ */

export interface HeroSuggestion {
  name: string;
  portrait: string;
  role: string;
  why: string;
}

export const HERO_PAIRINGS: Record<
  TroopType,
  { lead: HeroSuggestion; support: HeroSuggestion; note: string }
> = {
  guards: {
    lead: {
      name: "Nikola",
      portrait: "/heroes/nikola.webp",
      role: "Frontline Fortress",
      why: "Electric barriers + self-shields make him the unbreakable wall every Guard march is built around.",
    },
    support: {
      name: "Layla",
      portrait: "/heroes/layla.webp",
      role: "Sustain Engine",
      why: "Premium healer throughput — the Nikola + Layla core is the classic impenetrable frontline.",
    },
    note: "Guard marches win by outlasting: stack DEF (Tara) and healing, extend the fight, win the war of attrition.",
  },
  gunners: {
    lead: {
      name: "Tara",
      portrait: "/heroes/tara.webp",
      role: "Keystone Support",
      why: "Global DEF buff + shields keep the gun line standing while their counters shred the enemy Guards.",
    },
    support: {
      name: "Layla",
      portrait: "/heroes/layla.webp",
      role: "Sustain Engine",
      why: "Covers the fragile midline while Gunners melt whatever walks into them.",
    },
    note: "The meta '4 Guards + 1 Gunner' comp runs through Tara — she is the keystone that makes it work.",
  },
  marksmen: {
    lead: {
      name: "Becca",
      portrait: "/heroes/becca.webp",
      role: "Apex Burst Sniper",
      why: "Rail line shreds defense through every aligned target — apex execution power.",
    },
    support: {
      name: "Kiki",
      portrait: "/heroes/kiki.webp",
      role: "Piercing Wave-Clear",
      why: "Laser bursts delete packed waves — screen her wind-up behind a Guard wall.",
    },
    note: "Marksman-heavy marches are glass cannons: burst the backline first, and always screen with Guards.",
  },
};

export const FACTION_BONUS_PCT = FACTION_BONUS * 100; // 15
export { COUNTER_BONUS, FACTION_BONUS };
