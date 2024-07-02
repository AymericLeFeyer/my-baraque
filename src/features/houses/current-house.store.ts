import type { House } from "@prisma/client";
import { create } from "zustand";

type CurrentHouseState = {
  house: House | null;
  houses: House[];
  setHouse: (house: House) => void;
  setHouses: (houses: House[]) => void;
};

export const useCurrentHouseStore = create<CurrentHouseState>((set) => ({
  house: null,
  houses: [],
  setHouse: (house) => {
    set({ house });
  },
  setHouses: (houses) => {
    set({ houses });
  },
}));
