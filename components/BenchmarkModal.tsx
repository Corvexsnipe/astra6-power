"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Activity,
  Cpu,
  Gauge,
  Layers,
  X,
  Zap,
} from "lucide-react";
import benchmarkData from "@/config/home/cpu-benchmarks.json";
import { PREMIUM_EASE } from "@/lib/motion";

type CpuBenchmark = (typeof benchmarkData.cpus)[number];

const BADGE_STYLES: Record<string, string> = {
  cyan: "border-cyan-400/40 bg-cyan-500/15 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.25)]",
  violet:
    "border-violet-400/40 bg-violet-500/15 text-violet-200 shadow-[0_0_24px_rgba(139,92,246,0.3)]",
  emerald:
    "border-emerald-400/40 bg-emerald-500/15 text-emerald-200 shadow-[0_0_24px_rgba(52,211,153,0.25)]",
  fuchsia:
    "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-200 shadow-[0_0_24px_rgba(217,70,239,0.25)]",
};

const CARD_STAGGER_MS = 720;
const LOAD_BAR_MS = 1100;
const STAT_STAGGER_MS = 180;

function useCountUp(
  target: number,
  active: boolean,
  duration = 900,
  decimals = 0,
) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (reduce) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next =
        decimals > 0
          ? Math.round(target * eased * Math.pow(10, decimals)) /
            Math.pow(10, decimals)
          : Math.round(target * eased);
      setValue(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, decimals, reduce]);

  return value;
}

function ModalParticles() {
  const dots = [
    { x: "12%", y: "18%", d: 0 },
    { x: "78%", y: "22%", d: 0.4 },
    { x: "88%", y: "68%", d: 0.8 },
    { x: "24%", y: "72%", d: 1.2 },
    { x: "52%", y: "12%", d: 0.6 },
    { x: "65%", y: "84%", d: 1 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-violet-400/40 blur-[1px]"
          style={{ left: dot.x, top: dot.y }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4 + dot.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.d,
          }}
        />
      ))}
      <motion.div
        className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-violet-600/20 blur-[100px]"
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-cyan-500/15 blur-[90px]"
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

type CardPhase = "hidden" | "loading" | "stats" | "done";

