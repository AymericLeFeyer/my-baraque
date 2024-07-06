"use client";

import { Badge } from "@/components/ui/badge";
import { useProjectsStore } from "@/features/projects/projects.store";
import type { Project } from "@prisma/client";
import { Folder } from "lucide-react";
import { useRouter } from "next/navigation";

export type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const router = useRouter();
  const { numberOfTasks } = useProjectsStore();

  return (
    <div
      className=" cursor-pointer  rounded-lg border  p-4 transition-colors duration-300 hover:bg-primary-foreground"
      onClick={() => router.push(`/projects/${props.project.id}`)}
    >
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Folder />
          <div className="font-semibold">{props.project.name}</div>
        </div>
        {numberOfTasks.get(props.project.id) != undefined &&
          numberOfTasks.get(props.project.id)! > 0 && (
            <Badge>{numberOfTasks.get(props.project.id) ?? 0}</Badge>
          )}
      </div>
      <div className="mt-2 text-muted-foreground">
        {props.project.description}
      </div>
    </div>
  );
};
