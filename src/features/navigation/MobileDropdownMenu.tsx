"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/ui/typography";
import {
  Folder,
  FolderPlus,
  House,
  HousePlus,
  Menu,
  MenuSquareIcon,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import { Fragment, cloneElement, useEffect, useState } from "react";
import type { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useCurrentHouseStore } from "../houses/current-house.store";
import { useProjectsStore } from "../projects/projects.store";
import { useUserStore } from "../users/user.store";
import { useRouter } from "next/navigation";
import { getUserById } from "../users/actions/get-user.action.action";
import { getHouses } from "../houses/actions/get-houses.action";
import { getProjectsFromHouse } from "../projects/actions/get-projects.action";
import { getUsersByHouse } from "../houses/actions/get-users-by-house.action";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const MobileDropdownMenu = ({
  className,
  user,
  forceHouse,
}: {
  className?: string;
  user: User;
  forceHouse: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const currentPath = usePathname();
  const { house, setHouse, setHouses, setOwner, setUsers } =
    useCurrentHouseStore();
  const { setProjects } = useProjectsStore();
  const { setUserAuth, setUserApp } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    setUserAuth(user);

    getUserById(user.id!).then((u) => {
      setUserApp(u!);
    });

    if (forceHouse == true) {
      getHouses(user.id!).then((h) => {
        setHouses(h);
        if (h.length > 0) {
          setHouse(h[0]);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (house == null) {
      return;
    }

    getProjectsFromHouse(house.id).then((projs) => {
      setProjects(projs);
    });

    getUsersByHouse(house.id).then((users) => {
      setUsers(users);
      setOwner(users.find((u) => u.id === house.ownerId)!);
    });
  }, [house]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          {open ? <X /> : <Menu />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{
          width: "calc(30vw - 2rem)",
          marginRight: "1rem",
        }}
        className="flex flex-col gap-2"
      >
        <div className="">
          <Link
            href={`/houses`}
            onClick={() => setOpen(false)}
            className={cn(
              "flex flex-col  items-center gap-2 rounded-md p-2 text-sm transition-colors",
              "hover:bg-card",
              {
                "bg-accent/50 hover:bg-accent/80":
                  house && currentPath === `/houses`,
              },
            )}
          >
            <>
              <House size={16} />
              Baraque
            </>
          </Link>
        </div>

        <div>
          <div className="">
            <Link
              onClick={() => setOpen(false)}
              href="/projects"
              className={cn(
                "flex flex-col  items-center gap-2 rounded-md p-2 text-sm transition-colors",
                "hover:bg-card",
                {
                  "bg-accent/50 hover:bg-accent/80":
                    currentPath.split("/")[1] === "projects",
                },
              )}
            >
              <>
                <Folder size={16} />
                Projects
              </>
            </Link>
          </div>
        </div>

        <div className="">
          <div
            className={cn(
              "flex flex-col text-muted-foreground items-center gap-2 rounded-md p-2 text-sm transition-colors",
            )}
          >
            <>
              <div className="flex gap-2">
                <ShoppingCart size={16} />
                <Badge variant={"outline"}>soon</Badge>
              </div>
              Shopping list
            </>
          </div>
        </div>

        <div className="">
          <div
            className={cn(
              "flex flex-col text-muted-foreground items-center gap-2 rounded-md p-2 text-sm transition-colors",
            )}
          >
            <>
              <div className="flex gap-2">
                <MenuSquareIcon size={16} />
                <Badge variant={"outline"}>soon</Badge>
              </div>
              Menus
            </>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
