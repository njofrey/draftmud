import HeroSection from "@/components/sections/home/hero-section";
import PortfolioSection from "@/components/sections/home/portfolio-section";
import ServicesPillars from "@/components/sections/home/services-pillars";
import ManifestoSection from "@/components/sections/home/manifesto-section";
import ContactSection from "@/components/contact";
import FooterSection from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PortfolioSection />
      <ServicesPillars />
      <ManifestoSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
