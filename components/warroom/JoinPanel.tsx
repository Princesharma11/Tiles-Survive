"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TroopType } from "@/lib/warroom/types";
import { TROOP_META } from "@/lib/warroom/types";
import { popIn, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  JoinPanel — the zero-account join flow: callsign, power, troop.    */
/* ------------------------------------------------------------------ */

export interface JoinPanelProps {
  allianceName: string;
  onJoin: (data: { name: string; power: number; troop: TroopType }) => Promise<{
    ok: boolean;
    error?: string;
  }>;
}

export default function JoinPanel({ allianceName, onJoin }: JoinPanelProps) {
  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [troop, setTroop] = useState<TroopType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const powerNum = Math.round(parseFloat(power.replace(/[^\d.]/g, "")) || 0);
  const valid =
    name.trim().length >= 2 && troop !== null && powerNum > 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || busy || !troop) return;
    setBusy(true);
    setError(null);
    const res = await onJoin({ name: name.trim(), power: powerNum, troop });
    if (!res.ok) setError(res.error ?? "Could not join.");
    setBusy(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 mx-auto w-full max-w-lg"
    >
      <form
        onSubmit={submit}
        className="rounded-3xl border-[3px] border-ink bg-white p-6 shadow-[0_6px_0_0_#2d2a26,0_30px_50px_-20px_rgba(45,42,38,0.45)] sm:p-8"
      >
        <p className="inline-block rounded-full border-[3px] border-ink bg-gold px-3 py-0.5 font-display text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink shadow-[0_2px_0_0_#2d2a26]">
          Report for war
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink">
          Join {allianceName}&apos;s
          <span className="text-sunset"> War Room</span>
        </h2>
        <p className="mt-1.5 text-sm font-bold text-ink-soft">
          No account needed — your leader sees you on the roster instantly.
        </p>

        <label className="mt-5 block">
          <span className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ink-soft">
            In-game username
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={24}
            placeholder="e.g. TileCrusher99"
            className="mt-1 w-full rounded-2xl border-[3px] border-ink bg-paper/60 px-4 py-3 font-display text-base font-bold text-ink placeholder:font-semibold placeholder:text-ink-faint focus:border-ember focus:outline-none"
          />
        </label>

        <label className="mt-4 block">
          <span className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ink-soft">
            Total power level
          </span>
          <input
            value={power}
            onChange={(e) => setPower(e.target.value)}
            inputMode="decimal"
            placeholder="e.g. 42.5  (millions)"
            className="mt-1 w-full rounded-2xl border-[3px] border-ink bg-paper/60 px-4 py-3 font-display text-base font-bold text-ink placeholder:font-semibold placeholder:text-ink-faint focus:border-ember focus:outline-none"
          />
          {powerNum > 0 && (
            <span className="mt-1 inline-block font-mono text-[10px] font-bold text-leaf-deep">
              ≈ {powerNum >= 1000 ? powerNum : `${powerNum}M`} power registered
            </span>
          )}
        </label>

        <fieldset className="mt-4">
          <legend className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ink-soft">
            Strongest troop type
          </legend>
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="show"
            className="mt-2 grid grid-cols-3 gap-2"
          >
            {(Object.keys(TROOP_META) as TroopType[]).map((t) => {
              const meta = TROOP_META[t];
              const active = troop === t;
              return (
                <motion.button
                  key={t}
                  type="button"
                  variants={popIn}
                  onClick={() => setTroop(t)}
                  aria-pressed={active}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl border-[3px] py-3 font-display text-sm font-extrabold transition-all",
                    active
                      ? "border-ink bg-gradient-to-b from-gold to-flame text-ink shadow-[0_4px_0_0_#2d2a26]"
                      : "border-ink/20 bg-paper/60 text-ink-soft hover:border-ink"
                  )}
                >
                  <span
                    aria-hidden
                    className="grid size-9 place-items-center rounded-xl border-2 border-ink text-lg"
                    style={{ background: meta.color }}
                  >
                    {meta.icon}
                  </span>
                  {meta.label}
                </motion.button>
              );
            })}
          </motion.div>
        </fieldset>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl border-[3px] border-ink bg-berry/15 px-3 py-2 text-center font-display text-sm font-bold text-berry"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!valid || busy}
          className="mt-6 h-14 w-full rounded-2xl border-[3px] border-ink bg-gradient-to-b from-leaf to-leaf-deep font-display text-lg font-extrabold uppercase tracking-wide text-white shadow-[0_5px_0_0_#25511c] transition-all enabled:hover:-translate-y-1 enabled:active:translate-y-0.5 disabled:opacity-40"
        >
          {busy ? "Reporting in…" : "⚔ Report for duty"}
        </button>
      </form>
    </motion.div>
  );
}
