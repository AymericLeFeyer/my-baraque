"use server";

import { prisma } from "@/lib/prisma";

export const createTask = async (
  projectId: string,
  title: string,
  content?: string,
) => {
  return prisma.task.create({
    data: {
      projectId: projectId,
      title: title,
      content: content,
    },
  });
};
