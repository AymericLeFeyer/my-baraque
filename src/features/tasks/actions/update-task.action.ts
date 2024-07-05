"use server";

import { prisma } from "@/lib/prisma";
import type { Task } from "@prisma/client";

export const updateTask = async (task: Task) => {
  return await prisma.task.update({
    where: { id: task.id },
    data: task,
  });
};
