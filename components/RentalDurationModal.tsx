"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Clock, ArrowRight } from "lucide-react";
import { PREMIUM_EASE } from "@/lib/motion";

type ServerData = {
  id: string;
  name: string;
  cpu: string;
  ram: string;
  storage: string;
  price: number;
  cpuType: string;
};

type CheckoutUrls = {
  [key: string]: {
    [key: string]: string;
  };
};

type RentalDurationModalProps = {
  open: boolean;
  onClose: () => void;
  serverData: ServerData;
  checkoutUrls: CheckoutUrls;
};

const DURATION_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export default function RentalDurationModal({
  open,
  onClose,
  serverData,
  checkoutUrls,
}: RentalDurationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedHours, setSelectedHours] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1);

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

  const totalPrice = serverData.price * selectedHours;

  const handleRentNow = () => {
    const checkoutUrl = checkoutUrls[serverData.id][`${selectedHours}H`];
    if (checkoutUrl && checkoutUrl !== `CHECKOUT_LINK_${serverData.id}_${selectedHours}H`) {
      window.open(checkoutUrl, "_blank");
    } else {
      console.warn("Checkout URL not configured:", checkoutUrl);
    }
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="rental-modal-title"
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
            className="relative flex max-h-[min(90vh,700px)] w-full max-w-lg flex-col overflow-hidden rounded-[24px] border-2 border-orange-400/30 bg-gradient-to-br from-zinc-900/95 via-zinc-950/98 to-black shadow-[0_0_80px_rgba(249,115,22,0.35),0_0_120px_rgba(239,68,68,0.15)] backdrop-blur-2xl"
          >
            {/* Decorative gradient background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-orange-500/30 blur-[60px]"
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-red-400/25 blur-[50px]"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.1, 1, 1.1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Close Button */}
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close rental duration modal"
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-zinc-300 transition-colors hover:border-orange-400/40 hover:bg-orange-500/20 hover:text-white"
              style={{ position: "absolute", top: "16px", right: "16px", zIndex: 20 }}
            >
              <X size={18} />
            </motion.button>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col px-6 py-8 sm:px-8 sm:py-10">
              {/* Header */}
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: PREMIUM_EASE }}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-orange-400/40 bg-orange-500/15 px-3 py-1.5 text-xs font-bold text-orange-100 mb-4 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                >
                  <Clock size={14} />
                  TESTING SERVER • CHOOSE DURATION
                </motion.div>
                <motion.h2
                  id="rental-modal-title"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.1 }}
                  className="text-2xl font-black text-white sm:text-3xl"
                >
                  {serverData.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.12 }}
                  className="mt-1 text-orange-400 text-xs font-bold uppercase tracking-wider"
                >
                  Hourly Testing Server
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.15 }}
                  className="mt-2 text-orange-300 text-sm font-semibold"
                >
                  ₹{serverData.price.toFixed(2)} / hour
                </motion.p>
              </div>

              {/* Duration Options */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.2 }}
                className="mb-8"
              >
                <p className="text-zinc-300 text-sm font-semibold mb-4">Select rental duration:</p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {DURATION_OPTIONS.map((hours) => (
                    <motion.button
                      key={hours}
                      onClick={() => setSelectedHours(hours as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8)}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative overflow-hidden rounded-lg border-2 px-3 py-3 text-center transition-all duration-300 ${
                        selectedHours === hours
                          ? "border-orange-400/50 bg-gradient-to-br from-orange-500/20 via-red-500/15 to-orange-600/10 shadow-[0_0_25px_rgba(249,115,22,0.3)]"
                          : "border-white/12 bg-white/[0.03] hover:border-orange-400/30 hover:bg-orange-500/[0.05]"
                      }`}
                    >
                      {selectedHours === hours && (
                        <motion.div
                          layoutId="selectedDuration"
                          className="absolute inset-0 bg-gradient-to-r from-orange-500/25 via-red-400/20 to-orange-600/15"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative text-white font-bold text-base">{hours}</span>
                      <span className="relative block text-zinc-400 text-[10px] font-medium mt-0.5">
                        {hours === 1 ? "Hour" : "Hours"}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Price Summary */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.25 }}
                className="rounded-2xl border-2 border-orange-400/30 bg-gradient-to-br from-orange-500/12 via-red-500/8 to-orange-600/5 p-4 backdrop-blur-xl shadow-[0_0_25px_rgba(249,115,22,0.2)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-400 text-xs font-medium">{serverData.name}</span>
                  <span className="text-white text-xs font-bold">{selectedHours} Hours</span>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-400/40 to-transparent mb-3" />
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Total</span>
                  <motion.span
                    key={totalPrice}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-orange-300 font-extrabold text-2xl"
                  >
                    ₹{totalPrice.toFixed(2)}
                  </motion.span>
                </div>
              </motion.div>

              {/* Rent Now Button */}
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.3 }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 35px_rgba(249,115,22,0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRentNow}
                className="mt-5 w-full rounded-xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
              >
                RENT NOW <ArrowRight size={18} />
              </motion.button>

              {/* Footer Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mt-4 text-center text-[10px] uppercase tracking-wider text-orange-400/70 font-semibold"
              >
                Testing Server Rental • Instant Setup • No Long-term Commitment
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
