"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { deleteProject } from "../actions/delete-project.action";
import { useProjectsStore } from "../projects.store";
import { Trash } from "lucide-react";
import { useState } from "react";

export type DeleteProjectProps = {
  projectId: string;
  houseId: string;
};

export const DeleteProject = (props: DeleteProjectProps) => {
  const [modalDeleteProject, setModalDeleteProject] = useState(false);
  const router = useRouter();
  const { projects, setProjects } = useProjectsStore();

  return (
    <>
      <Button
        className="flex gap-2"
        variant="destructive"
        onClick={() => setModalDeleteProject(true)}
      >
        <Trash size={16} />
        Supprimer
      </Button>
      <Dialog
        open={modalDeleteProject}
        onOpenChange={(a) => setModalDeleteProject(a)}
      >
        <DialogContent>
          <h1>Es-tu sûr de vouloir supprimer ce projet ?</h1>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                deleteProject(props.projectId);
                setModalDeleteProject(false);
                setProjects(projects.filter((p) => p.id !== props.projectId));
                router.push(`/houses`);
              }}
            >
              Supprimer
            </Button>
            <Button
              variant="secondary"
              onClick={() => setModalDeleteProject(false)}
            >
              Annuler
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
