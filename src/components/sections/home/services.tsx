import { CustomCursorElement } from "@/components/custom-cursor-element";
import { InView } from "@/components/motion-primitives/in-view";
import { Badge } from "@/components/ui/badge";
import { SERVICES_LIST } from "@/content/services";
import Image from "next/image";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-32" id="services">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-medium lg:text-5xl">
            Nuestros servicios
          </h2>
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
            <p>
              En Estudio Mud, creamos diseños que van más allá de lo visualmente
              atractivo. Están construidos para resolver problemas, conectar con tu
              audiencia y generar resultados. <br /> Ya sea que estés empezando desde cero
              o refinando tu identidad existente, <br /> nosotros te cubrimos.
            </p>
          </InView>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="space-y-10">
            {SERVICES_LIST.map((service, index) => (
              <div
                key={service.name}
                className="group overflow-hidden border-b py-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                  <div className="self-end lg:col-span-2">
                    <div className="flex flex-col gap-8 ">
                      <div className="space-y-4">
                        <h3 className="text-title text-2xl font-medium">
                          {service.name}
                        </h3>

                        <InView
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
                            },
                          }}
                          viewOptions={{ margin: "0px 0px -100px 0px" }}
                        >
                          <div>
                            {service.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                className="mr-2 mb-2"
                                variant="secondary"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
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
                        <p className="text-muted-foreground">
                          {service.description}
                        </p>
                      </InView>
                    </div>
                  </div>
                  <div className=" lg:col-span-3">
                    <CustomCursorElement
                      cursor={
                        <div className="text-zinc-950 text-lg font-medium">
                          Ver
                        </div>
                      }
                    >
                      <InView
                        variants={{
                          hidden: {
                            opacity: 0,
                            scale: 0.95,
                          },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                              duration: 0.6,
                              ease: "easeOut",
                            },
                          },
                        }}
                        viewOptions={{ margin: "0px 0px -100px 0px" }}
                      >
                        <Link href={service.url}>
                          <Image
                            src={service.img}
                            alt={service.name}
                            height="480"
                            width="720"
                            loading="lazy"
                            className=" object-cover object-top  transition-all duration-500 w-full  aspect-[16/9]"
                          />
                        </Link>
                      </InView>
                    </CustomCursorElement>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
