"use client";

import { useCurrentHouseStore } from "@/features/houses/current-house.store";
import type { PropsWithChildren, ReactNode } from "react";

export type HouseMandatoryNavigationProps = PropsWithChildren<{
  content: ReactNode;
}>;

export const HouseMandatoryNavigation = (
  props: HouseMandatoryNavigationProps,
) => {
  const { house } = useCurrentHouseStore();

  return <>{house != null ? props.children : props.content}</>;
};
