"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { getFaqPageConfig } from "@/lib/faq-page";
import { SectionBackdrop } from "@/components/motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PREMIUM_EASE } from "@/lib/motion";

export default function FaqPage() {
  const { header, items } = getFaqPageConfig();
  const [expanded, setExpanded] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative min-h-screen bg-[#04020f] pt-24 md:pt-28 pb-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(139,92,246,0.14),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.08),transparent_40%)]" />
      <SectionBackdrop />

      {/* Cloudflare Magic Transit Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F48120] via-[#FA6400] to-[#F48120] py-6 md:py-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMDQwIDAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
                <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                  Protected by Cloudflare Magic Transit
                </h3>
                <p className="text-white/90 text-xs md:text-sm font-semibold mt-0.5">
                  Enterprise-grade DDoS protection with 500 Tbps network capacity
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3 bg-white/15 backdrop-blur-md rounded-xl px-4 md:px-6 py-3 border border-white/25">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-white leading-none">500</p>
                <p className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-wider mt-0.5">Tbps</p>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-center">
                <p className="text-base md:text-lg font-bold text-white">DDoS</p>
                <p className="text-white/90 text-[10px] md:text-xs font-semibold">Protection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
        <Link
          href="/contactus-info"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to contact
        </Link>

        <ScrollReveal direction="up" blur distance={44} className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-violet-200/90">
            <HelpCircle size={14} />
            {header.badge}
          </div>
          <h1 className="mt-4 text-white text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
            {header.title}{" "}
            <span className="bg-linear-to-br from-violet-300 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {header.accent}
            </span>
          </h1>
          <p className="mt-3 text-zinc-300/75 text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            {header.description}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.06} className="mb-8">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center text-zinc-500 py-12 text-sm">
              No questions match your search.
            </p>
          ) : (
            filtered.map((item, i) => {
              const index = items.indexOf(item);
              const isOpen = expanded === index;
              const displayNum = String(index + 1).padStart(2, "0");

              return (
                <ScrollReveal
                  key={index}
                  direction="up"
                  delay={Math.min(i * 0.02, 0.2)}
                  distance={20}
                >
                  <motion.div
                    layout
                    className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
                      isOpen
                        ? "border-violet-500/40 bg-violet-950/20 premium-glow"
                        : "border-white/10 glass-panel hover:border-white/15"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : index)}
                      className="w-full flex items-start gap-4 px-5 py-4 md:py-5 text-left group"
                    >
                      <span
                        className={`shrink-0 mt-0.5 text-[11px] font-black tabular-nums px-2 py-1 rounded-lg border ${
                          isOpen
                            ? "border-violet-400/40 bg-violet-500/20 text-violet-200"
                            : "border-white/10 bg-white/5 text-zinc-500"
                        }`}
                      >
                        {displayNum}
                      </span>
                      <span className="flex-1 text-zinc-100 font-semibold text-sm md:text-base leading-snug group-hover:text-violet-100 transition-colors">
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                        className="shrink-0 text-zinc-500 mt-1"
                      >
                        <ChevronDown size={20} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: PREMIUM_EASE }}
                        >
                          <div className="px-5 pb-5 md:pb-6 pt-0 ml-14 md:ml-[3.25rem] text-sm md:text-[15px] text-zinc-400 leading-relaxed border-t border-white/5">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </ScrollReveal>
              );
            })
          )}
        </div>

        <ScrollReveal direction="up" delay={0.1} className="mt-12 text-center">
          <p className="text-zinc-500 text-sm mb-4">Didn&apos;t find your answer?</p>
          <Link
            href="/contactus-info"
            className="inline-flex items-center gap-2 rounded-2xl border border-violet-400/30 bg-violet-500/10 px-6 py-3 text-sm font-bold text-violet-100 hover:bg-violet-500/20 hover:text-white transition-all"
          >
            Contact support
            <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
