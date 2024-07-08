"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { deleteHouse as removeHouse } from "../actions/delete-house.action";
import { useCurrentHouseStore } from "../current-house.store";

export type DeleteHouseProps = {
  houseId: string;
};

export const DeleteHouse = (props: DeleteHouseProps) => {
  const [modalDeleteHouse, setModalDeleteHouse] = useState(false);
  const { deleteHouse } = useCurrentHouseStore();
  const router = useRouter();

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setModalDeleteHouse(true)}
        className="flex gap-2"
      >
        <Trash size={16} />
        Supprimer
      </Button>
      <Dialog
        open={modalDeleteHouse}
        onOpenChange={(a) => setModalDeleteHouse(a)}
      >
        <DialogContent>
          <h1>Es-tu sûr(e) de vouloir supprimer cette baraque ?</h1>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setModalDeleteHouse(false);
              }}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                removeHouse(props.houseId).then(() => {
                  setModalDeleteHouse(false);
                  deleteHouse(props.houseId);
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
