"use client";
import { InView } from "@/components/motion-primitives/in-view";
import { useState } from "react";

type StatItem = {
  metric: string;
  headline: string;
  description: string;
  tooltip: {
    source: string;
    detail: string;
  };
};

const STATS: StatItem[] = [
  {
    metric: "80%",
    headline: "De las compras online en Chile se hacen desde el celular.",
    description: "Diseñamos tiendas que cargan rápido en cualquier pantalla.",
    tooltip: {
      source: "Cámara de Comercio de Santiago (CCS), 2024",
      detail: "Más del 75% de compras online en Chile son móviles"
    }
  },
  {
    metric: "70%",
    headline: "De los e‑commerce chilenos fallan en velocidad y rendimiento.",
    description: "Reducimos tu tiempo de carga a menos de 1,5 s.",
    tooltip: {
      source: "Google CrUX Chile Dataset 2024",
      detail: "Solo 30% de sitios chilenos superan Core Web Vitals"
    }
  },
  {
    metric: "60%",
    headline: "De las tiendas no automatizan su marketing.",
    description: "Activamos flujos de retención que venden solos.",
    tooltip: {
      source: "Shopify Partner LATAM 2023",
      detail: "Menos del 35% de tiendas usan automatizaciones"
    }
  },
  {
    metric: "88%",
    headline: "De los clientes no vuelven tras una mala experiencia.",
    description: "Creamos sitios que retienen y fidelizan.",
    tooltip: {
      source: "PwC Global Digital Experience 2023",
      detail: "88% abandonaría marca tras mala experiencia digital"
    }
  },
];

function Tooltip({ source, detail }: { source: string; detail: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="ml-1.5 inline-flex h-4 w-4 items-center justify-center text-[10px] text-muted-foreground/60 transition-colors hover:text-muted-foreground/80 focus:outline-none"
        aria-label="Ver fuente de datos"
      >
        ⓘ
      </button>
      
      {isVisible && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 transform">
          <div className="rounded-md bg-background px-3 py-2 text-sm shadow-lg ring-1 ring-border/20">
            <div className="font-medium text-xs text-muted-foreground/80 mb-1">
              {source}
            </div>
            <div className="text-xs leading-relaxed text-muted-foreground/70">
              {detail}
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-background"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CredibilityBar() {
  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {STATS.map((item, index) => (
            <InView
              key={item.metric}
              as="div"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
              viewOptions={{ margin: "0px 0px -100px 0px" }}
            >
              <div className="group h-full p-0 transition-transform duration-300 hover:-translate-y-0.5">
                <div className="flex items-baseline">
                  <div className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Faktum, sans-serif' }}>
                    {item.metric}
                  </div>
                  <Tooltip source={item.tooltip.source} detail={item.tooltip.detail} />
                </div>
                <div className="mt-3 h-px w-full bg-border/40"></div>
                <p className="mt-3 text-sm md:text-base font-medium">
                  {item.headline}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </InView>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

