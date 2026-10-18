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

  /* ============================== G9 ============================== */
  "pet-system-guide": {
    slug: "pet-system-guide",
    seoTitle: "Tiles Survive Pet System Guide: Eggs, Marks & Best Pets",
    seoDescription:
      "The full Pet System playbook: egg tiers and hatch odds, Pet Marks training math, every launch pet's skills, and which companion earns your marks first.",
    intro: [
      "Version 2.6.100 handed every Chief a second roster to manage. Pets look like settlement decoration — a seal, a raccoon, a deer made of starlight — but under the fur they are two power systems stapled together: an account-wide stat engine that flows into every hero you own, and a free combat slot that rides each march without displacing a single hero.",
      "This is the full playbook for that system: how the egg economy funnels, what each egg tier can and cannot hatch, how Pet Marks and training stages convert duplicates into permanent stat transfer, and which of the seven launch companions deserves your resources first. Numbers are from game version 2.6.200 — the system shipped in mid-September 2026 and is already on an active content cadence.",
    ],
    sections: [
      {
        id: "state-gate",
        heading: "First: why you can't see the Pet System yet",
        paragraphs: [
          "The Pet System rolls out by State, not by update. v2.6.100 delivered the code, but each State unlocks the feature as its own progression allows — and when yours qualifies, pets appear on their own. There is nothing to activate, buy or rebuild. If your client is current and the pet content is still missing, your State simply isn't there yet.",
          "Two implications. One: don't burn time hunting for a hidden unlock — there isn't one. Two: when pets arrive, they arrive for everyone in your State at once, which makes egg competition real for the first weeks. Set your intel-mission routine the day the system shows up.",
        ],
        callout: {
          kind: "tip",
          title: "Rollouts reward the prepared",
          text: "v2.6.200 already layered new pet tasks on top of the launch set. This system is expanding, and every future pet release compounds on the collection bonuses you bank today. Build the egg habit early even if the roster looks small.",
        },
      },
      {
        id: "egg-funnel",
        heading: "The egg funnel: intel missions, Workbench nests, three tiers",
        paragraphs: [
          "Pets begin as eggs dropped by pet-related Intel Missions. Hatch them in an open nest at the Workbench and the timer does the rest. Egg storage has no cap, so there is never a reason to skip an egg — bank them and batch your hatches.",
          "What most Chiefs miss is that eggs come in tiers, and the tiers are hard gates. Normal Pet Eggs physically cannot produce a Starhorn — the dash in the table below is a wall, not bad luck. Rare Pet Eggs spread across the whole roster. Precious Pet Eggs are the Starhorn slot machine: half of every Precious egg is the deer.",
        ],
        table: {
          columns: ["Pet", "Role", "Normal Egg", "Rare Egg", "Precious Egg"],
          rows: [
            ["Snowball", "Attacker", "22.2%", "10%", "—"],
            ["Dodo", "Support", "22.2%", "10%", "—"],
            ["Buckler", "Defender", "22.2%", "10%", "—"],
            ["Fluffy", "Support", "11.1%", "20%", "16.7%"],
            ["Ironhead", "Attacker", "11.1%", "20%", "16.7%"],
            ["Shadow", "Attacker", "11.1%", "20%", "16.7%"],
            ["Starhorn", "Defender", "—", "10%", "50%"],
          ],
        },
        bullets: [
          "Hatch odds are from game version 2.6.200; \"—\" means the pet is not in that egg's pool at all.",
          "Unfinished pet intel missions refresh the next day — a skipped mission is a skipped egg.",
          "Completed missions with unclaimed rewards sit for up to 3 days, then rot. Claim before the timer, not after.",
          "Instant-hatch boosts are the tempo tool: spend them on Rare and Precious eggs, and let Normal eggs run their natural timers.",
        ],
        callout: {
          kind: "warn",
          title: "The dash in Starhorn's row is the whole meta",
          text: "Every Normal egg you hatch is marks for the cheap trio or the mid band — which is not waste, since duplicates are the training currency. But no volume of Normal eggs will ever produce the SSR. Starhorn enters your life through Rare eggs (10%) and Precious eggs (50%), so treat every higher-tier egg as the scarce resource it is.",
        },
      },
      {
        id: "roster",
        heading: "The seven launch companions — and what their kits do",
        paragraphs: [
          "Roles first: Attackers lead with offense, Defenders with mitigation, Supports with healing and utility. Every documented base skill fires at battle start, so pet selection is really opening-tempo selection — what do you want to happen in the first ten seconds of the fight?",
        ],
        table: {
          columns: ["Pet", "Species", "Role", "Opening skill (battle start)"],
          rows: [
            ["Snowball", "Baby seal", "Attacker", "Deals water damage equal to 500% of Pet Attack to 1 random enemy hero"],
            ["Dodo", "Raccoon", "Support", "Utility opener — full kit still being documented"],
            ["Buckler", "Turtle", "Defender", "Defensive opener — full kit still being documented"],
            ["Fluffy", "Sheep", "Support", "Heals front-row allies for 100% of Pet Attack every 2s for 10s"],
            ["Ironhead", "Wild boar", "Attacker", "Offensive opener — full kit still being documented"],
            ["Shadow", "Shadow hound", "Attacker", "Marks 1 random enemy: +20% damage taken for 10s"],
            ["Starhorn", "Starlight deer", "Defender", "Front-row DEF +20% and back-row ATK +8% for 10s"],
          ],
        },
      },
      {
        id: "two-tracks",
        heading: "Leveling and training are two different games",
        paragraphs: [
          "Feeding raises a pet's level (cap 100) and its raw ATK, DEF and HP. Feed items come in +50, +100, +200 and +500 EXP sizes, and the curve bites early: even the cheapest pets in the roster ask roughly 302,000 EXP to walk from level 1 to 85, and a single mid-level Starhorn step (44 to 45) eats 2,600. Starhorn is the most expensive pet per level in the lineup; the seal, raccoon and turtle share the cheapest curve, with the sheep, boar and hound in between.",
          "Training is where the account-wide money is. Duplicates melt into that pet's exclusive Pet Marks, and marks buy training stages. Each stage raises the pet's Hero Bonus Rate — the share of its stats that flows into every hero you own, deployed or not. Starhorn's observed ladder runs from 25% at hatch to a flat 100% at stage 5:",
        ],
        table: {
          columns: ["Training stage", "Hero Bonus Rate", "Marks for the stage"],
          rows: [
            ["0 (freshly hatched)", "25%", "—"],
            ["1", "40%", "100"],
            ["2", "55%", "200"],
            ["3", "70%", "400"],
            ["4", "85%", "cost not yet fully documented"],
            ["5", "100%", "700 (the stage 4 to 5 push alone)"],
          ],
        },
        bullets: [
          "Read that table as a multiplier, not a list — stage 5 quadruples the stat flow of a freshly hatched pet.",
          "The tracks compound: levels grow the stat pool, training decides how much of it reaches your heroes. A level-60 pet at stage 3 out-contributes a level-90 pet at stage 0.",
        ],
        callout: {
          kind: "meta",
          title: "Marks are exclusive per pet",
          text: "Snowball duplicates produce Snowball marks, not Starhorn marks — you cannot farm cheap duplicates and feed them to the deer. Every pet's training is funded by its own copies, which is why egg-tier discipline beats egg quantity. And note the two-track split: the Bonus Rate applies account-wide, but the stage skills in the next section only pay while that pet is actually fielded.",
        },
      },
      {
        id: "stage-skills",
        heading: "Stage skills: the permanent modifiers",
        paragraphs: [
          "Beyond the opening skill, each pet carries three more skills locked behind training stages 2, 4 and 5. Starhorn's set is the profile: +3% Health for deployed heroes at stage 2, −2.5% skill damage taken at stage 4, and +10% pet stats at stage 5. The cheaper pets get smaller versions of the same shape — Snowball's stage-5 self-buff is +5%, the mid band's is +7.5%.",
          "Read those numbers for what they are: permanent team-wide modifiers that stack with your gear and research. A fully trained pet is a walking gear set that also happens to open the fight.",
        ],
        bullets: [
          "Shadow: +1.5% deployed Attack (stage 2), +7.5% Attack versus targets under 35% Health (stage 4).",
          "Fluffy: +2.5% deployed Health (stage 2), +3% Healing Effect (stage 4).",
          "Snowball: +1% deployed Attack (stage 2), +5% Attack versus targets under 25% Health (stage 4).",
          "All stage skills apply only to the team the pet is assigned to — the account-wide benefit is the Bonus Rate itself.",
        ],
      },
      {
        id: "battle-rules",
        heading: "How pets deploy: one per team, and no sharing",
        bullets: [
          "Each team brings exactly one pet, in its own slot — no hero is ever displaced.",
          "A pet can only serve one team at a time. Five march queues want five different raised pets; there is no Starhorn-for-everyone.",
          "The opening skill fires automatically at battle start — pet choice is opening-tempo choice.",
        ],
        paragraphs: [
          "The one-pet-per-team rule is the quiet endgame design. Early on you are raising one good pet; the moment you run multiple queues — gathering defense, arena, rallies — you need a bench. That is when the mid band stops being duplicate fodder and becomes your second and third deployments.",
          "The kits also read like they were drawn against the 40/30/30 doctrine: guards eat the damage, damage sits behind. Starhorn's opener is literally \"front-row Defense +20%, back-row Attack +8%\" — the formation, buffed. Fluffy heals the front row every two seconds, which is exactly the lane guards bleed from. If your marches follow the standard split, the pet meta is already solved for you.",
        ],
      },
      {
        id: "priority",
        heading: "The priority ladder: where your marks go first",
        paragraphs: [
          "Starhorn first. The kit is universal — every formation has a front row to armor and a back row to sharpen — and the SSR stat ceiling plus the +10% stage-5 self-buff make it the strongest long-term sink. It is also the scarcest pet in the game: locked out of Normal eggs, a 10% Rare pull, half of every Precious egg. When a Precious egg lands, that thud you hear is your main pet arriving.",
          "But \"first\" means first, not \"only until finished\". Stage 5 costs 700 marks for the final push alone — a months-long project. The efficient line: push Starhorn to stage 2 or 3 (300 to 700 cumulative marks), then let trickle income finish the ladder while you start a second pet.",
        ],
        bullets: [
          "Rally and focus-fire account: Shadow. The +20% damage-taken mark turns a coordinated rally's opening burst into a kill order, and stage 4's +7.5% Attack against sub-35% targets finishes what the mark started.",
          "Sustain and garrison account: Fluffy. A heal-over-time on the front row every two seconds is worth more effective Health than most gear substats, and the stage-2 +2.5% Health applies to every deployment it rides.",
          "Fresh account, thin roster: Snowball. It hatches from 22% of every Normal egg, feeds on the cheapest EXP curve in the game, and a 500%-Attack opener still chunks a random hero's bar at any level. It is the workhorse you raise on the way to the deer.",
        ],
        callout: {
          kind: "warn",
          title: "Don't spread marks thin",
          text: "Every mark spent on pet number six is a mark not spent raising the stat flow of pet number one. Concentrate until your main pet clears stage 2 or 3, then — and only then — start the second project. And never train a pet you never deploy: the stage skills only pay while that specific pet rides a team.",
        },
      },
      {
        id: "collection",
        heading: "Resonance, Radiant Forms and the Sanctuary",
        paragraphs: [
          "Three collection systems sit on top of the combat loop. Pet Resonance pays bonuses for owning the right combinations of pets — collection-gated and deployment-independent. Radiant Forms are the transformation capstone: a pet developed far enough evolves into a visibly different, stronger version of itself. And the Pet Sanctuary is the settlement home where you interact with your companions, rename them and unlock color variants.",
          "The strategic read: the system wants both depth and breadth. Depth — one pet, maxed — wins your battles. Breadth — a full roster — wins your Resonance tiers and raises the floor of the account-wide stat engine. The cheap trio is free breadth, since every Normal egg eventually completes it, so let the cheap collection happen in the background while your marks stay concentrated.",
        ],
      },
      {
        id: "spend",
        heading: "Spend discipline: what the in-game pet offers actually do",
        paragraphs: [
          "Two pet-focused offers rotate in-game: a Hatchling Weekly Pass built around daily drip — a higher-rarity egg, a feed item and an instant-hatch boost every day — and a Weekly Pet Egg Pack that front-loads a batch of eggs and boosts at once. Neither is required to play the system: the intel-mission loop is the entire engine, and it is free.",
          "If you do pick up pet offers, you are buying tempo, not stats. The instant-hatch boost is the only component you cannot farm, and it is worth the most pointed at Precious eggs. If you never spend at all, nothing changes — your real bottleneck is mission discipline, not currency.",
        ],
        callout: {
          kind: "meta",
          title: "Pet Journey is the free reward track",
          text: "Hatching milestones pay out through the Pet Journey track as your collection grows. Between Journey rewards, Resonance tiers and the account-wide Bonus Rate, every egg — even the fourth duplicate seal — is progress. There are no dead pulls in this system, only slow ones.",
        },
      },
    ],
    takeaways: [
      "Pets are two systems in one: an account-wide stat engine (the Hero Bonus Rate) and a free extra combat slot per team.",
      "Egg tiers are hard gates — Normal eggs can never hatch Starhorn, while Precious eggs are 50% Starhorn.",
      "Training stages take the Bonus Rate from 25% to 100%: the biggest multiplier in the system. Marks are per-pet and come only from duplicates.",
      "Priority: Starhorn first, then a second pet by need — Shadow for focus fire, Fluffy for sustain, Snowball as the budget workhorse.",
      "One pet per team and no sharing, so a five-queue account needs a five-pet bench. Concentrate marks to stage 2-3 before diversifying.",
    ],
    faq: [
      {
        q: "How do I get pets in Tiles Survive?",
        a: "Complete pet-related Intel Missions for Pet Eggs, then hatch them in an open nest at the Workbench. Unfinished missions refresh daily and unclaimed rewards persist for three days — run the loop every day.",
      },
      {
        q: "Why isn't the Pet System in my game yet?",
        a: "It unlocks State by State as progression allows. There is no manual activation — when your State qualifies, the system appears on its own.",
      },
      {
        q: "Can a pet replace a hero in my formation?",
        a: "No. Pets ride in their own slot — each team brings one pet alongside the full hero formation, and each pet can only be assigned to a single team at a time.",
      },
      {
        q: "Do pets I'm not using still give bonuses?",
        a: "Yes. Every pet you own transfers a share of its stats to all heroes through its Hero Bonus Rate, whether deployed or not. The stage skills, by contrast, only apply to the team the pet is fielded with.",
      },
      {
        q: "What is the best pet in Tiles Survive?",
        a: "Starhorn, the SSR Defender. Its opener grants front-row Defense +20% and back-row Attack +8%, it has the highest stat ceiling of the launch roster, and its training ladder runs all the way to a 100% Hero Bonus Rate. Push it to training stage 2-3 before starting a second project.",
      },
    ],
    relatedTools: [
      { href: "/tier-list", label: "Hero Tier List", note: "The five slots your pet rides behind" },
      { href: "/guides/march-math-40-30-30", label: "March Math 40/30/30", note: "The doctrine Starhorn's kit was built for" },
      { href: "/war-room", label: "Arcadian War Room", note: "Call pet assignments to every march" },
    ],
  },

  /* ============================== G10 ============================== */
  "turbo-turtle-event-guide": {
    slug: "turbo-turtle-event-guide",
    seoTitle: "Tiles Survive Turbo Turtle Event Guide & Best Strategy",
    seoDescription:
      "The Turbo Turtle playbook: bank Gear Scraps and speedups, burst the event window for double-dip progress, spend the store on Alloy first — milestones over rankings.",
    intro: [
      "Turbo Turtle is the gear event that pays you twice. Every Gear Scrap and speedup burned inside the window still does its normal job — gear levels go up — but it also mints event points, milestone rewards and store currency. The exact same materials spent outside the window do exactly one of those things.",
      "That asymmetry is the entire event, and it is why gear discipline in Tiles Survive is a calendar problem before it is a resource problem. This is the full playbook: what counts toward progress, what to bank between events, how to spend the burst window, what the store is actually for, and where the free-to-play line sits between milestones and rankings.",
    ],
    sections: [
      {
        id: "double-dip",
        heading: "The double-dip rule",
        paragraphs: [
          "Turbo Turtle scores your gear work: upgrades, material consumption and the speedups that finish them all generate event progress while the window is live. The stat gain you were getting anyway still lands — the event layer is stacked on top, not traded against it.",
          "Flip that around and you get the rule that runs the whole guide: an upgrade done outside the event is the same upgrade at half the price of missing out. If a gear change can wait for Turbo Turtle, waiting is the correct play; if Turbo Turtle is live, the only wrong move is hoarding for no reason.",
        ],
        callout: {
          kind: "tip",
          title: "One sentence to memorize",
          text: "If it's worth upgrading, it's worth upgrading inside Turbo Turtle — and if Turbo Turtle isn't live, the upgrade almost certainly wasn't urgent.",
        },
      },
      {
        id: "banking",
        heading: "What to bank between events",
        paragraphs: [
          "The event is won in the quiet weeks before it. Your job between windows is to let the taps run and the inventory climb:",
        ],
        bullets: [
          "Gear Scraps — the base currency of gear upgrades. Ghoulion Pursuit brackets and Exploration are the steady taps; let them fill the tank instead of draining them on arrival.",
          "High-quality scraps — worth strictly more when they land on high-rarity, long-term pieces. Save the good stuff for gear that will still be on your main march in three months.",
          "Blueprints — cluster the burns into the same window instead of sprinkling them across dead weeks.",
          "Speedups — enough to close the gap to a milestone that matters, never the whole inventory. An unfinished upgrade mid-event is efficiency you can feel.",
        ],
        callout: {
          kind: "warn",
          title: "The quality-scrap leak",
          text: "Burning premium scraps on a leveling bridge the week before the event is the most common self-inflicted wound. Scraps spend at full value any day — they only score during the window. Bank first, spend second.",
        },
      },
      {
        id: "burst",
        heading: "The burst window: what to upgrade, in what order",
        paragraphs: [
          "When the event opens, spend with a plan, not a spree. The order that holds up across accounts:",
        ],
        bullets: [
          "Main march gear first — the pieces worn by the heroes you actually field in rallies, arena and events. Practical power now, event points now, same materials.",
          "Long-term rarity second — purple gear is the honest bridge, Alloy gear is the destination. High-rarity pieces you will keep are the correct home for saved quality scraps.",
          "Reforge last and carefully — Reforge Hammers burn fast and pay unevenly. Reforge inside the event only when the piece belongs to your main lineup and the stat direction matches the build. Everything else waits for its own discipline.",
          "The stop rule — spend to a milestone that pays, then halt when the next tier asks for too much. Efficiency is spending at the right time, not spending everything.",
        ],
      },
      {
        id: "store",
        heading: "The event store: Alloy first, always",
        paragraphs: [
          "Event currency is seed capital for the next cycle, and the store makes that literal. Played consistently, Turbo Turtle is one of the steadiest Alloy crate taps in the game — a patient player clears roughly one crate a week of event currency.",
        ],
        table: {
          columns: ["Store priority", "Why"],
          rows: [
            ["Alloy crate", "The long-term gear ceiling — the single hardest material to shortcut anywhere else"],
            ["Gear Scraps", "Feeds the next burst window directly"],
            ["Adhesives", "Ghoulion Pursuit pays them too, but the store tops the tank off cheaply"],
            ["Reforge Hammers", "Only once your reforge targets are already chosen — hammers without a plan are a donation"],
            ["Everything else", "Only under genuine, immediate need — this is a gear event; buy gear progression"],
          ],
        },
              },
      {
        id: "milestones",
        heading: "Milestones beat rankings",
        paragraphs: [
          "Ranking rewards are designed to be attractive and won by other people. The leaderboard is populated by bigger stockpiles and heavier spenders than you, and chasing it means liquidating the inventory that funds your next three cycles.",
          "The free-to-play arithmetic is boring and correct: consistent mid-tier milestones, collected every single cycle, out-earn one heroic push followed by two empty events. If you compete at all, do it the honest way — bank across multiple cycles and only push when you have a real read on your State's competition level.",
        ],
        callout: {
          kind: "warn",
          title: "The leaderboard trap",
          text: "A ranking is a one-time payout. A stocked inventory is a compounding one. Never trade the second for the first unless the reward tier genuinely changes your account.",
        },
      },
      {
        id: "stacking",
        heading: "Stack it with the calendar",
        paragraphs: [
          "Turbo Turtle is strongest when it isn't alone. The Thursday-Friday stretch where Turbo Turtle and Power Play score simultaneously is the highest-value slot on the weekly calendar — materials spent there count twice before the event multipliers even enter the math. The same logic extends outward: know what the neighboring events score, and aim your banking at the overlap.",
          "This is one loop in a bigger machine. The full cadence — what to bank for which event, and when — lives in the event calendar guide; Turbo Turtle is simply the gear-shaped gear in that gearbox.",
        ],
      },
      {
        id: "checklist",
        heading: "The cycle checklist",
        table: {
          columns: ["Phase", "Do this"],
          rows: [
            ["Before", "Bank scraps and quality scraps, hold speedups, audit your main-march gear, pick upgrade targets in advance"],
            ["During", "Main gear first, speedups only to reach milestones, claim rewards on time, buy the store before anything else eats the currency"],
            ["After", "Stop the random upgrades, reopen the banking posture, aim at the next window"],
          ],
        },
      },
    ],
    takeaways: [
      "Every gear material spent inside the window pays twice — gear growth plus event progress. Outside it pays once.",
      "Bank Gear Scraps, quality scraps, blueprints and speedups between events; choose targets before the window opens.",
      "Store priority: Alloy crate, then scraps and adhesives — the store is next cycle's seed capital.",
      "Milestones over rankings for free-to-play; rankings only with multi-cycle savings and a read on your State.",
      "The loop compounds: bank, burst, claim, re-arm from the store, repeat every cycle.",
    ],
    faq: [
      {
        q: "What is Turbo Turtle in Tiles Survive?",
        a: "A recurring gear-focused event. Gear upgrades and the materials and speedups behind them generate event progress, milestone rewards and store currency on top of the normal stat growth — the same work pays twice inside the window.",
      },
      {
        q: "When should I upgrade my gear?",
        a: "Inside the Turbo Turtle window whenever the upgrade can wait. The only upgrades that justify going out-of-window are ones you need immediately for a fight you cannot afford to lose.",
      },
      {
        q: "What should I buy from the Turbo Turtle store?",
        a: "The Alloy crate first — it is the steadiest Alloy tap in the game for consistent players. Then gear materials that feed the next cycle: scraps, adhesives, and hammers once your reforge targets are set.",
      },
      {
        q: "How do I farm Gear Scraps?",
        a: "Ghoulion Pursuit brackets and Exploration rewards are the steady sources, plus event stores. Let them accumulate between Turbo Turtle windows instead of spending them on arrival.",
      },
      {
        q: "Should free-to-play players chase Turbo Turtle rankings?",
        a: "No — milestones. Ranking tiers are contested by larger stockpiles and spenders. Consistent milestone collection every cycle out-earns a single overextended push.",
      },
    ],
    relatedTools: [
      { href: "/gear-reforge", label: "Gear Reforge Calculator", note: "Plan the hammers you win here" },
      { href: "/guides/chief-gear-reforge-discipline", label: "Reforge Discipline", note: "When to lock a substat" },
      { href: "/guides/event-calendar-compounding", label: "Event Calendar Guide", note: "Where Turbo Turtle sits in the year" },
    ],
  },

  /* ============================== G11 ============================== */
  "skill-weapon-exchange-guide": {
    slug: "skill-weapon-exchange-guide",
    seoTitle: "Tiles Survive Skill & Signature Weapon Exchange Guide",
    seoDescription:
      "Ten free swaps in fourteen days: the Skill & Signature Weapon Exchange rules, the SR-to-SSR lockout, and the exact order to rebuild your main march.",
    intro: [
      "The Hero Skill & Signature Weapon Exchange is the closest thing Tiles Survive has to a free respec: a limited window where signature weapons and skill levels move between heroes instead of being re-ground from zero. A level-15 weapon parked on a bench hero stops being a museum piece and becomes a direct power injection for whoever actually fights.",
      "The catch is arithmetic: ten free swaps per window — five for weapons, five for skills — and every rule below exists so that none of the ten are wasted on a number that looked bigger.",
    ],
    sections: [
      {
        id: "rules",
        heading: "The rules before you touch anything",
        paragraphs: [
          "Read the mechanics first; the event punishes improvisation more than ignorance. The shape of the window:",
        ],
        table: {
          columns: ["Rule", "Detail"],
          rows: [
            ["Separate attempts", "5 free Signature Weapon exchanges + 5 free Skill exchanges — 10 total"],
            ["Window", "Runs 14 days, with attempt counters that can reset weekly — trust the timer in your event screen, not your memory"],
            ["Cooldown", "None. Swaps resolve instantly, so testing setups back-to-back is free once the attempt is spent"],
            ["The lockout", "Heroes promoted from SR to SSR cannot be source or target — the one hard exception to the open roster"],
            ["Everything else", "Any standard SSR hero, any faction, any class. The roster is your oyster"],
          ],
        },
        callout: {
          kind: "warn",
          title: "After the free ten, it costs real money",
          text: "Additional exchanges past the free attempts are priced in premium currency. There is no scenario where swap #11 is better value than simply banking materials for the next window — plan all ten on paper before you confirm the first one.",
        },
      },
      {
        id: "swap-order",
        heading: "The swap order that matters",
        paragraphs: [
          "Ten attempts feel generous right up until you've spent four of them \u201ctidying up.\u201d Run the order instead:",
        ],
        bullets: [
          "1. Main march first — move level-15 signature weapons and 35+ skill levels off secondary and bench heroes onto your primary carry. Power rating and arena rank move the same day.",
          "2. Fix the middle-tier spread — one hero at skill level 40 is worth more than two heroes at 20. Strip the sub-DPS skills and stack them onto your hyper-carry or highest-impact enabler.",
          "3. Then the second march — leftover swaps move an unused level-10 weapon onto your secondary tank or support: a multi-million power bump that costs zero new resources.",
        ],
      },
      {
        id: "targets",
        heading: "Who actually deserves the weapons",
        paragraphs: [
          "Bigger numbers are not the same as better lineups. A signature weapon only earns its slot on a hero your marches actually run — which in practice means the core five and the second march, in that order. Before every swap, ask whether the receiving hero leads troops your formation needs, not whether the power preview is green.",
          "The tier list is the reference point for who those heroes are this patch; the faction guide explains why a strong hero leading mismatched troops still underperforms a weaker hero in the right seat. Swap within that logic and the exchange prints power. Swap against it and you've spent a free attempt making your march worse.",
        ],
        callout: {
          kind: "tip",
          title: "Dead capital check",
          text: "Scan the bench for any signature weapon above level 10 and any skill above 30 sitting on a hero you haven't fielded in two weeks. That's not a roster — that's storage. The exchange converts storage into combat.",
        },
      },
      {
        id: "mistakes",
        heading: "Rookie mistakes before you press confirm",
        bullets: [
          "Swapping for the bigger preview number without checking march synergy — the classic.",
          "Burning attempts in the first hour. Write the ten swaps down first; the event runs two weeks and the attempts don't refund.",
          "Forgetting the weekly counter resets — a reset you didn't plan for is free swaps you never spend.",
          "Leaving attempts unspent when the window closes. An expired free swap is the most expensive swap in the game.",
          "Paying premium currency for attempt eleven-plus because the plan was sloppy with the first ten.",
        ],
      },
    ],
    takeaways: [
      "Ten free swaps per window — five weapons, five skills — over 14 days, with possible weekly counter resets.",
      "Order: main carry first, fix the skill spread second (40 on one beats 20 on two), second march last.",
      "Heroes promoted from SR to SSR are locked out of both sides of every exchange.",
      "No cooldown and no undo — instant swaps still deserve a written plan.",
      "Swaps past the free ten cost premium currency; there is never a good reason to reach for them.",
    ],
    faq: [
      {
        q: "How many free exchanges do I get in the Skill & Weapon Exchange?",
        a: "Five Signature Weapon exchanges and five Skill exchanges — ten free swaps total — inside a 14-day window, with attempt counters that may reset weekly. Check the event screen's timer for your exact resets.",
      },
      {
        q: "Can I swap between any heroes?",
        a: "Any standard SSR hero regardless of faction or class. The one hard exclusion is heroes promoted from SR to SSR, who cannot serve as either the source or the target of a swap.",
      },
      {
        q: "Is there a cooldown on exchanges?",
        a: "No — swaps resolve instantly with no cooldown. The constraint is the attempt count, not the speed, so take the time to plan each one.",
      },
      {
        q: "What happens after the ten free attempts?",
        a: "Further exchanges cost premium currency. The value is poor enough that the correct play is almost always to stop and wait for the next window.",
      },
      {
        q: "Which heroes should receive my signature weapons?",
        a: "The heroes your marches actually run — your core five first, then the second march's tank or support. Consult the tier list for the current order and the faction guide before finalizing.",
      },
    ],
    relatedTools: [
      { href: "/tier-list", label: "Hero Tier List", note: "Who deserves the weapons" },
      { href: "/guides/f2p-gem-flow", label: "F2P Gem Flow", note: "The premium currency you're not spending on swaps" },
      { href: "/guides/faction-matching-full-map", label: "Faction Matching", note: "Why the seat matters as much as the hero" },
    ],
  },

  /* ============================== G12 ============================== */
  "hero-talents-guide": {
    slug: "hero-talents-guide",
    seoTitle: "Tiles Survive Hero Talents Guide: Lv.4 Priorities",
    seoDescription:
      "Hero Talents at Lv.4 are a 25\u201335% multiplicative boost per hero. The core-five upgrade order, the cheapest material channels, and the windows that pay double.",
    intro: [
      "Hero Talents are the quiet endgame multiplier: a per-hero tree whose level-4 cap turned it from a nice-to-have into a 25\u201335% multiplicative combat boost per maxed hero. Across a five-hero march, that is the difference between trading blows and ending conversations.",
      "The system's only real trap is generosity. Talent materials are scarce, the climb from Lv.3 to Lv.4 runs two to three weeks per hero even for well-resourced accounts, and every point scattered across a bench hero is a point your core five never see. This guide is the focused path: who gets materials, in what order, from where, and when.",
    ],
    sections: [
      {
        id: "focus-rule",
        heading: "The focus rule: five heroes, no exceptions",
        paragraphs: [
          "The competitive core is the proven march — Rosie, Nikola and Tarzan holding the front with Tara and Layla behind them. Those five convert talent materials into combat power at a rate no secondary hero touches, and the gap is not close.",
          "So the rule is absolute: no non-core hero receives a single talent material until all five core heroes stand at Lv.4. Splitting investment across a wider roster feels productive and measures poorly — scattered accounts lose to concentrated ones in arena brackets and cross-server fights with depressing consistency, because the concentrated account brought five multipliers and the scattered one brought fractions.",
        ],
        callout: {
          kind: "meta",
          title: "Why focus beats spread",
          text: "Talent returns are multiplicative on each hero's total output. A 30% boost on a hero you field is worth more than three 10% boosts on heroes you don't — and the matchmaking reads aggregate power either way. Concentration wins the fight the scoreboard actually scores.",
        },
      },
      {
        id: "order",
        heading: "The upgrade order",
        paragraphs: [
          "Complete heroes, don't sample them: max one hero's tree to Lv.4 before touching the next. The order within the five:",
        ],
        table: {
          columns: ["Priority", "Hero", "Why here"],
          rows: [
            ["1", "Rosie", "The primary damage engine — talents amplify her AoE carry pattern and self-sustain, and she returns the most combat per material spent"],
            ["2", "Tara or Nikola", "Choose by your march's weakness: Tara's team defense if raids are bleeding you, Nikola's shield persistence if the front line folds"],
            ["3", "Layla", "Frontline sustain — her talents raise base HP and amplify group healing, which decides long attrition fights"],
            ["4", "Tarzan", "Backline punishment pays only after the damage and survival foundations exist; his talents finish the march, they don't carry it"],
          ],
        },
      },
      {
        id: "farming",
        heading: "Where the materials come from, ranked",
        paragraphs: [
          "Three channels supply talent materials, and they are not equal. Ranked by cost efficiency:",
        ],
        bullets: [
          "Event rankings — Turbo Turtle, Ghoulion Pursuit and Arcadian Conquest pay the biggest batches to top participants, and the only hidden cost is the discipline you already have. Consistent event participation is the cheapest talent income in the game.",
          "Daily alliance work — donations, boss rallies and group research generate a steady free stream. An inactive alliance quietly starves this channel; if yours is silent, that's a talent problem too.",
          "Event-window bundles — the only purchases worth considering, and only inside discounted event windows. Permanent store packs are consistently poor value for premium currency; skip them without ceremony.",
        ],
      },
      {
        id: "timing",
        heading: "Bank and burst — the same doctrine again",
        paragraphs: [
          "Talent materials follow the same law as gear scraps: spend them when the calendar pays twice. Event windows score your talent-node activations as event points, so a batch of activations that was always going to happen should happen inside a scoring window — upgrades plus milestone rewards from the same materials.",
          "Quiet weeks are for accumulation, and the discipline is identical to the Turbo Turtle loop: bank in the valleys, spend on the peaks, and never activate talent nodes on a random Tuesday when Wednesday's window would have paid for them.",
        ],
        callout: {
          kind: "tip",
          title: "This is the second time you've read this rule",
          text: "Gear materials double-dip through Turbo Turtle; talent materials double-dip through their scoring windows. The event calendar guide maps all of them — one doctrine, several currencies.",
        },
      },
      {
        id: "lv4-mechanics",
        heading: "What Lv.4 actually buys",
        bullets: [
          "Exclusive skill enhancements unlocked at Lv.4 — the source of the 25\u201335% average power uplift over Lv.3 builds.",
          "Two to three weeks of focused materials to take a single hero from Lv.3 to Lv.4, even for well-resourced competitive accounts.",
          "Two to three months to max all five core heroes — if resources stay concentrated. Any off-meta detour extends the clock directly.",
          "Talents and signature weapons multiply side by side rather than competing: finish the core weapons first, then farm talents on top of them.",
        ],
        callout: {
          kind: "warn",
          title: "The Lv.4 cap changed the meta, not the rule",
          text: "Before the cap raise, spreading talents was merely suboptimal. After it, a scattered account isn't just weaker — it's two to three weeks behind per hero on the strongest multiplier in the game. Focus was good advice; it is now the whole advice.",
        },
      },
      {
        id: "alliance",
        heading: "Run it alliance-wide",
        paragraphs: [
          "Talent focus is also an alliance policy. Officers who share this order — five core heroes, one at a time, banked between windows — raise the rally power of the entire roster, because mass PvP is a sum of concentrated cores. Alliances full of scattered builds lose to alliances of five-hero cores with the same total spend.",
          "Put the order in your war room, make it boring, and let every member copy it. Doctrine beats improvisation at every scale this game offers.",
        ],
      },
    ],
    takeaways: [
      "Lv.4 talents are a 25\u201335% multiplicative combat boost per hero — the biggest per-hero multiplier outside gear tiers.",
      "All materials to the core five — Rosie, Nikola, Tarzan, Tara, Layla — until every one stands at Lv.4.",
      "Order: Rosie, then Tara or Nikola by weakness, then Layla, then Tarzan. Complete heroes; don't sample them.",
      "Materials: event rankings first, alliance dailies second, event-window bundles only — never permanent packs.",
      "Activate inside scoring windows, bank between them — the same double-dip doctrine as every other currency.",
    ],
    faq: [
      {
        q: "What are Hero Talents in Tiles Survive?",
        a: "A late-game per-hero progression tree. Each talent level strengthens the hero's kit, and Lv.4 unlocks exclusive skill enhancements worth an average 25\u201335% power uplift over Lv.3 builds.",
      },
      {
        q: "Which heroes should get talent materials first?",
        a: "The core five — Rosie, Nikola, Tarzan, Tara and Layla — starting with Rosie. Hold all other investment until all five reach Lv.4; scattered materials measurably weaken your marches.",
      },
      {
        q: "How long does it take to max a hero's talents to Lv.4?",
        a: "Two to three weeks of focused materials per hero from Lv.3, and roughly two to three months for all five core heroes on a concentrated account.",
      },
      {
        q: "Do talents compete with signature weapons?",
        a: "No — they multiply alongside each other. Finish your core heroes' signature weapons first, then build talents on top; both scale the same marches.",
      },
      {
        q: "Where do I farm talent materials?",
        a: "High placements in Turbo Turtle, Ghoulion Pursuit and Arcadian Conquest pay the largest batches; daily alliance donations, boss rallies and group research provide the steady base. Only buy bundles inside discounted event windows.",
      },
    ],
    relatedTools: [
      { href: "/tier-list", label: "Hero Tier List", note: "The five heroes that earn your materials" },
      { href: "/guides/event-calendar-compounding", label: "Event Calendar Guide", note: "The windows that score activations" },
      { href: "/war-room", label: "Arcadian War Room", note: "Broadcast the upgrade order to your alliance" },
    ],
  },

  /* __APPEND_MORE_GUIDES__ */
};
