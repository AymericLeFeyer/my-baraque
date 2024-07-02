"use server";

import { prisma } from "@/lib/prisma";

export const createProjectInHouse = async (
  houseId: string,
  name: string,
  description: string | null | undefined,
) => {
  return await prisma.project.create({
    data: {
      name: name,
      description: description,
      houseId: houseId,
    },
  });
};
