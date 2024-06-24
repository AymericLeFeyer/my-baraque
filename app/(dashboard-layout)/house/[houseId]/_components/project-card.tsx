"use client";

import type { Project } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteProject } from "../_actions/delete-project";

export type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
      <div>
        <div className="font-semibold">{props.project.name}</div>
        <div>{props.project.description}</div>
      </div>
      <Trash
        className="transition-colors duration-300 hover:text-red-500"
        onClick={() => {
          deleteProject(props.project.id);
          router.refresh();
        }}
      />
    </div>
  );
};
