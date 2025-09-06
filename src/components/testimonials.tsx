import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-32" id="testimonials">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-4xl font-medium lg:text-5xl">
            Lo que dicen nuestros clientes
          </h2>
          <p>
            Más de 150 empresas han transformado sus resultados con nuestro diseño estratégico.
            Estas son sus historias reales de crecimiento y éxito.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
            <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
              <CardHeader>
                <img
                  className="h-6 w-fit filter brightness-0"
                  src="/images/logos/nike.svg"
                  alt="Nike Logo"
                  height="24"
                  width="auto"
                />
              </CardHeader>
              <CardContent>
                <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                  <p className="text-xl font-medium">
                    Estudio Mud ha transformado la forma en que desarrollo aplicaciones web.
                    Su extensa colección de componentes UI, bloques y
                    plantillas ha acelerado significativamente mi flujo de trabajo. La
                    flexibilidad para personalizar cada aspecto me permite crear
                    experiencias de usuario únicas. Estudio Mud es un cambio de juego para el desarrollo
                    web moderno
                  </p>

                  <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarImage
                        src="https://tailus.io/images/reviews/shekinah.webp"
                        alt="Shekinah Tshiokufila"
                        height="400"
                        width="400"
                        loading="lazy"
                      />
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>

                    <div>
                      <cite className="text-sm font-medium">
                        Shekinah Tshiokufila
                      </cite>
                      <span className="text-muted-foreground block text-sm">
                        Ingeniero de Software
                      </span>
                    </div>
                  </div>
                </blockquote>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardContent className="h-full pt-6">
                <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                  <p className="text-xl font-medium">
                    Estudio Mud es realmente extraordinario y muy práctico, no necesitas
                    romperte la cabeza. Una verdadera mina de oro.
                  </p>

                  <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarImage
                        src="https://tailus.io/images/reviews/jonathan.webp"
                        alt="Jonathan Yombo"
                        height="400"
                        width="400"
                        loading="lazy"
                      />
                      <AvatarFallback>JY</AvatarFallback>
                    </Avatar>
                    <div>
                      <cite className="text-sm font-medium">
                        Jonathan Yombo
                      </cite>
                      <span className="text-muted-foreground block text-sm">
                        Ingeniero de Software
                      </span>
                    </div>
                  </div>
                </blockquote>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="h-full pt-6">
                <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                  <p>
                    ¡Excelente trabajo en la plantilla de portfolio! Este es uno de los mejores
                    sitios web personales que he visto hasta ahora!
                  </p>

                  <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                    <Avatar className="size-12">
                      <AvatarImage
                        src="https://tailus.io/images/reviews/yucel.webp"
                        alt="Yucel Faruksahan"
                        height="400"
                        width="400"
                        loading="lazy"
                      />
                      <AvatarFallback>YF</AvatarFallback>
                    </Avatar>
                    <div>
                      <cite className="text-sm font-medium">
                        Yucel Faruksahan
                      </cite>
                      <span className="text-muted-foreground block text-sm">
                        Creador, Tailkits
                      </span>
                    </div>
                  </div>
                </blockquote>
              </CardContent>
            </Card>
            <Card className="card variant-mixed">
              <CardContent className="h-full pt-6">
                <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                  <p>
                    ¡Excelente trabajo en la plantilla de portfolio! Este es uno de los mejores
                    sitios web personales que he visto hasta ahora!
                  </p>

                  <div className="grid grid-cols-[auto_1fr] gap-3">
                    <Avatar className="size-12">
                      <AvatarImage
                        src="https://tailus.io/images/reviews/rodrigo.webp"
                        alt="Rodrigo Aguilar"
                        height="400"
                        width="400"
                        loading="lazy"
                      />
                      <AvatarFallback>YF</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Rodrigo Aguilar</p>
                      <span className="text-muted-foreground block text-sm">
                        Creador, TailwindAwesome
                      </span>
                    </div>
                  </div>
                </blockquote>
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
