"use server"

import { auth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";

export const getCurrentHouse = async ()=> {
    const user = await auth();

    if (!user) {
        return null;
    }

    if (!user.houseId) {
        return null;
    }



    return prisma.house.findFirst({
        where: {
            id: user.houseId,
        },
    });
}