"use server";

import { sendEmail } from "@/lib/mail/sendEmail";
import InvitationEmail from "@email/InvitationEmail";

export const sendEmailToUser = async (
  email: string,
  houseName: string,
  userName: string,
) => {
  await sendEmail({
    to: email,
    subject: `🎉 You have been added to ${houseName}`,
    react: InvitationEmail({ userName, houseName }),
  });
};
