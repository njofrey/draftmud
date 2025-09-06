import HeroSection from "@/components/sections/home/hero-section";
import CredibilityBar from "@/components/sections/home/credibility-bar";
import PortfolioSection from "@/components/sections/home/portfolio-section";
import Testimonials from "@/components/testimonials";
import ServicesSection from "@/components/sections/home/services";
import FinalCTA from "@/components/sections/home/final-cta";
import ContactSection from "@/components/contact";
import FooterSection from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. HERO SECTION - Headline de resultado + CTA principal + WhatsApp */}
      <HeroSection />
      
      {/* 2. BARRA DE CREDIBILIDAD - 10 segundos de carga cognitiva */}
      <CredibilityBar />
      
      {/* 3. PORTFOLIO - La prueba visual con resultados */}
      <PortfolioSection />
      
      {/* 4. TESTIMONIOS - La validación social cuando dudan */}
      <Testimonials />
      
      {/* 5. SERVICIOS - Ahora sí están listos para comprar */}
      <ServicesSection />
      
      {/* 6. CTA FINAL - Con micro-urgencia sutil */}
      <FinalCTA />
      
      {/* 7. FORMULARIO DE CONTACTO */}
      <ContactSection />
      
      <FooterSection />
    </main>
  );
}
