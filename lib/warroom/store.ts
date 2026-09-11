import type { WarSession } from "./types";
import { SESSION_TTL, generateWarCode, normalizeCode } from "./types";

/* ------------------------------------------------------------------ */
/*  War Room session store.                                            */
/*                                                                     */
/*  • Dev / preview: in-memory Map (single Node process).              */
/*  • Production (optional): Upstash Redis REST — activates            */
/*    automatically when KV_REST_API_URL / UPSTASH_REDIS_REST_URL      */
/*    + token env vars exist (e.g. via the Vercel Marketplace          */
/*    Upstash integration). Rooms auto-expire after 24h.               */
/*                                                                     */
/*  Realtime strategy on the client: BroadcastChannel for instant      */
/*  same-browser sync (multi-tab demo) + 2s polling for cross-device.  */
/* ------------------------------------------------------------------ */

export interface WarStore {
  get(code: string): Promise<WarSession | null>;
  create(allianceName: string): Promise<WarSession>;
  save(session: WarSession): Promise<void>;
}

const TTL_SECONDS = SESSION_TTL;

/* --------------------------- memory ------------------------------- */
/* NB: Next.js serves API routes from multiple worker processes, so
   neither module-level Maps nor globalThis are reliably shared between
   /api/war and /api/war/[code]. For dev/preview we back the store with
   JSON files in the OS temp dir (shared by every process on the box).
   In production, set Upstash env vars (Vercel Marketplace integration)
   and the Redis store below activates instead. */

import { readFileSync, writeFileSync, renameSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const DIR = join(tmpdir(), "tts-war-rooms");

function warFile(code: string) {
  return join(DIR, `${code.toLowerCase()}.json`);
}

const fileStore: WarStore = {
  async get(code) {
    try {
      const raw = readFileSync(warFile(code), "utf8");
      const session = JSON.parse(raw) as WarSession;
      if (session.expiresAt < Date.now()) {
        try { unlinkSync(warFile(code)); } catch { /* already gone */ }
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },
  async create(allianceName) {
    mkdirSync(DIR, { recursive: true });
    let session: WarSession | null = null;
    let code = "";
    for (let i = 0; i < 16 && !session; i++) {
      code = generateWarCode();
      if (!(await fileStore.get(code))) session = newSession(code, allianceName);
    }
    if (!session) throw new Error("Could not allocate a war code.");
    atomicWrite(warFile(code), JSON.stringify(session));
    return session;
  },
  async save(session) {
    mkdirSync(DIR, { recursive: true });
    atomicWrite(warFile(session.code), JSON.stringify(session));
  },
};

function atomicWrite(file: string, data: string) {
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  writeFileSync(tmp, data, "utf8");
  renameSync(tmp, file);
}

/** Opportunistic sweep of expired rooms (best-effort, cheap). */
function sweepDisk() {
  try {
    const now = Date.now();
    for (const f of readdirSync(DIR)) {
      if (!f.endsWith(".json")) continue;
      const full = join(DIR, f);
      try {
        const s = JSON.parse(readFileSync(full, "utf8")) as WarSession;
        if (s.expiresAt < now) unlinkSync(full);
      } catch { /* unreadable → leave it */ }
    }
  } catch { /* dir missing yet */ }
}

/* --------------------------- upstash ------------------------------ */

const restUrl =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
const restToken =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
const upstashReady = Boolean(restUrl && restToken);

async function upstashCommand<T>(command: string): Promise<T | null> {
  const res = await fetch(restUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${restToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command.split(" ")),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash error ${res.status}`);
  const data = await res.json();
  return (data?.result ?? null) as T | null;
}

const upstashStore: WarStore = {
  async get(code) {
    const raw = await upstashCommand<string>(`GET war:${code.toLowerCase()}`);
    if (!raw) return null;
    const session = JSON.parse(raw) as WarSession;
    if (session.expiresAt < Date.now()) return null;
    return session;
  },
  async create(allianceName) {
    let session: WarSession | null = null;
    let code = "";
    for (let i = 0; i < 8 && !session; i++) {
      code = generateWarCode();
      const existing = await upstashStore.get(code);
      if (!existing) session = newSession(code, allianceName);
    }
    if (!session) throw new Error("Could not allocate a war code.");
    await upstashStore.save(session);
    return session;
  },
  async save(session) {
    await upstashCommand(
      `SET war:${session.code.toLowerCase()} ${JSON.stringify(session)} EX ${TTL_SECONDS}`
    );
  },
};

/* --------------------------- factory ------------------------------ */

export function newSession(code: string, allianceName: string): WarSession {
  const now = Date.now();
  return {
    code,
    allianceName: allianceName.trim().slice(0, 40) || "Unnamed Alliance",
    leaderToken: `${now.toString(36)}${Math.random().toString(36).slice(2, 12)}`,
    createdAt: now,
    v: 1,
    phase: "planning",
    liveStartedAt: null,
    expiresAt: now + TTL_SECONDS * 1000,
    control: {
      arcadia: "enemy",
      "tower-ne": "enemy",
      "tower-se": "enemy",
      "tower-sw": "enemy",
      "tower-nw": "enemy",
    },
    members: [],
    ticker: [
      {
        id: "boot",
        text: `War Room deployed for ${allianceName.trim().slice(0, 40) || "Unnamed Alliance"} — drop the invite link in Discord!`,
        level: "info",
        at: now,
      },
    ],
    pings: [],
  };
}

export function getStore(): WarStore {
  return upstashReady ? upstashStore : fileStore;
}

export { upstashReady };

/** Normalize a code coming from URL params. */
export function safeCode(raw: string): string | null {
  const code = normalizeCode(decodeURIComponent(raw));
  if (!/^[A-Za-z0-9-]{3,64}$/.test(code)) return null;
  return code;
}
