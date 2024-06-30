"use client";

import type { House, Project, User } from "@prisma/client";
import { Crown, FolderPlus, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProjectCard } from "./_components/project-card";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type HouseDetailsProps = {
  house: House;
  owner: User;
  users: User[];
  projects: Project[];
};

export const HouseDetails = async (props: HouseDetailsProps) => {
  const router = useRouter();

  return (
    <>
      <div className="mb-2 flex items-center">
        <div className="mr-2">
          <Crown />
        </div>
        <div>{props.owner.name}</div>
      </div>
      <div className="flex items-center">
        <div className="mr-2">
          <Users />
        </div>
        <div className="flex items-center gap-1">
          {props.users.map((user) => (
            <Avatar key={user.id}>
              <AvatarFallback>{user.name?.[0] ?? "A"}</AvatarFallback>
              <AvatarImage src={user.image!} alt="avatar" />
            </Avatar>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Typography variant="h3" className="mt-6">
          Projects
        </Typography>
        <Button
          variant="outline"
          onClick={() => router.push(`/houses/${props.house.id}/projects/new`)}
          className="flex gap-2 "
        >
          <FolderPlus size={24} />
          <p className="font-bold">Create project</p>
        </Button>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {props.projects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </>
  );
};
