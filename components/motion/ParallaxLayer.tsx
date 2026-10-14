"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { GPU_TRANSFORM } from "@/lib/motion";

type ParallaxLayerProps = {
  children: React.ReactNode;
  className?: string;
  /** Positive = moves slower than scroll (background feel) */
  speed?: number;
  rotate?: boolean;
};

export function ParallaxLayer({
  children,
  className,
  speed = 0.35,
  rotate = false,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 90, -speed * 90]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        className={cn(GPU_TRANSFORM, "absolute inset-0 pointer-events-none")}
        style={{ y, rotate: rotate ? rotateZ : 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Slow-drifting ambient orbs behind sections */
export function SectionBackdrop({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden -z-10",
        className,
      )}
      aria-hidden
    >
      <motion.div
        className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-violet-600/12 blur-[120px]"
        animate={{ y: [0, 24, 0], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-fuchsia-500/8 blur-[100px]"
        animate={{ x: [0, -18, 0], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-0 h-48 w-48 rounded-full bg-indigo-500/6 blur-[90px]"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
