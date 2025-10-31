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
              <div className="lg:col-span-7">
                <h1 className="migra-xl mt-0 text-center md:text-left text-balance text-[46px] md:text-[66px] xl:text-[80px] leading-[1.02] tracking-[-0.003em]">
                  Experiencias digitales <br className="hidden lg:block" /> pensadas para crecer.
                </h1>
              </div>
              <div className="lg:col-span-5 lg:pt-0 xl:pt-0 lg:-mt-[10px] xl:-mt-[12px]">
                <p className="mt-4 md:mt-6 mx-auto md:mx-0 text-center md:text-left max-w-[36ch] md:max-w-[48ch] text-[16px] md:text-[19px] leading-[1.7] text-muted-foreground">
                  Creamos sitios webs premium, rápidos y con identidad, diseñados para vender más y diferenciar tu marca.
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
                  className="mt-6 md:mt-8 flex flex-col items-center md:items-start justify-start gap-2 md:flex-row"
                >
                  <div
                    key={1}
                    className="rounded-[calc(var(--radius-xl)+0.125rem)] border border-foreground/15 bg-transparent p-0.5"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-4 py-2.5 text-[15px] md:px-5 md:py-3 md:text-base cursor-pointer"
                    >
                      <Link href="#portfolio">
                        <span className="text-nowrap">Ver casos reales</span>
                      </Link>
                    </Button>
                  </div>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-10.5 rounded-xl px-4 md:px-5 text-[15px] md:text-base cursor-pointer"
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
