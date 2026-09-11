import type { Transition, Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  TitanTilesSurvive — Motion Language ("Adventure HUD")              */
/*  Springy, game-feel motion: overshoot pops, floating loops,         */
/*  chunky presses. Every component shares these primitives.           */
/* ------------------------------------------------------------------ */

/** Soft adventure ease for big reveals. */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** The signature game-feel spring — cards, cutouts, pop-ins. Overshoots a touch. */
export const springPop: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 19,
  mass: 0.9,
};

/** Gentle spring — panels, layout shifts. */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 22,
};

/** Snappy spring — buttons, toggles. */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

/** Standard viewport config for scroll reveals. */
export const viewportOnce = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -80px 0px",
} as const;

/** Fade + rise + tiny tilt — the workhorse reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, rotate: -0.5 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
};

/** Bouncy scale pop — stickers, badges, characters. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springPop,
  },
};

/** Masked line reveal — hero headline lines. */
export const lineReveal: Variants = {
  hidden: { y: "115%", rotate: 3 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

/** Orchestrator — staggers child variants. */
export const staggerContainer = (
  staggerChildren = 0.09,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Mobile menu item entrance. */
export const menuItem: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};
