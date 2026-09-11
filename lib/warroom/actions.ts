import type { Member, TickerEntry, WarAction, WarSession } from "./types";
import { slotById, structureById, TROOP_META } from "./types";

/* ------------------------------------------------------------------ */
/*  Pure session reducer — used by the server store AND for optimistic */
/*  updates on the client, so both sides apply identical logic.        */
/* ------------------------------------------------------------------ */

const uid = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const LEADER_ACTIONS = new Set([
  "assign",
  "role",
  "control",
  "ticker",
  "ping",
  "startLive",
  "endLive",
  "remove",
]);

export type ApplyResult =
  | { ok: true; session: WarSession }
  | { ok: false; error: string };

export function applyAction(session: WarSession, action: WarAction): ApplyResult {
  if (LEADER_ACTIONS.has(action.type)) {
    const token = (action as { token: string }).token;
    if (token !== session.leaderToken) {
      return {
        ok: false,
        error: "Command authority required — only the War Room leader can do that.",
      };
    }
  }

  const next: WarSession = {
    ...session,
    v: session.v + 1,
    members: [...session.members],
    ticker: [...session.ticker],
    pings: [...session.pings],
    control: { ...session.control },
  };

  switch (action.type) {
    case "join": {
      const name = action.member.name.trim().slice(0, 24);
      if (!name) return { ok: false, error: "Username required." };
      if (next.members.some((m) => m.name.toLowerCase() === name.toLowerCase()))
        return { ok: false, error: "That callsign is already on the roster." };
      if (next.members.length >= 120)
        return { ok: false, error: "Roster is full (120)." };
      const member: Member = {
        id: uid(),
        name,
        power: Math.max(0, Math.min(9_999_999_999, Math.round(action.member.power))),
        troop: action.member.troop,
        role: null,
        slot: null,
        joinedAt: Date.now(),
      };
      next.members.push(member);
      const reportIn: TickerEntry = {
        id: uid(),
        text: `${member.name} reported in (${TROOP_META[member.troop].label} · ${fmtPower(member.power)})`,
        level: "info",
        at: Date.now(),
      };
      next.ticker = [reportIn, ...next.ticker].slice(0, 14);
      break;
    }

    case "assign": {
      const member = next.members.find((m) => m.id === action.memberId);
      if (!member) return { ok: false, error: "Member not found." };

      if (action.slotId === null) {
        member.slot = null;
        member.role = null;
        break;
      }
      const found = slotById(action.slotId);
      if (!found) return { ok: false, error: "Unknown slot." };
      const occupancy = next.members.filter(
        (m) => m.slot === action.slotId && m.id !== member.id
      ).length;
      if (occupancy >= found.slot.capacity)
        return { ok: false, error: `${found.structure.name} slot is full.` };
      member.slot = action.slotId;
      member.role = found.slot.kind === "rally" ? "rally" : "filler";
      break;
    }

    case "role": {
      const member = next.members.find((m) => m.id === action.memberId);
      if (!member) return { ok: false, error: "Member not found." };
      member.role = action.role;
      break;
    }

    case "control": {
      if (!structureById(action.structureId))
        return { ok: false, error: "Unknown structure." };
      next.control[action.structureId] = action.control;
      break;
    }

    case "ticker": {
      const text = action.text.trim().slice(0, 140);
      if (!text) return { ok: false, error: "Command text required." };
      const entry: TickerEntry = {
        id: uid(),
        text,
        level: action.level,
        at: Date.now(),
      };
      next.ticker = [entry, ...next.ticker].slice(0, 14);
      break;
    }

    case "ping": {
      if (!structureById(action.structureId))
        return { ok: false, error: "Unknown structure." };
      next.pings = [
        { id: uid(), structureId: action.structureId, at: Date.now() },
        ...next.pings,
      ].slice(0, 4);
      break;
    }

    case "startLive": {
      next.phase = "live";
      next.liveStartedAt = Date.now();
      const liveAlert: TickerEntry = {
        id: uid(),
        text: "⚔️ CONQUEST IS LIVE — hold your assignments and watch the timers!",
        level: "alert",
        at: Date.now(),
      };
      next.ticker = [liveAlert, ...next.ticker].slice(0, 14);
      break;
    }

    case "endLive": {
      next.phase = "planning";
      next.liveStartedAt = null;
      break;
    }

    case "remove": {
      const member = next.members.find((m) => m.id === action.memberId);
      if (!member) return { ok: false, error: "Member not found." };
      next.members = next.members.filter((m) => m.id !== action.memberId);
      const removal: TickerEntry = {
        id: uid(),
        text: `${member.name} was removed from the roster.`,
        level: "info",
        at: Date.now(),
      };
      next.ticker = [removal, ...next.ticker].slice(0, 14);
      break;
    }

    default:
      return { ok: false, error: "Unknown action." };
  }

  return { ok: true, session: next };
}

/* --------------------------- formatting --------------------------- */

export function fmtPower(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function fmtCountdown(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    return `${h}h ${String(m % 60).padStart(2, "0")}m`;
  }
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
