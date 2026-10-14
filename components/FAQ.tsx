"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import { SectionBackdrop } from "@/components/motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const FAQ = () => {
  return (
    <section className="w-full py-20 relative z-10 overflow-hidden bg-black">
      <SectionBackdrop />
      <div className="max-w-4xl mx-auto px-6 lg:px-10 relative text-center">
        <ScrollReveal direction="up" blur distance={40}>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-violet-200/90 mb-4">
            <HelpCircle size={14} />
            Help Center
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
            Frequently Asked{" "}
            <span className="bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Billing, setup, migrations, DDoS protection, and more — browse our full FAQ for quick answers.
          </p>

          <motion.div
            className="mt-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/faq"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-violet-600 via-violet-500 to-fuchsia-600 px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_rgba(109,40,217,0.45)] border border-violet-400/30 transition-all hover:brightness-110"
            >
              <Sparkles size={18} className="opacity-90" />
              Click to preview frequently asked questions
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <p className="mt-5 text-zinc-500 text-sm">
            15+ topics · Searchable on the FAQ page
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;
