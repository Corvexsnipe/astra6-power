"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Cpu,
  HardDrive,
  Server,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import minecraftJavaPlans from "@/config/game-hosting/minecraft-java-plans.json";
import { GlowButton } from "@/components/motion/GlowButton";

const BG_IMAGE =
  "https://i.postimg.cc/CL5fCfKt/a0i28m3buxsd1-(1).png";

type MinecraftJavaPlan = {
  id: string;
  name: string;
  cpuPercent: number;
  ram: number;
  nvme: number;
  price: number;
  currency: string;
};

type CpuModel = {
  id: string;
  name: string;
  tier: string;
  description: string;
};

const config = minecraftJavaPlans as {
  cpuModels: CpuModel[];
  plansByCpu: Record<string, MinecraftJavaPlan[]>;
};

function formatPrice(amount: number, currency: string) {
  if (currency === "INR") {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  return `$${amount.toFixed(2)}`;
}

function planFeatures(cpuName: string, plan: MinecraftJavaPlan) {
  return [
    cpuName,
    `${plan.cpuPercent}% CPU`,
    `${plan.ram}GB DDR4 RAM`,
    `${plan.nvme}GB NVMe SSD Storage`,
    "Unlimited Player Slots",
    "Free Cloud Backups",
    "24/7 Ticket Support",
  ];
}

export default function MinecraftJavaPlansPage() {
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
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_100%_35%,rgba(16,185,129,0.025),transparent_45%)]" />

      {/* subtle grid */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(16,185,129,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-3 sm:px-6 lg:px-8 lg:pb-16 lg:pt-4">
        {/* Hero */}
        <section className="relative mb-2.5 overflow-hidden rounded-lg border border-white/10 bg-black/55 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:p-2.5">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/[0.07] blur-3xl" />

          <div className="relative mb-1.5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              <Link
                href="/game-hosting/minecraft-java"
                className="group inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-white transition hover:border-emerald-500/40 hover:bg-black/55 sm:text-[11px]"
              >
                <ArrowLeft className="h-3 w-3 transition group-hover:-translate-x-0.5" />
                Back to Minecraft Java
              </Link>
              <GlowButton href="/migrate-to-us" variant="golden" className="text-[10px] px-4 py-1.5 sm:text-[11px]">
                Migrate Your Server
              </GlowButton>
            </div>
          </div>

          <div className="relative space-y-1">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-1.5 py-px text-[8px] font-bold uppercase tracking-[0.18em] text-white sm:text-[9px]">
              <Server className="h-2.5 w-2.5 text-emerald-400" strokeWidth={2} />
              Game Servers
            </span>
            <h1 className="flex flex-wrap items-center gap-1.5 text-lg font-black tracking-tight text-white sm:text-xl">
              <span>Minecraft Java</span>
              <span className="text-white">.</span>
              <span>Plans</span>
            </h1>
            <p className="max-w-lg text-[10px] leading-snug text-white/90 sm:text-[11px]">
              Separate plans for each CPU model — configure billing and checkout
              on the main page.
            </p>
          </div>
        </section>

        {/* Plans per CPU model */}
        {config.cpuModels.map((cpu) => {
          const plans = config.plansByCpu[cpu.id] ?? [];

          return (
            <section key={cpu.id} className="relative mb-6">
              <div className="mb-3 rounded-xl border border-white/10 bg-zinc-950/70 px-3 py-2.5 backdrop-blur-md sm:px-3 sm:py-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-emerald-500/40 bg-gradient-to-br from-zinc-900 to-black text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.22)]">
                    <Cpu className="h-[15px] w-[15px]" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300/95">
                      {cpu.tier}
                    </p>
                    <h2 className="text-sm font-bold text-white sm:text-base">
                      {cpu.name}
                    </h2>
                    <p className="mt-0.5 text-[10px] text-white/65 sm:text-[11px]">
                      {cpu.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {plans.map((plan) => {
                  const features = planFeatures(cpu.name, plan);
                  const isBest = plan.ram === 4;

                  return (
                    <motion.article
                      key={plan.id}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      className={cn(
                        "relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950/80 p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md",
                        isBest
                          ? "border-emerald-500/50 shadow-[0_0_28px_rgba(16,185,129,0.25)]"
                          : "hover:border-white/15",
                      )}
                    >
                      {isBest && (
                        <span className="absolute right-2.5 top-2.5 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-200">
                          BEST VALUE
                        </span>
                      )}

                      <div
                        className={cn(
                          "mb-2.5 flex items-center gap-2",
                          isBest && "pr-24",
                        )}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-emerald-500/40 bg-gradient-to-br from-zinc-900 to-black text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.22)]">
                          <Cpu className="h-[15px] w-[15px]" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold tracking-tight text-white">
                            {plan.name}
                          </h3>
                          <p className="text-[10px] text-white/60">{cpu.tier}</p>
                        </div>
                      </div>

                      <div className="mb-3 rounded-lg border border-white/[0.08] bg-black/50 p-2.5 ring-1 ring-inset ring-white/[0.05]">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                          MONTHLY
                        </p>
                        <div className="mt-1">
                          <p className="text-2xl font-bold tabular-nums leading-tight text-white">
                            {formatPrice(plan.price, plan.currency)}
                          </p>
                          <p className="mt-0.5 text-[11px] text-white">per month</p>
                        </div>
                      </div>

                      <ul className="mb-3 flex flex-1 flex-col gap-1.5 text-xs text-white sm:text-[13px]">
                        {features.map((line) => (
                          <li key={line} className="flex items-start gap-2">
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                              strokeWidth={2.5}
                              aria-hidden
                            />
                            <span className="leading-snug">{line}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/game-hosting/minecraft-java"
                        className="mt-auto flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 py-2.5 text-xs font-semibold text-white shadow-[0_6px_20px_rgba(16,185,129,0.3)] transition hover:brightness-110"
                      >
                        Configure & order
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Features Section */}
        <section className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "NVMe SSD storage",
              desc: "Blazing chunk and world IO",
              icon: HardDrive,
              glow: "shadow-[0_0_24px_rgba(34,211,238,0.25)]",
            },
            {
              title: "Instant setup",
              desc: "Server live in minutes",
              icon: Zap,
              glow: "shadow-[0_0_24px_rgba(250,204,21,0.2)]",
            },
            {
              title: "24/7 expert support",
              desc: "Real humans, low wait",
              icon: Server,
              glow: "shadow-[0_0_24px_rgba(34,211,238,0.22)]",
            },
          ].map((f) => (
            <motion.div
              key={f.title}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border border-white/10 bg-black/45 p-3 backdrop-blur-sm transition hover:border-emerald-500/35"
            >
              <div
                className={cn(
                  "mb-2 inline-flex rounded-lg border border-white/10 bg-black/50 p-2 text-emerald-300",
                  f.glow,
                )}
              >
                <f.icon className="h-4 w-4" />
              </div>
              <p className="font-bold text-white">{f.title}</p>
              <p className="mt-1 text-xs text-white">{f.desc}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}
