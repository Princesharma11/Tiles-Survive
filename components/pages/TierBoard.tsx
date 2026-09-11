"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  EASE_OUT_EXPO,
} from "@/lib/animations/variants";
import { pendingIntel, tierBoard, type HeroEntry } from "@/data/tierList";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  TierBoard — community consensus meta board.                        */
/*  Data layer is isolated in data/tierList.ts — swap in a live API    */
/*  or spreadsheet sync without touching this component.               */
/* ------------------------------------------------------------------ */

const tierStyles: Record<string, { plate: string; text: string }> = {
  S: { plate: "border-gold-500/50 bg-gold-500/10", text: "text-gold-400" },
  A: { plate: "border-ember-500/50 bg-ember-500/10", text: "text-ember-400" },
  B: { plate: "border-steel-400/50 bg-steel-400/10", text: "text-steel-300" },
};

function HeroCard({ hero }: { hero: HeroEntry }) {
  const tier = tierStyles[hero.tier];
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-panel/60 p-5 backdrop-blur-sm transition-colors hover:border-gold-500/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span
            className={cn(
              "grid size-12 shrink-0 place-items-center rounded-xl border font-display text-lg font-bold",
              tier.plate,
              tier.text
            )}
          >
            {hero.name.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-steel-100">
              {hero.name}
            </h3>
            <p className="font-mono text-[10px] tracking-[0.2em] text-steel-400">
              {hero.role.toUpperCase()}
              {hero.faction ? ` // ${hero.faction.toUpperCase()}` : ""}
            </p>
          </div>
        </div>
        <span className={cn("font-display text-2xl font-bold italic", tier.text)}>
          {hero.tier}
        </span>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-steel-300">{hero.note}</p>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between font-mono text-[9px] tracking-[0.25em] text-steel-500">
          <span>META SCORE</span>
          <span className={tier.text}>{hero.score}/100</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className={cn(
              "h-full rounded-full",
              hero.tier === "S"
                ? "bg-gradient-to-r from-gold-600 to-gold-300"
                : hero.tier === "A"
                  ? "bg-gradient-to-r from-ember-500 to-ember-400"
                  : "bg-steel-400"
            )}
            initial={{ width: 0 }}
            whileInView={{ width: `${hero.score}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function TierBoard() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8 md:pt-40">
      <SectionHeader
        eyebrow="[ INTEL // CONSENSUS BOARD ]"
        title="Hero meta tier list."
        accent="tier list."
        description="Community consensus distilled into one board. S-tier picks are proven across Arena, rallies and garrisons — everything else is either situational or bait."
      />

      <div className="mb-10 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 font-mono text-[10px] tracking-[0.28em] text-gold-400">
          DRAFT v6.2
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] tracking-[0.28em] text-steel-400">
          SAMPLE DATASET — FULL SYNC PENDING
        </span>
      </div>

      {/* S tier */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      >
        {tierBoard.map((hero) => (
          <HeroCard key={hero.name} hero={hero} />
        ))}
      </motion.div>

      {/* A / B tier — intel pending slots */}
      {pendingIntel.map(({ tier, slots }) => (
        <div key={tier} className="mt-12">
          <div className="mb-5 flex items-center gap-4">
            <span
              className={cn(
                "grid size-10 place-items-center rounded-lg border font-display text-lg font-bold italic",
                tierStyles[tier].plate,
                tierStyles[tier].text
              )}
            >
              {tier}
            </span>
            <span className="font-mono text-[11px] tracking-[0.3em] text-steel-400">
              {tier === "A" ? "STRONG SITUATIONAL PICKS" : "NICHE // EVENT BAIT"}
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {Array.from({ length: slots }).map((_, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-panel/30"
              >
                <span className="font-mono text-[10px] tracking-[0.3em] text-steel-500">
                  AWAITING DATA SCAN
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] text-steel-500/60">
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
        className="mt-14 rounded-2xl border border-white/10 bg-panel/50 p-6 backdrop-blur-sm"
      >
        <p className="font-mono text-[10px] tracking-[0.3em] text-gold-500">
          TROOP FACTION CYCLE
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12px] tracking-[0.18em] text-steel-300">
          <span className="rounded-md border border-gold-500/40 bg-gold-500/10 px-3 py-1.5 text-gold-400">STALWART</span>
          <span className="text-steel-500">▸</span>
          <span className="rounded-md border border-ember-500/40 bg-ember-500/10 px-3 py-1.5 text-ember-400">AERONAUT</span>
          <span className="text-steel-500">▸</span>
          <span className="rounded-md border border-mint-400/40 bg-mint-400/10 px-3 py-1.5 text-mint-400">MARINER</span>
          <span className="text-steel-500">▸</span>
          <span className="rounded-md border border-white/15 px-3 py-1.5">ROVER</span>
          <span className="text-steel-500">▸</span>
          <span className="text-steel-500">STALWART…</span>
          <span className="ml-auto text-[10px] text-steel-500">GUARDS ▸ MARKSMEN ▸ GUNNERS ▸ GUARDS</span>
        </div>
      </motion.div>
    </section>
  );
}
