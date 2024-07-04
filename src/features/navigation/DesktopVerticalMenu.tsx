"use client";

import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, cloneElement, useEffect } from "react";
import type { NavigationLinkGroups } from "./navigation.type";
import { Folder, FolderPlus, House, HousePlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useCurrentHouseStore } from "../houses/current-house.store";
import type { User } from "next-auth";
import { Divider } from "@/components/ui/divider";
import { getHouses } from "../houses/actions/get-houses.action";
import { useProjectsStore } from "../projects/projects.store";
import { getProjectsFromHouse } from "../projects/actions/get-projects.action";
import { getUsersByHouse } from "../houses/actions/get-users-by-house.action";
import { useUserStore } from "../users/user.store";
import { getUserById } from "../users/actions/get-user.action.action";
import { HouseSelector } from "./HouseSelector";

export const DesktopVerticalMenu = ({
  className,
  user,
}: {
  className?: string;
  user: User;
}) => {
  const currentPath = usePathname();
  const { house, setHouse, setHouses, setOwner, setUsers } =
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
    <nav className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-col gap-4">
        <HouseSelector />

        <Separator />
      </div>
      <div className="flex">
        <Link
          href={`/houses`}
          className={cn(
            "flex h-8 grow items-center gap-2 rounded-md px-2 text-sm transition-colors",
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
        <div className="flex">
          <Link
            href="/projects"
            className={cn(
              "flex h-8 grow items-center gap-2 rounded-md px-2 text-sm transition-colors",
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
          <Link
            href={`/projects/new`}
            className="flex grow-0 items-center justify-center rounded-md p-1 px-2 transition-colors hover:bg-card"
          >
            <FolderPlus size={16} />
          </Link>
        </div>
        <div className="ml-4">
          {projects.map((project) => {
            return (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className={cn("flex hover:text-primary p-1 rounded-sm group", {
                  "text-primary  rounded-sm":
                    currentPath === `/projects/${project.id}`,
                })}
              >
                {cloneElement(<Folder />, {
                  className: "h-3 w-3 mt-1",
                })}
                <Typography
                  variant="muted"
                  className={cn("px-2 group-hover:text-primary", {
                    "text-primary": currentPath === `/projects/${project.id}`,
                  })}
                >
                  {project.name}
                </Typography>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
