import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Minecraft Java — Configure Your Server",
  description:
    "Choose CPU, region, billing cycle, and RAM for premium Minecraft Java Edition hosting.",
};

export default function MinecraftJavaLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
