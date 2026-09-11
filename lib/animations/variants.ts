import type { Transition, Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  TitanTilesSurvive — Motion Language                                */
/*  Every animation on the site flows through these shared primitives  */
/*  so the whole app feels like one machine.                           */
/* ------------------------------------------------------------------ */

/** Signature ease — fast attack, long silky settle (easeOutExpo-ish). */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Soft organic spring — cards, panels, layout shifts. */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 22,
  mass: 0.9,
};

/** Snappy spring — buttons, toggles, magnetic hovers. */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
};

/** Standard viewport config for scroll reveals. */
export const viewportOnce = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -80px 0px",
} as const;

/** Fade + rise — the workhorse reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

/** Fade only — for content sitting on busy backgrounds. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

/** Scale + fade — for tiles, plates, chips. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/** Masked line reveal — hero headline lines slide out of an overflow clip. */
export const lineReveal: Variants = {
  hidden: { y: "115%", rotate: 2 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
};

/** Orchestrator — staggers any set of child variants. */
export const staggerContainer = (
  staggerChildren = 0.09,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Mobile menu / dropdown item entrance. */
export const menuItem: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

/** Pulse ring for the logo mark. */
export const pulseRing: Variants = {
  idle: { scale: 1, opacity: 0.7 },
  pulse: (delay: number = 0) => ({
    scale: [1, 1.45],
    opacity: [0.7, 0],
    transition: {
      duration: 2.2,
      ease: "easeOut",
      repeat: Infinity,
      delay,
    },
  }),
};
