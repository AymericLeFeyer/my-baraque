"use server";

import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";

export const answerInvitation = async (
  invitationId: string,
  user: User,
  answer: boolean,
) => {
  let house;

  // get invitation
  const invitation = await prisma.invitation.findUnique({
    where: {
      id: invitationId,
      email: user.email,
    },
  });

  if (invitation == null) {
    throw new Error("Invitation not found");
  }

  if (answer) {
    // add user to house
    house = await prisma.house.update({
      where: {
        id: invitation.houseId,
      },
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  // delete invitation
  await prisma.invitation.delete({
    where: {
      id: invitationId,
    },
  });

  return house;
};
