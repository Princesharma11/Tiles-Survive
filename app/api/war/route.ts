import { NextResponse } from "next/server";
import { getStore } from "@/lib/warroom/store";

export const dynamic = "force-dynamic";

/* POST /api/war — create a War Room session (Phase 1: viral lobby). */

export async function POST(request: Request) {
  let allianceName = "";
  try {
    const body = await request.json();
    allianceName = typeof body?.allianceName === "string" ? body.allianceName : "";
  } catch {
    allianceName = "";
  }

  allianceName = allianceName.trim().slice(0, 40);
  if (!allianceName) {
    return NextResponse.json(
      { error: "Alliance name is required to deploy a War Room." },
      { status: 400 }
    );
  }

  const store = getStore();
  const session = await store.create(allianceName);

  return NextResponse.json(
    { code: session.code, leaderToken: session.leaderToken },
    { status: 201 }
  );
}
