export type Feature = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  meta: string;
  status: "LIVE" | "BETA";
  image: string;
  imageAlt: string;
  chipColor: string;
  href: string;
};

/**
 * The three flagship tools — each anchored to a real corner of the game world.
 */
export const features: Feature[] = [
  {
    id: "war-room",
    index: "01",
    title: "Arcadian War Room",
    tagline: "Plan the rally before the rally.",
    description:
      "Command-grade planning for Arcadian Conquest and cross-State wars. Plot marches across the tile map, assign officer roles, and war-game every approach before a single troop marches.",
    bullets: [
      "Rally timeline simulator",
      "Garrison & officer role sync",
      "Shareable battle-plan codes",
    ],
    meta: "12,400+ plans filed this season",
    status: "LIVE",
    image: "/world/scene-island.webp",
    imageAlt: "Floating tile island high above the frontier",
    chipColor: "#3d9bd1",
    href: "/war-room",
  },
  {
    id: "troop-ratio",
    index: "02",
    title: "Troop Ratio Optimizer",
    tagline: "Solve the Guards · Gunners · Marksmen triangle.",
    description:
      "Input the enemy scout report — the engine mirrors their threat across the counter triangle and outputs exact troop counts, expected counter damage and hero pairings. Live now.",
    bullets: [
      "40/30/30 baseline autopilot",
      "Counter-mirror engine (live)",
      "Faction + hero pairing alerts",
    ],
    meta: "Scout report in — march plan out",
    status: "LIVE",
    image: "/world/scene-village.webp",
    imageAlt: "A scout overlooking the tile valley settlement",
    chipColor: "#6fae3e",
    href: "/hero-meta-calc",
  },
  {
    id: "gear-reforge",
    index: "03",
    title: "Gear Reforge Simulator",
    tagline: "Chief Gear compounds — forge, don't gamble.",
    description:
      "Chief Gear boosts every hero you field, so a bad reroll taxes the whole account. Simulate Alloy reforge rolls, lock costs and trap-roll grades for every hero before you spend a single Reforge Hammer.",
    bullets: [
      "Infinite roll simulation + locks",
      "Trap-roll detector & role grades",
      "Hammer ledger & A/B stash",
    ],
    meta: "Full odds table · patch 2.6.0",
    status: "LIVE",
    image: "/world/scene-furnace.webp",
    imageAlt: "The settlement furnace blazing at the heart of the base",
    chipColor: "#f07d2e",
    href: "/gear-reforge",
  },
];
