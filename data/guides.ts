import type { IconName } from "@/components/ui/icons";

export type Guide = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: GuideCategory;
  level: "RECRUIT" | "VETERAN" | "COMMANDER";
  readTime: string;
  updated: string;
  icon: IconName;
  /** Scene art cropped from official key art */
  image: string;
};

export type GuideCategory =
  | "Beginner"
  | "Troops"
  | "Heroes"
  | "Gear"
  | "Alliance"
  | "Events";

export const guideCategories: GuideCategory[] = [
  "Beginner",
  "Troops",
  "Heroes",
  "Gear",
  "Alliance",
  "Events",
];

const IMG = {
  plains: "/world/scene-village.webp",
  island: "/world/scene-island.webp",
  archipelago: "/world/scene-archipelago.webp",
  snow: "/world/scene-snow.webp",
  furnace: "/world/scene-furnace.webp",
} as const;

/**
 * The Survival Codex — guide catalog over real world scenes.
 */
export const guides: Guide[] = [
  {
    id: "g1",
    slug: "first-7-days",
    title: "The First 7 Days: Fog, Power & Food",
    excerpt:
      "The opening week decides your ceiling. Clear fog in rings, keep the Power Plant one upgrade ahead, and never let a survivor sit idle.",
    category: "Beginner",
    level: "RECRUIT",
    readTime: "12 min",
    updated: "Sep 15, 2026",
    icon: "layers",
    image: IMG.archipelago,
  },
  {
    id: "g2",
    slug: "march-math-40-30-30",
    title: "March Math: The 40/30/30 Doctrine",
    excerpt:
      "Guards eat damage, Gunners grind the midline, Marksmen burst from the back. The proven competitive split — and when to break it on purpose.",
    category: "Troops",
    level: "VETERAN",
    readTime: "18 min",
    updated: "Sep 15, 2026",
    icon: "swords",
    image: IMG.plains,
  },
  {
    id: "g3",
    slug: "faction-matching-full-map",
    title: "Faction Matching: Stalwart to Rover, Fully Mapped",
    excerpt:
      "Stalwart beats Aeronaut beats Mariner beats Rover beats Stalwart. A matched hero leading matching troops stacks stats — the full cycle map inside.",
    category: "Heroes",
    level: "VETERAN",
    readTime: "15 min",
    updated: "Sep 15, 2026",
    icon: "shield",
    image: IMG.snow,
  },
  {
    id: "g4",
    slug: "behemoth-slot-cooldowns",
    title: "Behemoth Slot Math: Cooldowns Beat Stat Lines",
    excerpt:
      "Your Behemoth is a fifth squad member that reshapes combat tempo through skill cooldown reduction. We simulated 40k fights to prove the curve.",
    category: "Heroes",
    level: "COMMANDER",
    readTime: "20 min",
    updated: "Sep 15, 2026",
    icon: "zap",
    image: IMG.furnace,
  },
  {
    id: "g5",
    slug: "chief-gear-reforge-discipline",
    title: "Chief Gear Reforge: When to Lock a Substat",
    excerpt:
      "Account-wide gear means a greedy reroll taxes every hero you own. The exact quality-tier breakpoints where locking beats gambling.",
    category: "Gear",
    level: "COMMANDER",
    readTime: "14 min",
    updated: "Sep 15, 2026",
    icon: "anvil",
    image: IMG.furnace,
  },
  {
    id: "g6",
    slug: "rally-etiquette",
    title: "Rally Etiquette: Don't Get Muted in State Chat",
    excerpt:
      "Rally caps, join windows, reinforce priority — and the six messages that get officers demoted. A survival guide for alliance politics.",
    category: "Alliance",
    level: "RECRUIT",
    readTime: "9 min",
    updated: "Sep 15, 2026",
    icon: "users",
    image: IMG.plains,
  },
  {
    id: "g7",
    slug: "event-calendar-compounding",
    title: "Oil Clash → Arcadian Conquest: The Compounding Calendar",
    excerpt:
      "Oil Clash, Turbulent Tides, Arcadian Conquest — each rewards different spending. Bank resources 30–60 days out and every window compounds.",
    category: "Events",
    level: "COMMANDER",
    readTime: "22 min",
    updated: "Sep 15, 2026",
    icon: "clock",
    image: IMG.island,
  },
  {
    id: "g8",
    slug: "f2p-gem-flow",
    title: "F2P Gem Flow: Where Every Diamond Goes",
    excerpt:
      "The zero-spend gem pipeline, ranked by return per diamond. Spoiler: it isn't the recruitment banner you think.",
    category: "Beginner",
    level: "RECRUIT",
    readTime: "10 min",
    updated: "Sep 15, 2026",
    icon: "trophy",
    image: IMG.snow,
  },
];
