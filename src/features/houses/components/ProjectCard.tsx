"use client";

import type { Project } from "@prisma/client";
import { Folder } from "lucide-react";
import { useRouter } from "next/navigation";

export type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-lg border  p-4 transition-colors duration-300 hover:bg-primary-foreground"
      onClick={() => router.push(`/projects/${props.project.id}`)}
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
