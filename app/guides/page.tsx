import type { Metadata } from "next";
import GuidesExplorer from "@/components/pages/GuidesExplorer";

export const metadata: Metadata = {
  title: "Guides — The Survival Codex",
  alternates: { canonical: "/guides" },
  description:
    "Battle-tested Tiles Survive! guides: first-week progression, troop composition math, faction matching, Chief Gear reforging, rally etiquette and event calendars.",
};

export default function GuidesPage() {
  return <GuidesExplorer />;
}
