"use client";

import React, { useState } from "react";
import AppImage from "@/components/AppImage";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Cpu,
  Globe,
  HardDrive,
  Headphones,
  Server,
  Shield,
  Zap,
  MemoryStick,
} from "lucide-react";
import { cn } from "@/lib/utils";
import arkConfig from "@/config/games/ark.json";

const BG_IMAGE = "/images/arkofsurvival.jpg";

type CpuModel = {
  name: string;
  pricePerGb: number;
};

type ArkPlan = {
  ram: string;
  cpu: string;
  ssd: string;
  priceEpyc: number;
  priceRyzen: number;
  playerSlots: string;
  linkEpyc?: string;
  linkRyzen?: string;
};

const config = arkConfig as {
  name: string;
  slug: string;
  image: string;
  heroImage: string;
  description: string;
  cpuModels: CpuModel[];
  plans: ArkPlan[];
};

type SelectedCpu = "epyc" | "ryzen";

export default function ArkConfigPage() {
  const [selectedCpu, setSelectedCpu] = useState<SelectedCpu>("epyc");

  const cpuModels = config.cpuModels;
  const selectedCpuModel = cpuModels[selectedCpu === "epyc" ? 0 : 1];

  const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden pt-16 font-sans text-white antialiased sm:pt-20">
      {/* Page backdrop */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-zinc-800"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${BG_IMAGE}')`,
          opacity: 0.82,
        }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/16 via-black/24 to-black/48" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_100%_70%_at_50%_15%,rgba(0,0,0,0.12),transparent_55%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_100%_35%,rgba(249,115,22,0.025),transparent_45%)]" />

      {/* subtle grid */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(249,115,22,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,179,8,0.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-3 sm:px-6 lg:px-8 lg:pb-16 lg:pt-4">
        {/* Hero */}
        <section className="relative mb-2.5 overflow-hidden rounded-lg border border-white/10 bg-black/55 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:p-2.5">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/[0.07] blur-3xl" />

          <div className="relative mb-1.5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              <Link
                href="/game-hosting"
                className="group inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-white transition hover:border-orange-500/40 hover:bg-black/55 sm:text-[11px]"
              >
                <ArrowLeft className="h-3 w-3 transition group-hover:-translate-x-0.5" />
                Back to game hosting
              </Link>
            </div>
          </div>

          <div className="relative space-y-1">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-1.5 py-px text-[8px] font-bold uppercase tracking-[0.18em] text-white sm:text-[9px]">
              <Server className="h-2.5 w-2.5 text-orange-400" strokeWidth={2} />
              Game Servers
            </span>
            <h1 className="flex flex-wrap items-center gap-1.5 text-lg font-black tracking-tight text-white sm:text-xl">
              <span>Ark of Survival</span>
            </h1>
            <p className="max-w-lg text-[10px] leading-snug text-white/90 sm:text-[11px]">
              {config.description}
            </p>
          </div>
        </section>

        {/* CPU Selection */}
        <section className="relative mb-4">
          <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-xs">
            SELECT CPU MODEL
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {cpuModels.map((cpu, index) => {
              const isSelected = selectedCpu === (index === 0 ? "epyc" : "ryzen");
              return (
                <motion.button
                  key={cpu.name}
                  type="button"
                  whileHover={{ y: -1 }}
                  onClick={() => setSelectedCpu(index === 0 ? "epyc" : "ryzen")}
                  className={cn(
                    "relative min-h-[3.5rem] flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition duration-300",
                    isSelected
                      ? "border-2 border-orange-500/90 bg-orange-950/60 shadow-[0_0_20px_rgba(249,115,22,0.22)] backdrop-blur-sm"
                      : "border border-white/18 bg-zinc-950/88 backdrop-blur-sm hover:border-orange-500/55 hover:bg-zinc-900/92",
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/50">
                    <Cpu className="h-5 w-5 text-orange-400" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{cpu.name}</p>
                    <p className="text-xs text-white/60">{formatPrice(cpu.pricePerGb)}/GB</p>
                  </div>
                  {isSelected && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20">
                      <Check className="h-4 w-4 text-orange-400" strokeWidth={2.5} />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Plans */}
        <section className="relative mb-4">
          <h2 className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-xs">
            SERVER PLANS
          </h2>
          <p className="mb-2 max-w-2xl text-[11px] leading-snug text-white sm:text-xs">
            Plans for <span className="font-semibold text-orange-300">{selectedCpuModel.name}</span>
          </p>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {config.plans.map((plan, index) => {
              const price = selectedCpu === "epyc" ? plan.priceEpyc : plan.priceRyzen;
              const link = selectedCpu === "epyc" ? plan.linkEpyc : plan.linkRyzen;
              const isBest = index === 0;

              return (
                <motion.article
                  key={plan.ram}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-slate-900/95 to-slate-950/95 p-5 shadow-lg backdrop-blur-md transition-all duration-300",
                    isBest
                      ? "border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                      : "border-slate-700/50 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:border-orange-400/60 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]",
                  )}
                >
                  {isBest && (
                    <span className="absolute right-3 top-3 rounded-full border border-orange-400/50 bg-orange-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-200">
                      BEST VALUE
                    </span>
                  )}

                  <div className="mb-3 flex items-center gap-2">
                    <img src="/images/removed-white0--logo.png" alt="Caspian" className="h-6 w-auto opacity-80" />
                    <h3 className="text-2xl font-black tracking-tight text-white">
                      {plan.ram}
                    </h3>
                  </div>

                  <div className="mb-4 rounded-xl border border-orange-500/20 bg-slate-900/50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">
                      MONTHLY
                    </p>
                    <div className="mt-1">
                      <p className="text-3xl font-black tabular-nums leading-tight text-white">
                        {formatPrice(price)}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-400">per month</p>
                    </div>
                  </div>

                  <ul className="mb-4 flex flex-1 flex-col gap-2 text-sm text-white">
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" strokeWidth={3} />
                      <span className="leading-snug">{plan.ram} DDR4 RAM</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" strokeWidth={3} />
                      <span className="leading-snug">{plan.cpu}% CPU</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" strokeWidth={3} />
                      <span className="leading-snug">{plan.ssd} NVMe SSD</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" strokeWidth={3} />
                      <span className="leading-snug">{plan.playerSlots} Player Slots</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" strokeWidth={3} />
                      <span className="leading-snug">DDoS Protection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" strokeWidth={3} />
                      <span className="leading-snug">Instant Setup</span>
                    </li>
                  </ul>

                  <a
                    href={link || "#"}
                    target={link?.startsWith("http") ? "_blank" : undefined}
                    rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-auto flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-sm font-bold text-white shadow-[0_6px_20px_rgba(249,115,22,0.4)] transition-all duration-300 hover:from-orange-400 hover:to-orange-500 hover:shadow-[0_8px_25px_rgba(249,115,22,0.5)] hover:-translate-y-0.5"
                  >
                    Get started
                  </a>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative mb-4">
          <h2 className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-xs">
            WHY CHOOSE US
          </h2>
          <p className="mb-4 max-w-2xl text-[11px] leading-snug text-white sm:text-xs">
            Premium Ark hosting with enterprise-grade infrastructure
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "High-Performance CPUs",
                desc: "AMD EPYC and Ryzen 9 processors with high clock speeds for optimal Ark server performance",
                icon: Cpu,
              },
              {
                title: "Low Latency Network",
                desc: "Premium bandwidth with optimized routing for minimal ping and smooth gameplay",
                icon: Globe,
              },
              {
                title: "Instant Deployment",
                desc: "Your Ark server is automatically deployed within minutes of purchase",
                icon: Zap,
              },
              {
                title: "Automatic Backups",
                desc: "Daily automated backups to protect your world data and progress",
                icon: HardDrive,
              },
              {
                title: "DDoS Protection",
                desc: "Enterprise-grade DDoS mitigation powered by Cloudflare Magic Transit",
                icon: Shield,
              },
              {
                title: "24/7 Expert Support",
                desc: "Real human support available around the clock to help with any issues",
                icon: Headphones,
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-orange-500/20 bg-slate-900/50 p-4 backdrop-blur-sm transition hover:border-orange-500/40 hover:bg-slate-900/70"
              >
                <benefit.icon className="mb-3 h-6 w-6 text-orange-400" strokeWidth={2} />
                <h3 className="mb-2 text-sm font-bold text-white">{benefit.title}</h3>
                <p className="text-xs leading-relaxed text-slate-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Different From Us */}
        <section className="relative mb-4">
          <h2 className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-xs">
            WHY WE'RE DIFFERENT
          </h2>
          <p className="mb-4 max-w-2xl text-[11px] leading-snug text-white sm:text-xs">
            What sets Caspian apart from other Ark hosting providers
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "No Overselling",
                desc: "We never overload our servers. Your resources are dedicated and guaranteed.",
                icon: Shield,
              },
              {
                title: "Custom Control Panel",
                desc: "Easy-to-use panel with one-click mod installation and file manager.",
                icon: Cpu,
              },
              {
                title: "Flexible Locations",
                desc: "Multiple server locations worldwide for optimal latency wherever you play.",
                icon: Globe,
              },
              {
                title: "Transparent Pricing",
                desc: "No hidden fees or surprise charges. What you see is what you pay.",
                icon: Check,
              },
              {
                title: "Community Focused",
                desc: "Built by gamers, for gamers. We understand what Ark players need.",
                icon: Headphones,
              },
              {
                title: "Scalable Resources",
                desc: "Upgrade or downgrade your plan anytime without data loss.",
                icon: Zap,
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-orange-500/20 bg-slate-900/50 p-4 backdrop-blur-sm transition hover:border-orange-500/40 hover:bg-slate-900/70"
              >
                <benefit.icon className="mb-3 h-6 w-6 text-orange-400" strokeWidth={2} />
                <h3 className="mb-2 text-sm font-bold text-white">{benefit.title}</h3>
                <p className="text-xs leading-relaxed text-slate-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer features */}
        <section className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              title: "NVMe SSD storage",
              desc: "Blazing fast world IO",
              icon: HardDrive,
              glow: "shadow-[0_0_24px_rgba(249,115,22,0.25)]",
            },
            {
              title: "DDoS protection",
              desc: "Filtered edge network",
              icon: Shield,
              glow: "shadow-[0_0_24px_rgba(249,115,22,0.28)]",
            },
            {
              title: "Instant setup",
              desc: "Server live in minutes",
              icon: Zap,
              glow: "shadow-[0_0_24px_rgba(249,115,22,0.2)]",
            },
            {
              title: "99.9% uptime",
              desc: "Redundant power & network",
              icon: Server,
              glow: "shadow-[0_0_24px_rgba(249,115,22,0.22)]",
            },
            {
              title: "24/7 expert support",
              desc: "Real humans, low wait",
              icon: Headphones,
              glow: "shadow-[0_0_24px_rgba(249,115,22,0.22)]",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className={`rounded-xl border border-white/10 bg-black/40 p-3 ${feature.glow}`}
            >
              <feature.icon className="mb-2 h-5 w-5 text-orange-400" strokeWidth={2} />
              <p className="font-semibold text-zinc-100">{feature.title}</p>
              <p className="text-xs text-zinc-400">{feature.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
