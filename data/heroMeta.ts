/* ------------------------------------------------------------------ */
/*  The Definitive Tiles Survive Hero Tier List — data layer           */
/*  Community deep-dive verdicts, season current meta.                 */
/* ------------------------------------------------------------------ */

export type TierKey = "S" | "A" | "B" | "C" | "D";
export type Rarity = "SSR" | "SR" | "SR/R" | "R";
export type HeroClass = "Guard" | "Gunner" | "Marksman";
export type HeroFaction = "Stalwart" | "Rover" | "Aeronaut" | "Mariner";

export interface Hero {
  id: string;
  name: string;
  tier: TierKey;
  rarity: Rarity;
  faction: HeroFaction;
  heroClass: HeroClass;
  /** class note when a hero flexes two classes */
  classNote?: string;
  role: string;
  tag?: string;
  verdict: string;
  detail: string;
  score: number; // meta score 0–100
  portrait?: string;
  accent: string;
  /** economy/passive value note (why to still level a combat-bad hero) */
  economy?: string;
}

export const TIER_META: Record<
  TierKey,
  {
    label: string;
    blurb: string;
    plate: string; // badge gradient classes
    text: string;
    ring: string; // section accent
    icon: string;
  }
> = {
  S: {
    label: "The Core Meta",
    blurb:
      "These heroes define the endgame. If you pull them, drop everything and invest all your resources into them.",
    plate: "border-ink bg-gradient-to-b from-gold to-flame text-ink",
    text: "text-ember-deep",
    ring: "#f6c445",
    icon: "👑",
  },
  A: {
    label: "Strategic Powerhouses",
    blurb:
      "Incredibly strong — the perfect puzzle pieces to complete S-Tier cores.",
    plate: "border-ink bg-gradient-to-b from-flame to-ember text-white",
    text: "text-ember-deep",
    ring: "#f07d2e",
    icon: "⚡",
  },
  B: {
    label: "Mid-Game Fillers",
    blurb:
      "Perfectly usable early, but they get benched in endgame PvP as scaling falls off. Several are worth leveling for base economy passives.",
    plate: "border-ink bg-gradient-to-b from-white to-paper text-ink",
    text: "text-ink-soft",
    ring: "#3d9bd1",
    icon: "🧰",
  },
  C: {
    label: "Benchwarmers",
    blurb:
      "Do not waste combat fragments here — the numbers don't justify the cost.",
    plate: "border-ink/30 bg-paper text-ink-soft",
    text: "text-ink-faint",
    ring: "#a39585",
    icon: "🪑",
  },
  D: {
    label: "Do Not Invest",
    blurb:
      "Rarity ≠ quality. These either lack raw stats or their utility never pays back the investment.",
    plate: "border-ink/30 bg-berry/15 text-berry",
    text: "text-berry",
    ring: "#ed5ca8",
    icon: "🚫",
  },
};

