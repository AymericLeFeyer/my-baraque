"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { createHouse } from "../_actions/create-house";
import { z } from "zod";
import { useRouter } from "next/navigation";

export function CreateHouseForm() {
  const router = useRouter();
  const createHouseSchema = z.object({
    name: z.string().min(3, {
      message: "House name must be at least 3 characters long",
    }),
  });

  const form = useForm<z.infer<typeof createHouseSchema>>({
    resolver: zodResolver(createHouseSchema),
  });

  function onSubmit(data: z.infer<typeof createHouseSchema>) {
    createHouse(data.name).then((house) => {
      if (!house) {
        return;
      }

      router.refresh();
      router.push(`/houses/${house.id}`);
    });
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="house name" {...field} />
            </FormControl>
            <FormDescription>Enter the name of the house</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <Button type="submit">Create House</Button>
    </Form>
  );
}
