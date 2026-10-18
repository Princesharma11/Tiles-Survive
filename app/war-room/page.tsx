import type { Metadata } from "next";
import WarLobby from "@/components/warroom/WarLobby";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Tiles Survive War Room — Live Command Center",
  alternates: { canonical: "/war-room" },
  description:
    "Deploy a shareable Tiles Survive war room in seconds — tactical map, squad assignments, live chat and synced conquest timers for your alliance.",
};

const toolLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tiles Survive Arcadian War Room",
  url: `${site.url}/war-room`,
  applicationCategory: "GameApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  about: { "@type": "VideoGame", name: "Tiles Survive!" },
};

export default function WarRoomPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolLd) }}
      />
      <WarLobby />
    </>
  );
}
