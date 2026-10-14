import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hytale — Configure Your Server",
  description:
    "Choose CPU, region, and RAM for premium Hytale server hosting. Monthly billing.",
};

export default function HytaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
