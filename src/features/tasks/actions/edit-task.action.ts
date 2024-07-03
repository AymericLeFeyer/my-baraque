"use server";

import { prisma } from "@/lib/prisma";

export const editTask = async (
  id: string,
  title: string,
  content: string | undefined,
  nextTimeInDays: number | undefined,
) => {
  return await prisma.task.update({
    where: { id },
    data: {
      title,
      content,
      nextTimeInDays,
    },
  });
};
