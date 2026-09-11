# ⬡ TitanTilesSurvive

**Command intelligence for Tiles Survive!** — a next-generation, tool-driven
companion web app for the FunPlus 4X survival strategy game. Not a blog: a
war-room console with 3D motion, fluid Framer Motion transitions, and a
modular architecture ready for real tooling.

> Fan-made project. Not affiliated with or endorsed by FunPlus.

---

## Stack

| Layer      | Tech                                                         |
| ---------- | ------------------------------------------------------------ |
| Framework  | **Next.js 15** (App Router, React 19, TypeScript)            |
| Styling    | **Tailwind CSS v4** (`@theme` design tokens in `globals.css`) |
| Animation  | **Framer Motion 12** — page transitions, scroll reveals, magnetic buttons, layout animations |
| 3D         | **Three.js + @react-three/fiber + drei** — isolated hero canvas |
| Deploy     | **Vercel** — zero config, static-first, edge-ready `next/og` social card |

## Routes

| Route              | Purpose                                                        |
| ------------------ | -------------------------------------------------------------- |
| `/`                | 3D hero → intel ticker → expanding feature grid → guides carousel → CTA |
| `/war-room`        | Arcadian War Room (module shell ready for tool logic)           |
| `/hero-meta-calc`  | Troop ratio optimizer / hero meta calculator                    |
| `/gear-reforge`    | Chief Gear reforge simulator                                    |
| `/tier-list`       | Community consensus hero meta board                             |
| `/guides`          | Filterable survival codex                                       |

## Architecture

```
app/                    # Routes (server components + per-route metadata)
  layout.tsx            # Fonts, SEO, header/footer, atmosphere
  template.tsx          # Framer Motion page transition
  opengraph-image.tsx   # Build-time OG social card (next/og)
components/
  layout/               # SiteHeader (sticky, pulse logo), Footer, Logo, Atmosphere
  sections/             # Page compositions (Hero, Ticker, FeatureGrid, Carousel, CTA)
  cards/                # FeatureCard (expand-on-hover logic)
  guides/               # GuideCard (shared by carousel + explorer)
  pages/                # Route-level client shells (ModuleBoot, TierBoard, GuidesExplorer)
  motion/               # Reveal — generic whileInView wrapper
  three/                # ISOLATED 3D: LazyHeroCanvas (dynamic, idle-mounted) → HeroCanvas → scene parts
  ui/                   # Pure UI primitives: TitanButton, SectionHeader, StatCounter, icons
lib/
  animations/variants.ts  # THE motion language: shared variants, easings, springs
  utils/cn.ts
data/                   # All copy/data — swap for API later without touching UI
```

### Performance contract

- **The 3D canvas never blocks the main thread.** `components/three/LazyHeroCanvas.tsx`
  code-splits three.js behind `next/dynamic({ ssr: false })` and defers mounting
  until browser idle time. A CSS-only fallback stage paints instantly (and serves
  permanently for `prefers-reduced-motion` users).
- The tile terrain renders as **instanced meshes** (2 draw calls for 100+ tiles);
  embers are a single `Points` buffer; DPR is clamped; pointer parallax uses a
  window-level listener so the canvas stays `pointer-events: none`.
- Fonts self-host via `next/font`; guide art is pure CSS gradients (zero image payload);
  the OG card is generated at build time by Vercel.

### Motion language

Every animation flows through `lib/animations/variants.ts`:
`fadeUp`, `fadeIn`, `scaleIn`, `lineReveal` (masked hero lines),
`staggerContainer`, `menuItem`, `pulseRing`, plus `EASE_OUT_EXPO`,
`springSoft` and `springSnappy` transitions. Reuse them — don't inline magic numbers.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (what Vercel runs)
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. **Vercel → Add New Project → Import** the repo.
3. Framework preset auto-detects **Next.js**. No env vars, no custom config needed.
4. Deploy. Every push to the branch gets a preview deployment.

## Adding a real tool

1. Create the interactive logic in `components/tools/<tool>/` (client).
2. Keep pure UI in `components/ui/`, data in `data/`.
3. Replace the `ModuleBoot` shell in the tool's `app/<route>/page.tsx` with your tool component.
