"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import TitanButton from "@/components/ui/TitanButton";
import { ArrowRightIcon } from "@/components/ui/icons";
import { tierBoard } from "@/data/tierList";
import { popIn, springPop, staggerContainer, viewportOnce } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  HeroSpotlight — official hero cutouts in a "night camp" band.      */
/*  Hover: character leaps forward with faction glow + sticker plate.  */
/* ------------------------------------------------------------------ */

export default function HeroSpotlight() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y-[3px] border-ink bg-gradient-to-b from-pine via-pine-deep to-pine py-24 md:py-32">
      {/* Night-camp atmosphere */}
      <div aria-hidden className="bg-tilegrid absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(80%_70%_at_50%_40%,black,transparent)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-flame/15 blur-[110px]"
      />
      {/* Stars */}
      {[
        { l: "12%", t: "18%" },
        { l: "30%", t: "9%" },
        { l: "55%", t: "14%" },
        { l: "78%", t: "8%" },
        { l: "90%", t: "22%" },
      ].map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute size-1.5 rounded-full bg-gold/80"
          style={{ left: s.l, top: s.t }}
          animate={reduce ? undefined : { opacity: [0.15, 1, 0.15], scale: [0.8, 1.25, 0.8] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Meta darlings"
          title="Meet the"
          accent="squad."
          description="The official roster leading this patch's meta — scanned, scored and argued over by the whole community."
          align="center"
          dark
        />

        {/* Desktop roster */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-4"
        >
          {tierBoard.map((hero) => (
            <motion.div
              key={hero.name}
              variants={popIn}
              whileHover={reduce ? undefined : "hover"}
              className="group relative"
            >
              {/* Glow */}
              <motion.div
                aria-hidden
                variants={{
                  hover: { opacity: 1, scale: 1.15 },
                }}
                initial={{ opacity: 0.35, scale: 1 }}
                transition={springPop}
                className="absolute inset-x-4 bottom-10 top-16 rounded-full blur-2xl"
                style={{ background: hero.accent.glow }}
              />

              {/* Portrait */}
              <motion.div
                variants={{
                  hover: { y: -18, scale: 1.06, rotate: -1.5 },
                }}
                transition={springPop}
                className="relative mx-auto h-[300px] xl:h-[330px]"
              >
                <Image
                  src={hero.portrait}
                  alt={`${hero.name} — official Tiles Survive hero art`}
                  fill
                  sizes="(max-width:1280px) 45vw, 25vw"
                  className="object-contain object-bottom drop-shadow-[0_24px_20px_rgba(0,0,0,0.45)]"
                />

                {/* Tier badge */}
                <motion.span
                  variants={{ hover: { scale: 1.18, rotate: 8 } }}
                  transition={springPop}
                  className={cn(
                    "absolute right-1 top-0 grid size-12 place-items-center rounded-2xl border-[3px] border-ink font-display text-2xl font-extrabold shadow-[0_4px_0_0_#2d2a26]",
                    hero.tier === "S"
                      ? "bg-gradient-to-b from-gold to-flame text-ink"
                      : "bg-gradient-to-b from-flame to-ember text-white"
                  )}
                >
                  {hero.tier}
                </motion.span>
              </motion.div>

              {/* Name plate */}
              <div className="relative mx-auto -mt-2 w-fit rounded-2xl border-[3px] border-ink bg-white px-5 py-2 text-center shadow-[0_4px_0_0_#2d2a26]">
                <p className="font-display text-xl font-extrabold leading-tight text-ink">
                  {hero.name}
                </p>
                <p
                  className="font-mono text-[10px] font-bold tracking-[0.2em]"
                  style={{ color: hero.accent.ring }}
                >
                  {hero.role.toUpperCase()}
                </p>
              </div>

              <p className="mx-auto mt-3 max-w-[240px] text-center text-sm font-semibold leading-relaxed text-cream/70">
                {hero.note}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile roster: snap rail */}
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:hidden">
          {tierBoard.map((hero) => (
            <div
              key={hero.name}
              className="w-[240px] shrink-0 snap-center rounded-3xl border-[3px] border-cream/20 bg-cream/5 p-4"
            >
              <div className="relative mx-auto h-56 w-full">
                <Image
                  src={hero.portrait}
                  alt={`${hero.name} — official Tiles Survive hero art`}
                  fill
                  sizes="240px"
                  className="object-contain object-bottom drop-shadow-[0_18px_16px_rgba(0,0,0,0.45)]"
                />
                <span
                  className={cn(
                    "absolute right-0 top-0 grid size-11 place-items-center rounded-xl border-[3px] border-ink font-display text-xl font-extrabold shadow-[0_3px_0_0_#2d2a26]",
                    hero.tier === "S"
                      ? "bg-gradient-to-b from-gold to-flame text-ink"
                      : "bg-gradient-to-b from-flame to-ember text-white"
                  )}
                >
                  {hero.tier}
                </span>
              </div>
              <div className="mt-2 rounded-xl border-[3px] border-ink bg-white px-3 py-1.5 text-center">
                <p className="font-display text-lg font-extrabold text-ink">{hero.name}</p>
                <p
                  className="font-mono text-[9px] font-bold tracking-[0.2em]"
                  style={{ color: hero.accent.ring }}
                >
                  {hero.role.toUpperCase()} // {hero.score}/100
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/tier-list" className="inline-block">
            <TitanButton variant="sun" size="lg" icon={<ArrowRightIcon className="size-[18px]" />}>
              Full Tier List
            </TitanButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
