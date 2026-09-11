"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { WarAction, WarSession } from "./types";

/* ------------------------------------------------------------------ */
/*  useWarRoom — the realtime client.                                  */
/*                                                                     */
/*  • Mutations POST to the API and optimistically update local state. */
/*  • Every applied update is broadcast on a BroadcastChannel so       */
/*    other tabs on the SAME browser sync instantly (great for the     */
/*    leader + member demo on one machine).                            */
/*  • A 2s poll (paused when the tab is hidden) reconciles members on  */
/*    other devices. `?v=` makes unchanged polls nearly free.          */
/*  • GET returns server `now` → clients compute a clock offset so     */
/*    every screen shows the same event countdowns.                    */
/* ------------------------------------------------------------------ */

export type WarRoomStatus = "loading" | "ready" | "notfound";

export function useWarRoom(code: string) {
  const [session, setSession] = useState<WarSession | null>(null);
  const [status, setStatus] = useState<WarRoomStatus>("loading");

  const versionRef = useRef(0);
  const offsetRef = useRef(0); // serverNow - clientNow
  const channelRef = useRef<BroadcastChannel | null>(null);

  const absorb = useCallback((payload: { session: WarSession; now?: number }) => {
    versionRef.current = payload.session.v;
    if (typeof payload.now === "number") {
      offsetRef.current = payload.now - Date.now();
    }
    setSession(payload.session);
    setStatus("ready");
  }, []);

  const refresh = useCallback(
    async (force = false) => {
      try {
        const q = force ? "" : `?v=${versionRef.current}`;
        const res = await fetch(`/api/war/${encodeURIComponent(code)}${q}`, {
          cache: "no-store",
        });
        if (res.status === 404) {
          setStatus("notfound");
          return;
        }
        const data = await res.json();
        if (!data.unchanged) absorb(data);
      } catch {
        /* transient network error — next poll retries */
      }
    },
    [code, absorb]
  );

  /* Initial load + polling */
  useEffect(() => {
    refresh(true);
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") refresh();
    }, 2000);
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  /* BroadcastChannel — instant same-browser sync */
  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    const bc = new BroadcastChannel(`tts-war-${code.toLowerCase()}`);
    bc.onmessage = (e) => {
      const data = e.data as { session: WarSession; now?: number } | null;
      if (data?.session && data.session.v !== versionRef.current) absorb(data);
    };
    channelRef.current = bc;
    return () => {
      bc.close();
      channelRef.current = null;
    };
  }, [code, absorb]);

  const mutate = useCallback(
    async (
      action: WarAction
    ): Promise<{ ok: boolean; error?: string; session?: WarSession }> => {
      try {
        const res = await fetch(`/api/war/${encodeURIComponent(code)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(action),
        });
        const data = await res.json();
        if (!res.ok) {
          return { ok: false, error: data?.error ?? "Command rejected." };
        }
        absorb(data);
        channelRef.current?.postMessage({
          session: data.session,
          now: Date.now() + offsetRef.current,
        });
        return { ok: true, session: data.session as WarSession };
      } catch {
        return { ok: false, error: "Network hiccup — try again." };
      }
    },
    [code, absorb]
  );

  /** Server-synchronized timestamp (ms). */
  const serverNow = useCallback(() => Date.now() + offsetRef.current, []);

  return { session, status, mutate, refresh, serverNow };
}

/** Ticking clock for countdowns (1s). */
export function useNow(intervalMs = 1000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

/** Persisted identity helpers (leader token / member id) per war code. */
const ns = (code: string) => code.toLowerCase();

export const warIdentity = {
  leaderToken(code: string): string | null {
    if (typeof window === "undefined") return null;
    return window.sessionStorage.getItem(`tts-war-leader-${ns(code)}`);
  },
  setLeaderToken(code: string, token: string) {
    window.sessionStorage.setItem(`tts-war-leader-${ns(code)}`, token);
  },
  memberId(code: string): string | null {
    if (typeof window === "undefined") return null;
    return window.sessionStorage.getItem(`tts-war-member-${ns(code)}`);
  },
  setMemberId(code: string, id: string) {
    window.sessionStorage.setItem(`tts-war-member-${ns(code)}`, id);
  },
};
