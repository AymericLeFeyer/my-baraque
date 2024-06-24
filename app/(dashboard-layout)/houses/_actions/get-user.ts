"use server"

import { prisma } from "@/lib/prisma";

export const getUserById = async (id: string)=> {
    return prisma.user.findFirst({
        where: {
            id,
        },
    });
}
// 