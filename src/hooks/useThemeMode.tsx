import { useContext } from "react";
import { ColorModeContext } from "@/providers/contexts/color-mode";

const useThemeMode = () => {
  const { mode } = useContext(ColorModeContext);
  return mode;
};

export default useThemeMode;
