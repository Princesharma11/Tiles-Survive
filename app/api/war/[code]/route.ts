import { NextResponse } from "next/server";
import { getStore, safeCode } from "@/lib/warroom/store";
import { applyAction } from "@/lib/warroom/actions";
import type { WarAction } from "@/lib/warroom/types";

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  GET  /api/war/[code] — session snapshot (cheap when ?v= matches).  */
/*  PATCH /api/war/[code] — apply a WarAction, return updated session. */
/* ------------------------------------------------------------------ */

type Ctx = { params: Promise<{ code: string }> };

export async function GET(request: Request, ctx: Ctx) {
  const { code: rawCode } = await ctx.params;
  const code = safeCode(rawCode);
  if (!code) return NextResponse.json({ error: "Bad war code." }, { status: 400 });

  const session = await getStore().get(code);
  if (!session)
    return NextResponse.json({ error: "War Room not found." }, { status: 404 });

  const url = new URL(request.url);
  const clientV = Number(url.searchParams.get("v") ?? "-1");
  if (clientV === session.v) {
    return NextResponse.json({ unchanged: true, v: session.v });
  }

  /* Strip the leader token — it never travels to clients. */
  const { leaderToken, ...publicSession } = session;
  void leaderToken;

  return NextResponse.json({
    session: publicSession,
    now: Date.now(), // lets clients compute a clock offset for synced timers
  });
}

export async function PATCH(request: Request, ctx: Ctx) {
  const { code: rawCode } = await ctx.params;
  const code = safeCode(rawCode);
  if (!code) return NextResponse.json({ error: "Bad war code." }, { status: 400 });

  let action: WarAction;
  try {
    action = (await request.json()) as WarAction;
  } catch {
    return NextResponse.json({ error: "Invalid action payload." }, { status: 400 });
  }
  if (!action || typeof action.type !== "string") {
    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  }

  const store = getStore();
  const session = await store.get(code);
  if (!session)
    return NextResponse.json({ error: "War Room not found." }, { status: 404 });

  const result = applyAction(session, action);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  await store.save(result.session);

  const { leaderToken, ...publicSession } = result.session;
  void leaderToken;

  return NextResponse.json({
    session: publicSession,
    now: Date.now(),
  });
}
