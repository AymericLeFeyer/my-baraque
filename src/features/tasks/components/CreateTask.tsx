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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Project, Task } from "@prisma/client";
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
import { ListPlus } from "lucide-react";
import { createTask } from "@/features/tasks/actions/create-task.action";
import { useUserStore } from "@/features/users/user.store";

export const createTaskSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre de la tâche doit comporter au moins 3 caractères.",
  }),
  content: z.string().optional(),
  nextTimeInDays: z.number().optional(),
});

export function CreateTaskDialog({
  project,
  addTaskCallback,
}: {
  project: Project;
  addTaskCallback: (task: Task) => void;
}) {
  const { userApp } = useUserStore();

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const close = () => {
    setShowNewTaskModal(false);
  };

  function onSubmit(data: z.infer<typeof createTaskSchema>) {
    createTask(
      project.id,
      data.title,
      data.content,
      data.nextTimeInDays,
      userApp?.id,
    ).then((task) => {
      toast.success("Tâche créée");
      addTaskCallback(task);
      form.reset();
      close();
    });
  }

  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [isScheduledTask, setIsScheduledTask] = useState(false);
  const [isCustomDays, setIsCustomDays] = useState(false);

  useEffect(() => {
    form.setValue("nextTimeInDays", undefined);
    setIsCustomDays(false);
    form.clearErrors("nextTimeInDays");
  }, [form, isScheduledTask]);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowNewTaskModal(true)}
        className="flex gap-2 "
      >
        <ListPlus size={24} />
        <p className="font-bold">Nouvelle tâche</p>
      </Button>
      <Dialog
        open={showNewTaskModal}
        onOpenChange={(v) => {
          setShowNewTaskModal(v);
        }}
      >
        <DialogContent className="items-center justify-center bg-card  py-8">
          <DialogTitle className="text-xl">
            Création de tâche dans{" "}
            <span className="text-primary">{project.name}</span>
          </DialogTitle>

          <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl autoFocus={true}>
                    <Input placeholder="Titre" {...field} />
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
                      placeholder="Contenu"
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
              <p>Tâche programmée ?</p>
            </div>
            {isScheduledTask && (
              <div className="rounded-xl border-2 border-dashed p-2">
                <FormField
                  control={form.control}
                  name="nextTimeInDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choisis une période</FormLabel>
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
                            <SelectValue placeholder="Temps avant la prochaine création ?" />
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
                      <FormLabel>Nombre de jours personnalisé ?</FormLabel>
                      <Input
                        placeholder="Nombre de jours"
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
              Créer
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
