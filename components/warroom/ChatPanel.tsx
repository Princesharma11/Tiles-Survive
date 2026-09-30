"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ChatMessage, Member, TroopType } from "@/lib/warroom/types";
import { TROOP_META } from "@/lib/warroom/types";
import { springSnappy } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  ChatPanel — realtime war-room comms. Leader broadcasts get the     */
/*  gold plate treatment; members get troop-colored names; system      */
/*  events land as centered field wires. Synced by the 2s poll +       */
/*  BroadcastChannel (same browser = instant).                         */
/* ------------------------------------------------------------------ */

export interface ChatPanelProps {
  chat: ChatMessage[];
  members: Member[];
  isLeader: boolean;
  myMemberId: string | null;
  onSend: (text: string) => Promise<boolean>;
}

function troopColorOf(member: Member | undefined): string {
  return member ? TROOP_META[member.troop as TroopType].color : "#6b6157";
}

function fmtTime(at: number): string {
  const d = new Date(at);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function ChatPanel({
  chat,
  members,
  isLeader,
  myMemberId,
  onSend,
}: ChatPanelProps) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unread, setUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);
  const countRef = useRef(chat.length);

  /* Auto-scroll: stick to bottom while the user is already at the
     bottom; otherwise show a "new messages" pill instead of yanking
     the viewport. */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
      stickRef.current = nearBottom;
      if (nearBottom) setUnread(false);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (chat.length === countRef.current) return;
    const grew = chat.length > countRef.current;
    countRef.current = chat.length;
    if (!grew) return;
    if (stickRef.current) {
      el.scrollTop = el.scrollHeight;
    } else {
      setUnread(true);
    }
  }, [chat.length]);

  /* Initial scroll to bottom on mount */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value || busy) return;
    setBusy(true);
    setError(null);
    const ok = await onSend(value);
    if (ok) {
      setText("");
      stickRef.current = true;
      requestAnimationFrame(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      });
    } else {
      setError("Message failed — check your connection and retry.");
    }
    setBusy(false);
  };

  return (
    <section
      aria-label="War room chat"
      className="relative flex h-[26rem] flex-col overflow-hidden rounded-3xl border-[3px] border-ink bg-white shadow-[0_5px_0_0_#2d2a26,0_24px_44px_-22px_rgba(45,42,38,0.4)]"
    >
      {/* header */}
      <div className="flex items-center justify-between gap-2 border-b-[3px] border-ink bg-pine px-4 py-2.5">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-cream">
          💬 War Comms
        </p>
        <span className="rounded-full border-2 border-cream/30 bg-cream/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-cream/70">
          {isLeader ? "Leader channel" : "Alliance channel"}
        </span>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-2 overflow-y-auto scroll-smooth bg-paper/40 px-3.5 py-3"
      >
        {chat.length === 0 && (
          <p className="py-8 text-center font-display text-xs font-extrabold uppercase tracking-[0.2em] text-ink-faint">
            No transmissions yet — break the silence
          </p>
        )}
        {chat.map((msg) => {
          if (msg.kind === "system") {
            return (
              <p
                key={msg.id}
                className="mx-auto w-fit max-w-full rounded-full border-2 border-dashed border-ink/20 bg-white/70 px-3 py-1 text-center font-mono text-[10px] font-bold uppercase tracking-wide text-ink-faint"
              >
                {msg.text}
              </p>
            );
          }
          const isLeaderMsg = msg.authorId === "leader";
          const mine =
            (isLeader && isLeaderMsg) || (!isLeader && msg.authorId === myMemberId);
          const member = members.find((m) => m.id === msg.authorId);
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springSnappy}
              className={cn("flex flex-col", mine ? "items-end" : "items-start")}
            >
              <span
                className={cn(
                  "max-w-[92%] rounded-2xl border-[3px] px-3 py-1.5 text-sm font-semibold leading-relaxed shadow-[0_2px_0_0_#2d2a26]",
                  isLeaderMsg
                    ? "border-ink bg-gradient-to-b from-gold to-flame text-ink"
                    : mine
                      ? "border-ink/80 bg-leaf/15 text-ink"
                      : "border-ink/15 bg-white text-ink"
                )}
              >
                <span className="mr-1.5 font-display text-[10px] font-extrabold uppercase tracking-wide">
                  {isLeaderMsg ? "★ War Leader" : msg.name}
                  <span className="ml-1.5 font-mono text-[9px] font-bold text-ink-faint">
                    {fmtTime(msg.at)}
                  </span>
                </span>
                <span className="break-words">{msg.text}</span>
              </span>
              {!isLeaderMsg && member && (
                <span
                  className="mt-0.5 ml-1 font-mono text-[8px] font-bold uppercase tracking-wider"
                  style={{ color: troopColorOf(member) }}
                >
                  {TROOP_META[member.troop as TroopType].icon} {TROOP_META[member.troop as TroopType].label}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* unread pill */}
      <AnimatePresence>
        {unread && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            onClick={() => {
              const el = scrollRef.current;
              if (el) el.scrollTop = el.scrollHeight;
              stickRef.current = true;
              setUnread(false);
            }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full border-[3px] border-ink bg-gold px-3.5 py-1 font-display text-[11px] font-extrabold uppercase tracking-wide text-ink shadow-[0_3px_0_0_#2d2a26]"
          >
            ⬇ New transmissions
          </motion.button>
        )}
      </AnimatePresence>

      {/* composer */}
      <form
        onSubmit={send}
        className="flex items-center gap-2 border-t-[3px] border-ink bg-white px-3 py-2.5"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={200}
          placeholder={isLeader ? "Command the alliance…" : "Transmit to the room…"}
          aria-label="Chat message"
          className="min-w-0 flex-1 rounded-xl border-[3px] border-ink/60 bg-paper/60 px-3 py-2 font-display text-sm font-bold text-ink placeholder:font-semibold placeholder:text-ink-faint focus:border-ember focus:outline-none"
        />
        <motion.button
          type="submit"
          disabled={busy || !text.trim()}
          whileTap={busy || !text.trim() ? undefined : { scale: 0.94 }}
          className={cn(
            "shrink-0 rounded-xl border-[3px] px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wide shadow-[0_3px_0_0_#2d2a26] transition-all",
            busy || !text.trim()
              ? "cursor-not-allowed border-ink/15 bg-paper text-ink-faint shadow-none"
              : "border-ink bg-gradient-to-b from-flame to-ember text-white hover:-translate-y-0.5"
          )}
        >
          {busy ? "…" : "Send"}
        </motion.button>
      </form>
      {error && (
        <p className="border-t-2 border-dashed border-ink/10 bg-berry/5 px-3 py-1.5 font-mono text-[10px] font-bold text-berry">
          {error}
        </p>
      )}
    </section>
  );
}
