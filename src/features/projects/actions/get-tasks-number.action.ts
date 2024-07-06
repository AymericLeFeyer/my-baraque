"use server";

import { prisma } from "@/lib/prisma";

export const getTaskNumber = async (
  projectId: string,
  userId: string,
): Promise<number> => {
  return await prisma.task.count({
    where: {
      projectId,
      assigneeId: userId,
      isComplete: false,
    },
  });
};
