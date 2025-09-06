import { Circle, Cpu, Lock, Sparkles, Zap } from "lucide-react";
import { ScrollView } from "./scroll-view";
import Image from "next/image";

const ourPrinciples = [
  {
    title: "Creatividad con Propósito",
    description:
      "Nuestros diseños no son solo bonitos; están construidos para resolver problemas y generar impacto.",
  },
  {
    title: "Colaboración es Clave",
    description:
      "Trabajamos contigo, no solo para ti. Las grandes ideas nacen del trabajo en equipo.",
  },

  {
    title: "Honestos & Transparentes",
    description:
      "Sin jerga confusa ni costos ocultos. Solo comunicación clara y resultados reales.",
  },
  {
    title: "Los Detalles Importan",
    description:
      "Las pequeñas cosas marcan la diferencia. Nos preocupamos por los detalles, para que tú no tengas que hacerlo.",
  },
];

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32" id="about">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <ScrollView>
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">
              Nosotros
            </h2>
          </ScrollView>
          <ScrollView>
            <p>
              Estudio Mud nació de una idea simple—el buen diseño debe hacer
              más que solo verse bien; debe generar impacto. Lo que comenzó
              como una pasión por la creatividad se convirtió en un estudio de diseño
              dedicado a ayudar a las marcas a contar sus historias, conectar
              con audiencias y destacar en un mundo saturado.
            </p>
          </ScrollView>
        </div>
        <ScrollView>
          <Image
            className="rounded-(--radius) grayscale-75 object-cover aspect-[16/9] w-full"
            src="/images/office.jpeg"
            alt="team image"
            height="480"
            width="720"
            loading="lazy"
          />
        </ScrollView>
        <ScrollView>
          <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
            {ourPrinciples.map((principle, index) => (
              <div className="space-y-3" key={index}>
                <div className="flex items-center gap-2">
                  <Circle className="size-4" />
                  <h3 className="text-sm font-medium">{principle.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
