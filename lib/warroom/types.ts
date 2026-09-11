/* ------------------------------------------------------------------ */
/*  Arcadian War Room — domain model & battle configuration            */
/* ------------------------------------------------------------------ */

export type TroopType = "guards" | "gunners" | "marksmen";
export type WarRole = "rally" | "filler";
export type Control = "friendly" | "enemy";
export type Phase = "planning" | "live";

export interface Member {
  id: string;
  name: string;
  power: number; // total power level
  troop: TroopType;
  role: WarRole | null;
  slot: string | null; // SlotId
  joinedAt: number;
}

export interface TickerEntry {
  id: string;
  text: string;
  level: "info" | "alert";
  at: number;
}

export interface Ping {
  id: string;
  structureId: StructureId;
  at: number;
}

export interface WarSession {
  code: string; // e.g. "Arcadia-Alpha-77"
  allianceName: string;
  /** Present in server storage & create-response only — GET responses
     strip it so members can never read the leader's command token. */
  leaderToken?: string;
  createdAt: number;
  v: number; // version for cheap polling
  phase: Phase;
  liveStartedAt: number | null;
  expiresAt: number;
  control: Record<StructureId, Control>;
  members: Member[];
  ticker: TickerEntry[];
  pings: Ping[];
}

/* ------------------------- battle config -------------------------- */

export type StructureId =
  | "arcadia"
  | "tower-ne"
  | "tower-se"
  | "tower-sw"
  | "tower-nw";

export interface SlotConfig {
  id: string;
  kind: "rally" | "fill";
  capacity: number;
}

export interface StructureConfig {
  id: StructureId;
  name: string;
  short: string;
  icon: string;
  /** grid placement on the 3×3 battlefield */
  area: "tl" | "tr" | "bl" | "br" | "center";
  slots: SlotConfig[];
}

export const STRUCTURES: StructureConfig[] = [
  {
    id: "tower-nw",
    name: "Frost Tower",
    short: "NW",
    icon: "❄️",
    area: "tl",
    slots: [
      { id: "tower-nw-rally", kind: "rally", capacity: 1 },
      { id: "tower-nw-fill", kind: "fill", capacity: 5 },
    ],
  },
  {
    id: "tower-ne",
    name: "Aurora Tower",
    short: "NE",
    icon: "🌟",
    area: "tr",
    slots: [
      { id: "tower-ne-rally", kind: "rally", capacity: 1 },
      { id: "tower-ne-fill", kind: "fill", capacity: 5 },
    ],
  },
  {
    id: "arcadia",
    name: "Arcadia Center",
    short: "ARC",
    icon: "🏛️",
    area: "center",
    slots: [
      { id: "arcadia-rally", kind: "rally", capacity: 1 },
      { id: "arcadia-fill", kind: "fill", capacity: 8 },
    ],
  },
  {
    id: "tower-sw",
    name: "Ember Tower",
    short: "SW",
    icon: "🔥",
    area: "bl",
    slots: [
      { id: "tower-sw-rally", kind: "rally", capacity: 1 },
      { id: "tower-sw-fill", kind: "fill", capacity: 5 },
    ],
  },
  {
    id: "tower-se",
    name: "Grove Tower",
    short: "SE",
    icon: "🌿",
    area: "br",
    slots: [
      { id: "tower-se-rally", kind: "rally", capacity: 1 },
      { id: "tower-se-fill", kind: "fill", capacity: 5 },
    ],
  },
];

export function structureById(id: StructureId) {
  return STRUCTURES.find((s) => s.id === id);
}

export function slotById(id: string) {
  for (const s of STRUCTURES) {
    const slot = s.slots.find((sl) => sl.id === id);
    if (slot) return { structure: s, slot };
  }
  return null;
}

/** Live-execution event cycles (seconds), synced from liveStartedAt. */
export const WAR_EVENTS = [
  { id: "buff", label: "Buff Rotation", every: 10 * 60, icon: "⚡" },
  { id: "shield", label: "Arcadia Shield Drop", every: 20 * 60, icon: "🛡️" },
  { id: "lock", label: "Tower Lockout", every: 30 * 60, icon: "🔒" },
] as const;

export const WAR_DURATION = 3 * 60 * 60; // 3-hour conquest
export const SESSION_TTL = 24 * 60 * 60; // rooms auto-expire after a day

/* --------------------------- code gen ----------------------------- */

const CODE_A = [
  "Arcadia", "Titan", "Ember", "Aurora", "Frost",
  "Grove", "Rally", "Pine", "Forge", "Storm",
];
const CODE_B = [
  "Alpha", "Bravo", "Echo", "Nova", "Vanguard",
  "Sentinel", "Comet", "Falcon", "Warden", "Zephyr",
];

export function generateWarCode(): string {
  const a = CODE_A[Math.floor(Math.random() * CODE_A.length)];
  const b = CODE_B[Math.floor(Math.random() * CODE_B.length)];
  const n = Math.floor(Math.random() * 90) + 10;
  return `${a}-${b}-${n}`;
}

export const normalizeCode = (raw: string) =>
  raw.trim().replace(/^\/+|\/+$/g, "").replace(/^war\//i, "");

export const TROOP_META: Record<
  TroopType,
  { label: string; icon: string; color: string; counter: string }
> = {
  guards: { label: "Guards", icon: "🛡️", color: "#3d9bd1", counter: "vs Marksmen" },
  gunners: { label: "Gunners", icon: "🔫", color: "#f07d2e", counter: "vs Guards" },
  marksmen: { label: "Marksmen", icon: "🎯", color: "#ed5ca8", counter: "vs Gunners" },
};

/* --------------------------- actions ------------------------------ */

export type WarAction =
  | { type: "join"; member: { name: string; power: number; troop: TroopType } }
  | { type: "assign"; token: string; memberId: string; slotId: string | null }
  | { type: "role"; token: string; memberId: string; role: WarRole | null }
  | { type: "control"; token: string; structureId: StructureId; control: Control }
  | { type: "ticker"; token: string; text: string; level: "info" | "alert" }
  | { type: "ping"; token: string; structureId: StructureId }
  | { type: "startLive"; token: string }
  | { type: "endLive"; token: string }
  | { type: "remove"; token: string; memberId: string };
