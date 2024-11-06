import React, { FC } from "react";
import LogoLight from "@/assets/logo.png";
import LogoDark from "@/assets/logo_dark.png";

// @ts-ignore
export const Logo: FC<{
  className?: string;
  mode: "light" | "dark";
}> = ({ className, mode }) => (
  <img
    className={className}
    src={{ light: LogoLight, dark: LogoDark }[mode]}
    alt="logo-company"
  />
);
