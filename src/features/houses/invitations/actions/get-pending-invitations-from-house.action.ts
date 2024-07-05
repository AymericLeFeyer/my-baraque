"use server";

import { prisma } from "@/lib/prisma";
import type { Invitation } from "@prisma/client";

export const getPendingInvitationsFromHouse = async (
  houseId: string,
): Promise<Invitation[]> => {
  return await prisma.invitation.findMany({
    where: {
      houseId,
    },
  });
};
