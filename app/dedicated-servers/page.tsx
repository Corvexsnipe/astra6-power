"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";

export default function DedicatedServersPage() {
  return (
    <div className="min-h-screen bg-black text-[#e2e8f0] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-600/20 border-2 border-orange-500/40 mb-8"
        >
          <Clock className="w-12 h-12 text-orange-400" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-extrabold mb-4"
        >
          <span className="bg-gradient-to-r from-orange-400 to-amber-600 bg-clip-text text-transparent">
            Coming Soon
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-zinc-400 mb-6"
        >
          Dedicated Servers
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-zinc-500 text-lg mb-8"
        >
          We're working hard to bring you bare-metal power for high-traffic workloads and enterprise-grade performance. Stay tuned!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-600/15 px-6 py-3 text-sm font-semibold text-orange-100"
        >
          <Sparkles size={16} />
          Launching Soon
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
}