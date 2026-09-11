"use client";

import { motion } from "framer-motion";
import FeatureCard from "@/components/cards/FeatureCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { features } from "@/data/features";
import { staggerContainer, viewportOnce } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  FeatureGrid — 3-column interactive arsenal grid.                   */
/*  Children orchestrate via shared stagger variants.                  */
/* ------------------------------------------------------------------ */

export default function FeatureGrid() {
  return (
    <section id="arsenal" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
      <SectionHeader
        eyebrow="[ 02 // ARSENAL ]"
        title="Tools forged for total war."
        accent="war."
        description="Three instruments, one doctrine: replace guesswork with math. Every module runs on live community data scraped straight from the battlefield."
      />

      <motion.div
        variants={staggerContainer(0.14)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </motion.div>
    </section>
  );
}
