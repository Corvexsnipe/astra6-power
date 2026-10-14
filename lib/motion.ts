import type { Transition, Variants, ViewportOptions } from "framer-motion";

/** Apple / Stripe style ease-out */
export const CLASSY_EASE: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

/** Cinematic entrance */
export const PREMIUM_EASE: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export const SCROLL_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -8% 0px",
};

export const SCROLL_VIEWPORT_REPEAT: ViewportOptions = {
  once: false,
  amount: 0.15,
  margin: "0px 0px -6% 0px",
};

export function classyScrollTransition(
  duration: number,
  delay: number,
  reduce: boolean | null,
): Transition {
  if (reduce) {
    return { duration: 0, delay: 0 };
  }
  return {
    duration,
    delay,
    ease: CLASSY_EASE,
  };
}

export function premiumTransition(
  duration: number,
  delay: number,
  reduce: boolean | null,
): Transition {
  if (reduce) {
    return { duration: 0, delay: 0 };
  }
  return {
    duration,
    delay,
    ease: PREMIUM_EASE,
  };
}

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)", scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.72, ease: PREMIUM_EASE },
  },
};

export const hoverLift = {
  y: -6,
  scale: 1.02,
  transition: { type: "spring" as const, stiffness: 420, damping: 28 },
};

export const cardHover3d = {
  y: -8,
  rotateX: 2,
  rotateY: -2,
  scale: 1.015,
  transition: { type: "spring" as const, stiffness: 380, damping: 26 },
};

export const GPU_TRANSFORM =
  "transform-gpu will-change-transform backface-hidden [transform-style:preserve-3d]";
