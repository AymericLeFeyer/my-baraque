"use server";

import { prisma } from "@/lib/prisma";

export const kickUser = async (
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

  if (house.ownerId === userId) {
    throw new Error("Cannot kick the owner of the house");
  }

  if (house.ownerId !== initiatorId) {
    throw new Error("Only the owner can kick a user");
  }

  await prisma.house.update({
    where: {
      id: houseId,
    },
    data: {
      users: {
        disconnect: {
          id: userId,
        },
      },
    },
  });
};
