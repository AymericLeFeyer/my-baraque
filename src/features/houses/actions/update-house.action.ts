"use server";

import { authAction } from "@/lib/server-actions/safe-actions";
import { UpdateHouseSchema } from "../update-house.schema";
import { prisma } from "@/lib/prisma";

export const updateHouseAction = authAction(
  UpdateHouseSchema,
  async (input, ctx) => {
    const house = await prisma.house.findFirst({
      where: {
        id: input.id,
        ownerId: ctx.user.id,
      },
    });

    if (!house) {
      throw new Error("House not found");
    }

    return await prisma.house.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name ?? house.name,
        ownerId: input.ownerId ?? house.ownerId,
      },
    });
  },
);
