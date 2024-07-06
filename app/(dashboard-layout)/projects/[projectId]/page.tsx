import { ProjectPage } from "@/features/projects/components/ProjectPage";

export default async function RoutePage({
  params,
}: {
  params: { projectId: string };
}) {
  return <ProjectPage projectId={params.projectId} />;
}
