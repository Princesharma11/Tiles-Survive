import HeroSection from "@/components/sections/HeroSection";
import TickerTape from "@/components/sections/TickerTape";
import FeatureGrid from "@/components/sections/FeatureGrid";
import HeroSpotlight from "@/components/sections/HeroSpotlight";
import GuidesCarousel from "@/components/sections/GuidesCarousel";
import CallToArms from "@/components/sections/CallToArms";

/* ------------------------------------------------------------------ */
/*  Homepage — vertical flow:                                          */
/*  01 Hero (official key art + floating hero cutouts + parallax)      */
/*  → Expedition-log ticker                                            */
/*  02 Arsenal (art-backed expanding feature cards)                    */
/*  03 Hero spotlight (official character art, night-camp band)        */
/*  04 Guides carousel (world-scene codex rail)                        */
/*  05 Living world CTA (3D floating island)                           */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TickerTape />
      <FeatureGrid />
      <HeroSpotlight />
      <GuidesCarousel />
      <CallToArms />
    </>
  );
}
