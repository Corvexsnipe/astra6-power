"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  AlertTriangle,
  FileText,
  Scale,
  Shield,
  RefreshCw,
} from "lucide-react";
import tos from "@/config/legal/terms-of-service.json";
import privacy from "@/config/legal/privacy-policy.json";
import sla from "@/config/legal/service-level-agreement.json";
import refund from "@/config/legal/refund-policy.json";
import cancellation from "@/config/legal/cancellation-policy.json";
import aboutUs from "@/config/legal/about-us.json";
import { SectionBackdrop } from "@/components/motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PREMIUM_EASE } from "@/lib/motion";

type PolicyItem = {
  title: string;
  desc: string;
};

type ImportantNotice = {
  type: string;
  title: string;
  desc: string;
};

type PolicyData = {
  title: string;
  lastUpdated: string;
  description: string;
  importantNotice?: ImportantNotice;
  policies: PolicyItem[];
};

const policyMap: Record<string, PolicyData> = {
  "terms-of-service": tos,
  "privacy-policy": privacy,
  "service-level-agreement": sla,
  "refund-policy": refund,
  "cancellation-policy": cancellation,
  "about-us": aboutUs,
};

const policyMeta: Record<
  string,
  { icon: typeof FileText; accent: string; label: string }
> = {
  "terms-of-service": {
    icon: Scale,
    accent: "from-violet-500 to-purple-600",
    label: "Legal",
  },
  "privacy-policy": {
    icon: Shield,
    accent: "from-cyan-500 to-violet-600",
    label: "Privacy",
  },
  "service-level-agreement": {
    icon: FileText,
    accent: "from-indigo-500 to-violet-600",
    label: "SLA",
  },
  "refund-policy": {
    icon: RefreshCw,
    accent: "from-fuchsia-500 to-violet-600",
    label: "Refunds",
  },
  "cancellation-policy": {
    icon: RefreshCw,
    accent: "from-rose-500 to-violet-600",
    label: "Cancellation",
  },
  "about-us": {
    icon: FileText,
    accent: "from-emerald-500 to-violet-600",
    label: "About",
  },
};

const legalLinks = [
  { slug: "terms-of-service", title: "Terms of Service" },
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "service-level-agreement", title: "SLA" },
  { slug: "refund-policy", title: "Refund Policy" },
  { slug: "cancellation-policy", title: "Cancellation Policy" },
  { slug: "about-us", title: "About Us" },
];

export default function PolicyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = policyMap[slug];
  const meta = policyMeta[slug] ?? policyMeta["terms-of-service"];
  const Icon = meta.icon;

  if (!data) {
    return (
      <div className="min-h-screen bg-[#04020f] text-zinc-400 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-lg font-semibold text-white mb-4">Policy not found</p>
          <Link href="/" className="text-violet-400 hover:text-white text-sm font-bold">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#04020f] text-zinc-200 pt-24 md:pt-28 pb-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.1),transparent_45%)]" />
      <SectionBackdrop />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        {/* Legal nav */}
        <ScrollReveal direction="up" blur distance={32} className="mb-8">
          <div className="flex flex-wrap gap-2">
            {legalLinks.map((link) => (
              <Link
                key={link.slug}
                href={`/legal/${link.slug}`}
                className={`rounded-full px-4 py-2 text-xs font-bold border transition-all ${
                  slug === link.slug
                    ? "bg-violet-600/30 border-violet-500/50 text-white"
                    : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-white bg-black/40"
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* Hero card */}
        <ScrollReveal direction="up" blur distance={40} className="mb-8">
          <div className="rounded-3xl p-[1px] bg-linear-to-br from-violet-500/40 via-white/10 to-fuchsia-500/30 premium-glow">
            <div className="rounded-[23px] bg-zinc-950/90 backdrop-blur-xl border border-white/10 p-8 md:p-10">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div
                  className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${meta.accent} text-white shadow-lg`}
                >
                  <Icon size={26} />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-300/90 mb-2">
                    {meta.label}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {data.title}
                  </h1>
                  <p className="mt-2 text-sm text-zinc-500">
                    Last updated · {data.lastUpdated}
                  </p>
                  <p className="mt-4 text-zinc-300 text-base md:text-lg leading-relaxed">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {data.importantNotice && (
          <ScrollReveal direction="up" delay={0.05} className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: PREMIUM_EASE }}
              className="rounded-2xl border border-amber-500/35 bg-amber-950/25 p-6 md:p-8"
            >
              <div className="flex gap-3">
                <AlertTriangle className="shrink-0 text-amber-400 mt-0.5" size={22} />
                <div>
                  <h3 className="text-lg font-bold text-amber-200 mb-2">
                    {data.importantNotice.title}
                  </h3>
                  <p className="text-amber-100/80 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {data.importantNotice.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        )}

        {slug === "about-us" ? (
          <ScrollReveal direction="up" delay={0.05} className="mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE }}
                className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 border border-violet-400/30">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Founder</h2>
                    <p className="text-violet-300 text-sm font-semibold">Rehan Haider</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  Rehan Haider is the founder and mastermind behind Caspian Host. As the visionary leader, Rehan Haider is responsible for the overall strategic direction and innovation of the hosting platform.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.1 }}
                className="rounded-2xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/5 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-500/20 border border-fuchsia-400/30">
                    <span className="text-2xl">👩‍💼</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Founder</h2>
                    <p className="text-fuchsia-300 text-sm font-semibold">Kathith Thakur</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  Kathith Thakur is a founder of Caspian Host. As Founder, Kathith Thakur oversees the management, operation, and legal aspects of the hosting services.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.2 }}
                className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-violet-500/5 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-400/30">
                    <span className="text-2xl">👩‍💼</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Founder</h2>
                    <p className="text-cyan-300 text-sm font-semibold">Somya Choudhary</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                  Somya Choudhary is a founder of Caspian Host. As Founder, Somya Choudhary oversees strategic operations and business development initiatives.
                </p>
              </motion.div>
            </div>
          </ScrollReveal>
        ) : null}

        <div className="space-y-4">
          {data.policies.map((item, i) => {
            if (slug === "about-us" && (item.title === "Founder" || item.title === "Director" || item.title === "Co-Director")) {
              return null;
            }
            return (
              <ScrollReveal key={i} direction="up" delay={Math.min(i * 0.03, 0.15)} distance={28}>
                <article className="rounded-2xl border border-white/10 glass-panel p-6 md:p-8 hover:border-violet-500/20 transition-colors duration-300">
                  <div className="flex gap-4">
                    <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15 border border-violet-400/25 text-[11px] font-black text-violet-300 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug">
                        {item.title}
                      </h2>
                      <p className="text-zinc-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal direction="up" delay={0.1} className="mt-12 text-center">
          <p className="text-zinc-500 text-sm mb-4">Questions about this policy?</p>
          <Link
            href="/contactus-info"
            className="inline-flex items-center gap-2 rounded-2xl border border-violet-400/30 bg-violet-500/10 px-6 py-3 text-sm font-bold text-violet-200 hover:bg-violet-500/20 hover:text-white transition-all"
          >
            Contact support
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
