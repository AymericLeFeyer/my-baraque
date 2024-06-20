"use server"

import { auth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";

export const createHouse = async (name: string) => {
    const user = await auth();

    if (!user) {
        return null;
    }


    const house = await prisma.house.create({
        data: {
            ownerId: user.id,
            name: name
        },
    });

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            houseId: house.id
        }
    });

    return house;
}