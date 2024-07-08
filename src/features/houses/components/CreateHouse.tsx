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
import { createHouse } from "../actions/create-house.action";
import { useCurrentHouseStore } from "@/features/houses/current-house.store";
import { useUserStore } from "@/features/users/user.store";

export function CreateHouse() {
  const { setHouse, setHouses, houses, setOwner, setUsers } =
    useCurrentHouseStore();
  const { userApp } = useUserStore();

  const createHouseSchema = z.object({
    name: z.string().min(3, {
      message: "Le nom de la baraque doit comporter au moins 3 caractères.",
    }),
  });

  const form = useForm<z.infer<typeof createHouseSchema>>({
    resolver: zodResolver(createHouseSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof createHouseSchema>) {
    createHouse(data.name).then((house) => {
      if (!house) {
        return;
      }
      toast.success("Baraque créée");
      form.reset();

      close();

      setHouse(house);
      setHouses(houses ? houses.concat(house) : [house]);
      setOwner(userApp!);
      setUsers([userApp!]);
    });
  }

  const close = () => {
    router.back();
  };

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
            Créé une nouvelle <span className="text-primary">baraque</span>
          </DialogTitle>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="size-5" />
            <p className="text-sm ">Une baraque est un ensemble de projets</p>
          </div>

          <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nom" {...field} />
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
