"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlowButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "outline" | "golden";
  type?: "button" | "submit";
};

const variants = {
  primary:
    "bg-linear-to-r from-violet-500 via-violet-600 to-violet-700 text-white border-violet-400/30 shadow-[0_10px_30px_rgba(76,29,149,0.45)]",
  ghost:
    "text-zinc-200 border-white/20 bg-white/5 hover:text-white hover:bg-white/10 backdrop-blur-sm",
  outline:
    "text-violet-200 border-violet-400/30 bg-violet-500/10 hover:bg-violet-500/20 hover:text-white backdrop-blur-sm",
  golden:
    "bg-linear-to-r from-amber-400 via-yellow-500 to-amber-500 text-black border-amber-300/40 shadow-[0_10px_30px_rgba(251,191,36,0.5)] hover:shadow-[0_15px_40px_rgba(251,191,36,0.6)]",
};

export function GlowButton({
  href,
  onClick,
  children,
  className,
  variant = "primary",
  type = "button",
}: GlowButtonProps) {
  const reduce = useReducedMotion();
  const base = cn(
    "relative inline-flex items-center justify-center gap-2 px-9 md:px-10 py-3.5 rounded-2xl text-sm font-bold transition-colors overflow-hidden",
    variants[variant],
    className,
  );

  const motionProps = reduce
    ? {}
    : {
        whileHover: { scale: 1.03, y: -2 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 420, damping: 28 },
      };

  const inner = (
  <>
      <span className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-linear-to-r from-transparent via-white/15 to-transparent" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const MotionLink = motion.create(Link);

  if (href) {
    return (
      <MotionLink href={href} className={base} {...motionProps}>
        {inner}
      </MotionLink>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={base} {...motionProps}>
      {inner}
    </motion.button>
  );
}
