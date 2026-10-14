import panelData from "@/config/home/panel.json";

export interface PanelTab {
  id: string;
  label: string;
  icon: string;
  image: string;
}

export interface PanelConfig {
  header: {
    title: string;
    accent: string;
    description: string;
  };
  tabs: PanelTab[];
}

export const getPanelConfig = (): PanelConfig => {
  return panelData as PanelConfig;
};