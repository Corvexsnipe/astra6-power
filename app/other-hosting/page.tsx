"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Cpu,
  HardDrive,
  Headphones,
  Server,
  Shield,
  Zap,
  MemoryStick,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const BG_IMAGE = "/images/discordimagebg.png";

const nextjsPlans = [
  {
    name: "Starter",
    ram: "1GB",
    cpu: "100%",
    storage: "5GB",
    price: 30,
    purchaseUrl: "https://billing.caspian.host/products/next-js-discord-bot-hosting/1gb-nextjs-bot",
    features: [
      "1GB DDR4 RAM",
      "100% CPU",
      "5GB NVMe SSD",
      "1 Backup Slot",
      "Instant Setup",
      "DDoS Protection",
      "24/7 Support",
    ],
  },
  {
    name: "Standard",
    ram: "2GB",
    cpu: "200%",
    storage: "12GB",
    price: 60,
    purchaseUrl: "https://billing.caspian.host/products/next-js-discord-bot-hosting/2gb-nextjs-bot",
    features: [
      "2GB DDR4 RAM",
      "200% CPU",
      "12GB NVMe SSD",
      "3 Backup Slots",
      "Instant Setup",
      "DDoS Protection",
      "24/7 Support",
    ],
  },
  {
    name: "Premium",
    ram: "4GB",
    cpu: "300%",
    storage: "20GB",
    price: 100,
    purchaseUrl: "https://billing.caspian.host/products/next-js-discord-bot-hosting/4gb-nextjs-bot",
    features: [
      "4GB DDR4 RAM",
      "300% CPU",
      "20GB NVMe SSD",
      "6 Backup Slots",
      "Instant Setup",
      "DDoS Protection",
      "24/7 Support",
    ],
  },
];

const pythonPlans = [
  {
    name: "Starter",
    ram: "1GB",
    cpu: "100%",
    storage: "5GB",
    price: 30,
    purchaseUrl: "https://billing.caspian.host/products/phyton-discord-bot-hosting/1gb-phyton-bot",
    features: [
      "1GB DDR4 RAM",
      "100% CPU",
      "5GB NVMe SSD",
      "1 Backup Slot",
      "Instant Setup",
      "DDoS Protection",
      "24/7 Support",
    ],
  },
  {
    name: "Standard",
    ram: "2GB",
    cpu: "200%",
    storage: "12GB",
    price: 60,
    purchaseUrl: "https://billing.caspian.host/products/phyton-discord-bot-hosting/2gb-phyton-bot",
    features: [
      "2GB DDR4 RAM",
      "200% CPU",
      "12GB NVMe SSD",
      "3 Backup Slots",
      "Instant Setup",
      "DDoS Protection",
      "24/7 Support",
    ],
  },
  {
    name: "Premium",
    ram: "4GB",
    cpu: "300%",
    storage: "20GB",
    price: 100,
    purchaseUrl: "https://billing.caspian.host/products/phyton-discord-bot-hosting/4gb-phyton-bot",
    features: [
      "4GB DDR4 RAM",
      "300% CPU",
      "20GB NVMe SSD",
      "6 Backup Slots",
      "Instant Setup",
      "DDoS Protection",
      "24/7 Support",
    ],
  },
];

