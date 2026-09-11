"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import GuideCard from "@/components/guides/GuideCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { guides } from "@/data/guides";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  GuidesCarousel — horizontally scrolling codex rail.                */
/*  Native scroll-snap (trackpad + touch friendly) + arrow controls    */
/*  + animated scroll progress rail.                                   */
/* ------------------------------------------------------------------ */

export default function GuidesCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressMV = useMotionValue(0);
  const progress = useSpring(progressMV, { stiffness: 220, damping: 40 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    progressMV.set(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= max - 8);
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section id="guides" className="relative py-24 md:py-36">
      {/* Ambient glow behind the rail */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-72 max-w-4xl rounded-full bg-gold-500/[0.05] blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="[ 03 // KNOWLEDGE CACHE ]"
            title="The survival codex."
            accent="codex."
            description="Battle-tested guides distilled from thousands of State wars — from your first fog clearing run to cross-server conquest."
            className="mb-0"
          />

          {/* Arrow controls */}
          <div className="mb-12 hidden gap-3 md:mb-16 lg:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Scroll guides left"
              className={cn(
                "grid size-12 place-items-center rounded-full border transition-all duration-300",
                atStart
                  ? "cursor-not-allowed border-white/5 text-steel-500"
                  : "border-gold-500/40 text-gold-400 hover:border-gold-500 hover:bg-gold-500/10 hover:shadow-glow"
              )}
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Scroll guides right"
              className={cn(
                "grid size-12 place-items-center rounded-full border transition-all duration-300",
                atEnd
                  ? "cursor-not-allowed border-white/5 text-steel-500"
                  : "border-gold-500/40 text-gold-400 hover:border-gold-500 hover:bg-gold-500/10 hover:shadow-glow"
              )}
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal rail */}
      <div className="mx-auto max-w-7xl sm:px-8">
        <div
          ref={scrollerRef}
          onScroll={sync}
          className="mask-fade-x no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-2 sm:px-2"
        >
          {guides.map((guide, i) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              index={i}
              className="w-[300px] shrink-0 snap-start sm:w-[350px]"
            />
          ))}

          {/* Terminal card */}
          <a
            href="/guides"
            className="group flex w-[300px] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gold-500/30 bg-gold-500/[0.03] transition-all duration-500 hover:border-gold-500/60 hover:bg-gold-500/[0.07] sm:w-[350px]"
          >
            <span className="grid size-14 place-items-center rounded-full border border-gold-500/40 text-gold-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-90">
              <ChevronRightIcon className="size-6" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.3em] text-gold-400">
              OPEN FULL CODEX
            </span>
          </a>
        </div>

        {/* Progress rail */}
        <div className="mx-auto mt-8 h-px w-full max-w-xs overflow-hidden bg-white/10">
          <motion.div
            className="h-full w-full origin-left bg-gradient-to-r from-gold-600 to-gold-300"
            style={{ scaleX: progress }}
          />
        </div>
      </div>
    </section>
  );
}
