import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PocketMine — Configure Your Server",
  description:
    "Choose CPU, region, and RAM for premium PocketMine-MP hosting. Monthly billing.",
};

export default function PocketmineLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
