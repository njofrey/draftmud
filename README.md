# Estudio Mud – Internal Web

Sitio institucional de Estudio Mud (ecommerce y sitios premium en Chile). Este repositorio es de uso interno del equipo; la información pública del sitio vive en el CMS.

## Requisitos

- Node.js `>=20.11.0 <21`
- pnpm `>=9`
  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```

## Uso diario

### Desarrollo
```bash
pnpm install
pnpm dev        # http://localhost:3000 con hot reload
```

### Producción local
```bash
pnpm build
pnpm start      # Previene sorpresas antes del deploy
```

## Variables de entorno

`.env.example` lista las variables necesarias (GA4, Meta Pixel, Formspree). Completa los valores reales en tu `.env.local` y no los compartas fuera del equipo.

Para cambios futuros, documentar aquí cualquier variable adicional sin exponer IDs ni secretos.

## Puntos clave del proyecto

- Next.js 15 (App Router) + React 19 + TypeScript.
- Tailwind + motion primitives personalizados para animaciones.
- Formulario de contacto integrado con Formspree (honeypot, UTM tracking y eventos GA/Facebook).
- Instrumentación analytics (GA4 + Meta Pixel) encapsulada en `src/app/_components` y utilidades en `src/lib`.
- Fuentes locales (Faktum/Migra) declaradas en `src/app/fonts.ts`.

## Workflow sugerido

1. Trabajar en ramas feature/bugfix y abrir PR interna.
2. Ejecutar `pnpm build` antes de merge para verificar lint + types (usar Node 20.x LTS).
3. Deploy en Vercel (proyecto `estudiomud-cl`) o infraestructura que defina el equipo.

## Contacto

- Email interno: contacto@estudiomud.com
- Oficina: Vitacura, Santiago (Chile)

---

Repositorio mantenido por Estudio Mud. Consultas sobre infraestructura o acceso: canal `#tech-web` del Slack interno.