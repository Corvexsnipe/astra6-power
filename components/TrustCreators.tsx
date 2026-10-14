"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionBackdrop } from "@/components/motion";

const creators = [
  {
    name: "Niz Gamer",
    subtitle: "YouTuber",
    logo: "https://i.postimg.cc/sfZP1LdP/niz-logo.jpg",
    link: "https://youtu.be/0PRfGKBcoBc?si=c2RDQJTZizRGcIqI",
  },
  {
    name: "Spunky Insaan",
    subtitle: "YouTuber",
    logo: "https://i.postimg.cc/ncJmrc14/spunky-logoo.jpg",
    link: "https://youtu.be/WVIFClJda0Y?si=Qr8cnsZTtKCkCkgH",
  },
  {
    name: "PSD1",
    subtitle: "YouTuber",
    logo: "https://i.postimg.cc/CMZ7k1DN/psd-logo.jpg",
    link: "https://youtu.be/rKHjcl45hi8?si=hQc1BRsAsgOg6bjg",
  },
];

const TrustCreators = () => {
  return (
    <section id="trust-creators-section" className="w-full py-20 relative z-10 overflow-hidden bg-black">
      <SectionBackdrop />
      <div className="max-w-360 mx-auto px-6 lg:px-10 relative">
        <ScrollReveal direction="up" blur distance={40} className="text-center mb-12">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
            Trusted by{" "}
            <span className="bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 bg-clip-text text-transparent">
              1K+ Clients
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 text-md font-bold">
            India's Top Content Creators & YouTubers
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1} className="mt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
            {creators.map((creator, index) => (
              <React.Fragment key={creator.name}>
                {creator.link ? (
                  <a
                    href={creator.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="flex items-center gap-4 cursor-pointer"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-violet-500/30 bg-black/50 flex-shrink-0">
                        <img
                          src={creator.logo}
                          alt={`${creator.name} logo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%238b5cf6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='white' font-size='40'%3E%3F%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-white text-lg md:text-xl font-bold">
                          {creator.name}
                        </h3>
                        <p className="text-zinc-400 text-sm md:text-base">
                          {creator.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  </a>
                ) : (
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-violet-500/30 bg-black/50 flex-shrink-0">
                      <img
                        src={creator.logo}
                        alt={`${creator.name} logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%238b5cf6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='white' font-size='40'%3E%3F%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-white text-lg md:text-xl font-bold">
                        {creator.name}
                      </h3>
                      <p className="text-zinc-400 text-sm md:text-base">
                        {creator.subtitle}
                      </p>
                    </div>
                  </motion.div>
                )}
                {index < creators.length - 1 && (
                  <div className="hidden md:block w-px h-16 bg-violet-500/40 mx-8" />
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustCreators;
