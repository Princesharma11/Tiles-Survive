import type { Metadata } from "next";
import WarConsole from "@/components/warroom/WarConsole";

/* ------------------------------------------------------------------ */
/*  /war/[code] — the live War Room console (leader + members).        */
/*  Codes are temporary (24h TTL), so these pages render client-side.  */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "War Room Console",
  description: "Live Arcadian Conquest command center.",
  robots: { index: false }, // temporary rooms stay out of search
};

export default async function WarRoomConsolePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <WarConsole code={decodeURIComponent(code)} />;
}
