"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { projects as staticProjects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import DeviceMockup from "@/components/DeviceMockup";
import FreePreviewCTA from "@/components/sections/FreePreviewCTA";
import { fetchPortfolioBySlug } from "@/lib/usePublicFirestore";
import { mapStaticProject } from "@/lib/admin/mapStaticProject";
import type { PortfolioProject } from "@/lib/admin/types";

const fallback: PortfolioProject[] = staticProjects.map((p, i) => mapStaticProject(p, i));

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<PortfolioProject | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const found = await fetchPortfolioBySlug<PortfolioProject>(slug, fallback);
      setProject(found ?? null);
    })();
  }, [slug]);

  if (project === undefined) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-forge-cyan" />
      </div>
    );
  }

  if (project === null) {
    notFound();
  }

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
                  {project.caseStudy.overview}
                </p>
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-shrink-0"
                >
                  Visit Live Website
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <div className="flex justify-center py-6">
            {project.liveUrl ? (
              <DeviceMockup title={project.title} liveUrl={project.liveUrl} />
            ) : project.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="w-full max-w-2xl rounded-xl border border-white/[0.1] object-cover shadow-panel"
              />
            ) : (
              <DeviceMockup title={project.title} />
            )}
          </div>
          {project.galleryUrls.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.galleryUrls.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={url}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="aspect-video w-full rounded-lg object-cover"
                />
              ))}
            </div>
          )}
        </Reveal>
      </section>

      <section className="section max-w-5xl">
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="space-y-16 lg:col-span-2">
            {project.caseStudy.goals.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-white">Goals</h2>
                <ul className="mt-5 space-y-3">
                  {project.caseStudy.goals.map((g) => (
                    <li key={g} className="flex items-start gap-3 text-sm leading-relaxed text-mist-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-forge-cyan" />
                      {g}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {project.caseStudy.designProcess && (
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-white">Design Process</h2>
                <p className="mt-5 text-sm leading-relaxed text-mist-300">
                  {project.caseStudy.designProcess}
                </p>
              </Reveal>
            )}

            {project.caseStudy.uiDecisions.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-white">UI Decisions</h2>
                <ul className="mt-5 space-y-3">
                  {project.caseStudy.uiDecisions.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-mist-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-forge-cyan" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {project.caseStudy.features.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-white">Features</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.caseStudy.features.map((f) => (
                    <li key={f} className="card py-4 text-sm text-mist-300">
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {project.caseStudy.challenges.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-white">Challenges Solved</h2>
                <div className="mt-5 space-y-5">
                  {project.caseStudy.challenges.map((c) => (
                    <div key={c.challenge} className="card">
                      <p className="text-sm font-medium text-white">{c.challenge}</p>
                      <p className="mt-2 text-sm leading-relaxed text-mist-500">{c.solution}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {project.caseStudy.results.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-white">Results</h2>
                <ul className="mt-5 space-y-3">
                  {project.caseStudy.results.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm leading-relaxed text-mist-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-forge-ember" />
                      {r}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
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
