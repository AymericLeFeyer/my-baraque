"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
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
        Quitter la baraque
      </Button>
      <Dialog
        open={modalLeaveHouse}
        onOpenChange={(a) => setModalLeaveHouse(a)}
      >
        <DialogContent>
          <h1>Es-tu sûr(e) de vouloir quitter cette baraque ?</h1>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setModalLeaveHouse(false);
              }}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                leaveHouse(props.houseId, userApp!).then(() => {
                  setModalLeaveHouse(false);
                  deleteHouse(props.houseId);
                  toast.success("Tu es parti(e) de la baraque");
                  router.push("/houses");
                });
              }}
            >
              Supprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
