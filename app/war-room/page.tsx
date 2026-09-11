import type { Metadata } from "next";
import WarLobby from "@/components/warroom/WarLobby";

export const metadata: Metadata = {
  title: "Arcadian War Room",
  alternates: { canonical: "/war-room" },
  description:
    "Deploy a shareable War Room for your Tiles Survive! alliance in seconds — tactical map, drag-and-drop squad assignments, live command ticker and synchronized conquest timers.",
};

export default function WarRoomPage() {
  return <WarLobby />;
}
