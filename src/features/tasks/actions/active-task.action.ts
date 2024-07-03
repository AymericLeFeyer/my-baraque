"use server";

import { prisma } from "@/lib/prisma";
import type { Task } from "@prisma/client";

export const activeTaskNow = async (task: Task) => {
  return prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      effectiveDate: new Date(),
    },
  });
};
