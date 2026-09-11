"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  Logo — rounded tile-stack mark with a sprout, gently bobbing.      */
/* ------------------------------------------------------------------ */

export function TitanMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      {/* ground tile */}
      <rect x="6" y="26" width="36" height="16" rx="6" fill="#47892f" stroke="#2d2a26" strokeWidth="3" />
      <rect x="10" y="29" width="28" height="6" rx="3" fill="#6fae3e" />
      {/* upper tile */}
      <rect x="11" y="12" width="26" height="14" rx="5" fill="#f6c445" stroke="#2d2a26" strokeWidth="3" />
      <rect x="15" y="15" width="18" height="4.5" rx="2.25" fill="#ffb03a" />
      {/* sprout */}
      <path d="M24 12V6" stroke="#2d2a26" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 7c3.5 0 5-2 5-4-3 0-5 1.4-5 4Z" fill="#6fae3e" stroke="#2d2a26" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="TitanTilesSurvive — home"
    >
      <motion.span
        className="relative grid size-11 shrink-0 place-items-center rounded-2xl border-[3px] border-ink bg-gradient-to-b from-leaf to-leaf-deep shadow-[0_3px_0_0_#2d2a26]"
        whileHover={{ rotate: -6, scale: 1.08 }}
        whileTap={{ scale: 0.94, y: 2 }}
      >
        <TitanMark className="size-7 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
      </motion.span>

      <span className="font-display text-lg font-extrabold leading-none tracking-tight text-ink">
        Titan<span className="text-ember">Tiles</span>
        <span className="block text-[11px] font-bold tracking-[0.3em] text-ink-soft">
          SURVIVE HQ
        </span>
      </span>
    </Link>
  );
}

export default Logo;
