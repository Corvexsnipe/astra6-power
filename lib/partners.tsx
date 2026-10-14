import partnersData from "@/config/home/partners.json";

export interface PartnersConfig {
  speed: number;
  style: {
    height: number;
    opacity: number;
  };
  partners: string[];
}

export const getPartnersConfig = (): PartnersConfig => {
  return partnersData as PartnersConfig;
};