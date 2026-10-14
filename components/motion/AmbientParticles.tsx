"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AmbientParticlesProps = {
  className?: string;
  count?: number;
};

function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt) * 43758.5453;
  return x - Math.floor(x);
}

export function AmbientParticles({
  className,
  count = 28,
}: AmbientParticlesProps) {
  const reduce = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${seeded(i, 1) * 100}%`,
        top: `${seeded(i, 2) * 100}%`,
        size: 1 + seeded(i, 3) * 2.5,
        duration: 12 + seeded(i, 4) * 14,
        delay: seeded(i, 5) * 6,
        opacity: 0.15 + seeded(i, 6) * 0.35,
      })),
    [count],
  );

  if (reduce) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden -z-10",
        className,
      )}
      aria-hidden
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-violet-300/80 shadow-[0_0_8px_rgba(167,139,250,0.5)]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -28 - p.id % 12, 0],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * 12, 0],
            opacity: [p.opacity * 0.6, p.opacity, p.opacity * 0.6],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
