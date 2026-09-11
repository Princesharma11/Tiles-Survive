"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import Logo from "./Logo";
import TitanButton from "@/components/ui/TitanButton";
import { CrosshairIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import { EASE_OUT_EXPO, menuItem, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  SiteHeader — sticky command bar: scroll progress rail, pulsing     */
/*  logo, magic-move active underline, animated mobile overlay.        */
/* ------------------------------------------------------------------ */

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Lock body scroll while the mobile overlay is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Scroll progress rail */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-ember-500"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/5 bg-void/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20">
          <Logo />

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "group relative font-mono text-[12px] uppercase tracking-[0.22em] transition-colors duration-300",
                    active ? "text-gold-400" : "text-steel-300 hover:text-white"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2.5 inset-x-0 h-px bg-gold-500"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute -bottom-2.5 inset-x-0 h-px origin-left scale-x-0 bg-steel-400/50 transition-transform duration-300 group-hover:scale-x-100"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <TitanButton href="/war-room" variant="primary" size="md" icon={<CrosshairIcon className="size-[18px]" />}>
              Command Deck
            </TitanButton>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-lg border border-steel-500/40 text-steel-200 transition-colors hover:border-gold-500/60 hover:text-gold-400 lg:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="noise fixed inset-0 z-40 flex flex-col justify-between bg-void/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <motion.ul
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              animate="show"
              className="space-y-2"
            >
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <motion.li key={item.id} variants={menuItem}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-baseline justify-between border-b border-white/5 py-5",
                        active ? "text-gold-400" : "text-steel-100"
                      )}
                    >
                      <span className="font-display text-3xl font-bold uppercase italic tracking-tight">
                        {item.label}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.25em] text-steel-400">
                        {item.hint.toUpperCase()}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: EASE_OUT_EXPO }}
              className="space-y-4"
            >
              <TitanButton href="/war-room" variant="primary" size="lg" className="w-full">
                Enter War Room
              </TitanButton>
              <p className="text-center font-mono text-[10px] tracking-[0.3em] text-steel-500">
                {site.season}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
