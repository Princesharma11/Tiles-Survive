import HeroSection from "@/components/sections/HeroSection";
import TickerTape from "@/components/sections/TickerTape";
import FeatureGrid from "@/components/sections/FeatureGrid";
import GuidesCarousel from "@/components/sections/GuidesCarousel";
import CallToArms from "@/components/sections/CallToArms";

/* ------------------------------------------------------------------ */
/*  Homepage — vertical flow:                                          */
/*  01 Hero (3D canvas + massive type + dual CTAs)                     */
/*  → Intel ticker                                                     */
/*  02 Interactive feature grid (expanding cards)                      */
/*  03 Guides carousel (horizontal rail)                               */
/*  04 Call to arms                                                    */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TickerTape />
      <FeatureGrid />
      <GuidesCarousel />
      <CallToArms />
    </>
  );
}
