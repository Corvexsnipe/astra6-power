import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import servicesData from "@/config/home/services.json";

export interface ServiceItem {
  title: string;
  desc: string;
  icon: string;
  href: string;
  comingSoon: boolean;
}

export interface ServicesConfig {
  header: {
    title: string;
    accent: string;
    description: string;
  };
  items: ServiceItem[];
}

export const getServicesConfig = (): ServicesConfig => {
  return servicesData as ServicesConfig;
};

export const DynamicIcon = ({ name, size = 24 }: { name: string; size?: number }) => {
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[name];

  if (!IconComponent) {
    return <LucideIcons.HelpCircle size={size} />;
  }

  return <IconComponent size={size} />;
};