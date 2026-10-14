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
import { GPU_TRANSFORM } from "@/lib/motion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glow?: boolean;
};

export function TiltCard({
  children,
  className,
  intensity = 7,
  glow = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 320, damping: 28, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), spring);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        GPU_TRANSFORM,
        glow && "group",
        className,
      )}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }
      }
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduce ? undefined : { scale: 1.015, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {glow && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-br from-violet-500/20 via-transparent to-fuchsia-500/15 -z-10"
          aria-hidden
        />
      )}
      {children}
    </motion.div>
  );
}
