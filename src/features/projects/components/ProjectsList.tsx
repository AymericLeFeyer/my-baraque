"use client";

import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  Layout,
} from "@/features/page/layout";
import { useProjectsStore } from "../projects.store";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import { ProjectCard } from "@/features/houses/components/ProjectCard";
import { useRouter } from "next/navigation";

export type ProjectsListProps = {};

export const ProjectsList = (props: ProjectsListProps) => {
  const { projects } = useProjectsStore();
  const router = useRouter();

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Projects</LayoutTitle>
        <Button
          variant="outline"
          onClick={() => router.push(`/projects/new`)}
          className="flex gap-2 "
        >
          <FolderPlus size={24} />
          <p className="font-bold">Create project</p>
        </Button>
      </LayoutHeader>
      <LayoutContent>
        <div className="flex items-center justify-between"></div>

        <div className="mt-3 flex flex-col gap-3">
          {projects.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </LayoutContent>
    </Layout>
  );
};
