import type { Metadata } from "next";
import TierBoard from "@/components/pages/TierBoard";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Tiles Survive Tier List — Best Heroes Ranked",
  alternates: { canonical: "/tier-list" },
  description:
    "Every Tiles Survive hero ranked by SSR, SR and R rarity with PvP, campaign and rally scores — the community tier list, updated for patch 2.6.",
};

const toolLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tiles Survive Hero Tier List",
  url: `${site.url}/tier-list`,
  applicationCategory: "GameApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  about: { "@type": "VideoGame", name: "Tiles Survive!" },
};

export default function TierListPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolLd) }}
      />
      <TierBoard />
    </>
  );
}
