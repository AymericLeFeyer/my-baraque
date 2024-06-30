import { requiredAuth } from "@/lib/auth/helper";
import { getHouseById } from "../../_actions/get-house";
import { AddUser } from "./AddUser";

export default async function RoutePage({
  params,
}: {
  params: { houseId: string };
}) {
  const house = await getHouseById(params.houseId);

  if (house === null) {
    return null;
  }

  const user = await requiredAuth();

  return <AddUser house={house} user={user} />;
}
