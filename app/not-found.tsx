"use client";

import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">
      <main className="flex-1 flex flex-col items-center justify-center pt-40 pb-20 px-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-2">
            Page Not Found
          </h2>
          <p className="text-zinc-500 text-base md:text-lg max-w-sm mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-row gap-4">
            <Link
              href="/"
              className="bg-linear-to-br from-violet-400 via-violet-600 to-violet-800 px-8 py-3 rounded-full text-sm font-bold text-white transition-all active:scale-95 whitespace-nowrap"
            >
              Go Home
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full text-sm font-bold text-zinc-400 border border-zinc-800 hover:text-white transition-all bg-zinc-950/50 whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;