"use client";
import { useState } from "react";
import { InView } from "@/components/motion-primitives/in-view";

const SERVICES = [
  {
    id: 1,
    title: "Diseño Web Estratégico",
    description: "Convertimos estética en rendimiento. Creamos sitios pensados para vender, no solo para verse bien, con un enfoque en conversión y experiencia de usuario optimizada.",
    features: [
      "UI/UX Design",
      "Landing Pages", 
      "Responsive Design",
      "Testing A/B",
      "Identidad visual aplicada"
    ]
  },
  {
    id: 2,
    title: "E-commerce Escalable",
    description: "Tiendas que venden y crecen contigo. E-commerce escalable con integraciones locales, métricas en tiempo real y soporte continuo para tu crecimiento.",
    features: [
      "Shopify 2.0 y Checkout optimizado",
      "Integraciones locales (pagos, despacho, ERP)",
      "Email marketing y retención",
      "Análisis y métricas en tiempo real",
      "Soporte y evolución continua"
    ]
  },
  {
    id: 3,
    title: "Experiencia & Marca Digital",
    description: "Tu marca como experiencia completa. Storytelling visual que conecta y convierte en cada interacción, creando una identidad digital memorable y efectiva.",
    features: [
      "Storytelling visual y tono de marca",
      "Arquitectura de contenido",
      "Fotografía y dirección de arte",
      "Animaciones y microinteracciones",
      "Optimización SEO y Core Web Vitals"
    ]
  }
];

function AccordionItem({ feature, isOpen, onToggle }: { feature: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border/20 group hover:border-border transition-colors duration-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center text-left py-4 transition-colors hover:text-foreground/80 cursor-pointer"
      >
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-4 transition-colors duration-200 ${
          isOpen ? 'bg-[#C3FB88]' : 'bg-muted group-hover:bg-[#C3FB88]'
        }`}>
          <svg
            className={`w-4 h-4 transition-transform duration-500 ease-in-out ${
              isOpen ? 'rotate-45 text-foreground' : 'text-muted-foreground group-hover:text-foreground'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <span className="text-base font-medium">{feature}</span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-600 ease-in-out ${
          isOpen ? 'max-h-32' : 'max-h-0'
        }`}
        style={{
          transformOrigin: 'top'
        }}
      >
        <div className="pb-2">
          <div className="text-sm text-muted-foreground px-10">
            <p>Descripción detallada del servicio {feature.toLowerCase()}...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceBlock({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (featureIndex: number) => {
    setOpenItems(prev => 
      prev.includes(featureIndex) 
        ? prev.filter(i => i !== featureIndex)
        : [...prev, featureIndex]
    );
  };

  return (
    <div className={`sticky top-16 bg-background ${index > 0 ? 'shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.04)]' : ''}`}>
      <InView
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 1.2, 
              ease: "easeOut"
            }
          },
        }}
        viewOptions={{ margin: "0px 0px -200px 0px" }}
      >
        <div className="w-full py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            {/* Header integrado */}
            {index === 0 && (
              <div className="text-center mb-16">
                <InView
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewOptions={{ margin: "0px 0px -100px 0px" }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Nuestros servicios
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Soluciones integrales para transformar tu presencia digital y generar resultados medibles.
                  </p>
                </InView>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Columna izquierda - Título y descripción */}
              <div className="space-y-6">
                <div className="text-sm font-mono tracking-widest text-primary uppercase" style={{ fontFamily: 'Supply Mono, monospace' }}>
                  {String(index + 1).padStart(2, '0')}/03
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  {service.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              {/* Columna derecha - Acordeones */}
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <AccordionItem
                        key={feature}
                        feature={feature}
                        isOpen={openItems.includes(featureIndex)}
                        onToggle={() => toggleItem(featureIndex)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InView>
    </div>
  );
}

export default function ServicesPillars() {
  return (
    <section className="bg-muted/30">
      {/* Secciones sticky que se apilan progresivamente */}
      <div className="w-full">
        {SERVICES.map((service, index) => (
          <ServiceBlock key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
