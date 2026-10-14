"use client";

import React, { useEffect, useMemo, useState } from "react";
import AppImage from "@/components/AppImage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Box,
  Check,
  ChevronDown,
  Cpu,
  Globe,
  HardDrive,
  Headphones,
  Server,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import minecraftBedrockPlans from "@/config/game-hosting/minecraft-bedrock-plans.json";
import { GlowButton } from "@/components/motion/GlowButton";

const BG_IMAGE = "/images/minecraftbedrockimage.png";

type LocationId = "india" | "singapore" | "europe" | "usa";
type CurrencyCode = "INR" | "USD" | "EUR";

const CURRENCY_META: Record<
  CurrencyCode,
  { label: string; compact: string; symbol: string; rateFromInr: number }
> = {
  INR: { label: "INR (₹)", compact: "₹ INR", symbol: "₹", rateFromInr: 1 },
  USD: { label: "USD ($)", compact: "$ USD", symbol: "$", rateFromInr: 0.012 },
  EUR: { label: "EUR (€)", compact: "€ EUR", symbol: "€", rateFromInr: 0.011 },
};

type CpuId =
  | "india-starter"
  | "epyc-7513"
  | "epyc-9474f"
  | "ryzen-5800x"
  | "ryzen-7900x"
  | "i7-7700k";

type CpuSpec = {
  id: CpuId;
  /** Tier shown on the plan chip (e.g. India Budget) */
  planTierLabel: string;
  /** CPU / hardware name (e.g. Intel Platinum 8168) */
  name: string;
  /** Base clock (GHz) — reference spec for display */
  ghzBase: number;
  /** Max turbo / boost (GHz) — reference spec for display */
  ghzTurbo: number;
  /** India list price: INR per GB RAM / month (before billing-term discount) */
  inrPerGb: number;
  /** Short spec line in the detail panel */
  subtitle: string;
  tagline: string;
  kind: "epyc" | "ryzen" | "intel";
  locations: LocationId[];
};

function formatCpuClockLine(ghzBase: number, ghzTurbo: number) {
  const fmt = (n: number) =>
    Number.isInteger(n) ? `${n}` : n.toFixed(1).replace(/\.0$/, "");
  return `${fmt(ghzBase)} GHz base · ${fmt(ghzTurbo)} GHz turbo`;
}

const CPUS: CpuSpec[] = [
  {
    id: "india-starter",
    planTierLabel: "India Starter",
    name: "AMD EPYC 7272",
    ghzBase: 2.9,
    ghzTurbo: 3.2,
    inrPerGb: 30,
    subtitle: "Entry level · budget friendly",
    tagline: "Best for small Bedrock realms and beginners",
    kind: "epyc",
    locations: ["india"],
  },
  {
    id: "epyc-7513",
    planTierLabel: "India Budget",
    name: "AMD EPYC 7513",
    ghzBase: 2.0,
    ghzTurbo: 3.2,
    inrPerGb: 50,
    subtitle: "Enterprise · high core count",
    tagline: "Best for small Bedrock realms and family servers",
    kind: "epyc",
    locations: ["india"],
  },
  {
    id: "epyc-9474f",
    planTierLabel: "India Advance",
    name: "AMD EPYC 9474F",
    ghzBase: 3.6,
    ghzTurbo: 4.1,
    inrPerGb: 65,
    subtitle: "High frequency EPYC",
    tagline: "Best for addons, behavior packs, and busy worlds",
    kind: "epyc",
    locations: ["india"],
  },
  {
    id: "ryzen-5800x",
    planTierLabel: "India Premium",
    name: "Ryzen 7 5800X",
    ghzBase: 3.8,
    ghzTurbo: 4.7,
    inrPerGb: 80,
    subtitle: "8 cores · strong single-thread",
    tagline: "Best for cross-play communities and minigames",
    kind: "ryzen",
    locations: ["india"],
  },
  {
    id: "ryzen-7900x",
    planTierLabel: "India Ultra",
    name: "Ryzen 9 7900X",
    ghzBase: 4.7,
    ghzTurbo: 5.6,
    inrPerGb: 110,
    subtitle: "Zen 4 · peak gaming clocks",
    tagline: "Best for high player counts and marketplace worlds",
    kind: "ryzen",
    locations: ["india"],
  },
  {
    id: "i7-7700k",
    planTierLabel: "Singapore Premium",
    name: "Intel Core i7-7700K",
    ghzBase: 4.2,
    ghzTurbo: 4.5,
    inrPerGb: 45,
    subtitle: "4 cores · 8 threads · high clocks",
    tagline: "Best for SEA Bedrock players and low-latency play",
    kind: "intel",
    locations: ["singapore"],
  },
];

