"use client";
import { useState } from "react";

const SERVICES = [
  {
    id: 1,
    title: "Branding",
    description: "Identidad que conecta y diferencia. Diseñamos marcas con propósito y coherencia, desde la estrategia hasta el sistema visual. Si estás creando una nueva identidad o renovando la tuya, guiamos todo el proceso para lograr una marca sólida, adaptable y recordable. El resultado: una marca coherente, reconocible y lista para escalar",
    features: [
      {
        title: "Estrategia e identidad visual",
        description: "Definimos propósito, tono y estética para dar forma a una marca clara y consistente."
      },
      {
        title: "Sistema visual",
        description: "Diseñamos un lenguaje visual adaptable que mantiene coherencia en todos los canales."
      },
      {
        title: "Arquitectura de marca",
        description: "Organizamos líneas, submarcas y productos para escalar sin perder sentido ni reconocimiento."
      },
      {
        title: "Dirección y producción",
        description: "Creamos y dirigimos sesiones fotográficas alineadas a la identidad, transmitiendo emoción y coherencia visual en cada toma."
      }
    ]
  },
  {
    id: 2,
    title: "Diseño Web",
    description: "Diseñamos sitios que se ven bien, cargan rápido y comunican con claridad. Te acompañamos durante todo el proceso, desde la estrategia hasta la optimización, para crear experiencias digitales que inspiran confianza y generan resultados.",
    features: [
      {
        title: "UI/UX Design",
        description: "Estructuramos la navegación para que el usuario siempre sepa dónde está y qué hacer."
      },
      {
        title: "Arquitectura y contenido",
        description: "Estructura precisa de información y mensajes que comunican valor y guían la acción."
      },
      {
        title: "Responsive y rendimiento",
        description: "Velocidad, jerarquía visual y consistencia en cualquier pantalla o dispositivo."
      },
      {
        title: "Optimización continua",
        description: "Analizamos comportamiento y aplicamos mejoras constantes para que tu web evolucione con tu marca."
      }
    ]
  },
  {
    id: 3,
    title: "E-commerce",
    description: "Tu tienda online, pensada para crecer. Diseñamos tiendas rápidas, seguras y listas para operar sin fricción. Si ya vendes o vienes de otra plataforma, migramos, optimizamos y escalamos tu e-commerce en Shopify 2.0 sin perder datos ni rendimiento. Cada tienda se optimiza para vender más, mantener estabilidad y escalar sin fricción.",
    features: [
      {
        title: "Shopify 2.0 y checkout optimizado",
        description: "Procesos de compra rápidos y simples, con menos pasos y más conversión"
      },
      {
        title: "Integraciones locales",
        description: "Integramos pagos, envíos y ERP locales como Bsale, Shippit, MercadoPago y más"
      },
      {
        title: "Migración y soporte",
        description: "Traslado desde cualquier plataforma cuidando SEO, historial y continuidad operativa."
      },
      {
        title: "Métricas y crecimiento",
        description: "Dashboards para medir ventas, tráfico y comportamiento en tiempo real."
      }
    ]
  },
  {
    id: 4,
    title: "Email Marketing y CRM",
    description: "Automatizaciones que conectan, venden y fidelizan. Combinamos diseño, contenido y automatización para aumentar apertura y recompra. Si partes desde cero o ya usas Klaviyo u otra herramienta, activamos flujos que convierten visitas en clientes y clientes en lealtad. El resultado: relaciones más fuertes y clientes que vuelven.",
    features: [
      {
        title: "Flujos automatizados",
        description: "Bienvenida, post compra, carrito abandonado y reactivación: secuencias pensadas para convertir sin esfuerzo"
      },
      {
        title: "Segmentación y personalización",
        description: "Mensajes basados en comportamiento, historial y preferencias para mayor relevancia y respuesta."
      },
      {
        title: "CRM y gestión de leads",
        description: "Centralizamos tus contactos y automatizamos seguimientos para no perder oportunidades"
      },
      {
        title: "Diseño y creatividad",
        description: "Mensajes visuales y claros que atraen, conectan y convierten."
      }
    ]
  }
];

export default function ServicesPillars() {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set()); // Todas cerradas por defecto

  const toggleService = (index: number) => {
    setOpenIndexes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index); // Cerrar si está abierto
      } else {
        newSet.add(index); // Abrir sin cerrar otras
      }
      return newSet;
    });
  };

  return (
    <section className="pt-12 pb-8 md:pt-20 md:pb-12">
      <div className="mx-auto max-w-6xl pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-xl leading-tight mb-6" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
            Nuestros servicios (04)
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
            const isOpen = openIndexes.has(index);
            
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
                  className="w-full text-left py-6 px-2 md:px-0 flex items-center gap-4 hover:opacity-80 transition-all duration-200 group cursor-pointer"
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
                  <div className="pb-8 space-y-6 pt-2 pl-8 md:pl-12">
                    <p className={`text-sm text-muted-foreground leading-relaxed max-w-[42ch] transition-all duration-500 delay-100 ${
                      isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}>
                      {service.description}
                    </p>
                    
                    <div className={`mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-500 delay-200 ${
                      isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      {service.features.slice(0,4).map((feature, featureIndex) => (
                        <div 
                          key={feature.title} 
                          className="space-y-2"
                          style={{
                            transitionDelay: isOpen ? `${300 + featureIndex * 50}ms` : '0ms'
                          }}
                        >
                          <h4 className="text-sm font-bold uppercase" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>{feature.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
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