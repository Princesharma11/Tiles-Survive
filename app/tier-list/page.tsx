import type { Metadata } from "next";
import TierBoard from "@/components/pages/TierBoard";

export const metadata: Metadata = {
  title: "Hero Tier List",
  alternates: { canonical: "/tier-list" },
  description:
    "The community-consensus Tiles Survive! hero tier list — S-tier core picks, situational picks, and the troop faction cycle, updated for patch 6.2.",
};

export default function TierListPage() {
  return <TierBoard />;
}
