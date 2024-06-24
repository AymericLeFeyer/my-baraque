import type { NavigationLinkGroups } from "@/features/navigation/navigation.type";
import { Home, Settings } from "lucide-react";
import { getHousesAndProjects } from "./house/_actions/get-houses-and-projects";

export const buildLayout: () => Promise<NavigationLinkGroups[]> = async () => {
  const links: NavigationLinkGroups[] = [];

  const housesWithProjects = await getHousesAndProjects();
  if (!housesWithProjects) {
    links.push({
      title: "Nouvelle baraque",
      icon: <Home />,
      url: "/house/new",
      links: [
        {
          title: "Baraque",
          icon: <Home />,
          url: "/house",
        },
        {
          title: "Paramètres",
          icon: <Settings />,
          url: "/settings",
        },
      ],
    });
  } else {
    housesWithProjects.map((house) => {
      links.push({
        title: house.name,
        url: `/house/${house.id}`,
        icon: <Home />,
        links: house.projects.map((project) => {
          return {
            title: project.name,
            icon: <Home />,
            url: `/house/${house.id}/project/${project.id}`,
          };
        }),
      });
    });
  }
  return links;
};
