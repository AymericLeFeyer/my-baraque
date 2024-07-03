import { HouseDetails } from "@/features/houses/components/HouseDetails";

export default async function RoutePage({}: { params: { houseId: string } }) {
  return <HouseDetails />;
}
