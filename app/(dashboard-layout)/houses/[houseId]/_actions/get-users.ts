"use server";

import { prisma } from "@/lib/prisma";

export const getUsersFromHouse = async (houseId: string) => {
  const users = await prisma.user.findMany({
    where: {
      houses: {
        some: {
          id: houseId,
        },
      },
    },
  });

  return users;
};
