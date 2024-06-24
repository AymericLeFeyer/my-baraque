import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  Layout,
} from "@/features/page/layout";
import { getHouseById } from "./_actions/get-house";
import { HouseDetails } from "./house-details";

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
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{house.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <HouseDetails house={house} />
      </LayoutContent>
    </Layout>
  );
}
