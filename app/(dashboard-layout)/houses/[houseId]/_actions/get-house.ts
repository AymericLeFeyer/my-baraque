"use server";

import { auth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";

export const getHouseById = async (houseId: string) => {
  const user = await auth();

  if (!user) {
    return null;
  }

  return prisma.house.findFirst({
    where: {
      id: houseId,
      users: {
        some: {
          id: user.id,
        },
      },
    },
  });
};
