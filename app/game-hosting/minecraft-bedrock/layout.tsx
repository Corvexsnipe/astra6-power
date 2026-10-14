import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Minecraft Bedrock — Configure Your Server",
  description:
    "Choose CPU, region, billing cycle, and RAM for premium Minecraft Bedrock Edition hosting.",
};

export default function MinecraftBedrockLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
