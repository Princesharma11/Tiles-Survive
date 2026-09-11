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
  /** Inline gradient art — no remote images, instant paint on Vercel edge. */
  art: { from: string; to: string; glow: string };
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

/**
 * The Survival Codex — hero-flavored guide catalog.
 */
export const guides: Guide[] = [
  {
    id: "g1",
    slug: "first-7-days",
    title: "The First 7 Days: Fog, Power & Food",
    excerpt:
      "The opening week decides your ceiling. Clear fog in rings, keep the Power Plant a upgrade ahead, and never let a survivor sit idle.",
    category: "Beginner",
    level: "RECRUIT",
    readTime: "12 min",
    updated: "Jun 2, 2026",
    icon: "layers",
    art: { from: "#1c1607", to: "#0b1220", glow: "#f5b942" },
  },
  {
    id: "g2",
    slug: "march-math-45-35-20",
    title: "March Math: The 45/35/20 Baseline",
    excerpt:
      "Guards eat damage, Gunners grind the midline, Marksmen burst from the back. The proven competitive split — and when to break it on purpose.",
    category: "Troops",
    level: "VETERAN",
    readTime: "18 min",
    updated: "Aug 14, 2026",
    icon: "swords",
    art: { from: "#231009", to: "#0b1220", glow: "#ff5c33" },
  },
  {
    id: "g3",
    slug: "faction-matching-full-map",
    title: "Faction Matching: Stalwart to Rover, Fully Mapped",
    excerpt:
      "Stalwart beats Aeronaut beats Mariner beats Rover beats Stalwart. A faction-aligned hero leading matching troops stacks stats — here's the full cycle map.",
    category: "Heroes",
    level: "VETERAN",
    readTime: "15 min",
    updated: "Sep 1, 2026",
    icon: "shield",
    art: { from: "#0a1f1a", to: "#0b1220", glow: "#57e6c5" },
  },
  {
    id: "g4",
    slug: "behemoth-slot-cooldowns",
    title: "Behemoth Slot Math: Cooldowns Beat Stat Lines",
    excerpt:
      "Your Behemoth is a fifth squad member that reshapes combat tempo through skill cooldown reduction. We simulated 40k fights to prove the tempo curve.",
    category: "Heroes",
    level: "COMMANDER",
    readTime: "20 min",
    updated: "Aug 28, 2026",
    icon: "zap",
    art: { from: "#160b1e", to: "#0b1220", glow: "#c084fc" },
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
    updated: "Jul 19, 2026",
    icon: "anvil",
    art: { from: "#0d1a2b", to: "#0b1220", glow: "#57e6c5" },
  },
  {
    id: "g6",
    slug: "rally-etiquette",
    title: "Rally Etiquette: Don't Get Muted in State Chat",
    excerpt:
      "Rally caps, join windows, reinforce priority, and the six messages that get officers demoted. A survival guide for alliance politics.",
    category: "Alliance",
    level: "RECRUIT",
    readTime: "9 min",
    updated: "May 30, 2026",
    icon: "users",
    art: { from: "#1e1410", to: "#0b1220", glow: "#ff8a5e" },
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
    updated: "Sep 8, 2026",
    icon: "clock",
    art: { from: "#1c1607", to: "#0b1220", glow: "#f5b942" },
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
    updated: "Aug 3, 2026",
    icon: "trophy",
    art: { from: "#101a2e", to: "#0b1220", glow: "#9dacc6" },
  },
];
