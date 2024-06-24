"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { deleteHouse } from "../_actions/delete-house";
import { useRouter } from "next/navigation";

export type DeleteHouseProps = {
  houseId: string;
};

export const DeleteHouse = (props: DeleteHouseProps) => {
  const [modalDeleteHouse, setModalDeleteHouse] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button variant="destructive" onClick={() => setModalDeleteHouse(true)}>
        Delete house
      </Button>
      <Dialog
        open={modalDeleteHouse}
        onOpenChange={(a) => setModalDeleteHouse(a)}
      >
        <DialogContent>
          <h1>Are you sure you want to delete this baraque?</h1>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                deleteHouse(props.houseId);
                setModalDeleteHouse(false);
                router.refresh();
                router.push("/houses");
              }}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setModalDeleteHouse(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
