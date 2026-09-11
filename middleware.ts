import { NextResponse, type NextRequest } from "next/server";

/* ------------------------------------------------------------------ */
/*  Canonical host: titantilessurvive.com                              */
/*  308-redirects www → apex once both domains are attached to the     */
/*  Vercel project. No-ops for every other host (previews, localhost). */
/* ------------------------------------------------------------------ */

const APEX = "titantilessurvive.com";
const WWW = `www.${APEX}`;

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (host === WWW) {
    const url = request.nextUrl.clone();
    url.hostname = APEX;
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
