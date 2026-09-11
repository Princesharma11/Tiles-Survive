import type { IconName } from "@/components/ui/icons";

export type Feature = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  meta: string;
  status: "LIVE" | "BETA";
  icon: IconName;
  href: string;
  accent: "gold" | "ember" | "mint";
};

/**
 * The three flagship tools featured in the interactive grid.
 */
export const features: Feature[] = [
  {
    id: "war-room",
    index: "01",
    title: "Arcadian War Room",
    tagline: "Plan the rally before the rally.",
    description:
      "Command-grade planning for Arcadian Conquest and cross-State warfare. Plot marches on a live tile grid, assign officer roles, and war-game every approach before you commit a single troop.",
    bullets: [
      "Rally timeline simulator",
      "Garrison & officer role sync",
      "Shareable battle-plan codes",
    ],
    meta: "12,400+ plans filed this season",
    status: "LIVE",
    icon: "radar",
    href: "/war-room",
    accent: "gold",
  },
  {
    id: "troop-ratio",
    index: "02",
    title: "Troop Ratio Optimizer",
    tagline: "Solve the Guards / Gunners / Marksmen triangle.",
    description:
      "Feed in your barracks and get the counter-proof split your march actually needs. No more 100%-Guard coin flips getting shredded by a balanced Gunner-Marksman wall.",
    bullets: [
      "45/35/20 consensus baseline presets",
      "Faction-aligned hero pairing (Stalwart → Rover)",
      "Counter-matrix combat simulator",
    ],
    meta: "Counter math overrides raw power",
    status: "LIVE",
    icon: "sliders",
    href: "/hero-meta-calc",
    accent: "ember",
  },
  {
    id: "gear-reforge",
    index: "03",
    title: "Gear Reforge Simulator",
    tagline: "Chief Gear compounds. Reforge blind and it shows.",
    description:
      "Chief Gear boosts every hero you field — a bad roll hurts account-wide. Test substat rolls across white-to-legendary quality tiers before you spend a single alloy.",
    bullets: [
      "Full reforge odds table",
      "Quality-tier breakpoint planner",
      "Save & compare roll sets",
    ],
    meta: "Simulated 2.1M reforges and counting",
    status: "BETA",
    icon: "anvil",
    href: "/gear-reforge",
    accent: "mint",
  },
];
