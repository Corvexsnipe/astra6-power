"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { 
  getFooterConfig, 
  SocialIcon, 
  SocialLink, 
  FooterSection, 
  FooterLink,
  getAppConfig
} from "@/lib/footer";

const Footer = () => {
  const appConfig = getAppConfig();
  const config = getFooterConfig();
  const currentYear = new Date().getFullYear();
  const [showPopup, setShowPopup] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText("no-reply@caspian.host");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const letterColors = [
    'caspian-c',
    'caspian-a1',
    'caspian-s',
    'caspian-p',
    'caspian-i',
    'caspian-a2',
    'caspian-n'
  ];

  const CaspianLetter = ({ letter, colorClass }: { letter: string; colorClass: string }) => (
    <span className={`caspian-letter inline-block transition-all duration-300 ease-out cursor-default select-none ${colorClass}`}>
      {letter}
    </span>
  );

  return (
    <footer className="w-full bg-black relative border-t border-violet-500/30 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-violet-500/50 to-transparent shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 relative z-10">
        <ScrollReveal direction="up" distance={32} duration={0.65}>
        <div className="caspian-container flex justify-center items-center gap-2 text-6xl md:text-8xl lg:text-9xl font-bold text-zinc-500 tracking-widest mb-12">
          {"CASPIAN".split("").map((letter, index) => (
            <CaspianLetter key={index} letter={letter} colorClass={letterColors[index]} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-12 gap-x-8 items-start">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/removed-white0--logo.png"
                alt={`${appConfig.site.name} Logo`}
                width={40}
                height={40}
                className="object-contain"
              />
              <h3 className="text-white text-2xl font-bold leading-none">
                {appConfig.site.name}
              </h3>
            </div>
            <p className="text-zinc-400 text-md font-medium max-w-md">
              {config.brand.description}
            </p>
            <div className="flex gap-5">
              {config.socials.map((social: SocialLink) => social.enabled && (
                social.platform === "Email" ? (
                  <motion.button
                    key={social.platform}
                    onClick={handleEmailClick}
                    whileHover={{ y: -3, color: "#8B5CF6" }}
                    className="text-zinc-400 transition-colors relative"
                  >
                    <SocialIcon platform={social.platform} />
                    {showPopup && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-violet-600 text-white text-xs font-semibold rounded-lg whitespace-nowrap shadow-lg"
                      >
                        Email copied!
                      </motion.div>
                    )}
                  </motion.button>
                ) : (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, color: "#8B5CF6" }}
                    className="text-zinc-400 transition-colors"
                  >
                    <SocialIcon platform={social.platform} />
                  </motion.a>
                )
              ))}
            </div>
          </div>
          {config.sections?.map((section: FooterSection) => (
            <div key={section.title} className="space-y-2">
              <h4 className="text-violet-100 font-bold text-lg md:text-2xl">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link: FooterLink) => (
                  <li key={link.label} className="relative group w-fit">
                    <Link href={link.url} className="group flex items-center text-zinc-500 hover:text-violet-300 transition-all duration-300 text-md font-semibold min-h-8">
                    <span className="capitalize group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 border-t-2 border-zinc-800">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-zinc-400 text-md font-semibold">
              © {currentYear} {appConfig.site.name}. All rights reserved.
            </p>
            {config.watermark.enabled && (
               <p className="text-zinc-500 text-sm font-medium">
               Made with &lt;3 By{" "}
               <a
                 href={config.watermark.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-violet-500 hover:text-violet-400 transition-colors font-semibold"
               >
                 Huzi
               </a>
             </p>
            )}
          </div>
          <Link
            href={config.status.url}
            className="flex items-center gap-2 bg-emerald-900/40 px-3 py-1.5 rounded-full border-2 border-emerald-500/50 hover:bg-emerald-950/15 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-emerald-400 text-xs font-bold">
              {config.status.text}
            </span>
          </Link>
        </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;