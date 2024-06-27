import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  Layout,
} from "@/features/page/layout";
import { getHouseById } from "./_actions/get-house";
import { HouseDetails } from "./house-details";
import { canUserDeleteHouse } from "./_actions/delete-house";
import { DeleteHouse } from "./_components/delete-house";

export default async function RoutePage({
  params,
}: {
  params: { houseId: string };
}) {
  const house = await getHouseById(params.houseId);

  if (!house) {
    throw new Error("House not found");
  }

  return (
    <>
      <Layout>
        <LayoutHeader className="flex flex-row justify-between">
          <LayoutTitle>{house.name}</LayoutTitle>
          {(await canUserDeleteHouse(house.id)) && (
            <DeleteHouse houseId={house.id} />
          )}
        </LayoutHeader>
        <LayoutContent>
          <HouseDetails house={house} />
        </LayoutContent>
      </Layout>
    </>
  );
}
