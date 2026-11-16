import { notFound } from "next/navigation";
import ProjectDetails from "../../../components/ProjectDetails";
import { projects } from "../../../data/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Sayeed Bin Salim`,
    description: project.description,
    openGraph: { images: [project.image] },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return <ProjectDetails key={project.slug} project={project} />;
}
