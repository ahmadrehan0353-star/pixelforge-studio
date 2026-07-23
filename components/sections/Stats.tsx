import { stats } from "@/lib/data";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";

export default function Stats() {
  return (
    <section className="border-y border-white/[0.06] bg-ink-900/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-16 sm:px-8 lg:grid-cols-4 lg:px-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-mist-500">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
