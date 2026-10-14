import { HiSparkles } from "react-icons/hi2";
import { FaFire, FaBullhorn } from "react-icons/fa";
import { GiFlowerPot } from "react-icons/gi";
import navbarData from "@/config/home/navbar.json";

export interface NavSubItem {
  name: string;
  href: string;
}

export interface NavItem {
  name: string;
  href?: string;
  dropdown: boolean;
  items?: NavSubItem[];
}

export interface NavbarConfig {
  alert: {
    enabled: boolean;
    bgStyle: string;
    borderStyle: string;
    promo: {
      iconType: string;
      fullMessage: string;
      textColor: string
    };
    socials: {
      whatsapp: { enabled: boolean; number: string; label: string; iconColor: string };
      discord: { enabled: boolean; url: string; label: string; iconColor: string };
    };
  };
  brand: { name: string; logoPath: string };
  navLinks: NavItem[];
  buttons: {
    login: { label: string; href: string; enabled: boolean };
    signup: { label: string; href: string; enabled: boolean };
  };
}

export const getNavbarConfig = (): NavbarConfig => navbarData as unknown as NavbarConfig;

export const AlertIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "stars": return <HiSparkles size={16} />;
    case "fire": return <FaFire size={14} />;
    case "flower": return <GiFlowerPot size={16} />;
    case "announcement": return <FaBullhorn size={14} />;
    default: return <HiSparkles size={16} />;
  }
};