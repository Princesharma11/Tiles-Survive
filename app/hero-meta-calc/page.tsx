import type { Metadata } from "next";
import ModuleBoot from "@/components/pages/ModuleBoot";

export const metadata: Metadata = {
  title: "Hero Meta Calc",
  description:
    "Solve the Guards / Gunners / Marksmen triangle — troop ratio optimization, faction-aligned hero pairing, and counter-matrix simulation for Tiles Survive!.",
};

export default function HeroMetaCalcPage() {
  return (
    <ModuleBoot
      moduleId="MC-02"
      status="CALCULATING"
      title="Hero Meta"
      titleAccent="Calc"
      tagline="Counter math overrides raw power."
      description="Feed in your barracks and roster; the optimizer returns the counter-proof split your march actually needs — faction-matched heroes included. No more 100%-Guard coin flips getting shredded by a balanced Gunner-Marksman wall."
      bullets={[
        "45/35/20 consensus baseline presets",
        "Faction-aligned hero pairing",
        "Counter-matrix combat simulator",
        "Arena & 3v3 loadout export",
      ]}
      bootLines={[
        "INGESTING BARRACKS COMPOSITION",
        "MAPPING FACTION COUNTER CYCLE",
        "SOLVING MARCH EQUATIONS",
      ]}
      variant="calc"
    />
  );
}
