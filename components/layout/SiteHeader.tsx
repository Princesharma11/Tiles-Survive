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
import { EASE_OUT_EXPO, menuItem, popIn, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  SiteHeader — warm glass bar, pill nav with layoutId slide,         */
/*  scroll progress trail, full-screen mobile camp menu.               */
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

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Scroll progress trail */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[5px] origin-left bg-gradient-to-r from-leaf via-flame to-berry"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <div
          className={cn(
            "mx-auto flex h-16 max-w-6xl items-center justify-between rounded-3xl border-[3px] px-4 transition-all duration-500 sm:px-5",
            scrolled
              ? "border-ink/90 bg-cream/85 shadow-[0_4px_0_0_rgba(45,42,38,0.85),0_18px_38px_-18px_rgba(45,42,38,0.45)] backdrop-blur-xl"
              : "border-transparent bg-cream/40 backdrop-blur-md"
          )}
        >
          <Logo />

          {/* Desktop pill nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border-2 border-ink/10 bg-white/70 p-1.5 lg:flex"
          >
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-display text-sm font-bold transition-colors duration-300",
                    active ? "text-cream" : "text-ink-soft hover:text-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-ember to-ember-deep shadow-[0_3px_0_0_#a03f10]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <TitanButton href="/war-room" size="md" icon={<CrosshairIcon className="size-[18px]" />}>
              War Room
            </TitanButton>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-12 place-items-center rounded-2xl border-[3px] border-ink bg-white shadow-[0_3px_0_0_#2d2a26] transition-transform active:translate-y-0.5 lg:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile camp menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-cream via-paper to-sand px-6 pb-10 pt-28 lg:hidden"
          >
            <div aria-hidden className="bg-tilegrid absolute inset-0 opacity-70" />
            {/* Decorative sun */}
            <motion.div
              aria-hidden
              className="absolute -right-16 top-16 size-56 rounded-full bg-gradient-to-b from-flame/50 to-gold/20 blur-2xl"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.ul
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              animate="show"
              className="relative space-y-4"
            >
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <motion.li key={item.id} variants={popIn}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border-[3px] px-5 py-4 font-display text-2xl font-extrabold shadow-[0_4px_0_0_#2d2a26]",
                        active
                          ? "border-ink bg-gradient-to-b from-ember to-ember-deep text-cream"
                          : "border-ink bg-white text-ink"
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-[10px] font-bold tracking-[0.18em] opacity-60">
                        {item.hint.toUpperCase()}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: EASE_OUT_EXPO }}
              className="relative"
            >
              <TitanButton href="/war-room" size="lg" className="w-full">
                Enter War Room
              </TitanButton>
              <p
                aria-hidden
                className="animate-bob mt-5 text-center font-display text-xl font-extrabold text-ink/80"
              >
                ⛺ ⚔️ 🔥 🌲
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
