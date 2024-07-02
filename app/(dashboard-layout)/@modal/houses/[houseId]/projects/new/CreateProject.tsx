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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createProjectInHouse } from "../../../../../../../src/features/projects/actions/create-project.action";
import type { House } from "@prisma/client";
import { Info } from "lucide-react";

export function CreateProject({ house }: { house: House }) {
  const createProjectSchema = z.object({
    name: z.string().min(3, {
      message: "Project name must be at least 3 characters long",
    }),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
  });

  const close = () => {
    router.refresh();
    router.back();
  };

  function onSubmit(data: z.infer<typeof createProjectSchema>) {
    createProjectInHouse(house.id, data.name, data.description).then(
      (project) => {
        toast.success("Project created");
        close();

        setTimeout(() => {
          router.push(`/houses/${house.id}/projects/${project.id}`);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }, 100);
      },
    );
  }

  const router = useRouter();

  return (
    <>
      <Dialog
        open={true}
        onOpenChange={() => {
          close();
        }}
      >
        <DialogContent className="items-center justify-center bg-card  py-8">
          <DialogTitle className="text-xl">
            Create a new project in{" "}
            <span className="text-primary">{house.name}</span>
          </DialogTitle>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="size-5" />
            <p className="text-sm ">A project is a bundle of tasks ...</p>
          </div>

          <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl autoFocus={true}>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Description ?"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit" className="mt-4">
              Create Project
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
