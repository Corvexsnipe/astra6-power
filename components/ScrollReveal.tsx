"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { CLASSY_EASE, SCROLL_VIEWPORT, classyScrollTransition } from "@/lib/motion";

export type RevealDirection = "up" | "down" | "left" | "right";

type MotionTag = "div" | "section";

type ScrollRevealProps = Omit<
  HTMLMotionProps<"div">,
  "initial" | "whileInView" | "viewport" | "transition"
> & {
  as?: MotionTag;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: boolean;
  scale?: number;
  viewport?: typeof SCROLL_VIEWPORT;
};

function hiddenState(
  direction: RevealDirection,
  distance: number,
  blur: boolean,
  scale: number,
  reduce: boolean | null,
) {
  if (reduce) {
    return { opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 };
  }
  const b = blur ? "blur(10px)" : "blur(0px)";
  switch (direction) {
    case "up":
      return { opacity: 0, y: distance, x: 0, filter: b, scale };
    case "down":
      return { opacity: 0, y: -distance, x: 0, filter: b, scale };
    case "left":
      return { opacity: 0, x: distance, y: 0, filter: b, scale };
    case "right":
      return { opacity: 0, x: -distance, y: 0, filter: b, scale };
    default:
      return { opacity: 0, y: distance, x: 0, filter: b, scale };
  }
}

function normalizeDirection(
  dir: RevealDirection | undefined,
): RevealDirection {
  return dir ?? "up";
}

export function ScrollReveal({
  as = "div",
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.62,
  distance = 44,
  blur = false,
  scale = 1,
  viewport = SCROLL_VIEWPORT,
  ...rest
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const dir = normalizeDirection(direction);
  const Motion = as === "section" ? motion.section : motion.div;

  return (
    <Motion
      className={className}
      initial={hiddenState(dir, distance, blur, scale, reduce)}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={viewport}
      transition={classyScrollTransition(duration, delay, reduce)}
      {...rest}
    >
      {children}
    </Motion>
  );
}

const staggerContainer = (reduce: boolean | null, stagger: number, delayChildren: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduce ? 0 : stagger,
      delayChildren: reduce ? 0 : delayChildren,
    },
  },
});

const staggerItemHidden = (reduce: boolean | null, direction: RevealDirection, distance: number, blur: boolean) => {
  if (reduce) return { opacity: 1, x: 0, y: 0, filter: "blur(0px)" };
  const b = blur ? "blur(8px)" : "blur(0px)";
  switch (direction) {
    case "up":
      return { opacity: 0, y: distance, filter: b };
    case "down":
      return { opacity: 0, y: -distance, filter: b };
    case "left":
      return { opacity: 0, x: distance, filter: b };
    case "right":
      return { opacity: 0, x: -distance, filter: b };
    default:
      return { opacity: 0, y: distance, filter: b };
  }
};

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  viewport?: typeof SCROLL_VIEWPORT;
};

export function StaggerReveal({
  children,
  className,
  stagger = 0.085,
  delayChildren = 0.05,
  viewport = SCROLL_VIEWPORT,
}: StaggerRevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer(reduce, stagger, delayChildren)}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
  blur?: boolean;
  duration?: number;
};

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 36,
  blur = true,
  duration = 0.58,
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: staggerItemHidden(reduce, direction, distance, blur),
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          transition: classyScrollTransition(duration, 0, reduce),
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export { CLASSY_EASE };
