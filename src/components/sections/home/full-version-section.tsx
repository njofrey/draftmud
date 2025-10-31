import HeroSection from "@/components/sections/home/hero-section";
import PortfolioSection from "@/components/sections/home/portfolio-section";
import FeaturesSection from "@/components/sections/home/features-section";
import ServicesPillars from "@/components/sections/home/services-pillars";
import ContactSection from "@/components/contact";
import FooterSection from "@/components/footer";

export default function FullVersionSection() {
  return (
    <>
      <HeroSection />
      <PortfolioSection />
      <FeaturesSection />
      <ServicesPillars />
      <ContactSection />
      <FooterSection />
    </>
  );
}
