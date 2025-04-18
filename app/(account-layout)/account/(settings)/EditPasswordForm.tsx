"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/features/form/SubmitButton";
import { toast } from "sonner";
import { editPasswordAction } from "./edit-profile.action";
import type { EditPasswordFormType } from "./edit-profile.schema";
import { EditPasswordFormSchema } from "./edit-profile.schema";

export const EditPasswordForm = () => {
  const form = useZodForm({
    schema: EditPasswordFormSchema,
  });

  const onSubmit = async (values: EditPasswordFormType) => {
    const { serverError } = await editPasswordAction(values);
    if (serverError) {
      toast.error(serverError);
      return;
    }
    toast.success("Mot de passe actualisé");
  };

  return (
    <Form
      form={form}
      onSubmit={async (v) => onSubmit(v)}
      className="flex flex-col gap-4"
    >
      <FormField
        control={form.control}
        name="currentPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mot de passe actuel</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="newPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nouveau mot de passe</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirme le mot de passe</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <SubmitButton className="w-fit self-end">Sauvegarder</SubmitButton>
    </Form>
  );
};
