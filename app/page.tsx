import { site } from "@/data/site";
import HeroSection from "@/components/sections/HeroSection";
import TickerTape from "@/components/sections/TickerTape";
import FeatureGrid from "@/components/sections/FeatureGrid";
import HeroSpotlight from "@/components/sections/HeroSpotlight";
import GuidesCarousel from "@/components/sections/GuidesCarousel";
import CallToArms from "@/components/sections/CallToArms";

/* ------------------------------------------------------------------ */
/*  Homepage — vertical flow (guides lead):                            */
/*  01 Hero (official key art + floating hero cutouts + parallax)      */
/*  → Expedition-log ticker                                            */
/*  02 Guides carousel (the codex leads — content is the front door)   */
/*  03 Arsenal (art-backed expanding feature cards)                    */
/*  04 Hero spotlight (official character art, night-camp band)        */
/*  05 Living world CTA (3D floating island)                           */
/* ------------------------------------------------------------------ */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  alternateName: "TitanTiles",
  url: site.url,
  description: site.description,
  inLanguage: "en",
  about: {
    "@type": "VideoGame",
    name: "Tiles Survive!",
    publisher: { "@type": "Organization", name: "FunPlus" },
    genre: ["4X", "Strategy", "Survival"],
    gamePlatform: ["iOS", "Android"],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <TickerTape />
      <GuidesCarousel />
      <FeatureGrid />
      <HeroSpotlight />
      <CallToArms />
    </>
  );
}
