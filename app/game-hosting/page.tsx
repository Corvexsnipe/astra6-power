"use client";

import React from "react";
import AppImage from "@/components/AppImage";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Cpu,
  Gamepad2,
  Globe2,
  HardDrive,
  Headphones,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GAME_DATA_REGISTRY } from "@/lib/game-data";

type GameCard = {
  name: string;
  status: "popular" | "new" | "coming-soon" | "available";
  price: string;
  shortType: string;
  image: string;
  bullets: string[];
  href?: string;
  /** When set with `href`, Buy now links to `/game-servers?game=…` */
  gameQuery?: string;
  comingSoon?: boolean;
};

const games: GameCard[] = [
  {
    name: "Minecraft Java",
    status: "popular",
    price: "Starting from ₹25/GB",
    shortType: "Survival",
    image: "/images/minecraft-bg.webp",
    bullets: ["Instant setup", "Optimized performance", "DDoS protected"],
    href: "/game-hosting/minecraft-java",
  },
  {
    name: "Minecraft Bedrock",
    status: "popular",
    price: "Starting from ₹25/GB",
    shortType: "Crossplay",
    image: "https://i.postimg.cc/Y0N5V6Vf/bedrockimage.avif",
    bullets: ["Easy setup", "Low latency", "Managed security"],
    href: "/game-hosting/minecraft-bedrock",
  },
  {
    name: "Hytale",
    status: "new",
    price: "Starting from ₹25/GB",
    shortType: "Fantasy",
    image: "/images/hytale-bg.webp",
    bullets: ["High performance", "Low latency", "24/7 support"],
    href: "/game-hosting/hytale",
  },
  {
    name: "Rust",
    status: "new",
    price: "Starting from ₹400/month",
    shortType: "Survival",
    image: "/images/rust-bg.webp",
    bullets: ["Mod support", "Ultra-fast nodes", "Automatic backups"],
    href: "/game-hosting/rust",
  },
  {
    name: "Palworld",
    status: "new",
    price: "Starting from ₹400/month",
    shortType: "Adventure",
    image: "/images/palworldd.png",
    bullets: ["High performance", "Mod support", "Auto backups"],
    href: "/game-hosting/palworld",
  },
  {
    name: "Ark of Survival",
    status: "new",
    price: "Starting from ₹400/month",
    shortType: "Adventure",
    image: "/images/arkofsurvival.jpg",
    bullets: ["High performance", "Mod support", "Auto backups"],
    href: "/game-hosting/ark",
  },
  {
    name: "PocketMine",
    status: "coming-soon",
    price: "Coming Soon",
    shortType: "Lightweight",
    image: "/images/pocketmineee.png",
    bullets: ["Optimized stack", "Fast restarts", "Plugin friendly"],
    comingSoon: true,
  },
  {
    name: "Euro Truck Simulator 2",
    status: "coming-soon",
    price: "Coming Soon",
    shortType: "Simulation",
    image: "/images/eu2simu.jpg",
    bullets: ["Optimized servers", "Low ping", "DDoS protection"],
    comingSoon: true,
  },
];

