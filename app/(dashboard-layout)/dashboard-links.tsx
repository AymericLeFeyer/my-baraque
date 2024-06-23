import type { NavigationLinkGroups } from "@/features/navigation/navigation.type";
import { Home, LayoutDashboard, Settings, User2 } from "lucide-react";

export const DASHBOARD_LINKS: NavigationLinkGroups[] = [
  {
    links: [
      // {
      //   title: "Dashboard",
      //   icon: <LayoutDashboard />,
      //   url: "/dashboard",
      // }, 
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
  },
  // {
  //   title: "Other",
  //   links: [
  //     {
  //       title: "Users",
  //       icon: <User2 />,
  //       url: "/users",
  //     },
  //   ],
  // },
];
