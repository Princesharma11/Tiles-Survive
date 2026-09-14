import type { Metadata } from "next";
import ReforgeSimulator from "@/components/pages/ReforgeSimulator";

export const metadata: Metadata = {
  title: "Hero Gear Reforge Simulator",
  alternates: { canonical: "/gear-reforge" },
  description:
    "Simulate Tiles Survive! Alloy gear reforges before you spend a hammer — infinite rolls, lock-cost projection, trap-roll detection, role-synergy grades and A/B stash comparison for Helmet, Armor and Greaves pools.",
};

export default function GearReforgePage() {
  return <ReforgeSimulator />;
}
