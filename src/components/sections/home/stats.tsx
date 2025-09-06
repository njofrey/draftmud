"use client";

export default function StatsSection() {
  return (
    <section className="py-12 md:py-20" id="stats">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-medium lg:text-5xl">
            Impulsados por el Diseño. Respalados por Resultados.
          </h2>
          <p>
            En Estudio Mud, no solo hacemos que las cosas se vean bien — creamos
            experiencias de diseño reflexivas que ayudan a las empresas a crecer, conectar
            con su audiencia y destacar en un mundo digital saturado.
          </p>
        </div>
        <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          <div className="space-y-4">
            <div className="text-5xl font-bold">+120</div>
            <p>Proyectos Lanzados</p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold">40%</div>
            <p>Crecimiento Promedio de Clientes</p>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold">5+</div>
            <p>Años en el Juego</p>
          </div>
        </div>
      </div>
    </section>
  );
}
