"use client";

import { UpdateHouse } from "./UpdateHouse";
import { DeleteHouse } from "./DeleteHouse";
import { useUserStore } from "@/features/users/user.store";
import { useCurrentHouseStore } from "../current-house.store";

export default function HouseActions() {
  const userApp = useUserStore((s) => s.userApp);
  const house = useCurrentHouseStore((s) => s.house);

  if (!userApp) {
    return null;
  }

  if (userApp.id !== house?.ownerId) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <UpdateHouse house={house} />
      <DeleteHouse houseId={house!.id} />
    </div>
  );
}
