"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Gamepad2,
  Globe,
  Headphones,
  Lock,
  MapPin,
  Server,
  Shield,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import {
  AmbientParticles,
  GlowButton,
  MouseSpotlight,
  ParallaxLayer,
  TiltCard,
  useLenisScroll,
} from "@/components/motion";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";
import { PREMIUM_EASE } from "@/lib/motion";
import Partners from "./Partners";
import Features from "./Features";
import Locations from "./Locations";
import Hardware from "./Hardware";
import Services from "./Services";
import PricingComparison from "./PricingComparison";
import FAQ from "./FAQ";
import Panel from "./Panel";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import TrustCreators from "./TrustCreators";
import heroConfig from "@/config/home/hero.json";

const hostingCards = [
  {
    title: "Minecraft Hosting",
    subtitle: "Java edition optimized",
    price: "₹25",
    priceSuffix: "/GB",
    href: "/game-hosting/minecraft-java",
    bgImage: "https://i.postimg.cc/prgK28TD/image.png",
  },
  {
    title: "Minecraft Bedrock Hosting",
    subtitle: "Bedrock low-latency nodes",
    price: "₹25",
    priceSuffix: "/GB",
    href: "/game-hosting/minecraft-bedrock",
    bgImage: "https://i.postimg.cc/2SvbBD4S/image.png",
  },
  {
    title: "PocketMine Hosting",
    subtitle: "High-performance PMMP runtime",
    price: "Coming Soon",
    priceSuffix: "",
    href: "#",
    bgImage: "https://i.postimg.cc/L4B7yJjN/image.png",
    comingSoon: true,
  },
  {
    title: "Hytale Hosting",
    subtitle: "Ready for upcoming worlds",
    price: "₹25",
    priceSuffix: "/GB",
    href: "/game-hosting/hytale",
    bgImage: "https://i.postimg.cc/x8yWMC3w/image.png",
  },
];

const trustPills = [
  { icon: Zap, title: "Blazing Fast", subtitle: "Low latency worldwide" },
  { icon: Shield, title: "DDoS Protected", subtitle: "Enterprise-grade security" },
  { icon: Headphones, title: "24/7 Support", subtitle: "Always here for you" },
];

const metricPills = [
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Server, value: "100K+", label: "Servers Deployed" },
  { icon: MapPin, value: "15+", label: "Global Locations" },
  { icon: ShieldCheck, value: "500 Tbps", label: "Cloudflare Magic Transit" },
];

