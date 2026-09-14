export type NavItem = {
  id: string;
  label: string;
  href: string;
  hint: string;
};

/** Primary command navigation (sticky header + mobile overlay). */
export const navItems: NavItem[] = [
  {
    id: "war-room",
    label: "War Room",
    href: "/war-room",
    hint: "Arcadian battle planning",
  },
  {
    id: "hero-meta-calc",
    label: "Hero Meta Calc",
    href: "/hero-meta-calc",
    hint: "Pairing & skill math",
  },
  {
    id: "gear-reforge",
    label: "Gear Reforge",
    href: "/gear-reforge",
    hint: "Alloy reforge simulator",
  },
  {
    id: "tier-list",
    label: "Tier List",
    href: "/tier-list",
    hint: "Community consensus board",
  },
  {
    id: "guides",
    label: "Guides",
    href: "/guides",
    hint: "The survival codex",
  },
];
