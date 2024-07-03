"use client";

import { Crown, FolderPlus, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import HouseActions from "./HouseActions";

export const HouseDetails = () => {
  const router = useRouter();
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const { house, owner, users } = useCurrentHouseStore();
  const { projects } = useProjectsStore();

  return (
    <>
      <Layout>
        <LayoutHeader className="flex flex-row justify-between">
          <LayoutTitle>{house?.name}</LayoutTitle>
          <HouseActions />
        </LayoutHeader>
        <LayoutContent>
          <div className="mb-2 flex items-center">
            <div className="mr-2">
              <Crown />
            </div>
            <div>{owner?.name}</div>
          </div>
          <div className="flex items-center">
            <div className="mr-2">
              <Users />
            </div>
            <div className="flex items-center gap-1">
              {users.map((user) => (
                <Avatar key={user.id}>
                  <AvatarFallback>{user.email[0]}</AvatarFallback>
                  <AvatarImage src={user.image!} alt="avatar" />
                </Avatar>
              ))}
              <Link href={`/houses/add-user`}>
                <Avatar>
                  <AvatarFallback className="transition-colors hover:bg-primary">
                    +
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
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
    </>
  );
};
