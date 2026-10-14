"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Shield,
  Zap,
  Lock,
  Globe,
  Activity,
  X,
  Maximize2,
  ChevronDown,
} from "lucide-react";
import { GlowButton } from "@/components/motion/GlowButton";

const BG_IMAGE = "/images/corero-multi-homed-blog.png";

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    price: 299,
    checkout: "https://billing.caspian.host/products/ddos-protected-proxies/starter-ddos-protected-proxy",
    features: [
      "150% CPU",
      "2GB RAM",
      "500 Tbps DDoS Protection",
      "Cloudflare Magic Transit",
      "TCP + UDP Support",
      "Enterprise Filtering",
      "Random Port",
      "24/7 Support Ticket",
    ],
  },
  {
    id: "professional",
    name: "Professional Plan",
    price: 499,
    checkout: "https://billing.caspian.host/products/ddos-protected-proxies/professional-ddos-protected-proxy",
    features: [
      "250% CPU",
      "4GB RAM",
      "500 Tbps DDoS Protection",
      "Cloudflare Magic Transit",
      "TCP + UDP Support",
      "Enterprise Filtering by Cloudflare",
      "Random Port (except 19132 & 25565)",
      "Dedicated Support",
    ],
    best: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    price: 999,
    checkout: "https://billing.caspian.host/products/ddos-protected-proxies/entreprise-ddos-protected-proxy",
    features: [
      "400% CPU",
      "8GB RAM",
      "500 Tbps DDoS Protection",
      "Cloudflare Magic Transit",
      "TCP + UDP Support",
      "Enterprise Filtering by Cloudflare",
      "Down = Refund Guarantee",
      "19132 Port Included",
      "Dedicated Support",
    ],
  },
];