export default function GameHostingPage() {
  const availableGames = Object.values(GAME_DATA_REGISTRY).length;

  return (
    <div className="min-h-screen bg-black text-zinc-100 pb-20">
      <div className="relative overflow-hidden border-b border-white/10 bg-[#05070d]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{ backgroundImage: "url('https://i.postimg.cc/B6ffQ6FQ/1cff7a42-77d2-4d36-be79-6c83ee87a3a9.png')" }}
        />
        {/* Light tint so text stays readable without hiding the photo */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_30%_0%,rgba(39,16,79,0.22)_0%,rgba(11,15,26,0.38)_50%,rgba(5,7,13,0.55)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px] opacity-10" />
        <section className="relative max-w-360 mx-auto px-6 lg:px-10 pt-24 pb-8 md:pt-28 md:pb-10 lg:pt-28">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-start lg:gap-6">
            <div className="relative z-10 space-y-4 drop-shadow-[0_2px_20px_rgba(0,0,0,0.85)] lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-200 md:text-xs">
                <BadgeCheck className="h-3.5 w-3.5 md:h-4 md:w-4" />
                Premium Game Hosting
              </span>
              <h1 className="text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl">
                Built Different.
                <br />
                <span className="text-violet-400">Game Better.</span>
              </h1>
              <p className="max-w-xl text-sm text-zinc-300/90 md:text-base">
                Deploy any game in seconds with high clock-speed CPUs, premium
                networking, and enterprise-level DDoS protection for smooth gameplay.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:max-w-lg">
                <InfoPill icon={<Zap className="h-3.5 w-3.5" />} text="Instant Setup" compact />
                <InfoPill icon={<ShieldCheck className="h-3.5 w-3.5" />} text="DDoS Protection" compact />
                <InfoPill icon={<Cpu className="h-3.5 w-3.5" />} text="Premium Network" compact />
                <InfoPill icon={<Headphones className="h-3.5 w-3.5" />} text="24/7 Expert Support" compact />
              </div>
              <Link
                href="#all-games"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 underline-offset-4 hover:text-violet-200 hover:underline md:text-sm"
              >
                View all games
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="relative z-10 flex flex-col gap-2 lg:col-span-5">
              <HardwareChip
                brand="ryzen"
                symbol="Ryzen"
                title="AMD Ryzen"
                subtitle="High Performance Gaming"
                details="Up to 5.7 GHz boost"
              />
              <HardwareChip
                brand="epyc"
                symbol="EPYC"
                title="AMD EPYC"
                subtitle="Maximum Core Density"
                details="Up to 96 cores / 192 threads"
              />
              <HardwareChip
                brand="intel"
                symbol="Core"
                title="Intel Core"
                subtitle="Balanced Speed & Efficiency"
                details="Latest-gen CPUs"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Cloudflare Magic Transit Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F48120] via-[#FA6400] to-[#F48120] py-4 md:py-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMDQwIDAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
                <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-white leading-tight">
                  Protected by Cloudflare Magic Transit
                </h3>
                <p className="text-white/90 text-xs md:text-sm font-semibold mt-0.5">
                  Enterprise-grade DDoS protection with 500 Tbps network capacity
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 border border-white/25">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-black text-white leading-none">500</p>
                <p className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-wider mt-0.5">Tbps</p>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <p className="text-sm md:text-base font-bold text-white">DDoS</p>
                <p className="text-white/90 text-[10px] md:text-xs font-semibold">Protection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-360 mx-auto px-6 lg:px-10 mt-4 space-y-6 md:mt-6 md:space-y-8">
        <section id="all-games" className="scroll-mt-24 rounded-3xl border border-white/10 bg-zinc-950/55 p-5 md:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-white md:text-2xl">
                <Gamepad2 className="h-5 w-5 text-violet-400" />
                All Game Hosting Plans
              </h2>
              <p className="text-sm text-zinc-400">
                Browse every game currently available and what is coming next.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200">
              {availableGames} live games
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {games.map((game, index) => (
            <motion.article
              key={game.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-slate-900/95 to-slate-950/95 shadow-lg backdrop-blur-md transition-all duration-300 border-slate-700/50 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:border-violet-400/60 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]"
            >
              <div className="relative mb-4 h-48 overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                <AppImage
                  src={game.image}
                  alt={game.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
                <div className="absolute inset-x-3 bottom-3">
                  <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-200">
                    {game.shortType}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 px-1">
                <h3 className="text-xl font-black tracking-tight text-white">{game.name}</h3>
                <StatusBadge status={game.status} />
              </div>

              <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-white px-1">
                {game.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-4 px-1">
                <p className={`text-lg font-black leading-snug ${game.comingSoon ? "text-zinc-400" : "text-violet-300"}`}>
                  {game.price}
                </p>
                {game.href && !game.comingSoon ? (
                  <Link
                    href={
                      game.gameQuery
                        ? `${game.href}?game=${encodeURIComponent(game.gameQuery)}`
                        : game.href
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 py-3 text-sm font-bold text-white shadow-[0_6px_20px_rgba(139,92,246,0.4)] transition-all duration-300 hover:from-violet-400 hover:to-violet-500 hover:shadow-[0_8px_25px_rgba(139,92,246,0.5)] hover:-translate-y-0.5"
                  >
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 py-3 text-sm font-semibold text-zinc-500">
                    <Clock3 className="h-4 w-4" />
                    Coming soon
                  </span>
                )}
              </div>
              </motion.article>
          ))}
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-white/10 bg-zinc-950/70 p-5 text-sm md:grid-cols-5">
          <BottomStat icon={<Globe2 className="h-5 w-5 text-violet-300" />} title="Global Locations" value="15 server regions" />
          <BottomStat icon={<ShieldCheck className="h-5 w-5 text-violet-300" />} title="DDoS Protection" value="500 Tbps Cloudflare Magic Transit" />
          <BottomStat icon={<HardDrive className="h-5 w-5 text-violet-300" />} title="NVMe Storage" value="Ultra-fast SSD nodes" />
          <BottomStat icon={<Clock3 className="h-5 w-5 text-violet-300" />} title="99.9% Uptime" value="Reliable network performance" />
          <BottomStat icon={<Headphones className="h-5 w-5 text-violet-300" />} title="24/7 Support" value="Expert help any time" />
        </section>
      </main>
    </div>
  );
}

type CpuBrand = "ryzen" | "epyc" | "intel";

function HardwareChip({
  brand,
  symbol,
  title,
  subtitle,
  details,
}: {
  brand: CpuBrand;
  symbol: string;
  title: string;
  subtitle: string;
  details: string;
}) {
  return (
    <article className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-zinc-950/85 px-2.5 py-2 backdrop-blur-md md:gap-3 md:px-3 md:py-2.5">
      <CpuBrandIcon variant={brand} label={symbol} />
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold leading-tight text-white md:text-base">{title}</h3>
        <p className="text-[11px] leading-snug text-zinc-400 md:text-xs">{subtitle}</p>
        <p className="text-[10px] text-zinc-500 md:text-[11px]">{details}</p>
      </div>
    </article>
  );
}

function CpuBrandIcon({ variant, label }: { variant: CpuBrand; label: string }) {
  const box =
    variant === "intel"
      ? "border-[#00c7fd]/35 bg-white"
      : variant === "ryzen"
        ? "border-[#FF9000]/60 bg-gradient-to-br from-[#1a0808] to-black shadow-[0_0_12px_rgba(237,28,36,0.25)]"
        : "border-[#ED1C24]/70 bg-[#0a0a0a] shadow-[0_0_12px_rgba(237,28,36,0.2)]";

  return (
    <div
      className={`flex h-[3.25rem] w-[3.25rem] shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border md:h-14 md:w-14 md:rounded-xl ${box}`}
    >
      {variant === "intel" ? (
        <AppImage
          src="/images/intel.svg"
          alt=""
          width={40}
          height={14}
          className="h-3 w-auto max-w-[2.5rem] object-contain md:h-[14px] md:max-w-[40px]"
        />
      ) : (
        <AppImage
          src="/images/amd-mark.svg"
          alt=""
          width={28}
          height={12}
          className="h-2.5 w-7 object-contain md:h-3 md:w-8"
        />
      )}
      <span
        className={`max-w-full truncate px-0.5 text-[8px] font-bold uppercase leading-none tracking-tight md:text-[9px] ${
          variant === "intel" ? "text-[#0071c5]" : variant === "ryzen" ? "text-[#FF9000]" : "text-[#ED1C24]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: GameCard["status"] }) {
  const styles: Record<GameCard["status"], string> = {
    popular: "border-violet-500/40 bg-violet-500/10 text-violet-200",
    new: "border-cyan-500/40 bg-cyan-500/10 text-cyan-200",
    available: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
    "coming-soon": "border-amber-500/40 bg-amber-500/10 text-amber-200",
  };
  const label: Record<GameCard["status"], string> = {
    popular: "Popular",
    new: "New",
    available: "Live",
    "coming-soon": "Coming Soon",
  };

  return (
    <span className={`rounded-full border px-2 py-1 text-[11px] font-semibold ${styles[status]}`}>
      {label[status]}
    </span>
  );
}

function InfoPill({
  icon,
  text,
  compact,
}: {
  icon: React.ReactNode;
  text: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-950/55 text-zinc-200 ${
        compact ? "px-2 py-1.5 text-xs" : "px-3 py-2 text-sm"
      }`}
    >
      <span className="shrink-0 text-violet-300">{icon}</span>
      <span className="leading-tight">{text}</span>
    </div>
  );
}

function BottomStat({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
      <div className="mb-2">{icon}</div>
      <p className="font-semibold text-zinc-100">{title}</p>
      <p className="text-xs text-zinc-400">{value}</p>
    </div>
  );
}
