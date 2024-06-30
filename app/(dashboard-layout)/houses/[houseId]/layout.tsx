import type { LayoutParams } from "@/types/next";
import type { ReactNode } from "react";

export default async function RouteLayout({
  children,
  addUserModal,
}: LayoutParams<{}> & { addUserModal?: ReactNode }) {
  return (
    <>
      {children}
      {addUserModal}
    </>
  );
}
