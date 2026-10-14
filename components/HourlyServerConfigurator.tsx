"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, HardDrive, Zap, Clock, Server, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import RentalDurationModal from "./RentalDurationModal";

// ==================== CHECKOUT URL CONFIGURATION ====================
// Replace these placeholder URLs with actual checkout links
const CHECKOUT_URLS = {
  "6GB": {
    "1H": "CHECKOUT_LINK_6GB_1H",
    "2H": "CHECKOUT_LINK_6GB_2H",
    "3H": "CHECKOUT_LINK_6GB_3H",
    "4H": "CHECKOUT_LINK_6GB_4H",
    "5H": "CHECKOUT_LINK_6GB_5H",
    "6H": "CHECKOUT_LINK_6GB_6H",
    "7H": "CHECKOUT_LINK_6GB_7H",
    "8H": "CHECKOUT_LINK_6GB_8H",
  },
  "8GB": {
    "1H": "CHECKOUT_LINK_8GB_1H",
    "2H": "CHECKOUT_LINK_8GB_2H",
    "3H": "CHECKOUT_LINK_8GB_3H",
    "4H": "CHECKOUT_LINK_8GB_4H",
    "5H": "CHECKOUT_LINK_8GB_5H",
    "6H": "CHECKOUT_LINK_8GB_6H",
    "7H": "CHECKOUT_LINK_8GB_7H",
    "8H": "CHECKOUT_LINK_8GB_8H",
  },
  "12GB": {
    "1H": "CHECKOUT_LINK_12GB_1H",
    "2H": "CHECKOUT_LINK_12GB_2H",
    "3H": "CHECKOUT_LINK_12GB_3H",
    "4H": "CHECKOUT_LINK_12GB_4H",
    "5H": "CHECKOUT_LINK_12GB_5H",
    "6H": "CHECKOUT_LINK_12GB_6H",
    "7H": "CHECKOUT_LINK_12GB_7H",
    "8H": "CHECKOUT_LINK_12GB_8H",
  },
} as const;

// ==================== SERVER CONFIGURATION ====================
const SERVER_OPTIONS = [
  {
    id: "6GB",
    name: "6 GB Testing Server",
    cpu: "300%",
    ram: "6 GB",
    storage: "40 GB NVMe",
    price: 3.50,
    cpuType: "Ryzen / AMD EPYC",
  },
  {
    id: "8GB",
    name: "8 GB Testing Server",
    cpu: "350%",
    ram: "8 GB",
    storage: "60 GB NVMe",
    price: 4.50,
    cpuType: "Ryzen / AMD EPYC",
  },
  {
    id: "12GB",
    name: "12 GB Testing Server",
    cpu: "400%",
    ram: "12 GB",
    storage: "80 GB NVMe",
    price: 6.00,
    cpuType: "Ryzen / AMD EPYC",
  },
] as const;

type ServerOptionId = "6GB" | "8GB" | "12GB";