export default function DdosProtectedProxyPage() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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
        <section className="relative mb-8 overflow-hidden rounded-lg border border-white/10 bg-black/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/[0.07] blur-3xl" />

          <div className="relative mb-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="group inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-white transition hover:border-emerald-500/40 hover:bg-black/55 sm:text-sm"
            >
              <ArrowLeft className="h-3 w-3 transition group-hover:-translate-x-0.5" />
              Back to home
            </Link>
          </div>

          <div className="relative space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:text-xs">
              <Shield className="h-3 w-3 text-emerald-400" strokeWidth={2} />
              Security Services
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              DDoS Protected Proxy
            </h1>
            <p className="max-w-2xl text-sm leading-snug text-white/90 sm:text-base">
              Enterprise-grade DDoS protection powered by Cloudflare Magic Transit.
              Keep your servers online and secure. Located in India for low latency.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="relative mb-8">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-white sm:text-base">
            Why Choose Our Proxy?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "500 Tbps Protection",
                desc: "Massive DDoS mitigation capacity",
              },
              {
                icon: Zap,
                title: "Instant Activation",
                desc: "Get protected in minutes",
              },
              {
                icon: Lock,
                title: "TCP + UDP Support",
                desc: "Full protocol coverage",
              },
              {
                icon: Activity,
                title: "Real-time Monitoring",
                desc: "Live attack detection",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl border border-white/10 bg-black/45 p-4 backdrop-blur-sm transition hover:border-emerald-500/35"
              >
                <div className="mb-3 inline-flex rounded-lg border border-white/10 bg-black/50 p-2 text-emerald-300">
                  <feature.icon className="h-5 w-5" />
                </div>
                <p className="font-bold text-white">{feature.title}</p>
                <p className="mt-1 text-sm text-white">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="relative scroll-mt-24">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-white sm:text-base">
            Choose Your Plan
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-white/80 sm:text-base">
            Select the protection level that fits your needs. All plans include
            Cloudflare Magic Transit protection.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.article
                key={plan.id}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-br ${
                  plan.best
                    ? "border-emerald-500/60 from-emerald-950/40 via-zinc-950/60 to-black shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                    : index === 0
                    ? "border-cyan-500/40 from-cyan-950/30 via-zinc-950/50 to-black shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                    : "border-purple-500/40 from-purple-950/30 via-zinc-950/50 to-black shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                } backdrop-blur-xl`}
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 opacity-20 ${
                    plan.best
                      ? "bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent"
                      : index === 0
                      ? "bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent"
                      : "bg-gradient-to-br from-purple-500/20 via-transparent to-transparent"
                  }`}
                />

                {plan.best && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500/30 to-transparent px-3 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                      BEST VALUE
                    </span>
                  </div>
                )}

                <div className="relative p-6">
                  {/* Plan icon */}
                  <div
                    className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl border ${
                      plan.best
                        ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-300"
                        : index === 0
                        ? "border-cyan-400/50 bg-cyan-500/20 text-cyan-300"
                        : "border-purple-400/50 bg-purple-500/20 text-purple-300"
                    }`}
                  >
                    <Shield className="h-7 w-7" strokeWidth={2} />
                  </div>

                  <h3 className="mb-2 text-xl font-black tracking-tight text-white">
                    {plan.name}
                  </h3>

                  {/* Price section */}
                  <div className="mb-6 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                      Monthly Price
                    </p>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">
                        ₹{plan.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm font-medium text-white/60">/mo</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="mb-6 flex flex-1 flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-white/90"
                      >
                        <div
                          className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border ${
                            plan.best
                              ? "border-emerald-400/50 bg-emerald-500/20"
                              : index === 0
                              ? "border-cyan-400/50 bg-cyan-500/20"
                              : "border-purple-400/50 bg-purple-500/20"
                          } flex items-center justify-center`}
                        >
                          <Check
                            className="h-3 w-3"
                            strokeWidth={3}
                            style={{
                              color: plan.best
                                ? "#34d399"
                                : index === 0
                                ? "#22d3ee"
                                : "#a855f7",
                            }}
                          />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.a
                    href={plan.checkout}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full rounded-xl py-4 text-base font-bold text-white transition-all ${
                      plan.best
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-[0_8px_24px_rgba(16,185,129,0.4)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.5)]"
                        : index === 0
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-[0_8px_24px_rgba(34,211,238,0.3)] hover:shadow-[0_12px_32px_rgba(34,211,238,0.4)]"
                        : "bg-gradient-to-r from-purple-500 to-purple-600 shadow-[0_8px_24px_rgba(168,85,247,0.3)] hover:shadow-[0_12px_32px_rgba(168,85,247,0.4)]"
                    }`}
                  >
                    Get Started
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Cloudflare Protection Info */}
        <section className="relative mb-8 mx-auto max-w-3xl">
          {/* Left animated arrow */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 pr-4"
          >
            <ChevronDown className="h-8 w-8 text-emerald-400" strokeWidth={2} />
          </motion.div>

          {/* Right animated arrow */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 pl-4"
          >
            <ChevronDown className="h-8 w-8 text-emerald-400" strokeWidth={2} />
          </motion.div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 backdrop-blur-md">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-emerald-400" strokeWidth={2} />
                <h2 className="text-lg font-bold text-white">
                  Protected by Cloudflare Magic Transit
                </h2>
              </div>
              <p className="text-base font-semibold text-emerald-300">
                500 Tbps DDoS Protection
              </p>
              <p className="text-xs text-white/80">
                Supports TCP + UDP traffic
              </p>

              {/* Cloudflare Protection Image */}
              <div className="mt-4 w-full max-w-2xl">
                <div className="relative group cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
                  <img
                    src="/images/2506deda-05c5-47db-bf9d-d8ce29a128e4.png"
                    alt="Cloudflare Magic Transit Protection"
                    className="w-full h-auto rounded-lg border border-emerald-500/30 shadow-lg transition-transform group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white backdrop-blur-sm">
                      <Maximize2 className="h-4 w-4" />
                      <span className="text-sm font-semibold">Click to preview</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <GlowButton
                    href="#plans"
                    variant="golden"
                    className="text-sm px-6 py-3"
                  >
                    View Plans
                  </GlowButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute -top-12 right-0 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
                <span className="text-sm font-semibold">Close</span>
              </button>
              <img
                src="/images/2506deda-05c5-47db-bf9d-d8ce29a128e4.png"
                alt="Cloudflare Magic Transit Protection"
                className="w-full h-auto rounded-lg border border-emerald-500/30 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
