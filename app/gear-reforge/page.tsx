import type { Metadata } from "next";
import ModuleBoot from "@/components/pages/ModuleBoot";

export const metadata: Metadata = {
  title: "Gear Reforge Simulator",
  description:
    "Simulate Chief Gear reforges before you spend — substat odds, white-to-legendary quality breakpoints, and roll-set comparisons for Tiles Survive!.",
};

export default function GearReforgePage() {
  return (
    <ModuleBoot
      moduleId="GR-03"
      status="BETA // ODDS TABLE v6.2"
      title="Gear Reforge"
      titleAccent="Simulator"
      tagline="Chief Gear compounds. Reforge blind and it shows."
      description="Chief Gear boosts every hero you field — a greedy reroll taxes your whole account. Test substat rolls across white-to-legendary quality tiers and lock with confidence, not hope."
      bullets={[
        "Full reforge odds table",
        "Quality-tier breakpoint planner",
        "Save & compare roll sets",
        "Alloy cost projection",
      ]}
      bootLines={[
        "LOADING REFORGE ODDS TABLE",
        "SIMULATING 2.1M ROLL HISTORIES",
        "CROSS-CHECKING TIER BREAKPOINTS",
      ]}
      variant="forge"
    />
  );
}
