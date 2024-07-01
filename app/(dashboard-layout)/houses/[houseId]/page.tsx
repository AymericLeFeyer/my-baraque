import HouseActions from "./_components/HouseActions";
import { HouseDetails } from "./HouseDetails";

export default async function RoutePage({
  params,
}: {
  params: { houseId: string };
}) {
  return (
    <div>
      <HouseDetails>
        <HouseActions houseId={params.houseId} />
      </HouseDetails>
    </div>
  );
}
