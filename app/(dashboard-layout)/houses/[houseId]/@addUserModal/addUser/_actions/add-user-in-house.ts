"use server";

import { prisma } from "@/lib/prisma";

export const addUserInHouse = async (email: string, houseId: string) => {
  // Check if user exists
  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  // Create this user
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: email,
      },
    });
  }

  // Check if user is already in the house
  const house = await prisma.house.findUnique({
    where: {
      id: houseId,
    },
    include: {
      users: true,
    },
  });

  if (house?.users.find((u) => u.id === user.id)) {
    throw Error("User is already in the house");
  }

  // Add user to the house
  await prisma.house.update({
    where: {
      id: houseId,
    },
    data: {
      users: {
        connect: {
          id: user.id,
        },
      },
    },
  });
};
