import { Typography } from "@/components/ui/typography";
import { Layout, LayoutContent, LayoutTitle } from "@/features/page/layout";
import { cn } from "@/lib/utils";
import { HousePlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPendingInvitationsFromUser } from "../invitations/actions/get-pending-invitations-from-user.action";
import { useUserStore } from "@/features/users/user.store";
import { Dialog } from "@radix-ui/react-dialog";
import { PendingInvitationsDialog } from "../invitations/components/PendingInvitationsDialog";
import { usePendingsInvitationsStore } from "../invitations/pendings-invitations.store";

export const NoHouse = () => {
  const { setPendingInvitations, pendingInvitations } =
    usePendingsInvitationsStore();
  const userApp = useUserStore((s) => s.userApp);
  const [pendingDialogOpen, setPendingDialogOpen] = useState(false);

  useEffect(() => {
    if (userApp == null) {
      return;
    }
    getPendingInvitationsFromUser(userApp.email).then((invitations) => {
      setPendingInvitations(invitations);
    });
  }, [userApp]);

  return (
    <>
      <Layout>
        <LayoutTitle>Welcome in Baraque !</LayoutTitle>
        <LayoutContent>
          <Typography variant={"lead"}>
            In baraque, you need to have a "baraque" to start your adventure
          </Typography>

          <div className="mt-12  flex items-center justify-center gap-4 max-lg:flex-col">
            <Link
              key="/"
              href="/houses/new"
              className="flex w-1/3 flex-col items-center justify-center rounded-xl bg-card p-12 transition-colors hover:bg-muted hover:text-primary"
            >
              <HousePlus className="mb-2 size-12" />
              <p>
                <strong>Create</strong> a baraque
              </p>
            </Link>
            or
            <div
              className="flex w-1/3 cursor-pointer flex-col items-center justify-center rounded-xl bg-card p-12 transition-colors hover:bg-muted hover:text-primary"
              onClick={() => setPendingDialogOpen(true)}
            >
              <HousePlus className="mb-2 size-12" />
              <p>
                <strong>Join</strong> a baraque
              </p>
            </div>
          </div>
        </LayoutContent>
      </Layout>

      <Dialog
        open={pendingDialogOpen}
        onOpenChange={(v) => setPendingDialogOpen(v)}
      >
        <PendingInvitationsDialog
          setDialogOpen={(v) => setPendingDialogOpen(v)}
        />
      </Dialog>
    </>
  );
};
