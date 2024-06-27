"use client";

import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, cloneElement } from "react";
import type { NavigationLinkGroups } from "./navigation.type";
import { FolderPlus, HousePlus, Plus } from "lucide-react";

const useCurrentPath = (links: NavigationLinkGroups[]) => {
  const currentPath = usePathname();
  const pathSegments = currentPath.split("/");
  const allDashboardLinks = links.flatMap((section) => section.links);

  const linkMatchCounts = allDashboardLinks.map((link) => ({
    url: link.url,
    matchCount: link.url
      .split("/")
      .filter((segment, index) => segment === pathSegments[index]).length,
  }));

  const mostMatchingLink = linkMatchCounts.reduce(
    (maxMatchLink, currentLink) =>
      currentLink.matchCount > maxMatchLink.matchCount
        ? currentLink
        : maxMatchLink,
    { url: "", matchCount: 0 },
  );

  return mostMatchingLink.url;
};

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
}: {
  links: NavigationLinkGroups[];
  className?: string;
}) => {
  const currentPath = usePathname();
  const currentHouse = useCurrentHouse();

  return (
    <nav className={cn("flex flex-col gap-4", className)}>
      <Fragment>
        <Link
          key="/"
          className={cn(
            "flex h-8 items-center rounded-md px-2 py-6 text-sm transition-colors justify-center ",
            "hover:bg-card ",
            {
              "bg-accent/50 hover:bg-accent/80": currentPath === "/houses/new",
            },
          )}
          href="/houses/new"
        >
          <HousePlus className="size-4 " />
          <Typography className="flex h-8 items-center gap-2 rounded-md px-2 text-sm    ">
            Nouvelle baraque
          </Typography>
        </Link>
        <Separator />
      </Fragment>
      {links.map((section, index) => (
        <Fragment key={index}>
          {section.title ? (
            <div className="flex gap-2">
              <Link
                key={section.url}
                className={cn(
                  "flex h-8 grow items-center gap-2 rounded-md px-2 text-sm transition-colors  justify-between",
                  "hover:bg-card",
                  {
                    "bg-accent/50 hover:bg-accent/80":
                      currentPath === section.url,
                  },
                  {
                    "text-primary": currentHouse === section.url.split("/")[2],
                  },
                )}
                href={section.url}
              >
                {" "}
                <div className="flex h-8 items-center ">
                  {cloneElement(section.icon, {
                    className: "h-4 w-4",
                  })}
                  <span className="flex h-8 items-center gap-2 rounded-md px-2 text-sm">
                    {section.title}
                  </span>
                </div>
              </Link>
              <Link
                href={`${section.url}/projects/new`}
                className="rounded-md p-1 transition-colors hover:bg-card px-2 flex items-center justify-center flex-grow-0"
              >
                <FolderPlus
                  className={cn("size-4 ", {
                    "text-primary": currentHouse === section.url.split("/")[2],
                  })}
                />
              </Link>
            </div>
          ) : null}
          <div className="mx-4 flex flex-col gap-2">
            {section.links.map((link) => {
              return (
                <Link
                  href={link.url}
                  key={link.url}
                  className={cn("flex hover:bg-card p-1 rounded-sm", {
                    "text-primary hover:bg-card  rounded-sm":
                      currentPath === link.url,
                  })}
                >
                  {cloneElement(link.icon, {
                    className: "h-3 w-3 mt-1",
                  })}
                  <Typography
                    variant="muted"
                    className={cn("px-2", {
                      "text-primary": currentPath === link.url,
                    })}
                  >
                    {link.title}
                  </Typography>
                </Link>
              );
            })}
          </div>
        </Fragment>
      ))}
    </nav>
  );
};
