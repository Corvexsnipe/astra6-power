"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type MouseSpotlightProps = {
  className?: string;
  size?: number;
};

export function MouseSpotlight({ className, size = 520 }: MouseSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 24 });
  const sy = useSpring(my, { stiffness: 120, damping: 24 });
  const left = useTransform(sx, (v) => `${v * 100}%`);
  const top = useTransform(sy, (v) => `${v * 100}%`);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current || reduce) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  if (reduce) return null;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn("pointer-events-none absolute inset-0 -z-0", className)}
      aria-hidden
    >
      <motion.div
        className="absolute rounded-full opacity-60 mix-blend-screen"
        style={{
          width: size,
          height: size,
          left,
          top,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
