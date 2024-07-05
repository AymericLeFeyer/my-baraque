"use server";

import { prisma } from "@/lib/prisma";
import type { House, User } from "@prisma/client";

export const inviteUser = async (
  email: string,
  house: House,
  initiator: User,
) => {
  return await prisma.invitation.create({
    data: {
      email,
      houseId: house.id,
      initiatorName: initiator.name ?? initiator.email.split("@")[0],
    },
  });
};
