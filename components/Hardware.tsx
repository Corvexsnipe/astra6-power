"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  HardDrive,
  MemoryStick,
  Server,
  Shield,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import hardwareData from "@/config/home/hardware.json";
import { SectionBackdrop } from "@/components/motion";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";
import { PREMIUM_EASE } from "@/lib/motion";
import BenchmarkModal from "@/components/BenchmarkModal";

const IconMap: Record<string, LucideIcon> = {
  Cpu,
  HardDrive,
  Shield,
  MemoryStick,
  Zap,
  Server,
};

const tagStyles: Record<string, string> = {
  Enterprise: "border-cyan-400/35 bg-cyan-500/10 text-cyan-200",
  Performance: "border-violet-400/35 bg-violet-500/10 text-violet-200",
  Ultra: "border-fuchsia-400/35 bg-fuchsia-500/10 text-fuchsia-200",
};

const Hardware = () => {
  const { header, highlights, processorGroup, specs } = hardwareData;
  const [benchmarkOpen, setBenchmarkOpen] = useState(false);

  return (
    <section className="w-full py-20 md:py-28 relative overflow-hidden bg-black">
      <SectionBackdrop />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
        <ScrollReveal direction="up" blur distance={48} className="text-center mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-violet-200/90">
            <Sparkles size={14} />
            {header.badge}
          </div>
          <h2 className="mt-4 text-white text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.05]">
            {header.title}{" "}
            <span className="bg-linear-to-br from-violet-300 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
              {header.accent}
            </span>
          </h2>
          <p className="mt-3 text-zinc-300/75 text-sm md:text-base font-medium leading-relaxed max-w-3xl mx-auto">
            {header.description}
          </p>
        </ScrollReveal>

        {/* Metric strip */}
        <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10" stagger={0.06}>
          {highlights.map((item) => (
            <StaggerItem key={item.label} blur distance={28}>
              <div className="rounded-2xl border border-white/10 glass-panel px-4 py-4 md:py-5 text-center premium-glow h-full">
                <p className="text-2xl md:text-3xl font-black text-white tabular-nums">
                  {item.value}
                </p>
                <p className="mt-1 text-sm font-bold text-violet-200">{item.label}</p>
                <p className="mt-0.5 text-[11px] text-zinc-500">{item.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_minmax(0,0.85fr)] gap-6 lg:gap-8">
          {/* CPU lineup */}
          <ScrollReveal direction="right" blur distance={40}>
            <TiltCard intensity={4} className="h-full">
              <div className="h-full rounded-3xl p-[1px] bg-linear-to-br from-violet-500/50 via-cyan-500/20 to-violet-900/40 premium-glow overflow-hidden">
                <div className="h-full rounded-[23px] bg-[#07050f]/92 backdrop-blur-xl border border-white/10 p-6 md:p-8 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-300/90">
                        {processorGroup.title}
                      </p>
                      <p className="mt-2 text-zinc-400 text-sm leading-relaxed max-w-md">
                        {processorGroup.subtitle}
                      </p>
                    </div>
                    <div className="shrink-0 p-3 rounded-xl border border-violet-400/25 bg-violet-500/10 text-violet-300">
                      <Cpu size={26} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                    {processorGroup.cpus.map((cpu, i) => (
                      <motion.div
                        key={cpu.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.1 + i * 0.06,
                          duration: 0.5,
                          ease: PREMIUM_EASE,
                        }}
                        whileHover={{ y: -3 }}
                        className="rounded-2xl border border-white/[0.08] bg-zinc-950/70 p-4 hover:border-violet-500/30 transition-colors"
                      >
                        <span
                          className={`inline-flex text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            tagStyles[cpu.tag] ?? tagStyles.Performance
                          }`}
                        >
                          {cpu.tag}
                        </span>
                        <p className="mt-3 text-white font-bold text-sm md:text-base leading-snug">
                          {cpu.name}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">{cpu.note}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => setBenchmarkOpen(true)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-2xl bg-linear-to-r from-violet-600 to-cyan-600 px-6 py-3.5 text-sm font-bold text-white border border-violet-400/30 shadow-[0_12px_32px_rgba(76,29,149,0.35)] cursor-pointer"
                  >
                    <Zap size={16} />
                    {header.ctaText}
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Infrastructure specs */}
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3" stagger={0.07}>
            {specs.map((spec) => {
              const IconComponent = IconMap[spec.icon] || Server;
              return (
                <StaggerItem key={spec.label} blur distance={24}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="group flex gap-4 rounded-2xl border border-white/10 glass-panel p-5 premium-glow h-full"
                  >
                    <div className="shrink-0 p-3 rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 group-hover:border-violet-400/40 transition-colors">
                      <IconComponent size={22} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                        {spec.label}
                      </p>
                      <p className="mt-1 text-white font-bold text-lg leading-tight">
                        {spec.value}
                      </p>
                      <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">
                        {spec.desc}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>

        <ScrollReveal direction="up" delay={0.1} className="mt-10 md:mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 glass-panel px-5 py-4 md:px-6">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 text-center sm:text-left">
              Powered by enterprise hardware
            </p>
            <Link
              href="/contactus-info"
              className="inline-flex items-center gap-2 text-sm font-bold text-violet-300 hover:text-white transition-colors"
            >
              Questions? Contact us
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <BenchmarkModal open={benchmarkOpen} onClose={() => setBenchmarkOpen(false)} />
    </section>
  );
};

export default Hardware;
