"use client";

import type { Task } from "@prisma/client";
import { create } from "zustand";
import { updateTask } from "./actions/update-task.action";
import { rescheduleTask } from "./actions/reschedule-task.action";
import { toast } from "sonner";

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  setCompleted: (completed: boolean, task: Task) => void;
  updateAssignee: (assigneeId: string, task: Task) => void;
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
        if (updatedTask.nextTimeInDays !== null) {
          rescheduleTask(updatedTask).then((newTask) => {
            toast.success("Task rescheduled");
            state.addTask(newTask);
          });
        }
      }
      return { tasks: updatedTasks };
    });
  },

  updateAssignee: (assigneeId, task) => {
    set((state) => {
      const updatedTasks = state.tasks.map((t) =>
        t.id === task.id ? { ...t, assigneeId } : t,
      );

      const updatedTask = updatedTasks.find((t) => t.id === task.id);

      if (updatedTask) {
        updateTask(updatedTask);
      }

      return { tasks: updatedTasks };
    });
  },
}));

export default useTaskStore;
