import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { TextEffect } from "@/components/motion-primitives/text-effect";
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },
};

export default function HeroSection() {
  return (
    <>
      <div className="overflow-hidden min-h-screen">
        <section>
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 0.3,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                  },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            >
              <div className="h-screen xl:h-auto absolute inset-2 -z-10 overflow-hidden rounded-3xl border border-black/10 lg:aspect-video lg:rounded-[3rem] dark:border-white/5">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  preload="auto"
                  className="size-full -scale-x-100 object-cover opacity-50 invert-0 dark:opacity-35 dark:invert"
                  style={{ pointerEvents: 'none' }}
                >
                  <source src="/hero-light.mp4" type="video/mp4" />
                </video>
              </div>
            </AnimatedGroup>

            <div className="absolute inset-0 -z-10 size-full "></div>
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                {/* <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="#link"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">
                      Introducing Support for AI Models
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup> */}

                <h1 className="mt-8 text-balance text-5xl md:text-7xl lg:mt-16 xl:text-[5.25rem] font-semibold">
                  Ecommerce bien hechos, pensados para crecer.
                </h1>
                <TextEffect
                  per="line"
                  preset="fade"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg"
                >
                  Creamos sitios sitios webs premium, rápidos y con identidad, diseñados para vender más y diferenciar tu marca.
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-5 text-base"
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
                    className="h-10.5 rounded-xl px-5"
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
            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
              <LogoCloud />
            </div>
          </AnimatedGroup>
        </section>
      </div>
    </>
  );
}
