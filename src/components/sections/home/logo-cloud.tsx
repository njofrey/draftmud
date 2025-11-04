import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";

export default function LogoCloud() {
  return (
    <section className=" overflow-hidden pt-1 pb-1 md:pt-16 md:pb-6">
      <div className="group relative m-auto max-w-6xl safe-container">
        <div className="relative py-1.5 md:py-6">
          <InfiniteSlider speedOnHover={20} speed={40} gap={90}>
              <div className="flex items-center">
                <img
                  src="/images/Logos/shopify.svg"
                  alt="Shopify"
                  className="h-5 md:h-7 w-auto object-contain filter brightness-0 opacity-40"
                />
              </div>
              <div className="flex items-center">
                <img
                  src="/images/Logos/klaviyo.svg"
                  alt="Klaviyo"
                  className="h-5 md:h-7 w-auto object-contain filter brightness-0 opacity-40"
                />
              </div>
              <div className="flex items-center">
                <img
                  src="/images/Logos/mercadopago.svg"
                  alt="MercadoPago"
                  className="h-10 md:h-14 w-auto object-contain filter brightness-0 opacity-40"
                />
              </div>
              <div className="flex items-center">
                <img
                  src="/images/Logos/bsale.svg"
                  alt="Bsale"
                  className="h-8 md:h-12 w-auto object-contain filter brightness-0 opacity-40"
                />
              </div>
              <div className="flex items-center">
                <img
                  src="/images/Logos/shipit.svg"
                  alt="Shippit"
                  className="h-8 md:h-12 w-auto object-contain filter brightness-0 opacity-40"
                />
              </div>
              <div className="flex items-center">
                <img
                  src="/images/Logos/cloudflare.svg"
                  alt="Cloudflare"
                  className="h-8 md:h-12 w-auto object-contain filter brightness-0 opacity-40"
                />
              </div>
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}