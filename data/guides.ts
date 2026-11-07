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
  | "Events"
  | "Pets";

export const guideCategories: GuideCategory[] = [
  "Beginner",
  "Troops",
  "Heroes",
  "Gear",
  "Alliance",
  "Events",
  "Pets",
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
    title: "Tiles Survive First 7 Days: Fog, Power & Food",
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
    title: "Tiles Survive Troop Guide: The 40/30/30 Doctrine",
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
    title: "Tiles Survive Faction Guide: Every Counter Mapped",
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
    title: "Tiles Survive Behemoth Guide: Cooldowns Beat Stats",
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
    title: "Tiles Survive Reforge Guide: When to Lock a Substat",
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
    title: "Tiles Survive Rally Etiquette: Don't Get Muted",
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
    title: "Tiles Survive Event Guide: The Compounding Calendar",
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
    title: "Tiles Survive F2P Guide: Where Every Gem Goes",
    excerpt:
      "The zero-spend gem pipeline, ranked by return per diamond. Spoiler: it isn't the recruitment banner you think.",
    category: "Beginner",
    level: "RECRUIT",
    readTime: "10 min",
    updated: "Sep 15, 2026",
    icon: "trophy",
    image: IMG.snow,
  },
  {
    id: "g9",
    slug: "pet-system-guide",
    title: "Tiles Survive Pet Guide: Eggs, Marks & Best Pets",
    excerpt:
      "Seven companions, three egg tiers, one 100% transfer rate to chase. Hatch odds, Pet Marks math and the priority ladder — why Starhorn earns your first 700 marks.",
    category: "Pets",
    level: "VETERAN",
    readTime: "14 min",
    updated: "Oct 18, 2026",
    icon: "flame",
    image: IMG.snow,
  },
  {
    id: "g10",
    slug: "turbo-turtle-event-guide",
    title: "Tiles Survive Turbo Turtle Guide: Double-Dip Economy",
    excerpt:
      "The gear event that punishes impulse spenders. Bank scraps and speedups, burst the window, and turn one Alloy crate a week into a compounding gear engine.",
    category: "Events",
    level: "VETERAN",
    readTime: "11 min",
    updated: "Oct 18, 2026",
    icon: "anvil",
    image: IMG.furnace,
  },
  {
    id: "g11",
    slug: "skill-weapon-exchange-guide",
    title: "Tiles Survive Weapon Exchange Guide: 10 Free Swaps",
    excerpt:
      "Five weapon swaps, five skill swaps, fourteen days. Strip the bench and stack the main march — the rules, the lockouts and the exact swap order.",
    category: "Heroes",
    level: "VETERAN",
    readTime: "9 min",
    updated: "Oct 18, 2026",
    icon: "sliders",
    image: IMG.plains,
  },
  {
    id: "g12",
    slug: "hero-talents-guide",
    title: "Tiles Survive Hero Talents Guide: The Lv.4 Order",
    excerpt:
      "Lv.4 talents are a 25–35% multiplicative boost per hero — if you stop spreading materials. The core-five order, the farm channels, the paying windows.",
    category: "Heroes",
    level: "COMMANDER",
    readTime: "13 min",
    updated: "Oct 18, 2026",
    icon: "book",
    image: IMG.island,
  },
  {
    id: "g13",
    slug: "precision-blueprint-guide",
    title: "Tiles Survive Blueprint Guide: +7M Rally Power",
    excerpt:
      "The account-wide layer that adds up to 7 million rally power: five rarity tiers, promotion math, every free farm channel, and the Turbo Turtle rule for every burn.",
    category: "Gear",
    level: "COMMANDER",
    readTime: "12 min",
    updated: "Nov 8, 2026",
    icon: "crosshair",
    image: IMG.archipelago,
  },
  {
    id: "g14",
    slug: "arcadia-conquest-guide",
    title: "Tiles Survive Arcadia Conquest Guide: 90 Minutes to Governor",
    excerpt:
      "90 minutes of occupation wins the crown. Zone timelines, Pillbox tower math, three-track scoring, the hospital gambit and the tactics that let mid-spend alliances beat whales.",
    category: "Events",
    level: "COMMANDER",
    readTime: "16 min",
    updated: "Nov 8, 2026",
    icon: "radar",
    image: IMG.plains,
  },
];
