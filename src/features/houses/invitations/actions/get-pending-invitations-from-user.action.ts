"use server";

import { prisma } from "@/lib/prisma";
import type { Invitation } from "@prisma/client";

export const getPendingInvitationsFromUser = async (
  email: string,
): Promise<Invitation[]> => {
  return await prisma.invitation.findMany({
    where: {
      email,
    },
  });
};
