"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Server,
  User,
  Lock,
  FolderOpen,
  HardDrive,
  Globe,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { SectionBackdrop } from "@/components/motion";
import { GlowButton } from "@/components/motion/GlowButton";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ScrollReveal";

const steps = [
  {
    number: 1,
    title: "Host",
    icon: Server,
    description: "Go to your old hosting panel. Open: Settings → SFTP. Locate the field called Server Address. Example: sftp://berlin.caspianhost.com:2022. Copy this address and paste it into the Host field inside the Server Importer. Do not modify anything else.",
  },
  {
    number: 2,
    title: "Username",
    icon: User,
    description: "Go to the same location: Settings → SFTP. Directly below the Server Address, you will find your SFTP Username. Example: staff5.a025a2. Copy this username and paste it into the Username field.",
  },
  {
    number: 3,
    title: "Password",
    icon: Lock,
    description: "Enter the password of your existing hosting panel account. This is the same password you use to log in to your old panel.",
  },
  {
    number: 4,
    title: "Source",
    icon: FolderOpen,
    description: "Leave this option exactly as it is. Do not change the Source field. The importer already uses the correct value.",
    successNote: "✅ Leave this option unchanged.",
  },
  {
    number: 5,
    title: "Destination",
    icon: HardDrive,
    description: "Do not modify the Destination field. The default destination is already configured correctly.",
    successNote: "✅ Keep the default destination selected.",
  },
  {
    number: 6,
    title: "Port",
    icon: Globe,
    description: "The Port will automatically be detected after you enter the Host address. It should remain: 22. You do not need to edit this field manually.",
    successNote: "✅ Automatically detected.",
  },
];

export default function MigrateToUsPage() {
  return (
    <div className="relative min-h-screen bg-[#04020f] pt-24 md:pt-28 pb-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.12),transparent_50%)]" />
      <SectionBackdrop />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-violet-200/90">
            <Server size={14} />
            Server Migration
          </div>
          <h1 className="mt-4 text-white text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Migrate Your Server
          </h1>
          <p className="mt-4 text-zinc-300/75 text-sm md:text-base font-medium leading-relaxed max-w-3xl mx-auto">
            Move your Minecraft server to Caspian Host in just one click using our built-in Server Importer. Simply enter your existing hosting panel's SFTP details, and our importer will automatically transfer your server files without requiring manual uploads.
          </p>
        </div>

        <div className="mb-12">
          <div className="rounded-3xl p-[1px] bg-linear-to-br from-red-500/40 via-orange-500/20 to-red-600/30 shadow-[0_12px_40px_rgba(239,68,68,0.25)]">
            <div className="rounded-[23px] bg-zinc-950/90 backdrop-blur-xl border border-red-500/20 p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-xl font-bold mb-2">Watch Tutorial Video</h3>
                  <p className="text-zinc-300/80 text-sm md:text-base leading-relaxed">
                    Watch this YouTube video for a proper server import tutorial:
                  </p>
                </div>
                <a
                  href="https://youtu.be/wUH1eDnwrYo?si=99XRu7egFmGC44Jo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-sm border border-red-500/40 shadow-[0_8px_24px_rgba(239,68,68,0.3)] hover:shadow-[0_12px_32px_rgba(239,68,68,0.4)] transition-all"
                >
                  <ArrowRight size={16} />
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-8 text-center">
            Import Steps
          </h2>
          <div className="space-y-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 border border-violet-500/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-2">{step.number}. {step.title}</h3>
                    <p className="text-zinc-300 font-semibold text-sm leading-relaxed mb-2">{step.description}</p>
                    {step.successNote && (
                      <div className="inline-flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2">
                        <CheckCircle size={14} className="text-green-400" />
                        <span className="text-green-400 text-xs font-semibold">{step.successNote}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <div className="rounded-3xl p-[1px] bg-linear-to-br from-violet-500/40 via-white/10 to-fuchsia-500/30 shadow-[0_12px_40px_rgba(139,92,246,0.2)]">
            <div className="rounded-[23px] bg-zinc-950/90 backdrop-blur-xl border border-white/10 p-8 md:p-12">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://i.postimg.cc/BZ566kHJ/image.png"
                  alt="Server Importer Screenshot"
                  className="w-full h-auto rounded-2xl border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-3xl p-[1px] bg-linear-to-br from-blue-500/40 via-cyan-500/20 to-blue-600/30 shadow-[0_12px_40px_rgba(59,130,246,0.25)]">
            <div className="rounded-[23px] bg-zinc-950/90 backdrop-blur-xl border border-blue-500/20 p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <HelpCircle size={32} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-xl font-bold mb-2">Need Help?</h3>
                  <p className="text-zinc-300/80 text-sm md:text-base leading-relaxed">
                    If you experience any issues while importing your server, feel free to contact the Caspian Host support team through Discord. Our staff will gladly assist you with the migration process.
                  </p>
                </div>
                <a
                  href="https://discord.gg/hxPB2z8dwG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#5865F2] to-indigo-600 text-white font-bold text-sm border border-[#5865F2]/40 shadow-[0_8px_24px_rgba(88,101,242,0.3)] hover:shadow-[0_12px_32px_rgba(88,101,242,0.4)] transition-all"
                >
                  <FaDiscord size={18} />
                  Join Our Discord
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm mb-5">
            Ready to get started? Explore our game hosting plans.
          </p>
          <GlowButton href="/game-hosting" variant="outline">
            Browse hosting plans
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
