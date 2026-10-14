"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  HardDrive,
  ShieldCheck,
  RefreshCcw,
  ArrowUpRight
} from "lucide-react";
import { GAME_DATA_REGISTRY } from "@/lib/game-data";
import Hardware from "@/components/Hardware";
import Panel from "@/components/Panel";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

interface GamePlan {
  name?: string;
  link?: string;
  ram: string;
  cpu: string;
  ssd: string;
  price?: number;
}

const THEMES: Record<string, string> = {
  minecraft: "#00c950",
  "minecraft-bedrock": "#22c55e",
  pocketmine: "#34d399",
  rust: "#fb2c36",
  hytale: "#00a6f4",
  fivem: "#ff6900",
};

function formatPlanPrice(amount: number, currency: "INR" | "USD" | undefined) {
  if (currency === "INR") {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  }
  return `$${Number(amount).toFixed(2)}`;
}

function GamesPageContent() {
  const searchParams = useSearchParams();
  const gameIds = Object.keys(GAME_DATA_REGISTRY);
  const [selectedGame, setSelectedGame] = useState(gameIds[0] || "minecraft");
  const config = GAME_DATA_REGISTRY[selectedGame];
  const activeColor = THEMES[selectedGame] || "#8b5cf6";

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  useEffect(() => {
    const g = searchParams.get("game");
    if (g && GAME_DATA_REGISTRY[g]) {
      setSelectedGame(g);
    }
  }, [searchParams]);

  useEffect(() => {
    document.title = `LunarHost - Premium ${config?.name || capitalize(selectedGame)} Hosting`;
  }, [selectedGame, config]);

  return (
    <div className="min-h-screen bg-black text-[#e2e8f0] pb-20 transition-colors duration-700">
      <section className="relative min-h-[65vh] w-full flex flex-col items-center justify-center overflow-hidden pt-40 pb-24 px-4">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedGame}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              {config?.heroImage && (
                <Image
                  src={config.heroImage}
                  alt={selectedGame}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 10%' }}
                  priority
                />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-b from-black via-black/20 to-black z-10" />
        </div>
        <div className="relative z-20 text-center w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ color: activeColor, borderColor: `${activeColor}40`, backgroundColor: `${activeColor}10` }}
            className="text-xs md:text-sm font-bold px-4 py-1.5 rounded-full border-2 tracking-wide mb-1 inline-block"
          >
            Premium {config?.name || capitalize(selectedGame)} Hosting
          </motion.span>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold leading-none whitespace-nowrap"
          >
            <span style={{ color: activeColor }}>{config?.name || capitalize(selectedGame)}</span> Hosting
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 mt-2 text-sm md:text-lg max-w-2xl mx-auto"
          >
            {config?.description}
          </motion.p>
        </div>
      </section>

      <main className="max-w-360 mx-auto px-6 lg:px-10 space-y-16 -mt-10 relative z-30 mb-24">
        <section>
          <h3 className="text-xl font-bold text-gray-300 mb-4">1. Choose Your Game</h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
          >
            {gameIds.map(id => {
              const game = GAME_DATA_REGISTRY[id];
              return (
                <motion.button
                  variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                  key={id}
                  onClick={() => setSelectedGame(id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 border-2 rounded-2xl transition-all duration-300 text-left flex flex-col gap-2 ${
                    selectedGame === id ? 'bg-zinc-900/40' : 'border-zinc-800 opacity-90 grayscale hover:opacity-100'
                  }`}
                  style={{ borderColor: selectedGame === id ? activeColor : '' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                      {game?.image && (
                        <Image src={game.image} alt={game.name} width={40} height={40} className="object-contain" loading="eager" />
                      )}
                    </div>
                    <span className="font-bold text-lg tracking-tighter" style={{ color: selectedGame === id ? activeColor : '' }}>
                      {game?.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-medium line-clamp-2">{game?.description}</p>
                </motion.button>
              );
            })}
          </motion.div>
        </section>

        <section className="border-t-3 border-zinc-800 pt-12">
          <h3 className="text-xl font-bold text-gray-300 mb-6">2. Choose Your Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {config?.plans?.map((plan: GamePlan, i: number) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  key={`${selectedGame}-${i}`}
                  className="relative p-0.5 rounded-3xl overflow-hidden group"
                  style={{ background: `linear-gradient(to bottom right, #18181b, ${activeColor}40, #18181b)` }}
                >
                  <div className="relative bg-black h-full p-8 rounded-[23px] flex flex-col gap-6">
                    <div className="mb-2">
                      <h4 className="font-bold text-xl mb-1" style={{ color: activeColor }}>
                        {plan.name || config?.name}
                      </h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-extrabold text-white ">{plan.ram}</span>
                        <span className="text-zinc-500 font-bold text-sm">RAM</span>
                      </div>
                    </div>
                    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-5 space-y-4 grow">
                      <Stat icon={<HardDrive size={18} className="text-blue-400" />} label={`${plan.ssd} NVMe Storage`} />
                      <Stat icon={<Cpu size={18} className="text-cyan-400" />} label={`${plan.cpu} vCores`} />
                      <Stat icon={<RefreshCcw size={18} className="text-orange-400" />} label="Daily Backups" />
                      <Stat icon={<ShieldCheck size={18} className="text-emerald-400" />} label="DDoS Shield" />
                    </div>
                    <div className="flex flex-col gap-4 pt-6 border-t border-zinc-900 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-bold text-zinc-500 tracking-wider">Starting at</p>
                        <p className="text-2xl font-extrabold text-white">
                          {plan.price !== undefined ? formatPlanPrice(plan.price, config?.currency) : 'Contact Us'}
                          <span className="text-sm text-zinc-500 font-bold">/mo</span>
                        </p>
                      </div>
                      <motion.a
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={plan.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-zinc-700 bg-zinc-900/50 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:border-zinc-500"
                      >
                        Buy now
                        <ArrowUpRight className="h-4 w-4" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <div className="flex flex-col gap-24">
        <Hardware />
        <Panel />
        <Testimonials />
        <CTA />
      </div>
    </div>
  );
}

export default function GamesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-zinc-500 flex items-center justify-center text-sm">Loading…</div>}>
      <GamesPageContent />
    </Suspense>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0">{icon}</div>
      <span className="text-sm font-bold text-zinc-400 tracking-tight">{label}</span>
    </div>
  );
}