"use client";

import type { LayoutParams } from "@/types/next";
import { useParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useHouseStore } from "../../../../src/features/houses/house.store";

export default function RouteLayout({
  children,
  addUserModal,
}: LayoutParams<{}> & { addUserModal?: ReactNode }) {
  const params = useParams<{ houseId: string }>();
  const { fetchHouse } = useHouseStore();

  useEffect(() => {
    if (params.houseId) {
      fetchHouse(params.houseId);
    }
  }, [params.houseId, fetchHouse]);

  return (
    <>
      {children}
      {addUserModal}
    </>
  );
}
