"use client";
import { useState } from "react";
import { InView } from "@/components/motion-primitives/in-view";

const PILLARS = [
  {
    id: 1,
    label: "DISEÑO WEB",
    title: "Diseño que convierte estética en rendimiento",
    subtitle: "Creamos sitios pensados para vender, no solo para verse bien",
    features: [
      "UI/UX Design",
      "Landing Pages", 
      "Responsive Design",
      "Testing A/B",
      "Identidad visual aplicada"
    ],
    value: "",
    image: "/images/placeholder-design.jpg"
  },
  {
    id: 2,
    label: "E-COMMERCE",
    title: "Tiendas que venden y crecen contigo",
    subtitle: "E-commerce escalable con integraciones locales y métricas en tiempo real",
    features: [
      "Shopify 2.0 y Checkout optimizado",
      "Integraciones locales (pagos, despacho, ERP)",
      "Email marketing y retención",
      "Análisis y métricas en tiempo real",
      "Soporte y evolución continua"
    ],
    value: "",
    image: "/images/placeholder-ecommerce.jpg"
  },
  {
    id: 3,
    label: "EXPERIENCIA & MARCA",
    title: "Tu marca como experiencia completa",
    subtitle: "Storytelling visual que conecta y convierte en cada interacción",
    features: [
      "Storytelling visual y tono de marca",
      "Arquitectura de contenido",
      "Fotografía y dirección de arte",
      "Animaciones y microinteracciones",
      "Optimización SEO y Core Web Vitals"
    ],
    value: "",
    image: "/images/placeholder-brand.jpg"
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

function PillarBlock({ pillar, isReversed = false }: { pillar: typeof PILLARS[0]; isReversed?: boolean }) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        {/* Título y subtítulo centrados */}
        <div className="text-center mb-16">
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewOptions={{ margin: "0px 0px -100px 0px" }}
          >
            <div className="space-y-4">
              <div className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                {pillar.id}: {pillar.label}
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                {pillar.title}
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {pillar.subtitle}
              </p>
            </div>
          </InView>
        </div>

        {/* Split 50/50 para acordeones e imagen */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Columna de acordeones */}
          <div className={`${isReversed ? 'lg:col-start-2' : ''} flex justify-center`}>
            <div className="w-full max-w-md">
              <InView
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewOptions={{ margin: "0px 0px -100px 0px" }}
              >
                <div className="space-y-2">
                  {pillar.features.map((feature, index) => (
                    <AccordionItem
                      key={feature}
                      feature={feature}
                      isOpen={openItems.includes(index)}
                      onToggle={() => toggleItem(index)}
                    />
                  ))}
                </div>
              </InView>
            </div>
          </div>
          
          {/* Columna de imagen */}
          <div className={`${isReversed ? 'lg:col-start-1' : ''} flex items-center justify-center`}>
            <div className="w-full max-w-lg">
              <InView
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewOptions={{ margin: "0px 0px -100px 0px" }}
              >
                <div className="relative w-full">
                  <div className="aspect-[4/3] bg-muted rounded-2xl flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="text-6xl mb-4">🎨</div>
                      <p className="text-lg font-medium">Mockup {pillar.label}</p>
                      <p className="text-sm">Placeholder image</p>
                    </div>
                  </div>
                </div>
              </InView>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPillars() {
  return (
    <div>
      {PILLARS.map((pillar, index) => (
        <PillarBlock 
          key={pillar.id} 
          pillar={pillar} 
          isReversed={index % 2 === 1} 
        />
      ))}
    </div>
  );
}
