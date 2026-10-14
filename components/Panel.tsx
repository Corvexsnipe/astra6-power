"use client";

import React, { useState, useEffect, useCallback } from "react";
import AppImage from "@/components/AppImage";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, LayoutDashboard, Sparkles, Play } from "lucide-react";
import { DynamicIcon } from "@/lib/features";
import { getPanelConfig, PanelTab } from "@/lib/panel";
import { SectionBackdrop } from "@/components/motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PREMIUM_EASE } from "@/lib/motion";

const TAB_DURATION_MS = 4500;

const Panel = () => {
  const { header, tabs } = getPanelConfig();
  const [activeTab, setActiveTab] = useState<PanelTab>(tabs[0]);
  const [progress, setProgress] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  const selectTab = useCallback((tab: PanelTab) => {
    setActiveTab(tab);
    setProgress(0);
    setCycleKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let startedAt = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const pct = Math.min((elapsed / TAB_DURATION_MS) * 100, 100);
      setProgress(pct);

      if (elapsed >= TAB_DURATION_MS) {
        setActiveTab((prevTab) => {
          const i = tabs.findIndex((t) => t.id === prevTab.id);
          return tabs[(i + 1) % tabs.length];
        });
        startedAt = now;
        setProgress(0);
      }

      rafId = requestAnimationFrame(tick);
    };

    setProgress(0);
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [tabs, cycleKey]);

  const activeIndex = tabs.findIndex((t) => t.id === activeTab.id);

  return (
    <section id="panel-section" className="w-full py-20 md:py-28 relative z-10 overflow-hidden bg-black">
      <SectionBackdrop />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
        <ScrollReveal direction="up" blur distance={44} className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-violet-200/90 mb-4">
            <LayoutDashboard size={14} />
            Control Panel
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
            {header.title}{" "}
            <span className="bg-linear-to-br from-violet-300 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {header.accent}
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm md:text-base font-medium max-w-2xl mx-auto">
            {header.description}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" blur delay={0.08}>
          <div className="rounded-3xl border border-white/10 glass-panel premium-glow overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr]">
              {/* Sidebar tabs */}
              <div className="border-b lg:border-b-0 lg:border-r border-white/10 bg-zinc-950/50 p-3 md:p-4 max-h-[320px] lg:max-h-[520px] overflow-y-auto">
                <p className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 px-2 mb-3">
                  Features
                </p>
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 snap-x">
                  {tabs.map((tab, i) => {
                    const active = tab.id === activeTab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => selectTab(tab)}
                        className={`group relative flex items-center gap-3 shrink-0 lg:shrink snap-start w-full min-w-[200px] lg:min-w-0 rounded-xl px-3 py-2.5 text-left transition-all duration-300 border ${
                          active
                            ? "bg-violet-600/20 border-violet-500/50 text-white"
                            : "border-transparent text-zinc-400 hover:bg-white/5 hover:text-white hover:border-white/10"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                            active
                              ? "border-violet-400/40 bg-violet-500/20 text-violet-200"
                              : "border-white/10 bg-black/40 text-zinc-500 group-hover:text-violet-300"
                          }`}
                        >
                          <DynamicIcon name={tab.icon} size={17} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-bold truncate">{tab.label}</span>
                          <span className="block text-[10px] text-zinc-500 lg:hidden">
                            Tap to preview
                          </span>
                        </span>
                        {active ? (
                          <ChevronRight size={16} className="shrink-0 text-violet-300" />
                        ) : (
                          <span className="hidden lg:block text-[10px] font-bold text-zinc-600 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        )}
                        {active && (
                          <motion.span
                            layoutId="panel-active-pill"
                            className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-violet-400 hidden lg:block"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preview */}
              <div className="relative p-4 md:p-6 flex flex-col min-h-[280px] lg:min-h-[520px]">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-violet-400" />
                    <p className="text-sm font-bold text-white">{activeTab.label}</p>
                  </div>
                  <p className="text-[11px] font-semibold text-zinc-500 tabular-nums">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(tabs.length).padStart(2, "0")}
                  </p>
                </div>

                <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab.id}
                      initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -24, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: PREMIUM_EASE }}
                      className="absolute inset-0"
                    >
                      <AppImage
                        src={activeTab.image}
                        alt={activeTab.label}
                        fill
                        className="object-cover object-top"
                        priority
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-violet-600 via-violet-400 to-fuchsia-300 transition-[width] duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex gap-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => selectTab(tab)}
                        aria-label={tab.label}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          tab.id === activeTab.id
                            ? "w-5 bg-violet-400"
                            : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* YouTube Video Button */}
                <div className="mt-4">
                  <motion.a
                    href="https://youtu.be/CiJsdpvqbyY?si=x3RmFcgoT0uhlqNh"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center justify-center gap-2 w-full bg-linear-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-red-400/30 shadow-lg shadow-red-900/20 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    <Play size={18} className="relative z-10" />
                    <span className="relative z-10">Watch Panel Preview Video</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Panel;
