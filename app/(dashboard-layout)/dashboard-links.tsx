import type { NavigationLinkGroups } from "@/features/navigation/navigation.type";
import { Folder, Home } from "lucide-react";
import { getHousesAndProjects } from "./houses/_actions/get-houses-and-projects";

export const buildLayout: () => Promise<NavigationLinkGroups[]> = async () => {
  const links: NavigationLinkGroups[] = [];

  const housesWithProjects = await getHousesAndProjects();
  if (housesWithProjects) {
    housesWithProjects.map((house) => {
      links.push({
        title: house.name,
        url: `/houses/${house.id}`,
        icon: <Home />,
        links: house.projects.map((project) => {
          return {
            title: project.name,
            icon: <Folder />,
            url: `/houses/${house.id}/projects/${project.id}`,
          };
        }),
      });
    });
  }
  return links;
};
