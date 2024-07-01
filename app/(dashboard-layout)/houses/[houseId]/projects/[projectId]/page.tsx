import { canUserDeleteHouse } from "../../_actions/delete-house";
import { getHouseById } from "../../_actions/get-house";
import { getProjectById } from "./_actions/get-project";
import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  Layout,
} from "@/features/page/layout";
import { ProjectDetails } from "./project-details";
import { DeleteProject } from "./_components/DeleteProject";
import { UpdateProject } from "./_components/UpdateProject";

export default async function RoutePage({
  params,
}: {
  params: { houseId: string; projectId: string };
}) {
  const house = await getHouseById(params.houseId);
  const project = await getProjectById(params.projectId);

  if (!house) {
    throw new Error("House not found");
  }

  if (!project) {
    throw new Error("Project not found");
  }

  return (
    <>
      <Layout>
        <LayoutHeader className="flex flex-row justify-between">
          <LayoutTitle>{project.name}</LayoutTitle>
          {(await canUserDeleteHouse(house.id)) && (
            <div className="flex gap-2">
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
}
