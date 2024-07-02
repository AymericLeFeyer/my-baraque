"use server";

import { prisma } from "@/lib/prisma";

export const getHouses = async (userId: string) => {
  const houses = await prisma.house.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });

  return houses;
};
