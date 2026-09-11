"use client";

import Link from "next/link";
import { useRef, type MouseEventHandler, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { springSnappy } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  TitanButton — magnetic, shining, spring-loaded command button.     */
/*  UI primitive: renders a <Link> when `href` is given, else button.  */
/* ------------------------------------------------------------------ */

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

export interface TitanButtonProps {
  href?: string;
  onClick?: MouseEventHandler;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-gold-300 via-gold-500 to-gold-600 text-void font-semibold shadow-glow hover:brightness-110",
  outline:
    "border border-gold-500/40 text-gold-300 bg-gold-500/5 backdrop-blur-sm hover:border-gold-500/80 hover:bg-gold-500/10 hover:shadow-glow",
  ghost:
    "border border-steel-500/40 text-steel-200 hover:border-steel-300/60 hover:text-white",
};

const sizeStyles: Record<Size, string> = {
  md: "h-11 px-5 text-[13px] tracking-[0.14em]",
  lg: "h-14 px-8 text-sm tracking-[0.16em]",
};

export function TitanButton({
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  ariaLabel,
}: TitanButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic pull — button leans toward the cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, springSnappy);
  const y = useSpring(my, springSnappy);

  const handleMove: MouseEventHandler = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.18);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <span
      className={cn(
        "group/btn relative inline-flex h-full w-full items-center justify-center gap-2.5 overflow-hidden rounded-lg font-display uppercase transition-colors duration-300",
        variantStyles[variant],
        sizeStyles[size]
      )}
    >
      {/* Shine sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 blur-sm transition-transform duration-700 ease-out group-hover/btn:translate-x-[420%]"
      />
      {/* HUD corner ticks (primary only) */}
      {variant === "primary" && (
        <>
          <span
            aria-hidden
            className="absolute left-1.5 top-1.5 size-2 border-l border-t border-void/50"
          />
          <span
            aria-hidden
            className="absolute bottom-1.5 right-1.5 size-2 border-b border-r border-void/50"
          />
        </>
      )}
      {icon && <span className="relative size-[18px] shrink-0">{icon}</span>}
      <span className="relative">{children}</span>
    </span>
  );

  const shell = cn("inline-block rounded-lg", className);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      transition={springSnappy}
      style={reduce ? undefined : { x, y }}
      className={shell}
    >
      {href ? (
        <Link
          href={href}
          aria-label={ariaLabel}
          className="block h-full w-full"
        >
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={onClick} aria-label={ariaLabel} className="block h-full w-full">
          {inner}
        </button>
      )}
    </motion.div>
  );
}

export default TitanButton;
