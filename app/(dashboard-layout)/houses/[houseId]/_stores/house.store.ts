import { create } from "zustand";
import type { House, Project, User } from "@prisma/client";
import { getHouseById } from "../_actions/get-house";
import { getUsersFromHouse } from "../_actions/get-users";
import { getUserById } from "../../_actions/get-user";
import { getProjectsFromHouse } from "../_actions/get-projects";

type HouseState = {
  house: House | null;
  users: User[];
  owner: User | null;
  projects: Project[];
  fetchHouse: (houseId: string) => Promise<void>;
};

export const useHouseStore = create<HouseState>((set) => ({
  house: null,
  users: [],
  owner: null,
  projects: [],
  fetchHouse: async (houseId) => {
    const house = await getHouseById(houseId);
    if (!house) {
      set({ house: null, users: [], owner: null, projects: [] });
      return;
    }
    const users = await getUsersFromHouse(houseId);
    const owner = await getUserById(house.ownerId);
    const projects = await getProjectsFromHouse(house.id);
    set({ house, users, owner, projects });
  },
}));
