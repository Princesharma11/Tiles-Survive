"use client";

import { motion } from "framer-motion";
import type { Phase } from "@/lib/warroom/types";
import { WAR_DURATION, WAR_EVENTS } from "@/lib/warroom/types";
import { fmtCountdown } from "@/lib/warroom/actions";
import { popIn, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  EventTimers — synchronized conquest clocks. Derived from the       */
/*  shared `liveStartedAt` (server-stored) + server clock offset, so   */
/*  every member's screen counts down in lockstep.                     */
/* ------------------------------------------------------------------ */

export interface EventTimersProps {
  phase: Phase;
  liveStartedAt: number | null;
  serverNow: () => number;
  tick: number; // re-render trigger (1s clock)
  isLeader: boolean;
  onGoLive: () => void;
  onEndLive: () => void;
}

export default function EventTimers({
  phase,
  liveStartedAt,
  serverNow,
  tick,
  isLeader,
  onGoLive,
  onEndLive,
}: EventTimersProps) {
  void tick; // consumed to re-render every second

  if (phase === "planning") {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border-[3px] border-ink bg-white/90 p-4 shadow-[0_4px_0_0_#2d2a26]">
        <div>
          <p className="font-display text-base font-extrabold text-ink">
            🕐 Planning Phase
          </p>
          <p className="font-mono text-[11px] font-bold text-ink-soft">
            Timers arm when the 3-hour Arcadian Conquest goes live.
          </p>
        </div>
        {isLeader && (
          <button
            type="button"
            onClick={onGoLive}
            className="rounded-2xl border-[3px] border-ink bg-gradient-to-b from-leaf to-leaf-deep px-5 py-2.5 font-display text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_0_#25511c] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
          >
            ⚔ Go Live
          </button>
        )}
      </div>
    );
  }

  const elapsed = Math.max(0, (serverNow() - (liveStartedAt ?? 0)) / 1000);
  const warLeft = Math.max(0, WAR_DURATION - elapsed);

  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      animate="show"
      className="flex flex-wrap items-stretch gap-3"
    >
      {/* War clock */}
      <motion.div
        variants={popIn}
        className="flex min-w-[130px] flex-col justify-center rounded-2xl border-[3px] border-ink bg-gradient-to-b from-ember to-ember-deep px-4 py-2.5 text-white shadow-[0_4px_0_0_#a03f10]"
      >
        <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/80">
          ⚔ War ends in
        </p>
        <p className="font-display text-2xl font-extrabold tabular-nums leading-tight">
          {fmtCountdown(warLeft)}
        </p>
      </motion.div>

      {/* Event cycles */}
      {WAR_EVENTS.map((event) => {
        const nextIn =
          event.every - (elapsed % event.every);
        return (
          <motion.div
            key={event.id}
            variants={popIn}
            className="flex min-w-[130px] flex-col justify-center rounded-2xl border-[3px] border-ink bg-white px-4 py-2.5 shadow-[0_4px_0_0_#2d2a26]"
          >
            <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink-soft">
              {event.icon} {event.label}
            </p>
            <p
              className={cn(
                "font-display text-2xl font-extrabold tabular-nums leading-tight",
                nextIn <= 30 ? "animate-pulse text-berry" : "text-ink"
              )}
            >
              {fmtCountdown(nextIn)}
            </p>
          </motion.div>
        );
      })}

      {isLeader && (
        <motion.button
          variants={popIn}
          type="button"
          onClick={onEndLive}
          className="ml-auto self-center rounded-xl border-[3px] border-ink/20 bg-white/70 px-3 py-2 font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-faint transition-colors hover:border-ink hover:text-ink"
        >
          End war (back to planning)
        </motion.button>
      )}
    </motion.div>
  );
}
