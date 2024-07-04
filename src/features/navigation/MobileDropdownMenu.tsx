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
import { Folder, FolderPlus, House, HousePlus, Menu, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Divider } from "@/components/ui/divider";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export const MobileDropdownMenu = ({
  className,
  user,
}: {
  className?: string;
  user: User;
}) => {
  const [open, setOpen] = useState(false);
  const currentPath = usePathname();
  const { house, houses, setHouse, setHouses, setOwner, setUsers } =
    useCurrentHouseStore();
  const { projects, setProjects } = useProjectsStore();
  const { setUserAuth, setUserApp } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    setUserAuth(user);

    getUserById(user.id!).then((u) => {
      setUserApp(u!);
    });

    getHouses(user.id!).then((h) => {
      setHouses(h);
      if (!house && h.length > 0) {
        setHouse(h[0]);
      } else {
        router.push("/houses/new");
      }
    });
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
