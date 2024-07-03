import type { User as UserApp } from "@prisma/client";
import type { User as UserAuth } from "next-auth";
import { create } from "zustand";

type UserState = {
  userAuth: UserAuth | null;
  userApp: UserApp | null;
  setUserAuth: (user: UserAuth) => void;
  setUserApp: (user: UserApp) => void;
};

export const useUserStore = create<UserState>((set) => ({
  userAuth: null,
  userApp: null,
  setUserAuth: (user) => {
    set({ userAuth: user });
  },
  setUserApp: (user) => {
    set({ userApp: user });
  },
}));
