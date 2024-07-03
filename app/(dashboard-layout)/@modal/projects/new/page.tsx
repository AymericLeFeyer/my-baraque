import { getHouseById } from "@/features/houses/actions/get-house.action";
import { CreateProject } from "../../../../../src/features/projects/components/CreateProject";

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
