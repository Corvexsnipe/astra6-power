"use client";

import React from "react";
import { motion } from "framer-motion";
import { getFeaturesConfig, DynamicIcon } from "@/lib/features";
import { SectionBackdrop } from "@/components/motion";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";

const Features = () => {
  const { header, items } = getFeaturesConfig();

  return (
    <section className="w-full py-20 relative z-10 overflow-hidden bg-black">
      <SectionBackdrop />
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative">
        <ScrollReveal direction="up" blur distance={44} className="mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-violet-200/90">
            Premium Infrastructure
          </div>
          <div className="mt-4 max-w-4xl">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
              {header.title}{" "}
              <span className="bg-linear-to-br from-violet-300 via-violet-500 to-violet-700 bg-clip-text text-transparent">
                {header.accent}
              </span>
            </h2>
            <p className="mt-3 text-zinc-300/80 text-sm md:text-base font-medium leading-relaxed max-w-2xl">
              {header.description}
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {items.map((item, i) => {
            const slideFrom =
              i % 3 === 0 ? "right" : i % 3 === 1 ? "up" : "left";
            return (
            <StaggerItem key={i} direction={slideFrom} blur distance={48} duration={0.62}>
              <TiltCard intensity={6} className="group relative p-[1px] rounded-3xl overflow-hidden bg-linear-to-br from-violet-400/35 via-violet-700/45 to-zinc-900/90 h-full">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-transparent via-violet-300/20 to-transparent" />
                <div className="relative bg-[#09090d]/85 backdrop-blur-xl h-full p-7 md:p-8 rounded-[23px] flex flex-col gap-5 border border-white/10 group-hover:border-violet-300/35 transition-colors duration-300 premium-glow">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: [0, -6, 6, 0] }}
                      transition={{ duration: 0.5 }}
                      className="text-violet-300 bg-violet-500/15 p-2.5 rounded-xl border border-violet-300/25 shadow-[0_0_16px_rgba(139,92,246,0.2)]"
                    >
                      <DynamicIcon name={item.icon} size={24} />
                    </motion.div>
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-zinc-300/75 text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </TiltCard>
            </StaggerItem>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default Features;
