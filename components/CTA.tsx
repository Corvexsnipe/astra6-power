"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, MessageSquare } from "lucide-react";
import ctaData from "@/config/home/cta.json";
import { SectionBackdrop } from "@/components/motion";
import { GlowButton } from "@/components/motion/GlowButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltCard } from "@/components/motion/TiltCard";

const CTA = () => {
  const { header, primaryBtn, secondaryBtn } = ctaData;

  return (
    <section className="w-full py-20 relative overflow-hidden bg-black">
      <SectionBackdrop />
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative">
        <ScrollReveal direction="up" blur scale={0.97} duration={0.75}>
          <TiltCard intensity={4} glow={false} className="relative p-0.5 rounded-[40px] overflow-hidden bg-linear-to-tr from-zinc-900 via-violet-600/40 to-zinc-900 premium-glow">
            <div className="relative bg-black rounded-[38px] px-8 py-16 md:py-24 flex flex-col items-center text-center overflow-hidden">
              <motion.div
                className="pointer-events-none absolute inset-0 opacity-40"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 30%, rgba(139,92,246,0.15), transparent 50%)",
                    "radial-gradient(circle at 80% 70%, rgba(217,70,239,0.12), transparent 50%)",
                    "radial-gradient(circle at 20% 30%, rgba(139,92,246,0.15), transparent 50%)",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <h2 className="relative text-white text-4xl md:text-7xl font-extrabold tracking-tight mb-6">
                {header.title}
                <br />
                <span className="bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 bg-clip-text text-transparent">
                  {header.accent}
                </span>
              </h2>
              <p className="relative text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mb-12">
                {header.description}
              </p>
              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 w-full sm:w-auto">
                <GlowButton href={primaryBtn.href} className="w-full sm:w-auto rounded-full">
                  <ShoppingCart size={20} />
                  {primaryBtn.text}
                </GlowButton>
                <GlowButton href={secondaryBtn.href} variant="ghost" className="w-full sm:w-auto rounded-full">
                  <MessageSquare size={20} />
                  {secondaryBtn.text}
                </GlowButton>
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
