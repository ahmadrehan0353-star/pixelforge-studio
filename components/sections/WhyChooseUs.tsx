import { whyChooseUs } from "@/lib/data";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

export default function WhyChooseUs() {
  return (
    <section className="section">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Why Choose Us</span>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Everything a growing business needs.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {whyChooseUs.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={(i % 4) * 0.06}>
              <TiltCard className="card flex flex-col items-center gap-3 py-8 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forge-gradient/20 ring-1 ring-white/[0.08]">
                  <Icon className="h-5 w-5 text-forge-cyan" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-medium text-white">{item.title}</p>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
