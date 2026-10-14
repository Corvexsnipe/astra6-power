"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { X, Gift, Play } from "lucide-react";
import { PREMIUM_EASE } from "@/lib/motion";
import { useRouter } from "next/navigation";

// ==================== EDITABLE GIVEAWAY CONFIG ====================
// Easily customize these values to update the giveaway content
const GIVEAWAY_CONFIG = {
  // Prize Information
  prizeName: "🎉 WIN AN iPHONE 17 PRO MAX!",
  
  // Supporting text below heading
  supportingText: "Buy a server from Caspian Host and get your entry into our Lucky Draw.",
  
  // CTA Button
  ctaText: "🚀 GET YOUR ENTRY",
  ctaRoute: "/game-hosting", // Redirects to existing Game Hosting page
  
  // Giveaway Information Section
  infoTitle: "🎁 HOW THE GIVEAWAY WORKS",
  infoText: "Purchase a server from Caspian Host to get your Lucky Draw entry. The winner will be selected through the official giveaway draw.",
  
  // YouTube/Video Section
  videoText: "🎥 The complete giveaway draw video will be recorded and shared on the official Caspian Host YouTube channel for transparency.",
  youtubeChannelUrl: "https://www.youtube.com/@CaspianHost", // Replace with actual channel URL
  
  // Prize Image
  prizeImageUrl: "https://i.postimg.cc/nh496Rfb/image-removebg-preview-(2).png",
  
  // Modal Background Image
  modalBackgroundUrl: "https://i.postimg.cc/g0PhB9wF/image.png",
  
  // Modal Display
  autoShowDelay: 1000, // Delay in milliseconds before showing modal (1 second)
} as const;

type GiveawayModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function GiveawayModal({ open, onClose }: GiveawayModalProps) {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  const handleCtaClick = () => {
    router.push(GIVEAWAY_CONFIG.ctaRoute);
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="giveaway-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 md:p-6"
          onClick={onClose}
        >
          {/* Dark blurred backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.45, ease: PREMIUM_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[min(90vh,600px)] w-full max-w-md flex-col overflow-hidden rounded-[20px] shadow-[0_0_80px_rgba(109,40,217,0.5),0_0_120px_rgba(34,211,238,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl"
            style={{
              backgroundImage: `url(${GIVEAWAY_CONFIG.modalBackgroundUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Beautiful animated gradient border */}
            <div className="absolute inset-0 rounded-[20px] p-[2px]">
              <div className="absolute inset-0 rounded-[18px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 animate-gradient-shift opacity-80" />
              <div className="absolute inset-0 rounded-[18px] bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 animate-gradient-shift opacity-60" style={{ animationDirection: 'reverse' }} />
              <div className="absolute inset-0 rounded-[18px] bg-black/90" />
            </div>
            
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/75 rounded-[20px]" />
            
            {/* Decorative gradient background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-violet-500/30 blur-[60px]"
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-cyan-400/25 blur-[50px]"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.1, 1, 1.1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-[40px]"
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            {/* Subtle grid pattern overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(to right, #8b5cf6 1px, transparent 1px), linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />

            {/* Close Button */}
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close giveaway"
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-zinc-300 transition-colors hover:border-violet-400/40 hover:bg-violet-500/20 hover:text-white sm:h-10 sm:w-10 sm:rounded-xl"
              style={{ position: "absolute", top: "12px", right: "12px", zIndex: 20 }}
            >
              <X size={16} />
            </motion.button>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center px-4 py-5 sm:px-5 sm:py-6">
              
              {/* Prize Image */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: PREMIUM_EASE, delay: 0.1 }}
                className="mb-4 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 to-transparent blur-xl rounded-full" />
                <img
                  src={GIVEAWAY_CONFIG.prizeImageUrl}
                  alt="iPhone 17 Pro Max Prize"
                  className="relative h-32 w-auto object-contain drop-shadow-2xl sm:h-40"
                />
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                id="giveaway-modal-title"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.2 }}
                className="text-center text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-cyan-200 sm:text-xl"
              >
                {GIVEAWAY_CONFIG.prizeName}
              </motion.h2>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.3 }}
                className="mt-2 text-center text-xs text-zinc-200 sm:text-sm"
              >
                {GIVEAWAY_CONFIG.supportingText}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.4 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCtaClick}
                className="mt-4 rounded-lg bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-violet-500/40 transition-all sm:px-8 sm:py-3 sm:text-sm"
              >
                {GIVEAWAY_CONFIG.ctaText}
              </motion.button>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.5 }}
                className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
              />

              {/* Giveaway Info Section */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.55 }}
                className="mt-4 w-full"
              >
                <div className="flex items-center gap-2 text-violet-300">
                  <Gift size={14} className="text-violet-400" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] sm:text-xs">
                    {GIVEAWAY_CONFIG.infoTitle}
                  </h3>
                </div>
                <p className="mt-1.5 text-[10px] text-zinc-300 sm:text-xs leading-relaxed">
                  {GIVEAWAY_CONFIG.infoText}
                </p>
              </motion.div>

              {/* YouTube/Video Info */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.6 }}
                className="mt-3 flex items-start gap-2 rounded-lg border border-violet-400/25 bg-violet-500/10 px-3 py-2"
              >
                <Play size={14} className="mt-0.5 shrink-0 text-red-400" />
                <p className="text-[9px] text-zinc-300 sm:text-[10px] leading-relaxed">
                  {GIVEAWAY_CONFIG.videoText}
                </p>
              </motion.div>

              {/* Footer Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-4 text-center text-[8px] uppercase tracking-wider text-zinc-500 sm:text-[9px]"
              >
                Official Caspian Host Promotion
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

