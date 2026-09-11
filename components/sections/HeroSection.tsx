"use client";

import { motion } from "framer-motion";
import LazyHeroCanvas from "@/components/three/LazyHeroCanvas";
import TitanButton from "@/components/ui/TitanButton";
import StatCounter from "@/components/ui/StatCounter";
import { CrosshairIcon, SwordsIcon, ChevronDownIcon } from "@/components/ui/icons";
import { site, heroStats } from "@/data/site";
import { EASE_OUT_EXPO, lineReveal, staggerContainer, fadeUp } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  HeroSection — 3D command-table stage + massive masked-line type.   */
/*  "STOP GUESSING. / START CONQUERING."                               */
/* ------------------------------------------------------------------ */

function CornerBrackets() {
  const base = "pointer-events-none absolute size-6 border-gold-500/30";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-4 hidden md:block">
      <span className={`${base} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${base} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* 3D stage — lazily mounted, main thread friendly */}
      <LazyHeroCanvas />

      {/* Scrims: legibility above the scene */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/80 via-void/20 to-void" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,transparent,rgba(4,6,12,0.55))]" />

      <CornerBrackets />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-24 pt-36 sm:px-8 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT_EXPO }}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.38em] text-gold-400"
        >
          <span aria-hidden className="size-1.5 animate-blip rounded-full bg-gold-500" />
          [ COMMAND INTELLIGENCE // {site.patch} ]
        </motion.p>

        <motion.h1
          variants={staggerContainer(0.18, 0.25)}
          initial="hidden"
          animate="show"
          className="max-w-5xl font-display text-[clamp(2.7rem,9vw,7.5rem)] font-bold uppercase italic leading-[0.95] tracking-tight"
        >
          <span className="block overflow-hidden pb-1">
            <motion.span variants={lineReveal} className="block text-steel-100">
              Stop Guessing.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span variants={lineReveal} className="text-shimmer block">
              Start Conquering.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE_OUT_EXPO }}
          className="mt-7 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg"
        >
          TitanTilesSurvive turns raw Tiles Survive! data into decisive moves —
          war-room planning, hero meta math, and tier-tested strategy, forged
          into one command deck.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT_EXPO }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <TitanButton
            href="/war-room"
            size="lg"
            icon={<SwordsIcon className="size-[18px]" />}
          >
            Enter War Room
          </TitanButton>
          <TitanButton
            href="/hero-meta-calc"
            variant="outline"
            size="lg"
            icon={<CrosshairIcon className="size-[18px]" />}
          >
            Analyze Roster
          </TitanButton>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          variants={staggerContainer(0.12, 1.1)}
          initial="hidden"
          animate="show"
          className="mt-16 grid max-w-lg grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/5 bg-void/40 backdrop-blur-sm"
        >
          {heroStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="py-4">
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 mx-auto mb-6 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-steel-400">
          SCROLL TO DEPLOY
        </span>
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gold-500"
        >
          <ChevronDownIcon className="size-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
