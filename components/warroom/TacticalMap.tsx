"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Control, Member, Ping, StructureId } from "@/lib/warroom/types";
import { STRUCTURES } from "@/lib/warroom/types";
import { springSnappy } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";
import MemberCard from "./MemberCard";

/* ------------------------------------------------------------------ */
/*  TacticalMap — top-down Arcadian battlefield: Arcadia center, four  */
/*  corner towers, friendly/enemy control toggles, drag-drop squad     */
/*  slots, and radar pings that ripple on every screen.                */
/* ------------------------------------------------------------------ */

const AREA_CLASS: Record<string, string> = {
  tl: "col-start-1 row-start-1",
  tr: "col-start-2 row-start-1 sm:col-start-3",
  center: "col-span-2 row-start-2 sm:col-span-1 sm:col-start-2 sm:row-start-2",
  bl: "col-start-1 row-start-3",
  br: "col-start-2 row-start-3 sm:col-start-3",
};

export interface TacticalMapProps {
  members: Member[];
  control: Record<StructureId, Control>;
  pings: Ping[];
  isLeader: boolean;
  myMemberId: string | null;
  selectedId: string | null;
  onAssign: (memberId: string, slotId: string | null) => void;
  onSetControl: (structureId: StructureId, control: Control) => void;
  onPing: (structureId: StructureId) => void;
  onSelect: (memberId: string | null) => void;
}

