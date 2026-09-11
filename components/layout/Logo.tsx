"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  Logo — isometric tile mark with radar-pulse rings + wordmark.      */
/* ------------------------------------------------------------------ */

export function TitanMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path d="M12 1.5 21.5 7 12 12.5 2.5 7Z" fill="#f9ca72" />
      <path d="M2.5 7v10L12 22.5V12.5Z" fill="#b97f16" />
      <path d="M21.5 7v10L12 22.5V12.5Z" fill="#f5b942" />
      <path d="M12 4.6 17.8 7.8 12 11 6.2 7.8Z" fill="#fff3d6" opacity="0.85" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label="TitanTilesSurvive — home"
    >
      <span className="relative grid size-10 shrink-0 place-items-center">
        {/* Pulse rings */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-[10px] border border-gold-500/60"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
          transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
        />
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-[10px] border border-gold-500/40"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{
            duration: 2.4,
            ease: "easeOut",
            repeat: Infinity,
            delay: 1.2,
          }}
        />
        <span className="relative grid size-10 place-items-center rounded-[10px] border border-gold-500/30 bg-gold-500/5 transition-colors duration-300 group-hover:border-gold-500/60">
          <TitanMark className="size-6 transition-transform duration-500 group-hover:rotate-[180deg]" />
        </span>
      </span>

      <span className="font-display text-sm font-bold tracking-[0.22em] text-steel-100 sm:text-base">
        TITAN<span className="text-gold-400">TILES</span>SURVIVE
      </span>
    </Link>
  );
}

export default Logo;