export default function HourlyServerConfigurator() {
  const [selectedServer, setSelectedServer] = useState<ServerOptionId>("6GB");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedServerData = SERVER_OPTIONS.find((s) => s.id === selectedServer)!;

  const handleSelectServer = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="w-full py-20 relative z-10 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/background_image1.png"
            alt="Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="max-w-[1320px] mx-auto px-5 lg:px-8 xl:px-10 relative z-10">
          <ScrollReveal direction="up" blur distance={40} className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-orange-400/40 bg-orange-500/15 px-4 py-1.5 text-xs font-bold text-orange-100 mb-6 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            >
              <Clock size={14} />
              TESTING SERVER • HOURLY RENTAL
            </motion.div>
            <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              PAY ONLY FOR THE{" "}
              <span className="bg-linear-to-br from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
                HOURS YOU NEED
              </span>
            </h2>
            <p className="mt-3 text-zinc-400 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
              <span className="text-orange-400 font-semibold">TESTING SERVER:</span> Rent a high-performance server by the hour to test your Minecraft server, plugins, mods,
              configurations, and performance before committing to a long-term hosting plan.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-red-400/35 bg-red-500/15 px-4 py-2 text-xs font-bold text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.25)]">
              <Cpu size={14} />
              Powered by Ryzen / AMD EPYC CPUs
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" blur distance={40} delay={0.1}>
            <div className="rounded-3xl border-2 border-white/15 bg-gradient-to-br from-zinc-900/95 via-zinc-950/98 to-black p-6 md:p-8 lg:p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(249,115,22,0.15),0_0_100px_rgba(239,68,68,0.1)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left: Server Options */}
                <div>
                  <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                    <Server size={20} className="text-orange-400" />
                    SERVER OPTIONS
                  </h3>
                  <div className="space-y-3">
                    {SERVER_OPTIONS.map((server) => (
                      <motion.button
                        key={server.id}
                        onClick={() => setSelectedServer(server.id as ServerOptionId)}
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-300 ${
                          selectedServer === server.id
                            ? "border-orange-400/60 bg-gradient-to-br from-orange-500/20 via-red-500/15 to-orange-600/10 shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                            : "border-white/12 bg-white/[0.03] hover:border-orange-400/30 hover:bg-orange-500/[0.03]"
                        }`}
                      >
                        {selectedServer === server.id && (
                          <motion.div
                            layoutId="selectedServer"
                            className="absolute inset-0 bg-gradient-to-r from-orange-500/25 via-red-400/20 to-orange-600/15"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <div className="relative flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-bold text-xl">{server.id}</h4>
                              {selectedServer === server.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center"
                                >
                                  <Check size={14} className="text-white" />
                                </motion.div>
                              )}
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                              <div className="flex items-center gap-2 text-zinc-300">
                                <Zap size={12} className="text-orange-400" />
                                {server.cpu} CPU
                              </div>
                              <div className="flex items-center gap-2 text-zinc-300">
                                <Cpu size={12} className="text-orange-400" />
                                {server.ram} RAM
                              </div>
                              <div className="flex items-center gap-2 text-zinc-300">
                                <HardDrive size={12} className="text-orange-400" />
                                {server.storage}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-orange-300 font-extrabold text-2xl">
                              ₹{server.price.toFixed(2)}
                            </p>
                            <p className="text-zinc-400 text-xs font-medium">/ hour</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Right: Live Server Summary */}
                <div>
                  <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                    <Clock size={20} className="text-orange-400" />
                    SELECTED HOURLY CONFIG
                  </h3>
                  <motion.div
                    key={selectedServer}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border-2 border-orange-400/30 bg-gradient-to-br from-orange-500/12 via-red-500/8 to-orange-600/5 p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(249,115,22,0.2)]"
                  >
                    <h4 className="text-white font-bold text-xl mb-2">{selectedServerData.name}</h4>
                    <div className="mb-3">
                      <p className="text-orange-300 font-extrabold text-2xl">
                        ₹{selectedServerData.price.toFixed(2)}
                      </p>
                      <p className="text-zinc-400 text-xs font-medium">/ hour</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-white/12">
                        <span className="text-zinc-400 text-xs font-medium">CPU</span>
                        <span className="text-white text-xs font-bold">{selectedServerData.cpu}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-white/12">
                        <span className="text-zinc-400 text-xs font-medium">RAM</span>
                        <span className="text-white text-xs font-bold">{selectedServerData.ram}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-white/12">
                        <span className="text-zinc-400 text-xs font-medium">Storage</span>
                        <span className="text-white text-xs font-bold">{selectedServerData.storage}</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-zinc-400 text-xs font-medium">CPU Type</span>
                        <span className="text-white text-xs font-bold">{selectedServerData.cpuType}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 0 35px_rgba(249,115,22,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSelectServer}
                      className="mt-5 w-full rounded-xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/30 transition-all"
                    >
                      SELECT SERVER
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <RentalDurationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serverData={selectedServerData}
        checkoutUrls={CHECKOUT_URLS}
      />
    </>
  );
}
