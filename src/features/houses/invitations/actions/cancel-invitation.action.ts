"use server";

import { prisma } from "@/lib/prisma";

export const cancelInvitation = async (
  invitationId: string,
  houseId: string,
) => {
  await prisma.invitation.delete({
    where: {
      id: invitationId,
      houseId,
    },
  });
};
