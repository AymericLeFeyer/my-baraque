"use server";

import { auth } from "@/lib/auth/helper";
import { prisma } from "@/lib/prisma";

export const getTasksByProjectId = async (projectId: string) => {
  const user = await auth();

  if (!user) {
    throw new Error("User not found");
  }

  // Check if user is in the project
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      house: {
        users: {
          some: {
            id: user.id,
          },
        },
      },
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return prisma.task.findMany({
    where: {
      projectId: projectId,
    },
  });
};
