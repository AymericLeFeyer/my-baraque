import type { ComponentPropsWithoutRef } from "react";

export type LogoSvgProps = ComponentPropsWithoutRef<"svg"> & { size?: number };

export const LogoSvg = ({ size = 24, ...props }: LogoSvgProps) => {
  return <img src="/images/icon.png" width={size} alt="house logo" />;
};
