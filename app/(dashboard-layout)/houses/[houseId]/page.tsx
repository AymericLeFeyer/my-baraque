/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import { useHouseStore } from "./_stores/house.store";
import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  Layout,
} from "@/features/page/layout";
import { DeleteHouse } from "./_components/delete-house";
import { HouseDetails } from "./house-details";

export default function RoutePage() {
  const { house } = useHouseStore();

  const canDelete = true; // TODO

  return (
    <div>
      <Layout>
        <LayoutHeader className="flex flex-row justify-between">
          <LayoutTitle>{house!.name}</LayoutTitle>
          {canDelete && <DeleteHouse houseId={house!.id} />}
        </LayoutHeader>
        <LayoutContent>
          <HouseDetails />
        </LayoutContent>
      </Layout>
    </div>
  );
}
