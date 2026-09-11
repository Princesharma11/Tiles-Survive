import type { Metadata } from "next";
import ModuleBoot from "@/components/pages/ModuleBoot";

export const metadata: Metadata = {
  title: "Arcadian War Room",
  description:
    "Command-grade battle planning for Tiles Survive! — rally timelines, officer role sync, and shareable battle-plan codes for Arcadian Conquest.",
};

export default function WarRoomPage() {
  return (
    <ModuleBoot
      moduleId="WR-01"
      status="EARLY ACCESS // S6"
      title="Arcadian"
      titleAccent="War Room"
      tagline="Plan the rally before the rally."
      description="The full battle-planning deck for Arcadian Conquest and cross-State warfare. Plot marches on a live tile grid, assign officer roles, and war-game every approach before a single troop leaves your Settlement."
      bullets={[
        "Rally timeline simulator",
        "Garrison & officer role sync",
        "Live tile-grid planner",
        "Shareable battle-plan codes",
      ]}
      bootLines={[
        "SYNCING STATE MAP DATA",
        "INDEXING ALLIANCE ROSTERS",
        "CALIBRATING RALLY TIMERS",
      ]}
      variant="radar"
      scene="/world/scene-island.webp"
    />
  );
}
