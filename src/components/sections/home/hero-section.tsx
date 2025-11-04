"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import LogoCloud from "@/components/sections/home/logo-cloud";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  },
};

export default function HeroSection() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <div className="overflow-hidden">
        <section className="pt-44 pb-12 md:pt-52 md:pb-16 lg:pt-64 lg:pb-20">
          <div className="mx-auto max-w-7xl safe-container">
            <div className="grid items-center md:items-start gap-6 md:gap-16 lg:gap-24 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h1 className="migra-xl mt-0 text-center lg:text-right text-balance text-[48px] md:text-[66px] xl:text-[80px] leading-[1.02] tracking-[-0.003em]">
                  Sitios web bien hechos. Que se sienten bien.
                </h1>
              </div>
              <div className="lg:col-span-6 lg:pt-[40px] xl:pt-[50px]">
                <p className="mt-4 md:mt-6 mx-auto lg:mx-0 text-center lg:text-left max-w-[36ch] md:max-w-[48ch] text-[13px] md:text-[16px] leading-[1.7] text-muted-foreground whitespace-pre-line">
                  {/* Opción 1: Directa y técnica (actual) */}
                  Diseñamos y desarrollamos sitios rápidos, claros y con identidad.{"\n"}Para marcas que valoran diseño, ejecución y resultados reales.
                  
                  {/* Alternativas para considerar:
                  
                  Opción 2: Más estratégica
                  Diseño con método. Desarrollo con propósito.{"\n"}Para marcas que entienden el valor de un partner digital, no un proveedor.
                  
                  Opción 3: Más humana y personal
                  Combinamos diseño, rendimiento y atención personal.{"\n"}Para fundadores que buscan excelencia sin capas de gestión.
                  
                  Opción 4: Enfocada en proceso
                  De la estrategia al código, con criterio y precisión.{"\n"}Para marcas que valoran proceso, performance y resultados medibles.
                  
                  Opción 5: Minimalista y premium
                  Diseño y desarrollo con criterio.{"\n"}Para marcas que buscan un socio estratégico de alto nivel.
                  
                  Opción 6: Enfoque en valor diferencial
                  Sitios que funcionan tan bien como se ven.{"\n"}Para equipos que necesitan velocidad, diseño y ejecución real.
                  */}
                </p>
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.35,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-6 md:mt-8 flex flex-col items-center lg:items-start justify-center lg:justify-start gap-2 md:flex-row"
                >
                  <Button
                    key={1}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="rounded-md px-4 py-2.5 text-[15px] md:px-5 md:py-3 md:text-base cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-1"
                  >
                    <Link href="#portfolio" onClick={(e) => handleSmoothScroll(e, "portfolio")}>
                      <span className="text-nowrap">Ver trabajo</span>
                    </Link>
                  </Button>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    className="rounded-md px-4 py-2.5 text-[15px] md:px-5 md:py-3 md:text-base cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-1"
                  >
                    <Link href="#contact" onClick={(e) => handleSmoothScroll(e, "contact")}>
                      <span className="text-nowrap">Empecemos</span>
                    </Link>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>
          </div>
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.85,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className="relative mt-20 md:mt-24 overflow-hidden px-2">
              <LogoCloud />
            </div>
          </AnimatedGroup>
        </section>
      </div>
    </>
  );
}
