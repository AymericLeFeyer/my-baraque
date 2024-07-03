"use client";

import { UpdateHouse } from "./UpdateHouse";
import { DeleteHouse } from "./DeleteHouse";
import { useUserStore } from "@/features/users/user.store";
import { useCurrentHouseStore } from "../current-house.store";

export default function HouseActions() {
  const user = useUserStore((s) => s.user);
  const house = useCurrentHouseStore((s) => s.house);

  if (!user) {
    return null;
  }

  if (user.id !== house?.ownerId) {
    return null;
  }

  if (!house) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <UpdateHouse house={house} />
      <DeleteHouse houseId={house!.id} />
    </div>
  );
}