export default function TacticalMap({
  members,
  control,
  pings,
  isLeader,
  myMemberId,
  selectedId,
  onAssign,
  onSetControl,
  onPing,
  onSelect,
}: TacticalMapProps) {
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [activePing, setActivePing] = useState<Ping | null>(null);
  const lastSeenPing = useRef(0);

  /* Detect fresh pings (from any client) and ripple once */
  useEffect(() => {
    const newest = pings[0];
    if (newest && newest.at > lastSeenPing.current) {
      lastSeenPing.current = newest.at;
      setActivePing(newest);
      const t = setTimeout(() => setActivePing(null), 1900);
      return () => clearTimeout(t);
    }
  }, [pings]);

  const membersIn = (slotId: string) => members.filter((m) => m.slot === slotId);

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    setDragOver(null);
    const id = e.dataTransfer.getData("text/plain");
    if (id) onAssign(id, slotId);
  };

  const handleSlotClick = (slotId: string) => {
    if (selectedId) {
      onAssign(selectedId, slotId);
      onSelect(null);
    }
  };

  return (
    <div className="relative">
      {/* Dashed march routes (decorative) */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full"
      >
        <g stroke="#2d2a26" strokeOpacity="0.25" strokeWidth="0.5" strokeDasharray="2 2">
          <line x1="16" y1="16" x2="50" y2="50" />
          <line x1="84" y1="16" x2="50" y2="50" />
          <line x1="16" y1="84" x2="50" y2="50" />
          <line x1="84" y1="84" x2="50" y2="50" />
          <circle cx="50" cy="50" r="30" fill="none" strokeOpacity="0.12" />
        </g>
      </svg>

      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {STRUCTURES.map((structure) => {
          const ctrl = control[structure.id];
          const friendly = ctrl === "friendly";
          return (
            <div
              key={structure.id}
              className={cn(
                "relative flex flex-col rounded-2xl border-[3px] border-ink bg-white/95 p-3 shadow-[0_4px_0_0_#2d2a26] backdrop-blur-sm transition-shadow",
                AREA_CLASS[structure.area],
                structure.area === "center" && "bg-gradient-to-b from-white to-paper"
              )}
            >
              {/* Radar ping ripple */}
              <AnimatePresence>
                {activePing?.structureId === structure.id && (
                  <>
                    {[0, 0.35].map((delay) => (
                      <motion.span
                        key={`${activePing.id}-${delay}`}
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ember"
                        initial={{ scale: 0.4, opacity: 0.9 }}
                        animate={{ scale: 7, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.4, delay, ease: "easeOut" }}
                      />
                    ))}
                    <motion.span
                      className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full border-[3px] border-ink bg-ember px-2.5 py-0.5 font-display text-[10px] font-extrabold uppercase text-white shadow-[0_2px_0_0_#2d2a26]"
                      initial={{ scale: 0, y: 8 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={springSnappy}
                    >
                      📡 Ping!
                    </motion.span>
                  </>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="mb-2 flex items-center justify-between gap-1.5">
                <p className="flex items-center gap-1.5 font-display text-sm font-extrabold leading-none text-ink sm:text-base">
                  <span aria-hidden>{structure.icon}</span>
                  <span className="truncate">{structure.name}</span>
                </p>

                {/* Control toggle / badge */}
                {isLeader ? (
                  <span className="flex shrink-0 overflow-hidden rounded-full border-2 border-ink">
                    <button
                      type="button"
                      onClick={() => onSetControl(structure.id, "friendly")}
                      aria-label={`Mark ${structure.name} friendly`}
                      aria-pressed={friendly}
                      className={cn(
                        "px-1.5 py-0.5 text-[10px] font-black transition-colors",
                        friendly ? "bg-leaf text-white" : "bg-paper text-ink-faint hover:text-leaf-deep"
                      )}
                    >
                      🟢
                    </button>
                    <button
                      type="button"
                      onClick={() => onSetControl(structure.id, "enemy")}
                      aria-label={`Mark ${structure.name} enemy`}
                      aria-pressed={!friendly}
                      className={cn(
                        "px-1.5 py-0.5 text-[10px] font-black transition-colors",
                        !friendly ? "bg-berry text-white" : "bg-paper text-ink-faint hover:text-berry"
                      )}
                    >
                      🔴
                    </button>
                  </span>
                ) : (
                  <span
                    className={cn(
                      "shrink-0 rounded-full border-2 border-ink px-2 py-0.5 font-display text-[9px] font-extrabold uppercase text-white",
                      friendly ? "bg-leaf" : "bg-berry"
                    )}
                  >
                    {friendly ? "Friendly" : "Enemy"}
                  </span>
                )}
              </div>

              {/* Rally slot */}
              <SlotBox
                slotId={structure.slots[0].id}
                label="Rally Leader"
                hint="Best gear + Behemoth"
                accent="gold"
                occupied={membersIn(structure.slots[0].id)}
                capacity={structure.slots[0].capacity}
                dragOver={dragOver === structure.slots[0].id}
                selectedPending={!!selectedId}
                myMemberId={myMemberId}
                selectedId={selectedId}
                isLeader={isLeader}
                onDragOver={(v) => setDragOver(v ? structure.slots[0].id : null)}
                onDrop={(e) => handleDrop(e, structure.slots[0].id)}
                onClick={() => handleSlotClick(structure.slots[0].id)}
                onAssign={onAssign}
                onSelect={onSelect}
              />

              {/* Fill slot */}
              <SlotBox
                slotId={structure.slots[1].id}
                label="Reinforce Squad"
                hint="Fillers — send troops"
                accent="paper"
                occupied={membersIn(structure.slots[1].id)}
                capacity={structure.slots[1].capacity}
                dragOver={dragOver === structure.slots[1].id}
                selectedPending={!!selectedId}
                myMemberId={myMemberId}
                selectedId={selectedId}
                isLeader={isLeader}
                onDragOver={(v) => setDragOver(v ? structure.slots[1].id : null)}
                onDrop={(e) => handleDrop(e, structure.slots[1].id)}
                onClick={() => handleSlotClick(structure.slots[1].id)}
                onAssign={onAssign}
                onSelect={onSelect}
              />

              {/* Leader ping */}
              {isLeader && (
                <button
                  type="button"
                  onClick={() => onPing(structure.id)}
                  className="mt-2 rounded-xl border-2 border-dashed border-ink/30 py-1 font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-faint transition-colors hover:border-ember hover:bg-ember/10 hover:text-ember-deep"
                >
                  📡 Ping this structure
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ slot ------------------------------ */

function SlotBox({
  slotId,
  label,
  hint,
  accent,
  occupied,
  capacity,
  dragOver,
  selectedPending,
  myMemberId,
  selectedId,
  isLeader,
  onDragOver,
  onDrop,
  onClick,
  onAssign,
  onSelect,
}: {
  slotId: string;
  label: string;
  hint: string;
  accent: "gold" | "paper";
  occupied: Member[];
  capacity: number;
  dragOver: boolean;
  selectedPending: boolean;
  myMemberId: string | null;
  selectedId: string | null;
  isLeader: boolean;
  onDragOver: (over: boolean) => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
  onAssign: (memberId: string, slotId: string | null) => void;
  onSelect: (id: string | null) => void;
}) {
  const full = occupied.length >= capacity;

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(true);
      }}
      onDragLeave={() => onDragOver(false)}
      onDrop={onDrop}
      onClick={onClick}
      className={cn(
        "relative rounded-xl border-[3px] border-dashed p-1.5 transition-all",
        accent === "gold" ? "border-gold bg-gold/10" : "border-ink/25 bg-paper/60",
        dragOver && "scale-[1.02] border-ember bg-ember/15",
        selectedPending && !full && "cursor-pointer border-ember bg-ember/10",
        full && "border-solid"
      )}
      role={selectedPending && !full ? "button" : undefined}
      title={selectedPending && !full ? `Assign here` : undefined}
    >
      <div className="mb-1 flex items-center justify-between px-0.5">
        <p
          className={cn(
            "font-display text-[10px] font-extrabold uppercase tracking-[0.14em]",
            accent === "gold" ? "text-ember-deep" : "text-ink-soft"
          )}
        >
          {label}
        </p>
        <p className="font-mono text-[9px] font-bold text-ink-faint">
          {hint} · {occupied.length}/{capacity}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        {occupied.map((m) => (
          <div key={m.id} className="relative">
            <MemberCard
              member={m}
              isLeader={isLeader}
              selected={selectedId === m.id}
              onSelect={(id) => onSelect(selectedId === id ? null : id)}
              highlight={m.id === myMemberId}
            />
            {isLeader && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAssign(m.id, null);
                }}
                aria-label={`Pull ${m.name} from ${label}`}
                className="absolute -right-1.5 -top-1.5 z-10 grid size-5 place-items-center rounded-full border-2 border-ink bg-white text-[9px] font-black text-ink-soft shadow-[0_2px_0_0_#2d2a26] hover:bg-berry hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {Array.from({ length: Math.max(0, capacity - occupied.length) }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "grid place-items-center rounded-lg border-2 border-dashed py-1 font-mono text-[9px] font-bold text-ink-faint/70",
              dragOver && "border-ember text-ember-deep"
            )}
          >
            {selectedPending && i === 0
              ? "▼ tap to assign"
              : accent === "gold" && i === 0
                ? "★ rally slot"
                : "＋ open slot"}
          </div>
        ))}
      </div>
    </div>
  );
}
