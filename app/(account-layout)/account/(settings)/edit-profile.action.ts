"use server";

import {
  hashStringWithSalt,
  validatePassword,
} from "@/lib/auth/credentials-provider";
import { requiredAuth } from "@/lib/auth/helper";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { ActionError, authAction } from "@/lib/server-actions/safe-actions";
import {
  EditPasswordFormSchema,
  ProfileFormSchema,
} from "./edit-profile.schema";

export const updateProfileAction = authAction(
  ProfileFormSchema,
  async (input, ctx) => {
    const previousEmail = ctx.user.email;

    const user = await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        name: input.name,
        email: input.email,
        emailVerified: previousEmail === input.email ? undefined : null,
      },
    });

    return user;
  },
);

export const editPasswordAction = authAction(
  EditPasswordFormSchema,
  async (input, ctx) => {
    const user = await requiredAuth();
    const { passwordHash } = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      select: {
        passwordHash: true,
      },
    });

    if (input.newPassword !== input.confirmPassword) {
      throw new ActionError("Les mots de passe ne correspondent pas");
    }

    if (
      hashStringWithSalt(input.currentPassword, env.NEXTAUTH_SECRET) !==
      passwordHash
    ) {
      throw new ActionError("Le mot de passe actuel est incorrect");
    }

    if (!validatePassword(input.newPassword)) {
      throw new ActionError(
        "Nouveau mot de passe invalide. Doit contenir au moins 8 caractères, et contenir au moins une lettre et un chiffre",
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        passwordHash: hashStringWithSalt(
          input.newPassword,
          env.NEXTAUTH_SECRET,
        ),
      },
      select: {
        id: true,
      },
    });

    return updatedUser;
  },
);
