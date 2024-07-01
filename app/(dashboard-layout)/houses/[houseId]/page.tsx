import HouseActions from "./_components/house-actions";
import { HouseDetails } from "./house-details";

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
