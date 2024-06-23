"use server";

import { prisma } from "@/lib/prisma";

export const deleteProject = async (projectId: string) => {
  return await prisma.project.delete({
    where: {
      id: projectId,
    },
  });
};
