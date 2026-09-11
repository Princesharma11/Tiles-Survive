"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  fadeUp,
  popIn,
  springPop,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations/variants";
import { pendingIntel, tierBoard, type HeroEntry } from "@/data/tierList";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  TierBoard — community consensus meta board with official art.      */
/* ------------------------------------------------------------------ */

function HeroCard({ hero }: { hero: HeroEntry }) {
  return (
    <motion.article
      variants={popIn}
      whileHover={{ y: -8 }}
      transition={springPop}
      className="group relative overflow-hidden rounded-3xl border-[3px] border-ink bg-white p-5 shadow-[0_4px_0_0_#2d2a26,0_18px_34px_-18px_rgba(45,42,38,0.35)]"
    >
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: hero.accent.glow }}
      />

      <div className="relative flex items-start gap-4">
        {/* Portrait frame */}
        <motion.div
          whileHover={{ rotate: -3, scale: 1.06 }}
          transition={springPop}
          className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl border-[3px] bg-paper"
          style={{ borderColor: hero.accent.ring }}
        >
          <Image
            src={hero.portrait}
            alt={`${hero.name} — official Tiles Survive hero art`}
            fill
            sizes="80px"
            className="object-cover object-top"
          />
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-display text-2xl font-extrabold tracking-tight text-ink">
              {hero.name}
            </h3>
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl border-[3px] border-ink font-display text-xl font-extrabold shadow-[0_3px_0_0_#2d2a26]",
                hero.tier === "S"
                  ? "bg-gradient-to-b from-gold to-flame text-ink"
                  : "bg-gradient-to-b from-flame to-ember text-white"
              )}
            >
              {hero.tier}
            </span>
          </div>
          <span
            className="mt-1 inline-block rounded-full border-2 border-ink px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.16em]"
            style={{ background: hero.accent.chip, color: "#2d2a26" }}
          >
            {hero.role.toUpperCase()}
          </span>
        </div>
      </div>

      <p className="relative mt-4 min-h-[3.4rem] text-sm font-semibold leading-relaxed text-ink-soft">
        {hero.note}
      </p>

      {/* Score */}
      <div className="relative mt-3">
        <div className="mb-1.5 flex justify-between font-mono text-[10px] font-bold tracking-[0.2em] text-ink-soft">
          <span>META SCORE</span>
          <span className="text-ember-deep">{hero.score}/100</span>
        </div>
        <div className="h-4 overflow-hidden rounded-full border-[3px] border-ink bg-paper">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold via-flame to-ember"
            initial={{ width: 0 }}
            whileInView={{ width: `${hero.score}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </div>
      </div>
    </motion.article>
  );
}

export default function TierBoard() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8 md:pt-40">
      <SectionHeader
        eyebrow="Consensus board"
        title="Hero meta"
        accent="tier list."
        description="Community consensus distilled into one board — official art, meta scores, and zero sentimentality. S-tier is proven; everything else is situational or bait."
      />

      <div className="mb-10 flex flex-wrap items-center gap-3">
        <span className="rounded-full border-[3px] border-ink bg-gold px-3.5 py-1 font-display text-[11px] font-extrabold tracking-[0.2em] text-ink shadow-[0_3px_0_0_#2d2a26]">
          DRAFT v6.2
        </span>
        <span className="rounded-full border-[3px] border-ink/20 bg-white px-3.5 py-1 font-mono text-[10px] font-bold tracking-[0.18em] text-ink-soft">
          SAMPLE DATASET — FULL SYNC PENDING
        </span>
      </div>

      {/* Ranked cards */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        {tierBoard.map((hero) => (
          <HeroCard key={hero.name} hero={hero} />
        ))}
      </motion.div>

      {/* Pending slots */}
      {pendingIntel.map(({ tier, slots, label }) => (
        <div key={tier} className="mt-14">
          <div className="mb-5 flex items-center gap-4">
            <span
              className={cn(
                "grid size-11 place-items-center rounded-xl border-[3px] border-ink font-display text-xl font-extrabold shadow-[0_3px_0_0_#2d2a26]",
                tier === "S"
                  ? "bg-gradient-to-b from-gold to-flame text-ink"
                  : tier === "A"
                    ? "bg-gradient-to-b from-flame to-ember text-white"
                    : "border-ink/30 bg-paper text-ink-soft shadow-none"
              )}
            >
              {tier}
            </span>
            <span className="font-mono text-[11px] font-bold tracking-[0.24em] text-ink-soft">
              {label}
            </span>
            <div className="trail-dots flex-1 opacity-40" />
          </div>
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          >
            {Array.from({ length: slots }).map((_, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex h-36 flex-col items-center justify-center gap-2 rounded-3xl border-[3px] border-dashed border-ink/25 bg-white/50"
              >
                <motion.span
                  className="text-2xl"
                  aria-hidden
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
                >
                  🔍
                </motion.span>
                <span className="font-mono text-[10px] font-bold tracking-[0.24em] text-ink-faint">
                  AWAITING DATA SCAN
                </span>
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-ink-faint/70">
                  SLOT_{String(i + 1).padStart(2, "0")} // TIER {tier}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}

      {/* Faction cycle legend */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16 rounded-3xl border-[3px] border-ink bg-pine p-6 text-cream shadow-[0_5px_0_0_#2d2a26]"
      >
        <p className="inline-block rounded-lg bg-cream/10 px-3 py-1 font-display text-xs font-bold tracking-[0.24em] text-gold">
          TROOP FACTION CYCLE
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-sm font-bold tracking-wide">
          <span className="rounded-xl border-2 border-cream/40 bg-cream/10 px-3 py-1.5 text-gold">STALWART</span>
          <span className="text-cream/50">▸</span>
          <span className="rounded-xl border-2 border-cream/40 bg-cream/10 px-3 py-1.5 text-flame">AERONAUT</span>
          <span className="text-cream/50">▸</span>
          <span className="rounded-xl border-2 border-cream/40 bg-cream/10 px-3 py-1.5 text-teal">MARINER</span>
          <span className="text-cream/50">▸</span>
          <span className="rounded-xl border-2 border-cream/40 bg-cream/10 px-3 py-1.5 text-cream">ROVER</span>
          <span className="text-cream/50">▸</span>
          <span className="text-cream/50">STALWART…</span>
          <span className="ml-auto font-mono text-[10px] text-cream/60">
            GUARDS ▸ MARKSMEN ▸ GUNNERS ▸ GUARDS
          </span>
        </div>
      </motion.div>
    </section>
  );
}