type PlanCheckout = {
  monthly: string;
  threeMonths: string;
  sixMonths: string;
  yearly: string;
};

type GamePlan = {
  id: string;
  name: string;
  cpuPercent: number;
  ram: number;
  nvme: number;
  price: number;
  currency: string;
  checkout: PlanCheckout;
};

const plansConfig = minecraftBedrockPlans as {
  cpuModels: { id: string; name: string; tier: string; description: string }[];
  plansByCpu: Record<string, GamePlan[]>;
};

function gamePlanFeatures(cpuName: string, plan: GamePlan) {
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

type BillingId = "monthly" | "3m" | "6m" | "yearly";

const BILLING_CYCLES: readonly {
  id: BillingId;
  label: string;
  months: number;
  discount: number;
  best?: boolean;
}[] = [
  { id: "monthly", label: "Monthly", months: 1, discount: 0.1 },
  { id: "3m", label: "3 Months", months: 3, discount: 0.25 },
  { id: "6m", label: "6 Months", months: 6, discount: 0.35 },
  { id: "yearly", label: "Yearly", months: 12, discount: 0.43, best: true },
];

function billingDiscountLabel(discount: number) {
  if (discount <= 0) return null;
  return `${Math.round(discount * 100)}% OFF`;
}

/** Location markers (same artwork style as marketing). */
const LOCATION_FLAG_SRC: Record<LocationId, string> = {
  india: "https://i.postimg.cc/GpWRHV5z/image.png",
  singapore: "https://i.postimg.cc/cCmGkHL0/image.png",
  europe: "https://i.postimg.cc/cLjybP0N/image.png",
  usa: "https://i.postimg.cc/XN8Mbr4d/image.png",
};

const LOCATION_FLAG_ALT: Record<LocationId, string> = {
  india: "India",
  singapore: "Singapore",
  europe: "Germany",
  usa: "USA",
};

const LOCATIONS: {
  id: LocationId;
  name: string;
  active: boolean;
  soon?: boolean;
}[] = [
  { id: "india", name: "India", active: true },
  { id: "singapore", name: "Singapore", active: true },
  { id: "europe", name: "Germany", active: false, soon: true },
  { id: "usa", name: "USA", active: false, soon: true },
];

function formatMoney(amount: number, currency: CurrencyCode) {
  const meta = CURRENCY_META[currency];
  const v = amount * meta.rateFromInr;
  if (currency === "INR") {
    return `${meta.symbol}${Math.round(v).toLocaleString("en-IN")}`;
  }
  return `${meta.symbol}${v.toFixed(2)}`;
}

/** Card-style price with two decimal places. */
function formatPriceCard(amount: number, currency: CurrencyCode) {
  const meta = CURRENCY_META[currency];
  const v = amount * meta.rateFromInr;
  if (currency === "INR") {
    return `${meta.symbol}${v.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return `${meta.symbol}${v.toFixed(2)}`;
}

function LocationFlagImage({
  locationId,
  className,
  disabled,
}: {
  locationId: LocationId;
  className?: string;
  disabled?: boolean;
}) {
  const src = LOCATION_FLAG_SRC[locationId];
  const alt = `${LOCATION_FLAG_ALT[locationId]} flag`;
  return (
    <span
      className={cn(
        "relative block h-7 w-10 shrink-0 overflow-hidden rounded-md border border-white/10 bg-black/50 shadow-sm sm:h-7 sm:w-11",
        disabled && "opacity-50 grayscale",
        className,
      )}
    >
      <AppImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="44px"
      />
    </span>
  );
}

function PlanTypeVisual({ cpuId, kind }: { cpuId: CpuId; kind: "epyc" | "ryzen" | "intel" }) {
  if (cpuId === "india-starter") {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-amber-500/40 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-[7px] font-black tracking-tight text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
        START
      </div>
    );
  }
  if (cpuId === "epyc-9474f") {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-purple-500/40 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-[7px] font-black tracking-tight text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
        ADV
      </div>
    );
  }
  if (kind === "intel") {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-cyan-400/40 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-[7px] font-black tracking-tight text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
        intel
      </div>
    );
  }
  if (kind === "ryzen") {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-orange-500/35 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-[0_0_12px_rgba(249,115,22,0.15)]">
        <span className="text-[8px] font-black italic tracking-tighter text-orange-200">
          RYZEN
        </span>
      </div>
    );
  }
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-emerald-500/40 bg-gradient-to-br from-zinc-900 to-black text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.22)]">
      <Cpu className="h-[15px] w-[15px]" strokeWidth={2} />
    </div>
  );
}

export default function MinecraftBedrockConfigPage() {
  const [location, setLocation] = useState<LocationId>("india");
  const [cpuId, setCpuId] = useState<CpuId>("india-starter");
  const [billingId, setBillingId] = useState<BillingId>("monthly");
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (
        currencyRef.current &&
        !currencyRef.current.contains(e.target as Node)
      ) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const visibleCpus = useMemo(
    () => CPUS.filter((c) => c.locations.includes(location)),
    [location],
  );

  const selectedCpu = useMemo(
    () => CPUS.find((c) => c.id === cpuId) ?? CPUS[0]!,
    [cpuId],
  );

  useEffect(() => {
    setCpuId((prev) =>
      CPUS.some((c) => c.id === prev && c.locations.includes(location))
        ? prev
        : (CPUS.find((c) => c.locations.includes(location))?.id ??
            "epyc-7513"),
    );
  }, [location]);

  const billing = BILLING_CYCLES.find((b) => b.id === billingId)!;

  const billingCycleMap: Record<BillingId, keyof PlanCheckout> = {
    monthly: "monthly",
    "3m": "threeMonths",
    "6m": "sixMonths",
    yearly: "yearly",
  };

  const cpuPlans = useMemo(
    () => plansConfig.plansByCpu[cpuId] ?? [],
    [cpuId],
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden pt-16 font-sans text-white antialiased sm:pt-20">
      {/* Page backdrop: image sits in fixed layers; avoid opaque bg on this root or it paints over -z-10 children */}
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
            <Link
              href="/game-hosting"
              className="group inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-white transition hover:border-emerald-500/40 hover:bg-black/55 sm:text-[11px]"
            >
              <ArrowLeft className="h-3 w-3 transition group-hover:-translate-x-0.5" />
              Back to game hosting
            </Link>
            <div className="relative sm:ml-auto" ref={currencyRef}>
              <button
                type="button"
                onClick={() => setCurrencyOpen((o) => !o)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-black/45 px-2.5 py-1.5 text-[11px] font-semibold text-white transition hover:border-white/20 hover:bg-black/55 sm:w-auto"
              >
                {CURRENCY_META[currency].compact}
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white" />
              </button>
              <AnimatePresence>
                {currencyOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 z-20 mt-1.5 min-w-[10rem] overflow-hidden rounded-xl border border-white/10 bg-zinc-950/95 py-0.5 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl"
                  >
                    {(Object.keys(CURRENCY_META) as CurrencyCode[]).map((c) => (
                      <li key={c}>
                        <button
                          type="button"
                          className={cn(
                            "w-full px-3 py-2 text-left text-xs text-white transition hover:bg-white/10",
                            c === currency && "bg-emerald-500/15 text-white",
                          )}
                          onClick={() => {
                            setCurrency(c);
                            setCurrencyOpen(false);
                          }}
                        >
                          {CURRENCY_META[c].label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative space-y-1">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-1.5 py-px text-[8px] font-bold uppercase tracking-[0.18em] text-white sm:text-[9px]">
              <Server className="h-2.5 w-2.5 text-emerald-400" strokeWidth={2} />
              Game Servers
            </span>
            <h1 className="flex flex-wrap items-center gap-1.5 text-lg font-black tracking-tight text-white sm:text-xl">
              <span>Minecraft</span>
              <span className="text-cyan-300/95">Bedrock</span>
              <span
                className="inline-block h-3.5 w-3.5 shrink-0 rounded-sm border border-cyan-500/45 shadow-[0_0_12px_rgba(34,211,238,0.3)] sm:h-4 sm:w-4"
                style={{
                  background:
                    "linear-gradient(180deg, #9eb4c8 0%, #6b8499 45%, #4a5d6e 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
                aria-hidden
              />
            </h1>
            <p className="max-w-lg text-[10px] leading-snug text-white/90 sm:text-[11px]">
              Cross-play on console, mobile, and PC with low-latency Bedrock hosting
            </p>
          </div>
        </section>

        {/* 1. Location */}
        <section className="relative mb-3 scroll-mt-24">
          <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-xs">
            1. LOCATION
          </h2>
          <div className="rounded-xl border border-white/10 bg-black/50 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md sm:p-3">
            <div className="flex flex-wrap gap-1.5 sm:flex-nowrap sm:gap-2">
            {LOCATIONS.map((loc) => {
              const isSelected = location === loc.id;
              const disabled = loc.soon || !loc.active;
              return (
                <motion.button
                  key={loc.id}
                  type="button"
                  disabled={disabled}
                  whileHover={!disabled ? { y: -1 } : undefined}
                  onClick={() => {
                    if (!disabled) setLocation(loc.id);
                  }}
                  className={cn(
                    "relative flex min-h-[2.65rem] min-w-0 flex-1 items-center gap-2 rounded-lg border px-2 py-2 text-left transition duration-300 sm:min-h-[2.75rem]",
                    disabled &&
                      "cursor-not-allowed border-white/[0.08] bg-black/30 opacity-55 grayscale",
                    !disabled &&
                      isSelected &&
                      "border-2 border-emerald-500/75 bg-emerald-950/40 shadow-[0_0_16px_rgba(34,197,94,0.18)]",
                    !disabled &&
                      !isSelected &&
                      "border border-white/10 bg-zinc-950/70 hover:border-emerald-500/45 hover:bg-zinc-950/85",
                  )}
                >
                  {loc.soon && (
                    <span className="absolute right-1.5 top-1.5 rounded border border-amber-500/45 bg-amber-500/20 px-1 py-px text-[7px] font-black uppercase tracking-wide text-amber-200">
                      SOON
                    </span>
                  )}
                  <LocationFlagImage
                    locationId={loc.id}
                    disabled={disabled}
                    className="!h-6 !w-[2.35rem] shrink-0 sm:!h-6 sm:!w-10"
                  />
                  <span className="text-xs font-bold text-white sm:text-sm">
                    {loc.name}
                  </span>
                </motion.button>
              );
            })}
            </div>
          </div>
        </section>

        {/* 2. Billing term */}
        <section className="relative mb-2">
          <h2 className="mb-1 text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-xs">
            2. BILLING TERM
          </h2>
          <p className="mb-2 max-w-2xl text-[11px] leading-snug text-white sm:text-xs">
            Prices use your monthly rate as the base. Longer terms include the
            savings shown — same specs and checkout links.
          </p>

          <div className="w-fit max-w-full rounded-xl border border-white/20 bg-zinc-950/92 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:p-2.5">
            <div className="flex flex-wrap items-center gap-2">
              {BILLING_CYCLES.map((cycle) => {
                const active = billingId === cycle.id;
                const discountLabel = billingDiscountLabel(cycle.discount);
                return (
                  <button
                    key={cycle.id}
                    type="button"
                    onClick={() => setBillingId(cycle.id)}
                    className={cn(
                      "relative flex min-h-[3.35rem] w-[5.85rem] flex-col items-center justify-center rounded-lg px-2.5 py-2.5 text-center transition duration-300 sm:min-h-[3.5rem] sm:w-[6.35rem]",
                      active
                        ? "border-2 border-cyan-400/85 bg-cyan-950/55 shadow-[0_0_14px_rgba(34,211,238,0.2)]"
                        : "border border-white/15 bg-black/70 hover:border-white/25 hover:bg-zinc-900/90",
                    )}
                  >
                    <span className="text-xs font-bold leading-tight text-white sm:text-[13px]">
                      {cycle.label}
                    </span>
                    {discountLabel && (
                      <span
                        className={cn(
                          "mt-1 rounded-full border px-1.5 py-px text-[7px] font-black uppercase tracking-wider sm:text-[8px]",
                          active
                            ? "border-cyan-300/60 bg-cyan-400/25 text-cyan-100"
                            : "border-emerald-500/45 bg-emerald-500/20 text-emerald-200",
                        )}
                      >
                        {discountLabel}
                      </span>
                    )}
                    {cycle.best && (
                      <span className="mt-1 rounded-full border border-emerald-500/50 bg-emerald-500/90 px-1.5 py-px text-[7px] font-black uppercase tracking-wider text-black sm:text-[8px]">
                        BEST VALUE
                      </span>
                    )}
                  </button>
                );
              })}
              <GlowButton href="/migrate-to-us" variant="golden" className="text-[10px] px-4 py-2.5 sm:text-[11px]">
                Migrate Your Server
              </GlowButton>
            </div>
          </div>
        </section>

        {/* 3. Plan type (CPU) */}
        <section className="relative mb-2 scroll-mt-24">
          <h2 className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-xs">
            3. PLAN TYPE
          </h2>
          <div className={cn(
              "relative grid gap-2 sm:gap-2",
              visibleCpus.length === 1
                ? "max-w-xs grid-cols-1"
                : "grid-cols-2 sm:grid-cols-5",
            )}>
            <AnimatePresence mode="popLayout">
              {visibleCpus.map((cpu) => {
                const selected = cpu.id === cpuId;
                return (
                  <motion.button
                    layout
                    key={cpu.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setCpuId(cpu.id)}
                    className={cn(
                      "group relative min-w-0 overflow-hidden rounded-lg border text-left shadow-sm transition-all duration-300",
                      selected
                        ? "border-2 border-emerald-500/90 bg-emerald-950/60 shadow-[0_0_20px_rgba(34,197,94,0.22)] backdrop-blur-sm"
                        : "border border-white/18 bg-zinc-950/88 backdrop-blur-sm hover:border-emerald-500/55 hover:bg-zinc-900/92",
                    )}
                  >
                    <div className="relative z-10 flex items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-3.5 sm:py-3">
                      <PlanTypeVisual kind={cpu.kind} cpuId={cpu.id} />
                      <p className="min-w-0 flex-1 text-[11px] font-bold leading-snug text-white sm:text-xs">
                        {cpu.planTierLabel}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="mt-1.5 rounded-xl border border-white/10 bg-zinc-950/70 px-3 py-2.5 backdrop-blur-md sm:px-3 sm:py-2.5">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex min-w-0 flex-col gap-1 sm:flex-1">
                <span className="text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-emerald-300/95">
                  {selectedCpu.planTierLabel}
                </span>
                <div className="flex min-w-0 items-start gap-1.5">
                  <Cpu className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" strokeWidth={2} />
                  <p className="min-w-0 text-[11px] font-semibold leading-tight text-white sm:text-xs">
                    <span className="text-white">{selectedCpu.name}</span>
                    <span className="font-normal text-white/55"> · </span>
                    <span className="font-normal text-white/80">
                      {formatCpuClockLine(
                        selectedCpu.ghzBase,
                        selectedCpu.ghzTurbo,
                      )}
                    </span>
                  </p>
                </div>
                <p className="text-[10px] leading-snug text-white/65 sm:text-[11px]">
                  {selectedCpu.subtitle}
                </p>
              </div>
              <div className="hidden h-3.5 w-px shrink-0 bg-white/10 sm:block" />
              <div className="flex items-start gap-1.5 text-[11px] leading-snug text-white sm:text-xs">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" strokeWidth={2} />
                <span>{selectedCpu.tagline}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Choose plan */}
        <section className="relative mb-4">
          <h2 className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white sm:text-xs">
            4. CHOOSE PLAN
          </h2>
          <p className="mb-2 max-w-2xl text-[11px] leading-snug text-white sm:text-xs">
            Plans for{" "}
            <span className="font-semibold text-emerald-300">
              {selectedCpu.name}
            </span>
            . Totals follow your billing term and region.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cpuPlans.map((plan) => {
              const periodLabel = billing.label.toUpperCase();
              const showStrike = billing.discount > 0;
              const originalInr = plan.price * billing.months;
              const finalInr = originalInr * (1 - billing.discount);
              const isBest = plan.ram === 4;
              const features = gamePlanFeatures(selectedCpu.name, plan);
              const checkoutUrl =
                plan.checkout[billingCycleMap[billingId]] ?? "#";
              const priceSub =
                billing.months === 1
                  ? "per month"
                  : `every ${billing.months} months`;

              return (
                <motion.article
                  key={plan.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-slate-900/95 to-slate-950/95 p-5 shadow-lg backdrop-blur-md transition-all duration-300",
                    isBest
                      ? "border-emerald-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                      : "border-slate-700/50 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:border-emerald-400/60 hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]",
                  )}
                >
                  {isBest && (
                    <span className="absolute right-3 top-3 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                      BEST VALUE
                    </span>
                  )}

                  <div className="mb-3 flex items-center gap-2">
                    <img src="/images/removed-white0--logo.png" alt="Caspian" className="h-6 w-auto opacity-80" />
                    <LocationFlagImage locationId={location} />
                    <h3 className="text-2xl font-black tracking-tight text-white">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="mb-4 rounded-xl border border-emerald-500/20 bg-slate-900/50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
                      {periodLabel}
                    </p>
                    <div className="mt-1">
                      {showStrike && (
                        <p className="text-sm font-semibold text-white/40 line-through">
                          {formatPriceCard(originalInr, currency)}
                        </p>
                      )}
                      <p className="text-3xl font-black tabular-nums leading-tight text-white">
                        {formatPriceCard(finalInr, currency)}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-400">{priceSub}</p>
                    </div>
                    {billingId === "monthly" && (
                      <p className="mt-2 border-t border-white/10 pt-2 text-xs font-semibold leading-snug text-amber-200/95 sm:text-sm">
                        Limited time offer, use{" "}
                        <span className="rounded border border-amber-400/40 bg-amber-500/15 px-2 py-1 font-mono text-[10px] font-bold tracking-wide text-amber-100 sm:text-xs">
                          welcome10
                        </span>{" "}
                        coupon code at checkout to get discount.
                      </p>
                    )}
                  </div>

                  <ul className="mb-4 flex flex-1 flex-col gap-2 text-sm text-white">
                    {features.map((line) => (
                      <li key={line} className="flex items-start gap-3">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                          strokeWidth={3}
                          aria-hidden
                        />
                        <span className="leading-snug">{line}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={checkoutUrl}
                    target={checkoutUrl.startsWith("http") ? "_blank" : undefined}
                    rel={
                      checkoutUrl.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="mt-auto flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-3 text-sm font-bold text-white shadow-[0_6px_20px_rgba(34,197,94,0.4)] transition-all duration-300 hover:from-emerald-400 hover:to-emerald-500 hover:shadow-[0_8px_25px_rgba(34,197,94,0.5)] hover:-translate-y-0.5"
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
            Premium Minecraft Bedrock hosting with enterprise-grade infrastructure
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "High-Performance CPUs",
                desc: "AMD EPYC and Ryzen 9 processors with high clock speeds for optimal Minecraft server performance",
                icon: Cpu,
              },
              {
                title: "Low Latency Network",
                desc: "Premium bandwidth with optimized routing for minimal ping and smooth gameplay",
                icon: Globe,
              },
              {
                title: "Instant Deployment",
                desc: "Your Minecraft server is automatically deployed within minutes of purchase",
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
                className="rounded-xl border border-emerald-500/20 bg-slate-900/50 p-4 backdrop-blur-sm transition hover:border-emerald-500/40 hover:bg-slate-900/70"
              >
                <benefit.icon className="mb-3 h-6 w-6 text-emerald-400" strokeWidth={2} />
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
            What sets Caspian apart from other Minecraft hosting providers
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
                desc: "Built by gamers, for gamers. We understand what Minecraft players need.",
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
                className="rounded-xl border border-emerald-500/20 bg-slate-900/50 p-4 backdrop-blur-sm transition hover:border-emerald-500/40 hover:bg-slate-900/70"
              >
                <benefit.icon className="mb-3 h-6 w-6 text-emerald-400" strokeWidth={2} />
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
              desc: "Blazing chunk and world IO",
              icon: HardDrive,
              glow: "shadow-[0_0_24px_rgba(34,211,238,0.25)]",
            },
            {
              title: "DDoS protection",
              desc: "Filtered edge network",
              icon: Shield,
              glow: "shadow-[0_0_24px_rgba(16,185,129,0.28)]",
            },
            {
              title: "Instant setup",
              desc: "Server live in minutes",
              icon: Zap,
              glow: "shadow-[0_0_24px_rgba(250,204,21,0.2)]",
            },
            {
              title: "99.9% uptime",
              desc: "Redundant power & network",
              icon: Box,
              glow: "shadow-[0_0_24px_rgba(52,211,153,0.22)]",
            },
            {
              title: "24/7 expert support",
              desc: "Real humans, low wait",
              icon: Headphones,
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
