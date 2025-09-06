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

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Overlay transparente para cerrar el menú */}
      {menuState && (
        <div
          className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
      
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
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
                <Menu className={cn(
                  "m-auto size-6 transition-all duration-300 ease-in-out",
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
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {NAV_LINKS.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className=" hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div 
              id="mobile-menu"
              className={cn(
                "bg-background mb-6 w-full flex-wrap items-center justify-start space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent",
                "lg:flex", // Siempre visible en desktop
                menuState ? "flex" : "hidden", // Toggle en mobile
                "transition-all duration-300 ease-in-out" // Transición suave
              )}
            >
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {NAV_LINKS.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {/* <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  <Link href="#">
                    <span>Login</span>
                  </Link>
                </Button> */}
                <Button
                  asChild
                  size="lg"
                >
                  <Link href="#contact" onClick={handleLinkClick}>
                    <span>Contacto</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
