"use client";

import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, cloneElement } from "react";
import type { NavigationLinkGroups } from "./navigation.type";

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

export const DesktopVerticalMenu = ({
  links,
  className,
}: {
  links: NavigationLinkGroups[];
  className?: string;
}) => {
  const currentPath = usePathname();

  return (
    <nav className={cn("flex flex-col gap-4", className)}>
      {links.map((section, index) => (
        <Fragment key={index}>
          {section.title ? (
            <Link
              key={section.url}
              className={cn(
                "flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors",
                "hover:bg-card",
                {
                  "bg-accent/50 hover:bg-accent/80":
                    currentPath === section.url,
                },
              )}
              href={section.url}
            >
              {cloneElement(section.icon, {
                className: "h-4 w-4",
              })}
              <span className="flex h-8 items-center gap-2 rounded-md px-2 text-sm">
                {section.title}
              </span>
            </Link>
          ) : null}
          <div className="mx-4 flex flex-col gap-2">
            {section.links.map((link) => {
              return (
                <div key={link.url} className="flex">
                  {cloneElement(link.icon, {
                    className: "h-3 w-3 mt-1",
                  })}
                  <Typography variant="muted" className="px-2">
                    <a
                      href={link.url}
                      className={cn("hover:bg-accent/80 p-1 rounded-sm", {
                        "bg-accent/50 hover:bg-accent/80 p-1 rounded-sm":
                          currentPath === link.url,
                      })}
                    >
                      {link.title}
                    </a>
                  </Typography>
                </div>
              );
            })}
          </div>
        </Fragment>
      ))}
    </nav>
  );
};
