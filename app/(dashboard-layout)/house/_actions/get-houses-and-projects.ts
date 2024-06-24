"use server";

import { auth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";

export const getHousesAndProjects = async () => {
  const user = await auth();

  if (!user) {
    return null;
  }

  const housesWithProjects = await prisma.house.findMany({
    where: {
      users: {
        some: {
          id: user.id,
        },
      },
    },
    include: {
      projects: true,
    },
  });

  return housesWithProjects;
};
