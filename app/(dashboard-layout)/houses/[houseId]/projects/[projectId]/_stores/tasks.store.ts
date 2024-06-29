"use client";

import type { Task } from "@prisma/client";
import { create } from "zustand";
import { updateTask } from "../_actions/update-task";

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  setCompleted: (completed: boolean, task: Task) => void;
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

      const updatedTask = updatedTasks.find((t) => t.id === task.id);

      if (updatedTask) {
        // Update task in db
        updateTask(updatedTask);
      }
      return { tasks: updatedTasks };
    });
  },
}));

export default useTaskStore;
