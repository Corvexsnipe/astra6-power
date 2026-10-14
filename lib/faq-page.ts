import faqPageData from "@/config/faq/faq-page.json";

export type FaqPageItem = {
  q: string;
  a: string;
};

export type FaqPageConfig = {
  header: {
    badge: string;
    title: string;
    accent: string;
    description: string;
  };
  items: FaqPageItem[];
};

export function getFaqPageConfig(): FaqPageConfig {
  return faqPageData as FaqPageConfig;
}
