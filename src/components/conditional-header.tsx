"use client";
import { usePathname } from "next/navigation";
import { HeroHeader } from "./header";

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // No mostrar header en la página de gracias
  if (pathname === "/gracias") {
    return null;
  }
  
  return <HeroHeader />;
}

