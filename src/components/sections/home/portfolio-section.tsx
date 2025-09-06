import PortfolioCard from "@/components/portfolio-card";
import { PORTFOLIO_CONTENT } from "@/content/portfolio";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { InView } from "@/components/motion-primitives/in-view";

export default function PortfolioSection() {
  return (
    <section
      className="py-16 md:py-32 bg-gray-50 dark:bg-transparent"
      id="portfolio"
    >
      <div className="mx-auto max-w-5xl space-y-12 px-6">
        <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <h2 className="text-4xl font-semibold text-center md:text-left">
            Proyectos destacados
          </h2>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
              },
            }}
            viewOptions={{ margin: "0px 0px -100px 0px" }}
          >
            <p className="max-w-sm mx-auto text-center md:mx-0 md:text-left md:ml-auto">
              Proyectos que han transformado negocios y generado resultados medibles para nuestros clientes en diferentes industrias.
            </p>
          </InView>
        </div>
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
            },
          }}
          viewOptions={{ margin: "0px 0px -100px 0px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {PORTFOLIO_CONTENT.map((item, index) => (
              <div key={index} className={index % 2 === 1 ? "md:mt-20" : ""}>
                <PortfolioCard card={item} />
              </div>
            ))}
          </div>
        </InView>
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
            },
          }}
          viewOptions={{ margin: "0px 0px -100px 0px" }}
        >
          <div className="mt-20">
            <Link
              href="#link"
              className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
            >
              <span className="text-foreground text-base">Ver Más Proyectos</span>
              <span className="dark:border-background block h-8 w-1 border-l bg-white dark:bg-zinc-700"></span>

              <div className="bg-background group-hover:bg-muted size-8 overflow-hidden rounded-full duration-500 -rotate-45 ">
                <div className="flex w-16 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                  <span className="flex size-8">
                    <ArrowRight className="m-auto size-4" />
                  </span>
                  <span className="flex size-8">
                    <ArrowRight className="m-auto size-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </InView>
      </div>
    </section>
  );
}
