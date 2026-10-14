"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

type ScrollTarget = string | number | HTMLElement;

type ScrollOptions = {
  offset?: number;
  duration?: number;
};

type LenisScrollContextValue = {
  scrollTo: (target: ScrollTarget, options?: ScrollOptions) => void;
};

const LenisScrollContext = createContext<LenisScrollContextValue | null>(null);

export function useLenisScroll(): LenisScrollContextValue {
  const ctx = useContext(LenisScrollContext);
  return (
    ctx ?? {
      scrollTo: (target) => {
        if (typeof target === "string") {
          document.querySelector(target)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      },
    }
  );
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.12,
      lerp: 0.085,
      smoothWheel: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 0.95,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [reduce]);

  const scrollTo = useCallback(
    (target: ScrollTarget, options?: ScrollOptions) => {
      const lenis = lenisRef.current;
      const offset = options?.offset ?? -88;

      if (!lenis) {
        if (typeof target === "string") {
          document.querySelector(target)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        return;
      }

      if (typeof target === "string") {
        const el = document.querySelector<HTMLElement>(target);
        if (el) lenis.scrollTo(el, { offset, duration: options?.duration });
        return;
      }

      lenis.scrollTo(target, { offset, duration: options?.duration });
    },
    [],
  );

  return (
    <LenisScrollContext.Provider value={{ scrollTo }}>
      {children}
    </LenisScrollContext.Provider>
  );
}
