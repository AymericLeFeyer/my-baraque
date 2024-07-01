"use client";

import { Crown, FolderPlus, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProjectCard } from "./_components/ProjectCard";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import { useHouseStore } from "./_stores/house.store";
import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
  Layout,
} from "@/features/page/layout";

export type HouseDetailsProps = {
  children: React.ReactNode;
};

export const HouseDetails = (props: HouseDetailsProps) => {
  const router = useRouter();
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const { house, users, owner, projects } = useHouseStore();

  return (
    <>
      <Layout>
        <LayoutHeader className="flex flex-row justify-between">
          <LayoutTitle>{house?.name}</LayoutTitle>
          {props.children}
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
              <Link href={`/houses/${house?.id}/addUser`}>
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
              onClick={() => router.push(`/houses/${house?.id}/projects/new`)}
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
