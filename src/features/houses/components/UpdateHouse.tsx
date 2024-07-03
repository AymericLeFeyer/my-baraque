"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pen } from "lucide-react";
import type { House } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useZodForm,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import type { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/features/form/SubmitButton";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { UpdateHouseSchema } from "../update-house.schema";
import { updateHouseAction } from "../actions/update-house.action";
import { UserTile } from "@/features/projects/components/UserTile";
import { useCurrentHouseStore } from "../current-house.store";

export type UpdateHouseProps = {
  house: House;
};

export const UpdateHouse = (props: UpdateHouseProps) => {
  const [modalUpdateHouse, setModalUpdateHouse] = useState(false);
  const { users, setHouse } = useCurrentHouseStore();
  const router = useRouter();

  const form = useZodForm({
    schema: UpdateHouseSchema,
    defaultValues: props.house,
  });

  type UpdateFormType = z.infer<typeof UpdateHouseSchema>;

  const updateHouseMutation = useMutation({
    mutationFn: async (values: UpdateFormType) => {
      const { data, serverError } = await updateHouseAction(values);
      if (serverError) {
        toast.error(serverError);
      }

      if (data) {
        toast.success("House updated");
        setModalUpdateHouse(false);
        setHouse(data);
        router.refresh();
      }
    },
  });

  return (
    <>
      <Button className="flex gap-2" onClick={() => setModalUpdateHouse(true)}>
        <Pen size={16} />
        Update
      </Button>
      <Dialog
        open={modalUpdateHouse}
        onOpenChange={(a) => setModalUpdateHouse(a)}
      >
        <DialogContent className="items-center justify-center bg-card  py-8">
          <DialogTitle className="text-xl">
            Let's update{" "}
            <span className="text-primary">{props.house.name}</span>
          </DialogTitle>
          <div className="flex gap-2">
            <Form
              form={form}
              onSubmit={async (v) => updateHouseMutation.mutateAsync(v)}
              disabled={updateHouseMutation.isPending}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Baraque name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="ownerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner</FormLabel>
                    <Select
                      onValueChange={(v) => {
                        form.setValue("ownerId", v);
                      }}
                    >
                      <SelectTrigger className="h-[50px] w-auto">
                        <UserTile
                          concise={false}
                          user={users.find((v) => v.id == field.value)!}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Pick a new owner</SelectLabel>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              <UserTile concise={false} user={user} />{" "}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
