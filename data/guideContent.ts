/* ------------------------------------------------------------------ */
/*  The Survival Codex — full guide content layer.                     */
/*  Every guide is a complete, indexable long-form article served at   */
/*  /guides/[slug], grounded in patch 2.6.0 systems.                   */
/* ------------------------------------------------------------------ */

export interface GuideCallout {
  kind: "tip" | "warn" | "meta";
  title: string;
  text: string;
}

export interface GuideSection {
  /** anchor id */
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: GuideCallout;
  table?: { columns: string[]; rows: string[][] };
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideContent {
  slug: string;
  /** ≤60 chars, CTR-optimized */
  seoTitle: string;
  /** ≤160 chars */
  seoDescription: string;
  intro: string[];
  sections: GuideSection[];
  takeaways: string[];
  faq: GuideFaq[];
  relatedTools?: { href: string; label: string; note: string }[];
}

export const GUIDE_CONTENT: Record<string, GuideContent> = {
  /* ============================== G1 ============================== */
  "first-7-days": {
    slug: "first-7-days",
    seoTitle: "Tiles Survive First 7 Days Guide (Patch 2.6)",
    seoDescription:
      "The opening-week playbook for Tiles Survive!: Power Plant build order, economy-first research, tile exploration priorities and the resource discipline that compounds for months.",
    intro: [
      "The first seven days of a Tiles Survive! account decide its ceiling for the next three months. Almost every mistake that stalls accounts at Power Plant 22 or dead-ends their hero roster is made in week one — usually by upgrading whatever is shiny instead of whatever gates progression.",
      "This guide is the opening-week playbook: what to build and in what order, what to research first, which tiles to unlock, who to invest in, and — most importantly — what to never touch until an event pays you for it.",
    ],
    sections: [
      {
        id: "mission-line",
        heading: "Day 1: Follow the mission line, not your impulses",
        paragraphs: [
          "The main Settlement missions are a curated build order. They exist to walk you through every system in a sequence that keeps your economy stable, and they pay out resources that keep the loop moving. Clear them relentlessly on day one — an account parked on the mission line out-progresses an account freestyle-upgrading decorative buildings every single time.",
          "Two day-one decisions matter more than everything else combined: assign every survivor to a production job before you log off (idle survivors are pure waste), and join an active alliance immediately. Alliance membership unlocks rally content, alliance store currency, help-speedups on your construction timers and the whole event economy. If your server's top alliance is full, join the most active one available and migrate up later.",
        ],
        callout: {
          kind: "tip",
          title: "Server selection is a day-one decision too",
          text: "Start on a fresh server, not an old one. On an aged server you're farming in the shadow of T10 marches; on a new server the event brackets, Arcadian Conquest matchmaking and honor rewards all scale to peers. If a server turns out war-heavy beyond your appetite, restarting costs less than rebuilding.",
        },
      },
      {
        id: "power-plant",
        heading: "The Power Plant is the whole game",
        paragraphs: [
          "No building matters more than the Power Plant. Most buildings cannot exceed its level, so it gates your research, troop training, resource generation and settlement progression in one chain. Veterans keep it at or one level ahead of everything else; beginners upgrade everything equally and wonder why they're resource-starved at week three.",
          "The rule: only upgrade buildings that are prerequisites for your next Power Plant level, plus the facilities that keep the prerequisite chain cheap. Everything else waits.",
        ],
        table: {
          columns: ["Power Plant level", "Prerequisite chain"],
          rows: [
            ["PP 2", "House 2"],
            ["PP 3", "Lumber 2"],
            ["PP 4", "Greenhouse 3"],
            ["PP 5", "Smelter 3 + Artifact Workshop 2"],
            ["PP 18-20+", "Behemoth Institute unlocks (server week ~2)"],
            ["PP 26+", "Coal becomes the bottleneck — bank it early"],
          ],
        },
        callout: {
          kind: "warn",
          title: "Don't panic-rush Power Plant 30",
          text: "Once the season starts, conditions for pushing it improve dramatically. Push PP steadily through the prerequisite chain, but don't torch your entire speedup inventory in week two chasing a number that the season will hand you cheaper.",
        },
      },
      {
        id: "research",
        heading: "Research: economy before violence",
        paragraphs: [
          "Research is the only system that compounds forever — every point invested in the Laboratory pays back for the rest of the account's life. Combat tech in the first weeks is a trap; economy tech makes every future tech cheaper.",
        ],
        bullets: [
          "Construction Speed — every future building finishes faster, including the Power Plant chain itself.",
          "Research Speed — the meta-stat that discounts every technology after it.",
          "March Speed & Load Capacity — gathering efficiency that compounds daily.",
          "Resource Generation — flat boosts to Farm, Lumber, Smelter and Oil output.",
          "Only at 60-75% economy completion: pivot to Military, starting with Troop Death Reduction, then Garrison Capacity, then even ATK/DEF/HP spreads.",
        ],
      },
      {
        id: "tiles",
        heading: "Fog, tiles and the exploration budget",
        paragraphs: [
          "The map is divided into explorable tiles hidden by fog, and clearing fog costs exploration budget you'll want back later. Unlock a tile only when it does one of six jobs: advances a Settlement objective, unlocks an important building, fixes a resource you're actually short on, opens a permanent function, reveals a valuable collectible, or connects your settlement to another key point of the map.",
          "Brute-clearing fog rings for a power score is the classic week-one waste. Power score is a vanity metric — it does not win rallies, and the tiles you skipped were the ones carrying hero statues, boundary monuments and resource nodes that actually pay.",
        ],
      },
      {
        id: "heroes",
        heading: "Heroes: pick a starter core and stop pulling",
        paragraphs: [
          "Your first real squad is a bridge, not a destination. The proven F2P starter core is Rosie, Chef, Sarge, Freja and Maddie — Rosie carries, Chef tanks early, Freja punches far above her SR pay grade, and Maddie hybrids damage and healing until your SSR roster fills in.",
          "Put every fragment, EXP potion and skill book into that one squad. An account with a focused five at Star 5 contributes more to every rally, Arena bracket and event than an account with fifteen heroes at Star 2. Save universal fragments and recruitment pulls for event windows — never burn them the moment you get them.",
        ],
        callout: {
          kind: "meta",
          title: "Who you're bridging toward",
          text: "The current meta march is Rosie, Nikola and Tarzan holding the front with Tara and Layla behind them — all five sit at the top of our tier list. Check the Hero Tier List before spending a single universal fragment.",
        },
      },
      {
        id: "discipline",
        heading: "The resource discipline that compounds",
        paragraphs: [
          "Food and wood are daily-spend resources — use them constantly. Gems, speedups and universal fragments are strategic resources — they only get spent when an event pays extra for the same action.",
        ],
        bullets: [
          "Never spend general speedups on troop training — training speedups come from events and infected kills in bulk.",
          "Hoard gear scraps, blueprints and promotion materials for Turbo Turtle / Power Play overlap windows, where the same spend scores event milestones on top of the upgrade itself.",
          "Clear hospital capacity before every Saturday, so Arcadian Conquest casualties land in beds instead of the graveyard.",
        ],
      },
    ],
    takeaways: [
      "Ride the mission line, assign every survivor, join an active alliance on day one.",
      "Power Plant first — upgrade only its prerequisite buildings, nothing decorative.",
      "Economy research to 60-75% before touching combat tech; Troop Death Reduction opens military.",
      "Explore tiles with purpose: objectives, buildings, bottlenecks and collectibles — not power score.",
      "One focused starter squad (Rosie, Chef, Sarge, Freja, Maddie) beats a scattered roster.",
      "Gems, speedups and fragments are event ammunition — bank them.",
    ],
    faq: [
      {
        q: "Is Tiles Survive a match-three game?",
        a: "No. 'Tiles' refers to the explorable map sections hidden by fog. The core game is settlement management, survivor assignment, hero development and alliance warfare.",
      },
      {
        q: "Should I rush Power Plant 30 in the first week?",
        a: "No. Push the Power Plant steadily through its prerequisite chain, but the season gives you a much friendlier environment for pushing it higher once it starts. Racing to 30 in week one burns speedups you'll want for events.",
      },
      {
        q: "Are farm accounts worth it?",
        a: "If you can manage the logins, yes — a couple of dedicated farming accounts make construction and research dramatically cheaper. Start them on the same server as your main and keep their Power Plants just high enough to gather efficiently.",
      },
    ],
    relatedTools: [
      { href: "/tier-list", label: "Hero Tier List", note: "Who deserves your fragments" },
      { href: "/gear-reforge", label: "Reforge Simulator", note: "For when your Alloy gear lands" },
    ],
  },

  /* ============================== G2 ============================== */
  "march-math-40-30-30": {
    slug: "march-math-40-30-30",
    seoTitle: "Tiles Survive Troop Composition Guide: 40/30/30",
    seoDescription:
      "The proven Tiles Survive! march split is 40-50% Guards, 30-40% Gunners, 20-30% Marksmen. The counter triangle, tier gating and when to break the doctrine on purpose.",
    intro: [
      "Troops win fights before heroes ever cast a skill. Tiles Survive! runs a rock-paper-scissors counter system between Guards, Gunners and Marksmen that compounds multiplicatively — which means a balanced, lower-power march routinely deletes a single-type stack with a much bigger power score.",
      "This is the math behind that: the doctrine split, the counter triangle, the tier gating that makes Power Plant your real Barracks, and the three situations where you break the baseline on purpose.",
    ],
    sections: [
      {
        id: "doctrine",
        heading: "The doctrine: 40/30/30",
        paragraphs: [
          "The proven competitive baseline is 40-50% Guards, 30-40% Gunners, 20-30% Marksmen. The do-nothing-wrong midpoint is 40/30/30 — strong frontline, consistent midline damage, backline burst, with no single type overexposed to its counter.",
          "The one hard floor: never drop below 40% Guards. Below that line your frontline collapses in the opening damage exchange, and Gunners and Marksmen die before their ultimates resolve. A march that never gets to cast is a march that was dead on arrival regardless of its backline on paper.",
        ],
        table: {
          columns: ["March type", "Guards", "Gunners", "Marksmen", "When"],
          rows: [
            ["Baseline doctrine", "40%", "30%", "30%", "Default for rallies and unknown matchups"],
            ["Frontline-heavy", "50%", "30%", "20%", "PvP sieges and long defensive stands"],
            ["Sustained PvE", "40%", "40%", "20%", "Monster hunting, infected waves, boss brackets"],
            ["Burst punish", "40%", "25%", "35%", "Scouted a Gunner-heavy enemy (Marksmen counter Gunners)"],
          ],
        },
      },
      {
        id: "counter-triangle",
        heading: "The counter triangle",
        paragraphs: [
          "Troops counter each other in a fixed loop, and the damage modifiers stack multiplicatively with everything else — hero faction counters, gear special stats and research buffs all ride on top of it.",
        ],
        bullets: [
          "Guards counter Marksmen — the frontline eats the backline's burst window.",
          "Marksmen counter Gunners — which is why every march keeps a 20-30% Marksman floor even in Guard-heavy setups.",
          "Gunners counter Guards — the workhorse damage that grinds through frontlines.",
        ],
        callout: {
          kind: "warn",
          title: "Single-type stacks are a trap",
          text: "100% Guard marches post huge power scores and lose to balanced marches thousands of power lower, because the counter math compounds. All-in stacks also get read by any competent scout and punished with the exact counter composition.",
        },
      },
      {
        id: "tier-gating",
        heading: "Tier gating: the Power Plant is your real Barracks",
        paragraphs: [
          "Every troop tier from T6 to T10 requires a matching Power Plant level before your training queues can produce it at full output. Rush Barracks research ahead of your Power Plant and you train lower-tier troops at max cost — every Waypoint converted into training resources produces less than it should.",
          "The order is fixed: Power Plant first, Barracks second, troop-tier research third. A T9 Guard produces roughly double the rally power of a T8 Guard at the same training cost, so every Power Plant level compounds the value of every training queue you run for the rest of the account.",
        ],
      },
      {
        id: "hero-layer",
        heading: "Heroes ride on top of troops",
        paragraphs: [
          "The troop layer compounds with the hero layer. A Guard-class hero leading Guard troops in the frontline slot produces measurably more output than the same hero leading a generic mix — hero class, troop type and formation slot all want to agree.",
          "The current meta march is the living example: Rosie, Nikola and Tarzan anchoring the front while Tara and Layla support from behind. It's also a faction play — four Stalwart heroes plus one Rover aligns the squad for faction bonuses on top of class matching.",
        ],
        callout: {
          kind: "meta",
          title: "Faction counters ride the same fight",
          text: "Troop factions run their own cycle — Stalwart counters Aeronaut, Aeronaut counters Mariner, Mariner counters Rover, Rover counters Stalwart. The full map (and the hero-side element triangle) is in the Faction Matching guide.",
        },
      },
      {
        id: "breaking-it",
        heading: "When to break the doctrine on purpose",
        paragraphs: [
          "The baseline is for unknown matchups. The moment you have scout data, adjust: against Gunner-heavy attackers, shift Marksman share up and turn their midline into a liability. On defense — gold mines, garrisons, resource tiles — lean Guard-heavy so the stand lasts until reinforcements land.",
          "In PvE, Gunner share carries sustained damage through long waves, which is exactly what boss brackets like Ghoulion Pursuit score. The doctrine is a floor plan, not a cage: scout, adjust, win.",
        ],
      },
    ],
    takeaways: [
      "40-50 / 30-40 / 20-30 is the competitive split; 40/30/30 is the safe midpoint.",
      "Never below 40% Guards — the opening exchange decides whether your ultimates ever cast.",
      "Counters compound: Guards > Marksmen > Gunners > Guards.",
      "Power Plant → Barracks → research. T9 ≈ 2× T8 power per unit at the same cost.",
      "Match hero class to troop type to formation slot; scout before you specialize.",
    ],
    faq: [
      {
        q: "What is the best troop composition in Tiles Survive?",
        a: "The proven competitive split is 40-50% Guards, 30-40% Gunners and 20-30% Marksmen. It covers all three damage types simultaneously and doesn't overcommit to any single type's counter.",
      },
      {
        q: "What counters what between Guards, Gunners and Marksmen?",
        a: "Guards counter Marksmen, Marksmen counter Gunners, and Gunners counter Guards. These modifiers compound with faction counters, gear stats and research.",
      },
      {
        q: "Why do I lose to marches with lower power?",
        a: "Power score is a sum, not a matchup. Counter multipliers, faction alignment, hero-skill timing and tier synchronization all outweigh raw power — a T9-heavy balanced march beats a mixed-tier stack with a bigger number.",
      },
    ],
    relatedTools: [
      { href: "/hero-meta-calc", label: "Troop Ratio Optimizer", note: "Mirror an enemy scout report into a counter build" },
      { href: "/tier-list", label: "Hero Tier List", note: "Who should lead those troops" },
    ],
  },

  /* ============================== G3 ============================== */
  "faction-matching-full-map": {
    slug: "faction-matching-full-map",
    seoTitle: "Tiles Survive Faction Guide: Full Counter Map",
    seoDescription:
      "Every Tiles Survive! faction counter mapped: the troop cycle (Stalwart > Aeronaut > Mariner > Rover), the hero element triangle, the Mariner wildcard rule and faction bonus breakpoints.",
    intro: [
      "Faction matching is the most misunderstood system in Tiles Survive!, because there are two separate counter ladders running at the same time — one for your troops, one for your heroes — and they compound with each other.",
      "Get both ladders pointing the right way and a mid-tier account punches above its weight class. Ignore them and your 'strong on paper' march takes 20% extra damage from every aligned enemy on the map.",
    ],
    sections: [
      {
        id: "two-ladders",
        heading: "Two ladders, one fight",
        paragraphs: [
          "Ladder one: troop factions. Your Guards, Gunners and Marksmen each belong to a faction — Stalwart, Aeronaut, Mariner or Rover — and troop factions counter each other in a fixed cycle.",
          "Ladder two: hero elements. Your heroes carry an element tag (Mountain, Cloud, Desert, or Water-aligned) that maps onto the same four factions and runs its own triangle. Both ladders apply their modifiers to the same damage exchange, which is why fully-aligned marches feel broken and misaligned marches feel paper.",
        ],
      },
      {
        id: "troop-cycle",
        heading: "The troop faction cycle",
        paragraphs: [
          "For troops, the counter cycle is a clean loop — memorize it once, read every map fight with it forever:",
        ],
        bullets: [
          "Stalwart counters Aeronaut",
          "Aeronaut counters Mariner",
          "Mariner counters Rover",
          "Rover counters Stalwart",
        ],
        callout: {
          kind: "meta",
          title: "State shorthand",
          text: "Our live ticker runs STALWART > AERONAUT > MARINER > ROVER as the faction cycle watch — it's the same loop, and it's why alliance war rooms plan map lanes around faction alignment.",
        },
      },
      {
        id: "hero-triangle",
        heading: "The hero element triangle",
        paragraphs: [
          "Heroes run the element triangle: Stalwart (Mountain) heroes counter Aeronaut (Cloud) heroes, Aeronaut counters Rover (Desert), and Rover counters Stalwart. Counter matchups modify damage in both directions — +20% dealt, and the reverse edge taken as bonus damage.",
          "The practical use is content-specific. Arena waves and Trophy Defense stage 9 are heavily Aeronaut/Cloud infected — fielding Stalwart heroes like Rosie, Nikola, Tarzan or Tara there produces an immediate damage-inflicted bonus and a damage-reduction advantage that lets a weaker roster clear stages above its weight.",
        ],
      },
      {
        id: "mariner-wildcard",
        heading: "The Mariner wildcard rule",
        paragraphs: [
          "Mariners stand outside both ladders. They don't counter anyone and no one counters them — instead they count as whichever faction you need to complete a squad's synergy requirement. Four Stalwart heroes and one slot short of the mono-faction bonus? A Mariner fills it as your fifth Stalwart.",
          "Since patch 2.6.0 removed the old flat Marine damage bonus, each Mariner in the march trades a +2% final attack buff against a −2% final health penalty. They're flexible, not free — the meta use is the hybrid core: Shark anchoring the frontline, Undine amplifying the backline, Knotty providing AoE artillery, with the remaining two slots swapped to counter the specific enemy.",
        ],
      },
      {
        id: "bonuses",
        heading: "The faction bonus breakpoints",
        paragraphs: [
          "Alignment pays out at two documented breakpoints, on top of the counter modifiers:",
        ],
        bullets: [
          "Mono-faction five: +25% final health — the biggest single squad bonus in the game.",
          "3+2 split: +10% final health — the practical compromise while your roster fills in.",
          "Mariners count toward either side of the split, which is exactly how 4+1 squads reach the big breakpoint with a four-hero core.",
        ],
        table: {
          columns: ["Setup", "Bonus", "Example"],
          rows: [
            ["5 same-faction heroes", "+25% final health", "Rosie, Nikola, Tarzan, Tara + Mariner wildcard"],
            ["3+2 faction split", "+10% final health", "Rosie, Nikola, Tarzan + Layla, Tara"],
            ["Mismatched tags", "0% — and counter penalties apply", "One of everything, synergy never triggers"],
          ],
        },
      },
      {
        id: "mapping-it",
        heading: "Mapping it to the current roster",
        paragraphs: [
          "The current meta skews Stalwart for a reason: Rosie, Nikola, Tarzan and Tara are all Stalwart, and they're four of the five highest-priority heroes in the game. Add any Mariner — Shark, Undine or Knotty — and you have a five-mono squad on a four-hero investment.",
          "The counter play is just as clean: Aeronaut-heavy metas get punished by Stalwart marches, Rover-centric squads counter Stalwart cores, and Aeronaut answers Rover. Read the map, check the enemy alliance's roster, then pick the lane where both your ladders point the same direction.",
        ],
      },
    ],
    takeaways: [
      "Troop factions cycle Stalwart > Aeronaut > Mariner > Rover > Stalwart.",
      "Hero elements triangle: Stalwart > Aeronaut > Rover > Stalwart.",
      "Mariners are wildcards — no counters either way, count as any faction for synergy, +2% ATK / −2% HP each since 2.6.0.",
      "Five mono = +25% final health; 3+2 = +10%.",
      "The Stalwart core (Rosie, Nikola, Tarzan, Tara) plus a Mariner wildcard is the cheapest 5-mono squad in the game.",
    ],
    faq: [
      {
        q: "What faction counters what in Tiles Survive?",
        a: "Troops: Stalwart counters Aeronaut, Aeronaut counters Mariner, Mariner counters Rover, Rover counters Stalwart. Heroes run a separate triangle where Stalwart counters Aeronaut, Aeronaut counters Rover, and Rover counters Stalwart — with Mariner as a neutral wildcard.",
      },
      {
        q: "Are Mariner heroes good in patch 2.6.0?",
        a: "Yes, as flex pieces. The old flat Marine damage bonus was removed in 2.6.0; each Mariner now gives +2% final attack and −2% final health, and counts as any faction for squad synergy. Shark, Undine and Knotty all hold meta roles.",
      },
      {
        q: "Should I run five heroes of the same faction?",
        a: "If your roster supports it, yes — five same-faction heroes unlock +25% final health. The cheapest route is the Stalwart core (Rosie, Nikola, Tarzan, Tara) plus one Mariner, who counts as your fifth Stalwart.",
      },
    ],
    relatedTools: [
      { href: "/tier-list", label: "Hero Tier List", note: "Faction + class data for all 27 heroes" },
      { href: "/hero-meta-calc", label: "Synergy Tracker", note: "Check how your five interact" },
    ],
  },


  /* ============================== G4 ============================== */
  "behemoth-slot-cooldowns": {
    slug: "behemoth-slot-cooldowns",
    seoTitle: "Tiles Survive Behemoth Guide: Griffin 20% CDR",
    seoDescription:
      "Tiles Survive! Behemoth guide: why the Griffin's 20% skill cooldown reduction at 15 stars outranks raw stat lines, plus cells, serum, talent timing and the Tidal Drake.",
    intro: [
      "A Behemoth is not a stat stick — it's a fifth squad member that reshapes combat tempo. Where every other progression system adds numbers to the same fight, a leveled Behemoth changes when the fight is decided: your ultimate skills land before the enemy's do.",
      "This guide covers the cooldown math that makes the Legendary Griffin the consensus first Behemoth, the full upgrade economy (cells, serum, biogenic protein), and the talent-timing tricks that double-dip your materials.",
    ],
    sections: [
      {
        id: "fifth-member",
        heading: "Your fifth squad member",
        paragraphs: [
          "The Behemoth Institute unlocks around server week two, once your Power Plant clears the 18-20 range. From that point, every march you field carries a Behemoth slot — account-wide stat boosts plus active tactical abilities that fire in combat.",
          "Universal Behemoths like the Griffin can be deployed across multiple squad queues simultaneously, which is why it slots straight into the main march for Arcadian Conquest, Arena and State Clash without competing with your second and third queues.",
        ],
      },
      {
        id: "twenty-percent",
        heading: "The 20% rule: why cooldowns beat stat lines",
        paragraphs: [
          "The Griffin's defining unlock arrives at 15 stars: a 20% skill cooldown reduction on the first cast of every hero's active skill in PvP. That sounds like a tempo perk; in practice it decides matchups outright.",
          "Tiles Survive! combat resolves in rotations — frontlines absorb the opening exchange, then ultimates fire in sequence. A 20% head start on that first rotation means Rosie's AoE lands before enemy shields organize, Layla's heal tops the frontline before the second exchange, and Nikola's barrier is already up when the enemy carry resolves. In evenly matched fights, the first complete skill rotation wins; the Griffin's CDR is a permanent 20% discount on being first.",
        ],
        callout: {
          kind: "meta",
          title: "The stat-line trap",
          text: "Players compare Behemoths by their flat ATK/HP/DEF contributions and skip the Griffin because another companion posts bigger numbers. The math says otherwise: a stat line changes how hard you hit; a first-rotation advantage changes who is alive to hit at all.",
        },
      },
      {
        id: "griffin-kit",
        heading: "The Griffin kit: Primal Fury and Power of Wind",
        paragraphs: [
          "On battle entry the Griffin sweeps the field with Primal Fury, dealing damage equal to 100% of your deployed heroes' average attack stat — clearing frontline chaff and softening the formation before your skills even queue.",
          "At Behemoth level 200 the Power of Wind skill node unlocks, extending the kit's tempo pressure. The upgrade path is linear and unforgiving: stars for the 15-star CDR breakpoint, levels for the 200 node, talents for everything between.",
        ],
      },
      {
        id: "economy",
        heading: "Cells, serum and protein: the Behemoth economy",
        paragraphs: [
          "Three materials drive Behemoth growth, and each has exactly one efficient source:",
        ],
        bullets: [
          "Behemoth Cells — raid Class A trucks in Doomsday Express daily. Thirty-five cells unlock the Tidal Drake as your second Behemoth for PvE and sustained content.",
          "Behemoth Serum — purchase from the Arena Shop on rotation. It maintains steady baseline stat growth between events.",
          "Biogenic Protein — feeds the talent tree inside the Behemoth Institute, node by node, permanently active when deployed.",
        ],
        callout: {
          kind: "warn",
          title: "Protein discipline",
          text: "Follow one companion's talent path to its key percentage nodes before splitting resources across multiple Behemoths. Half-built trees on three companions lose to one finished tree on your main.",
        },
      },
      {
        id: "talent-timing",
        heading: "Talent timing: Wednesdays and Turtle Phase 3",
        paragraphs: [
          "Never activate talent nodes on a random Tuesday. Wednesday VSS event windows score your talent-node activations as event points — the same protein spend produces its permanent stat gain and event progress simultaneously.",
          "The second window is Turbo Turtle Phase 3, which co-scores upgrade materials. Stockpile protein through the dry stretch of the week, then burn it Wednesday or during Phase 3 — this is the same double-dip discipline that governs gear scraps and blueprints.",
        ],
      },
      {
        id: "who-rides",
        heading: "Who rides the Griffin",
        paragraphs: [
          "The universal deployment rule makes it simple: your main march — the one auto-joining rallies and holding your Arena record — rides the Griffin permanently. The cooldown reduction explicitly rewards the squads with the strongest first-rotation heroes: Rosie's AoE, Tarzan's punish timing, Layla's sustain and Tara's defense stack all get measurably better from firing 20% sooner.",
          "Second and third queues graduate to the Tidal Drake as cells allow, covering gathering defense and event content where sustained output beats opening tempo.",
        ],
      },
    ],
    takeaways: [
      "Behemoth Institute unlocks ~server week 2 at Power Plant 18-20+.",
      "Griffin at 15 stars = 20% skill CDR on first PvP casts — the tempo unlock that decides even fights.",
      "Primal Fury opens with 100% average-ATK AoE; level 200 unlocks Power of Wind.",
      "Cells: Doomsday Express Class A trucks daily. Serum: Arena Shop. Protein: talent tree.",
      "Burn protein on Wednesday VSS windows and Turbo Turtle Phase 3 — never on dead days.",
    ],
    faq: [
      {
        q: "What is the best Behemoth in Tiles Survive?",
        a: "For PvP, Arena and fast map clearing, the Legendary Griffin. Its 15-star unlock grants 20% skill cooldown reduction on first casts — a tempo advantage that outranks any flat stat companion. The Tidal Drake is the standard second Behemoth for sustained PvE content.",
      },
      {
        q: "How do I unlock the Behemoth system?",
        a: "The Behemoth Institute unlocks around server week two, gated by Power Plant level 18-20. Build it as soon as the prerequisite chain allows — every week without it is a week your marches fight four-versus-five.",
      },
      {
        q: "Where do Behemoth Cells come from?",
        a: "Daily Class A truck raids in Doomsday Express are the reliable source. Thirty-five cells unlock the Tidal Drake as your second Behemoth.",
      },
    ],
    relatedTools: [
      { href: "/tier-list", label: "Hero Tier List", note: "First-rotation heroes worth 20% more" },
      { href: "/war-room", label: "Arcadian War Room", note: "Plan the sieges the Griffin wins" },
    ],
  },

  /* ============================== G5 ============================== */
  "chief-gear-reforge-discipline": {
    slug: "chief-gear-reforge-discipline",
    seoTitle: "Tiles Survive Reforge Guide: Lock Discipline",
    seoDescription:
      "When to lock a substat in Tiles Survive!: Alloy quality breakpoints, the 2-star/4-star/6-star special-stat slots, Standard vs Advanced reforge math and the synergy-over-rarity rule.",
    intro: [
      "Chief Gear boosts every hero you field, which makes it the only gear system where a greedy reroll taxes your entire account. Reforge Hammers are scarcer than adhesives — a wasted chase on one helmet is weeks of Arcadian Conquest store income gone.",
      "This is the discipline layer: exactly when reforging unlocks, what each slot can roll, what a hammer actually costs with locks applied, and the one rule that decides every keep-or-reroll decision.",
    ],
    sections: [
      {
        id: "unlock",
        heading: "Where reforge actually unlocks",
        paragraphs: [
          "Gear quality climbs white to green, blue, purple, orange and finally Alloy — the game's Legendary tier, where purple's situational anti-infected bonuses are swapped for raw all-around damage dealt and damage received stats. Reforging only opens on Alloy gear; lower tiers don't access the meaningful special-stat pool, and every hammer spent there is burned for nothing.",
          "Enhancing Alloy gear with duplicates raises star levels, and stars 2, 4 and 6 each unlock a Special Stat slot — three rerollable lines per piece. Enhancing caps at 10 stars, and Superalloy ascension later retains level, stars, equip status and reforge stats, so rolls you lock today survive the entire endgame.",
        ],
        callout: {
          kind: "warn",
          title: "Only reforge main-lineup gear",
          text: "Hammers spent on side heroes or backup slots take weeks to recover. Your main march's pieces first — the five heroes actually holding tiles and joining rallies.",
        },
      },
      {
        id: "pools",
        heading: "What each slot can roll",
        paragraphs: [
          "Pools are slot-locked, which is why slot order matters when you're planning gear promotions:",
        ],
        bullets: [
          "Helmet (Attack & Damage): Attack %, Damage Bonus, faction and troop-type attack — plus Crit Bonus, the premium line for crit-reliant Rover heroes.",
          "Armor (Defense / Cooldown / DR): Defense %, Damage Reduction, faction and troop defense, and Active Skill Cooldown — the −15% Legendary line that stacks across slots.",
          "Greaves (Health / Healing / Buffs): HP %, Healing Bonus, faction HP, and the squad-wide Allied Hero Combat Boost that raises ATK, DEF and HP for every allied hero in battle.",
        ],
      },
      {
        id: "standard-advanced",
        heading: "Standard vs Advanced reforge",
        paragraphs: [
          "Standard reforge costs 1 hammer and rolls all four tiers. Advanced reforge costs 25 and restricts the pool to Epic and Legendary lines only — it unlocks after 200 hammers spent collectively, at which point Standard rolls become guaranteed Exquisite or better.",
          "The efficient pattern: early chasing happens on Standard (cheap volume), and Advanced is reserved for the endgame — when the only acceptable outcomes are Epic+ and 25 hammers per attempt is cheaper than 25 Standard rolls that mostly land Common.",
        ],
      },
      {
        id: "lock-math",
        heading: "Lock math: the exponential tax",
        paragraphs: [
          "Locking a line preserves it through the next roll, and each lock multiplies the cost of every subsequent click — roughly 1 hammer at zero locks, 4 at one, 16 at two on Standard (25 / 100 / 400 on Advanced). The escalation is the point: locks convert reforge from a cheap volume game into a resource siege.",
          "The discipline rule: lock S-fit lines only, and cap yourself at two locks. A locked B-fit line is a tax you pay every roll for a mediocre result — reroll it and re-chase. And before any lock decision, price the chase: our Reforge Simulator computes the exact expected hammers for any target line and tier.",
        ],
        callout: {
          kind: "meta",
          title: "Synergy over rarity — the one rule",
          text: "A Legendary Rover Marksman HP% line on a Stalwart Guard tank is worth exactly zero. Faction and troop-tagged stats only apply when they match the hero wearing the gear. Rarity never beats synergy; the trap roll is the most expensive mistake in the system.",
        },
      },
      {
        id: "economy",
        heading: "The material economy around it",
        paragraphs: [
          "Adhesives — the promotion bottleneck for Chief Gear quality — come almost entirely from Ghoulion Pursuit damage brackets, so your bracket tier this week is next month's reforge budget. Gear scraps and star-up duplicates flow from Turbo Turtle, the Ghoulion boss and Exploration.",
          "Time every promotion and scrap-burn to Turbo Turtle windows, where the same consumption scores event milestones on top of the upgrade. And keep Precision Blueprints in the plan: they're a separate system that scales rally power directly, fed by daily activity and burned in the same Turtle windows.",
        ],
      },
    ],
    takeaways: [
      "Reforge unlocks only on Alloy (Legendary) gear — 2-star/4-star/6-star each add a Special Stat slot.",
      "Slot-locked pools: Helmet = offense, Armor = defense/cooldown/DR, Greaves = HP/healing/auras.",
      "Standard = 1 hammer all tiers; Advanced = 25 hammers, Epic+ only, unlocks at 200 hammers spent.",
      "Locks multiply cost ~1/4/16 (25/100/400 Advanced). Lock S-fit lines only, two locks max.",
      "Faction/troop-tagged stats are traps on mismatched heroes — synergy over rarity, always.",
    ],
    faq: [
      {
        q: "When should I lock a substat in Tiles Survive?",
        a: "Lock only lines that are S-fit for the hero wearing the gear — the stat matches their role and faction/troop tags. Cap at two locks; beyond that the exponential cost (16x on Standard, 400 hammers a roll on Advanced with two locks) burns weeks of income for marginal gains.",
      },
      {
        q: "Is Advanced reforge worth it?",
        a: "Yes, once unlocked (after 200 hammers spent collectively) and once you're chasing specific Epic/Legendary lines on endgame gear. Before that point, Standard rolls are far more hammer-efficient per attempt.",
      },
      {
        q: "What is the best reforge stat in Tiles Survive?",
        a: "It depends on the slot and hero: Damage Bonus for DPS helmets, Active Skill Cooldown (−15% Legendary) stacking across armor pieces, Damage Reduction for tanks, and Allied Hero Combat Boost on greaves for squad-wide value. A tagged stat that matches your hero always beats a higher-rarity mismatch.",
      },
    ],
    relatedTools: [
      { href: "/gear-reforge", label: "Reforge Simulator", note: "Price the chase before spending a real hammer" },
      { href: "/tier-list", label: "Hero Tier List", note: "Who deserves the Alloy first" },
    ],
  },

  /* ============================== G6 ============================== */
  "rally-etiquette": {
    slug: "rally-etiquette",
    seoTitle: "Tiles Survive Rally & March Slot Etiquette",
    seoDescription:
      "Tiles Survive! rally etiquette and march-slot management: the 4+1 gathering routine, slot discipline before Oil Clash and Arcadian Conquest, and the comms that keep officers happy.",
    intro: [
      "Alliance warfare is a coordination game, and coordination runs on two scarce resources: march slots and officer patience. Most players lose both to the same mistake — treating their queues like personal convenience instead of alliance infrastructure.",
      "This guide covers march-slot discipline, the 4+1 routine that funds everything, rally join etiquette, and the six messages that get you muted in state chat.",
    ],
    sections: [
      {
        id: "march-slots",
        heading: "March slots are the real currency",
        paragraphs: [
          "Every queue you own is consumed from the moment a march leaves your base until the troops physically walk back inside. Gathering locks slots for the full trip. Encampments lock slots indefinitely until you manually recall them. Garrisons in alliance structures, Oil Clash rigs and Reservoir Raid facilities hold slots for as long as the troops stay stationed.",
          "The error message everyone learns the hard way — 'no available march slots' — is almost always an encampment or a stale garrison that was never recalled. Make recalling a reflex: before bed, before events, before you log off for the day.",
        ],
      },
      {
        id: "four-plus-one",
        heading: "The 4+1 routine",
        paragraphs: [
          "VIP 8 unlocks the fifth march queue, and it converts directly into economy: four queues gather resources non-stop while the fifth — your best squad — stays home for rallies, infected hunting and defense. Dedicated farmers send all four queues at a single resource type (300 million of one resource in three days is a realistic haul) and let the fifth auto-join alliance rallies.",
          "Stagger gathering trips so payloads land when you're actually online to redispatch them, and dispatch to higher-level nodes before you sleep so nothing returns to an empty base mid-night.",
        ],
        callout: {
          kind: "tip",
          title: "Clear slots before the big three",
          text: "Oil Clash, Reservoir Raid and Arcadian Conquest all reward fast rotation waves. Recall every gathering queue before the window opens — an alliance where half the roster is out farming loses map tempo it never gets back.",
        },
      },
      {
        id: "join-etiquette",
        heading: "Rally join etiquette",
        paragraphs: [
          "The unwritten contract of a rally: join fast, join full, join right. A rally that fills in ninety seconds hits its target before defenders reinforce; one that trickles full over five minutes telegraphs the attack.",
        ],
        bullets: [
          "Join early in the window — the first minutes decide whether the rally lands uncontested.",
          "Send a full march, not a token squad — rally power is the sum of its joiners.",
          "Match the rally's composition intent; a counter-build rally undermined by 80%-Guard joiners loses its edge.",
          "Reinforce by priority: frontline garrisons first, then resource defenders, then vanity tiles.",
          "Never solo-hit a target the alliance has marked for a rally — you feed the defender kill points and burn the attempt.",
        ],
      },
      {
        id: "event-comms",
        heading: "Event-day comms",
        paragraphs: [
          "Officers coordinate through alliance markers, and the marker is the message. When an R4 or R5 flags a structure, the entire roster should concentrate march power on that node — scattered attacks into unmarked targets are how stronger alliances lose to organized ones.",
          "On Oil Clash days, respect the schedule: garrison passive income nodes through the morning, hold attacks through midday, and detonate your attempt inventory in the final 5-8 hours of the daily cycle alongside the roster. On Alliance Duel VS gathering days, time your march returns so payloads land inside scoring windows.",
        ],
      },
      {
        id: "six-messages",
        heading: "The six messages that get you muted",
        paragraphs: [
          "Field-tested, officer-approved list of chat crimes — avoid and prosper:",
        ],
        bullets: [
          "“Sergeant, why are we attacking this?” — asked 40 seconds into a scheduled push, in all caps.",
          "Solo-hitting a marked rally target, then asking why the rally failed.",
          "“Need reinforce NOW” — while all five of your own marches are out gathering.",
          "Posting your power score as an argument during target selection.",
          "“Can someone carry me in Arcadian?” — the morning of Arcadian.",
          "Any message containing both ‘relax’ and the R5’s name.",
        ],
      },
    ],
    takeaways: [
      "Recall encampments and stale garrisons by reflex — slots are currency.",
      "4+1 at VIP 8: four queues fund the account, the fifth fights.",
      "Rallies: join fast, join full, match composition, reinforce frontline first.",
      "Clear every slot before Oil Clash, Reservoir Raid and Arcadian Conquest.",
      "Follow alliance markers; the marker is the plan.",
    ],
    faq: [
      {
        q: "How many march slots can I unlock in Tiles Survive?",
        a: "March queues scale with VIP level and research. The critical breakpoint is VIP 8, which unlocks the fifth queue — enough for four gathering marches plus one combat-ready squad.",
      },
      {
        q: "Why does it say 'no available march slots'?",
        a: "A queue is occupied from march start until troops return home — and encampments or garrisons hold slots indefinitely until recalled. Recall stale encampments and time gathering returns to free slots when you need them.",
      },
      {
        q: "Should I join every alliance rally?",
        a: "Join rallies you can reach fast and fill properly — a full march that lands inside the window is the contract. If all your slots are busy gathering, recall one; that's what the fifth queue is for.",
      },
    ],
    relatedTools: [
      { href: "/war-room", label: "Arcadian War Room", note: "File the rally plan before the rally" },
      { href: "/guides/event-calendar-compounding", label: "Event Calendar Guide", note: "The weekly rhythm behind the comms" },
    ],
  },


  /* ============================== G7 ============================== */
  "event-calendar-compounding": {
    slug: "event-calendar-compounding",
    seoTitle: "Tiles Survive Event Calendar & Spending Guide",
    seoDescription:
      "The full Tiles Survive! event rhythm: Turbo Turtle double-dipping, Ghoulion Pursuit adhesives, Oil Clash anchors, the Saturday Arcadian Conquest siege — and what to bank 30-60 days ahead.",
    intro: [
      "Tiles Survive! events don't reward activity — they reward preparation. Every major event converts a resource you banked days or weeks earlier into milestones, store currency and leaderboard placement on top of the upgrade itself. Accounts that spend the moment they acquire lose twice: once to retail cost, once to missed event windows.",
      "This is the compounding calendar: the weekly heartbeat, each anchor event decoded, and the 30-60 day banking plan that turns the same resources into double and triple value.",
    ],
    sections: [
      {
        id: "heartbeat",
        heading: "The weekly heartbeat",
        paragraphs: [
          "The event week has a fixed shape, and every top alliance runs it the same way:",
        ],
        bullets: [
          "Sunday-Wednesday: stockpile. Gather, bank materials, run daily activity, spend nothing event-scored.",
          "Thursday-Friday: the overlap windows. Turbo Turtle and Power Play co-score the same consumption — deploy gear materials, blueprints and speedups here.",
          "Friday evening: burst prep. Clear hospital capacity completely, organize shift assignments, position bases near Saturday's objectives.",
          "Saturday: Arcadian Conquest — the three-hour siege. Emergency spending only; the budget should already be deployed.",
        ],
        callout: {
          kind: "meta",
          title: "The double-dip mechanic",
          text: "Consume gear scraps, promotion materials or speedups inside an event window and the same spend scores event milestone points AND store currency AND leaderboard placement on top of the stat gain. Same resources, three payouts — this single habit separates accelerating accounts from treading-water accounts.",
        },
      },
      {
        id: "turbo-turtle",
        heading: "Turbo Turtle: the gear anchor",
        paragraphs: [
          "Turbo Turtle is the weekly anchor for gear progression at every account tier. Gear scraps and gear-upgrade speedups consumed during the window convert into milestone points, store currency and cross-state leaderboard scores — on top of the upgrades themselves.",
          "This is where the strategic-timing trick pays: never promote Chief Gear, upgrade Precision Blueprints or burn scraps the day you acquire them. Hoard them for the Thursday-Friday overlap where Turbo Turtle and Power Play score simultaneously, and cluster Blueprint burns into the same window. Phase 3 of Turbo Turtle is also one of the two windows for spending Behemoth talent protein.",
        ],
      },
      {
        id: "ghoulion",
        heading: "Ghoulion Pursuit: adhesives or nothing",
        paragraphs: [
          "Ghoulion Pursuit is the alliance boss where damage brackets decide your Adhesive income — and Adhesives are the promotion bottleneck for the entire Chief Gear quality ladder. Higher bracket, more adhesives; more adhesives, faster promotions; faster promotions, higher bracket next cycle.",
          "The spend is two-layered. Weeks before: build damage capacity — hero pulls and Signature Weapon investment raise the ceiling. During the window: combat-buff packs, attack consumables and rally-burst pushes squeeze your roster into the next bracket. Skimp on the preparation layer and the event layer has nothing to multiply.",
        ],
      },
      {
        id: "oil-clash",
        heading: "Oil Clash: anchors and the evening detonation",
        paragraphs: [
          "Oil Clash is the seasonal multi-day faction war, and it is won by timeline discipline, not aggression. Your attack attempts are the scarce currency: you get 8 anchors at daily reset (10 with the event pack), the inventory caps at 15, and up to 7 carry over — so the opening moves are patience, not blitz.",
          "The proven rhythm: garrison the passive income nodes (Cranes +1, Barrels +2) through the morning, hold ground through midday while income accumulates, then detonate the roster's attempt inventory in the final 5-8 hours of the daily cycle. Geographically, read the map as connected paths — capture the chokepoints that cut enemy rotation routes and isolate rival alliances inside their starting bubbles, and one defended node covers everything behind it.",
        ],
        callout: {
          kind: "tip",
          title: "Markers make the map",
          text: "R4/R5 officers place alliance markers on targets: Cranes and Barrels in the morning (do NOT attack them early), the flagged Large Rigs 30 minutes before the evening push, and chokepoints for defensive blockades. Follow the markers — they are the strategy.",
        },
      },
      {
        id: "arcadian",
        heading: "Arcadian Conquest: the Saturday siege",
        paragraphs: [
          "Every Saturday, the three-hour Arcadian Conquest siege is the week's headline. The alliance holding 1.5 hours of Arcadia occupation — or the longest total — wins, and the store pays out roughly 150 Reforge Hammers a week to active participants.",
          "Preparation over reaction: Tuesday through Friday, pull rally-capacity packs, troop training bundles and Signature fragments. Friday evening, deploy the speedups that compound with Saturday's rally output. Saturday itself is execution — three score streams run simultaneously (casualty, kill and occupation points), so capture towers and keep high-tier troops in contact rather than padding one stat.",
        ],
        table: {
          columns: ["Event", "Cadence", "What to bank", "What it pays"],
          rows: [
            ["Turbo Turtle", "Weekly", "Gear scraps, blueprints, upgrade speedups", "Gear milestones + store currency"],
            ["Power Play", "Weekly overlap", "The same materials as Turtle", "Co-scored milestones"],
            ["Ghoulion Pursuit", "Alliance boss", "Hero pulls, Signature investment, combat buffs", "Adhesives by damage bracket"],
            ["Oil Clash", "Seasonal multi-day", "Anchors, rally-capacity packs", "Map control + seasonal points"],
            ["Reservoir Raid", "Event window", "Troop-training packs, combat buffs", "Contribution-weighted rewards"],
            ["Arcadian Conquest", "Every Saturday", "Rally capacity, training bundles, fragments", "Occupation glory + ~150 hammers/week"],
            ["Doomsday Express", "Daily", "Truck raid attempts", "Behemoth cells (Class A trucks)"],
          ],
        },
      },
      {
        id: "banking",
        heading: "The 30-60 day banking plan",
        paragraphs: [
          "Compounding needs a pipeline, not a diary. Thirty to sixty days ahead of any major event, identify what it scores and start banking exactly that: gear materials before your next Turbo Turtle stretch, Adhesive velocity before Ghoulion, anchor inventory before Oil Clash, rally capacity before Arcadian season peaks.",
          "The discipline is boring and unbeatable: every resource has a named event and a date. If a purchase or a spend doesn't score inside a window, it waits. Thirty days of that habit and the same income funds an account a full tier ahead of an identical spender without it.",
        ],
      },
    ],
    takeaways: [
      "Sun-Wed stockpile, Thu-Fri overlap spend, Friday hospital clear, Saturday siege.",
      "Turbo Turtle + Power Play co-score — every scrap and blueprint waits for that window.",
      "Ghoulion brackets pay Adhesives; build damage weeks out, buff during.",
      "Oil Clash: 8 anchors a day, 15 cap — detonate in the final 5-8 hours, hold chokepoints.",
      "Arcadian Saturday: score all three streams; the store is worth ~150 hammers a week.",
    ],
    faq: [
      {
        q: "What is the best event to spend materials on in Tiles Survive?",
        a: "Turbo Turtle, ideally overlapping with Power Play. Consumption inside the window scores milestone points, store currency and leaderboard placement on top of the upgrade itself — the same materials spent on a dead Tuesday earn none of it.",
      },
      {
        q: "How do I get more Reforge Hammers as F2P?",
        a: "Arcadian Conquest participation — the store pays roughly 150 hammers a week to active accounts. That income is why hammer discipline matters: a single 2-lock chase can burn multiple weeks of it.",
      },
      {
        q: "How does Oil Clash scoring work?",
        a: "Daily attack attempts come from anchors (8 per reset, 10 with the pack, inventory capped at 15 with up to 7 carried over). Top alliances garrison passive nodes early, hold attacks through midday and concentrate their attempt inventory in the final 5-8 hours of the cycle.",
      },
    ],
    relatedTools: [
      { href: "/war-room", label: "Arcadian War Room", note: "Plan Saturday before Saturday" },
      { href: "/gear-reforge", label: "Reforge Simulator", note: "Spend those Arcadian hammers wisely" },
    ],
  },

  /* ============================== G8 ============================== */
  "f2p-gem-flow": {
    slug: "f2p-gem-flow",
    seoTitle: "Tiles Survive F2P Gem Spending Guide",
    seoDescription:
      "Where every free gem goes in Tiles Survive!: the VIP 8 march-slot breakpoint, the stamina pipeline, what gems should never buy, and a 90-day free-to-play plan.",
    intro: [
      "Free-to-play in Tiles Survive! is not a lower difficulty setting — it's a sequencing puzzle. The game hands out gems, speedups and fragments constantly; the only question is whether you spend them in the order that compounds or the order that evaporates.",
      "This guide ranks every F2P gem destination by return, lists the purchases that should never happen, and lays out the first 90 days of the zero-spend pipeline.",
    ],
    sections: [
      {
        id: "vip-breakpoints",
        heading: "VIP 8: gems are march slots in disguise",
        paragraphs: [
          "The single highest-return gem purchase in the game is VIP level — and the breakpoint that matters is VIP 8, which unlocks the fifth march queue. Four queues gathering around the clock plus one combat-ready squad changes your economy and your rally contribution simultaneously; dedicated farmers pull 300 million of a single resource in three days on four synced queues.",
          "VIP 7 matters too for spenders (it fully unlocks and maxes Rosie, the game's top priority hero), and F2P accounts reach these levels slower but in the same order: VIP 8 first, then let 9-10's cumulative construction, research and output bonuses land naturally from daily play. VIP 11+ is sharp diminishing returns — ignore it entirely.",
        ],
        table: {
          columns: ["VIP level", "What it gives", "F2P priority"],
          rows: [
            ["VIP 7", "Rosie fully unlocked and maxed", "Pull toward it, arrive naturally"],
            ["VIP 8", "5th march queue", "The breakpoint — rush it"],
            ["VIP 9-10", "Cumulative % bonuses (construction/research/output)", "Let daily gems finish it"],
            ["VIP 11+", "Diminishing returns", "Skip"],
          ],
        },
      },
      {
        id: "pipeline",
        heading: "The free gem pipeline",
        paragraphs: [
          "Zero-spend income is steadier than most players think: Settlement missions, daily activity, Arena rankings, event milestone rewards, exploration collectibles and boundary stones all trickle gems. The pipeline only works if the outflow is as disciplined as the inflow — banked gems are VIP levels; spent-on-impulse gems are nothing.",
          "The community's settled answer for the second-biggest gem sink is stamina. Killing infected — the small roaming ones, not the Alphas — returns construction speedups and materials so consistently that stamina purchases effectively convert gems into building speed. One caution: this is the one place speedups flow back; everywhere else you should be saving them.",
        ],
      },
      {
        id: "ranked",
        heading: "Every destination, ranked",
        paragraphs: [
          "From best to worst return per gem, for a zero-spend account:",
        ],
        bullets: [
          "1. VIP progression to level 8 — the fifth queue compounds forever.",
          "2. Stamina — funds the infected-kill loop that pays speedups and materials.",
          "3. Hero fragments (universal) — pushed into your one core squad, timed to recruitment events.",
          "4. Construction speedups — reserved for Power Plant chain milestones, never filler buildings.",
          "5. Arena tickets from the VIP shop — the only VIP shop item the community agrees is fairly priced.",
          "Never: retail resource purchases, short-timer skips, banner yolo pulls, cosmetics.",
        ],
        callout: {
          kind: "warn",
          title: "The production fix rule",
          text: "If you're buying food or wood with gems to cover daily shortages, you don't have a gem problem — you have a production problem. Fix survivor assignments, resource research and tile levels instead. Gems solve special problems, not structural ones.",
        },
      },
      {
        id: "never-buy",
        heading: "What gems should never buy",
        paragraphs: [
          "Daily resource top-ups (see above), timer skips under an hour (the queue finishes before your next session anyway), and single pulls on recruitment banners outside events. Banner pulls are the classic F2P leak: fragments arrive free from events and Arena over time, and event-window pulls score double. A gem spent outside a window is a gem spent twice.",
        ],
      },
      {
        id: "ninety-days",
        heading: "The 90-day F2P plan",
        paragraphs: [
          "Month one: Power Plant chain and economy research, the starter core (Rosie, Chef, Sarge, Freja, Maddie), VIP gems banked. Month two: event double-dipping becomes your normal spend rhythm, Signature fragments banked toward your first SSR's exclusive weapon, Ghoulion brackets built. Month three: Power Plant and Barracks sync for T9, Arcadian preparation weeks, VIP 8 landing if it hasn't.",
          "The milestone that quietly matters: HQ 26 unlocks hero level 130, which is a bigger combat jump than most gear tiers. Time your construction speedup bank toward it rather than spreading it across the prerequisite chain.",
        ],
      },
    ],
    takeaways: [
      "VIP 8 (fifth march queue) is the best gem purchase in the game — rush it.",
      "Stamina is the #2 sink: the infected-kill loop pays speedups and materials.",
      "Universal fragments and construction speedups only — and only for events and PP milestones.",
      "Never buy daily resources, short-timer skips or out-of-window banner pulls.",
      "90-day arc: PP + starter core → event double-dipping → T9 sync + HQ 26 (hero level 130).",
    ],
    faq: [
      {
        q: "What should I spend gems on in Tiles Survive as F2P?",
        a: "In order: VIP progression to level 8 (the fifth march queue), stamina for the infected-kill loop, universal hero fragments for your one core squad, construction speedups for Power Plant milestones, and Arena tickets from the VIP shop.",
      },
      {
        q: "Is VIP 8 worth it for free-to-play?",
        a: "Yes — it's the highest-return gem purchase in the game regardless of spend level. Four gathering queues plus one combat squad transforms both your economy and your rally contribution.",
      },
      {
        q: "Should F2P players pull on hero banners?",
        a: "Only inside event windows where pulls score milestones, and only with the understanding that fragments flow free from events and Arena over time. Out-of-window banner pulls are the most common F2P gem leak.",
      },
    ],
    relatedTools: [
      { href: "/tier-list", label: "Hero Tier List", note: "Where those fragments should go" },
      { href: "/guides/event-calendar-compounding", label: "Event Calendar Guide", note: "When to spend what you banked" },
    ],
  },

  /* __APPEND_MORE_GUIDES__ */
};
