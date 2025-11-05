"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  name: string;
  industry: string;
  className?: string;
  heightClass?: string; // opcional para ajustar altura desde fuera
}

export default function PortfolioSlideshowEmbla({
  images,
  name,
  industry,
  className,
  heightClass,
}: Props) {
  const autoplay = useRef(Autoplay({ 
    delay: 5500, 
    stopOnInteraction: false, 
    stopOnMouseEnter: true,
    stopOnFocusIn: false, // clave en iOS, evita que taps/bullets frenen el autoplay
  }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: false,
      watchDrag: true,
      containScroll: "trimSnaps", // evita "saltos" en bordes
      inViewThreshold: 0.6,
    },
    [autoplay.current]
  );

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Reanudar autoplay usando eventos de Embla y reset()
  useEffect(() => {
    if (!emblaApi || !autoplay.current) return;
    const stop  = () => autoplay.current.stop();
    const play  = () => autoplay.current.play();
    const reset = () => autoplay.current.reset(); // reinicia el temporizador de forma segura
    const handleReInit = () => autoplay.current?.play(); // si Embla se re-inicializa, garantiza autoplay
    emblaApi.on("pointerDown", stop);   // mientras arrastras, pausa
    emblaApi.on("pointerUp", reset);    // al soltar, reanuda el temporizador
    emblaApi.on("settle", reset);       // tras terminar la animación, asegura reanudación
    emblaApi.on("reInit", handleReInit);
    const onVis = () => { if (!document.hidden) reset(); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      emblaApi.off("pointerDown", stop);
      emblaApi.off("pointerUp", reset);
      emblaApi.off("settle", reset);
      emblaApi.off("reInit", handleReInit);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [emblaApi]);

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-lg bg-black select-none touch-pan-y overscroll-contain",
        className // aplica aspect ratio (mismo que Nine9)
      )}
    >
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden absolute inset-0">
        {/* Container */}
        <div className="flex will-change-transform h-full">
          {images.map((src, i) => {
            const isActive = i === selected;
            const isNext = i === ((selected + 1) % images.length);
            return (
              <div key={i} className="relative flex-shrink-0 w-full h-full">
                <Image
                  src={src}
                  alt={`${name} - ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover [backface-visibility:hidden] [transform:translateZ(0)]"
                  priority={isActive || isNext}
                  loading={isActive || isNext ? "eager" : "lazy"}
                  decoding="async"
                  quality={90}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {/* Textos */}
      <div className="pointer-events-none absolute top-4 left-4 z-20 text-white text-sm">{name}</div>
      <div className="pointer-events-none absolute top-4 right-4 z-20 text-white/80 text-sm">{industry}</div>
      {/* Bullets */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => {
                emblaApi?.scrollTo(i);
                autoplay.current?.reset();
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === selected ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      )}
      {/* Arrows opcionales en desktop */}
      <button
        type="button"
        onClick={() => {
          emblaApi?.scrollPrev();
          autoplay.current?.reset();
        }}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => {
          emblaApi?.scrollNext();
          autoplay.current?.reset();
        }}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  );
}

