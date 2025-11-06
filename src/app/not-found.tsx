import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Página no encontrada</h1>
      <p className="mt-4 text-muted-foreground max-w-md">
        Lo sentimos, no pudimos encontrar la página que buscas. Revisa la URL o vuelve al inicio.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/80"
      >
        Volver al inicio
      </Link>
    </main>
  );
}

