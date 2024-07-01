"use client";

import type { Project } from "@prisma/client";
import { Folder, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteProject } from "../_actions/delete-project";

export type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-lg border  p-4 transition-colors duration-300 hover:bg-primary-foreground"
      onClick={() =>
        router.push(
          `/houses/${props.project.houseId}/projects/${props.project.id}`,
        )
      }
    >
      <div>
        <div className="flex gap-2">
          <Folder />
          <div className="font-semibold">{props.project.name}</div>
        </div>
        <div className="mt-2 text-muted-foreground">
          {props.project.description}
        </div>
      </div>
    </div>
  );
};
