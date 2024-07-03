"use server";

import { prisma } from "@/lib/prisma";

export const deleteTask = async (taskId: string) => {
  return prisma.task.delete({
    where: {
      id: taskId,
    },
  });
};
