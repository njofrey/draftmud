"use client";
import { ArrowDown } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32" style={{ backgroundColor: '#131313', color: '#FFFFFF' }}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#D7FF6B' }}>
            Transformamos marcas y experiencias digitales.
          </h2>
          
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: '#9CA3AF' }}>
            Creamos y potenciamos marcas pensadas para la nueva era digital.
          </p>
        </div>
        {/* Indicador de scroll hacia Contacto */}
        <div className="mt-6 flex justify-center">
          <button
            aria-label="Ir a la sección de contacto"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center justify-center h-12 w-12 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <ArrowDown className="size-5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

