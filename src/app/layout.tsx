import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

import { ConditionalHeader } from "@/components/conditional-header";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsBoot } from "./_components/AnalyticsBoot";
import { AnalyticsClient } from "./_components/AnalyticsClient";
import { faktum, ibmPlexMono, migra } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://estudiomud.cl"),
  title: {
    default: "Estudio Mud | Sitios Web y E-commerce de Alto Rendimiento",
    template: "%s | Estudio Mud",
  },
  alternates: {
    canonical: "/",
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
    url: "https://estudiomud.cl",
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
    url: "https://estudiomud.cl",
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

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://estudiomud.cl",
    name: "Estudio Mud",
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body
        className={`${ibmPlexMono.variable} ${faktum.variable} ${migra.variable} antialiased`}
      >
        {/* GA4 Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YS4ESX1K4Q"
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YS4ESX1K4Q', { send_page_view: false });
          `}
        </Script>

        {/* Meta Pixel Script */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '370738295866312');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Meta Pixel Noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=370738295866312&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConditionalHeader />
          {children}
        </ThemeProvider>

        {/* Analytics Components */}
        <AnalyticsClient />
        <AnalyticsBoot />
      </body>
    </html>
  );
}
