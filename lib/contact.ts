import contactData from "@/config/contact/contact-info.json";

export type ContactSupportChannel = {
  label: string;
  description: string;
  href: string;
  enabled: boolean;
};

export type ContactFaqButton = {
  label: string;
  description: string;
  href: string;
  enabled: boolean;
};

export type ContactDetails = {
  founder: string;
  founder2: string;
  founder3: string;
  address: string;
  address2?: string;
  phone?: string;
  email: string;
  enabled: boolean;
};

export type ContactConfig = {
  contactDetails?: ContactDetails;
  header: {
    badge: string;
    title: string;
    accent: string;
    description: string;
  };
  faqButton: ContactFaqButton;
  supportChannels: {
    discord: ContactSupportChannel;
    website: ContactSupportChannel;
  };
};

export function getContactConfig(): ContactConfig {
  return contactData as ContactConfig;
}
