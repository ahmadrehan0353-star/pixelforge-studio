import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { projects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import DeviceMockup from "@/components/DeviceMockup";

export default function FeaturedProjects() {
  return (
    <section className="section">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Recent Work</span>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Real businesses, real websites.
        </h2>
        <p className="mt-4 text-mist-500">
          A look at projects we&apos;ve designed and shipped to production.
        </p>
      </Reveal>

      <div className="mt-16 space-y-10">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.1}>
            <div className="glass-panel grid gap-10 overflow-hidden p-8 lg:grid-cols-2 lg:p-12">
              <div className="order-2 flex flex-col justify-center lg:order-1">
                <span className="eyebrow">{project.category}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-mist-500 sm:text-base">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-mist-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Live Website
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <Link href={`/portfolio/${project.slug}`} className="btn-secondary">
                    <FileText className="h-4 w-4" />
                    View Case Study
                  </Link>
                </div>
              </div>

              <div className="order-1 flex items-center justify-center lg:order-2">
                <DeviceMockup title={project.title} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
