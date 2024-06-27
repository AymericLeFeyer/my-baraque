import { getHouseById } from "../../../../../houses/[houseId]/_actions/get-house";
import { CreateProject } from "./CreateProject";

export default async function RoutePage({
  params,
}: {
  params: { houseId: string };
}) {
  const house = await getHouseById(params.houseId);
  if (house == null) {
    throw new Error("House not found");
  }
  return <CreateProject house={house} />;
}
