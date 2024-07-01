"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { UpdateProjectSchema } from "../_schemas/update-project.schema";
import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { updateProjectAction } from "../_actions/update-project";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useZodForm,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/features/form/SubmitButton";
import type { Project } from "@prisma/client";

export type UpdateProjectProps = {
  project: Project;
};

export const UpdateProject = (props: UpdateProjectProps) => {
  const [modalUpdateProject, setModalUpdateProject] = useState(false);
  const router = useRouter();

  const form = useZodForm({
    schema: UpdateProjectSchema,
    defaultValues: props.project,
  });

  type UpdateFormType = z.infer<typeof UpdateProjectSchema>;

  const updateHouseMutation = useMutation({
    mutationFn: async (values: UpdateFormType) => {
      const { data, serverError } = await updateProjectAction(values);
      if (serverError) {
        toast.error(serverError);
      }

      if (data) {
        toast.success("Project updated");
        setModalUpdateProject(false);
        router.refresh();
      }
    },
  });
  return (
    <>
      <Button
        className="flex gap-2"
        onClick={() => setModalUpdateProject(true)}
      >
        <Pen size={16} />
        Update
      </Button>
      <Dialog
        open={modalUpdateProject}
        onOpenChange={(a) => setModalUpdateProject(a)}
      >
        <DialogContent>
          <h1>Let's update </h1>
          <div className="flex gap-2">
            <Form
              form={form}
              onSubmit={async (v) => updateHouseMutation.mutateAsync(v)}
              disabled={updateHouseMutation.isPending}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project title</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project description</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <SubmitButton>
                {updateHouseMutation.isPending ? "Updating..." : "Update"}
              </SubmitButton>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
