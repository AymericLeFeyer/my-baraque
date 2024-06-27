"use server";

import { prisma } from "@/lib/prisma";

export const getProjectById = async (projectId: string) => {
  return prisma.project.findFirst({
    where: {
      id: projectId,
    },
  });
};
