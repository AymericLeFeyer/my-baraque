"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { useCurrentHouseStore } from "../houses/current-house.store";
import { useRouter } from "next/navigation";
import { Divider } from "@/components/ui/divider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HousePlus, Mail } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { PendingInvitationsDialog } from "../houses/invitations/components/PendingInvitationsDialog";
import { usePendingsInvitationsStore } from "../houses/invitations/pendings-invitations.store";
import { Badge } from "@/components/ui/badge";

export const HouseSelector = () => {
  const currentPath = usePathname();
  const { house, houses, setHouse } = useCurrentHouseStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pendingDialogOpen, setPendingDialogOpen] = useState(false);
  const { pendingInvitations } = usePendingsInvitationsStore();

  return (
    <>
      <Select
        onOpenChange={(v) => setOpen(v)}
        open={open}
        onValueChange={(v) => {
          setHouse(houses!.find((h) => h.id == v)!);
          router.push(`/houses`);
        }}
      >
        <SelectTrigger>
          <div className="line-clamp-1">{house?.name}</div>
        </SelectTrigger>
        <SelectContent className="">
          {houses?.map((house) => (
            <SelectItem
              key={house.id}
              value={house.id}
              className="cursor-pointer"
            >
              {house.name}
            </SelectItem>
          ))}
          <Divider className="my-2" />
          <div
            className="flex h-8 cursor-pointer items-center gap-1  rounded-md  pl-1 text-sm transition-colors hover:bg-accent"
            onClick={() => {
              setPendingDialogOpen(true);
              setOpen(false);
            }}
          >
            <Mail className="size-4 pl-1 " />
            <Typography className="flex h-8 grow items-center gap-2 rounded-md px-2  text-sm  ">
              Check invitations
            </Typography>
            {pendingInvitations.length > 0 && (
              <Badge className="mr-2">{pendingInvitations.length}</Badge>
            )}
          </div>
          <Divider className="my-2" />
          <Link
            key="/"
            className={cn(
              "flex h-8 items-center rounded-md text-sm  transition-colors  pl-1 gap-1",
              "hover:bg-accent ",
              {
                "bg-accent/50 hover:bg-accent/80":
                  currentPath === "/houses/new",
              },
            )}
            href="/houses/new"
            onClick={() => setOpen(false)}
          >
            <HousePlus className="size-4 pl-1 " />
            <Typography className="flex h-8 items-center gap-2 rounded-md px-2 text-sm    ">
              New baraque
            </Typography>
          </Link>
        </SelectContent>
      </Select>

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
