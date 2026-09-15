"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import GuideCard from "@/components/guides/GuideCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { guides } from "@/data/guides";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  GuidesCarousel — horizontally snapping codex rail with arrows      */
/*  + animated progress trail.                                         */
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
    <section id="guides" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Start here // survival codex"
            title="Guides forged"
            accent="in the field."
            description="Eight complete, patch-2.6.0 strategy guides — from your first fog run to cross-server conquest. Written for gamers, by officers who hold the tile."
            className="mb-0"
          />

          <div className="mb-12 hidden gap-3 md:mb-16 lg:flex">
            <ArrowButton dir={-1} disabled={atStart} onClick={scrollBy} label="Scroll guides left" />
            <ArrowButton dir={1} disabled={atEnd} onClick={scrollBy} label="Scroll guides right" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl sm:px-8">
        <div
          ref={scrollerRef}
          onScroll={sync}
          className="no-scrollbar mask-fade-x -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-3 sm:-mx-2 sm:px-2"
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
            className="group flex w-[300px] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-3xl border-[3px] border-dashed border-ink/30 bg-white/50 transition-all duration-500 hover:-translate-y-2 hover:border-ink hover:bg-white sm:w-[350px]"
          >
            <span className="grid size-16 place-items-center rounded-2xl border-[3px] border-ink bg-gradient-to-b from-flame to-ember text-white shadow-[0_4px_0_0_#2d2a26] transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110">
              <ChevronRightIcon className="size-7" />
            </span>
            <span className="font-display text-sm font-extrabold uppercase tracking-[0.25em] text-ink">
              Open full codex
            </span>
          </a>
        </div>

        {/* Progress trail */}
        <div className="trail-dots mx-auto mt-8 w-full max-w-xs opacity-40" />
        <div className="mx-auto mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full border-2 border-ink/15 bg-white">
          <motion.div
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-ember to-berry"
            style={{ scaleX: progress }}
          />
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  dir,
  disabled,
  onClick,
  label,
}: {
  dir: 1 | -1;
  disabled: boolean;
  onClick: (d: 1 | -1) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(dir)}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "grid size-13 place-items-center rounded-2xl border-[3px] border-ink shadow-[0_4px_0_0_#2d2a26] transition-all duration-300",
        disabled
          ? "cursor-not-allowed border-ink/20 bg-paper text-ink-faint shadow-none"
          : "bg-white text-ink hover:-translate-y-1 hover:bg-gold active:translate-y-0.5"
      )}
    >
      {dir === -1 ? (
        <ChevronLeftIcon className="size-6" />
      ) : (
        <ChevronRightIcon className="size-6" />
      )}
    </button>
  );
}
