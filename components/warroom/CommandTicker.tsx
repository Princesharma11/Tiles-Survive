"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TickerEntry } from "@/lib/warroom/types";
import { springSnappy } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  CommandTicker — the alliance's live voice: scrolling command feed  */
/*  + highly visible alert flash + leader composer.                    */
/* ------------------------------------------------------------------ */

export interface CommandTickerProps {
  ticker: TickerEntry[];
  isLeader: boolean;
  onSend: (text: string, level: "info" | "alert") => Promise<boolean>;
}

export default function CommandTicker({
  ticker,
  isLeader,
  onSend,
}: CommandTickerProps) {
  const [text, setText] = useState("");
  const [quiet, setQuiet] = useState(false);
  const [sending, setSending] = useState(false);
  const [alertFlash, setAlertFlash] = useState<TickerEntry | null>(null);
  const lastSeen = useRef<number>(0);

  /* Flash a big alert whenever a new ALERT entry arrives from anyone */
  useEffect(() => {
    const newest = ticker[0];
    if (!newest) return;
    if (newest.at > lastSeen.current) {
      const isFirstLoad = lastSeen.current === 0;
      lastSeen.current = newest.at;
      if (!isFirstLoad && newest.level === "alert") {
        setAlertFlash(newest);
        const t = setTimeout(() => setAlertFlash(null), 4200);
        return () => clearTimeout(t);
      }
    }
  }, [ticker]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = text.trim();
    if (!clean || sending) return;
    setSending(true);
    const ok = await onSend(clean, quiet ? "info" : "alert");
    if (ok) setText("");
    setSending(false);
  };

  const latest = ticker[0];
  const rest = ticker.slice(1, 10);

  return (
    <div className="relative rounded-3xl border-[3px] border-ink bg-pine text-cream shadow-[0_5px_0_0_#2d2a26]">
      {/* ALERT flash overlay */}
      <AnimatePresence>
        {alertFlash && (
          <motion.div
            key={alertFlash.id}
            initial={{ y: -12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={springSnappy}
            className="pointer-events-none absolute inset-x-3 -top-14 z-30 rounded-2xl border-[3px] border-ink bg-gradient-to-b from-flame to-ember px-4 py-2.5 text-center shadow-[0_5px_0_0_#a03f10]"
          >
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.3em] text-white/85">
              ⚠ Alliance Command
            </p>
            <p className="font-display text-lg font-extrabold leading-tight text-white">
              {alertFlash.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
        {/* Latest command + scroll */}
        <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border-2 border-cream/20 bg-pine-deep/60 px-3 py-2">
          <p className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-gold">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-flame" />
            Command Ticker
          </p>
          {latest && (
            <p
              className={cn(
                "truncate font-display text-sm font-extrabold sm:text-base",
                latest.level === "alert" ? "text-flame" : "text-cream/90"
              )}
            >
              {latest.level === "alert" && "⚠ "}
              {latest.text}
            </p>
          )}
          {rest.length > 0 && (
            <p className="truncate font-mono text-[10px] font-bold text-cream/45">
              {rest.map((t) => `▸ ${t.text}`).join("   ")}
            </p>
          )}
        </div>

        {/* Composer (leader only) */}
        {isLeader ? (
          <form onSubmit={submit} className="flex items-center gap-2 sm:w-[46%]">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={140}
              placeholder='Type a command — "ABANDON WEST, REINFORCE ARCADIA"'
              aria-label="Alliance command"
              className="min-w-0 flex-1 rounded-xl border-[3px] border-cream/25 bg-pine-deep/70 px-3 py-2 font-display text-sm font-bold text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setQuiet((v) => !v)}
              aria-pressed={quiet}
              title={quiet ? "Info note (quiet)" : "Alert (blares on every screen)"}
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl border-[3px] font-display text-sm font-extrabold transition-colors",
                quiet
                  ? "border-cream/25 bg-pine-deep/70 text-cream/60"
                  : "border-ink bg-flame text-ink"
              )}
            >
              {quiet ? "💬" : "⚠"}
            </button>
            <button
              type="submit"
              disabled={!text.trim() || sending}
              className="h-10 shrink-0 rounded-xl border-[3px] border-ink bg-gradient-to-b from-gold to-flame px-4 font-display text-xs font-extrabold uppercase tracking-wide text-ink shadow-[0_3px_0_0_#a03f10] transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              Broadcast
            </button>
          </form>
        ) : (
          <p className="hidden shrink-0 items-center gap-2 rounded-xl border-2 border-cream/20 px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-cream/50 sm:flex">
            Listening for orders…
          </p>
        )}
      </div>
    </div>
  );
}
