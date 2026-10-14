"use client";

import { useState, useEffect, useCallback } from "react";
import GiveawayModal from "./GiveawayModal";

const GIVEAWAY_CONFIG = {
  autoShowDelay: 1000, // Delay in milliseconds before showing modal (1 second)
} as const;

export default function GiveawayModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Auto-show after delay (shows on every page refresh)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, GIVEAWAY_CONFIG.autoShowDelay);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return <GiveawayModal open={isOpen} onClose={handleClose} />;
}
