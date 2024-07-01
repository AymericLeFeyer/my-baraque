"use server";

import { auth } from "@/lib/auth/helper";
import { UpdateHouse } from "./UpdateHouse";
import { DeleteHouse } from "./delete-house";
import { getHouseById } from "../_actions/get-house";

export type HouseActionsProps = {
  houseId: string;
};

export default async function HouseActions(props: HouseActionsProps) {
  const user = await auth();
  const house = await getHouseById(props.houseId);

  if (!user) {
    return null;
  }

  if (user.id !== house?.ownerId) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <UpdateHouse house={house} />
      <DeleteHouse houseId={house!.id} />
    </div>
  );
}
