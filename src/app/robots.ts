import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/gracias/", "/full-version/"],
    },
    sitemap: "https://estudiomud.cl/sitemap.xml",
  };
}

