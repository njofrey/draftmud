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
  return (
    <>
      <div className="overflow-hidden">
        <section className="pt-44 pb-12 md:pt-52 md:pb-16 lg:pt-64 lg:pb-20">
          <div className="mx-auto max-w-7xl pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] md:px-6 lg:px-8">
            <div className="grid items-center md:items-start gap-6 md:gap-16 lg:gap-24 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h1 className="migra-xl mt-0 text-center lg:text-right text-balance text-[54px] md:text-[74px] xl:text-[90px] leading-[1.02] tracking-[-0.003em]">
                  Marcas y sitios web,<br />bien hechos.
                </h1>
              </div>
              <div className="lg:col-span-6 lg:pt-[40px] xl:pt-[50px]">
                <p className="mt-4 md:mt-6 mx-auto lg:mx-0 text-center lg:text-left max-w-[36ch] md:max-w-[48ch] text-[14px] md:text-[17px] leading-[1.7] text-muted-foreground">
                  Diseñamos y desarrollamos sitios rápidos, claros y con identidad. Para marcas que valoran el diseño, la ejecución y los resultados reales.
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
                    <Link href="#portfolio">
                      <span className="text-nowrap">Ver más</span>
                    </Link>
                  </Button>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    className="rounded-md px-4 py-2.5 text-[15px] md:px-5 md:py-3 md:text-base cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-1"
                  >
                    <Link href="#contact">
                      <span className="text-nowrap">Hablemos de tu proyecto</span>
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