const HeroSection = () => {
  const { content, sections } = heroConfig;
  const { scrollTo } = useLenisScroll();
  const scrollToLocations = () => scrollTo("#global-locations-section");
  const scrollToPricing = () => scrollTo("#pricing-comparison");

  return (
    <>
      <section className="relative w-full min-h-screen flex items-center justify-center bg-[#04020f] overflow-hidden pt-28 md:pt-36">
        <ParallaxLayer speed={0.2} className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 gpu-layer"
            style={{
              backgroundImage:
                "url(https://i.postimg.cc/ZRBHPJXX/3d6b4867-c636-4b0c-abaf-2affd4b73c9a.png)",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
        </ParallaxLayer>
        <div className="absolute inset-0 z-0 bg-linear-to-b from-[#050313]/45 via-[#040210]/58 to-[#04020d]/86" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_68%_35%,rgba(139,92,246,0.13),transparent_44%),radial-gradient(circle_at_18%_8%,rgba(167,139,250,0.08),transparent_30%)] animate-gradient-shift" />
        <div className="absolute inset-0 z-0 bg-black/22" />
        <AmbientParticles count={24} />
        <MouseSpotlight />

        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute top-[24%] right-[12%] h-60 w-60 rounded-full bg-violet-600/16 blur-[120px]"
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-16 left-[16%] h-56 w-56 rounded-full bg-fuchsia-500/10 blur-[120px]"
            animate={{ x: [0, 20, 0], opacity: [0.4, 0.65, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-[1320px] mx-auto px-5 lg:px-8 xl:px-10 w-full relative z-10">
          <div
            className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-violet-600/14 rounded-full blur-[160px] -z-10 pointer-events-none"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] gap-10 lg:gap-12 xl:gap-9 items-start xl:items-center">
            <ScrollReveal
              direction="up"
              distance={52}
              blur
              scale={0.97}
              duration={0.75}
              className="text-center xl:text-left"
            >
              <div className="mb-4 md:mb-6">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: PREMIUM_EASE }}
                  className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/10 text-violet-200/90 px-3.5 py-1 text-[11px] md:text-xs font-semibold tracking-wide mb-4 md:mb-5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(167,139,250,0.9)] animate-pulse" />
                  Next-Gen Hosting. Zero Limits.
                </motion.span>
                <h1 className="text-[2.35rem] md:text-[3.2rem] lg:text-[3.9rem] xl:text-[4.4rem] font-black text-white leading-[0.93] tracking-[-0.026em]">
                  <motion.span
                    initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.65, delay: 0.08, ease: PREMIUM_EASE }}
                    className="inline-block"
                  >
                    Premium
                  </motion.span>
                  <br />
                  <motion.span
                    initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.72, delay: 0.16, ease: PREMIUM_EASE }}
                    className="inline-block bg-linear-to-b from-violet-300 via-violet-400 to-violet-600 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(139,92,246,0.5)]"
                  >
                    Game Hosting
                  </motion.span>
                </h1>
              </div>

              <ScrollReveal direction="up" distance={32} delay={0.12} duration={0.62}>
                <p className="text-zinc-300/85 text-sm md:text-base lg:text-[1.05rem] max-w-xl xl:max-w-[640px] mx-auto xl:mx-0 mb-7 md:mb-8 font-medium leading-relaxed">
                  {content.description}
                </p>
              </ScrollReveal>

              <div className="flex flex-col sm:flex-row items-center xl:items-start justify-center xl:justify-start gap-3 md:gap-3.5">
                <GlowButton href={content.primaryBtn.href} className="w-full sm:w-auto">
                  {content.primaryBtn.text} <ArrowRight size={16} />
                </GlowButton>
                <GlowButton href={content.secondaryBtn.href} variant="golden" className="w-full sm:w-auto">
                  {content.secondaryBtn.text}
                </GlowButton>
                <GlowButton onClick={scrollToPricing} variant="outline" className="w-full sm:w-auto">
                  Compare Pricing
                </GlowButton>
              </div>

              <StaggerReveal className="mt-6 md:mt-7 grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-3 max-w-[700px] mx-auto xl:mx-0" stagger={0.07}>
                {trustPills.map((pill) => (
                  <StaggerItem key={pill.title} blur distance={24}>
                    <motion.div
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="rounded-xl border border-white/12 glass-panel px-3 py-2.5 text-left premium-glow"
                    >
                      <div className="flex items-center gap-2 text-violet-200">
                        <pill.icon size={14} />
                        <span className="text-xs font-semibold">{pill.title}</span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-zinc-300/75">{pill.subtitle}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </ScrollReveal>

            <ScrollReveal
              direction="left"
              distance={48}
              blur
              delay={0.1}
              duration={0.72}
              className="relative xl:pl-2"
            >
              <div
                className="absolute inset-0 bg-linear-to-br from-violet-500/25 via-transparent to-violet-500/10 blur-3xl rounded-[28px] -z-10"
                aria-hidden="true"
              />
              <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-3.5" stagger={0.06}>
                {hostingCards.map((card, index) => (
                  <StaggerItem key={card.title} direction="up" distance={32}>
                  <TiltCard
                    intensity={5}
                    className="relative p-[1px] rounded-[18px] overflow-hidden bg-linear-to-br from-violet-400/55 via-violet-800/38 to-zinc-800/72 shadow-[0_8px_24px_rgba(76,29,149,0.42)]"
                  >
                    <div className="relative h-full min-h-[182px] bg-black/34 backdrop-blur-xl rounded-[17px] p-3 flex flex-col overflow-hidden border border-white/11">
                      {card.bgImage && (
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url(${card.bgImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          animate={{ x: ["-2%", "2%", "-2%"], scale: [1.03, 1.06, 1.03] }}
                          transition={{
                            duration: 14 + index,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "mirror",
                          }}
                        />
                      )}
                      <div className="absolute inset-0 bg-linear-to-b from-[#09071a]/38 via-[#070412]/50 to-[#06030f]/84" />
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: ["-140%", "160%"] }}
                        transition={{
                          duration: 2.4,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 2.2 + index * 0.25,
                        }}
                      />
                      <div className="relative z-10 flex items-start justify-between gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-black/45 border border-white/15 text-violet-100 flex items-center justify-center backdrop-blur-sm">
                          <Gamepad2 size={14} />
                        </div>
                        <span className="text-[8px] tracking-[0.16em] uppercase text-violet-100 font-semibold px-2 py-0.5 rounded-full border border-violet-200/30 bg-violet-500/30">
                          Premium
                        </span>
                      </div>

                      <div className="relative z-10 mt-[3.2rem]">
                        <h3 className="text-white font-bold text-[1.08rem] leading-[1.08] drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-zinc-200/80 text-[10.5px] font-medium leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.6)]">
                          {card.subtitle}
                        </p>
                      </div>

                      <div className="relative z-10 mt-auto flex items-end justify-between gap-2.5">
                        <div>
                          <p className="text-[10px] text-zinc-300/75">Starting from</p>
                          <p className="text-violet-300 font-extrabold text-[1.18rem] leading-none">
                            {card.price}
                            <span className="text-zinc-300/70 text-[11px] font-semibold"> {card.priceSuffix}</span>
                          </p>
                        </div>
                        <Link
                          href={card.href}
                          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold text-white bg-linear-to-r from-violet-500 via-violet-600 to-violet-700 shadow-[0_6px_16px_rgba(76,29,149,0.45)] transition-transform hover:scale-[1.03] border border-violet-300/35"
                        >
                          Buy Now <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" distance={40} blur delay={0.15} className="mt-2 md:mt-3">
          <div className="rounded-3xl border border-white/12 glass-panel premium-glow px-5 md:px-8 py-5 md:py-6">
            <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" stagger={0.08}>
              {metricPills.map((metric) => (
                <StaggerItem key={metric.label} distance={28}>
                <motion.div whileHover={{ y: -2 }} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-violet-300/25 bg-violet-500/12 text-violet-300 flex items-center justify-center shrink-0">
                    <metric.icon size={18} />
                  </div>
                  <div>
                    <p className="text-white text-xl md:text-2xl font-black leading-none">{metric.value}</p>
                    <p className="mt-1 text-xs md:text-sm text-zinc-300/75">{metric.label}</p>
                    {metric.label === "Global Locations" && (
                      <button
                        type="button"
                        onClick={scrollToLocations}
                        className="mt-2 inline-flex items-center gap-1 rounded-full border border-violet-300/35 bg-violet-500/20 px-3 py-1 text-[11px] font-bold text-violet-100 transition-all hover:bg-violet-500/30 hover:text-white"
                      >
                        Check Ping Now <ArrowRight size={11} />
                      </button>
                    )}
                  </div>
                </motion.div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
          </ScrollReveal>

          {sections.partners && <div className="mt-8 md:mt-10 w-full">{/* retained below hero metrics */}<Partners /></div>}
        </div>

        <div className="absolute bottom-0 left-0 w-full" />
      </section>

      {/* Cloudflare Magic Transit Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F48120] via-[#FA6400] to-[#F48120] py-4 md:py-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMDQwIDAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8 xl:px-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
                <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-white leading-tight">
                  Protected by Cloudflare Magic Transit
                </h3>
                <p className="text-white/90 text-xs md:text-sm font-semibold mt-0.5">
                  Enterprise-grade DDoS protection with 500 Tbps network capacity
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 border border-white/25">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-black text-white leading-none">500</p>
                <p className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-wider mt-0.5">Tbps</p>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <p className="text-sm md:text-base font-bold text-white">DDoS</p>
                <p className="text-white/90 text-[10px] md:text-xs font-semibold">Protection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-black py-5 md:py-20">
        <TrustCreators />
        {sections.services && <Services />}
        <PricingComparison />

        {/* Dedicated Cloudflare Magic Transit Section */}
        <section className="relative overflow-hidden bg-black py-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(244,129,32,0.15),_transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(250,100,0,0.1),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
          
          <div className="max-w-[1320px] mx-auto px-5 lg:px-8 xl:px-10 relative z-10">
            <ScrollReveal direction="up" blur distance={40} className="text-center mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 rounded-full border-2 border-[#F48120]/40 bg-[#F48120]/10 px-5 py-2 mb-6"
              >
                <ShieldCheck className="w-5 h-5 text-[#F48120]" />
                <span className="text-sm font-bold text-[#F48120] uppercase tracking-wider">Enterprise Security</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                Protected by
                <span className="bg-gradient-to-r from-[#F48120] via-[#FA6400] to-[#F48120] bg-clip-text text-transparent"> Cloudflare Magic Transit</span>
              </h2>
              <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto">
                Free enterprise-grade DDoS protection with 500 Tbps network capacity included on all game server plans for all CPU models (excluding budget plans)
              </p>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6" stagger={0.1}>
              {[
                {
                  icon: ShieldCheck,
                  title: "500 Tbps Capacity",
                  description: "Massive network scale to absorb and mitigate the largest DDoS attacks",
                  value: "500+",
                  label: "Tbps"
                },
                {
                  icon: Globe,
                  title: "Global Network",
                  description: "Protected by Cloudflare's global network spanning 300+ cities worldwide",
                  value: "300+",
                  label: "Locations"
                },
                {
                  icon: Zap,
                  title: "Instant Mitigation",
                  description: "Automatic attack detection and mitigation in under 3 seconds globally",
                  value: "<3s",
                  label: "Response"
                },
                {
                  icon: Lock,
                  title: "Layered Defense",
                  description: "Multi-layer protection against volumetric, protocol, and application attacks",
                  value: "3",
                  label: "Defense Layers"
                }
              ].map((feature, index) => (
                <StaggerItem key={feature.title} blur distance={30}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F48120]/20 via-[#FA6400]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative h-full rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl p-6 transition-all duration-300 group-hover:border-[#F48120]/40">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F48120]/20 to-[#FA6400]/10 border border-[#F48120]/30 flex items-center justify-center mb-5">
                        <feature.icon className="w-7 h-7 text-[#F48120]" />
                      </div>
                      <div className="mb-3">
                        <span className="text-4xl font-black text-white">{feature.value}</span>
                        <span className="text-sm font-semibold text-[#F48120] ml-1">{feature.label}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerReveal>

            <ScrollReveal direction="up" delay={0.2} className="mt-12 md:mt-16">
              <div className="relative rounded-3xl border border-[#F48120]/30 bg-gradient-to-br from-[#F48120]/10 via-[#FA6400]/5 to-transparent p-8 md:p-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#F48120]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FA6400]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                      Military-Grade Protection for Your Servers
                    </h3>
                    <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">
                      Our partnership with Cloudflare ensures your <span className="text-[#F48120] font-semibold">game servers</span> are protected by the same infrastructure that safeguards Fortune 500 companies. <span className="text-[#F48120] font-semibold">Free protection included on all game server plans for all CPU models</span> (excluding budget plans). Sleep easy knowing your game infrastructure is bulletproof.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["Volumetric Attacks", "Protocol Attacks", "Application Layer Attacks", "Zero-Day Exploits"].map((item) => (
                        <span key={item} className="inline-flex items-center gap-2 rounded-full border border-[#F48120]/30 bg-[#F48120]/10 px-4 py-2 text-sm font-semibold text-[#F48120]">
                          <div className="w-2 h-2 rounded-full bg-[#F48120] animate-pulse" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="relative w-32 h-32 md:w-40 md:h-40"
                    >
                      <div className="absolute inset-0 rounded-full border-2 border-[#F48120]/20" />
                      <div className="absolute inset-2 rounded-full border-2 border-[#FA6400]/30" />
                      <div className="absolute inset-4 rounded-full border-2 border-[#F48120]/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ShieldCheck className="w-16 h-16 md:w-20 md:h-20 text-[#F48120]" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
        {sections.features && <Features />}
        {sections.locations && <Locations />}
        {sections.panel && <Panel />}
        {sections.hardware && <Hardware />}
        {sections.testimonials && <Testimonials />}
        {sections.faq && <FAQ />}
        {sections.cta && <CTA />}
      </div>
    </>
  );
};

export default HeroSection;