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
import { useCurrentHouseStore } from "../current-house.store";
import { useUserStore } from "@/features/users/user.store";
import { inviteUser } from "../invitations/actions/invite-user.action";
import { sendEmailToUser } from "../actions/send-mail-to-user.action";
import { useInvitationsStore } from "../invitations/invitations.store";

export function AddUser() {
  const house = useCurrentHouseStore((s) => s.house);
  const user = useUserStore((s) => s.userApp);
  const {
    invitations: pendingInvitations,
    addInvitation: addPendingInvitation,
  } = useInvitationsStore();

  const addUserSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
  });

  function onSubmit(data: z.infer<typeof addUserSchema>) {
    if (pendingInvitations.some((i) => i.email === data.email)) {
      toast.error("L'utilisateur a déjà été invité");
      return;
    }
    inviteUser(data.email, house!, user!).then((invitation) => {
      // send email
      sendEmailToUser(data.email, house!.name, user!.name!);
      addPendingInvitation(invitation);
    });
    toast.success("Utilisateur invité");
    close();
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
            Invite un nouvel <span className="text-primary">utilisateur</span>
          </DialogTitle>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="size-5" />
            <p className="text-sm ">
              Cet utilisateur pourra voir tous les projets et tâches dans ta
              maison.
            </p>
          </div>

          <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit" className="mt-4">
              Inviter
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
