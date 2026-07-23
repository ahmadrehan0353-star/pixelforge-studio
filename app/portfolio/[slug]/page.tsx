import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { projects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import DeviceMockup from "@/components/DeviceMockup";
import FreePreviewCTA from "@/components/sections/FreePreviewCTA";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-20 sm:pt-28">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-forge-indigo/15 blur-[130px]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
          <Reveal>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-mist-500 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>

            <div className="mt-8 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <span className="eyebrow">{project.category}</span>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-mist-500">
                  {project.overview}
                </p>
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-shrink-0"
              >
                Visit Live Website
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <div className="flex justify-center py-6">
            <DeviceMockup title={project.title} />
          </div>
        </Reveal>
      </section>

      <section className="section max-w-5xl">
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="space-y-16 lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-white">Goals</h2>
              <ul className="mt-5 space-y-3">
                {project.goals.map((g) => (
                  <li key={g} className="flex items-start gap-3 text-sm leading-relaxed text-mist-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-forge-cyan" />
                    {g}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-white">Design Process</h2>
              <p className="mt-5 text-sm leading-relaxed text-mist-300">
                {project.designProcess}
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-white">UI Decisions</h2>
              <ul className="mt-5 space-y-3">
                {project.uiDecisions.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-mist-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-forge-cyan" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-white">Features</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="card py-4 text-sm text-mist-300">
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-white">Challenges Solved</h2>
              <div className="mt-5 space-y-5">
                {project.challenges.map((c) => (
                  <div key={c.challenge} className="card">
                    <p className="text-sm font-medium text-white">{c.challenge}</p>
                    <p className="mt-2 text-sm leading-relaxed text-mist-500">{c.solution}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-white">Results</h2>
              <ul className="mt-5 space-y-3">
                {project.results.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm leading-relaxed text-mist-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-forge-ember" />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-1">
            <Reveal className="sticky top-24">
              <div className="glass-panel p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-mist-500">
                  Technologies Used
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-mist-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/[0.08] pt-6">
                  <p className="text-sm text-mist-500">
                    Want a website like this for your business?
                  </p>
                  <Link href="/contact" className="btn-primary mt-4 w-full">
                    Request Your Free Mockup
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FreePreviewCTA />
    </>
  );
}
