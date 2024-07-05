"use client";

import {
  Crown,
  FolderPlus,
  MailQuestion,
  Trash,
  Users,
  UserX,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  Layout,
} from "@/features/page/layout";
import { ProjectCard } from "./ProjectCard";
import { useCurrentHouseStore } from "../current-house.store";
import { useProjectsStore } from "@/features/projects/projects.store";
import { useUserStore } from "@/features/users/user.store";
import { UpdateHouse } from "./UpdateHouse";
import { DeleteHouse } from "./DeleteHouse";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPendingInvitationsFromHouse } from "../invitations/actions/get-pending-invitations-from-house.action";
import { cancelInvitation } from "../invitations/actions/cancel-invitation.action";
import { toast } from "sonner";
import { useInvitationsStore } from "../invitations/invitations.store";
import { NoHouse } from "./NoHouse";

export const HouseDetails = () => {
  const router = useRouter();
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [pendingDialogOpen, setPendingDialogOpen] = useState(false);
  const { house, owner, users } = useCurrentHouseStore();
  const { projects } = useProjectsStore();
  const userApp = useUserStore((s) => s.userApp);

  const [isOwner, setIsOwner] = useState(false);
  const {
    invitations: pendingInvitations,
    setInvitations: setPendingInvitations,
    removeInvitation: removePendingInvitation,
  } = useInvitationsStore();

  useEffect(() => {
    if (userApp != null && userApp.id == house?.ownerId) {
      setIsOwner(true);
    }
  }, [userApp, house]);

  useEffect(() => {
    if (house == null) {
      return;
    }

    getPendingInvitationsFromHouse(house!.id).then((i) => {
      setPendingInvitations(i);
    });
  }, [house]);

  if (house == null) {
    return <NoHouse />;
  }

  return (
    <>
      <Layout>
        <LayoutHeader className="flex flex-row justify-between">
          <LayoutTitle>{house.name}</LayoutTitle>
          {isOwner && (
            <div className="flex gap-2">
              <UpdateHouse house={house} />
              <DeleteHouse houseId={house!.id} />
            </div>
          )}
        </LayoutHeader>
        <LayoutContent>
          <div className="mb-2 flex items-center">
            <div className="mr-2">
              <Crown />
            </div>
            <div>{owner?.name}</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="mr-2">
              <Users />
            </div>
            <div className="flex items-center gap-1">
              {users.map((user) => (
                <DropdownMenu key={user.id}>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarFallback>{user.email[0]}</AvatarFallback>
                      <AvatarImage src={user.image!} alt="avatar" />
                    </Avatar>
                  </DropdownMenuTrigger>
                  {user.id != userApp?.id && (
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <div className="flex gap-1">
                          <Crown className="mr-2 size-4" />
                          Set as owner
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="flex gap-1">
                          <UserX className="mr-2 size-4" />
                          Remove
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              ))}
              {isOwner && (
                <Link href={`/houses/add-user`}>
                  <Avatar>
                    <AvatarFallback className="transition-colors hover:bg-primary">
                      +
                    </AvatarFallback>
                  </Avatar>
                </Link>
              )}
            </div>
            {pendingInvitations.length > 0 && (
              <div
                className="ml-2 cursor-pointer transition-colors hover:text-primary"
                onClick={() => setPendingDialogOpen(true)}
              >
                <MailQuestion />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Typography variant="h3" className="mt-6">
              Projects
            </Typography>
            <Button
              variant="outline"
              onClick={() => router.push(`/projects/new`)}
              className="flex gap-2 "
            >
              <FolderPlus size={24} />
              <p className="font-bold">Create project</p>
            </Button>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            {projects.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </LayoutContent>
      </Layout>

      <Dialog
        open={addUserDialogOpen}
        onOpenChange={(v) => setAddUserDialogOpen(v)}
      >
        <DialogContent>
          <DialogTitle>Add user</DialogTitle>
        </DialogContent>
      </Dialog>

      <Dialog
        open={pendingDialogOpen}
        onOpenChange={(v) => setPendingDialogOpen(v)}
      >
        <DialogContent>
          <DialogTitle>Pending invitations</DialogTitle>
          {pendingInvitations.map((invitation) => (
            <div key={invitation.id}>
              <div className="flex gap-2">
                <Trash
                  className="cursor-pointer transition-colors hover:text-destructive "
                  onClick={() => {
                    cancelInvitation(invitation.id, house!.id).then(() => {
                      toast.success("Invitation canceled");
                      removePendingInvitation(invitation.id);
                      if (pendingInvitations.length == 0) {
                        setPendingDialogOpen(false);
                      }
                    });
                  }}
                />
                {invitation.email}
              </div>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};
