import { processSteps } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Process() {
  return (
    <section className="section">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Our Process</span>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          From idea to launch, five clear steps.
        </h2>
      </Reveal>

      <div className="relative mt-16">
        <div
          className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-forge-indigo via-forge-cyan to-transparent md:left-1/2"
          aria-hidden="true"
        />
        <div className="space-y-10">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.08}>
              <div
                className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex items-center gap-4 md:w-1/2 md:justify-end md:pr-10 md:only:justify-start">
                  <div
                    className={`flex-shrink-0 ${i % 2 === 1 ? "md:order-2" : ""}`}
                  >
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-forge-gradient font-mono text-sm font-bold text-white shadow-glow">
                      {step.step}
                    </span>
                  </div>
                  <div className={`card flex-1 md:hidden`}>
                    <h3 className="font-display text-lg font-medium text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-500">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2 md:px-10">
                  <div className="card">
                    <h3 className="font-display text-lg font-medium text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
