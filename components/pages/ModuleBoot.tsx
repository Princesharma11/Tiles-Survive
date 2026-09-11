"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TitanButton from "@/components/ui/TitanButton";
import { ArrowLeftIcon, AnvilIcon, CalculatorIcon, RadarIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import { fadeUp, staggerContainer, EASE_OUT_EXPO } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  ModuleBoot — shared "module coming online" shell for tools that    */
/*  are still in the forge. Sets the routing/UX foundation now so the  */
/*  interactive logic can be dropped into a dedicated component later. */
/* ------------------------------------------------------------------ */

type Variant = "radar" | "calc" | "forge";

export interface ModuleBootProps {
  moduleId: string;
  title: string;
  titleAccent?: string;
  tagline: string;
  description: string;
  bullets: string[];
  bootLines: string[];
  variant: Variant;
  status: string;
}

const qualityTiers = [
  { label: "WHITE", color: "#9dacc6" },
  { label: "GREEN", color: "#57e6c5" },
  { label: "BLUE", color: "#5ea5ff" },
  { label: "PURPLE", color: "#c084fc" },
  { label: "LEGENDARY", color: "#f5b942" },
];

function VariantVisual({ variant }: { variant: Variant }) {
  if (variant === "radar") {
    return (
      <div className="relative mx-auto aspect-square w-full max-w-[280px]">
        <div className="absolute inset-0 rounded-full border border-gold-500/25" />
        <div className="absolute inset-[18%] rounded-full border border-gold-500/20" />
        <div className="absolute inset-[36%] rounded-full border border-gold-500/15" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-gold-500/10" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-gold-500/10" />
        <div className="radar-sweep absolute inset-0" />
        <span className="absolute left-[30%] top-[26%] size-2 animate-blip rounded-full bg-ember-500" />
        <span className="absolute right-[24%] top-[58%] size-2 animate-blip rounded-full bg-gold-500 [animation-delay:0.8s]" />
        <span className="absolute left-[52%] top-[72%] size-2 animate-blip rounded-full bg-mint-400 [animation-delay:1.6s]" />
        <span className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400 shadow-glow" />
      </div>
    );
  }

  if (variant === "calc") {
    return (
      <div className="mx-auto flex w-full max-w-[280px] flex-col gap-3 py-4">
        {[
          { parts: ["GUARDS 45%", "GUNNERS 35%", "MARKSMEN 20%"], hot: 0 },
          { parts: ["STALWART", "COUNTERS", "AERONAUT"], hot: 2 },
          { parts: ["FRONTLINE", "MIDLINE", "BURST"], hot: 1 },
        ].map((row, r) => (
          <div key={r} className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-void/60 px-4 py-3.5">
            {row.parts.map((p, i) => (
              <span
                key={p}
                className={cn(
                  "font-mono text-[11px] tracking-[0.14em]",
                  i === row.hot ? "animate-breathe text-gold-400" : "text-steel-400"
                )}
              >
                {p}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[280px] flex-col items-center gap-6 py-4">
      <span className="grid size-20 place-items-center rounded-2xl border border-mint-400/30 bg-mint-400/5 text-mint-400">
        <AnvilIcon className="size-10" />
      </span>
      <div className="flex w-full flex-col gap-2">
        {qualityTiers.map((tier, i) => (
          <div key={tier.label} className="flex items-center gap-3">
            <span className="w-24 font-mono text-[10px] tracking-[0.2em] text-steel-400">
              {tier.label}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full"
                style={{ background: tier.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${100 - i * 14}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12, ease: EASE_OUT_EXPO }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ModuleBoot({
  moduleId,
  title,
  titleAccent,
  tagline,
  description,
  bullets,
  bootLines,
  variant,
  status,
}: ModuleBootProps) {
  const VariantIcon =
    variant === "radar" ? RadarIcon : variant === "calc" ? CalculatorIcon : AnvilIcon;

  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8 md:pt-40">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-steel-400 transition-colors hover:text-gold-400"
      >
        <ArrowLeftIcon className="size-4" />
        RETURN TO HQ
      </Link>

      <motion.div
        variants={staggerContainer(0.1, 0.05)}
        initial="hidden"
        animate="show"
        className="mt-8 grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]"
      >
        <div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 font-mono text-[10px] tracking-[0.28em] text-gold-400">
              MODULE // {moduleId}
            </span>
            <span className="flex items-center gap-2 rounded-full border border-ember-500/40 bg-ember-500/10 px-3 py-1 font-mono text-[10px] tracking-[0.28em] text-ember-400">
              <span aria-hidden className="size-1.5 animate-blip rounded-full bg-ember-500" />
              {status}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-bold uppercase italic leading-[1.02] tracking-tight text-steel-100 sm:text-6xl"
          >
            {title}{" "}
            {titleAccent && <span className="text-gradient-gold">{titleAccent}</span>}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-3 font-mono text-[12px] tracking-[0.2em] text-gold-500">
            {tagline.toUpperCase()}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-steel-300">
            {description}
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-8 grid max-w-xl gap-2.5 sm:grid-cols-2">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-panel/50 px-4 py-3 text-[13px] text-steel-200"
              >
                <VariantIcon className="size-4 shrink-0 text-gold-500" />
                {bullet}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <TitanButton href="/guides" variant="outline">
              Read The Codex
            </TitanButton>
            <TitanButton href="/" variant="ghost">
              Back To HQ
            </TitanButton>
          </motion.div>
        </div>

        {/* Boot console */}
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel/60 p-8 backdrop-blur-md"
        >
          <div aria-hidden className="bg-grid absolute inset-0 opacity-30" />
          <div className="relative">
            <VariantVisual variant={variant} />

            <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
              {bootLines.map((line, i) => (
                <div key={line}>
                  <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-steel-400">
                    <span>{line}</span>
                    <span className="text-gold-500">RUNNING</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-300"
                      animate={{ width: ["10%", "86%", "10%"] }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.35,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center font-mono text-[10px] tracking-[0.3em] text-steel-500">
              FULL DEPLOYMENT IN PROGRESS
            </p>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
