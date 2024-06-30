"use client";

import { HousePage } from "./house-page";

export default function RoutePage({ params }: { params: { houseId: string } }) {
  return (
    <>
      <HousePage houseId={params.houseId} />
    </>
  );
}