function OtherHostingContent() {
  const searchParams = useSearchParams();
  const [selectedBot, setSelectedBot] = useState<"nextjs" | "python">("nextjs");
  const plans = selectedBot === "nextjs" ? nextjsPlans : pythonPlans;

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "nextjs" || type === "python") {
      setSelectedBot(type);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10 bg-[#05070d]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{ backgroundImage: `url('${BG_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_30%_0%,rgba(88,101,242,0.22)_0%,rgba(11,15,26,0.38)_50%,rgba(5,7,13,0.55)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px] opacity-10" />
        
        <section className="relative max-w-360 mx-auto px-6 lg:px-10 pt-24 pb-8 md:pt-28 md:pb-10 lg:pt-28">
          <div className="space-y-4 drop-shadow-[0_2px_20px_rgba(0,0,0,0.85)]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl">
              Discord Bot
              <br />
              <span className="text-indigo-400">Hosting</span>
            </h1>
            <p className="max-w-xl text-sm text-zinc-300/90 md:text-base">
              High-performance hosting for your Discord bots. Deploy Next.js or Python bots instantly with dedicated resources, DDoS protection, and 24/7 support.
            </p>
          </div>
        </section>
      </div>

      <main className="relative max-w-360 mx-auto px-6 lg:px-10 mt-4 space-y-6 md:mt-6 md:space-y-8 pb-12">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#05070d] via-[#0a0f1a] to-black" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(99,102,241,0.08)_0%,transparent_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-5" />
        
        {/* Bot Type Selector */}
        <section className="relative mb-4">
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedBot("nextjs")}
              className={cn(
                "flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-all",
                selectedBot === "nextjs"
                  ? "border-indigo-500/50 bg-indigo-500/20 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                  : "border-slate-700/50 bg-slate-900/50 text-zinc-400 hover:border-indigo-400/40 hover:text-zinc-200"
              )}
            >
              Next.js Bot
            </button>
            <button
              onClick={() => setSelectedBot("python")}
              className={cn(
                "flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-all",
                selectedBot === "python"
                  ? "border-indigo-500/50 bg-indigo-500/20 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                  : "border-slate-700/50 bg-slate-900/50 text-zinc-400 hover:border-indigo-400/40 hover:text-zinc-200"
              )}
            >
              Python Bot
            </button>
          </div>
        </section>

        {/* Plans Section */}
        <AnimatePresence mode="wait">
          <motion.section
            key={selectedBot}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative mb-4"
          >
            <h2 className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-xs">
              {selectedBot === "nextjs" ? "NEXT.JS BOT PLANS" : "PYTHON BOT PLANS"}
            </h2>
            <p className="mb-4 max-w-2xl text-[11px] leading-snug text-white sm:text-xs">
              Premium {selectedBot === "nextjs" ? "Next.js" : "Python"} bot hosting with enterprise-grade infrastructure
            </p>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {plans.map((plan, index) => {
                const isBest = index === 2;

                return (
                  <motion.article
                    key={plan.name}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-slate-900/95 to-slate-950/95 p-5 shadow-lg backdrop-blur-md transition-all duration-300",
                      isBest
                        ? "border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                        : "border-slate-700/50 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:border-indigo-400/60 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]",
                    )}
                  >
                    {isBest && (
                      <span className="absolute right-3 top-3 rounded-full border border-indigo-400/50 bg-indigo-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                        BEST VALUE
                      </span>
                    )}

                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="text-2xl font-black tracking-tight text-white">
                        {plan.name}
                      </h3>
                    </div>

                    <div className="mb-4 rounded-xl border border-indigo-500/20 bg-slate-900/50 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                        MONTHLY
                      </p>
                      <div className="mt-1">
                        <p className="text-3xl font-black tabular-nums leading-tight text-white">
                          ₹{plan.price}
                        </p>
                        <p className="mt-0.5 text-sm text-slate-400">per month</p>
                      </div>
                    </div>

                    <ul className="mb-4 flex flex-1 flex-col gap-2 text-sm text-white">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" strokeWidth={3} />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={plan.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-[0_6px_20px_rgba(99,102,241,0.4)] transition-all duration-300 hover:from-indigo-400 hover:to-indigo-500 hover:shadow-[0_8px_25px_rgba(99,102,241,0.5)] hover:-translate-y-0.5"
                    >
                      Get started
                    </a>
                  </motion.article>
                );
              })}
            </div>
          </motion.section>
        </AnimatePresence>

        {/* Why Choose Us */}
        <section className="relative mb-4">
          <h2 className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-xs">
            WHY CHOOSE US
          </h2>
          <p className="mb-4 max-w-2xl text-[11px] leading-snug text-white sm:text-xs">
            Premium Discord bot hosting with enterprise-grade infrastructure
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "High-Performance CPUs",
                desc: "AMD EPYC and Ryzen 9 processors with high clock speeds for optimal bot performance",
                icon: Cpu,
              },
              {
                title: "Low Latency Network",
                desc: "Premium bandwidth with optimized routing for minimal latency and smooth bot operations",
                icon: Globe,
              },
              {
                title: "Instant Deployment",
                desc: "Your Discord bot is automatically deployed within minutes of purchase",
                icon: Zap,
              },
              {
                title: "Automatic Backups",
                desc: "Daily automated backups to protect your bot data and configurations",
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
                className="rounded-xl border border-indigo-500/20 bg-slate-900/50 p-4 backdrop-blur-sm transition hover:border-indigo-500/40 hover:bg-slate-900/70"
              >
                <benefit.icon className="mb-3 h-6 w-6 text-indigo-400" strokeWidth={2} />
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
            What sets Caspian apart from other Discord bot hosting providers
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
                desc: "Easy-to-use panel with one-click deployment and file manager.",
                icon: Cpu,
              },
              {
                title: "Flexible Locations",
                desc: "Multiple server locations worldwide for optimal latency wherever your users are.",
                icon: Globe,
              },
              {
                title: "Transparent Pricing",
                desc: "No hidden fees or surprise charges. What you see is what you pay.",
                icon: Check,
              },
              {
                title: "Community Focused",
                desc: "Built by developers, for developers. We understand what Discord bot developers need.",
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
                className="rounded-xl border border-indigo-500/20 bg-slate-900/50 p-4 backdrop-blur-sm transition hover:border-indigo-500/40 hover:bg-slate-900/70"
              >
                <benefit.icon className="mb-3 h-6 w-6 text-indigo-400" strokeWidth={2} />
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
              desc: "Blazing fast bot IO",
              icon: HardDrive,
              glow: "shadow-[0_0_24px_rgba(99,102,241,0.25)]",
            },
            {
              title: "DDoS protection",
              desc: "Filtered edge network",
              icon: Shield,
              glow: "shadow-[0_0_24px_rgba(99,102,241,0.28)]",
            },
            {
              title: "Instant setup",
              desc: "Bot live in minutes",
              icon: Zap,
              glow: "shadow-[0_0_24px_rgba(99,102,241,0.2)]",
            },
            {
              title: "99.9% uptime",
              desc: "Redundant power & network",
              icon: Server,
              glow: "shadow-[0_0_24px_rgba(99,102,241,0.22)]",
            },
            {
              title: "24/7 expert support",
              desc: "Real humans, low wait",
              icon: Headphones,
              glow: "shadow-[0_0_24px_rgba(99,102,241,0.22)]",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className={`rounded-xl border border-white/10 bg-black/40 p-3 ${feature.glow}`}
            >
              <feature.icon className="mb-2 h-5 w-5 text-indigo-400" strokeWidth={2} />
              <p className="font-semibold text-zinc-100">{feature.title}</p>
              <p className="text-xs text-zinc-400">{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default function OtherHostingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center">Loading...</div>}>
      <OtherHostingContent />
    </Suspense>
  );
}
