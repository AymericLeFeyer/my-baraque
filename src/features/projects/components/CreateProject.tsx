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
import { Info } from "lucide-react";
import { createProjectInHouse } from "@/features/projects/actions/create-project.action";
import { useProjectsStore } from "@/features/projects/projects.store";
import { useCurrentHouseStore } from "@/features/houses/current-house.store";

export function CreateProject() {
  const { projects, setProjects } = useProjectsStore();
  const { house } = useCurrentHouseStore();

  const createProjectSchema = z.object({
    name: z.string().min(3, {
      message: "Le nom du projet doit comporter au moins 3 caractères.",
    }),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const close = () => {
    router.refresh();
    router.back();
  };

  function onSubmit(data: z.infer<typeof createProjectSchema>) {
    if (house == null) {
      return null;
    }
    createProjectInHouse(house.id, data.name, data.description).then(
      (project) => {
        toast.success("Projet créé");
        setProjects([...projects, project]);
        form.reset();
        close();

        setTimeout(() => {
          router.push(`/projects/${project.id}`);
        }, 100);
      },
    );
  }

  const router = useRouter();

  if (house == null) {
    return null;
  }

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
            Créé un nouveau projet dans{" "}
            <span className="text-primary">{house.name}</span>
          </DialogTitle>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="size-5" />
            <p className="text-sm ">Un projet est un ensemble de tâches ...</p>
          </div>

          <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl autoFocus={true}>
                    <Input placeholder="Nom" {...field} />
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
                      placeholder="Description"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit" className="mt-4">
              Créer
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
