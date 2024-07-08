import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Typography } from "@/components/ui/typography";
import { Check, Info, X } from "lucide-react";
import { Divider } from "@/components/ui/divider";
import { answerInvitation } from "../actions/answer-invitation.action";
import { useUserStore } from "@/features/users/user.store";
import { useCurrentHouseStore } from "../../current-house.store";
import { usePendingsInvitationsStore } from "../pendings-invitations.store";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export type PendingInvitationsDialogProps = {
  setDialogOpen: (open: boolean) => void;
};

export const PendingInvitationsDialog = (
  props: PendingInvitationsDialogProps,
) => {
  const { pendingInvitations, removePendingInvitation } =
    usePendingsInvitationsStore();
  const { userApp } = useUserStore();
  const { setHouse } = useCurrentHouseStore();

  if (userApp == null) {
    return null;
  }

  return (
    <DialogContent className="items-center justify-center bg-card  py-8">
      <DialogTitle className="text-xl">
        Rejoindre une nouvelle <span className="text-primary">baraque</span>
      </DialogTitle>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Info className="size-5" />
        <p className="text-sm "> Demande à quelqu'un de t'inviter.</p>
      </div>
      <Divider />
      {pendingInvitations.length === 0 && (
        <Typography variant="lead">Pas d'invitations en attente</Typography>
      )}
      <div>
        {pendingInvitations.map((invitation) => (
          <div key={invitation.id} className="flex gap-2">
            <Typography className="flex grow">
              {invitation.initiatorName}
            </Typography>
            <Check
              className="cursor-pointer hover:text-success"
              onClick={() =>
                answerInvitation(invitation.id, userApp, true).then((house) => {
                  removePendingInvitation(invitation.id);
                  setHouse(house!);
                  toast.success("Invitation acceptée");
                })
              }
            />
            <X
              className="cursor-pointer hover:text-destructive"
              onClick={() =>
                answerInvitation(invitation.id, userApp, false).then(() => {
                  removePendingInvitation(invitation.id);
                  toast.success("Invitation refusée");
                })
              }
            />
          </div>
        ))}
      </div>
    </DialogContent>
  );
};
