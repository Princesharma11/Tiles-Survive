/**
 * Global site config + command-deck copy.
 * Game flavor is grounded in Tiles Survive! (FunPlus) systems:
 * Settlement, Power Plant, Guards/Gunners/Marksmen, Chief Gear,
 * factions (Stalwart / Aeronaut / Mariner / Rover), Arcadian Conquest.
 */

export const site = {
  name: "TitanTilesSurvive",
  tagline: "Stop Guessing. Start Conquering.",
  description:
    "Command intelligence for Tiles Survive! — a next-gen companion hub with the Arcadian War Room, troop ratio optimization, Chief Gear reforge simulation, live tier lists and a survival codex.",
  url: "https://titantilessurvive.com",
  patch: "PATCH 6.2.1",
  season: "SEASON 6 // ARCADIAN CONQUEST",
} as const;

export const heroStats = [
  { value: 3, suffix: "", label: "LIVE TOOLS" },
  { value: 40, suffix: "+", label: "HERO PROFILES" },
  { value: 120, suffix: "+", label: "CODEX ENTRIES" },
] as const;

export const tickerItems = [
  "CONSENSUS SPLIT — 45/35/20 GUARDS · GUNNERS · MARKSMEN",
  "ARCADIAN CONQUEST // T-MINUS 12 DAYS",
  "POWER PLANT 30 GATES T9 — PLAN YOUR GRID",
  "FACTION CYCLE: STALWART > AERONAUT > MARINER > ROVER",
  "CHIEF GEAR REFORGE ODDS TABLE UPDATED",
  "TIER LIST v6.2 PUBLISHED",
  "BEHEMOTH SLOT — COOLDOWN MATH REVISED",
  "GHOULION PURSUIT RESETS 20:00 UTC",
] as const;
