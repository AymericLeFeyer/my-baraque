import { create } from "zustand";
import type { House, Project, User } from "@prisma/client";
import { getHouseById } from "./actions/get-house.action";
import { getUsersByHouse } from "./actions/get-users-by-house.action";
import { getUserById } from "../users/actions/get-user.action.action";
import { getProjectsFromHouse } from "../projects/actions/get-projects.action";

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
    const users = await getUsersByHouse(houseId);
    const owner = await getUserById(house.ownerId);
    const projects = await getProjectsFromHouse(house.id);
    set({ house, users, owner, projects });
  },
}));
