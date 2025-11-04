"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStart, setTransitionStart] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0); // Ref para mantener el índice actual sin causar re-renders
  const isDraggingRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const mountedRef = useRef(true);
  
  const SWIPE_THRESHOLD = 50;

  // Proteger contra setState después de unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Sincronizar refs con states
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  // Verificar prefers-reduced-motion una sola vez con useMemo
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Auto-advance - el intervalo corre siempre, solo salta el tick si está en transición
  const startAutoAdvance = useCallback(() => {
    if (autoAdvanceTimerRef.current || images.length <= 1) return;
    
    autoAdvanceTimerRef.current = setInterval(() => {
      // sigue corriendo siempre, solo evita solaparse
      if (isTransitioningRef.current || isDraggingRef.current) return;
      
      const current = currentIndexRef.current;
      setPrevIndex(current);
      setIsTransitioning(true);
      setTransitionStart(true);
      setCurrentIndex((prev) => (prev + 1) % images.length);
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionStart(false);
        });
      });
      
      setTimeout(() => {
        if (!mountedRef.current) return;
        setIsTransitioning(false);
        setTransitionStart(false);
      }, 600);
    }, 5500);
  }, [images.length]);

  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = null;
      }
    };
  }, [startAutoAdvance]);

  // Cortar el intervalo si images.length pasa a 1
  useEffect(() => {
    if (images.length <= 1 && autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  }, [images.length]);

  // Detener el intervalo si la pestaña queda oculta, ahorra CPU sin afectar UX
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        // Detener el intervalo cuando la pestaña está oculta
        if (autoAdvanceTimerRef.current) {
          clearInterval(autoAdvanceTimerRef.current);
          autoAdvanceTimerRef.current = null;
        }
      } else {
        // No recrea el intervalo, solo asegura que exista
        startAutoAdvance();
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [startAutoAdvance]);

  const goToSlide = useCallback((index: number) => {
    setPrevIndex(currentIndexRef.current);
    setIsTransitioning(true);
    setTransitionStart(true);
    setCurrentIndex(index);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionStart(false);
      });
    });
    setTimeout(() => {
      if (!mountedRef.current) return;
      setIsTransitioning(false);
      setTransitionStart(false);
    }, 600);
  }, []);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setIsDragging(false);
    setCurrentX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === 0) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    
    if (Math.abs(deltaX) > 5) {
      e.preventDefault();
      setIsDragging(true);
      setCurrentX(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (!containerRef.current || startX === 0) {
      setStartX(0);
      setIsDragging(false);
      setCurrentX(0);
      return;
    }
    
    if (!isDragging) {
      setStartX(0);
      return;
    }
    
    const containerWidth = containerRef.current.offsetWidth;
    const dragPercent = Math.abs(currentX / containerWidth);
    
    if (dragPercent > 0.3 || Math.abs(currentX) > SWIPE_THRESHOLD) {
      // 1, marca inicio
      setPrevIndex(currentIndexRef.current);
      setIsTransitioning(true);
      setTransitionStart(true);
      // 2, fija el índice destino
      if (currentX > 0) {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
      // 3, espera un frame para que el DOM pinte la posición inicial
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // 4, habilita transición y recién aquí resetea currentX para que anime
          setTransitionStart(false);
          setCurrentX(0);
        });
      });
      // 5, limpia flags al terminar la animación
      setTimeout(() => {
        if (!mountedRef.current) return;
        setIsTransitioning(false);
        setTransitionStart(false);
      }, 600);
    } else {
      // Snap back: mantener currentX y animar hacia 0 con efecto suave
      setIsDragging(false);
      setIsSnapping(true);
      // Delay más largo para que se "detenga" en su posición antes de animar
      setTimeout(() => {
        if (!mountedRef.current) return;
        setCurrentX(0); // Esto iniciará la animación hacia 0
        setTimeout(() => {
          if (!mountedRef.current) return;
          setIsSnapping(false);
        }, 500);
      }, 150); // Delay más largo para efecto natural
    }
    
    setStartX(0);
    setIsDragging(false);
    /* nada que reiniciar */
  };

  // Mouse events
  useEffect(() => {
    if (startX === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const deltaX = e.clientX - startX;
      
      if (Math.abs(deltaX) > 3) {
        setIsDragging(true);
        setCurrentX(deltaX);
      }
    };

    const handleMouseUp = () => {
      if (!containerRef.current || startX === 0) {
        setStartX(0);
        setIsDragging(false);
        setCurrentX(0);
        return;
      }
      
      if (!isDragging) {
        setStartX(0);
        return;
      }
      
      const containerWidth = containerRef.current.offsetWidth;
      const dragPercent = Math.abs(currentX / containerWidth);
      
      if (dragPercent > 0.3 || Math.abs(currentX) > SWIPE_THRESHOLD) {
        // 1, marca inicio
        setPrevIndex(currentIndexRef.current);
        setIsTransitioning(true);
        setTransitionStart(true);
        // 2, fija el índice destino
        if (currentX > 0) {
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        } else {
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }
        // 3, espera un frame para que el DOM pinte la posición inicial
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // 4, habilita transición y recién aquí resetea currentX para que anime
            setTransitionStart(false);
            setCurrentX(0);
          });
        });
        // 5, limpia flags al terminar la animación
        setTimeout(() => {
          if (!mountedRef.current) return;
          setIsTransitioning(false);
          setTransitionStart(false);
        }, 600);
      } else {
        // Snap back: mantener currentX y animar hacia 0 con efecto suave
        setIsDragging(false);
        setIsSnapping(true);
        // Delay más largo para que se "detenga" en su posición antes de animar
        setTimeout(() => {
          if (!mountedRef.current) return;
          setCurrentX(0); // Esto iniciará la animación hacia 0
          setTimeout(() => {
            if (!mountedRef.current) return;
            setIsSnapping(false);
          }, 500);
        }, 150); // Delay más largo para efecto natural
      }
      
      setStartX(0);
      setIsDragging(false);
      /* nada que reiniciar */
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startX, isDragging, currentX]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setStartX(e.clientX);
    setIsDragging(false);
    setCurrentX(0);
  };

  const handleMouseEnter = () => {};
  const handleMouseLeave = () => {};

  return (
    <div
      ref={containerRef}
      className={cn("group relative w-full overflow-hidden rounded-lg bg-black select-none touch-none", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className="relative w-full h-full">
        {images.map((img, index) => {
          const isActive = index === currentIndex;
          const isNext = index === (currentIndex + 1) % images.length;
          const isPrev = index === (currentIndex - 1 + images.length) % images.length;
          
          let position = 0;
          
          if (isDragging && containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const dragPercent = (currentX / containerWidth) * 100;
            
            if (isActive) {
              position = dragPercent;
            } else if (currentX < 0 && isNext) {
              position = dragPercent + 100;
            } else if (currentX > 0 && isPrev) {
              position = dragPercent - 100;
            } else {
              position = isActive ? 0 : isPrev ? -100 : 100;
            }
          } else if (isSnapping && containerRef.current) {
            // Durante snap back: usar currentX para animar desde posición actual
            const containerWidth = containerRef.current.offsetWidth;
            const dragPercent = (currentX / containerWidth) * 100;
            
            if (isActive) {
              position = dragPercent; // Esto animará hacia 0 cuando currentX se resetee
            } else if (currentX < 0 && isNext) {
              position = dragPercent + 100;
            } else if (currentX > 0 && isPrev) {
              position = dragPercent - 100;
            } else {
              position = isActive ? 0 : isPrev ? -100 : 100;
            }
          } else if (isTransitioning) {
            if (index === currentIndex) {
              const direction = prevIndex < currentIndex || (prevIndex === images.length - 1 && currentIndex === 0) ? 1 : -1;
              position = transitionStart ? (direction === 1 ? 100 : -100) : 0;
            } else if (index === prevIndex) {
              const direction = prevIndex < currentIndex || (prevIndex === images.length - 1 && currentIndex === 0) ? 1 : -1;
              position = transitionStart ? 0 : (direction === 1 ? -100 : 100);
            } else {
              position = isPrev ? -100 : 100;
            }
          } else {
            // reposo, siempre coloca prev en -100 y next en 100, incluso en wrap
            position = isActive ? 0 : isPrev ? -100 : 100;
          }

          const isVisible = isActive 
            || (isDragging && (isNext || isPrev))
            || (isSnapping && (isNext || isPrev))
            || (isTransitioning && (isActive || index === prevIndex));

          return (
            <div
              key={index}
              className="absolute inset-0 will-change-transform"
              style={{
                transform: `translate3d(${position}%, 0, 0)`,
                opacity: isVisible ? 1 : 0,
                zIndex: isActive ? 10 : (isDragging && (isNext || isPrev)) ? 9 : 0,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                transition: isDragging 
                  ? 'none' 
                  : isSnapping
                    ? (prefersReducedMotion
                        ? 'none'
                        : 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)')
                    : isTransitioning
                      ? (prefersReducedMotion
                          ? 'none'
                          : 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)')
                      : 'none',
              }}
            >
              <Image
                src={img}
                alt={`${name} - ${index + 1}`}
                fill
                className="object-cover"
                priority={isActive || isNext}
                loading={(isActive || isNext) ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />

      <div className="absolute top-4 left-4 z-30 pointer-events-none">
        <div className="text-white text-sm">{name}</div>
      </div>
      <div className="absolute top-4 right-4 z-30 pointer-events-none">
        <div className="text-white/80 text-sm">{industry}</div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 z-30 flex gap-1.5 pointer-events-auto">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
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
