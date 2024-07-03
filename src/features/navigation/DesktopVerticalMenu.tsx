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

const useCurrentHouse = () => {
  const currentPath = usePathname();
  const pathSegments = currentPath.split("/");
  if (pathSegments.length >= 2) {
    return pathSegments[2];
  }

  return null;
};

export const DesktopVerticalMenu = ({
  links,
  className,
  user,
}: {
  links: NavigationLinkGroups[];
  className?: string;
  user: User;
}) => {
  const currentPath = usePathname();
  const { house, houses, setHouse, setHouses, setOwner, setUsers } =
    useCurrentHouseStore();
  const { projects, setProjects } = useProjectsStore();
  const { setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    setUser(user);
    getHouses(user.id!).then((h) => {
      setHouses(h);
      if (!house && h.length > 0) {
        setHouse(h[0]);
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
        <Select
          onValueChange={(v) => {
            setHouse(houses.find((h) => h.id == v)!);
            router.push(`/houses`);
          }}
        >
          <SelectTrigger>{house?.name}</SelectTrigger>
          <SelectContent>
            {houses.map((house) => (
              <SelectItem key={house.id} value={house.id}>
                {house.name}
              </SelectItem>
            ))}
            <Divider className="my-2" />
            <Link
              key="/"
              className={cn(
                "flex h-8 items-center rounded-md  text-sm transition-colors justify-center ",
                "hover:bg-accent ",
                {
                  "bg-accent/50 hover:bg-accent/80":
                    currentPath === "/houses/new",
                },
              )}
              href="/houses/new"
            >
              <HousePlus className="size-4 " />
              <Typography className="flex h-8 items-center gap-2 rounded-md px-2 text-sm    ">
                New baraque
              </Typography>
            </Link>
          </SelectContent>
        </Select>

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
            // {
            //   "text-primary": house && currentHouse === section.url.split("/")[2],
            // },
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
                className={cn("flex hover:bg-card p-1 rounded-sm", {
                  "text-primary hover:bg-card  rounded-sm":
                    currentPath === `/projects/${project.id}`,
                })}
              >
                {cloneElement(<Folder />, {
                  className: "h-3 w-3 mt-1",
                })}
                <Typography
                  variant="muted"
                  className={cn("px-2", {
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
