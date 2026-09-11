"use client";

import Link from "next/link";
import { useRef, type MouseEventHandler, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { springSnappy } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  TitanButton — chunky mobile-game button: hard ink edge, 3D press,  */
/*  shine sweep, magnetic hover. The signature CTA of the site.        */
/* ------------------------------------------------------------------ */

type Variant = "primary" | "sun" | "paper" | "pine";
type Size = "md" | "lg" | "xl";

export interface TitanButtonProps {
  href?: string;
  onClick?: MouseEventHandler;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  /** "submit" when used inside a form (default: "button"). */
  type?: "button" | "submit";
}

/** Face + edge colors per variant. Edge = the "depth" under the button. */
const variantStyles: Record<Variant, { face: string; edge: string; text: string }> = {
  primary: {
    face: "bg-gradient-to-b from-flame to-ember",
    edge: "#a03f10",
    text: "text-white",
  },
  sun: {
    face: "bg-gradient-to-b from-gold to-flame",
    edge: "#a03f10",
    text: "text-ink",
  },
  paper: {
    face: "bg-gradient-to-b from-white to-paper",
    edge: "#2d2a26",
    text: "text-ink",
  },
  pine: {
    face: "bg-gradient-to-b from-leaf to-leaf-deep",
    edge: "#25511c",
    text: "text-white",
  },
};

const sizeStyles: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
  xl: "h-16 px-9 text-lg",
};

export function TitanButton({
  href,
  onClick,
  variant = "primary",
  size = "lg",
  icon,
  children,
  className,
  ariaLabel,
  type = "button",
}: TitanButtonProps) {
  const reduce = useReducedMotion();
  const { face, edge, text } = variantStyles[variant];

  const inner = (
    <motion.span
      whileHover={reduce ? undefined : { y: -3 }}
      whileTap={reduce ? undefined : { y: 3 }}
      transition={springSnappy}
      className={cn(
        "group/btn relative inline-flex h-full w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-2xl border-[3px] border-ink font-display font-extrabold tracking-wide select-none",
        face,
        text,
        sizeStyles[size]
      )}
      style={{ boxShadow: `0 5px 0 0 ${edge}, 0 14px 26px -12px ${edge}` }}
    >
      {/* Shine sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 blur-sm transition-transform duration-700 ease-out group-hover/btn:translate-x-[420%]"
      />
      {/* Top gloss */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-2 top-1 h-[38%] rounded-full bg-white/25"
      />
      {icon && <span className="relative size-5 shrink-0">{icon}</span>}
      <span className="relative drop-shadow-[0_1px_0_rgba(0,0,0,0.15)]">
        {children}
      </span>
    </motion.span>
  );

  return (
    <span className={cn("inline-block", className)}>
      {href ? (
        <Link href={href} aria-label={ariaLabel} className="block h-full w-full">
          {inner}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          aria-label={ariaLabel}
          className="block h-full w-full"
        >
          {inner}
        </button>
      )}
    </span>
  );
}

export default TitanButton;
