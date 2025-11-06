import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const faktum = localFont({
  variable: "--font-faktum",
  src: [
    {
      path: "../../public/fonts/faktum-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/faktum-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["sans-serif"],
});

export const migra = localFont({
  variable: "--font-migra",
  src: [
    {
      path: "../../public/fonts/migra-extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/migra-extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["serif"],
});

export const fonts = [ibmPlexMono, faktum, migra];

