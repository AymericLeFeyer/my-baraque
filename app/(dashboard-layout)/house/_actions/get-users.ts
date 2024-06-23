"use server";

import { prisma } from "@/lib/prisma";

export const getUsersFromHouse = async (houseId: string) => {
  const users = await prisma.user.findMany({
    where: {
      houseId: houseId,
    },
  });

  return users;
};
