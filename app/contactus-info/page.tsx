"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Headphones,
  HelpCircle,
  MessageCircle,
  MapPin,
  Building,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { getContactConfig } from "@/lib/contact";
import { SectionBackdrop } from "@/components/motion";
import { GlowButton } from "@/components/motion/GlowButton";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";

export default function ContactUsInfoPage() {
  const { header, faqButton, supportChannels, contactDetails } = getContactConfig();

  const channels = [
    {
      id: "faq",
      type: "link" as const,
      data: faqButton,
      icon: HelpCircle,
      accent: "from-violet-500 via-purple-600 to-fuchsia-600",
      border: "border-violet-500/45",
      glow: "shadow-[0_12px_40px_rgba(139,92,246,0.3)]",
      cta: "Browse FAQ",
    },
    {
      id: "discord",
      type: "external" as const,
      data: supportChannels.discord,
      icon: FaDiscord,
      accent: "from-[#5865F2] to-indigo-600",
      border: "border-[#5865F2]/40",
      glow: "shadow-[0_12px_40px_rgba(88,101,242,0.25)]",
      cta: "Open Discord",
    },
    {
      id: "website",
      type: "external" as const,
      data: supportChannels.website,
      icon: Globe,
      accent: "from-cyan-500 to-violet-600",
      border: "border-cyan-500/35",
      glow: "shadow-[0_12px_40px_rgba(34,211,238,0.18)]",
      cta: "Open support",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#04020f] pt-24 md:pt-28 pb-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.12),transparent_50%)]" />
      <SectionBackdrop />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <ScrollReveal direction="up" blur distance={44} className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-violet-200/90">
            <Headphones size={14} />
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

        {contactDetails?.enabled && (
          <ScrollReveal direction="up" delay={0.05} className="mb-10">
            <div className="rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl p-6 md:p-8">
              <h2 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                <Building size={20} className="text-violet-400" />
                Contact Information
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                    <Building size={18} className="text-violet-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Founder</p>
                    <p className="text-white font-medium">{contactDetails.founder}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-fuchsia-500/10">
                    <Building size={18} className="text-fuchsia-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Founder</p>
                    <p className="text-white font-medium">{contactDetails.founder2}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                    <Building size={18} className="text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Founder</p>
                    <p className="text-white font-medium">{contactDetails.founder3}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 md:col-span-2">
                  <div className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                    <MapPin size={18} className="text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Address 1</p>
                    <p className="text-white font-medium whitespace-pre-line">{contactDetails.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 md:col-span-2">
                  <div className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                    <MapPin size={18} className="text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Address 2</p>
                    <p className="text-white font-medium whitespace-pre-line">{contactDetails.address2}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 md:col-span-2">
                  <div className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Mail size={18} className="text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-white font-medium">{contactDetails.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        <StaggerReveal className="flex flex-col gap-4" stagger={0.08}>
          {channels.map(({ id, type, data, icon: Icon, accent, border, glow, cta }) => {
            if (!data.enabled) return null;
            const isPlaceholder = type === "external" && data.href === "#";

            const inner = (
              <div className="h-full border border-white/10 bg-zinc-950/80 backdrop-blur-xl rounded-2xl p-6 md:p-7 flex flex-col sm:flex-row sm:items-center gap-5 hover:border-violet-500/30 transition-colors">
                <div
                  className={`inline-flex w-14 h-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${accent} text-white`}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white text-lg font-bold">{data.label}</h2>
                  <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">
                    {data.description}
                  </p>
                </div>
                <span className="inline-flex items-center justify-center gap-2 shrink-0 text-sm font-semibold text-violet-300 group-hover:text-white transition-colors">
                  {isPlaceholder ? "Coming soon" : cta}
                  {type === "link" ? (
                    <ArrowRight size={16} />
                  ) : (
                    <MessageCircle size={15} />
                  )}
                </span>
              </div>
            );

            return (
              <StaggerItem key={id} blur distance={32}>
                {type === "link" ? (
                  <Link href={data.href} className="group block">
                    <motion.div
                      whileHover={{ y: -3, scale: 1.005 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {inner}
                    </motion.div>
                  </Link>
                ) : (
                  <motion.a
                    href={isPlaceholder ? undefined : data.href}
                    target={isPlaceholder ? undefined : "_blank"}
                    rel={isPlaceholder ? undefined : "noopener noreferrer"}
                    onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
                    whileHover={{ y: -3, scale: 1.005 }}
                    whileTap={{ scale: 0.99 }}
                    className={`group block ${isPlaceholder ? "cursor-default opacity-90" : ""}`}
                  >
                    {inner}
                  </motion.a>
                )}
              </StaggerItem>
            );
          })}
        </StaggerReveal>

        <ScrollReveal direction="up" delay={0.1} className="mt-12 text-center">
          <p className="text-zinc-500 text-sm mb-5">
            Need a plan first? Explore our game hosting options.
          </p>
          <GlowButton href="/game-hosting" variant="outline">
            Browse hosting plans
          </GlowButton>
        </ScrollReveal>
      </div>
    </div>
  );
}
