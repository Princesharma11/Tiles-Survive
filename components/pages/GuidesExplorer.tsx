"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GuideCard from "@/components/guides/GuideCard";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  guideCategories,
  guides,
  type GuideCategory,
} from "@/data/guides";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  GuidesExplorer — filterable codex grid for the /guides route.      */
/* ------------------------------------------------------------------ */

type Filter = "ALL" | GuideCategory;
const filters: Filter[] = ["ALL", ...guideCategories];

export default function GuidesExplorer() {
  const [active, setActive] = useState<Filter>("ALL");

  const visible = useMemo(
    () => (active === "ALL" ? guides : guides.filter((g) => g.category === active)),
    [active]
  );

  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8 md:pt-40">
      <SectionHeader
        eyebrow="[ INTEL // SURVIVAL CODEX ]"
        title="Guides forged in the field."
        accent="in the field."
        description="Every entry is combat-reviewed by officers who actually hold the tile. Filter by discipline and start reading."
      />

      {/* Category filters */}
      <div className="mb-10 flex flex-wrap gap-2.5">
        {filters.map((filter) => {
          const isActive = filter === active;
          const count =
            filter === "ALL"
              ? guides.length
              : guides.filter((g) => g.category === filter).length;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={cn(
                "relative rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.2em] transition-all duration-300",
                isActive
                  ? "border-gold-500/60 bg-gold-500/10 text-gold-300 shadow-glow"
                  : "border-white/10 text-steel-400 hover:border-steel-400/50 hover:text-steel-200"
              )}
            >
              {filter.toUpperCase()}
              <span className="ml-2 text-[9px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Grid with layout animation on filter change */}
      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((guide, i) => (
            <motion.div
              key={guide.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <GuideCard guide={guide} index={i} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-16 text-center font-mono text-[11px] tracking-[0.3em] text-steel-500"
        >
          NO ENTRIES IN THIS SECTOR YET — SCOUTS ARE ON IT
        </motion.p>
      )}

      {/* Anchor targets for guide deep links */}
      {guides.map((guide) => (
        <div key={guide.id} id={guide.slug} className="sr-only">
          {guide.title}
        </div>
      ))}
    </section>
  );
}
