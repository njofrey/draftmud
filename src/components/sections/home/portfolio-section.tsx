import { PORTFOLIO_CONTENT } from "@/content/portfolio";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { InView } from "@/components/motion-primitives/in-view";
import Image from "next/image";
import PortfolioSlideshow from "@/components/portfolio-slideshow";
import PortfolioSlideshowEmbla from "@/components/portfolio-slideshow-embla";

export default function PortfolioSection() {
  return (
    <section
    className="pt-0 pb-8 md:pb-12"
      id="portfolio"
    >
      <div className="mx-auto max-w-6xl space-y-8 safe-container">
        <div className="mt-6 mb-8 h-px" style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.2) 0.5px, transparent 0.5px)',
          backgroundSize: '3px 1px',
          backgroundPosition: '0 center',
          backgroundRepeat: 'repeat-x'
        }}></div>
        
        <div>
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
                   <h2 className="migra-xl text-4xl md:text-5xl mb-6">
                     Portfolio
                   </h2>
            <p className="text-sm text-muted-foreground max-w-[36ch]">
              Una muestra del tipo de marcas y sitios que hemos desarrollado en los últimos meses
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
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            {PORTFOLIO_CONTENT.map((project, index) => {
              const aspectPattern = [
                "aspect-[2/3] md:aspect-[2/3]",
                "aspect-[5/6] md:aspect-[5/6]",
                "aspect-[5/6] md:aspect-[5/6]",
                "aspect-[2/3] md:aspect-[2/3]",
              ];
              const imageAspectClass = aspectPattern[index % 4];
              // Detectar si tiene slideshow (array de imágenes) o imagen única
              const hasSlideshow = 'images' in project && Array.isArray((project as any).images);
              const images = hasSlideshow ? (project as any).images : [project.img];

              return (
              <div key={index} className="space-y-6 pb-6 md:pb-0">
                {hasSlideshow ? (
                  project.name === "Nine9" ? (
                    <PortfolioSlideshowEmbla
                      images={images}
                      name={project.name}
                      industry={project.industry}
                      className={imageAspectClass}
                    />
                  ) : (
                    <PortfolioSlideshow
                      images={images}
                      name={project.name}
                      industry={project.industry}
                      className={imageAspectClass}
                    />
                  )
                ) : (
                  <div className={`group relative w-full ${imageAspectClass} overflow-hidden rounded-lg bg-muted`}>
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
                )}
                
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
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
                
                <div className="pt-2 pb-4 md:pb-0">
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
            )})}
          </div>
        </InView>

      </div>
    </section>
  );
}
