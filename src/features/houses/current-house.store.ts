import type { House, User } from "@prisma/client";
import { create } from "zustand";

type CurrentHouseState = {
  house: House | null;
  houses: House[];
  owner: User | null;
  users: User[];
  setHouse: (house: House) => void;
  setHouses: (houses: House[]) => void;
  setOwner: (owner: User) => void;
  setUsers: (users: User[]) => void;
  deleteHouse: (houseId: string) => void;
};

export const useCurrentHouseStore = create<CurrentHouseState>((set) => ({
  house: null,
  houses: [],
  owner: null,
  users: [],
  setHouse: (house) => {
    set({ house });
  },
  setHouses: (houses) => {
    set({ houses });
  },
  setOwner: (owner) => {
    set({ owner });
  },
  setUsers: (users) => {
    set({ users });
  },
  deleteHouse: (houseId) => {
    set((state) => ({
      houses: state.houses.filter((house) => house.id !== houseId),
    }));
    // House become the next one
    set((state) => ({
      house: state.houses.find((house) => house.id !== houseId) || null,
    }));
  },
}));
