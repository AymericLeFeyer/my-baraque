import type { Project } from "@prisma/client";
import { create } from "zustand";

type ProjectsState = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  removeProject: (projectId: string) => void;
  updateProject: (projectId: string, project: Project) => void;

  numberOfTasks: Map<string, number>;
  setNumberOfTasks: (projectId: string, numberOfTasks: number) => void;
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
  updateProject: (projectId, project) => {
    set((state) => ({
      projects: state.projects.map((p) => (p.id === projectId ? project : p)),
    }));
  },
  numberOfTasks: new Map(),
  setNumberOfTasks: (projectId, number) => {
    set((state) => {
      const numberOfTasks = state.numberOfTasks;
      numberOfTasks.set(projectId, number);
      return { numberOfTasks };
    });
  },
}));
