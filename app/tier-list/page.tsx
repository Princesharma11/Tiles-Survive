import type { Metadata } from "next";
import TierBoard from "@/components/pages/TierBoard";

export const metadata: Metadata = {
  title: "Hero Tier List",
  alternates: { canonical: "/tier-list" },
  description:
    "The complete community-consensus Tiles Survive! hero list — every hero grouped by SSR, SR and R rarity, scored for PvP, campaign and kit utility, updated for patch 2.6.",
};

export default function TierListPage() {
  return <TierBoard />;
}
