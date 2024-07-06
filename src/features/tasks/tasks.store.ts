"use client";

import type { Task } from "@prisma/client";
import { create } from "zustand";

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  setCompleted: (completed: boolean, task: Task) => void;
  editTask: (task: Task) => void;
  updateAssignee: (assigneeId: string, task: Task) => void;
  removeTask: (task: Task) => void;
};

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  setCompleted: (completed, task) => {
    set((state) => {
      const updatedTasks = state.tasks.map((t) =>
        t.id === task.id ? { ...t, isComplete: completed } : t,
      );
      return { tasks: updatedTasks };
    });
  },

  updateAssignee: (assigneeId, task) => {
    set((state) => {
      const updatedTasks = state.tasks.map((t) =>
        t.id === task.id ? { ...t, assigneeId } : t,
      );
      return { tasks: updatedTasks };
    });
  },

  editTask: (task) => {
    set((state) => {
      const updatedTasks = state.tasks.map((t) =>
        t.id === task.id ? task : t,
      );
      return { tasks: updatedTasks };
    });
  },

  removeTask: (task) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((t) => t.id !== task.id);
      return { tasks: updatedTasks };
    });
  },
}));

export default useTaskStore;
