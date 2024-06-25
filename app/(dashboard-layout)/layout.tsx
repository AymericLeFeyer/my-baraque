import type { LayoutParams } from "@/types/next";
import { DashboardNavigation } from "./DashboardNavigation";
import type { ReactNode } from "react";

export default async function RouteLayout({
  children,
  modal,
}: LayoutParams<{}> & { modal?: ReactNode }) {
  return (
    <DashboardNavigation>
      {children}
      {modal}
    </DashboardNavigation>
  );
}
