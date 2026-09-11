"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GuideCard from "@/components/guides/GuideCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { guideCategories, guides, type GuideCategory } from "@/data/guides";
import { popIn, springPop } from "@/lib/animations/variants";
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
        eyebrow="Survival codex"
        title="Guides forged"
        accent="in the field."
        description="Every entry is combat-reviewed by officers who actually hold the tile. Filter by discipline and start reading."
      />

      {/* Category filters */}
      <div className="mb-10 flex flex-wrap gap-3">
        {filters.map((filter) => {
          const isActive = filter === active;
          const count =
            filter === "ALL"
              ? guides.length
              : guides.filter((g) => g.category === filter).length;
          return (
            <motion.button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative rounded-full border-[3px] px-4 py-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] transition-all duration-300",
                isActive
                  ? "border-ink bg-gradient-to-b from-ember to-ember-deep text-white shadow-[0_4px_0_0_#a03f10]"
                  : "border-ink/20 bg-white text-ink-soft shadow-[0_3px_0_0_rgba(45,42,38,0.12)] hover:border-ink hover:text-ink"
              )}
            >
              {filter}
              <span className="ml-1.5 opacity-60">{count}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((guide, i) => (
            <motion.div
              key={guide.id}
              layout
              variants={popIn}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ ...springPop, delay: i * 0.04 }}
            >
              <GuideCard guide={guide} index={i} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-16 text-center font-display text-sm font-bold uppercase tracking-[0.3em] text-ink-faint">
          No entries in this sector yet — scouts are on it 🔍
        </p>
      )}

      {/* Anchor targets for deep links */}
      {guides.map((guide) => (
        <div key={guide.id} id={guide.slug} className="sr-only">
          {guide.title}
        </div>
      ))}
    </section>
  );
}
