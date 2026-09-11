"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useWarRoom, useNow, warIdentity } from "@/lib/warroom/client";
import type { Control, StructureId, WarRole } from "@/lib/warroom/types";
import { slotById } from "@/lib/warroom/types";
import { copyText } from "@/lib/utils/clipboard";
import { popIn } from "@/lib/animations/variants";
import JoinPanel from "./JoinPanel";
import TacticalMap from "./TacticalMap";
import RosterDrawer from "./RosterDrawer";
import CommandTicker from "./CommandTicker";
import EventTimers from "./EventTimers";

/* ------------------------------------------------------------------ */
/*  WarConsole — the /war/[code] command center.                       */
/*  Leader: full command authority (token kept in this browser only).  */
/*  Members: join once, then see the live board + personal orders.     */
/* ------------------------------------------------------------------ */

export default function WarConsole({ code }: { code: string }) {
  const { session, status, mutate, serverNow } = useWarRoom(code);
  const tick = useNow(1000);

  const [isLeader, setIsLeader] = useState(false);
  const [myMemberId, setMyMemberId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const inviteRef = useRef<HTMLInputElement>(null);

  /* Resolve local identity once the session arrives */
  useEffect(() => {
    if (!session) return;
    setIsLeader(Boolean(warIdentity.leaderToken(session.code)));
    setMyMemberId(warIdentity.memberId(session.code));
  }, [session]);

  /* If the leader token exists but doesn't match (fresh server state),
     it's still authoritative — the server validates every action. */

  const myMember = useMemo(
    () => session?.members.find((m) => m.id === myMemberId) ?? null,
    [session, myMemberId]
  );

  const needsJoin =
    status === "ready" && session !== null && !isLeader && myMember === null;

  const inviteUrl =
    typeof window !== "undefined" && session
      ? `${window.location.origin}/war/${encodeURIComponent(session.code)}`
      : "";

  const attemptCopy = async () => {
    const ok = await copyText(inviteUrl);
    setCopyState(ok ? "copied" : "failed");
    if (ok) {
      setTimeout(() => {
        setCopyState("idle");
        setInviteOpen(false);
      }, 1800);
    } else {
      /* clipboard fully blocked → link stays visible & pre-selected */
      setTimeout(() => {
        inviteRef.current?.focus();
        inviteRef.current?.select();
      }, 50);
    }
  };

  const toggleInvite = () => {
    const next = !inviteOpen;
    setInviteOpen(next);
    if (next) {
      setCopyState("idle");
      void attemptCopy();
    }
  };

  /* --------------------------- states ----------------------------- */

  if (status === "loading") {
    return (
      <Center>
        <div className="sticker px-10 py-8 text-center">
          <div className="radar-sweep mx-auto size-16" />
          <p className="mt-5 font-display text-lg font-extrabold uppercase tracking-[0.2em] text-ink">
            Opening war room…
          </p>
          <p className="mt-1 font-mono text-[11px] font-bold text-ink-faint">{code}</p>
        </div>
      </Center>
    );
  }

  if (status === "notfound" || !session) {
    return (
      <Center>
        <div className="sticker max-w-md px-10 py-10 text-center">
          <span className="text-5xl" aria-hidden>
            🏚️
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-ink">
            This War Room has fallen.
          </h2>
          <p className="mt-2 font-bold text-ink-soft">
            The code <span className="font-mono text-ember-deep">{code}</span>{" "}
            doesn&apos;t exist — or the room auto-expired after 24h of peace.
          </p>
          <Link
            href="/war-room"
            className="mt-6 inline-flex items-center rounded-2xl border-[3px] border-ink bg-gradient-to-b from-flame to-ember px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_0_#a03f10] transition-transform hover:-translate-y-0.5"
          >
            Deploy a new War Room
          </Link>
        </div>
      </Center>
    );
  }

  /* --------------------------- join gate --------------------------- */

  if (needsJoin) {
    return (
      <Center className="items-start pt-28">
        <JoinPanel
          allianceName={session.allianceName}
          onJoin={async (data) => {
            const res = await mutate({ type: "join", member: data });
            if (res.ok && res.session) {
              const me = res.session.members.find(
                (m) => m.name.toLowerCase() === data.name.toLowerCase()
              );
              if (me) {
                warIdentity.setMemberId(session.code, me.id);
                setMyMemberId(me.id);
              }
            }
            return res;
          }}
        />
      </Center>
    );
  }

  /* --------------------------- console ----------------------------- */

  const token = warIdentity.leaderToken(session.code) ?? "";
  const assignedCount = session.members.filter((m) => m.slot !== null).length;

  return (
    <div className="mx-auto max-w-7xl px-3 pb-44 pt-24 sm:px-6 sm:pt-28">
      {/* Command header */}
      <motion.header
        variants={popIn}
        initial="hidden"
        animate="show"
        className="mb-5 flex flex-wrap items-center gap-3 rounded-3xl border-[3px] border-ink bg-white/90 p-4 shadow-[0_4px_0_0_#2d2a26] backdrop-blur-sm"
      >
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 font-display text-xl font-extrabold leading-tight text-ink sm:text-2xl">
            {session.allianceName}
            <span
              className={`rounded-full border-2 border-ink px-2.5 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-[0.18em] ${
                session.phase === "live"
                  ? "animate-pulse bg-berry text-white"
                  : "bg-leaf text-white"
              }`}
            >
              {session.phase === "live" ? "● War Live" : "Planning"}
            </span>
            {isLeader && (
              <span className="rounded-full border-2 border-ink bg-gold px-2.5 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink">
                ★ Leader
              </span>
            )}
          </p>
          <p className="font-mono text-[11px] font-bold text-ink-soft">
            {session.members.length} on roster · {assignedCount} deployed ·{" "}
            <span className="text-ember-deep">{session.code}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={toggleInvite}
          aria-expanded={inviteOpen}
          className="rounded-2xl border-[3px] border-ink bg-gradient-to-b from-gold to-flame px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wide text-ink shadow-[0_3px_0_0_#2d2a26] transition-all hover:-translate-y-0.5"
        >
          {copyState === "copied"
            ? "✓ Copied! Paste it in Discord"
            : inviteOpen
              ? "🔗 Close invite"
              : "🔗 Copy invite link"}
        </button>
      </motion.header>

      {/* Invite panel — the link is ALWAYS visible when open, so the
          invite is obtainable even where clipboard APIs are blocked. */}
      <AnimatePresence>
        {inviteOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-5 rounded-2xl border-[3px] border-ink bg-white p-3.5 shadow-[0_4px_0_0_#2d2a26]"
          >
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-ink-soft">
              War Room invite link
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <input
                ref={inviteRef}
                readOnly
                value={inviteUrl}
                onFocus={(e) => e.target.select()}
                aria-label="War Room invite link"
                className="min-w-0 flex-1 rounded-xl border-[3px] border-ink bg-paper/70 px-3 py-2 font-mono text-sm font-bold text-ink"
              />
              <button
                type="button"
                onClick={() => void attemptCopy()}
                className="shrink-0 rounded-xl border-[3px] border-ink bg-gradient-to-b from-leaf to-leaf-deep px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wide text-white shadow-[0_3px_0_0_#25511c] transition-all hover:-translate-y-0.5"
              >
                Copy again
              </button>
              <button
                type="button"
                onClick={() => setInviteOpen(false)}
                aria-label="Close invite panel"
                className="grid size-9 shrink-0 place-items-center rounded-xl border-[3px] border-ink bg-white text-xs font-black text-ink-soft hover:bg-paper"
              >
                ✕
              </button>
            </div>
            {copyState === "failed" && (
              <p className="mt-2 rounded-lg bg-berry/10 px-3 py-1.5 font-display text-[11px] font-bold text-berry">
                ⚠ This view blocks one-tap copy — the link above is already
                selected: press Ctrl / Cmd + C.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personal orders (members) */}
      {myMember && myMember.slot && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 rounded-2xl border-[3px] border-ink bg-gradient-to-b from-leaf to-leaf-deep px-4 py-3 text-white shadow-[0_4px_0_0_#25511c]"
        >
          <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/75">
            🎯 Your orders
          </p>
          <p className="font-display text-lg font-extrabold">
            Report to {slotById(myMember.slot)?.structure.name ?? "your slot"} as{" "}
            {myMember.role === "rally" ? "RALLY LEADER ★" : "Filler"} — reinforce
            on time.
          </p>
        </motion.div>
      )}

      {/* Timers */}
      <div className="mb-5">
        <EventTimers
          phase={session.phase}
          liveStartedAt={session.liveStartedAt}
          serverNow={serverNow}
          tick={tick}
          isLeader={isLeader}
          onGoLive={() => mutate({ type: "startLive", token })}
          onEndLive={() => mutate({ type: "endLive", token })}
        />
      </div>

      {/* Map + roster */}
      <div className="grid gap-5 lg:grid-cols-[1fr_330px]">
        <TacticalMap
          members={session.members}
          control={session.control}
          pings={session.pings}
          isLeader={isLeader}
          myMemberId={myMemberId}
          selectedId={selectedId}
          onAssign={(memberId, slotId) =>
            mutate({ type: "assign", token, memberId, slotId })
          }
          onSetControl={(structureId: StructureId, control: Control) =>
            mutate({ type: "control", token, structureId, control })
          }
          onPing={(structureId) => mutate({ type: "ping", token, structureId })}
          onSelect={setSelectedId}
        />

        <RosterDrawer
          members={session.members}
          isLeader={isLeader}
          myMemberId={myMemberId}
          selectedId={selectedId}
          onAssign={(memberId, slotId) =>
            mutate({ type: "assign", token, memberId, slotId })
          }
          onRemove={(memberId) => mutate({ type: "remove", token, memberId })}
          onCycleRole={(member) => {
            const next: WarRole | null =
              member.role === null
                ? "rally"
                : member.role === "rally"
                  ? "filler"
                  : null;
            mutate({ type: "role", token, memberId: member.id, role: next });
          }}
          onSelect={setSelectedId}
        />
      </div>

      {/* Selection helper (tap-to-assign flow) */}
      {selectedId && (
        <motion.div
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          className="fixed bottom-28 left-1/2 z-40 flex max-w-[92vw] -translate-x-1/2 items-center gap-3 rounded-2xl border-[3px] border-ink bg-white px-4 py-2.5 shadow-[0_4px_0_0_#2d2a26]"
        >
          <p className="truncate font-display text-sm font-extrabold text-ink">
            Assigning{" "}
            <span className="text-ember-deep">
              {session.members.find((m) => m.id === selectedId)?.name}
            </span>{" "}
            — tap a slot
          </p>
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="shrink-0 rounded-full border-2 border-ink bg-paper px-2 py-0.5 font-display text-[10px] font-extrabold uppercase text-ink-soft"
          >
            Cancel
          </button>
        </motion.div>
      )}

      {/* Sticky ticker */}
      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6">
        <CommandTicker
          ticker={session.ticker}
          isLeader={isLeader}
          onSend={async (text, level) => {
            const res = await mutate({ type: "ticker", token, text, level });
            return res.ok;
          }}
        />
      </div>
    </div>
  );
}

/* --------------------------- helpers ------------------------------ */

function Center({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-[85svh] items-center justify-center px-5 ${className}`}
    >
      {children}
    </div>
  );
}
