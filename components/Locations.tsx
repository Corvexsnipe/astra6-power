"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionBackdrop } from "@/components/motion";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";
import { getLocationsConfig, getCountryCode } from "@/lib/locations";


const Locations = () => {
  const { header, countries } = getLocationsConfig();

  return (
    <section id="global-locations-section" className="w-full py-20 relative z-10 overflow-hidden bg-black">
      <SectionBackdrop />
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative">
        <ScrollReveal direction="up" blur className="mb-12 text-center">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
            {header.title} <span className="bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 bg-clip-text text-transparent">{header.accent}</span>
          </h2>
          <p className="mt-2 text-zinc-400 text-md font-bold">
            {header.description}
          </p>
        </ScrollReveal>

        {/* Map and Server Info Container */}
        <div className="relative w-full min-h-125 md:min-h-150 flex items-center justify-center">
          <div className="absolute inset-0 z-0 scale-110 md:scale-125 translate-y-12 md:translate-y-20">
            <Image
              src="/images/map.svg"
              alt="Map"
              fill
              className="object-contain opacity-50"
              priority
            />
          </div>

          <StaggerReveal
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-5xl w-full px-4"
            stagger={0.1}
          >
            {countries.map((name, i) => {
              const code = getCountryCode(name);
              const slideFrom = i % 2 === 0 ? "right" : "left";

              return (
                <StaggerItem
                  key={i}
                  direction={slideFrom}
                  distance={52}
                  blur
                  duration={0.65}
                  className="relative p-0.5 rounded-2xl"
                >
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }} 
                  className="h-full"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-violet-900/20 via-purple-900/10 to-black/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-violet-400/30 hover:border-violet-400/60 transition-all duration-500 shadow-[0_0_0_rgba(139,92,246,0)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] group">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Glowing orbs */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-violet-500/20 blur-3xl pointer-events-none group-hover:bg-violet-500/30 transition-all duration-500" />
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none group-hover:bg-fuchsia-500/30 transition-all duration-500" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 md:gap-5">
                        <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-2xl border-2 border-violet-400/40 shadow-lg shadow-violet-500/20 shrink-0 group-hover:shadow-violet-500/40 transition-all duration-500">
                          <Image
                            src={`https://flagcdn.com/${code}.svg`}
                            alt={name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <span className="text-white font-extrabold text-xl md:text-2xl tracking-tight bg-gradient-to-r from-white via-violet-100 to-white bg-clip-text text-transparent">
                            {name}
                          </span>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                            <span className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                              Online
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 px-4 py-3.5 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="text-violet-300 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                            High Performance
                          </span>
                        </div>
                        <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed">
                          Ultra-low latency gaming servers with DDoS protection
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex-1 h-1 bg-gradient-to-r from-violet-500/50 to-fuchsia-500/50 rounded-full overflow-hidden">
                          <div className="h-full w-full bg-gradient-to-r from-violet-400 to-fuchsia-400 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
};

export default Locations;