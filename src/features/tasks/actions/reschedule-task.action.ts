"use server";

import { prisma } from "@/lib/prisma";
import type { Task } from "@prisma/client";

export const rescheduleTask = async (task: Task) => {
  if (task.nextTimeInDays === null) {
    throw new Error("Task is not scheduled");
  }

  return prisma.task.create({
    data: {
      projectId: task.projectId,
      title: task.title,
      content: task.content,
      nextTimeInDays: task.nextTimeInDays,
      isComplete: false,
      assigneeId: task.assigneeId,
      effectiveDate: new Date(
        Date.now() + task.nextTimeInDays * 24 * 60 * 60 * 1000,
      ),
    },
  });
};
