import { useContext } from "react";
import { ColorModeContext } from "providers/contexts/color-mode";

export const useThemeMode = () => {
  const { mode } = useContext(ColorModeContext);
  return mode;
};
