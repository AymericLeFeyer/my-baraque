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
import { useCurrentHouseStore } from "@/features/houses/current-house.store";

export type ProjectsListProps = {};

export const ProjectsList = (props: ProjectsListProps) => {
  const { projects } = useProjectsStore();
  const { house } = useCurrentHouseStore();
  const router = useRouter();

  if (house == null) {
    return null;
  }

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Projets</LayoutTitle>
        <Button
          variant="outline"
          onClick={() => router.push(`/projects/new`)}
          className="flex gap-2 "
        >
          <FolderPlus size={24} />
          <p className="font-bold">Créer un projet</p>
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
