import type { House, Project } from "@prisma/client";

export type ProjectDetailsProps = {
  house: House;
  project: Project;
};

export const ProjectDetails = async (props: ProjectDetailsProps) => {
  return (
    <>
      <p>{props.project.description}</p>
    </>
  );
};
