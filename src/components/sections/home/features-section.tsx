"use client";
import { InView } from "@/components/motion-primitives/in-view";

const FEATURES = [
  "Diseño personalizado para tu marca",
  "Navegación fluida en desktop y móvil", 
  "Carga rápida y optimizada",
  "Integración con pagos y envíos",
  "Correos automáticos y seguimiento básico",
  "Experiencia pensada para generar confianza",
  "Conexión con Google y redes sociales",
  "Panel de ventas y estadísticas",
  "Soporte humano y acompañamiento real",
  "Base lista para escalar y crecer con tu marca"
];

export default function FeaturesSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewOptions={{ margin: "0px 0px -100px 0px" }}
        >
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Todos nuestros sitios web incluyen:
          </h2>
        </InView>
        
        <div className="features-list grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-4 md:gap-x-12">
          <ul>
            {FEATURES.slice(0, 5).map((feature, index) => (
              <InView
                key={feature}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeOut", 
                  delay: index * 0.05 
                }}
                viewOptions={{ margin: "0px 0px -50px 0px" }}
              >
                <li>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.375 12L10.375 15.75L17.031 8.34399" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg> 
                  {feature}
                </li>
              </InView>
            ))}
          </ul>
          <ul>
            {FEATURES.slice(5).map((feature, index) => (
              <InView
                key={feature}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeOut", 
                  delay: (index + 5) * 0.05 
                }}
                viewOptions={{ margin: "0px 0px -50px 0px" }}
              >
                <li>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.375 12L10.375 15.75L17.031 8.34399" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg> 
                  {feature}
                </li>
              </InView>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
