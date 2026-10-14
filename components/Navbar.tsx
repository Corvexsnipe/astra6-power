"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LayoutDashboard, HelpCircle, Users } from "lucide-react";
import { FaWhatsapp, FaDiscord } from "react-icons/fa";
import { getNavbarConfig, AlertIcon } from "@/lib/navbar";
import { PREMIUM_EASE } from "@/lib/motion";
import GiveawayModal from "./GiveawayModal";

const navActionBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-all duration-300";

function scrollToPanel() {
  document.getElementById("panel-section")?.scrollIntoView({ behavior: "smooth" });
}

function scrollToTrustCreators() {
  document.getElementById("trust-creators-section")?.scrollIntoView({ behavior: "smooth" });
}

const Navbar = () => {
  const config = getNavbarConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileLegalOpen, setMobileLegalOpen] = useState(false);
  const [isGiveawayModalOpen, setIsGiveawayModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(9, 9, 11, 0.78)"
            : "rgba(0, 0, 0, 0)",
          backdropFilter: isScrolled ? "blur(20px) saturate(1.2)" : "blur(0px)",
          boxShadow: isScrolled
            ? "0 12px 40px -12px rgba(0,0,0,0.55)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.5, ease: PREMIUM_EASE }}
        className="fixed top-0 w-full z-50 border-b border-zinc-800/50"
      >
        <div
          className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${
            config.alert.enabled
              ? "max-h-20 opacity-100"
              : "max-h-0 opacity-0"
          } ${config.alert.bgStyle} ${config.alert.borderStyle}`}
        >
          <div className="py-2 px-6 lg:px-10">
            <div className="max-w-360 mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-white opacity-90">
                  <AlertIcon type={config.alert.promo.iconType} />
                </span>
                <p
                  className={`text-xs lg:text-sm font-medium ${config.alert.promo.textColor}`}
                >
                  {config.alert.promo.fullMessage}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs lg:text-sm text-zinc-300">
                  Purchase server to get your name into iPhone 17 Pro Max lucky draw
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsGiveawayModalOpen(true)}
                  className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-200 text-xs font-bold uppercase tracking-wider hover:bg-violet-500/30 hover:text-white transition-all"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ paddingTop: isScrolled ? 10 : 20, paddingBottom: isScrolled ? 10 : 20 }}
          transition={{ duration: 0.45, ease: PREMIUM_EASE }}
          className="max-w-360 mx-auto flex items-center justify-between px-6 lg:px-10"
        >
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                <Image
                  src={config.brand.logoPath}
                  alt="Logo"
                  width={80}
                  height={80}
                  className="w-14 h-14 md:w-16 md:h-16 object-contain"
                />
              </motion.div>
              <span className="font-bold text-base md:text-lg tracking-tight text-white whitespace-nowrap">
                {config.brand.name}
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-sm font-medium text-zinc-200 ml-8 lg:ml-12">
            {config.navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-2">
                      {link.name}
                      <ChevronDown
                        size={14}
                        className="transition-transform group-hover:rotate-180 duration-300"
                      />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="glass-panel rounded-[23px] p-1.5 w-52 premium-glow">
                        {link.items?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-3 text-zinc-200 hover:text-violet-300 hover:bg-white/5 rounded-xl transition-all font-medium"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href!}
                    className="relative py-2 hover:text-white transition-colors group/link"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-linear-to-r from-violet-400 to-fuchsia-400 transition-all duration-300 group-hover/link:w-full" />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2.5 md:gap-3 md:flex-1 justify-end">
            <div className="hidden md:flex items-center gap-0.5 rounded-xl border border-white/10 bg-zinc-950/70 p-1 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToTrustCreators}
                className={`${navActionBase} text-zinc-300 hover:bg-violet-500/15 hover:text-white`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-violet-400/25 bg-violet-500/10 text-violet-300">
                  <Users size={14} />
                </span>
                <span className="hidden xl:inline">Our Partners</span>
                <span className="xl:hidden">Partners</span>
              </motion.button>
              <span className="mx-0.5 h-6 w-px bg-white/10" aria-hidden />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/faq"
                  className={`${navActionBase} text-zinc-300 hover:bg-violet-500/15 hover:text-white`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-violet-400/25 bg-violet-500/10 text-violet-300">
                    <HelpCircle size={14} />
                  </span>
                  FAQ
                </Link>
              </motion.div>
            </div>
            {config.buttons.login.enabled && (
              <Link
                href={config.buttons.login.href}
                className="hidden lg:block text-zinc-200 hover:text-white text-sm font-medium transition-colors"
              >
                {config.buttons.login.label}
              </Link>
            )}
            {config.buttons.signup.enabled && (
              <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={config.buttons.signup.href}
                  className="hidden md:flex bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 px-6 py-2.5 rounded-full text-sm font-bold text-white whitespace-nowrap shadow-lg shadow-violet-900/30 border border-violet-400/25"
                >
                  {config.buttons.signup.label}
                </Link>
              </motion.div>
            )}
            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </motion.div>
      </motion.nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 bg-zinc-950/98 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Image
                  src={config.brand.logoPath}
                  alt="Logo"
                  width={32}
                  height={32}
                  className="w-7 h-7"
                />
                <span className="font-bold text-xl text-white uppercase tracking-tight">
                  {config.brand.name}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400"
                aria-label="Close menu"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col px-10 mt-6 overflow-y-auto max-h-[calc(100dvh-120px)]">
              {config.navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: PREMIUM_EASE }}
                  className="border-b border-white/5"
                >
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileLegalOpen(!mobileLegalOpen)}
                        className="w-full text-base font-bold py-5 text-white flex justify-between items-center"
                      >
                        {link.name}
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ${mobileLegalOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${mobileLegalOpen ? "max-h-60 pb-4" : "max-h-0"}`}
                      >
                        {link.items?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-3 text-zinc-300 font-medium hover:text-violet-400 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href!}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-bold py-5 text-white flex justify-between items-center"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex flex-col gap-3 mt-8 pb-10"
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    scrollToTrustCreators();
                  }}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-zinc-900/80 py-3.5 text-sm font-semibold text-zinc-200"
                >
                  <Users size={16} className="text-violet-400" />
                  Our Partners
                </button>
                <Link
                  href="/faq"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-zinc-900/80 py-3.5 text-sm font-semibold text-zinc-200"
                >
                  <HelpCircle size={16} className="text-violet-400" />
                  FAQ
                </Link>
                <Link
                  href={config.buttons.signup.href}
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 py-4 rounded-full text-center text-sm font-bold text-white shadow-lg shadow-violet-900/20"
                >
                  {config.buttons.signup.label}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <GiveawayModal open={isGiveawayModalOpen} onClose={() => setIsGiveawayModalOpen(false)} />
    </>
  );
};

export default Navbar;