function CpuBenchmarkCard({
  cpu,
  index,
  sequenceStarted,
}: {
  cpu: CpuBenchmark;
  index: number;
  sequenceStarted: boolean;
}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<CardPhase>("hidden");
  const [loadProgress, setLoadProgress] = useState(0);
  const showStats = phase === "stats" || phase === "done";
  const showBadge = phase === "done";

  const ghz = useCountUp(cpu.ghz, showStats && sequenceStarted, 850, 1);
  const cores = useCountUp(cpu.cores, showStats && sequenceStarted, 800);
  const threads = useCountUp(cpu.threads, showStats && sequenceStarted, 850);
  const singleThread = useCountUp(
    cpu.singleThreadRating,
    showStats && sequenceStarted,
    1100,
  );

  useEffect(() => {
    if (!sequenceStarted) return;

    const showTimer = window.setTimeout(() => setPhase("loading"), index * CARD_STAGGER_MS);
    const statsTimer = window.setTimeout(
      () => setPhase("stats"),
      index * CARD_STAGGER_MS + LOAD_BAR_MS,
    );
    const doneTimer = window.setTimeout(
      () => setPhase("done"),
      index * CARD_STAGGER_MS + LOAD_BAR_MS + 1400,
    );

    return () => {
      clearTimeout(showTimer);
      clearTimeout(statsTimer);
      clearTimeout(doneTimer);
    };
  }, [sequenceStarted, index]);

  useEffect(() => {
    if (phase !== "loading" || reduce) {
      if (phase === "loading" && reduce) setLoadProgress(100);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = LOAD_BAR_MS - 120;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setLoadProgress(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, reduce]);

  const visible = phase !== "hidden";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 28, scale: 0.96 }
      }
      transition={{ duration: 0.55, ease: PREMIUM_EASE }}
      whileHover={{
        y: -4,
        scale: 1.015,
        boxShadow: "0 0 40px rgba(139, 92, 246, 0.2)",
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0814]/80 p-4 md:p-5 backdrop-blur-xl transition-shadow"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-violet-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.35), transparent 40%, rgba(34,211,238,0.25))",
        }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-violet-300">
            <Cpu size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Node {index + 1}
            </p>
            <h3 className="truncate text-sm font-bold text-white md:text-base">
              {cpu.name}
            </h3>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
            cpu.vendor === "intel"
              ? "border-sky-400/35 bg-sky-500/10 text-sky-200"
              : "border-[#ED1C24]/40 bg-[#ED1C24]/10 text-[#ff8a8a]"
          }`}
        >
          {cpu.vendor === "intel" ? "Intel" : "AMD"}
        </span>
      </div>

      {phase === "loading" && (
        <div className="relative mt-4 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            <span>Benchmark load</span>
            <span className="tabular-nums text-violet-300">{loadProgress}%</span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-zinc-900 ring-1 ring-inset ring-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-violet-600 via-cyan-400 to-violet-500"
              style={{ width: `${loadProgress}%` }}
              transition={{ ease: PREMIUM_EASE }}
            />
            <motion.div
              className="absolute inset-y-0 w-24 bg-linear-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="relative mt-4 grid grid-cols-2 gap-2.5"
          >
            {[
              {
                icon: Gauge,
                label: "GHz",
                value: `${ghz.toFixed(1)}`,
                sub: cpu.ghzLabel,
              },
              {
                icon: Layers,
                label: "Cores",
                value: `${cores}`,
                sub: "physical",
              },
              {
                icon: Activity,
                label: "Threads",
                value: `${threads}`,
                sub: "logical",
              },
              {
                icon: Zap,
                label: "Single Thread",
                value: singleThread.toLocaleString("en-US"),
                sub: "rating",
              },
            ].map((stat, si) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: si * (STAT_STAGGER_MS / 1000),
                  duration: 0.4,
                  ease: PREMIUM_EASE,
                }}
                className="rounded-xl border border-white/[0.06] bg-black/40 px-3 py-2.5"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  <stat.icon size={11} className="text-violet-400" />
                  {stat.label}
                </div>
                <p className="mt-1 text-lg font-black tabular-nums text-white">
                  {stat.value}
                </p>
                <p className="text-[10px] text-zinc-500">{stat.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className="relative mt-4 flex justify-center"
          >
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${
                BADGE_STYLES[cpu.badgeStyle] ?? BADGE_STYLES.violet
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {cpu.badge}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

type BenchmarkModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function BenchmarkModal({ open, onClose }: BenchmarkModalProps) {
  const [mounted, setMounted] = useState(false);
  const [labelIndex, setLabelIndex] = useState(0);
  const [sequenceStarted, setSequenceStarted] = useState(false);
  const reduce = useReducedMotion();
  const { cpus, statusLabels } = benchmarkData;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) {
      setLabelIndex(0);
      setSequenceStarted(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const startSeq = window.setTimeout(
      () => setSequenceStarted(true),
      reduce ? 0 : 400,
    );
    const labelInterval = window.setInterval(() => {
      setLabelIndex((i) => (i + 1) % statusLabels.length);
    }, 2200);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(startSeq);
      clearInterval(labelInterval);
    };
  }, [open, reduce, statusLabels.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="benchmark-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.45, ease: PREMIUM_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[min(92vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-violet-400/25 bg-[#06040f]/95 shadow-[0_0_80px_rgba(109,40,217,0.35),0_0_120px_rgba(34,211,238,0.08)] backdrop-blur-2xl"
          >
            <ModalParticles />

            <div className="relative shrink-0 border-b border-white/10 px-5 py-4 md:px-7 md:py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300/80">
                    Enterprise benchmark suite
                  </p>
                  <h2
                    id="benchmark-modal-title"
                    className="mt-1 text-xl font-black text-white md:text-2xl"
                  >
                    CPU Performance{" "}
                    <span className="bg-linear-to-r from-violet-300 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                      Intelligence
                    </span>
                  </h2>
                </div>
                <motion.button
                  type="button"
                  onClick={onClose}
                  aria-label="Close benchmarks"
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-zinc-300 transition-colors hover:border-violet-400/40 hover:bg-violet-500/20 hover:text-white"
                >
                  <X size={18} />
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={labelIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="mt-3 flex items-center gap-2 text-sm font-medium text-violet-200/90"
                >
                  <motion.span
                    className="inline-block h-2 w-2 rounded-full bg-cyan-400"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  {statusLabels[labelIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="relative flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-5">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {cpus.map((cpu, index) => (
                  <CpuBenchmarkCard
                    key={cpu.id}
                    cpu={cpu}
                    index={index}
                    sequenceStarted={sequenceStarted}
                  />
                ))}
              </div>
            </div>

            <div className="relative shrink-0 border-t border-white/10 px-5 py-3 md:px-7">
              <p className="text-center text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                Synthetic enterprise workload · Results for infrastructure planning
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
