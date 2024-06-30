/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import { useEffect, useState } from "react";
import { useHouseStore } from "./_stores/house.store";
import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  Layout,
} from "@/features/page/layout";
import { DeleteHouse } from "./_components/delete-house";
import { HouseDetails } from "./house-details";

export type HousePageProps = {
  houseId: string;
};

export const HousePage = (props: HousePageProps) => {
  const { house, fetchHouse } = useHouseStore();
  const [loading, setLoading] = useState(true);

  const canDelete = true; // TODO

  useEffect(() => {
    if (props.houseId) {
      fetchHouse(props.houseId)
        .then(() => setLoading(false))
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) return <div>Loading...</div>;

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
};
