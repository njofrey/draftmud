import { PORTFOLIO_CONTENT } from "@/content/portfolio";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { InView } from "@/components/motion-primitives/in-view";
import Image from "next/image";

export default function PortfolioSection() {
  return (
    <section
      className="py-12 md:py-20 bg-muted/30"
      id="portfolio"
    >
      <div className="mx-auto max-w-6xl space-y-8 px-6">
        <div className="text-center">
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            viewOptions={{ margin: "0px 0px -100px 0px" }}
          >
                   <h2 className="text-4xl md:text-5xl font-bold mb-6">
                     Portfolio
                   </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proyectos que han transformado negocios y generado resultados medibles para nuestros clientes en diferentes industrias.
            </p>
          </InView>
        </div>

        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
            },
          }}
          viewOptions={{ margin: "0px 0px -100px 0px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PORTFOLIO_CONTENT.map((project, index) => (
              <div key={index} className="space-y-6">
                {/* 1. IMAGEN */}
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={project.img}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white font-bold text-lg">{project.name}</div>
                    <div className="text-white/80 text-sm">{project.industry}</div>
                  </div>
                </div>
                
                {/* 2. TEXTO DESCRIPTIVO */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                {/* 3. BADGES DE SERVICIOS */}
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service, serviceIndex) => (
                    <span
                      key={serviceIndex}
                      className="px-2.5 py-0.5 bg-muted text-muted-foreground text-xs rounded-full border border-border/20 font-mono"
                      style={{ fontFamily: 'Supply Mono, monospace' }}
                    >
                      {service}
                    </span>
                  ))}
                </div>
                
                {/* 4. BOTÓN VISITAR SITIO */}
                <div className="pt-2">
                  <Link
                    href={project.url}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>Visitar sitio</span>
                    <div className="bg-primary group-hover:bg-primary/80 size-6 overflow-hidden rounded-full duration-300 -rotate-45">
                      <div className="flex w-12 -translate-x-1/2 duration-300 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3 text-white" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3 text-white" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </InView>

      </div>
    </section>
  );
}
