"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProject } from "../actions/delete-project.action";

export type DeleteProjectProps = {
  projectId: string;
  houseId: string;
};

export const DeleteProject = (props: DeleteProjectProps) => {
  const [modalDeleteProject, setModalDeleteProject] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button variant="destructive" onClick={() => setModalDeleteProject(true)}>
        Delete project
      </Button>
      <Dialog
        open={modalDeleteProject}
        onOpenChange={(a) => setModalDeleteProject(a)}
      >
        <DialogContent>
          <h1>Are you sure you want to delete this project?</h1>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                deleteProject(props.projectId);
                setModalDeleteProject(false);
                router.refresh();
                router.push(`/houses/${props.houseId}`);
              }}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setModalDeleteProject(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
