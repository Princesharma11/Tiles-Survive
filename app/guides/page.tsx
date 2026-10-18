import type { Metadata } from "next";
import GuidesExplorer from "@/components/pages/GuidesExplorer";
import { guides } from "@/data/guides";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Tiles Survive Guides & Walkthroughs",
  alternates: { canonical: "/guides" },
  description:
    "12 deep Tiles Survive guides: the first-7-days playbook, 40/30/30 march math, faction counters, pet system, hero talents, Turbo Turtle and the event calendar.",
};

const listLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The Survival Codex — Tiles Survive Guides",
  numberOfItems: guides.length,
  itemListElement: guides.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: g.title,
    url: `${site.url}/guides/${g.slug}`,
  })),
};

export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }}
      />
      <GuidesExplorer />
    </>
  );
}
