import {
  FaDiscord, FaInstagram, FaYoutube, FaFacebook,
  FaLinkedin, FaTiktok, FaEnvelope
} from "react-icons/fa";
import { SiTrustpilot } from "react-icons/si";
import footerData from "@/config/home/footer.json";
import appData from "@/config/home/app.json";

export interface AppConfig {
  site: {
    name: string;
  };
}
export interface FooterLink {
  label: string;
  url: string;
}
export interface FooterSection {
  title: string;
  links: FooterLink[];
}
export interface SocialLink {
  platform: string;
  url: string;
  enabled: boolean;
}

export interface FooterConfig {
  brand: { description: string };
  status: { url: string; text: string };
  watermark: { enabled: boolean; url: string };
  sections: FooterSection[];
  socials: SocialLink[];
}

export const getFooterConfig = (): FooterConfig => footerData as FooterConfig;
export const getAppConfig = (): AppConfig => appData as AppConfig;

export const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform.toLowerCase()) {
    case "discord": return <FaDiscord size={20} />;
    case "instagram": return <FaInstagram size={20} />;
    case "youtube": return <FaYoutube size={20} />;
    case "facebook": return <FaFacebook size={20} />;
    case "linkedin": return <FaLinkedin size={20} />;
    case "tiktok": return <FaTiktok size={20} />;
    case "trustpilot": return <SiTrustpilot size={20} />;
    case "email": return <FaEnvelope size={20} />;
    default: return null;
  }
};