"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Member, TroopType } from "@/lib/warroom/types";
import { TROOP_META } from "@/lib/warroom/types";
import { fmtPower } from "@/lib/warroom/actions";
import { cn } from "@/lib/utils/cn";
import MemberCard from "./MemberCard";

/* ------------------------------------------------------------------ */
/*  RosterDrawer — the available pool: draggable cards + muster        */
/*  report. Dropping a card here (or anywhere on the drawer) pulls     */
/*  that member back off the map.                                      */
/* ------------------------------------------------------------------ */

export interface RosterDrawerProps {
  members: Member[];
  isLeader: boolean;
  myMemberId: string | null;
  selectedId: string | null;
  onAssign: (memberId: string, slotId: string | null) => void;
  onRemove: (memberId: string) => void;
  onCycleRole: (member: Member) => void;
  onSelect: (id: string | null) => void;
}

type Filter = "all" | TroopType;

export default function RosterDrawer({
  members,
  isLeader,
  myMemberId,
  selectedId,
  onAssign,
  onRemove,
  onCycleRole,
  onSelect,
}: RosterDrawerProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [dragOver, setDragOver] = useState(false);

  const pool = useMemo(
    () =>
      members
        .filter((m) => m.slot === null)
        .filter((m) => filter === "all" || m.troop === filter)
        .sort((a, b) => b.power - a.power),
    [members, filter]
  );

  const deployed = useMemo(() => members.filter((m) => m.slot !== null), [members]);

  const muster = useMemo(() => {
    const counts = { guards: 0, gunners: 0, marksmen: 0 };
    let total = 0;
    for (const m of members) {
      counts[m.troop]++;
      total += m.power;
    }
    return { counts, total };
  }, [members]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id) onAssign(id, null);
  };

  return (
    <aside
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col rounded-3xl border-[3px] border-ink bg-white/90 shadow-[0_4px_0_0_#2d2a26] backdrop-blur-sm transition-colors lg:max-h-[calc(100svh-13rem)] lg:sticky lg:top-24",
        dragOver && "border-ember bg-ember/10"
      )}
    >
      {/* Header */}
      <div className="border-b-[3px] border-dashed border-ink/15 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-extrabold text-ink">
            Available Roster
          </h3>
          <span className="rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink">
            {pool.length} ready
          </span>
        </div>

        {/* Muster report */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {(Object.keys(TROOP_META) as TroopType[]).map((t) => (
            <span
              key={t}
              className="rounded-full border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold text-ink"
              style={{ background: `${TROOP_META[t].color}33` }}
            >
              {TROOP_META[t].icon} {muster.counts[t]}
            </span>
          ))}
          <span className="rounded-full border-2 border-ink bg-gold/40 px-2 py-0.5 font-mono text-[10px] font-bold text-ink">
            ⚡ {fmtPower(muster.total)} total
          </span>
        </div>

        {/* Filters */}
        <div className="mt-2.5 flex gap-1.5">
          {(["all", "guards", "gunners", "marksmen"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded-full border-2 px-2 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-wide transition-colors",
                filter === f
                  ? "border-ink bg-ember text-white"
                  : "border-ink/20 bg-white text-ink-soft hover:border-ink"
              )}
            >
              {f === "all" ? "All" : TROOP_META[f].icon}
            </button>
          ))}
        </div>
      </div>

      {/* Pool */}
      <div className="flex min-h-[120px] flex-col gap-2 overflow-y-auto p-3 lg:overflow-y-auto">
        {pool.length === 0 && (
          <p className="py-6 text-center font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
            {members.length === 0
              ? "Waiting for survivors to join via the link…"
              : "Everyone is deployed — drag a card here to pull them back"}
          </p>
        )}

        {pool.map((m) => (
          <MemberCard
            key={m.id}
            member={m}
            isLeader={isLeader}
            selected={selectedId === m.id}
            onSelect={(id) => onSelect(selectedId === id ? null : id)}
            onRemove={isLeader ? onRemove : undefined}
            onCycleRole={onCycleRole}
            highlight={m.id === myMemberId}
          />
        ))}
      </div>

      {/* Deployed summary */}
      {deployed.length > 0 && (
        <div className="border-t-[3px] border-dashed border-ink/15 p-3">
          <p className="mb-1.5 font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink-soft">
            Deployed // {deployed.length}
          </p>
          <div className="flex max-h-24 flex-wrap gap-1 overflow-y-auto">
            {deployed.map((m) => (
              <motion.span
                layout
                key={m.id}
                className={cn(
                  "rounded-full border-2 border-ink px-2 py-0.5 font-display text-[10px] font-extrabold",
                  m.role === "rally" ? "bg-gold text-ink" : "bg-paper text-ink-soft"
                )}
                title="Tap to pull back (leader)"
                onClick={() => isLeader && onAssign(m.id, null)}
              >
                {m.name}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {isLeader && (
        <p className="border-t-2 border-dashed border-ink/10 px-4 py-2 text-center font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
          Drag cards onto the map · or tap card → tap slot
        </p>
      )}
    </aside>
  );
}
