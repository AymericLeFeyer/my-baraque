"use server";

import { prisma } from "@/lib/prisma";

export const setOwner = async (
  houseId: string,
  userId: string,
  initiatorId: string,
) => {
  const house = await prisma.house.findUnique({
    where: {
      id: houseId,
    },
    include: {
      users: true,
    },
  });

  if (!house) {
    throw new Error("House not found");
  }

  if (house.ownerId !== initiatorId) {
    throw new Error("Only the owner can set a new owner");
  }

  await prisma.house.update({
    where: {
      id: houseId,
    },
    data: {
      ownerId: userId,
    },
  });
};
