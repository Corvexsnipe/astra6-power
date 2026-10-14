import minecraft from "../config/games/minecraft.json";
import minecraftBedrock from "../config/games/minecraft-bedrock.json";
import pocketmine from "../config/games/pocketmine.json";
import rust from "../config/games/rust.json";
import fivem from "../config/games/fivem.json";
import hytale from "../config/games/hytale.json";

export interface CpuModel {
  name: string;
  pricePerGb: number;
}

export interface GamePlan {
  ram: string;
  cpu: string;
  ssd: string;
  price?: number;
  priceEpyc?: number;
  priceRyzen?: number;
  playerSlots?: string;
  link?: string;
  checkoutEpyc?: string;
  checkoutRyzen?: string;
  pid?: string | number;
}

export interface GameConfig {
  name: string;
  image: string;
  slug: string;
  heroImage: string;
  description: string;
  /** When INR, plan prices are in Indian Rupees (whole numbers). Defaults to USD. */
  currency?: "INR" | "USD";
  cpuModels?: CpuModel[];
  plans: GamePlan[];
}

export const GAME_DATA_REGISTRY: Record<string, GameConfig> = {
  minecraft: minecraft as GameConfig,
  "minecraft-bedrock": minecraftBedrock as GameConfig,
  pocketmine: pocketmine as GameConfig,
  hytale: hytale as GameConfig,
  rust: rust as GameConfig,
};