"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PortfolioSlideshowProps {
  images: string[];
  name: string;
  industry: string;
  className?: string;
}

export default function PortfolioSlideshow({
  images,
  name,
  industry,
  className,
}: PortfolioSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStart, setTransitionStart] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const SWIPE_THRESHOLD = 50;

  // Auto-advance
  useEffect(() => {
    if (isPaused || isDragging || isTransitioning || images.length <= 1) return;

    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setIsTransitioning(true);
      setTransitionStart(true); // Marcar inicio de transición
      setCurrentIndex((prev) => (prev + 1) % images.length);
      
      // Pequeño delay para que React renderice la posición inicial
      setTimeout(() => {
        setTransitionStart(false); // Iniciar animación
      }, 10);
      
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionStart(false);
      }, 600);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, isTransitioning, images.length, currentIndex]);

  const goToIndex = useCallback((newIndex: number) => {
    setPrevIndex(currentIndex);
    setIsTransitioning(true);
    setTransitionStart(true);
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setTransitionStart(false);
    }, 10);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionStart(false);
    }, 600);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    goToIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goToIndex]);

  const handlePrevious = useCallback(() => {
    goToIndex((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, goToIndex]);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setIsPaused(true);
    setIsDragging(false);
    setOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === 0) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = Math.abs(e.touches[0].clientY - (e.touches[0].clientY || 0));

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
      e.preventDefault();
      setIsDragging(true);
      setOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const dragPercent = Math.abs(offset / containerWidth);
    
    if (dragPercent > 0.5 || Math.abs(offset) > SWIPE_THRESHOLD) {
      if (offset > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    }
    
    setStartX(0);
    setOffset(0);
    setIsDragging(false);
    setIsPaused(false);
  };

  // Mouse events
  useEffect(() => {
    if (startX === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const deltaX = e.clientX - startX;
      
      if (Math.abs(deltaX) > 5) {
        setIsDragging(true);
        setOffset(deltaX);
      }
    };

    const handleMouseUp = () => {
      if (!containerRef.current || startX === 0) {
        setStartX(0);
        setIsDragging(false);
        setIsPaused(false);
        setOffset(0);
        return;
      }
      
      if (!isDragging) {
        setStartX(0);
        setIsPaused(false);
        return;
      }
      
      const containerWidth = containerRef.current.offsetWidth;
      const dragPercent = Math.abs(offset / containerWidth);
      
      if (dragPercent > 0.5 || Math.abs(offset) > SWIPE_THRESHOLD) {
        if (offset > 0) {
          handlePrevious();
        } else {
          handleNext();
        }
      }
      
      setStartX(0);
      setOffset(0);
      setIsDragging(false);
      setIsPaused(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [startX, isDragging, offset, handleNext, handlePrevious]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setStartX(e.clientX);
    setIsPaused(true);
    setIsDragging(false);
    setOffset(0);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsPaused(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("group relative w-full overflow-hidden rounded-lg bg-muted select-none touch-none", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Contenedor de slides con desplazamiento horizontal */}
      <div 
        className="relative w-full h-full"
        style={{
          transform: isDragging && containerRef.current
            ? `translateX(${(offset / containerRef.current.offsetWidth) * 100}%)`
            : 'none',
          transition: isDragging || isTransitioning
            ? 'none'
            : 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {images.map((img, index) => {
          // Calcular posición relativa para crear efecto de loop infinito
          let position = 0;
          
          if (isDragging && containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const baseOffset = (offset / containerWidth) * 100;
            
            if (index === currentIndex) {
              position = baseOffset;
            } else if (index === (currentIndex + 1) % images.length) {
              position = baseOffset + 100;
            } else if (index === (currentIndex - 1 + images.length) % images.length) {
              position = baseOffset - 100;
            } else {
              // Otros slides fuera de vista
              const diff = ((index - currentIndex + images.length) % images.length);
              if (diff <= images.length / 2) {
                position = baseOffset + (diff * 100);
              } else {
                position = baseOffset - ((images.length - diff) * 100);
              }
            }
          } else if (isTransitioning) {
            // Durante transición horizontal: nuevo slide entra desde derecha, anterior sale a izquierda
            if (index === currentIndex) {
              // Nuevo slide: empieza en 100% (derecha) si es inicio de transición, luego se anima a 0%
              position = transitionStart ? 100 : 0;
            } else if (index === prevIndex) {
              // Slide anterior: empieza en 0% y sale hacia -100% (izquierda)
              position = transitionStart ? 0 : -100;
            } else {
              // Otros slides fuera de vista
              position = index < currentIndex ? -200 : 200;
            }
          } else {
            // Posición normal: solo mostrar el slide actual
            if (index === currentIndex) {
              position = 0;
            } else if (index === (currentIndex + 1) % images.length) {
              position = 100;
            } else if (index === (currentIndex - 1 + images.length) % images.length) {
              position = -100;
            } else {
              position = index < currentIndex ? -200 : 200;
            }
          }

          const isVisible = Math.abs(position) <= 100 || (isTransitioning && (index === currentIndex || index === prevIndex));

          return (
            <div
              key={index}
              className="absolute inset-0"
              style={{
                transform: `translateX(${position}%)`,
                opacity: isVisible ? 1 : 0,
                zIndex: index === currentIndex ? 10 : (isTransitioning && index === prevIndex) ? 9 : isVisible ? 9 : 0,
                transition: isDragging
                  ? 'none'
                  : isTransitioning && !transitionStart
                    ? 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)'
                    : 'none',
              }}
            >
              <Image
                src={img}
                alt={`${name} - ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />

      {/* Texto del proyecto */}
      <div className="absolute top-4 left-4 z-30 pointer-events-none">
        <div className="text-white text-sm">{name}</div>
      </div>
      <div className="absolute top-4 right-4 z-30 pointer-events-none">
        <div className="text-white/80 text-sm">{industry}</div>
      </div>

      {/* Indicadores */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 z-30 flex gap-1.5 pointer-events-auto">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
