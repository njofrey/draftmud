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
  heightClass = "h-[56vw] sm:h-[420px] md:h-[520px]",
}: Props) {
  const autoplay = useRef(Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true }));
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

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg bg-black select-none touch-pan-y overscroll-contain",
        className
      )}
    >
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden h-full">
        {/* Container */}
        <div className="flex will-change-transform h-full">
          {images.map((src, i) => {
            const isActive = i === selected;
            const isNext = i === ((selected + 1) % images.length);
            return (
              <div key={i} className="relative min-w-full h-full">
                <Image
                  src={src}
                  alt={`${name} - ${i + 1}`}
                  fill
                  sizes="100vw"
                  className={cn(
                    "object-cover [backface-visibility:hidden] [transform:translateZ(0)] transition-transform duration-700",
                    isActive ? "scale-[1.015]" : "scale-100" // micro-zoom sutil como antes
                  )}
                  priority={isActive || isNext}
                  loading={isActive || isNext ? "eager" : "lazy"}
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
              onClick={() => emblaApi?.scrollTo(i)}
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
        onClick={() => emblaApi?.scrollPrev()}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  );
}

