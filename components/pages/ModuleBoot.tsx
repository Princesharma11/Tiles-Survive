"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import TitanButton from "@/components/ui/TitanButton";
import { AnvilIcon, CalculatorIcon, RadarIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import { EASE_OUT_EXPO, fadeUp, popIn, staggerContainer } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  ModuleBoot — "expedition assembling" shell for tools under         */
/*  construction. The interactive logic drops into this page later.    */
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
  scene: string;
}

const qualityTiers = [
  { label: "WHITE", color: "#a39585" },
  { label: "GREEN", color: "#6fae3e" },
  { label: "BLUE", color: "#3d9bd1" },
  { label: "PURPLE", color: "#b084ff" },
  { label: "LEGENDARY", color: "#f6c445" },
];

function VariantVisual({ variant }: { variant: Variant }) {
  if (variant === "radar") {
    return (
      <div className="relative mx-auto aspect-square w-full max-w-[260px]">
        <div className="absolute inset-0 rounded-full border-[3px] border-ink/70 bg-paper" />
        <div className="absolute inset-[16%] rounded-full border-2 border-ink/40" />
        <div className="absolute inset-[34%] rounded-full border-2 border-ink/30" />
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-ink/15" />
        <div className="absolute left-0 top-1/2 h-0.5 w-full bg-ink/15" />
        <div className="radar-sweep absolute inset-0" />
        <motion.span
          className="absolute left-[30%] top-[26%] size-3 rounded-full border-2 border-ink bg-berry"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <motion.span
          className="absolute right-[22%] top-[58%] size-3 rounded-full border-2 border-ink bg-ember"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.5 }}
        />
        <motion.span
          className="absolute bottom-[18%] left-[52%] size-3 rounded-full border-2 border-ink bg-leaf"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 1 }}
        />
        <span className="absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-gold" />
      </div>
    );
  }

  if (variant === "calc") {
    return (
      <div className="mx-auto flex w-full max-w-[280px] flex-col gap-3 py-2">
        {[
          { parts: ["GUARDS 45%", "GUNNERS 35%", "MARKS 20%"], hot: 0 },
          { parts: ["STALWART", "▸", "AERONAUT"], hot: 2 },
          { parts: ["FRONT", "MID", "BURST"], hot: 2 },
        ].map((row, r) => (
          <div
            key={r}
            className="flex items-center justify-between gap-2 rounded-2xl border-[3px] border-ink bg-white px-4 py-3.5 shadow-[0_3px_0_0_#2d2a26]"
          >
            {row.parts.map((p, i) => (
              <motion.span
                key={p}
                className={cn(
                  "font-mono text-[11px] font-bold tracking-[0.1em]",
                  i === row.hot ? "text-ember-deep" : "text-ink-soft"
                )}
                animate={i === row.hot ? { opacity: [1, 0.45, 1] } : undefined}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                {p}
              </motion.span>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[280px] flex-col items-center gap-6 py-2">
      <motion.span
        className="grid size-20 place-items-center rounded-3xl border-[3px] border-ink bg-gradient-to-b from-flame to-ember text-white shadow-[0_4px_0_0_#2d2a26]"
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <AnvilIcon className="size-10" />
      </motion.span>
      <div className="flex w-full flex-col gap-2.5">
        {qualityTiers.map((tier, i) => (
          <div key={tier.label} className="flex items-center gap-3">
            <span className="w-24 font-mono text-[10px] font-bold tracking-[0.16em] text-ink-soft">
              {tier.label}
            </span>
            <div className="h-3 flex-1 overflow-hidden rounded-full border-2 border-ink/70 bg-white">
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
  scene,
}: ModuleBootProps) {
  const VariantIcon =
    variant === "radar" ? RadarIcon : variant === "calc" ? CalculatorIcon : AnvilIcon;

  return (
    <section className="relative overflow-hidden pb-28 pt-32 md:pt-40">
      {/* Scene backdrop */}
      <div aria-hidden className="absolute inset-0">
        <Image src={scene} alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/85 to-cream" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ink shadow-[0_3px_0_0_#2d2a26] transition-transform hover:-translate-y-0.5"
        >
          ← Back to HQ
        </Link>

        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          animate="show"
          className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]"
        >
          <div>
            <motion.div variants={popIn} className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-full border-[3px] border-ink px-3.5 py-1 font-display text-[11px] font-extrabold tracking-[0.2em] text-white shadow-[0_3px_0_0_#2d2a26]"
                style={{ background: "#3d9bd1" }}
              >
                MODULE {moduleId}
              </span>
              <span className="flex items-center gap-2 rounded-full border-[3px] border-ink bg-gold px-3.5 py-1 font-display text-[11px] font-extrabold tracking-[0.2em] text-ink shadow-[0_3px_0_0_#2d2a26]">
                <motion.span
                  aria-hidden
                  className="inline-block size-2 rounded-full bg-ink"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                {status}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-7xl"
            >
              {title}{" "}
              {titleAccent && <span className="text-sunset">{titleAccent}</span>}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-3 font-display text-base font-bold uppercase tracking-[0.14em] text-ember-deep"
            >
              {tagline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-ink-soft"
            >
              {description}
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-white px-4 py-3 text-sm font-bold text-ink shadow-[0_3px_0_0_#2d2a26]"
                >
                  <VariantIcon className="size-4 shrink-0 text-ember" />
                  {bullet}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <TitanButton href="/guides" variant="primary">
                Read The Codex
              </TitanButton>
              <TitanButton href="/" variant="paper">
                Back To HQ
              </TitanButton>
            </motion.div>
          </div>

          {/* Boot console */}
          <motion.div
            variants={popIn}
            className="relative overflow-hidden rounded-3xl border-[3px] border-ink bg-white p-8 shadow-[0_6px_0_0_#2d2a26,0_30px_50px_-20px_rgba(45,42,38,0.4)]"
          >
            <div aria-hidden className="bg-tilegrid absolute inset-0 opacity-60" />
            <div className="relative">
              <VariantVisual variant={variant} />

              <div className="mt-8 space-y-4 border-t-2 border-dashed border-ink/20 pt-6">
                {bootLines.map((line, i) => (
                  <div key={line}>
                    <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] font-bold tracking-[0.18em] text-ink-soft">
                      <span>{line}</span>
                      <span className="text-leaf-deep">RUNNING</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full border-2 border-ink/60 bg-paper">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-ember to-flame"
                        animate={{ width: ["12%", "86%", "12%"] }}
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

              <p className="mt-6 text-center font-display text-xs font-extrabold uppercase tracking-[0.28em] text-ink-faint">
                Expedition assembling…
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
