import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Clock className="size-4" />
            <span>Últimos 3 espacios disponibles esta semana</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para transformar tu presencia digital?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a más de 150 empresas que ya aumentaron sus conversiones con nuestro diseño estratégico.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="#contact">
              <span>Contacto</span>
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
            <Link href="https://wa.me/56912345678" target="_blank">
              <span>WhatsApp Directo</span>
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-green-500" />
            <span>Respuesta en 24 horas</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-green-500" />
            <span>Consulta gratuita</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-green-500" />
            <span>Sin compromiso</span>
          </div>
        </div>
      </div>
    </section>
  );
}

