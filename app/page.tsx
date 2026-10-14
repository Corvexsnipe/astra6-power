import HeroSection from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors duration-300">
      <HeroSection />
    </div>
  );
}