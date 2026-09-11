export type Tier = "S" | "A" | "B";
export type HeroRole = "Tank" | "Damage" | "Support" | "Tactics";

export type HeroEntry = {
  name: string;
  tier: Tier;
  role: HeroRole;
  score: number; // meta score 0–100
  note: string;
  portrait: string; // official art (transparent webp)
  /** Sticker accent colors */
  accent: {
    ring: string; // portrait frame
    chip: string; // role chip bg
    glow: string; // hover glow rgba
  };
};

/**
 * Community meta board — featuring official hero art.
 * S-tier = proven across Arena, rallies and garrisons this patch.
 */
export const tierBoard: HeroEntry[] = [
  {
    name: "Rusty",
    tier: "S",
    role: "Tank",
    score: 95,
    note: "The wall every frontline needs. Absorbs pressure while your Gunners grind — pairs with any backline.",
    portrait: "/heroes/rusty.webp",
    accent: { ring: "#3d9bd1", chip: "#e6f2fb", glow: "rgba(61,155,209,0.4)" },
  },
  {
    name: "Maddie",
    tier: "S",
    role: "Damage",
    score: 93,
    note: "Slingshot burst that deletes backlines. The consensus carry for Arena pushes this patch.",
    portrait: "/heroes/maddie.webp",
    accent: { ring: "#ed5ca8", chip: "#fde9f4", glow: "rgba(237,92,168,0.4)" },
  },
  {
    name: "Ghost",
    tier: "S",
    role: "Tactics",
    score: 90,
    note: "Tempo engine. His skill cycle reshapes rally math — a genuine fifth squad member.",
    portrait: "/heroes/ghost.webp",
    accent: { ring: "#ed5ca8", chip: "#f3e8fb", glow: "rgba(176,132,255,0.4)" },
  },
  {
    name: "Lucky",
    tier: "A",
    role: "Support",
    score: 84,
    note: "Keeps survivors standing through Behemoth pressure. Best value heal-to-investment ratio.",
    portrait: "/heroes/lucky.webp",
    accent: { ring: "#f07d2e", chip: "#fdeadd", glow: "rgba(240,125,46,0.4)" },
  },
];

export const pendingIntel: { tier: Tier; slots: number; label: string }[] = [
  { tier: "S", slots: 1, label: "MORE S-TIER SCANS INCOMING" },
  { tier: "A", slots: 3, label: "STRONG SITUATIONAL PICKS" },
  { tier: "B", slots: 2, label: "NICHE // EVENT BAIT" },
];
