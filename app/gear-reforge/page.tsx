import type { Metadata } from "next";
import ReforgeSimulator from "@/components/pages/ReforgeSimulator";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Tiles Survive Reforge Calculator & Simulator",
  alternates: { canonical: "/gear-reforge" },
  description:
    "Simulate Tiles Survive Alloy gear reforges free — infinite rolls, lock-cost projections, trap-roll detection and role grades before a real hammer moves.",
};

const toolLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tiles Survive Gear Reforge Simulator",
  url: `${site.url}/gear-reforge`,
  applicationCategory: "GameApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  about: { "@type": "VideoGame", name: "Tiles Survive!" },
};

export default function GearReforgePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolLd) }}
      />
      <ReforgeSimulator />
    </>
  );
}
