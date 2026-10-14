"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { MapPin } from "lucide-react";
import { SectionBackdrop } from "@/components/motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import testimonialsData from "@/config/home/testimonials.json";

type Review = (typeof testimonialsData.reviews)[number];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="mx-3 w-[300px] sm:w-[340px] shrink-0">
      <div className="h-full rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl p-6 flex flex-col gap-4 premium-glow hover:border-violet-500/35 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-linear-to-br from-violet-500/30 to-fuchsia-600/20 border border-violet-400/30 flex items-center justify-center text-sm font-black text-violet-200">
            {review.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h4 className="text-white font-bold text-base truncate">{review.name}</h4>
            <p className="text-zinc-500 text-[11px] font-medium truncate flex items-center gap-1">
              <MapPin size={10} className="shrink-0" />
              {review.handle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={16} className="text-[#00B67A]" />
          ))}
          <span className="ml-2 text-[11px] font-bold text-emerald-400/90">5.0</span>
        </div>
        <p className="text-zinc-300 text-sm leading-relaxed font-medium flex-1">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>
    </div>
  );
}

const Testimonials = () => {
  const { header, reviews, trustpilotUrl } = testimonialsData;
  const rowA = reviews.slice(0, 10);
  const rowB = reviews.slice(10, 20);

  return (
    <section className="w-full py-20 md:py-24 bg-black relative overflow-hidden">
      <SectionBackdrop />
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative z-10 mb-10">
        <ScrollReveal direction="up" blur className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-4">
            <FaStar size={12} />
            All 5-star reviews
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
            {header.title}{" "}
            <span className="bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 bg-clip-text text-transparent">
              {header.accent}
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
            {header.description}
          </p>
        </ScrollReveal>
      </div>

      <div className="relative space-y-4">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-l from-black to-transparent z-10" />

        <Marquee speed={35} pauseOnHover gradient={false}>
          {rowA.map((review, i) => (
            <ReviewCard key={`a-${i}`} review={review} />
          ))}
        </Marquee>
        <Marquee speed={32} pauseOnHover direction="right" gradient={false}>
          {rowB.map((review, i) => (
            <ReviewCard key={`b-${i}`} review={review} />
          ))}
        </Marquee>
      </div>

      <ScrollReveal direction="up" delay={0.1} className="mt-12 flex justify-center px-6">
        <motion.a
          href={trustpilotUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 px-6 py-3.5 backdrop-blur-xl"
        >
          <FaStar className="text-emerald-400" size={18} />
          <span className="text-emerald-300 font-bold text-sm md:text-base">
            Read more on Trustpilot
          </span>
        </motion.a>
      </ScrollReveal>
    </section>
  );
};

export default Testimonials;
