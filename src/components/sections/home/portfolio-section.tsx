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
              Últimos proyectos
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO_CONTENT.map((project, index) => (
              <div
                key={index}
                className="group bg-background rounded-2xl border border-border/20 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.img}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white font-bold text-lg">{project.name}</div>
                    <div className="text-white/80 text-sm">{project.industry}</div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, serviceIndex) => (
                      <span
                        key={serviceIndex}
                        className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full border border-border/20"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InView>

        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
            },
          }}
          viewOptions={{ margin: "0px 0px -100px 0px" }}
        >
          <div className="text-center">
            <Link
              href="#link"
              className="hover:bg-background bg-muted group mx-auto inline-flex items-center gap-4 rounded-full border p-1 pl-4 shadow-md transition-colors duration-300"
            >
              <span className="text-foreground text-base">Ver Más Proyectos</span>
              <span className="block h-8 w-1 border-l bg-white"></span>
              <div className="bg-background group-hover:bg-muted size-8 overflow-hidden rounded-full duration-500 -rotate-45">
                <div className="flex w-16 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                  <span className="flex size-8">
                    <ArrowRight className="m-auto size-4" />
                  </span>
                  <span className="flex size-8">
                    <ArrowRight className="m-auto size-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </InView>
      </div>
    </section>
  );
}
