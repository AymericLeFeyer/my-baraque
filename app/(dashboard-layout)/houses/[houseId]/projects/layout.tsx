import type { LayoutParams } from "@/types/next";
import type { ReactNode } from "react";

export default async function RouteLayout({
  children,
  modale,
}: LayoutParams<{}> & { modale?: ReactNode }) {
  return (
    <div>
      {children}
      {modale}
    </div>
  );
}
