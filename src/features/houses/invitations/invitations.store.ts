import type { Invitation } from "@prisma/client";
import { create } from "zustand";

type InvitationState = {
  invitations: Invitation[];
  setInvitations: (invitations: Invitation[]) => void;
  addInvitation: (invitation: Invitation) => void;
  removeInvitation: (invitationId: string) => void;
};

export const useInvitationsStore = create<InvitationState>((set) => ({
  invitations: [],
  setInvitations: (invitations) => {
    set({ invitations: invitations });
  },
  addInvitation: (invitation) => {
    set((state) => ({
      invitations: [...state.invitations, invitation],
    }));
  },
  removeInvitation: (invitationId) => {
    set((state) => ({
      invitations: state.invitations.filter(
        (invitation) => invitation.id !== invitationId,
      ),
    }));
  },
}));
