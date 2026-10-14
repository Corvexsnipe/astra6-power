"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { getPartnersConfig } from "@/lib/partners";

const Partners = () => {
  const { speed, partners, style } = getPartnersConfig();

  return (
    <section className="w-full py-5 overflow-hidden bg-black">
      <div className="max-w-625 mx-auto relative">
        <Marquee
          autoFill={true}
          gradient={true}
          gradientColor="black"
          gradientWidth={100}
          speed={speed}
          pauseOnHover={true}
          className="overflow-hidden"
        >
          {partners.map((fileName, index) => (
            <div
              key={index}
              className="flex items-center justify-center mx-10 md:mx-20 py-4 transition-all duration-300 cursor-pointer"
            >
              <div
                className="relative flex items-center justify-center"
                style={{ height: `${style.height}px`, width: `${style.height * 3}px` }}
              >
                <Image
                  src={`/images/${fileName}`}
                  alt="Partner Logo"
                  fill
                  className="object-contain"
                  priority={index < 5}
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Partners;