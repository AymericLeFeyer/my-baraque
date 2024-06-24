"use server";

import { auth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";

export const deleteHouse = async (houseId: string) => {
  const user = await auth();

  if (!user) {
    throw new Error("User not found");
  }

  if (!(await canUserDeleteHouse(houseId))) {
    throw new Error("User cannot delete house");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      houses: {
        disconnect: {
          id: houseId,
        },
      },
    },
  });

  return await prisma.house.delete({
    where: {
      id: houseId,
    },
  });
};

export const canUserDeleteHouse = async (houseId: string) => {
  const user = await auth();

  if (!user) {
    return false;
  }

  // Check if the user is the owner
  const house = await prisma.house.findFirst({
    where: {
      id: houseId,
      ownerId: user.id,
    },
  });

  if (!house) {
    return false;
  }

  return true;
};
