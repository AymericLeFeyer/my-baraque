import type { Project } from "@prisma/client";
import { create } from "zustand";

type ProjectsState = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  removeProject: (projectId: string) => void;
};

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  setProjects: (projects) => {
    set({ projects });
  },
  addProject: (project) => {
    set((state) => ({ projects: [...state.projects, project] }));
  },
  removeProject: (projectId) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
    }));
  },
}));
