"use server";

import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";

export const leaveHouse = async (houseId: string, user: User) => {
  await prisma.house.update({
    where: {
      id: houseId,
    },
    data: {
      users: {
        disconnect: {
          id: user.id,
        },
      },
    },
  });
};
