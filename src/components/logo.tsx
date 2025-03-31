import React, { FC } from "react";
import LogoLight from "assets/logo.png";
import LogoDark from "assets/logo_dark.png";
import { ThemeMode } from "@/providers/contexts/color-mode";

export const Logo: FC<{
  className?: string;
  mode: ThemeMode;
}> = ({ className, mode }) => (
  <img
    className={className}
    src={{ light: LogoLight, dark: LogoDark }[mode]}
    alt="logo-company"
  />
);
