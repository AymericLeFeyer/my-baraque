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
import { getUserById } from "../_actions/get-user";
import { getUsersFromHouse } from "./_actions/get-users";
import { getProjectsFromHouse } from "./_actions/get-projects";

export default async function RoutePage({
  params,
}: {
  params: { houseId: string };
}) {
  const house = await getHouseById(params.houseId);

  if (!house) {
    throw new Error("House not found");
  }

  const owner = await getUserById(house.ownerId);

  if (!owner) {
    throw new Error("Owner not found");
  }

  const users = await getUsersFromHouse(house.id);
  const projects = await getProjectsFromHouse(house.id);

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
          <HouseDetails
            house={house}
            owner={owner}
            users={users}
            projects={projects}
          />
        </LayoutContent>
      </Layout>
    </>
  );
}
