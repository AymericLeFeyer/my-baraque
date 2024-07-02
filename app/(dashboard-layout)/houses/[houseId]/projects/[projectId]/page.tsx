import { canUserDeleteHouse } from "../../../../../../src/features/houses/actions/delete-house.action";
import { getHouseById } from "../../../../../../src/features/houses/actions/get-house.action";
import { getProjectById } from "../../../../../../src/features/projects/actions/get-project.action";
import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  Layout,
} from "@/features/page/layout";
import { ProjectDetails } from "../../../../../../src/features/projects/components/ProjectDetails";
import { DeleteProject } from "@/features/projects/components/DeleteProject";
import { UpdateProject } from "@/features/projects/components/UpdateProject";

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
