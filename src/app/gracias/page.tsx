"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "./stripe-animation.css";

export default function GraciasPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const success = searchParams.get('success');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">

        {/* Main Content */}
        <div className="space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className={`text-6xl ${success ? 'stripe-success' : ''}`}>
              🎉
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {name ? `Gracias, ${name}!` : 'Gracias!'}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
              Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.
            </p>
          </div>

          {/* Back Button */}
          <div className="pt-8">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/">
                <ArrowLeft className="mr-2 size-5" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
