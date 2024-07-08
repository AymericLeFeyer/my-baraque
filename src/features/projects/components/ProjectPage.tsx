"use client";

import { useCurrentHouseStore } from "@/features/houses/current-house.store";
import { useEffect, useState } from "react";
import { useProjectsStore } from "../projects.store";
import { useUserStore } from "@/features/users/user.store";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { UpdateProject } from "./UpdateProject";
import { DeleteProject } from "./DeleteProject";
import { ProjectDetails } from "./ProjectDetails";
import RouteLoading from "../../../../app/(dashboard-layout)/loading";

export type ProjectPageProps = {
  projectId: string;
};

export const ProjectPage = (props: ProjectPageProps) => {
  const { house } = useCurrentHouseStore();
  const { projects } = useProjectsStore();
  const project = projects.find((p) => p.id === props.projectId);
  const userApp = useUserStore((s) => s.userApp);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (userApp != null && userApp.id == house?.ownerId) {
      setIsOwner(true);
    }
  }, [userApp, house]);

  if (!house || !project) {
    return <RouteLoading />;
  }

  return (
    <>
      <Layout>
        <LayoutHeader className="flex flex-row justify-between">
          <LayoutTitle>{project.name}</LayoutTitle>
          {isOwner && (
            <div className="flex gap-2 max-lg:flex-col">
              <UpdateProject project={project} />
              <DeleteProject houseId={house.id} projectId={project.id} />
            </div>
          )}
        </LayoutHeader>
        <LayoutContent>
          <ProjectDetails house={house} project={project} />
        </LayoutContent>
      </Layout>
    </>
  );
};
