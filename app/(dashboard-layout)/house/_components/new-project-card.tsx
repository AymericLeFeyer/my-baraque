"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { createProjectSchema } from "../create-project";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectInHouse } from "../_actions/create-project";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type NewProjectProps = {
  houseId: string;
};

export const NewProjectCard = (props: NewProjectProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
  });

  function onSubmit(data: z.infer<typeof createProjectSchema>) {
    createProjectInHouse(props.houseId, data.name, data.description);
    setOpen(false);
    toast.success("Project created");
    router.refresh();
  }

  const router = useRouter();

  return (
    <>
      <div
        className="rounded-lg border border-gray-200 p-4 hover:bg-primary cursor-pointer transition-colors duration-300"
        onClick={() => setOpen(true)}
      >
        <div className="font-semibold">Create a new project</div>
        <div>Start a new project to keep track of your tasks</div>
      </div>

      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <DialogContent className="flex items-center justify-center bg-card px-4 py-8">
          <Form form={form} onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Project description"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the description of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit">Create Project</Button>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
