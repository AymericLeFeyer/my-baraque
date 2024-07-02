import HouseActions from "@/features/houses/components/HouseActions";
import { HouseDetails } from "../../../../src/features/houses/components/HouseDetails";

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
