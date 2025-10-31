"use client";
import { useState } from "react";

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

export default function ServicesPillars() {
  const [openIndex, setOpenIndex] = useState<number>(0); // Primero abierto por defecto

  const toggleService = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1); // Cerrar si está abierto
    } else {
      setOpenIndex(index); // Abrir y cerrar el anterior
    }
  };

  return (
    <section className="pt-12 pb-8 md:pt-20 md:pb-12">
      <div className="mx-auto max-w-6xl pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] md:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="migra-xl text-xl leading-tight mb-6">
            Nuestros servicios
          </h2>
        </div>

        <div className="space-y-0">
          <div className="my-0 h-px" style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)',
            backgroundSize: '3px 1px',
            backgroundPosition: '0 center',
            backgroundRepeat: 'repeat-x'
          }}></div>
          
          {SERVICES.map((service, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div key={service.id}>
                {index > 0 && (
                  <div className="my-0 h-px" style={{
                    width: '100vw',
                    marginLeft: 'calc(-50vw + 50%)',
                    backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)',
                    backgroundSize: '3px 1px',
                    backgroundPosition: '0 center',
                    backgroundRepeat: 'repeat-x'
                  }}></div>
                )}
                
                <button
                  onClick={() => toggleService(index)}
                  className="w-full text-left py-6 flex items-center gap-4 hover:opacity-80 transition-all duration-200 group cursor-pointer"
                >
                  <span className={`text-2xl font-light transition-all duration-500 ease-in-out transform flex-shrink-0 w-8 flex items-center justify-center ${
                    isOpen ? 'rotate-90 scale-110' : 'rotate-0 scale-100'
                  } group-hover:rotate-90`}>
                    {isOpen ? '×' : '+'}
                  </span>
                  <h3 className="migra-xl text-4xl md:text-5xl leading-tight transition-opacity duration-200 flex-1">
                    {service.title}
                  </h3>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pb-8 space-y-6 pt-2 pl-12">
                    <p className={`text-lg text-muted-foreground leading-relaxed max-w-[36ch] transition-all duration-500 delay-100 ${
                      isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}>
                      {service.description}
                    </p>
                    
                    <div className={`mt-8 grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-500 delay-200 ${
                      isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      {service.features.slice(0,4).map((feature, featureIndex) => (
                        <div 
                          key={feature} 
                          className="space-y-2"
                          style={{
                            transitionDelay: isOpen ? `${300 + featureIndex * 50}ms` : '0ms'
                          }}
                        >
                          <h4 className="text-sm font-bold tracking-wide uppercase">{feature}</h4>
                          <p className="text-sm text-muted-foreground">
                            Descripción detallada del servicio {feature.toLowerCase()}.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Línea punteada abajo del último servicio */}
                {index === SERVICES.length - 1 && (
                  <div className="my-0 h-px" style={{
                    width: '100vw',
                    marginLeft: 'calc(-50vw + 50%)',
                    backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)',
                    backgroundSize: '3px 1px',
                    backgroundPosition: '0 center',
                    backgroundRepeat: 'repeat-x'
                  }}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}