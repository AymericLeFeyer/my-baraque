import type { House } from "@prisma/client";
import { Crown, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProjectsFromHouse } from "./_actions/get-projects";
import { getUsersFromHouse } from "./_actions/get-users";
import { getUserById } from "../_actions/get-user";
import { ProjectCard } from "./_components/project-card";
import { Typography } from "@/components/ui/typography";

export type HouseDetailsProps = {
  house: House;
};

export const HouseDetails = async (props: HouseDetailsProps) => {
  const owner = await getUserById(props.house.ownerId);
  const users = await getUsersFromHouse(props.house.id);
  const projects = await getProjectsFromHouse(props.house.id);

  return (
    <>
      <div className="mb-2 flex items-center">
        <div className="mr-2">
          <Crown />
        </div>
        <div>{owner?.name}</div>
      </div>
      <div className="flex items-center">
        <div className="mr-2">
          <Users />
        </div>
        <div className="flex items-center gap-1">
          {users.map((user) => (
            <Avatar key={user.id}>
              <AvatarFallback>{user.name?.[0] ?? "A"}</AvatarFallback>
              <AvatarImage src={user.image!} alt="avatar" />
            </Avatar>
          ))}
        </div>
      </div>

      <Typography variant="h3" className="mt-6">
        Projects
      </Typography>

      <div className="mt-3 flex flex-col gap-3">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </>
  );
};
