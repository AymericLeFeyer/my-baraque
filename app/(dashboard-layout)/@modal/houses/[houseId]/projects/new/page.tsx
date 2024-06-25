import { CreateProject } from "./CreateProject";

export default async function RoutePage({
  params,
}: {
  params: { houseId: string };
}) {
  return <CreateProject houseId={params.houseId} />;
}
