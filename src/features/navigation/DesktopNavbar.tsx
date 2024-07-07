"use client";

import type { User } from "@prisma/client";
import { useCurrentHouseStore } from "../houses/current-house.store";
import Image from "next/image";
import Link from "next/link";
import { SiteConfig } from "@/site-config";
import { DesktopVerticalMenu } from "./DesktopVerticalMenu";
import { UserDropdown } from "../auth/UserDropdown";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const DesktopNavbar = (props: { user: User }) => {
  const house = useCurrentHouseStore((s) => s.house);

  return (
    <div className="flex size-full max-w-[240px] flex-col border-r border-border px-2 py-4 max-lg:hidden">
      <div className="ml-2 flex items-center gap-2">
        <Image src={SiteConfig.appIcon} alt="app logo" width={24} height={24} />
        <Link href="/houses" className="text-xl font-bold">
          {SiteConfig.title}
        </Link>
      </div>
      <div className="h-10" />
      {house != null && <DesktopVerticalMenu user={props.user} forceHouse />}
      <div className="flex-1" />
      <UserDropdown>
        <Button variant="outline" size="sm">
          <Avatar className="mr-2 size-6">
            <AvatarFallback>
              {props.user.email ? props.user.email.slice(0, 2) : "??"}
            </AvatarFallback>
            {props.user.image && <AvatarImage src={props.user.image} />}
          </Avatar>
          <span className="max-lg:hidden">{props.user.name}</span>
        </Button>
      </UserDropdown>
    </div>
  );
};
