"use server";

import { prisma } from "@/lib/prisma";

export const getProjectsFromHouse = async (houseId: string) => {
  const projects = await prisma.project.findMany({
    where: {
      houseId: houseId,
    },
  });

  return projects;
};
