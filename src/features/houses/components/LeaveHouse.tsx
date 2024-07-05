"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Trash } from "lucide-react";
import { leaveHouse } from "../actions/leave-house.action";
import { toast } from "sonner";
import { useUserStore } from "@/features/users/user.store";
import { useCurrentHouseStore } from "../current-house.store";

export type LeaveHouseProps = {
  houseId: string;
};

export const LeaveHouse = (props: LeaveHouseProps) => {
  const [modalLeaveHouse, setModalLeaveHouse] = useState(false);
  const { userApp } = useUserStore();
  const { deleteHouse } = useCurrentHouseStore();
  const router = useRouter();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setModalLeaveHouse(true)}
        className="flex gap-2"
      >
        <LogOut size={16} />
        Leave baraque
      </Button>
      <Dialog
        open={modalLeaveHouse}
        onOpenChange={(a) => setModalLeaveHouse(a)}
      >
        <DialogContent>
          <h1>Are you sure you want to leave this baraque?</h1>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setModalLeaveHouse(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                leaveHouse(props.houseId, userApp!).then(() => {
                  setModalLeaveHouse(false);
                  deleteHouse(props.houseId);
                  toast.success("You left the house");
                  router.push("/houses");
                });
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
