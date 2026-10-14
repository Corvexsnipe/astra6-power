import type { Metadata, Viewport } from "next";
import { Montserrat, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Click from "@/animations/Click";
import { getSiteConfig, AppProvider } from "@/lib/app";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/motion";
import GiveawayModalWrapper from "@/components/GiveawayModalWrapper";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const config = getSiteConfig();

export const viewport: Viewport = {
  themeColor: config.site.themeColor,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  referrer: "no-referrer",
  title: {
    default: `${config.site.name} | Premium Hosting Services`,
    template: `%s | ${config.site.name}`,
  },
  description: config.site.description,
  metadataBase: new URL(config.site.url),
  icons: {
    icon: "/favicon.png",
    apple: config.site.logo,
  },
  openGraph: {
    title: config.site.name,
    description: config.site.description,
    url: config.site.url,
    siteName: config.site.name,
    images: [
      {
        url: config.site.ogImage,
        width: 1200,
        height: 630,
        alt: `${config.site.name} - Premium Hosting`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.name,
    description: config.site.description,
    creator: config.site.twitter,
    images: [config.site.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(montserrat.variable, "font-sans", geist.variable)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={`${montserrat.className} antialiased bg-black text-zinc-100 min-h-screen`}>
        <AppProvider config={config}>
          <SmoothScrollProvider>
            <Click />
            <GiveawayModalWrapper />
            <div className="relative flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 relative">{children}</main>
              <Footer />
            </div>
          </SmoothScrollProvider>
        </AppProvider>
      </body>
    </html>
  );
}