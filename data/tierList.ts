export type HeroRole = "Damage" | "Tank" | "Support" | "Tactics";
export type Tier = "S" | "A" | "B";

export type HeroEntry = {
  name: string;
  tier: Tier;
  role: HeroRole;
  score: number; // meta score 0–100
  note: string;
  faction?: "Stalwart" | "Aeronaut" | "Mariner" | "Rover";
};

/**
 * Community-consensus meta board (draft v6.2).
 * S-tier core reflects current community consensus picks.
 */
export const tierBoard: HeroEntry[] = [
  {
    name: "Nikola",
    tier: "S",
    role: "Damage",
    score: 96,
    note: "Consensus #1 carry. Scales with enemy density.",
    faction: "Aeronaut",
  },
  {
    name: "Layla",
    tier: "S",
    role: "Support",
    score: 94,
    note: "Best all-around support. Warps rally math.",
    faction: "Stalwart",
  },
  {
    name: "Rosie",
    tier: "S",
    role: "Damage",
    score: 92,
    note: "Frontline shredder. Pairs with any Guard wall.",
    faction: "Mariner",
  },
  {
    name: "Tarzan",
    tier: "S",
    role: "Tank",
    score: 90,
    note: "Anchor for garrison defense compositions.",
    faction: "Rover",
  },
  {
    name: "Tara",
    tier: "S",
    role: "Tactics",
    score: 88,
    note: "Cooldown tempo engine for Behemoth lineups.",
  },
];

export const pendingIntel: { tier: Tier; slots: number }[] = [
  { tier: "A", slots: 4 },
  { tier: "B", slots: 4 },
];
