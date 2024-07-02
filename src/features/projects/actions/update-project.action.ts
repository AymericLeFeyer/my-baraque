"use server";

import { authAction } from "@/lib/server-actions/safe-actions";
import { prisma } from "@/lib/prisma";
import { UpdateProjectSchema } from "../update-project.schema";

export const updateProjectAction = authAction(
  UpdateProjectSchema,
  async (input, ctx) => {
    const project = await prisma.project.findFirst({
      where: {
        id: input.id,
        house: {
          ownerId: ctx.user.id,
        },
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return await prisma.project.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name ?? project.name,
        description: input.description ?? project.description,
      },
    });
  },
);
