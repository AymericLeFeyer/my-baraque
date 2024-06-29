"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Project, Task } from "@prisma/client";
import { useState } from "react";
import { createTask } from "../_actions/create-task";
import { toast } from "sonner";

export const createTaskSchema = z.object({
  title: z.string().min(3, {
    message: "Task title must be at least 3 characters long",
  }),
  content: z.string().optional(),
});

export function CreateTaskDialog({
  project,
  addTaskCallback,
}: {
  project: Project;
  addTaskCallback: (task: Task) => void;
}) {
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
  });

  const close = () => {
    setShowNewTaskModal(false);
  };

  function onSubmit(data: z.infer<typeof createTaskSchema>) {
    createTask(project.id, data.title, data.content).then((task) => {
      toast.success("Task created");
      addTaskCallback(task);
      close();
    });
  }

  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  return (
    <>
      <Button variant="default" onClick={() => setShowNewTaskModal(true)}>
        Add task
      </Button>

      <Dialog
        open={showNewTaskModal}
        onOpenChange={(v) => {
          setShowNewTaskModal(v);
        }}
      >
        <DialogContent className="items-center justify-center bg-card  py-8">
          <DialogTitle className="text-xl">
            Create a new task in{" "}
            <span className="text-primary">{project.name}</span>
          </DialogTitle>

          <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl autoFocus={true}>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Content ?"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit" className="mt-4">
              Create Task
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
