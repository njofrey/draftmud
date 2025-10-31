import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";

export default function LogoCloud() {
  return (
    <section className=" overflow-hidden pt-12 pb-8 md:pt-16 md:pb-12">
      <div className="group relative m-auto max-w-6xl pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] md:px-6 lg:px-8">
        <div className="relative py-6">
          <InfiniteSlider speedOnHover={20} speed={40} gap={100}>
              <div className="flex items-center">
                <img
                  src="/images/Logos/shopify.svg"
                  alt="Shopify"
                  className="h-7 w-auto object-contain filter brightness-0"
                />
              </div>
              <div className="flex items-center">
                <img
                  src="/images/Logos/klaviyo.svg"
                  alt="Klaviyo"
                  className="h-7 w-auto object-contain filter brightness-0"
                />
              </div>
              <div className="flex items-center">
                <img
                  src="/images/Logos/mercadopago.svg"
                  alt="MercadoPago"
                  className="h-14 w-auto object-contain filter brightness-0"
                />
              </div>
              <div className="flex items-center">
                <img
                  src="/images/Logos/bsale.svg"
                  alt="Bsale"
                  className="h-12 w-auto object-contain filter brightness-0"
                />
              </div>
              <div className="flex items-center">
                <img
                  src="/images/Logos/shipit.svg"
                  alt="Shippit"
                  className="h-12 w-auto object-contain filter brightness-0"
                />
              </div>
              <div className="flex items-center">
                <img
                  src="/images/Logos/cloudflare.svg"
                  alt="Cloudflare"
                  className="h-12 w-auto object-contain filter brightness-0"
                />
              </div>
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}