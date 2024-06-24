import type { ReactElement } from "react";

type DashboardLinkItem = {
  title: string;
  icon: ReactElement;
  url: string;
};

export type NavigationLinkGroups = {
  title?: string;
  url: string;
  icon: ReactElement;
  links: DashboardLinkItem[];
};