export const HEROES: Hero[] = [
  /* ------------------------------ S ------------------------------ */
  {
    id: "rosie",
    name: "Rosie",
    tier: "S",
    rarity: "SSR",
    faction: "Stalwart",
    heroClass: "Guard",
    role: "AoE Carry",
    tag: "#1 Priority in the game",
    verdict: "The undisputed highest single-hero priority in the game.",
    detail:
      "Rosie is an AoE carry who heals herself based on her damage output. In messy, drawn-out fights she consistently ends up as the last hero standing — out-healing chip damage while wiping the enemy team.",
    score: 98,
    portrait: "/heroes/rosie.webp",
    accent: "#6fae3e",
  },
  {
    id: "layla",
    name: "Layla",
    tier: "S",
    rarity: "SSR",
    faction: "Rover",
    heroClass: "Gunner",
    role: "Sustain Engine",
    tag: "Premium healer",
    verdict: "The ultimate sustain engine.",
    detail:
      "Layla (sometimes 'Leila' by region) is the premium healer of Tiles Survive. Her raw healing throughput keeps the entire frontline alive through massive burst. A team without Layla simply cannot compete in long battles against a team that has her.",
    score: 97,
    portrait: "/heroes/layla.webp",
    accent: "#2fa39b",
  },
  {
    id: "nikola",
    name: "Nikola",
    tier: "S",
    rarity: "SSR",
    faction: "Stalwart",
    heroClass: "Guard",
    role: "Frontline Fortress",
    tag: "Pairs with Layla",
    verdict: "The unbreakable frontline fortress.",
    detail:
      "Nikola's kit revolves around survivability: near-death electric barriers that save him from fatal blows and continuously reapplied self-shields. Paired with Layla, he creates an almost impenetrable wall for your backline.",
    score: 95,
    portrait: "/heroes/nikola.webp",
    accent: "#3d9bd1",
  },
  {
    id: "tarzan",
    name: "Tarzan",
    tier: "S",
    rarity: "SSR",
    faction: "Stalwart",
    heroClass: "Guard",
    role: "Backline Punisher",
    verdict: "The backline punisher.",
    detail:
      "Where Rosie offers sustained AoE, Tarzan is a pure aggressive bruiser: burst damage that specifically targets squishy enemy supports, and counterattack mechanics that heavily punish focus-fire attempts on him.",
    score: 93,
    portrait: "/heroes/tarzan.webp",
    accent: "#f07d2e",
  },

  /* ------------------------------ A ------------------------------ */
  {
    id: "tara",
    name: "Tara",
    tier: "A",
    rarity: "SSR",
    faction: "Stalwart",
    heroClass: "Gunner",
    role: "Keystone Support",
    tag: "The Keystone",
    verdict: "The most important A-tier hero in the game.",
    detail:
      "Moderate personal damage, but Tara applies a massive global DEF buff to the team and shields allies. She is the keystone that makes the '4 Guards + 1 Gunner' meta composition work.",
    score: 89,
    portrait: "/heroes/tara.webp",
    accent: "#f6c445",
  },
  {
    id: "becca",
    name: "Becca",
    tier: "A",
    rarity: "SSR",
    faction: "Rover",
    heroClass: "Marksman",
    role: "Apex Burst Sniper",
    verdict: "Unmatched execution power against aligned targets.",
    detail:
      "Becca fires in a straight line, shredding enemy defense as the shot passes through — apex burst sniper value whenever enemies line up.",
    score: 87,
    portrait: "/heroes/becca.webp",
    accent: "#ed5ca8",
  },
  {
    id: "kiki",
    name: "Kiki",
    tier: "A",
    rarity: "SSR",
    faction: "Aeronaut",
    heroClass: "Marksman",
    role: "Piercing Wave-Clear",
    verdict: "Shreds tightly packed waves — if she survives the wind-up.",
    detail:
      "Kiki's piercing laser attacks delete packed waves, and her massive charge-up burst hits like a truck. She needs heavy frontline protection (hello Nikola) to survive her own wind-up phase.",
    score: 85,
    portrait: "/heroes/kiki.webp",
    accent: "#3d9bd1",
  },
  {
    id: "jacob",
    name: "Jacob",
    tier: "A",
    rarity: "SSR",
    faction: "Rover",
    heroClass: "Guard",
    role: "Frontline Disruptor",
    verdict: "Groups enemies perfectly for Rosie to feast on.",
    detail:
      "An explosive frontline disruptor: Jacob drops a bomb doll that taunts nearby enemies, pulling divers off your backline and clustering them perfectly for Rosie's AoE.",
    score: 83,
    portrait: "/heroes/jacob.webp",
    accent: "#6fae3e",
  },
  {
    id: "tony",
    name: "Tony",
    tier: "A",
    rarity: "SSR",
    faction: "Aeronaut",
    heroClass: "Guard",
    role: "Combo Enabler",
    verdict: "Chain-delete waves by timing Pulse Marks with active skills.",
    detail:
      "Tony's 'Pulse Mark' massively increases the damage enemies take from your team's next active skill — enabling chain-deletions of enemy waves when timed correctly.",
    score: 82,
    portrait: "/heroes/tony.webp",
    accent: "#3d9bd1",
  },
  {
    id: "freja",
    name: "Freja",
    tier: "A",
    rarity: "SR",
    faction: "Stalwart",
    heroClass: "Guard",
    classNote: "Guard / Gunner",
    role: "Best-in-Class SR",
    tag: "Best SR in the game",
    verdict: "Punches way above her rarity class.",
    detail:
      "Double strikes and shielded AoE slashes make Freja (also spelled Freya) the best SR in the game — the first substitute if you're missing an S-Tier frontline hero.",
    score: 80,
    portrait: "/heroes/freja.webp",
    accent: "#f6c445",
  },

  /* ------------------------------ B ------------------------------ */
  {
    id: "maddie",
    name: "Maddie",
    tier: "B",
    rarity: "SSR",
    faction: "Aeronaut",
    heroClass: "Marksman",
    role: "Hybrid DPS / Healer",
    verdict: "Great early slot flexibility; healing falls off late.",
    detail:
      "Maddie's hybrid DPS/healing carries the early game, but her healing numbers eventually fall too far behind dedicated supports like Layla.",
    score: 68,
    portrait: "/heroes/maddie.webp",
    accent: "#ed5ca8",
  },
  {
    id: "travis",
    name: "Travis",
    tier: "B",
    rarity: "SR",
    faction: "Rover",
    heroClass: "Gunner",
    role: "Sniper / Economy",
    tag: "Smelter passive",
    verdict: "Level him for base tech, not for the battlefield.",
    detail:
      "A solid sniper for early PvE bosses — but his real value is the passive economy boost to your base's smelter output. Worth leveling purely for base-tech progression.",
    score: 62,
    accent: "#f07d2e",
    economy: "Smelter output boost — keep him leveling at base.",
  },
  {
    id: "eva",
    name: "Eva",
    tier: "B",
    rarity: "SR",
    faction: "Rover",
    heroClass: "Gunner",
    classNote: "Gunner / Guard",
    role: "Growth / Gathering",
    verdict: "No late-game combat utility — an excellent gatherer.",
    detail:
      "Middle-of-the-road consistent DPS with nothing unique for late PvP, but Eva is an excellent gathering-focused growth hero for world-map resource farming.",
    score: 60,
    accent: "#6fae3e",
    economy: "Gathering monster — run her on world-map farms.",
  },
  {
    id: "chef",
    name: "Chef",
    tier: "B",
    rarity: "SR",
    faction: "Stalwart",
    heroClass: "Guard",
    role: "Early Tank",
    verdict: "Decent self-healing tank… until PvP melts him instantly.",
    detail:
      "A decent early tank with self-healing, but Chef gets melted instantly in high-level PvP. Bench him when real fights start.",
    score: 58,
    accent: "#f07d2e",
  },

  /* ------------------------------ C ------------------------------ */
  {
    id: "ray",
    name: "Ray",
    tier: "C",
    rarity: "SSR",
    faction: "Stalwart",
    heroClass: "Marksman",
    role: "Fragile AoE",
    tag: "SSR trap",
    verdict: "An SSR worth skipping — he dies before he impacts the fight.",
    detail:
      "Despite being SSR, Ray is incredibly fragile. His AoE wave clear is genuinely good, but without near-perfect protection he's dead before long fights get decided.",
    score: 42,
    portrait: "/heroes/ray.webp",
    accent: "#a39585",
  },
  {
    id: "sarge",
    name: "Sarge",
    tier: "C",
    rarity: "SR",
    faction: "Aeronaut",
    heroClass: "Marksman",
    role: "Starter Hero",
    verdict: "Feels great on day one. Outclassed by week two.",
    detail:
      "Your starter hero. Sarge's rapid-fire AoE feels great early, but his scaling is terrible — the boot camp ends quickly.",
    score: 38,
    portrait: "/heroes/sarge.webp",
    accent: "#3d9bd1",
  },

  /* ------------------------------ D ------------------------------ */
  {
    id: "lucky",
    name: "Lucky",
    tier: "D",
    rarity: "SR/R",
    faction: "Aeronaut",
    heroClass: "Marksman",
    role: "Utility / Economy",
    verdict: "Never in a serious combat march — level her passively.",
    detail:
      "A pure utility/economy pick: Lucky is worth leveling passively for stamina efficiency during PvE hunting, but keep her far away from combat rosters.",
    score: 25,
    portrait: "/heroes/lucky.webp",
    accent: "#a39585",
    economy: "Stamina efficiency for PvE hunting — passive levels only.",
  },
  {
    id: "ghost",
    name: "Ghost",
    tier: "D",
    rarity: "R",
    faction: "Rover",
    heroClass: "Marksman",
    role: "Budget CC",
    verdict: "Budget placeholder. R stats can't survive the endgame.",
    detail:
      "Minor crowd control on a rare (R) stat block — fine for the tutorial week, then respectfully retire him to the garrison.",
    score: 15,
    portrait: "/heroes/ghost.webp",
    accent: "#a39585",
  },
  {
    id: "rusty",
    name: "Rusty",
    tier: "D",
    rarity: "R",
    faction: "Stalwart",
    heroClass: "Guard",
    role: "Budget Shield",
    verdict: "Budget placeholder. R stats can't survive the endgame.",
    detail:
      "Minor shielding on a rare (R) stat block — same story as Ghost: nostalgia only.",
    score: 15,
    portrait: "/heroes/rusty.webp",
    accent: "#a39585",
  },
];

