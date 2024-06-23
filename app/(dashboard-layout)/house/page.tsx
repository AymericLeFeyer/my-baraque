import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  Layout,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { getCurrentHouse } from "./_actions/get-house";
import { CreateHouseForm } from "./_components/create-house-form";
import { HouseDetails } from "./house-details";

export default async function RoutePage(props: PageParams<{}>) {
  const house = await getCurrentHouse();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{house ? house.name : "Baraque"}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        {!house ? <CreateHouseForm /> : <HouseDetails house={house} />}
      </LayoutContent>
    </Layout>
  );
}
