"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/content/nav";

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const inactivityTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Función para cerrar menú al hacer click en un link
  const handleLinkClick = () => {
    setMenuState(false);
  };

  // Función para cerrar menú al hacer click en el overlay
  const handleOverlayClick = () => {
    setMenuState(false);
  };

  // Función para cerrar menú con tecla Escape
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setMenuState(false);
    }
  };

  // Función para resetear el timer de inactividad
  const resetInactivityTimer = React.useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    if (menuState) {
      inactivityTimerRef.current = setTimeout(() => {
        setMenuState(false);
      }, 10000); // Auto-cerrar después de 10 segundos de inactividad
    }
  }, [menuState]);

  // Función para manejar actividad del usuario
  const handleUserActivity = React.useCallback(() => {
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // Manejar scroll y cambio de estilo
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Cambio de estilo al scroll
          setIsScrolled(currentScrollY > 50);
          
          // No ocultar si el menú está abierto
          if (menuState) {
            setIsVisible(true);
            lastScrollY.current = currentScrollY;
            ticking = false;
            return;
          }
          
          // Siempre visible en el top
          if (currentScrollY < 10) {
            setIsVisible(true);
          } 
          // Scroll hacia abajo - ocultar
          else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false);
          } 
          // Scroll hacia arriba - mostrar
          else if (currentScrollY < lastScrollY.current) {
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Inicializar
    lastScrollY.current = window.scrollY;
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuState]);

  // Manejar tecla Escape, prevenir scroll y auto-cerrar por inactividad
  React.useEffect(() => {
    if (menuState) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousemove', handleUserActivity);
      document.addEventListener('touchstart', handleUserActivity);
      document.addEventListener('click', handleUserActivity);
      
      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = 'hidden';
      
      // Iniciar timer de inactividad
      resetInactivityTimer();
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('touchstart', handleUserActivity);
      document.removeEventListener('click', handleUserActivity);
      document.body.style.overflow = 'unset';
      
      // Limpiar timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    }

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('touchstart', handleUserActivity);
      document.removeEventListener('click', handleUserActivity);
      document.body.style.overflow = 'unset';
      
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [menuState, handleUserActivity, resetInactivityTimer]);
  return (
    <header>
      
      <nav
        data-state={menuState && "active"}
        style={{
          transform: isVisible || menuState ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isVisible || menuState ? 1 : 0,
          pointerEvents: isVisible || menuState ? 'auto' : 'none',
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
        }}
        className={cn(
          "fixed w-full px-2",
          menuState ? "z-[60]" : "z-20"
        )}
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-md border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <span className="text-2xl font-bold text-foreground font-dm-sans tracking-tight">
                  ESTUDIO MUD
                </span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                aria-expanded={menuState}
                aria-controls="mobile-menu"
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden transition-all duration-300 ease-in-out"
              >
                <div className="relative size-6">
                  <Menu className={cn(
                    "absolute inset-0 m-auto size-6 transition-all duration-300 ease-in-out",
                    menuState 
                      ? "rotate-180 scale-0 opacity-0" 
                      : "rotate-0 scale-100 opacity-100"
                  )} />
                  <X className={cn(
                    "absolute inset-0 m-auto size-6 transition-all duration-300 ease-in-out",
                    menuState 
                      ? "rotate-0 scale-100 opacity-100" 
                      : "-rotate-180 scale-0 opacity-0"
                  )} />
                </div>
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:flex lg:items-center lg:gap-8">
              <ul className="flex gap-8 text-sm">
                {NAV_LINKS.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="hidden lg:block">
              <Button
                asChild
                size="lg"
              >
                <Link href="#contact">
                  <span>Contacto</span>
                </Link>
              </Button>
            </div>


          </div>
        </div>
      </nav>
      
      {/* Menú móvil full-screen - estilo editorial */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-background lg:hidden",
          "flex flex-col justify-start items-start px-8 md:px-12 pt-36 md:pt-44",
          "transition-all duration-500 ease-in-out",
          menuState 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
        onClick={handleOverlayClick}
      >
        {/* Navegación principal - tipografía grande */}
        <nav className="w-full">
          <ul className="space-y-4">
            {NAV_LINKS.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className="migra-xl text-4xl md:text-5xl leading-tight text-foreground hover:opacity-70 transition-opacity duration-200 block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {/* Contacto como otro título más */}
            <li>
              <Link
                href="#contact"
                onClick={handleLinkClick}
                className="migra-xl text-4xl md:text-5xl leading-tight text-foreground hover:opacity-70 transition-opacity duration-200 block"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
