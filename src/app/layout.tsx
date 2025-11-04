import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConditionalHeader } from "@/components/conditional-header";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://estudiomud.com"),
  title: {
    default: "Estudio Mud | Sitios Web y E-commerce de Alto Rendimiento",
    template: "%s | Estudio Mud",
  },
  description:
    "Diseñamos y desarrollamos sitios rápidos, claros y con identidad. Para marcas que valoran diseño, ejecución y resultados reales. Especialistas en e-commerce de alto rendimiento en Chile y Latinoamérica.",
  keywords: [
    "diseño web",
    "desarrollo web",
    "e-commerce",
    "tienda online",
    "sitios web premium",
    "diseño web Chile",
    "desarrollo web Chile",
    "e-commerce Chile",
    "diseño UI/UX",
    "desarrollo web profesional",
    "sitios web rápidos",
    "e-commerce de alto rendimiento",
  ],
  authors: [{ name: "Estudio Mud" }],
  creator: "Estudio Mud",
  publisher: "Estudio Mud",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://estudiomud.com",
    siteName: "Estudio Mud",
    title: "Estudio Mud | Sitios Web y E-commerce de Alto Rendimiento",
    description:
      "Diseñamos y desarrollamos sitios rápidos, claros y con identidad. Para marcas que valoran diseño, ejecución y resultados reales.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Estudio Mud",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio Mud | Sitios Web y E-commerce de Alto Rendimiento",
    description:
      "Diseñamos y desarrollamos sitios rápidos, claros y con identidad. Para marcas que valoran diseño, ejecución y resultados reales.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Agregar códigos de verificación cuando estén disponibles
    // google: "google-site-verification-code",
    // yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Estudio Mud",
    url: "https://estudiomud.com",
    description:
      "Estudio digital premium especializado en sitios web y e-commerce de alto rendimiento",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CL",
    },
    sameAs: [
      // Agregar redes sociales cuando estén disponibles
    ],
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${ibmPlexMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConditionalHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
