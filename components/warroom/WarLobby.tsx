"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { warIdentity } from "@/lib/warroom/client";
import { normalizeCode } from "@/lib/warroom/types";
import TitanButton from "@/components/ui/TitanButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { CrosshairIcon, SwordsIcon, UsersIcon, ZapIcon } from "@/components/ui/icons";
import { popIn, staggerContainer, viewportOnce } from "@/lib/animations/variants";
import Reveal from "@/components/motion/Reveal";

/* ------------------------------------------------------------------ */
/*  WarLobby — Phase 1: the viral loop. Deploy a room → get a shareable */
/*  link → members self-register with zero accounts.                   */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    icon: <SwordsIcon className="size-7" />,
    title: "1 · Deploy",
    text: "Leader names the alliance and gets a private War Room link — no setup, no spreadsheet.",
  },
  {
    icon: <UsersIcon className="size-7" />,
    title: "2 · Share",
    text: "Drop the link in Discord. Members report in with username, power and best troop — zero accounts.",
  },
  {
    icon: <ZapIcon className="size-7" />,
    title: "3 · Command",
    text: "Drag squads onto the tactical map, flip tower control, broadcast commands, go live with synced timers.",
  },
];

export default function WarLobby() {
  const router = useRouter();
  const [allianceName, setAllianceName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deploy = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = allianceName.trim();
    if (!name || creating) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/war", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allianceName: name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Deployment failed.");
      warIdentity.setLeaderToken(data.code, data.leaderToken);
      router.push(`/war/${data.code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deployment failed.");
      setCreating(false);
    }
  };

  const join = (e: React.FormEvent) => {
    e.preventDefault();
    const code = normalizeCode(joinCode);
    if (code) router.push(`/war/${encodeURIComponent(code)}`);
  };

  return (
    <div className="relative overflow-hidden pb-32 pt-32 md:pt-40">
      {/* Backdrop */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fde7c8] via-cream to-cream" />
        <div className="bg-tilegrid absolute inset-0 opacity-60 [mask-image:radial-gradient(75%_60%_at_50%_20%,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="The command center"
          title="Arcadian"
          accent="War Room."
          align="center"
          description="Stop coordinating 100 players through chat scrollback and dead spreadsheets. Deploy a room, share one link, and run the conquest like a general."
        />

        {/* Deploy + Join */}
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-[1.25fr_1fr]">
          {/* Deploy */}
          <motion.form
            onSubmit={deploy}
            variants={popIn}
            initial="hidden"
            animate="show"
            className="relative overflow-hidden rounded-3xl border-[3px] border-ink bg-white p-6 shadow-[0_6px_0_0_#2d2a26,0_30px_50px_-20px_rgba(45,42,38,0.4)] sm:p-8"
          >
            <div aria-hidden className="bg-tilegrid absolute inset-0 opacity-40" />
            <div className="relative">
              <p className="inline-block rounded-full border-[3px] border-ink bg-leaf px-3 py-0.5 font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_2px_0_0_#2d2a26]">
                Alliance leaders
              </p>
              <h3 className="mt-3 font-display text-3xl font-extrabold text-ink">
                Deploy a War Room
              </h3>
              <p className="mt-1 text-sm font-bold text-ink-soft">
                Instant setup. Your room auto-expires after 24 hours of peace.
              </p>

              <label className="mt-5 block">
                <span className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ink-soft">
                  Alliance name
                </span>
                <input
                  value={allianceName}
                  onChange={(e) => setAllianceName(e.target.value)}
                  maxLength={40}
                  placeholder="e.g. Arcadia Alpha"
                  className="mt-1.5 w-full rounded-2xl border-[3px] border-ink bg-paper/60 px-4 py-3.5 font-display text-lg font-bold text-ink placeholder:font-semibold placeholder:text-ink-faint focus:border-ember focus:outline-none"
                />
              </label>

              {error && (
                <p
                  role="alert"
                  className="mt-3 rounded-xl border-[3px] border-ink bg-berry/15 px-3 py-2 text-center font-display text-sm font-bold text-berry"
                >
                  {error}
                </p>
              )}

              <div className="mt-5">
                <TitanButton
                  type="submit"
                  size="lg"
                  className="w-full"
                  icon={<SwordsIcon className="size-5" />}
                >
                  {creating ? "Deploying…" : "Deploy War Room →"}
                </TitanButton>
              </div>
              <p className="mt-3 text-center font-mono text-[10px] font-bold tracking-[0.14em] text-ink-faint">
                You&apos;ll get a link like /war/Arcadia-Alpha-77
              </p>
            </div>
          </motion.form>

          {/* Join */}
          <motion.form
            onSubmit={join}
            variants={popIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border-[3px] border-ink bg-pine p-6 text-cream shadow-[0_6px_0_0_#2d2a26,0_30px_50px_-20px_rgba(20,53,43,0.6)] sm:p-8"
          >
            <div aria-hidden className="bg-tilegrid absolute inset-0 opacity-10" />
            <div className="relative">
              <p className="inline-block rounded-full border-[3px] border-cream/40 bg-cream/10 px-3 py-0.5 font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold">
                Alliance members
              </p>
              <h3 className="mt-3 font-display text-3xl font-extrabold">
                Join a War Room
              </h3>
              <p className="mt-1 text-sm font-bold text-cream/70">
                Got a link? Just open it. Got a code? Type it below.
              </p>

              <label className="mt-5 block">
                <span className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-cream/60">
                  War code
                </span>
                <input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="Arcadia-Alpha-77"
                  className="mt-1.5 w-full rounded-2xl border-[3px] border-cream/40 bg-pine-deep/60 px-4 py-3.5 font-mono text-lg font-bold text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
                />
              </label>

              <div className="mt-5">
                <TitanButton
                  type="submit"
                  variant="sun"
                  size="lg"
                  className="w-full"
                  icon={<CrosshairIcon className="size-5" />}
                >
                  Enter War Room
                </TitanButton>
              </div>
            </div>
          </motion.form>
        </div>

        {/* How it works */}
        <div className="mt-16">
          <Reveal>
            <p className="text-center font-display text-sm font-extrabold uppercase tracking-[0.3em] text-ink-faint">
              How the campaign runs
            </p>
          </Reveal>
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-6 grid gap-5 md:grid-cols-3"
          >
            {STEPS.map((step) => (
              <motion.div
                key={step.title}
                variants={popIn}
                className="rounded-3xl border-[3px] border-ink bg-white p-6 shadow-[0_4px_0_0_#2d2a26]"
              >
                <span className="grid size-14 place-items-center rounded-2xl border-[3px] border-ink bg-gradient-to-b from-gold to-flame text-ink shadow-[0_3px_0_0_#2d2a26]">
                  {step.icon}
                </span>
                <h4 className="mt-4 font-display text-xl font-extrabold text-ink">
                  {step.title}
                </h4>
                <p className="mt-1.5 text-sm font-semibold leading-relaxed text-ink-soft">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
