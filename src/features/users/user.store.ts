import type { User } from "next-auth";
import { create } from "zustand";

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
}));
