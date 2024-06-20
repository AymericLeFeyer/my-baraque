import { LayoutContent, LayoutHeader, LayoutTitle, Layout } from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import { getCurrentHouse } from "./_actions/get-house";
import { CreateHouseForm } from "./_components/create-house-form";


export default async function RoutePage(props: PageParams<{}>) {
    const house = await getCurrentHouse();

    return <Layout>
        <LayoutHeader>
            <LayoutTitle>Baraque</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
            {house ? (<p>What a nice baraque : {house.name}</p>) : (

                <>
                    <p>You don't have any baraque 🥲</p>
                    <CreateHouseForm />
                </>

            )}
        </LayoutContent>
    </Layout>
}


