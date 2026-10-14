"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Sparkles,
  TrendingDown,
  Zap,
} from "lucide-react";
import pricingData from "@/config/home/pricing-comparison.json";
import { SectionBackdrop } from "@/components/motion";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";
import { PREMIUM_EASE } from "@/lib/motion";

function formatPrice(amount: number, currency: string) {
  return `${currency}${amount.toLocaleString("en-IN")}`;
}

function savingsPercent(ourPrice: number, theirPrice: number) {
  return Math.round(((theirPrice - ourPrice) / theirPrice) * 100);
}

const PricingComparison = () => {
  const { header, unit, featured, competitors, cta, footnote } = pricingData;

  const maxPrice = useMemo(
    () => Math.max(...competitors.map((c) => c.price), featured.price),
    [competitors, featured.price],
  );

  const maxSavings = useMemo(
    () =>
      Math.max(
        ...competitors.map((c) => savingsPercent(featured.price, c.price)),
      ),
    [competitors, featured.price],
  );

  const allRows = useMemo(
    () => [
      { ...featured, highlight: true as const },
      ...competitors.map((c) => ({ ...c, highlight: false as const })),
    ].sort((a, b) => a.price - b.price),
    [featured, competitors],
  );

  return (
    <section
      id="pricing-comparison"
      className="w-full py-20 md:py-28 relative z-10 overflow-hidden bg-black"
    >
      <SectionBackdrop />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
        <ScrollReveal direction="up" blur distance={44} className="text-center mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-violet-200/90">
            <TrendingDown size={14} />
            {header.badge}
          </div>
          <h2 className="mt-4 text-white text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.05]">
            {header.title}{" "}
            <span className="bg-linear-to-br from-violet-300 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {header.accent}
            </span>
          </h2>
          <p className="mt-3 text-zinc-300/75 text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            {header.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] gap-6 lg:gap-8 items-stretch">
          {/* Savings spotlight */}
          <ScrollReveal direction="right" blur distance={56} duration={0.72} className="h-full">
            <TiltCard intensity={4} glow className="h-full">
              <div className="relative h-full min-h-[280px] rounded-3xl p-[1px] overflow-hidden bg-linear-to-br from-violet-500/60 via-fuchsia-500/30 to-violet-900/40 premium-glow">
                <div className="relative h-full rounded-[23px] bg-[#07050f]/90 backdrop-blur-xl p-7 md:p-8 flex flex-col justify-between overflow-hidden border border-white/10">
                  <motion.div
                    className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full bg-violet-500/25 blur-[80px]"
                    animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                      <Sparkles size={12} />
                      You save more
                    </div>
                    <p className="mt-5 text-zinc-400 text-sm font-medium">
                      Up to vs top competitors
                    </p>
                    <p className="mt-1 text-6xl md:text-7xl font-black tabular-nums bg-linear-to-r from-violet-200 via-white to-fuchsia-200 bg-clip-text text-transparent leading-none">
                      {maxSavings}%
                    </p>
                    <p className="mt-3 text-zinc-400 text-sm leading-relaxed max-w-[240px]">
                      Pay only{" "}
                      <span className="text-white font-bold">
                        {formatPrice(featured.price, featured.currency)}
                      </span>{" "}
                      {unit} with {featured.name} — not hundreds more elsewhere.
                    </p>
                  </div>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Zap size={15} className="text-violet-400 shrink-0" />
                      <span>Instant setup & Cloudflare DDoS protection for game servers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <BadgeCheck size={15} className="text-emerald-400 shrink-0" />
                      <span>First provider with free Cloudflare Magic Transit</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <BadgeCheck size={15} className="text-emerald-400 shrink-0" />
                      <span>No hidden per-slot fees</span>
                    </div>
                    <Link
                      href={cta.href}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-violet-500 via-violet-600 to-fuchsia-600 px-5 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_rgba(109,40,217,0.45)] transition hover:brightness-110 border border-violet-400/30"
                    >
                      {cta.text}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Comparison board */}
          <ScrollReveal direction="left" blur distance={56} duration={0.72} delay={0.08}>
            <div className="rounded-3xl border border-white/10 glass-panel premium-glow overflow-hidden h-full">
              <div className="px-5 md:px-6 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Price per GB
                </p>
                <p className="text-xs text-zinc-500 hidden sm:block">
                  Lower bar = better value
                </p>
              </div>

              <StaggerReveal className="p-4 md:p-5 space-y-3" stagger={0.08}>
                {allRows.map((row, rowIndex) => {
                  const barPct = Math.max(
                    8,
                    Math.round((row.price / maxPrice) * 100),
                  );
                  const save = row.highlight
                    ? 0
                    : savingsPercent(featured.price, row.price);
                  const slideFrom = rowIndex % 2 === 0 ? "right" : "left";

                  return (
                    <StaggerItem
                      key={row.name}
                      direction={slideFrom}
                      blur
                      distance={40}
                      duration={0.6}
                    >
                      <motion.div
                        whileHover={{ scale: row.highlight ? 1.01 : 1.008 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className={`relative rounded-2xl p-4 md:p-5 transition-colors ${
                          row.highlight
                            ? "bg-linear-to-r from-violet-950/80 via-violet-900/40 to-fuchsia-950/50 border-2 border-violet-500/50 shadow-[0_0_40px_rgba(139,92,246,0.15)]"
                            : "bg-zinc-950/60 border border-white/[0.06] hover:border-white/12"
                        }`}
                      >
                        {row.highlight && (
                          <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-violet-500 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-lg shadow-violet-900/40">
                            <BadgeCheck size={10} />
                            {featured.badge}
                          </span>
                        )}

                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div className="min-w-0">
                            <p
                              className={`font-bold text-base md:text-lg truncate ${
                                row.highlight ? "text-white" : "text-zinc-200"
                              }`}
                            >
                              {row.name}
                            </p>
                            {!row.highlight && save > 0 && (
                              <p className="mt-0.5 text-[11px] font-semibold text-emerald-400/90">
                                {save}% more expensive than us
                              </p>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <p
                              className={`text-2xl md:text-3xl font-black tabular-nums leading-none ${
                                row.highlight
                                  ? "text-transparent bg-linear-to-r from-violet-200 to-fuchsia-300 bg-clip-text"
                                  : "text-zinc-500"
                              }`}
                            >
                              {formatPrice(row.price, featured.currency)}
                            </p>
                            <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                              {unit}
                            </p>
                          </div>
                        </div>

                        <div className="relative h-2.5 rounded-full bg-zinc-900/90 overflow-hidden ring-1 ring-inset ring-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${barPct}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.9,
                              ease: PREMIUM_EASE,
                              delay: 0.15,
                            }}
                            className={`absolute inset-y-0 left-0 rounded-full ${
                              row.highlight
                                ? "bg-linear-to-r from-violet-500 via-violet-400 to-fuchsia-400 shadow-[0_0_16px_rgba(167,139,250,0.5)]"
                                : "bg-linear-to-r from-zinc-600 to-zinc-700"
                            }`}
                          />
                        </div>

                        {row.highlight && (
                          <p className="mt-3 text-[11px] text-violet-200/80 font-medium">
                            Benchmark for value — every competitor costs significantly more per GB. Plus, we're the first provider to include free Cloudflare Magic Transit protection on game servers.
                          </p>
                        )}
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerReveal>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.12} className="mt-8 text-center">
          <p className="text-zinc-500 text-xs md:text-sm">{footnote}</p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PricingComparison;
