import type { Invitation } from "@prisma/client";
import { create } from "zustand";

type PendingsInvitationState = {
  pendingInvitations: Invitation[];
  setPendingInvitations: (invitations: Invitation[]) => void;
  addPendingInvitation: (invitation: Invitation) => void;
  removePendingInvitation: (invitationId: string) => void;
};

export const usePendingsInvitationsStore = create<PendingsInvitationState>(
  (set) => ({
    pendingInvitations: [],
    setPendingInvitations: (invitations) => {
      set({ pendingInvitations: invitations });
    },
    addPendingInvitation: (invitation) => {
      set((state) => ({
        pendingInvitations: [...state.pendingInvitations, invitation],
      }));
    },
    removePendingInvitation: (invitationId) => {
      set((state) => ({
        pendingInvitations: state.pendingInvitations.filter(
          (invitation) => invitation.id !== invitationId,
        ),
      }));
    },
  }),
);
