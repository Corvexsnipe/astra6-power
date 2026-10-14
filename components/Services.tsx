"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionBackdrop } from "@/components/motion";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";
import {
  ArrowRight,
  Cpu,
  Gamepad2,
  Globe,
  Headphones,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

const serviceCards = [
  {
    title: "Minecraft Hosting",
    description: "Ultra-low latency Minecraft hosting with premium hardware and instant setup.",
    price: "From ₹40/GB",
    href: "/game-hosting",
    icon: Shield,
    image: "https://i.postimg.cc/dQdwsqd8/image.png",
    theme: {
      glow: "from-violet-500/40 to-fuchsia-500/20",
      title: "from-white to-violet-300",
      button: "from-violet-500 to-fuchsia-600",
      badge: "bg-violet-500/75 border-violet-300/55",
      icon: "text-violet-200 bg-violet-500/30 border-violet-300/40",
    },
    features: ["Instant Setup", "DDoS Protection", "24/7 Support"],
  },
  {
    title: "Game Hosting",
    description: "Optimized environments for modern multiplayer titles and custom game stacks.",
    price: "Explore game plans",
    href: "/game-hosting",
    icon: Gamepad2,
    image: "https://i.postimg.cc/jqNcZ9V1/image.png",
    theme: {
      glow: "from-violet-500/40 to-indigo-500/20",
      title: "from-white to-violet-300",
      button: "from-violet-500 to-indigo-600",
      badge: "bg-violet-500/75 border-violet-300/55",
      icon: "text-violet-200 bg-violet-500/30 border-violet-300/40",
    },
    features: ["Low Latency", "Mod & Plugin Support", "One-Click Install"],
  },
  {
    title: "DDoS Protected Proxy",
    description: "Cloudflare Magic Transit with 500 Tbps DDoS protection for TCP + UDP traffic.",
    price: "Starting at ₹499/mo",
    href: "/ddos-protected-proxy",
    icon: Shield,
    image: "/images/corero-multi-homed-blog.png",
    theme: {
      glow: "from-emerald-500/40 to-cyan-500/20",
      title: "from-white to-emerald-300",
      button: "from-emerald-500 to-cyan-600",
      badge: "bg-emerald-500/75 border-emerald-300/55",
      icon: "text-emerald-200 bg-emerald-500/30 border-emerald-300/40",
    },
    features: ["500 Tbps Protection", "TCP + UDP Support", "Cloudflare Magic Transit"],
  },
  {
    title: "VPS Hosting",
    description: "Flexible virtual private servers with full root access and scalable resources.",
    price: "Starting at $9.99/mo",
    href: "/root-servers",
    icon: Server,
    image: "https://i.postimg.cc/Pf36LZjZ/image.png",
    theme: {
      glow: "from-sky-500/40 to-blue-500/20",
      title: "from-white to-sky-300",
      button: "from-sky-500 to-blue-600",
      badge: "bg-sky-500/75 border-sky-300/55",
      icon: "text-sky-200 bg-sky-500/30 border-sky-300/40",
    },
    features: ["Full Root Access", "SSD NVMe Storage", "Scalable Resources"],
    comingSoon: true,
  },
];

const Services = () => {
  const serviceStats = [
    {
      icon: Globe,
      title: "Global Network",
      text: "Servers in 20+ locations worldwide",
      iconClass: "text-violet-300",
    },
    {
      icon: Shield,
      title: "DDoS Protection",
      text: "Enterprise-grade protection always enabled",
      iconClass: "text-fuchsia-300",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      text: "Expert support anytime you need it",
      iconClass: "text-indigo-300",
    },
    {
      icon: Zap,
      title: "99.9% Uptime",
      text: "Reliable infrastructure you can count on",
      iconClass: "text-violet-300",
    },
  ];

  return (
    <section className="w-full py-20 relative z-10 overflow-hidden bg-black">
      <SectionBackdrop />
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative">
        <ScrollReveal direction="up" blur distance={40} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-600/15 px-4 py-1.5 text-xs font-semibold text-violet-100">
            <Sparkles size={14} />
            Built for Gamers. Powered for Performance.
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
            Our{" "}
            <span className="bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 text-md font-bold">
            Premium infrastructure crafted for modern gaming and cloud workloads.
          </p>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5" stagger={0.06}>
          {serviceCards.map((service) => {
            const ServiceIcon = service.icon;
            return (
            <StaggerItem key={service.title} blur distance={32}>
            <TiltCard
              intensity={5}
              className={`group relative rounded-3xl p-[1px] bg-linear-to-br ${service.theme.glow} shadow-[0_10px_35px_rgba(76,29,149,0.35)] h-full`}
            >
              <Link
                href={service.href}
                className="block rounded-[23px] overflow-hidden bg-black/55 border border-white/12 backdrop-blur-xl transition-all duration-300 group-hover:border-white/30"
              >
                <div className="relative flex flex-col">
                  <div className="relative h-44 overflow-hidden border-b border-white/10">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
                    <span
                      className={`absolute left-3 top-3 text-[10px] font-bold text-white rounded-full px-2.5 py-1 border backdrop-blur-sm ${service.theme.badge}`}
                    >
                      {service.comingSoon ? "Coming Soon" : service.price}
                    </span>
                    <div
                      className={`absolute right-3 top-3 w-8 h-8 rounded-lg border flex items-center justify-center ${service.theme.icon}`}
                    >
                      <ServiceIcon size={15} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3
                      className={`text-xl font-extrabold bg-linear-to-r ${service.theme.title} bg-clip-text text-transparent`}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-2 text-zinc-300 text-sm leading-snug font-medium min-h-12">
                      {service.description}
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-zinc-300 text-xs">
                          <Rocket size={13} className="text-violet-300 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <span
                        className={`inline-flex w-full items-center justify-center gap-1 text-sm font-bold text-white bg-linear-to-r ${service.theme.button} px-3 py-2 rounded-xl`}
                      >
                        View Plans <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </TiltCard>
            </StaggerItem>
            );
          })}
        </StaggerReveal>

        <ScrollReveal direction="up" delay={0.1} className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 rounded-2xl border border-white/10 glass-panel p-4">
          {serviceStats.map((stat) => (
            <motion.div key={stat.title} whileHover={{ y: -2 }} className="flex items-start gap-3">
              <div className="mt-0.5">
                <stat.icon size={16} className={stat.iconClass} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{stat.title}</p>
                <p className="text-xs text-zinc-400">{stat.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;