"use client";

import type { Member } from "@/lib/warroom/types";
import { TROOP_META } from "@/lib/warroom/types";
import { fmtPower } from "@/lib/warroom/actions";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  MemberCard — draggable roster card with troop chip + role badge.   */
/*  Plain DOM (not motion) so native HTML5 drag events stay intact.    */
/* ------------------------------------------------------------------ */

export interface MemberCardProps {
  member: Member;
  isLeader?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
  onCycleRole?: (member: Member) => void;
  highlight?: boolean; // "this is you"
}

export default function MemberCard({
  member,
  isLeader = false,
  selected = false,
  onSelect,
  onRemove,
  onCycleRole,
  highlight = false,
}: MemberCardProps) {
  const troop = TROOP_META[member.troop];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", member.id);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable={isLeader}
      onDragStart={isLeader ? handleDragStart : undefined}
      onClick={() => onSelect?.(member.id)}
      className={cn(
        "group relative flex cursor-pointer items-center gap-2.5 rounded-xl border-[3px] bg-white px-2.5 py-2 shadow-[0_3px_0_0_#2d2a26] transition-all duration-200",
        selected ? "border-ember bg-gold/20" : "border-ink",
        highlight && "ring-2 ring-berry ring-offset-2 ring-offset-cream",
        isLeader && "hover:-translate-y-0.5 active:translate-y-0 active:cursor-grabbing",
        !isLeader && "cursor-default"
      )}
      title={isLeader ? "Drag to a slot — or tap, then tap a slot" : undefined}
    >
      {/* Troop token */}
      <span
        aria-hidden
        className="grid size-8 shrink-0 place-items-center rounded-lg border-2 border-ink text-sm"
        style={{ background: troop.color }}
      >
        {troop.icon}
      </span>

      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate font-display text-sm font-extrabold text-ink">
          {member.name}
          {highlight && (
            <span className="ml-1.5 rounded-full bg-berry px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-white">
              you
            </span>
          )}
        </p>
        <p className="font-mono text-[10px] font-bold text-ink-soft">
          ⚡ {fmtPower(member.power)} · {troop.label}
        </p>
      </div>

      {/* Role badge */}
      {member.role && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (isLeader && onCycleRole) onCycleRole(member);
          }}
          disabled={!isLeader}
          title={isLeader ? "Tap to change role" : undefined}
          className={cn(
            "shrink-0 rounded-full border-2 border-ink px-1.5 py-0.5 font-display text-[9px] font-extrabold uppercase tracking-wide",
            member.role === "rally"
              ? "bg-gradient-to-b from-gold to-flame text-ink"
              : "bg-paper text-ink-soft",
            isLeader && "transition-[filter] hover:brightness-105"
          )}
        >
          {member.role === "rally" ? "★ Rally" : "Fill"}
        </button>
      )}

      {/* Leader remove */}
      {isLeader && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(member.id);
          }}
          aria-label={`Remove ${member.name}`}
          className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-ink bg-white text-[10px] font-black text-ink-soft opacity-0 transition-opacity hover:bg-berry hover:text-white group-hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  );
}
