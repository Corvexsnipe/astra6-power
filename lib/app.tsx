import React from 'react';
import appConfig from "@/config/home/app.json";

export interface SiteConfig {
  site: {
    name: string;
    description: string;
    url: string;
    themeColor: string;
    ogImage: string;
    logo: string;
    twitter: string;
  };
}

export const getSiteConfig = (): SiteConfig => {
  return appConfig as SiteConfig;
};

const ConfigContext = typeof window !== "undefined"
  ? React.createContext<SiteConfig>(appConfig as SiteConfig)
  : null;

export const AppProvider = ({ children, config }: { children: React.ReactNode; config: SiteConfig }) => {
  if (!ConfigContext) {
    return <>{children}</>;
  }

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = React.useContext(ConfigContext!);
  return context || (appConfig as SiteConfig);
};