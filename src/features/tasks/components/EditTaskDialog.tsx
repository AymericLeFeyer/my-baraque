"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Task } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { scheduleChoices } from "@/features/tasks/schedule-choices";
import { editTask as edit } from "../actions/edit-task.action";
import useTaskStore from "../tasks.store";

export const editTaskSchema = z.object({
  title: z.string().min(3, {
    message: "Task title must be at least 3 characters long",
  }),
  content: z.string().optional(),
  nextTimeInDays: z.number().optional(),
});

export function EditTaskDialog({
  task,
  close,
}: {
  task: Task;
  close: () => void;
}) {
  const { editTask } = useTaskStore();

  const form = useForm<z.infer<typeof editTaskSchema>>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      content: task.content ?? "",
      nextTimeInDays: task.nextTimeInDays ?? undefined,
    },
  });

  function onSubmit(data: z.infer<typeof editTaskSchema>) {
    edit(task.id, data.title, data.content, data.nextTimeInDays).then(
      (task) => {
        toast.success("Task updated");
        editTask(task);
        close();
      },
    );
  }

  const [isScheduledTask, setIsScheduledTask] = useState(false);
  const [isCustomDays, setIsCustomDays] = useState(false);

  useEffect(() => {
    form.setValue("nextTimeInDays", undefined);
    setIsCustomDays(false);
    form.clearErrors("nextTimeInDays");
  }, [form, isScheduledTask]);

  useEffect(() => {
    if (task.nextTimeInDays !== null) {
      setIsScheduledTask(true);
    }
  }, [task.nextTimeInDays]);

  return (
    <>
      <DialogContent className="items-center justify-center bg-card  py-8">
        <DialogTitle className="text-xl">
          Update <span className="text-primary">{task.title}</span>
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
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isScheduledTask}
              onCheckedChange={(v) => setIsScheduledTask(v as boolean)}
            ></Checkbox>
            <p>Scheduled task ?</p>
          </div>
          {isScheduledTask && (
            <div className="rounded-xl border-2 border-dashed p-2">
              <FormField
                control={form.control}
                name="nextTimeInDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select the period</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(parseInt(value, 10));
                        setIsCustomDays(false); // Disable custom days since selection is made from dropdown
                      }}
                      defaultValue={field.value?.toString()}
                      disabled={isCustomDays}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Period before next creation ?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {scheduleChoices.map((choice) => (
                          <SelectItem
                            key={choice.label}
                            value={choice.days.toString()}
                          >
                            {choice.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <br />
                    <FormLabel>Custom number of days</FormLabel>
                    <Input
                      placeholder="Number of days"
                      {...field}
                      type="number"
                      onChange={(e) => {
                        const value = e.target.value;
                        const numericValue = value
                          ? parseInt(value, 10)
                          : undefined; // Convert string to number
                        field.onChange(numericValue); // Update the form value with a number
                        setIsCustomDays(!!value); // Enable custom days if there's any value
                      }}
                      value={field.value ? field.value.toString() : ""} // Ensure the value is always a string for the input
                    />
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
          )}

          <Button type="submit" className="mt-4">
            Edit Task
          </Button>
        </Form>
      </DialogContent>
    </>
  );
}
