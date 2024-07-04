import { ProjectsList } from "@/features/projects/components/ProjectsList";
import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  return <ProjectsList />;
}
