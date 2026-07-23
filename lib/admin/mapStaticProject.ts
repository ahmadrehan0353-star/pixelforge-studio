import type { Project } from "@/lib/data";
import type { PortfolioProject } from "@/lib/admin/types";

export function mapStaticProject(p: Project, order: number): PortfolioProject {
  return {
    title: p.title,
    category: p.category,
    description: p.description,
    tech: p.tech,
    liveUrl: p.liveUrl,
    githubUrl: "",
    clientName: "",
    completionDate: "",
    caseStudy: {
      overview: p.overview,
      goals: p.goals,
      designProcess: p.designProcess,
      uiDecisions: p.uiDecisions,
      features: p.features,
      challenges: p.challenges,
      results: p.results,
    },
    thumbnailUrl: "",
    galleryUrls: [],
    featured: true,
    status: "published",
    order,
    slug: p.slug,
  };
}
