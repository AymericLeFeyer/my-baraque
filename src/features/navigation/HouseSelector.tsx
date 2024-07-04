"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { useCurrentHouseStore } from "../houses/current-house.store";
import { useRouter } from "next/navigation";
import { Divider } from "@/components/ui/divider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HousePlus } from "lucide-react";
import { Typography } from "@/components/ui/typography";

export const HouseSelector = () => {
  const currentPath = usePathname();
  const { house, houses, setHouse } = useCurrentHouseStore();
  const router = useRouter();

  return (
    <>
      <Select
        onValueChange={(v) => {
          setHouse(houses.find((h) => h.id == v)!);
          router.push(`/houses`);
        }}
      >
        <SelectTrigger>{house?.name}</SelectTrigger>
        <SelectContent className="">
          {houses.map((house) => (
            <SelectItem key={house.id} value={house.id}>
              {house.name}
            </SelectItem>
          ))}
          <Divider className="my-2" />
          <Link
            key="/"
            className={cn(
              "flex h-8 items-center rounded-md text-sm  transition-colors justify-center ",
              "hover:bg-accent ",
              {
                "bg-accent/50 hover:bg-accent/80":
                  currentPath === "/houses/new",
              },
            )}
            href="/houses/new"
          >
            <HousePlus className="size-4 pl-1 " />
            <Typography className="flex h-8 items-center gap-2 rounded-md px-2 text-sm    ">
              New baraque
            </Typography>
          </Link>
        </SelectContent>
      </Select>
    </>
  );
};
