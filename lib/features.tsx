import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import featuresData from "@/config/home/features.json";

export interface FeatureItem {
  title: string;
  desc: string;
  icon: string;
}

export interface FeaturesConfig {
  header: {
    title: string;
    accent: string;
    description: string;
  };
  items: FeatureItem[];
}

export const getFeaturesConfig = (): FeaturesConfig => {
  return featuresData as FeaturesConfig;
};

export const DynamicIcon = ({ name, size = 24 }: { name: string; size?: number }) => {
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
  return IconComponent ? <IconComponent size={size} /> : <LucideIcons.HelpCircle size={size} />;
};