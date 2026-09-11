"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { getIcon } from "@/components/ui/icons";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { Feature } from "@/data/features";
import { cn } from "@/lib/utils/cn";
import { springSoft } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  FeatureCard — tilts, lifts, spotlights under the cursor, and       */
/*  EXPANDS on hover to reveal tool details (tap toggles on touch).    */
/* ------------------------------------------------------------------ */

const accentMap = {
  gold: {
    chip: "border-gold-500/40 bg-gold-500/10 text-gold-400",
    plate: "border-gold-500/30 bg-gold-500/10 text-gold-400",
    glow: "hover:border-gold-500/50 hover:shadow-glow",
    tagline: "text-gold-500",
  },
  ember: {
    chip: "border-ember-500/40 bg-ember-500/10 text-ember-400",
    plate: "border-ember-500/30 bg-ember-500/10 text-ember-400",
    glow: "hover:border-ember-500/50 hover:shadow-ember",
    tagline: "text-ember-400",
  },
  mint: {
    chip: "border-mint-400/40 bg-mint-400/10 text-mint-400",
    plate: "border-mint-400/30 bg-mint-400/10 text-mint-400",
    glow: "hover:border-mint-400/50 hover:shadow-[0_0_32px_rgba(87,230,197,0.12)]",
    tagline: "text-mint-400",
  },
} as const;

export default function FeatureCard({ feature }: { feature: Feature }) {
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();

  // Cursor spotlight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, rgba(245,185,66,0.09), transparent 70%)`;

  const accent = accentMap[feature.accent];
  const Icon = getIcon(feature.icon);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 36 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      onTap={() => setExpanded((v) => !v)}
      onMouseMove={handleMove}
      whileHover={reduce ? undefined : { y: -8 }}
      transition={springSoft}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel/70 p-7 backdrop-blur-md transition-colors duration-500",
        accent.glow
      )}
      data-expanded={expanded}
    >
      {/* Cursor spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight, opacity: expanded ? 1 : 0 }}
      />

      {/* Top status rail */}
      <div className="relative mb-7 flex items-center justify-between">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-xl border backdrop-blur-sm",
            accent.plate
          )}
        >
          <Icon className="size-6" />
        </span>
        <span
          className={cn(
            "rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.28em]",
            accent.chip
          )}
        >
          {feature.status}
        </span>
      </div>

      <p className="relative font-mono text-[10px] tracking-[0.3em] text-steel-500">
        MODULE // {feature.index}
      </p>
      <h3 className="relative mt-2 font-display text-2xl font-bold uppercase italic tracking-tight text-steel-100">
        {feature.title}
      </h3>
      <p
        className={cn(
          "relative mt-1 font-mono text-[11px] tracking-[0.14em]",
          accent.tagline
        )}
      >
        {feature.tagline}
      </p>

      <p className="relative mt-4 text-sm leading-relaxed text-steel-300">
        {feature.description}
      </p>

      {/* Expandable tool details */}
      <motion.div
        initial={false}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ ...springSoft, opacity: { duration: 0.3 } }}
        className="relative overflow-hidden"
      >
        <div className="pt-5">
          <ul className="space-y-2.5 border-t border-white/5 pt-5">
            {feature.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-3 text-[13px] text-steel-200"
              >
                <span aria-hidden className="text-[9px] text-gold-500">
                  ◆
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.2em] text-steel-500">
              {feature.meta.toUpperCase()}
            </span>
            <Link
              href={feature.href}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300"
              onClick={(e) => e.stopPropagation()}
            >
              OPEN TOOL
              <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Bottom accent rail */}
      <div className="relative mt-auto pt-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <p className="mt-3 text-center font-mono text-[9px] tracking-[0.35em] text-steel-500 transition-opacity duration-300"
          style={{ opacity: expanded ? 0 : 1 }}
        >
          HOVER TO EXPAND // TAP ON MOBILE
        </p>
      </div>
    </motion.article>
  );
}
