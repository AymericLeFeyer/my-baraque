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
import { Badge } from "@/components/ui/badge";

export const NoHouse = () => {
  const { pendingInvitations, setPendingInvitations } =
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
              className="flex w-[300px] flex-col items-center justify-center rounded-xl bg-card p-12 transition-colors hover:bg-muted hover:text-primary max-sm:w-full"
            >
              <HousePlus className="mb-2 size-12" />
              <p>
                <strong>Create</strong> a baraque
              </p>
            </Link>
            or
            <div
              className="flex w-[300px] cursor-pointer flex-col items-center justify-center rounded-xl bg-card p-12 transition-colors hover:bg-muted hover:text-primary max-sm:w-full"
              onClick={() => setPendingDialogOpen(true)}
            >
              <div className="relative">
                {pendingInvitations.length > 0 && (
                  <Badge className="absolute right-[-20px] top-[-15px]">
                    {pendingInvitations.length}
                  </Badge>
                )}
                <HousePlus className="mb-2 size-12" />
              </div>
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