export const heroById = (id: string) => HEROES.find((h) => h.id === id);

export const TIER_ORDER: TierKey[] = ["S", "A", "B", "C", "D"];

/* ------------------------------------------------------------------ */
/*  Synergy Tracker — documented hero pair interactions                */
/*  Numbers are community-tested effective-value estimates.            */
/* ------------------------------------------------------------------ */

export interface SynergyPair {
  a: string;
  b: string;
  title: string;
  effect: string;
  math: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export const SYNERGY_PAIRS: SynergyPair[] = [
  {
    a: "nikola",
    b: "tara",
    title: "Unbreakable Dome",
    effect:
      "Tara's global DEF buff compounds Nikola's self-shields — his electric barriers soak far more before breaking.",
    math: "≈ +35% effective HP on the wall",
    rating: 5,
  },
  {
    a: "tara",
    b: "rosie",
    title: "Immortal Whirlwind",
    effect:
      "Team-wide DEF + shields stretch the fight long enough for Rosie's damage-based healing to permanently out-scale chip damage.",
    math: "≈ +30% effective sustain loop",
    rating: 5,
  },
  {
    a: "jacob",
    b: "rosie",
    title: "AoE Soup",
    effect:
      "Jacob's taunt bomb groups divers into a clump and Rosie's AoE turns that clump into a health refill.",
    math: "≈ +40% clear speed on grouped waves",
    rating: 5,
  },
  {
    a: "tony",
    b: "becca",
    title: "Line Deletion",
    effect:
      "Pulse Mark amplifies whatever skill lands next — Becca's rail line through 3+ marked targets deletes an entire lane.",
    math: "≈ +45% burst on marked targets",
    rating: 5,
  },
  {
    a: "nikola",
    b: "layla",
    title: "Wall of Life",
    effect:
      "Layla's raw healing throughput stacks on top of Nikola's barriers — the classic 'impenetrable wall' core.",
    math: "≈ +40% effective tank HP",
    rating: 5,
  },
  {
    a: "kiki",
    b: "nikola",
    title: "Protected Prism",
    effect:
      "Nikola's barriers and taunt-sponge coverage buy Kiki's slow charge-up the window it needs to fire.",
    math: "≈ +2 safe charge cycles per fight",
    rating: 4,
  },
  {
    a: "tony",
    b: "kiki",
    title: "Marked Detonation",
    effect:
      "Pulse Mark detonating with Kiki's charged laser turns her wave-clear into a lane-eraser.",
    math: "≈ +35% wave-clear damage",
    rating: 4,
  },
  {
    a: "layla",
    b: "rosie",
    title: "Sustain Loop",
    effect:
      "External healing + lifesteal stack multiplicatively — Rosie stops being killable in sustained fights.",
    math: "≈ +25% effective healing received",
    rating: 4,
  },
  {
    a: "freja",
    b: "nikola",
    title: "Budget Bastion",
    effect:
      "The best SR substitute slots in beside Nikola to mirror the double-frontline meta wall on a budget.",
    math: "≈ 80% of an SSR frontline duo",
    rating: 3,
  },
  {
    a: "tarzan",
    b: "tara",
    title: "Punisher's Amnesty",
    effect:
      "Tara's DEF cover lets Tarzan dive backlines without being melted by return focus-fire.",
    math: "≈ +30% dive survival",
    rating: 3,
  },
  {
    a: "travis",
    b: "eva",
    title: "Home Front",
    effect:
      "Not a combat pair — the classic economy duo for smelter output and world-map gathering runs.",
    math: "Base-tech progression, zero fragments wasted",
    rating: 3,
  },
];

export function findSynergy(a: string, b: string): SynergyPair | null {
  return (
    SYNERGY_PAIRS.find(
      (p) => (p.a === a && p.b === b) || (p.a === b && p.b === a)
    ) ?? null
  );
}
