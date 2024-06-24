import type { PageParams } from "@/types/next";
import { CreateHouseForm } from "../_components/create-house-form";

export default async function RoutePage(props: PageParams<{}>) {
  return <CreateHouseForm />;
}
