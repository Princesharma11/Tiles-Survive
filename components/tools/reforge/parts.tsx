"use client";

import { motion } from "framer-motion";
import { STAT_TIER_META, type Grade, type StatTier } from "@/data/gearReforge";
import { springSnappy } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  Shared reforge UI primitives — tier chips, grade chips,           */
/*  chunky segmented toggles. Adventure-HUD compliant.                */
/* ------------------------------------------------------------------ */

export function TierChip({ tier, className }: { tier: StatTier; className?: string }) {
  const meta = STAT_TIER_META[tier];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider",
        meta.chip,
        className
      )}
    >
      {meta.label}
    </span>
  );
}

export const GRADE_CHIP: Record<Grade, string> = {
  S: "border-ink bg-gradient-to-b from-gold to-flame text-ink shadow-[0_2px_0_0_#2d2a26]",
  A: "border-river/70 bg-river/10 text-river",
  B: "border-leaf-deep/60 bg-leaf/15 text-leaf-deep",
  C: "border-ink/25 bg-sand/70 text-ink-soft",
  F: "border-[#d64545]/70 bg-[#d64545]/10 text-[#c23c3c]",
};

export const GRADE_PLATE: Record<Grade, string> = {
  S: "border-ink bg-gradient-to-b from-gold to-flame text-ink shadow-[0_4px_0_0_#2d2a26]",
  A: "border-ink bg-river text-white shadow-[0_4px_0_0_#1f5d88]",
  B: "border-ink bg-leaf text-white shadow-[0_4px_0_0_#2f5c1c]",
  C: "border-ink bg-sand text-ink shadow-[0_4px_0_0_#a39585]",
  F: "border-ink bg-[#d64545] text-white shadow-[0_4px_0_0_#8f2c2c]",
};

export function GradeChip({ grade, className }: { grade: Grade; className?: string }) {
  return (
    <span
      className={cn(
        "inline-grid size-7 shrink-0 place-items-center rounded-lg border-2 font-display text-sm font-extrabold",
        GRADE_CHIP[grade],
        className
      )}
      aria-label={`${grade} grade`}
    >
      {grade}
    </span>
  );
}

/** Chunky pill toggle used for all segmented picks (role / troop / faction / slot). */
export function SegToggle({
  active,
  onClick,
  children,
  className,
  disabled,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-pressed={active}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={springSnappy}
      className={cn(
        "rounded-xl border-[3px] px-3 py-2 font-display text-xs font-extrabold uppercase tracking-wide transition-all",
        active
          ? "border-ink bg-ink text-cream shadow-[0_3px_0_0_#000]"
          : "border-ink/20 bg-white text-ink-soft hover:border-ink/60 hover:text-ink",
        disabled && "cursor-not-allowed opacity-40 hover:border-ink/20",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

/** Section label used across panels. */
export function PanelLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-ember-deep", className)}>
      {children}
    </p>
  );
}

/** The standard chunky white panel card. */
export function Panel({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "relative overflow-hidden rounded-3xl border-[3px] border-ink bg-white shadow-[0_5px_0_0_#2d2a26,0_24px_44px_-22px_rgba(45,42,38,0.4)]",
        className
      )}
    >
      {children}
    </div>
  );
}
