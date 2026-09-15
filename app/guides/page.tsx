import type { Metadata } from "next";
import GuidesExplorer from "@/components/pages/GuidesExplorer";

export const metadata: Metadata = {
  title: "Tiles Survive Guides — The Survival Codex",
  alternates: { canonical: "/guides" },
  description:
    "Eight deep Tiles Survive! strategy guides for patch 2.6.0: the first-7-days playbook, 40/30/30 troop math, the full faction counter map, Behemoth cooldown tricks, reforge lock discipline, rally etiquette, the event calendar and F2P gem flow.",
};

export default function GuidesPage() {
  return <GuidesExplorer />;
}
