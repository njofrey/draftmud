"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "exception", {
        description: error.message,
        fatal: false,
      });
    }
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Ha ocurrido un error</h1>
      <p className="mt-4 text-muted-foreground max-w-md">
        Hubo un problema al cargar la página. Puedes intentar nuevamente o volver más tarde.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center justify-center rounded-md bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/80"
      >
        Reintentar
      </button>
    </main>
  );
}

