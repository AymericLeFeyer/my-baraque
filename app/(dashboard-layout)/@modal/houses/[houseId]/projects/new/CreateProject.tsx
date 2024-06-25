"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createProjectInHouse } from "../../../../../houses/[houseId]/_actions/create-project";

export function CreateProject({ houseId }: { houseId: string }) {
  const createProjectSchema = z.object({
    name: z.string().min(3, {
      message: "Project name must be at least 3 characters long",
    }),
    description: z.string().nullable(),
  });

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
  });

  const close = () => {
    router.back();
  };

  function onSubmit(data: z.infer<typeof createProjectSchema>) {
    createProjectInHouse(houseId, data.name, data.description);
    toast.success("Project created");
    router.refresh();
    close();
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
}
