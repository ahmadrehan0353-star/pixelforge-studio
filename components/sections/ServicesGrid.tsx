import { services } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function ServicesGrid({
  eyebrow = "What We Build",
  title = "Websites for every kind of business.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="section">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          {title}
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.title} delay={(i % 4) * 0.08}>
              <div className="card group h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forge-gradient/20 ring-1 ring-white/[0.08] transition-transform duration-300 group-hover:scale-110 group-hover:ring-forge-cyan/40">
                  <Icon className="h-5 w-5 text-forge-cyan" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-lg font-medium text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-500">
                  {service.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
