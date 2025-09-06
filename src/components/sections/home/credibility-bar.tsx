import Image from "next/image";

const credibilityData = [
  { 
    title: "Ecommerce en Shopify", 
    description: "diseñados para crecer",
    icon: "/images/experiencia.png"
  },
  { 
    title: "Experiencia con marcas", 
    description: "gourmet y retail en Chile",
    icon: "/images/prestigio.png"
  },
  { 
    title: "Resultados comprobados", 
    description: "en proyectos reales",
    icon: "/images/resultados.png"
  },
  { 
    title: "Solo 3 proyectos", 
    description: "nuevos al mes",
    icon: "/images/exclusividad.png"
  }
];

const logos = [
  { name: "Shopify", src: "/images/Logos/shopify.svg" },
  { name: "Klaviyo", src: "/images/Logos/klaviyo.svg" },
  { name: "MercadoPago", src: "/images/Logos/mercadopago.svg" },
  { name: "Bsale", src: "/images/Logos/bsale.svg" },
  { name: "Shippit", src: "/images/Logos/shipit.svg" },
  { name: "Cloudflare", src: "/images/Logos/cloudflare.svg" }
];

export default function CredibilityBar() {
  return (
    <section className="py-8 bg-muted/30 border-y border-border/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Stats */}
          {credibilityData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 flex justify-center">
                <Image 
                  src={item.icon} 
                  alt={item.title}
                  width={96}
                  height={96}
                  className="h-24 w-24 object-contain"
                />
              </div>
              <div className="text-base text-muted-foreground leading-relaxed">
                <div className="font-bold text-foreground text-lg">{item.title}</div>
                <div>{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

