"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import SynergyTracker from "@/components/tools/SynergyTracker";
import {
  HEROES,
  TIER_META,
  TIER_ORDER,
  type Hero,
  type TierKey,
} from "@/data/heroMeta";
import { fadeUp, popIn, springPop, staggerContainer, viewportOnce } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  TierBoard — The Definitive Tiles Survive Hero Tier List.           */
/*  Sticky tier nav + full verdict cards + Synergy Tracker.            */
/* ------------------------------------------------------------------ */

function PortraitFrame({ hero, big = false }: { hero: Hero; big?: boolean }) {
  if (!hero.portrait) {
    return (
      <span
        className={cn(
          "grid size-full place-items-center border-b-[3px] border-ink font-display font-extrabold text-white",
          big ? "text-5xl" : "text-3xl"
        )}
        style={{ background: hero.accent }}
        aria-hidden
      >
        {hero.name.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    <Image
      src={hero.portrait}
      alt={`${hero.name} — ${hero.rarity} ${hero.heroClass} hero art`}
      fill
      sizes="(max-width:640px) 90vw, (max-width:1280px) 45vw, 380px"
      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}

function HeroCard({ hero, index }: { hero: Hero; index: number }) {
  const tier = TIER_META[hero.tier];
  return (
    <motion.article
      layout
      variants={popIn}
      transition={springPop}
      className="group relative flex flex-col overflow-hidden rounded-3xl border-[3px] border-ink bg-white shadow-[0_4px_0_0_#2d2a26,0_20px_38px_-20px_rgba(45,42,38,0.35)] transition-transform duration-300 hover:-translate-y-1.5"
    >
      {/* Art header */}
      <div
        className="relative h-48 overflow-hidden border-b-[3px] border-ink"
        style={{ background: `linear-gradient(135deg, ${hero.accent}26, #fdf1dc 65%)` }}
      >
        <PortraitFrame hero={hero} big />

        {/* Tier badge */}
        <span
          className={cn(
            "absolute left-3 top-3 grid size-12 place-items-center rounded-2xl border-[3px] border-ink font-display text-2xl font-extrabold shadow-[0_3px_0_0_#2d2a26]",
            tier.plate
          )}
        >
          {hero.tier}
        </span>

        {/* Rarity */}
        <span className="absolute right-3 top-3 rounded-full border-[3px] border-ink bg-white px-2.5 py-0.5 font-display text-[10px] font-extrabold tracking-[0.14em] text-ink shadow-[0_2px_0_0_#2d2a26]">
          {hero.rarity}
        </span>

        {/* Tag */}
        {hero.tag && (
          <motion.span
            initial={{ rotate: -8 }}
            animate={{ rotate: [-8, -4, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-3 left-3 rounded-full border-[3px] border-ink bg-gradient-to-b from-gold to-flame px-2.5 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-wide text-ink shadow-[0_2px_0_0_#2d2a26]"
          >
            ★ {hero.tag}
          </motion.span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: hero.accent }}>
          {hero.role}
        </p>
        <h3 className="mt-0.5 font-display text-2xl font-extrabold tracking-tight text-ink">
          {hero.name}
        </h3>

        {/* chips */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span
            className="rounded-full border-2 border-ink px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-ink"
            style={{ background: `${hero.accent}30` }}
          >
            {hero.faction}
          </span>
          <span className="rounded-full border-2 border-ink/20 bg-paper px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-ink-soft">
            {hero.classNote ?? hero.heroClass}
          </span>
        </div>

        <p className="mt-3 font-display text-[15px] font-extrabold leading-snug text-ink">
          “{hero.verdict}”
        </p>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-ink-soft">
          {hero.detail}
        </p>

        {hero.economy && (
          <p className="mt-3 rounded-xl border-2 border-dashed border-leaf/50 bg-leaf/10 px-3 py-1.5 text-xs font-bold text-leaf-deep">
            🏭 {hero.economy}
          </p>
        )}

        {/* meta score */}
        <div className="mt-auto pt-4">
          <div className="mb-1 flex justify-between font-mono text-[9px] font-bold tracking-[0.18em] text-ink-faint">
            <span>META SCORE</span>
            <span>{hero.score}/100</span>
          </div>
          <div className="h-3.5 overflow-hidden rounded-full border-[3px] border-ink bg-paper">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${hero.accent}, ${hero.accent}cc)`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${hero.score}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 + index * 0.05 }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function TierBoard() {
  const [filter, setFilter] = useState<TierKey | "ALL">("ALL");

  const grouped = useMemo(() => {
    const map = new Map<TierKey, Hero[]>();
    for (const tier of TIER_ORDER) {
      map.set(
        tier,
        HEROES.filter((h) => h.tier === tier)
      );
    }
    return map;
  }, []);

  const visibleTiers: TierKey[] =
    filter === "ALL" ? TIER_ORDER : [filter];

  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8 md:pt-40">
      <SectionHeader
        eyebrow="Season deep-dive"
        title="The definitive hero"
        accent="tier list."
        description="Your heroes are the engine of your account — investing wrong throttles progression and burns premium fragments. Ranked for PvP, campaign pushing and kit utility in the current sustain-heavy meta."
      />

      {/* Sticky tier nav + filters */}
      <div className="sticky top-20 z-30 mb-10 -mx-2 rounded-3xl border-[3px] border-ink bg-cream/90 px-2 py-2.5 shadow-[0_4px_0_0_#2d2a26] backdrop-blur-md">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-1">
          <button
            type="button"
            onClick={() => setFilter("ALL")}
            aria-pressed={filter === "ALL"}
            className={cn(
              "shrink-0 rounded-full border-[3px] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.14em] transition-all",
              filter === "ALL"
                ? "border-ink bg-ink text-cream shadow-[0_3px_0_0_#000]"
                : "border-ink/20 bg-white text-ink-soft hover:border-ink"
            )}
          >
            All {HEROES.length}
          </button>
          {TIER_ORDER.map((tier) => {
            const meta = TIER_META[tier];
            const count = grouped.get(tier)?.length ?? 0;
            return (
              <button
                key={tier}
                type="button"
                onClick={() => setFilter(tier)}
                aria-pressed={filter === tier}
                className={cn(
                  "shrink-0 rounded-full border-[3px] px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.14em] transition-all",
                  filter === tier
                    ? cn("shadow-[0_3px_0_0_#2d2a26]", meta.plate)
                    : "border-ink/20 bg-white text-ink-soft hover:border-ink"
                )}
              >
                {meta.icon} {tier}-Tier · {count}
              </button>
            );
          })}
          <span className="ml-auto hidden shrink-0 font-mono text-[10px] font-bold text-ink-faint lg:block">
            SUSTAIN META // v6.2
          </span>
        </div>
      </div>

      {/* Tier sections */}
      {visibleTiers.map((tier) => {
        const meta = TIER_META[tier];
        const heroes = grouped.get(tier) ?? [];
        return (
          <div key={tier} className="mb-16 scroll-mt-40" id={`tier-${tier.toLowerCase()}`}>
            {/* Tier header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mb-6 flex flex-wrap items-center gap-4"
            >
              <span
                className={cn(
                  "grid size-16 place-items-center rounded-2xl border-[3px] border-ink font-display text-3xl font-extrabold shadow-[0_4px_0_0_#2d2a26]",
                  meta.plate
                )}
              >
                {tier}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
                  {meta.icon} {meta.label}
                </p>
                <p className="text-sm font-bold text-ink-soft">{meta.blurb}</p>
              </div>
              <div className="trail-dots hidden w-40 opacity-40 sm:block" style={{ backgroundImage: `radial-gradient(circle, ${meta.ring} 1.5px, transparent 1.5px)` }} />
            </motion.div>

            <motion.div
              layout
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className={cn(
                "grid gap-6",
                heroes.length >= 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-3"
              )}
            >
              {heroes.map((hero, i) => (
                <HeroCard key={hero.id} hero={hero} index={i} />
              ))}
            </motion.div>
          </div>
        );
      })}

      {/* Methodology note */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mb-14 rounded-2xl border-2 border-dashed border-ink/20 bg-white/70 px-4 py-3 text-center text-xs font-bold text-ink-faint"
      >
        Rankings weigh PvP performance, campaign pushing and kit utility.
        Economy-only value (Travis, Eva, Lucky) is flagged — not counted toward
        combat scores. Meta shifts with every balance patch.
      </motion.p>

      {/* Synergy Tracker */}
      <div id="synergy" className="scroll-mt-32">
        <SynergyTracker />
      </div>
    </section>
  );
}
